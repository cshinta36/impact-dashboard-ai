import { useState } from 'react';
import { 
  Dialog, 
  DialogContent,
  DialogDescription,
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '../ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

interface Client {
  id: string;
  name: string;
}

interface AddUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clients: Client[];
  onSubmit?: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    clientId?: string;
    status: 'active' | 'inactive';
  }) => void;
}

export function AddUserModal({ open, onOpenChange, clients, onSubmit }: AddUserModalProps) {
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('client');
  const [selectedClient, setSelectedClient] = useState('');
  const [userStatus, setUserStatus] = useState<'active' | 'inactive'>('active');

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({
        firstName: userFirstName,
        lastName: userLastName,
        email: userEmail,
        password: userPassword,
        confirmPassword,
        role: selectedRole,
        clientId: selectedRole === 'client' ? selectedClient : undefined,
        status: userStatus
      });
    }
    
    // Reset form
    setUserFirstName('');
    setUserLastName('');
    setUserEmail('');
    setUserPassword('');
    setConfirmPassword('');
    setSelectedRole('client');
    setSelectedClient('');
    setUserStatus('active');
    onOpenChange(false);
  };

  const handleCancel = () => {
    // Reset form
    setUserFirstName('');
    setUserLastName('');
    setUserEmail('');
    setUserPassword('');
    setConfirmPassword('');
    setSelectedRole('client');
    setSelectedClient('');
    setUserStatus('active');
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
            User Details
          </DialogTitle>
          <DialogDescription className="text-[13px] sm:text-[14px] text-muted-foreground">
            Add a new user to your team.
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
                value={userFirstName}
                onChange={(e) => setUserFirstName(e.target.value)}
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
                value={userLastName}
                onChange={(e) => setUserLastName(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-accent transition-colors text-[13px] sm:text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring h-10 sm:h-11"
                style={{ fontFamily: 'var(--font-family-body)' }}
              />
            </div>
          </div>

          {/* Email - Full Width */}
          <div className="space-y-2">
            <label 
              className="text-[11px] sm:text-[12px] text-muted-foreground"
              style={{ fontFamily: 'var(--font-family-body)' }}
            >
              Email <span className="text-destructive">*</span>
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-accent transition-colors text-[13px] sm:text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring h-10 sm:h-11"
              style={{ fontFamily: 'var(--font-family-body)' }}
            />
          </div>

          {/* Password and Confirm Password in two columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label 
                className="text-[11px] sm:text-[12px] text-muted-foreground"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-accent transition-colors text-[13px] sm:text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring h-10 sm:h-11"
                style={{ fontFamily: 'var(--font-family-body)' }}
              />
            </div>

            <div className="space-y-2">
              <label 
                className="text-[11px] sm:text-[12px] text-muted-foreground"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-accent transition-colors text-[13px] sm:text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring h-10 sm:h-11"
                style={{ fontFamily: 'var(--font-family-body)' }}
              />
            </div>
          </div>

          {/* Role */}
          <div className="space-y-3">
            <label 
              className="text-[13px] sm:text-[14px] text-foreground"
              style={{ 
                fontFamily: 'var(--font-family-body)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              Role
            </label>
            <p 
              className="text-[11px] sm:text-[12px] text-muted-foreground"
              style={{ fontFamily: 'var(--font-family-body)' }}
            >
              Select one of the following roles for this user.
            </p>
            <RadioGroup value={selectedRole} onValueChange={setSelectedRole}>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 border border-border rounded-lg hover:bg-secondary/30 transition-colors">
                  <RadioGroupItem value="superadmin" id="role-superadmin" className="mt-0.5" />
                  <div className="flex-1">
                    <label 
                      htmlFor="role-superadmin" 
                      className="text-[13px] sm:text-[14px] text-foreground cursor-pointer block"
                      style={{ fontFamily: 'var(--font-family-body)', fontWeight: 'var(--font-weight-medium)' }}
                    >
                      Super Admin
                    </label>
                    <p 
                      className="text-[11px] sm:text-[12px] text-muted-foreground mt-1"
                      style={{ fontFamily: 'var(--font-family-body)' }}
                    >
                      Full access to all features and settings
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 border border-border rounded-lg hover:bg-secondary/30 transition-colors">
                  <RadioGroupItem value="client" id="role-client" className="mt-0.5" />
                  <div className="flex-1">
                    <label 
                      htmlFor="role-client" 
                      className="text-[13px] sm:text-[14px] text-foreground cursor-pointer block"
                      style={{ fontFamily: 'var(--font-family-body)', fontWeight: 'var(--font-weight-medium)' }}
                    >
                      Client
                    </label>
                    <p 
                      className="text-[11px] sm:text-[12px] text-muted-foreground mt-1"
                      style={{ fontFamily: 'var(--font-family-body)' }}
                    >
                      Access to assigned projects and associated export file(s)
                    </p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Client Selection - Only visible when role is "client" */}
          {selectedRole === 'client' && (
            <div className="space-y-2">
              <label 
                className="text-[12px] text-muted-foreground"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Client <span className="text-destructive">*</span>
              </label>
              <Select onValueChange={setSelectedClient} value={selectedClient}>
                <SelectTrigger className="w-full h-11 rounded-lg bg-background border-border hover:border-accent transition-colors text-[14px]">
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map(client => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Status Radio Group */}
          <div className="space-y-3">
            <label 
              className="text-[12px] text-muted-foreground"
              style={{ fontFamily: 'var(--font-family-body)' }}
            >
              Status
            </label>
            <RadioGroup value={userStatus} onValueChange={(value) => setUserStatus(value as 'active' | 'inactive')}>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active" id="user-active" />
                  <label 
                    htmlFor="user-active" 
                    className="text-[14px] text-foreground cursor-pointer"
                    style={{ fontFamily: 'var(--font-family-body)' }}
                  >
                    Active
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inactive" id="user-inactive" />
                  <label 
                    htmlFor="user-inactive" 
                    className="text-[14px] text-foreground cursor-pointer"
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
            disabled={!userFirstName || !userLastName || !userEmail || (selectedRole === 'client' && !selectedClient)}
            className="px-4 sm:px-6 py-2 sm:py-2.5 bg-foreground text-background rounded-[var(--radius-button)] hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[13px] sm:text-[14px] w-full sm:w-auto cursor-pointer"
            style={{ 
              fontFamily: 'var(--font-family-body)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            Add User
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}