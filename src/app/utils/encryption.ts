/**
 * Encryption Utilities for Juicebox Impact Dashboard
 * 
 * IMPORTANT SECURITY NOTE:
 * These are CLIENT-SIDE encryption utilities for demonstration purposes.
 * In a production Laravel application, ALL sensitive data encryption should 
 * be performed SERVER-SIDE using Laravel's encryption features.
 * 
 * Client-side encryption cannot be considered truly secure as the keys
 * are accessible in the browser. Use these utilities only for:
 * - Obfuscating data in localStorage
 * - Transit encryption before sending to server
 * - Display masking
 * 
 * The actual encryption of passwords and API keys should be done by your
 * Laravel backend using:
 * - Laravel's Hash facade for passwords (bcrypt/argon2)
 * - Laravel's Crypt facade for reversible encryption
 * - Environment variables for encryption keys
 */

/**
 * Simple Base64 encoding for obfuscation (NOT SECURE)
 * Use only for display masking, not for security
 */
export function encodeBase64(data: string): string {
  try {
    return btoa(data);
  } catch (error) {
    console.error('Base64 encoding failed:', error);
    return data;
  }
}

/**
 * Simple Base64 decoding
 */
export function decodeBase64(encoded: string): string {
  try {
    return atob(encoded);
  } catch (error) {
    console.error('Base64 decoding failed:', error);
    return encoded;
  }
}

/**
 * Simple XOR cipher for basic obfuscation
 * Use only for localStorage obfuscation, not for real security
 */
export function simpleEncrypt(data: string, key: string = 'juicebox-2024'): string {
  try {
    let result = '';
    for (let i = 0; i < data.length; i++) {
      const charCode = data.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      result += String.fromCharCode(charCode);
    }
    return encodeBase64(result);
  } catch (error) {
    console.error('Encryption failed:', error);
    return data;
  }
}

/**
 * Simple XOR cipher decryption
 */
export function simpleDecrypt(encrypted: string, key: string = 'juicebox-2024'): string {
  try {
    const decoded = decodeBase64(encrypted);
    let result = '';
    for (let i = 0; i < decoded.length; i++) {
      const charCode = decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      result += String.fromCharCode(charCode);
    }
    return result;
  } catch (error) {
    console.error('Decryption failed:', error);
    return encrypted;
  }
}

/**
 * Mask sensitive data for display (e.g., API keys, passwords)
 */
export function maskSensitiveData(data: string, visibleChars: number = 8): string {
  if (!data || data.length <= visibleChars) {
    return data;
  }
  
  const start = data.substring(0, visibleChars / 2);
  const end = data.substring(data.length - (visibleChars / 2));
  const masked = '*'.repeat(Math.max(15, data.length - visibleChars));
  
  return `${start}${masked}${end}`;
}

/**
 * Hash password for client-side validation (NOT FOR STORAGE)
 * This is only for comparing with a stored hash, never store raw passwords
 */
export async function hashPassword(password: string): Promise<string> {
  // Use Web Crypto API for hashing
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Validate password strength
 */
export interface PasswordStrength {
  isValid: boolean;
  score: number; // 0-100
  feedback: string[];
}

export function validatePasswordStrength(password: string): PasswordStrength {
  const feedback: string[] = [];
  let score = 0;

  // Length check
  if (password.length < 8) {
    feedback.push('Password must be at least 8 characters long');
  } else {
    score += 25;
  }

  // Uppercase check
  if (!/[A-Z]/.test(password)) {
    feedback.push('Include at least one uppercase letter');
  } else {
    score += 25;
  }

  // Lowercase check
  if (!/[a-z]/.test(password)) {
    feedback.push('Include at least one lowercase letter');
  } else {
    score += 25;
  }

  // Number check
  if (!/[0-9]/.test(password)) {
    feedback.push('Include at least one number');
  } else {
    score += 15;
  }

  // Special character check
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    feedback.push('Include at least one special character');
  } else {
    score += 10;
  }

  return {
    isValid: feedback.length === 0 && password.length >= 8,
    score,
    feedback
  };
}

/**
 * Secure random string generator for tokens
 */
export function generateSecureToken(length: number = 32): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Store encrypted data in localStorage
 */
export function secureLocalStorage = {
  setItem: (key: string, value: string): void => {
    try {
      const encrypted = simpleEncrypt(value);
      localStorage.setItem(key, encrypted);
    } catch (error) {
      console.error('Failed to store encrypted data:', error);
    }
  },

  getItem: (key: string): string | null => {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;
      return simpleDecrypt(encrypted);
    } catch (error) {
      console.error('Failed to retrieve encrypted data:', error);
      return null;
    }
  },

  removeItem: (key: string): void => {
    localStorage.removeItem(key);
  }
};

/**
 * Sanitize input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}
