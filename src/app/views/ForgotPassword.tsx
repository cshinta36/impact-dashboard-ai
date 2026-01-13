import { useState, FormEvent } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import logoLight from 'figma:asset/465c6fc892a7f3f9999f24d1752a33ffeb454245.png';
import logoDark from 'figma:asset/a04661e0798a060c488e80d77cd73e8beca45024.png';

interface ForgotPasswordProps {
  onBackToLogin: () => void;
}

export function ForgotPassword({ onBackToLogin }: ForgotPasswordProps) {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await requestPasswordReset(email);

    if (result.success) {
      setIsSuccess(true);
    } else {
      setError(result.error || 'Failed to send reset email');
    }

    setIsLoading(false);
  };

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
              Check Your Email
            </h1>
          </div>

          {/* Success Card */}
          <div className="bg-card border border-border rounded-[var(--radius-card)] p-6 sm:p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-chart-3/10 rounded-full mb-4">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-chart-3" />
              </div>
              
              <p 
                className="text-[14px] sm:text-[15px] text-foreground mb-2"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                We've sent password reset instructions to:
              </p>
              
              <p 
                className="text-[14px] sm:text-[15px] text-accent mb-6"
                style={{ 
                  fontFamily: 'var(--font-family-body)',
                  fontWeight: 'var(--font-weight-medium)'
                }}
              >
                {email}
              </p>
              
              <p 
                className="text-[13px] text-muted-foreground mb-6"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Please check your inbox and follow the instructions to reset your password.
              </p>

              <button
                onClick={onBackToLogin}
                className="w-full px-6 py-3 bg-foreground text-background rounded-[var(--radius-button)] hover:bg-primary-hover transition-colors text-[14px]"
                style={{ 
                  fontFamily: 'var(--font-family-body)',
                  fontWeight: 'var(--font-weight-medium)'
                }}
              >
                Back to Sign In
              </button>
            </div>

            {/* Didn't receive email helper */}
            <div className="mt-6 pt-6 border-t border-border text-center">
              <p 
                className="text-[12px] text-muted-foreground mb-2"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Didn't receive the email?
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="text-[13px] text-accent hover:text-accent/80 transition-colors"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            Reset Password
          </h1>
          <p 
            className="text-[13px] sm:text-[14px] text-muted-foreground"
            style={{ fontFamily: 'var(--font-family-body)' }}
          >
            Enter your email to receive reset instructions
          </p>
        </div>

        {/* Reset Password Card */}
        <div className="bg-card border border-border rounded-[var(--radius-card)] p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label 
                htmlFor="reset-email"
                className="text-[12px] text-muted-foreground block"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Email Address
              </label>
              <input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-input-background hover:border-accent transition-colors text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                style={{ fontFamily: 'var(--font-family-body)' }}
              />
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
              {isLoading ? 'Sending...' : 'Send Reset Instructions'}
            </button>

            {/* Back to Login */}
            <button
              type="button"
              onClick={onBackToLogin}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-foreground border border-border rounded-[var(--radius-button)] hover:bg-secondary/80 transition-colors text-[14px]"
              style={{ 
                fontFamily: 'var(--font-family-body)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}