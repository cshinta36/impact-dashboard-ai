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

interface AddProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clients: Client[];
  onSubmit?: (data: {
    clientId: string;
    projectName: string;
    projectId: string;
    apiKey: string;
    status: 'active' | 'inactive';
  }) => void;
}

export function AddProjectModal({ open, onOpenChange, clients, onSubmit }: AddProjectModalProps) {
  const [selectedClient, setSelectedClient] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectId, setProjectId] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [projectStatus, setProjectStatus] = useState<'active' | 'inactive'>('active');

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({
        clientId: selectedClient,
        projectName,
        projectId,
        apiKey,
        status: projectStatus
      });
    }
    
    // Reset form
    setSelectedClient('');
    setProjectName('');
    setProjectId('');
    setApiKey('');
    setProjectStatus('active');
    onOpenChange(false);
  };

  const handleCancel = () => {
    // Reset form
    setSelectedClient('');
    setProjectName('');
    setProjectId('');
    setApiKey('');
    setProjectStatus('active');
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
            Project Details
          </DialogTitle>
          <DialogDescription className="text-[13px] sm:text-[14px]">
            Add a new project to your account.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 py-3 sm:py-4">
          {/* Chatbot Project ID - Full Width */}
          <div className="space-y-2">
            <label 
              className="text-[11px] sm:text-[12px] text-muted-foreground"
              style={{ fontFamily: 'var(--font-family-body)' }}
            >
              Chatbot Project ID <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter project ID"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-accent transition-colors text-[13px] sm:text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring h-10 sm:h-11"
              style={{ fontFamily: 'var(--font-family-body)' }}
            />
          </div>

          {/* Chatbot API Key - Full Width */}
          <div className="space-y-2">
            <label 
              className="text-[11px] sm:text-[12px] text-muted-foreground"
              style={{ fontFamily: 'var(--font-family-body)' }}
            >
              Chatbot API Key <span className="text-muted-foreground/70 text-[10px] sm:text-[11px]">(This will be encrypted in database)</span> <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              placeholder="VF.DM.xxxxxxxx"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-accent transition-colors text-[13px] sm:text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring h-10 sm:h-11"
              style={{ fontFamily: 'var(--font-family-body)' }}
            />
          </div>

          {/* Client and Project Name in two columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label 
                className="text-[11px] sm:text-[12px] text-muted-foreground"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Client <span className="text-destructive">*</span>
              </label>
              <Select onValueChange={setSelectedClient} value={selectedClient}>
                <SelectTrigger className="w-full h-10 sm:h-11 rounded-lg bg-background border-border hover:border-accent transition-colors text-[13px] sm:text-[14px]">
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

            <div className="space-y-2">
              <label 
                className="text-[11px] sm:text-[12px] text-muted-foreground"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Project Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
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
            <RadioGroup value={projectStatus} onValueChange={(value) => setProjectStatus(value as 'active' | 'inactive')}>
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active" id="project-active" />
                  <label 
                    htmlFor="project-active" 
                    className="text-[13px] sm:text-[14px] text-foreground cursor-pointer"
                    style={{ fontFamily: 'var(--font-family-body)' }}
                  >
                    Active
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inactive" id="project-inactive" />
                  <label 
                    htmlFor="project-inactive" 
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
            className="px-4 sm:px-6 py-2 sm:py-2.5 bg-secondary text-foreground border border-border rounded-[var(--radius-button)] hover:bg-secondary/80 transition-colors text-[13px] sm:text-[14px] w-full sm:w-auto"
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
            disabled={!selectedClient || !projectName || !projectId || !apiKey}
            className="px-4 sm:px-6 py-2 sm:py-2.5 bg-foreground text-background rounded-[var(--radius-button)] hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[13px] sm:text-[14px] w-full sm:w-auto"
            style={{ 
              fontFamily: 'var(--font-family-body)',
              fontWeight: 'var(--font-weight-medium)'
            }}
          >
            Add Project
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}