import { useState, FormEvent, useEffect, useRef } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { Eye, EyeOff, Shield } from 'lucide-react';
import logoLight from 'figma:asset/465c6fc892a7f3f9999f24d1752a33ffeb454245.png';
import logoDark from 'figma:asset/a04661e0798a060c488e80d77cd73e8beca45024.png';

interface LoginProps {
  onForgotPassword: () => void;
}

export function Login({ onForgotPassword }: LoginProps) {
  const { login, verify2FA } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // ===== DEV ONLY: Remove this section before production build =====
  const [dev2FAEnabled, setDev2FAEnabled] = useState(
    localStorage.getItem('dev_2fa_enabled') === 'true'
  );

  const toggleDev2FA = () => {
    const newValue = !dev2FAEnabled;
    setDev2FAEnabled(newValue);
    localStorage.setItem('dev_2fa_enabled', newValue.toString());
  };
  // ===== END DEV ONLY SECTION =====

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);

    if (result.success && result.requires2FA) {
      // Show 2FA input
      setShow2FA(true);
      setIsLoading(false);
      // Focus first 2FA input
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } else if (result.success) {
      // Login successful without 2FA
      setIsLoading(false);
    } else {
      // Login failed
      setError(result.error || 'Login failed');
      setIsLoading(false);
    }
  };

  const handle2FAChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...twoFactorCode];
    newCode[index] = value;
    setTwoFactorCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits are entered
    if (index === 5 && value) {
      const fullCode = [...newCode.slice(0, 5), value].join('');
      submit2FACode(fullCode);
    }
  };

  const handle2FAKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !twoFactorCode[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handle2FAPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    
    if (pastedData.length === 6) {
      const newCode = pastedData.split('');
      setTwoFactorCode(newCode);
      submit2FACode(pastedData);
    }
  };

  const submit2FACode = async (code: string) => {
    setError('');
    setIsLoading(true);

    const result = await verify2FA(code);

    if (!result.success) {
      setError(result.error || '2FA verification failed');
      setTwoFactorCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }

    setIsLoading(false);
  };

  const handleBack = () => {
    setShow2FA(false);
    setTwoFactorCode(['', '', '', '', '', '']);
    setError('');
  };

  if (show2FA) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* ===== DEV ONLY: Remove before production build ===== */}
          <div className="mb-4 p-3 bg-chart-4/10 border border-chart-4/30 rounded-lg text-center">
            <p 
              className="text-[11px] text-muted-foreground mb-1"
              style={{ fontFamily: 'var(--font-family-body)' }}
            >
              DEV: 2FA Toggle (Remove before build)
            </p>
            <button
              onClick={toggleDev2FA}
              className={`px-3 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                dev2FAEnabled 
                  ? 'bg-chart-3 text-white' 
                  : 'bg-secondary text-foreground border border-border'
              }`}
              style={{ fontFamily: 'var(--font-family-body)' }}
            >
              2FA: {dev2FAEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
          {/* ===== END DEV ONLY SECTION ===== */}

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
              Two-Factor Authentication
            </h1>
            <p 
              className="text-[13px] sm:text-[14px] text-muted-foreground"
              style={{ fontFamily: 'var(--font-family-body)' }}
            >
              Enter the 6-digit code from your authenticator app
            </p>
          </div>

          {/* 2FA Card */}
          <div className="bg-card border border-border rounded-[var(--radius-card)] p-6 sm:p-8">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent/10 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); }} className="space-y-5">
              {/* 2FA Code Input */}
              <div className="space-y-3">
                <label 
                  className="text-[12px] text-muted-foreground block text-center"
                  style={{ fontFamily: 'var(--font-family-body)' }}
                >
                  Verification Code
                </label>
                <div className="flex gap-2 justify-center">
                  {twoFactorCode.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handle2FAChange(index, e.target.value)}
                      onKeyDown={(e) => handle2FAKeyDown(index, e)}
                      onPaste={index === 0 ? handle2FAPaste : undefined}
                      disabled={isLoading}
                      className="w-10 h-12 sm:w-12 sm:h-14 text-center border border-border rounded-lg bg-input-background hover:border-accent transition-colors text-[18px] sm:text-[20px] text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                      style={{ fontFamily: 'var(--font-family-body)' }}
                    />
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div 
                  className="px-4 py-3 bg-destructive/10 border border-destructive/20 rounded-lg text-[13px] text-destructive text-center"
                  style={{ fontFamily: 'var(--font-family-body)' }}
                >
                  {error}
                </div>
              )}

              {/* Helper Text */}
              <p 
                className="text-[12px] text-muted-foreground text-center"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Demo code: <span className="text-accent">123456</span>
              </p>

              {/* Back Button */}
              <button
                type="button"
                onClick={handleBack}
                disabled={isLoading}
                className="w-full px-6 py-3 bg-secondary text-foreground border border-border rounded-[var(--radius-button)] hover:bg-secondary/80 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-[14px]"
                style={{ 
                  fontFamily: 'var(--font-family-body)',
                  fontWeight: 'var(--font-weight-medium)'
                }}
              >
                Back to Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* ===== DEV ONLY: Remove before production build ===== */}
        <div className="mb-4 p-3 bg-chart-4/10 border border-chart-4/30 rounded-lg text-center">
          <p 
            className="text-[11px] text-muted-foreground mb-1"
            style={{ fontFamily: 'var(--font-family-body)' }}
          >
            DEV: 2FA Toggle (Remove before build)
          </p>
          <button
            onClick={toggleDev2FA}
            className={`px-3 py-1 rounded text-[11px] transition-colors cursor-pointer ${
              dev2FAEnabled 
                ? 'bg-chart-3 text-white' 
                : 'bg-secondary text-foreground border border-border'
            }`}
            style={{ fontFamily: 'var(--font-family-body)' }}
          >
            2FA: {dev2FAEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
        {/* ===== END DEV ONLY SECTION ===== */}

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
            Impact Dashboard
          </h1>
          <p 
            className="text-[13px] sm:text-[14px] text-muted-foreground"
            style={{ fontFamily: 'var(--font-family-body)' }}
          >
            Sign in to your account
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-card border border-border rounded-[var(--radius-card)] p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label 
                htmlFor="email"
                className="text-[12px] text-muted-foreground block"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-input-background hover:border-accent transition-colors text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                style={{ fontFamily: 'var(--font-family-body)' }}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label 
                htmlFor="password"
                className="text-[12px] text-muted-foreground block"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-2.5 pr-10 border border-border rounded-lg bg-input-background hover:border-accent transition-colors text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  style={{ fontFamily: 'var(--font-family-body)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
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

            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-[13px] text-accent hover:text-accent/80 transition-colors cursor-pointer"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-foreground text-background rounded-[var(--radius-button)] hover:bg-primary-hover transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-[14px]"
              style={{ 
                fontFamily: 'var(--font-family-body)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials Helper */}
          <div className="mt-6 pt-6 border-t border-border">
            <p 
              className="text-[11px] text-muted-foreground text-center"
              style={{ fontFamily: 'var(--font-family-body)' }}
            >
              Demo credentials: admin@juicebox.com / password
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}