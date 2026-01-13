import { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import logoLight from 'figma:asset/465c6fc892a7f3f9999f24d1752a33ffeb454245.png';
import logoDark from 'figma:asset/a04661e0798a060c488e80d77cd73e8beca45024.png';

interface ResetPasswordProps {
  token: string;
  onSuccess: () => void;
}

export function ResetPassword({ token, onSuccess }: ResetPasswordProps) {
  const { resetPassword } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);

  // Validate token on mount
  useEffect(() => {
    const validateToken = async () => {
      // In production, validate the token with your Laravel backend
      // const response = await fetch(`/api/password/validate-token?token=${token}`);
      // const { valid } = await response.json();
      
      // Mock validation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For demo, accept any non-empty token
      setTokenValid(token && token.length > 0);
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    const result = await resetPassword(token, password);

    if (result.success) {
      setIsSuccess(true);
      // Redirect to login after 3 seconds
      setTimeout(() => {
        onSuccess();
      }, 3000);
    } else {
      setError(result.error || 'Failed to reset password');
    }

    setIsLoading(false);
  };

  // Token validation loading state
  if (tokenValid === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p 
            className="text-[14px] text-muted-foreground"
            style={{ fontFamily: 'var(--font-family-body)' }}
          >
            Validating reset link...
          </p>
        </div>
      </div>
    );
  }

  // Invalid token
  if (!tokenValid) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img 
                src={logoLight} 
                alt="Juicebox" 
                className="h-8 sm:h-10 w-auto dark:hidden"
              />
              <img 
                src={logoDark} 
                alt="Juicebox" 
                className="h-8 sm:h-10 w-auto hidden dark:block"
              />
            </div>
            <h1 
              className="text-[24px] sm:text-[28px] text-foreground mb-2"
              style={{ 
                fontFamily: 'var(--font-family-display)',
                fontWeight: 'var(--font-weight-normal)'
              }}
            >
              Invalid Reset Link
            </h1>
          </div>

          <div className="bg-card border border-border rounded-[var(--radius-card)] p-6 sm:p-8">
            <div 
              className="px-4 py-3 bg-destructive/10 border border-destructive/20 rounded-lg text-[14px] text-destructive mb-6"
              style={{ fontFamily: 'var(--font-family-body)' }}
            >
              This password reset link is invalid or has expired. Please request a new one.
            </div>

            <button
              onClick={onSuccess}
              className="w-full px-6 py-3 bg-foreground text-background rounded-[var(--radius-button)] hover:bg-primary-hover transition-colors text-[14px]"
              style={{ 
                fontFamily: 'var(--font-family-body)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img 
                src={logoLight} 
                alt="Juicebox" 
                className="h-8 sm:h-10 w-auto dark:hidden"
              />
              <img 
                src={logoDark} 
                alt="Juicebox" 
                className="h-8 sm:h-10 w-auto hidden dark:block"
              />
            </div>
            <h1 
              className="text-[24px] sm:text-[28px] text-foreground mb-2"
              style={{ 
                fontFamily: 'var(--font-family-display)',
                fontWeight: 'var(--font-weight-normal)'
              }}
            >
              Password Reset
            </h1>
          </div>

          <div className="bg-card border border-border rounded-[var(--radius-card)] p-6 sm:p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-chart-3/10 rounded-full mb-4">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-chart-3" />
              </div>
              
              <p 
                className="text-[15px] text-foreground mb-2"
                style={{ 
                  fontFamily: 'var(--font-family-body)',
                  fontWeight: 'var(--font-weight-medium)'
                }}
              >
                Your password has been reset successfully!
              </p>
              
              <p 
                className="text-[14px] text-muted-foreground mb-6"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Redirecting you to the login page...
              </p>

              <button
                onClick={onSuccess}
                className="w-full px-6 py-3 bg-foreground text-background rounded-[var(--radius-button)] hover:bg-primary-hover transition-colors text-[14px]"
                style={{ 
                  fontFamily: 'var(--font-family-body)',
                  fontWeight: 'var(--font-weight-medium)'
                }}
              >
                Sign In Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Reset password form
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src={logoLight} 
              alt="Juicebox" 
              className="h-8 sm:h-10 w-auto dark:hidden"
            />
            <img 
              src={logoDark} 
              alt="Juicebox" 
              className="h-8 sm:h-10 w-auto hidden dark:block"
            />
          </div>
          <h1 
            className="text-[24px] sm:text-[28px] text-foreground mb-2"
            style={{ 
              fontFamily: 'var(--font-family-display)',
              fontWeight: 'var(--font-weight-normal)'
            }}
          >
            Create New Password
          </h1>
          <p 
            className="text-[13px] sm:text-[14px] text-muted-foreground"
            style={{ fontFamily: 'var(--font-family-body)' }}
          >
            Enter your new password below
          </p>
        </div>

        {/* Reset Password Card */}
        <div className="bg-card border border-border rounded-[var(--radius-card)] p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password Field */}
            <div className="space-y-2">
              <label 
                htmlFor="new-password"
                className="text-[12px] text-muted-foreground block"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  minLength={8}
                  className="w-full px-4 py-2.5 pr-12 border border-border rounded-lg bg-input-background hover:border-accent transition-colors text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  style={{ fontFamily: 'var(--font-family-body)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p 
                className="text-[11px] text-muted-foreground"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Must be at least 8 characters long
              </p>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label 
                htmlFor="confirm-password"
                className="text-[12px] text-muted-foreground block"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                  minLength={8}
                  className="w-full px-4 py-2.5 pr-12 border border-border rounded-lg bg-input-background hover:border-accent transition-colors text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  style={{ fontFamily: 'var(--font-family-body)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div 
                className="px-4 py-3 bg-destructive/10 border border-destructive/20 rounded-lg text-[13px] text-destructive"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-foreground text-background rounded-[var(--radius-button)] hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[14px]"
              style={{ 
                fontFamily: 'var(--font-family-body)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              {isLoading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
