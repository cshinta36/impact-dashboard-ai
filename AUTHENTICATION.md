# Authentication & Encryption Documentation

## Overview

The Juicebox Impact Dashboard now includes a complete authentication system with login, password reset functionality, and encryption utilities for sensitive data.

## Features Implemented

### 1. **Authentication System**
- ✅ Login page with email and password
- ✅ Two-Factor Authentication (2FA) with 6-digit code input
- ✅ Forgot password flow with email verification
- ✅ Session management with localStorage
- ✅ Protected routes (requires authentication)
- ✅ Logout functionality
- ✅ Loading states during authentication

### 2. **Encryption Utilities**
- ✅ Password strength validation
- ✅ Client-side hashing (SHA-256)
- ✅ Sensitive data masking (API keys, passwords)
- ✅ Secure token generation
- ✅ Basic obfuscation for localStorage

## Demo Credentials

For testing purposes, use these credentials:
- **Email**: admin@juicebox.com
- **Password**: password
- **2FA Code**: 123456 (when 2FA is enabled)

### Testing 2FA

The login page includes a dev toggle to enable/disable 2FA for testing:
- Toggle the "2FA: ON/OFF" button at the top of the login screen
- When enabled, you'll see the 2FA code input after entering credentials
- **⚠️ IMPORTANT**: Remove the dev toggle section before production build (marked with comments)

## File Structure

```
/src/app/
├── contexts/
│   └── AuthContext.tsx          # Authentication state management
├── views/
│   ├── Login.tsx                # Login page
│   └── ForgotPassword.tsx       # Password reset flow
├── utils/
│   └── encryption.ts            # Encryption utilities
└── App.tsx                      # Updated with auth logic
```

## Important Security Notes

### ⚠️ Client-Side Encryption Limitations

The encryption utilities provided are for **demonstration and obfuscation purposes only**. In a production Laravel application:

1. **Never rely on client-side encryption for security**
   - Client-side code can be inspected and modified
   - Encryption keys are visible in the browser
   - Use only for display masking and local storage obfuscation

2. **Server-Side Encryption (Laravel)**
   - **Passwords**: Use Laravel's `Hash` facade (bcrypt/argon2)
   - **API Keys**: Use Laravel's `Crypt` facade for reversible encryption
   - **Environment Variables**: Store encryption keys in `.env` file
   - **Database**: Store encrypted data in database columns

### Production Implementation Guide

#### Backend (Laravel) - Password Encryption

```php
// In your Laravel User model or authentication controller

use Illuminate\Support\Facades\Hash;

// When storing a password
$user->password = Hash::make($request->password);

// When verifying a password
if (Hash::check($request->password, $user->password)) {
    // Password is correct
}
```

#### Backend (Laravel) - API Key Encryption

```php
use Illuminate\Support\Facades\Crypt;

// When storing an API key
$project->api_key = Crypt::encryptString($request->api_key);

// When retrieving an API key
$apiKey = Crypt::decryptString($project->api_key);
```

#### Backend (Laravel) - Environment Configuration

```env
# .env file
APP_KEY=base64:your-laravel-app-key-here
ENCRYPTION_KEY=your-additional-encryption-key-if-needed
```

## Frontend Integration with Laravel Backend

### Login Request Example

```typescript
// In AuthContext.tsx, replace the mock login with:

const login = async (email: string, password: string) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      if (data.requires2FA) {
        return { success: true, requires2FA: true };
      } else {
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('auth_user', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true, requires2FA: false };
      }
    } else {
      return { success: false, error: data.error || 'Login failed' };
    }
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
};

const verify2FA = async (code: string) => {
  try {
    const response = await fetch('/api/2fa/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
      },
      body: JSON.stringify({ code })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('auth_user', JSON.stringify(data.user));
      setUser(data.user);
      return { success: true };
    } else {
      return { success: false, error: data.error || '2FA verification failed' };
    }
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
};
```

