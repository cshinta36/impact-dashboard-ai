import { PageHeader } from '../components/PageHeader';
import { StatCard } from '../components/StatCard';
import { Button } from '../components/Button';
import { DataTable, Column } from '../components/DataTable';
import { StatusPill } from '../components/StatusPill';
import { Download, MessageSquare, Users, TrendingUp, FileText, Calendar as CalendarIcon, CheckCircle2, Building2, UserPlus } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../components/ui/select';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '../components/ui/popover';
import { Calendar } from '../components/ui/calendar';
import { AddClientModal } from '../components/modals/AddClientModal';
import { AddProjectModal } from '../components/modals/AddProjectModal';
import { AddUserModal } from '../components/modals/AddUserModal';
import { useState, useMemo } from 'react';

interface RecentExport {
  id: string;
  project: string;
  dateRange: string;
  status: 'completed' | 'processing' | 'failed';
  exportedAt: string;
}

interface DashboardProps {
  onNavigate?: (view: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps = {}) {
  const [selectedProject, setSelectedProject] = useState('all');
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2025, 11, 9), // Dec 9, 2025
    to: new Date(2026, 0, 8) // Jan 8, 2026
  });

  // Modal states
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  // Mock clients data
  const clientsData = [
    { id: 'acme-corp', name: 'Acme Corp' },
    { id: 'techstart-inc', name: 'TechStart Inc' },
    { id: 'megacorp-ltd', name: 'MegaCorp Ltd' },
    { id: 'startupxyz', name: 'StartupXYZ' },
  ];

  // Mock projects data
  const projects = [
    { id: 'all', name: 'All Projects' },
    { id: 'jeffbot', name: 'Jeffbot' },
    { id: 'support-bot', name: 'Support Bot' },
    { id: 'sales-assistant', name: 'Sales Assistant' },
    { id: 'faq-bot', name: 'FAQ Bot' },
  ];

  // Mock stats based on selected project
  const getStatsForProject = (projectId: string) => {
    if (projectId === 'jeffbot') {
      return {
        uniqueUsers: '139',
        totalInteractions: '331',
        activeConversations: '12',
      };
    }
    // Default for "All Projects"
    return {
      uniqueUsers: '2,349',
      totalInteractions: '12,847',
      activeConversations: '48',
    };
  };

  const stats = getStatsForProject(selectedProject);

  const formatDateRange = (from: Date, to: Date) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return `${from.toLocaleDateString('en-US', options)} - ${to.toLocaleDateString('en-US', options)}`;
  };

  // Mock data for recent exports
  const recentExports: RecentExport[] = [
    {
      id: '1',
      project: 'Support Bot',
      dateRange: 'Dec 1-31, 2025',
      status: 'completed',
      exportedAt: 'Jan 5, 2026'
    },
    {
      id: '2',
      project: 'Sales Assistant',
      dateRange: 'Dec 15-31, 2025',
      status: 'completed',
      exportedAt: 'Jan 3, 2026'
    },
    {
      id: '3',
      project: 'FAQ Bot',
      dateRange: 'Jan 1-7, 2026',
      status: 'processing',
      exportedAt: 'Jan 8, 2026'
    },
  ];

  const exportColumns: Column<RecentExport>[] = [
    {
      key: 'project',
      header: 'Project',
      width: '25%'
    },
    {
      key: 'dateRange',
      header: 'Date Range',
      width: '25%',
      render: (row) => (
        <span className="text-muted-foreground">{row.dateRange}</span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      width: '20%',
      render: (row) => {
        const statusMap: Record<string, 'success' | 'warning' | 'error'> = {
          completed: 'success',
          processing: 'warning',
          failed: 'error'
        };
        return <StatusPill status={statusMap[row.status]} label={row.status.charAt(0).toUpperCase() + row.status.slice(1)} />;
      }
    },
    {
      key: 'exportedAt',
      header: 'Exported',
      width: '20%',
      render: (row) => (
        <span className="text-muted-foreground">{row.exportedAt}</span>
      )
    },
    {
      key: 'actions',
      header: '',
      width: '6%',
      render: (row) => (
        <div className="flex items-center justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log('Downloading export:', row);
            }}
            className={`p-2 rounded-lg transition-colors ${
              row.status === 'completed'
                ? 'text-muted-foreground hover:text-foreground hover:bg-secondary/50 cursor-pointer'
                : 'text-muted opacity-40 cursor-not-allowed'
            }`}
            title={row.status === 'completed' ? 'Download export' : 'Export not ready for download'}
            disabled={row.status !== 'completed'}
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="h-full flex flex-col bg-background">
      <PageHeader 
        title="Dashboard"
        description="AI chatbot usage metrics and insights"
      />

      <div className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
          {/* Workspace-Specific Section - Visually Distinct Container */}
          <div className="bg-card border-2 border-border rounded-[var(--radius-card)] p-4 sm:p-6 lg:p-8 shadow-sm">
            {/* Export Transcripts Section */}
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex-1 min-w-0">
                  <h2 
                    className="text-[18px] sm:text-[20px] lg:text-[22px] text-foreground"
                    style={{ 
                      fontFamily: 'var(--font-family-display)',
                      fontWeight: 'var(--font-weight-normal)'
                    }}
                  >
                    Export Transcripts
                  </h2>
                  <p 
                    className="text-[12px] sm:text-[13px] text-muted-foreground mt-1"
                    style={{ fontFamily: 'var(--font-family-body)' }}
                  >
                    Download conversation data as CSV
                  </p>
                </div>
              </div>

              {/* Export Form Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Select Workspace */}
                <div className="flex flex-col">
                  <label 
                    className="block text-[12px] text-muted-foreground mb-2"
                    style={{ fontFamily: 'var(--font-family-body)' }}
                  >
                    Select Workspace
                  </label>
                  <Select value={selectedProject} onValueChange={setSelectedProject}>
                    <SelectTrigger className="w-full !h-11 bg-background !border-border hover:border-accent transition-colors text-[14px] !rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Select Date Range */}
                <div className="flex flex-col">
                  <label 
                    className="block text-[12px] text-muted-foreground mb-2"
                    style={{ fontFamily: 'var(--font-family-body)' }}
                  >
                    Select Date Range
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button 
                        className="w-full flex items-center gap-2 px-3 py-2 border border-border rounded-lg bg-background hover:border-accent transition-colors text-left h-11"
                      >
                        <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                        <span 
                          className="text-[14px] text-foreground flex-1"
                          style={{ fontFamily: 'var(--font-family-body)' }}
                        >
                          {formatDateRange(dateRange.from, dateRange.to)}
                        </span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={{ from: dateRange.from, to: dateRange.to }}
                        onSelect={(range) => {
                          if (range?.from && range?.to) {
                            setDateRange({ from: range.from, to: range.to });
                          }
                        }}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Queue Export Button */}
                <div className="flex flex-col">
                  <label 
                    className="block text-[12px] text-muted-foreground mb-2 opacity-0"
                    style={{ fontFamily: 'var(--font-family-body)' }}
                  >
                    Action
                  </label>
                  <button 
                    className="w-full bg-foreground text-background px-6 py-2.5 rounded-[var(--radius-button)] hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 h-11"
                    style={{ fontFamily: 'var(--font-family-body)', fontWeight: 'var(--font-weight-medium)' }}
                    onClick={() => {
                      console.log('Queue export for:', selectedProject, dateRange);
                      alert(`Queueing export for ${projects.find(p => p.id === selectedProject)?.name} from ${formatDateRange(dateRange.from, dateRange.to)}`);
                    }}
                  >
                    <Download className="w-4 h-4" />
                    Queue CSV Export
                  </button>
                </div>

                {/* Notification Box */}
                <div className="flex flex-col">
                  <label 
                    className="block text-[12px] text-muted-foreground mb-2 opacity-0"
                    style={{ fontFamily: 'var(--font-family-body)' }}
                  >
                    Status
                  </label>
                  <div className="bg-[#d4f4dd] border border-[#7bcb93] rounded-lg p-3 h-11 flex items-center">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0f7c3a] flex-shrink-0" />
                      <span 
                        className="text-[12px] text-[#0f7c3a]"
                        style={{ 
                          fontFamily: 'var(--font-family-body)',
                          fontWeight: 'var(--font-weight-medium)'
                        }}
                      >
                        Ready to queue export
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Workspace Stats - 2 cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-background border border-border rounded-[var(--radius-card)] p-6">
                <div className="flex items-start justify-between mb-3">
                  <span 
                    className="text-[12px] text-muted-foreground uppercase tracking-wide"
                    style={{ fontFamily: 'var(--font-family-body)' }}
                  >
                    Total Unique Users
                  </span>
                  <Users className="w-5 h-5 text-muted-foreground" />
                </div>
                <div 
                  className="text-[36px] text-foreground"
                  style={{ 
                    fontFamily: 'var(--font-family-display)',
                    fontWeight: 'var(--font-weight-normal)',
                    lineHeight: '1'
                  }}
                >
                  {stats.uniqueUsers}
                </div>
              </div>

              <div className="bg-background border border-border rounded-[var(--radius-card)] p-6">
                <div className="flex items-start justify-between mb-3">
                  <span 
                    className="text-[12px] text-muted-foreground uppercase tracking-wide"
                    style={{ fontFamily: 'var(--font-family-body)' }}
                  >
                    Total Interactions
                  </span>
                  <MessageSquare className="w-5 h-5 text-muted-foreground" />
                </div>
                <div 
                  className="text-[36px] text-foreground mb-1"
                  style={{ 
                    fontFamily: 'var(--font-family-display)',
                    fontWeight: 'var(--font-weight-normal)',
                    lineHeight: '1'
                  }}
                >
                  {stats.totalInteractions}
                </div>
                <span 
                  className="text-[12px] text-muted-foreground"
                  style={{ fontFamily: 'var(--font-family-body)' }}
                >
                  conversations started
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-[var(--radius-card)] p-6">
            <h2 
              className="text-[18px] text-foreground mb-4"
              style={{ 
                fontFamily: 'var(--font-family-display)',
                fontWeight: 'var(--font-weight-normal)'
              }}
            >
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={() => setIsAddClientModalOpen(true)}
                className="flex flex-col items-start p-4 border border-border rounded-lg hover:bg-secondary/30 transition-colors text-left"
              >
                <Building2 className="w-5 h-5 text-accent mb-2" />
                <span 
                  className="text-[14px] text-foreground mb-1"
                  style={{ fontFamily: 'var(--font-family-body)', fontWeight: 'var(--font-weight-medium)' }}
                >
                  Add New Client
                </span>
                <span 
                  className="text-[12px] text-muted-foreground"
                  style={{ fontFamily: 'var(--font-family-body)' }}
                >
                  Create a new client account
                </span>
              </button>

              <button 
                onClick={() => setIsAddProjectModalOpen(true)}
                className="flex flex-col items-start p-4 border border-border rounded-lg hover:bg-secondary/30 transition-colors text-left"
              >
                <MessageSquare className="w-5 h-5 text-accent mb-2" />
                <span 
                  className="text-[14px] text-foreground mb-1"
                  style={{ fontFamily: 'var(--font-family-body)', fontWeight: 'var(--font-weight-medium)' }}
                >
                  Create New Project
                </span>
                <span 
                  className="text-[12px] text-muted-foreground"
                  style={{ fontFamily: 'var(--font-family-body)' }}
                >
                  Set up a new chatbot project
                </span>
              </button>

              <button 
                onClick={() => setIsAddUserModalOpen(true)}
                className="flex flex-col items-start p-4 border border-border rounded-lg hover:bg-secondary/30 transition-colors text-left"
              >
                <UserPlus className="w-5 h-5 text-accent mb-2" />
                <span 
                  className="text-[14px] text-foreground mb-1"
                  style={{ fontFamily: 'var(--font-family-body)', fontWeight: 'var(--font-weight-medium)' }}
                >
                  Add New User
                </span>
                <span 
                  className="text-[12px] text-muted-foreground"
                  style={{ fontFamily: 'var(--font-family-body)' }}
                >
                  Add or edit user accounts
                </span>
              </button>
            </div>
          </div>

          {/* Recent Exports */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 
                className="text-[18px] text-foreground"
                style={{ 
                  fontFamily: 'var(--font-family-display)',
                  fontWeight: 'var(--font-weight-normal)'
                }}
              >
                Recent Exports
              </h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate?.('exports')}
              >
                View All
              </Button>
            </div>
            <DataTable 
              columns={exportColumns}
              data={recentExports}
            />
          </div>
        </div>
      </div>

      {/* Add Client Modal */}
      <AddClientModal 
        open={isAddClientModalOpen} 
        onOpenChange={setIsAddClientModalOpen}
        onSubmit={(data) => console.log('Add client:', data)}
      />

      {/* Add Project Modal */}
      <AddProjectModal 
        open={isAddProjectModalOpen} 
        onOpenChange={setIsAddProjectModalOpen}
        clients={clientsData}
        onSubmit={(data) => console.log('Add project:', data)}
      />

      {/* Add User Modal */}
      <AddUserModal 
        open={isAddUserModalOpen} 
        onOpenChange={setIsAddUserModalOpen}
        clients={clientsData}
        onSubmit={(data) => console.log('Add user:', data)}
      />
    </div>
  );
}