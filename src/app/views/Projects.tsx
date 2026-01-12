import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/Button';
import { DataTable, Column } from '../components/DataTable';
import { StatusPill } from '../components/StatusPill';
import { Plus, Search, Edit2 } from 'lucide-react';
import { useState, useMemo } from 'react';
import { AddProjectModal } from '../components/modals/AddProjectModal';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '../components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../components/ui/select';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';

interface Project {
  id: string;
  name: string;
  client: string;
  conversations: number;
  status: 'active' | 'inactive';
  lastActive: string;
  created: string;
  apiKey?: string;
}

export function Projects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectId, setProjectId] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [projectStatus, setProjectStatus] = useState<'active' | 'inactive'>('active');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [sortColumn, setSortColumn] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  // Mock clients data
  const clients = [
    { id: 'acme-corp', name: 'Acme Corp' },
    { id: 'techstart-inc', name: 'TechStart Inc' },
    { id: 'megacorp-ltd', name: 'MegaCorp Ltd' },
    { id: 'startupxyz', name: 'StartupXYZ' },
  ];

  const handleAddProject = () => {
    console.log('Adding project:', { selectedClient, projectName, projectId, apiKey, projectStatus });
    // Add logic to create project
    setIsAddProjectModalOpen(false);
    // Reset form
    setSelectedClient('');
    setProjectName('');
    setProjectId('');
    setApiKey('');
    setProjectStatus('active');
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setSelectedClient(project.client.toLowerCase().replace(' ', '-'));
    setProjectName(project.name);
    setApiKey(project.apiKey || '');
    setProjectStatus(project.status);
    setIsEditModalOpen(true);
  };

  const handleUpdateProject = () => {
    console.log('Updating project:', { editingProject, selectedClient, projectName, apiKey, projectStatus });
    // Add logic to update project
    setIsEditModalOpen(false);
    setEditingProject(null);
    // Reset form
    setSelectedClient('');
    setProjectName('');
    setApiKey('');
    setProjectStatus('active');
  };

  const handleDeleteProject = (project: Project) => {
    if (confirm(`Are you sure you want to delete \"${project.name}\"?`)) {
      console.log('Deleting project:', project);
      // Add logic to delete project
    }
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const projects: Project[] = [
    {
      id: '1',
      name: 'Support Bot',
      client: 'Acme Corp',
      conversations: 12847,
      status: 'active',
      lastActive: '2 hours ago',
      created: 'Nov 15, 2025',
      apiKey: 'VF.DM.123abc...'
    },
    {
      id: '2',
      name: 'Sales Assistant',
      client: 'TechStart Inc',
      conversations: 8432,
      status: 'active',
      lastActive: '5 minutes ago',
      created: 'Dec 1, 2025',
      apiKey: 'VF.DM.456def...'
    },
    {
      id: '3',
      name: 'FAQ Bot',
      client: 'Acme Corp',
      conversations: 5621,
      status: 'active',
      lastActive: '1 hour ago',
      created: 'Oct 20, 2025',
      apiKey: 'VF.DM.789ghi...'
    },
    {
      id: '4',
      name: 'Onboarding Assistant',
      client: 'MegaCorp Ltd',
      conversations: 3890,
      status: 'active',
      lastActive: '3 days ago',
      created: 'Sep 10, 2025',
      apiKey: 'VF.DM.012jkl...'
    },
    {
      id: '5',
      name: 'HR Helper',
      client: 'StartupXYZ',
      conversations: 2134,
      status: 'inactive',
      lastActive: '2 weeks ago',
      created: 'Aug 5, 2025',
      apiKey: 'VF.DM.345mno...'
    },
    {
      id: '6',
      name: 'Product Guide',
      client: 'TechStart Inc',
      conversations: 1845,
      status: 'active',
      lastActive: '6 hours ago',
      created: 'Dec 15, 2025',
      apiKey: 'VF.DM.678pqr...'
    },
    {
      id: '7',
      name: 'Lead Qualifier',
      client: 'MegaCorp Ltd',
      conversations: 1203,
      status: 'inactive',
      lastActive: '1 month ago',
      created: 'Jul 22, 2025',
      apiKey: 'VF.DM.901stu...'
    },
    {
      id: '8',
      name: 'Customer Feedback',
      client: 'Acme Corp',
      conversations: 945,
      status: 'inactive',
      lastActive: '3 weeks ago',
      created: 'Jun 30, 2025',
      apiKey: 'VF.DM.234vwx...'
    },
  ];

  const columns: Column<Project>[] = [
    {
      key: 'name',
      header: 'Project Name',
      width: '22%',
      sortable: true,
      onSort: () => handleSort('name')
    },
    {
      key: 'client',
      header: 'Client',
      width: '18%',
      sortable: true,
      onSort: () => handleSort('client'),
      render: (row) => (
        <span className="text-muted-foreground">{row.client}</span>
      )
    },
    {
      key: 'conversations',
      header: 'Conversations',
      width: '13%',
      sortable: true,
      onSort: () => handleSort('conversations'),
      render: (row) => (
        <span>{row.conversations.toLocaleString()}</span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      width: '10%',
      sortable: true,
      onSort: () => handleSort('status'),
      render: (row) => (
        <StatusPill status={row.status} />
      )
    },
    {
      key: 'lastActive',
      header: 'Last Active',
      width: '13%',
      render: (row) => (
        <span className="text-muted-foreground">{row.lastActive}</span>
      )
    },
    {
      key: 'created',
      header: 'Created',
      width: '12%',
      sortable: true,
      onSort: () => handleSort('created'),
      render: (row) => (
        <span className="text-muted-foreground">{row.created}</span>
      )
    },
    {
      key: 'actions',
      header: '',
      width: '12%',
      render: (row) => (
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEditProject(row);
            }}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
            title="Edit project"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  // Filtered and sorted data
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects.filter(project =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      let aVal: any = a[sortColumn as keyof Project];
      let bVal: any = b[sortColumn as keyof Project];

      // Handle numeric sorting
      if (sortColumn === 'conversations') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      // Handle string sorting
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return 0;
    });

    return sorted;
  }, [projects, searchQuery, sortColumn, sortDirection, statusFilter]);

  return (
    <div className="h-full flex flex-col bg-background">
      <PageHeader 
        title="Chatbot Projects"
        description="Manage your AI chatbot projects"
        actions={
          <Button 
            variant="primary" 
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddProjectModalOpen(true)}
          >
            Add Project
          </Button>
        }
      />

      <div className="flex-1 overflow-auto">
        <div className="p-8 space-y-6">
          {/* Search */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                style={{ fontFamily: 'var(--font-family-body)' }}
              />
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setStatusFilter('all')}
              className={`bg-card border rounded-lg p-4 text-left transition-all ${
                statusFilter === 'all' 
                  ? 'border-accent shadow-sm' 
                  : 'border-border hover:border-accent/50'
              }`}
            >
              <p 
                className="text-[12px] uppercase tracking-wide text-muted-foreground" 
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Total Projects
              </p>
              <p 
                className="text-[24px] text-foreground mt-2" 
                style={{ fontFamily: 'var(--font-family-display)', fontWeight: 'var(--font-weight-light)' }}
              >
                8
              </p>
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`bg-card border rounded-lg p-4 text-left transition-all ${
                statusFilter === 'active' 
                  ? 'border-accent shadow-sm' 
                  : 'border-border hover:border-accent/50'
              }`}
            >
              <p 
                className="text-[12px] uppercase tracking-wide text-muted-foreground" 
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Active
              </p>
              <p 
                className="text-[24px] text-chart-3 mt-2" 
                style={{ fontFamily: 'var(--font-family-display)', fontWeight: 'var(--font-weight-light)' }}
              >
                5
              </p>
            </button>
            <button
              onClick={() => setStatusFilter('inactive')}
              className={`bg-card border rounded-lg p-4 text-left transition-all ${
                statusFilter === 'inactive' 
                  ? 'border-accent shadow-sm' 
                  : 'border-border hover:border-accent/50'
              }`}
            >
              <p 
                className="text-[12px] uppercase tracking-wide text-muted-foreground" 
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Inactive
              </p>
              <p 
                className="text-[24px] text-muted-foreground mt-2" 
                style={{ fontFamily: 'var(--font-family-display)', fontWeight: 'var(--font-weight-light)' }}
              >
                3
              </p>
            </button>
          </div>

          {/* Table */}
          <DataTable 
            columns={columns}
            data={filteredAndSortedProjects}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            emptyMessage="No projects found. Create your first chatbot project to get started."
          />
        </div>
      </div>

      {/* Add Project Modal */}
      <AddProjectModal
        open={isAddProjectModalOpen}
        onOpenChange={setIsAddProjectModalOpen}
        clients={clients}
        onSubmit={(data) => {
          console.log('Adding project:', data);
          // Add logic to create project
        }}
      />

      {/* Edit Project Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle 
              className="text-[18px] text-foreground"
              style={{ 
                fontFamily: 'var(--font-family-display)',
                fontWeight: 'var(--font-weight-normal)'
              }}
            >
              Edit Project
            </DialogTitle>
            <DialogDescription 
              className="text-[14px]"
              style={{ fontFamily: 'var(--font-family-body)' }}
            >
              Update project details.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Chatbot Project ID - Full Width */}
            <div className="space-y-2">
              <label 
                className="text-[12px] text-muted-foreground"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Chatbot Project ID <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter project ID"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-accent transition-colors text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring h-11"
                style={{ fontFamily: 'var(--font-family-body)' }}
              />
            </div>

            {/* Chatbot API Key - Full Width */}
            <div className="space-y-2">
              <label 
                className="text-[12px] text-muted-foreground"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Chatbot API Key <span className="text-muted-foreground/70">(This will be encrypted in database)</span> <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                placeholder="VF.DM.xxxxxxxx"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-accent transition-colors text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring h-11"
                style={{ fontFamily: 'var(--font-family-body)' }}
              />
            </div>

            {/* Client and Project Name in two columns */}
            <div className="grid grid-cols-2 gap-4">
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

              <div className="space-y-2">
                <label 
                  className="text-[12px] text-muted-foreground"
                  style={{ fontFamily: 'var(--font-family-body)' }}
                >
                  Project Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-accent transition-colors text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring h-11"
                  style={{ fontFamily: 'var(--font-family-body)' }}
                />
              </div>
            </div>

            {/* Status Radio Group */}
            <div className="space-y-3">
              <label 
                className="text-[12px] text-muted-foreground"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Status
              </label>
              <RadioGroup value={projectStatus} onValueChange={(value) => setProjectStatus(value as 'active' | 'inactive')}>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="active" id="edit-active" />
                    <label 
                      htmlFor="edit-active" 
                      className="text-[14px] text-foreground cursor-pointer"
                      style={{ fontFamily: 'var(--font-family-body)' }}
                    >
                      Active
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inactive" id="edit-inactive" />
                    <label 
                      htmlFor="edit-inactive" 
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

          <DialogFooter className="gap-3">
            <button
              type="button"
              onClick={() => {
                setIsEditModalOpen(false);
                setEditingProject(null);
                setSelectedClient('');
                setProjectName('');
                setApiKey('');
                setProjectStatus('active');
              }}
              className="px-6 py-2.5 bg-secondary text-foreground border border-border rounded-[var(--radius-button)] hover:bg-secondary/80 transition-colors text-[14px]"
              style={{ 
                fontFamily: 'var(--font-family-body)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUpdateProject}
              disabled={!selectedClient || !projectName || !apiKey}
              className="px-6 py-2.5 bg-foreground text-background rounded-[var(--radius-button)] hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[14px]"
              style={{ 
                fontFamily: 'var(--font-family-body)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              Update Project
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}