### Password Reset Request Example

```typescript
// In AuthContext.tsx, replace the mock reset with:

const requestPasswordReset = async (email: string) => {
  try {
    const response = await fetch('/api/password/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
      },
      body: JSON.stringify({ email })
    });

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, error: 'Failed to send reset email' };
    }
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
};
```

## Encryption Utility Functions

### Available Functions

```typescript
import { 
  maskSensitiveData,
  validatePasswordStrength,
  hashPassword,
  generateSecureToken
} from '@/app/utils/encryption';

// Validate password strength
const strength = validatePasswordStrength('MyP@ssw0rd123');
// Result: { isValid: true, score: 100, feedback: [] }

// Hash password (client-side, for comparison only)
const hash = await hashPassword('password123');
// Result: SHA-256 hash string

// Generate secure token
const token = generateSecureToken(32);
// Result: Random 32-character hex string
```

## Laravel Backend Routes

You'll need to implement these routes in your Laravel application:

```php
// routes/api.php

Route::post('/login', [AuthController::class, 'login']);
Route::post('/2fa/verify', [AuthController::class, 'verify2FA']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/password/email', [PasswordResetController::class, 'sendResetLink']);
Route::post('/password/reset', [PasswordResetController::class, 'reset']);
```

## Two-Factor Authentication (2FA) Implementation

### Frontend Flow

1. User enters email and password
2. If credentials are valid AND user has 2FA enabled:
   - Login API returns `{ requires2FA: true }`
   - Frontend shows 6-digit code input
3. User enters 6-digit code from authenticator app
4. Frontend calls 2FA verification endpoint
5. If code is valid, user is logged in

### Backend Implementation (Laravel)

#### Install Required Package

```bash
composer require pragmarx/google2fa-laravel
```

#### User Model Addition

```php
// database/migrations/xxxx_add_2fa_to_users_table.php
Schema::table('users', function (Blueprint $table) {
    $table->string('two_factor_secret')->nullable();
    $table->boolean('two_factor_enabled')->default(false);
});
```

#### Auth Controller - Login with 2FA Check

```php
use PragmaRX\Google2FA\Google2FA;

public function login(Request $request)
{
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if (Auth::attempt($credentials)) {
        $user = Auth::user();
        
        // Check if user has 2FA enabled
        if ($user->two_factor_enabled) {
            // Store user ID in session for 2FA verification
            session(['2fa_user_id' => $user->id]);
            Auth::logout(); // Log out until 2FA is verified
            
            return response()->json([
                'requires2FA' => true,
                'message' => 'Please enter your 2FA code'
            ]);
        }
        
        // No 2FA, return token
        $token = $user->createToken('auth-token')->plainTextToken;
        
        return response()->json([
            'requires2FA' => false,
            'token' => $token,
            'user' => $user
        ]);
    }

    return response()->json(['error' => 'Invalid credentials'], 401);
}

public function verify2FA(Request $request)
{
    $request->validate([
        'code' => 'required|digits:6',
    ]);

    $userId = session('2fa_user_id');
    
    if (!$userId) {
        return response()->json(['error' => 'Session expired'], 401);
    }

    $user = User::find($userId);
    
    if (!$user) {
        return response()->json(['error' => 'User not found'], 404);
    }

    $google2fa = new Google2FA();
    $valid = $google2fa->verifyKey($user->two_factor_secret, $request->code);

    if ($valid) {
        Auth::login($user);
        session()->forget('2fa_user_id');
        
        $token = $user->createToken('auth-token')->plainTextToken;
        
        return response()->json([
            'token' => $token,
            'user' => $user
        ]);
    }

    return response()->json(['error' => 'Invalid 2FA code'], 401);
}
```

#### Frontend Integration

