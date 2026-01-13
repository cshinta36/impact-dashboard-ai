import { useState, useRef, FormEvent } from 'react';
import { X, Shield, CheckCircle } from 'lucide-react';
import { Button } from '../Button';

interface Setup2FAModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function Setup2FAModal({ isOpen, onClose, onSuccess }: Setup2FAModalProps) {
  const [step, setStep] = useState<'qr' | 'verify'>('qr');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [secret, setSecret] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Simulate fetching QR code from backend when modal opens
  useState(() => {
    if (isOpen && !qrCodeUrl) {
      // In production, this would call your Laravel backend:
      // const response = await fetch('/api/2fa/setup');
      // const { qr_code_url, secret } = await response.json();
      
      // Mock QR code and secret
      const mockSecret = 'JBSWY3DPEHPK3PXP';
      setSecret(mockSecret);
      // In production, this would be the actual QR code URL from the backend
      setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/JuiceboxImpact:admin@juicebox.com?secret=${mockSecret}&issuer=JuiceboxImpact`);
    }
  });

  const handleCodeChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (index === 5 && value) {
      const fullCode = [...newCode.slice(0, 5), value].join('');
      handleVerify(fullCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    
    if (pastedData.length === 6) {
      const newCode = pastedData.split('');
      setVerificationCode(newCode);
      handleVerify(pastedData);
    }
  };

  const handleVerify = async (code: string) => {
    setError('');
    setIsLoading(true);

    try {
      // In production, verify the code with your Laravel backend:
      // const response = await fetch('/api/2fa/confirm', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ code })
      // });
      
      // Mock validation
      await new Promise(resolve => setTimeout(resolve, 600));
      
      if (code === '123456') {
        onSuccess();
        handleClose();
      } else {
        setError('Invalid verification code. Please try again.');
        setVerificationCode(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitVerify = (e: FormEvent) => {
    e.preventDefault();
    const code = verificationCode.join('');
    if (code.length === 6) {
      handleVerify(code);
    }
  };

  const handleClose = () => {
    setStep('qr');
    setVerificationCode(['', '', '', '', '', '']);
    setError('');
    setQrCodeUrl('');
    setSecret('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-[var(--radius-card)] w-full max-w-md shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 
                className="text-[18px] text-foreground"
                style={{ 
                  fontFamily: 'var(--font-family-display)',
                  fontWeight: 'var(--font-weight-normal)'
                }}
              >
                {step === 'qr' ? 'Set Up 2FA' : 'Verify Setup'}
              </h2>
              <p 
                className="text-[13px] text-muted-foreground"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                {step === 'qr' ? 'Scan the QR code with your authenticator app' : 'Enter the code from your app'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'qr' && (
            <div className="space-y-6">
              {/* Step 1 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-[12px]" style={{ fontFamily: 'var(--font-family-body)', fontWeight: 'var(--font-weight-medium)' }}>
                    1
                  </div>
                  <h3 
                    className="text-[14px] text-foreground"
                    style={{ 
                      fontFamily: 'var(--font-family-body)',
                      fontWeight: 'var(--font-weight-medium)'
                    }}
                  >
                    Download an authenticator app
                  </h3>
                </div>
                <p 
                  className="text-[13px] text-muted-foreground ml-8"
                  style={{ fontFamily: 'var(--font-family-body)' }}
                >
                  We recommend Google Authenticator, Authy, or 1Password
                </p>
              </div>

              {/* Step 2 - QR Code */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-[12px]" style={{ fontFamily: 'var(--font-family-body)', fontWeight: 'var(--font-weight-medium)' }}>
                    2
                  </div>
                  <h3 
                    className="text-[14px] text-foreground"
                    style={{ 
                      fontFamily: 'var(--font-family-body)',
                      fontWeight: 'var(--font-weight-medium)'
                    }}
                  >
                    Scan this QR code
                  </h3>
                </div>
                <div className="ml-8 bg-white p-4 rounded-lg border border-border w-fit">
                  {qrCodeUrl ? (
                    <img src={qrCodeUrl} alt="2FA QR Code" className="w-48 h-48" />
                  ) : (
                    <div className="w-48 h-48 bg-muted/20 animate-pulse rounded"></div>
                  )}
                </div>
                <div className="ml-8 mt-3 p-3 bg-muted/20 rounded-lg border border-border">
                  <p 
                    className="text-[11px] text-muted-foreground mb-1"
                    style={{ fontFamily: 'var(--font-family-body)' }}
                  >
                    Or enter this code manually:
                  </p>
                  <code 
                    className="text-[13px] text-foreground font-mono"
                    style={{ fontFamily: 'monospace' }}
                  >
                    {secret}
                  </code>
                </div>
              </div>

              {/* Step 3 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-[12px]" style={{ fontFamily: 'var(--font-family-body)', fontWeight: 'var(--font-weight-medium)' }}>
                    3
                  </div>
                  <h3 
                    className="text-[14px] text-foreground"
                    style={{ 
                      fontFamily: 'var(--font-family-body)',
                      fontWeight: 'var(--font-weight-medium)'
                    }}
                  >
                    Verify the setup
                  </h3>
                </div>
                <p 
                  className="text-[13px] text-muted-foreground ml-8"
                  style={{ fontFamily: 'var(--font-family-body)' }}
                >
                  After scanning, enter the 6-digit code from your app
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="secondary" onClick={handleClose} className="flex-1">
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => {
                    setStep('verify');
                    setTimeout(() => inputRefs.current[0]?.focus(), 100);
                  }}
                  className="flex-1"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 'verify' && (
            <form onSubmit={handleSubmitVerify} className="space-y-6">
              <div className="space-y-3">
                <label 
                  className="text-[13px] text-foreground block text-center"
                  style={{ 
                    fontFamily: 'var(--font-family-body)',
                    fontWeight: 'var(--font-weight-medium)'
                  }}
                >
                  Enter verification code
                </label>
                <div className="flex gap-2 justify-center">
                  {verificationCode.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      disabled={isLoading}
                      className="w-12 h-14 text-center border border-border rounded-lg bg-input-background hover:border-accent transition-colors text-[20px] text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                      style={{ fontFamily: 'var(--font-family-body)' }}
                    />
                  ))}
                </div>
              </div>

              {error && (
                <div 
                  className="px-4 py-3 bg-destructive/10 border border-destructive/20 rounded-lg text-[13px] text-destructive text-center"
                  style={{ fontFamily: 'var(--font-family-body)' }}
                >
                  {error}
                </div>
              )}

              <p 
                className="text-[12px] text-muted-foreground text-center"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Demo code: <span className="text-accent">123456</span>
              </p>

              <div className="flex gap-3">
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={() => setStep('qr')}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  type="submit"
                  variant="primary"
                  disabled={isLoading || verificationCode.some(d => !d)}
                  className="flex-1"
                >
                  {isLoading ? 'Verifying...' : 'Enable 2FA'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}