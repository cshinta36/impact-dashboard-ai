import { useState } from 'react';
import { 
  Dialog, 
  DialogContent,
  DialogDescription,
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '../ui/dialog';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

interface AddClientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: {
    companyName: string;
    firstName: string;
    lastName: string;
    contactEmail: string;
    status: 'active' | 'inactive';
  }) => void;
}

export function AddClientModal({ open, onOpenChange, onSubmit }: AddClientModalProps) {
  const [companyName, setCompanyName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [clientStatus, setClientStatus] = useState<'active' | 'inactive'>('active');

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({
        companyName,
        firstName,
        lastName,
        contactEmail,
        status: clientStatus
      });
    }
    
    // Reset form
    setCompanyName('');
    setFirstName('');
    setLastName('');
    setContactEmail('');
    setClientStatus('active');
    onOpenChange(false);
  };

  const handleCancel = () => {
    // Reset form
    setCompanyName('');
    setFirstName('');
    setLastName('');
    setContactEmail('');
    setClientStatus('active');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle 
            className="text-[16px] sm:text-[18px] text-foreground"
            style={{ 
              fontFamily: 'var(--font-family-display)',
              fontWeight: 'var(--font-weight-normal)'
            }}
          >
            Client Details
          </DialogTitle>
          <DialogDescription className="text-[13px] sm:text-[14px] text-muted-foreground">
            Add a new client to your system.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 py-3 sm:py-4">
          {/* First Name and Last Name in two columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label 
                className="text-[11px] sm:text-[12px] text-muted-foreground"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                First Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-accent transition-colors text-[13px] sm:text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring h-10 sm:h-11"
                style={{ fontFamily: 'var(--font-family-body)' }}
              />
            </div>

            <div className="space-y-2">
              <label 
                className="text-[11px] sm:text-[12px] text-muted-foreground"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Last Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-accent transition-colors text-[13px] sm:text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring h-10 sm:h-11"
                style={{ fontFamily: 'var(--font-family-body)' }}
              />
            </div>
          </div>

          {/* Company Name and Email in two columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label 
                className="text-[11px] sm:text-[12px] text-muted-foreground"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Company Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-accent transition-colors text-[13px] sm:text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring h-10 sm:h-11"
                style={{ fontFamily: 'var(--font-family-body)' }}
              />
            </div>

            <div className="space-y-2">
              <label 
                className="text-[11px] sm:text-[12px] text-muted-foreground"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Email Address <span className="text-destructive">*</span>
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-accent transition-colors text-[13px] sm:text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring h-10 sm:h-11"
                style={{ fontFamily: 'var(--font-family-body)' }}
              />
            </div>
          </div>

          {/* Status Radio Group */}
          <div className="space-y-3">
            <label 
              className="text-[11px] sm:text-[12px] text-muted-foreground"
              style={{ fontFamily: 'var(--font-family-body)' }}
            >
              Status
            </label>
            <RadioGroup value={clientStatus} onValueChange={(value) => setClientStatus(value as 'active' | 'inactive')}>
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active" id="client-active" />
                  <label 
                    htmlFor="client-active" 
                    className="text-[13px] sm:text-[14px] text-foreground cursor-pointer"
                    style={{ fontFamily: 'var(--font-family-body)' }}
                  >
                    Active
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inactive" id="client-inactive" />
                  <label 
                    htmlFor="client-inactive" 
                    className="text-[13px] sm:text-[14px] text-foreground cursor-pointer"
                    style={{ fontFamily: 'var(--font-family-body)' }}
                  >
                    Inactive
                  </label>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 sm:px-6 py-2 sm:py-2.5 bg-secondary text-foreground border border-border rounded-[var(--radius-button)] hover:bg-secondary/80 transition-colors text-[13px] sm:text-[14px] w-full sm:w-auto cursor-pointer"
            style={{ 
              fontFamily: 'var(--font-family-body)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!companyName || !firstName || !lastName || !contactEmail}
            className="px-4 sm:px-6 py-2 sm:py-2.5 bg-foreground text-background rounded-[var(--radius-button)] hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[13px] sm:text-[14px] w-full sm:w-auto cursor-pointer"
            style={{ 
              fontFamily: 'var(--font-family-body)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            Add Client
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}