```typescript
// In AuthContext.tsx, replace mock with:

const login = async (email: string, password: string) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': getCsrfToken()
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      if (data.requires2FA) {
        return { success: true, requires2FA: true };
      } else {
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('auth_user', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true, requires2FA: false };
      }
    } else {
      return { success: false, error: data.error || 'Login failed' };
    }
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
};

const verify2FA = async (code: string) => {
  try {
    const response = await fetch('/api/2fa/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': getCsrfToken()
      },
      body: JSON.stringify({ code })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('auth_user', JSON.stringify(data.user));
      setUser(data.user);
      return { success: true };
    } else {
      return { success: false, error: data.error || '2FA verification failed' };
    }
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
};
```

### 2FA Setup Flow (for Settings page)

Users should be able to enable/disable 2FA in Settings:

```php
// In your Settings controller

public function enable2FA(Request $request)
{
    $user = Auth::user();
    $google2fa = new Google2FA();
    
    // Generate secret
    $secret = $google2fa->generateSecretKey();
    
    // Generate QR code URL
    $qrCodeUrl = $google2fa->getQRCodeUrl(
        config('app.name'),
        $user->email,
        $secret
    );
    
    // Store secret (not enabled yet until verified)
    $user->two_factor_secret = $secret;
    $user->save();
    
    return response()->json([
        'secret' => $secret,
        'qr_code_url' => $qrCodeUrl
    ]);
}

public function confirm2FA(Request $request)
{
    $request->validate([
        'code' => 'required|digits:6',
    ]);

    $user = Auth::user();
    $google2fa = new Google2FA();
    
    $valid = $google2fa->verifyKey($user->two_factor_secret, $request->code);

    if ($valid) {
        $user->two_factor_enabled = true;
        $user->save();
        
        return response()->json(['message' => '2FA enabled successfully']);
    }

    return response()->json(['error' => 'Invalid code'], 401);
}

public function disable2FA(Request $request)
{
    $request->validate([
        'password' => 'required',
    ]);

    $user = Auth::user();
    
    if (!Hash::check($request->password, $user->password)) {
        return response()->json(['error' => 'Invalid password'], 401);
    }

    $user->two_factor_enabled = false;
    $user->two_factor_secret = null;
    $user->save();

    return response()->json(['message' => '2FA disabled successfully']);
}
```

## Security Checklist

- [ ] Implement HTTPS in production
- [ ] Use Laravel Sanctum or Passport for API authentication
- [ ] Implement CSRF protection
- [ ] Set up proper CORS policies
- [ ] Use rate limiting on login/password reset endpoints
- [ ] Implement account lockout after failed attempts
- [ ] Enable two-factor authentication (2FA)
- [ ] Regular security audits
- [ ] Keep Laravel and dependencies updated
- [ ] Use prepared statements (Eloquent does this automatically)
- [ ] Sanitize all user inputs server-side
- [ ] Implement proper session management
- [ ] Use secure, httpOnly cookies for session tokens

## Testing

### Login Flow
1. Navigate to the application
2. You'll see the login screen
3. Enter demo credentials: admin@juicebox.com / password
4. You'll be logged in and redirected to the dashboard

### Forgot Password Flow
1. From login screen, click "Forgot password?"
2. Enter an email address
3. You'll see a success message (in production, an email would be sent)
4. Click "Back to Sign In" to return to login

### Logout
1. Click on the user menu in the bottom-left corner of the sidebar
2. Click "Log Out"
3. You'll be redirected to the login screen

## Additional Resources

- [Laravel Authentication Documentation](https://laravel.com/docs/authentication)
- [Laravel Encryption Documentation](https://laravel.com/docs/encryption)
- [Laravel Sanctum Documentation](https://laravel.com/docs/sanctum)
- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)

## Notes

- The current implementation uses mock authentication for demonstration
- All encryption and password hashing should be moved to Laravel backend
- Client-side encryption utilities are for display masking only
- Always validate and sanitize inputs on the server side
- Never store sensitive data in plain text
- Use Laravel's built-in security features