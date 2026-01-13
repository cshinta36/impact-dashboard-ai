import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'superadmin' | 'client';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; requires2FA?: boolean }>;
  verify2FA: (code: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (token: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingUser, setPendingUser] = useState<User | null>(null); // Store user during 2FA verification

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('auth_user');
      const authToken = localStorage.getItem('auth_token');
      
      if (storedUser && authToken) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Failed to parse stored user:', error);
          localStorage.removeItem('auth_user');
          localStorage.removeItem('auth_token');
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string; requires2FA?: boolean }> => {
    try {
      // In a real app, this would make an API call to your Laravel backend
      // For now, we'll simulate with mock credentials
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock validation (replace with actual API call)
      if (email === 'admin@juicebox.com' && password === 'password') {
        const mockUser: User = {
          id: '1',
          email: 'admin@juicebox.com',
          firstName: 'Admin',
          lastName: 'User',
          role: 'superadmin'
        };

        // Check if user has 2FA enabled (in production, this comes from the API response)
        const has2FAEnabled = localStorage.getItem('dev_2fa_enabled') === 'true';

        if (has2FAEnabled) {
          // Store user temporarily until 2FA is verified
          setPendingUser(mockUser);
          return { success: true, requires2FA: true };
        } else {
          // No 2FA required, complete login
          localStorage.setItem('auth_user', JSON.stringify(mockUser));
          localStorage.setItem('auth_token', 'mock_token_' + Date.now());
          setUser(mockUser);
          return { success: true, requires2FA: false };
        }
      } else {
        return { 
          success: false, 
          error: 'Invalid email or password. Please try again.' 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        error: 'An error occurred during login. Please try again.' 
      };
    }
  };

  const verify2FA = async (code: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // In a real app, this would verify the 2FA code with your Laravel backend
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 600));

      // Mock validation - accept "123456" as valid code (replace with actual API call)
      if (code === '123456') {
        if (pendingUser) {
          // Complete the login
          localStorage.setItem('auth_user', JSON.stringify(pendingUser));
          localStorage.setItem('auth_token', 'mock_token_' + Date.now());
          setUser(pendingUser);
          setPendingUser(null);
          return { success: true };
        } else {
          return { success: false, error: 'Session expired. Please log in again.' };
        }
      } else {
        return { 
          success: false, 
          error: 'Invalid verification code. Please try again.' 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        error: 'An error occurred. Please try again.' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
    setPendingUser(null);
    setUser(null);
  };

  const requestPasswordReset = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // In a real app, this would make an API call to your Laravel backend
      // to send a password reset email
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock validation
      if (email && email.includes('@')) {
        return { success: true };
      } else {
        return { 
          success: false, 
          error: 'Please enter a valid email address.' 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        error: 'An error occurred. Please try again.' 
      };
    }
  };

  const resetPassword = async (token: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // In a real app, this would make an API call to your Laravel backend
      // to reset the password using the token
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock validation
      if (token && newPassword.length >= 8) {
        return { success: true };
      } else {
        return { 
          success: false, 
          error: 'Invalid reset token or password too short.' 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        error: 'An error occurred. Please try again.' 
      };
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    verify2FA,
    logout,
    requestPasswordReset,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}