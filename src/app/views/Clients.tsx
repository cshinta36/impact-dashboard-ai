import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/Button';
import { DataTable, Column } from '../components/DataTable';
import { StatusPill } from '../components/StatusPill';
import { Plus, Search, Edit2 } from 'lucide-react';
import { useState, useMemo } from 'react';
import { AddClientModal } from '../components/modals/AddClientModal';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '../components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';

interface Client {
  id: string;
  name: string;
  slug: string;
  projects: number;
  users: number;
  status: 'active' | 'inactive';
  created: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export function Clients() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [clientStatus, setClientStatus] = useState<'active' | 'inactive'>('active');
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [sortColumn, setSortColumn] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleAddClient = () => {
    console.log('Adding client:', { businessName, firstName, lastName, email, clientStatus });
    // Add logic to create client
    setIsAddClientModalOpen(false);
    // Reset form
    setBusinessName('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setClientStatus('active');
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setBusinessName(client.name);
    setFirstName(client.firstName || '');
    setLastName(client.lastName || '');
    setEmail(client.email || '');
    setClientStatus(client.status);
    setIsEditModalOpen(true);
  };

  const handleUpdateClient = () => {
    console.log('Updating client:', { editingClient, businessName, firstName, lastName, email, clientStatus });
    // Add logic to update client
    setIsEditModalOpen(false);
    setEditingClient(null);
    // Reset form
    setBusinessName('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setClientStatus('active');
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const clients: Client[] = [
    {
      id: '1',
      name: 'Acme Corp',
      slug: 'acme-corp',
      projects: 3,
      users: 12,
      status: 'active',
      created: 'Oct 15, 2025',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@acmecorp.com'
    },
    {
      id: '2',
      name: 'TechStart Inc',
      slug: 'techstart',
      projects: 2,
      users: 8,
      status: 'active',
      created: 'Nov 1, 2025',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah@techstart.com'
    },
    {
      id: '3',
      name: 'MegaCorp Ltd',
      slug: 'megacorp',
      projects: 2,
      users: 15,
      status: 'active',
      created: 'Sep 5, 2025',
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michael@megacorp.com'
    },
    {
      id: '4',
      name: 'StartupXYZ',
      slug: 'startupxyz',
      projects: 1,
      users: 5,
      status: 'inactive',
      created: 'Aug 1, 2025',
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily@startupxyz.com'
    },
  ];

  const columns: Column<Client>[] = [
    {
      key: 'name',
      header: 'Name',
      width: '30%',
      sortable: true,
      onSort: () => handleSort('name')
    },
    {
      key: 'slug',
      header: 'Slug',
      width: '20%',
      sortable: true,
      onSort: () => handleSort('slug'),
      render: (row) => (
        <span className="text-muted-foreground font-mono text-[13px]">{row.slug}</span>
      )
    },
    {
      key: 'projects',
      header: 'Projects',
      width: '12%',
      sortable: true,
      onSort: () => handleSort('projects')
    },
    {
      key: 'users',
      header: 'Users',
      width: '12%',
      sortable: true,
      onSort: () => handleSort('users')
    },
    {
      key: 'status',
      header: 'Status',
      width: '12%',
      sortable: true,
      onSort: () => handleSort('status'),
      render: (row) => (
        <StatusPill status={row.status} />
      )
    },
    {
      key: 'created',
      header: 'Created',
      width: '14%',
      sortable: true,
      onSort: () => handleSort('created'),
      render: (row) => (
        <span className="text-muted-foreground">{row.created}</span>
      )
    },
    {
      key: 'actions',
      header: '',
      width: '10%',
      render: (row) => (
        <div className="flex items-center justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEditClient(row);
            }}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
            title="Edit client"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  const filteredAndSortedClients = useMemo(() => {
    const filtered = clients.filter(client => 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      let aVal: any = a[sortColumn as keyof Client];
      let bVal: any = b[sortColumn as keyof Client];

      // Handle numeric sorting
      if (sortColumn === 'projects' || sortColumn === 'users') {
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
  }, [clients, searchQuery, sortColumn, sortDirection]);

  return (
    <div className="h-full flex flex-col bg-background">
      <PageHeader 
        title="Clients"
        description="Manage client accounts and access"
        actions={
          <Button 
            variant="primary" 
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddClientModalOpen(true)}
          >
            Add Client
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
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                style={{ fontFamily: 'var(--font-family-body)' }}
              />
            </div>
          </div>

          {/* Table */}
          <DataTable 
            columns={columns}
            data={filteredAndSortedClients}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            emptyMessage="No clients found. Add your first client to get started."
          />

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <p className="text-[13px] text-muted-foreground" style={{ fontFamily: 'var(--font-family-body)' }}>
              Showing 1 to {filteredAndSortedClients.length} of {clients.length} results
            </p>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" disabled>
                Previous
              </Button>
              <Button variant="secondary" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Client Modal */}
      <AddClientModal
        open={isAddClientModalOpen}
        onOpenChange={setIsAddClientModalOpen}
        onSubmit={(data) => {
          console.log('Adding client:', data);
          // Add logic to create client
        }}
      />

      {/* Edit Client Modal */}
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
              Edit Client
            </DialogTitle>
            <DialogDescription 
              className="text-[14px]"
              style={{ fontFamily: 'var(--font-family-body)' }}
            >
              Update client details.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* First Name and Last Name in two columns */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label 
                  className="text-[12px] text-muted-foreground"
                  style={{ fontFamily: 'var(--font-family-body)' }}
                >
                  First Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-accent transition-colors text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring h-11"
                  style={{ fontFamily: 'var(--font-family-body)' }}
                />
              </div>

              <div className="space-y-2">
                <label 
                  className="text-[12px] text-muted-foreground"
                  style={{ fontFamily: 'var(--font-family-body)' }}
                >
                  Last Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-accent transition-colors text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring h-11"
                  style={{ fontFamily: 'var(--font-family-body)' }}
                />
              </div>
            </div>

            {/* Company Name and Email in two columns */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label 
                  className="text-[12px] text-muted-foreground"
                  style={{ fontFamily: 'var(--font-family-body)' }}
                >
                  Company Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter company name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-accent transition-colors text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring h-11"
                  style={{ fontFamily: 'var(--font-family-body)' }}
                />
              </div>

              <div className="space-y-2">
                <label 
                  className="text-[12px] text-muted-foreground"
                  style={{ fontFamily: 'var(--font-family-body)' }}
                >
                  Email Address <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <RadioGroup value={clientStatus} onValueChange={(value) => setClientStatus(value as 'active' | 'inactive')}>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="active" id="client-active" />
                    <label 
                      htmlFor="client-active" 
                      className="text-[14px] text-foreground cursor-pointer"
                      style={{ fontFamily: 'var(--font-family-body)' }}
                    >
                      Active
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inactive" id="client-inactive" />
                    <label 
                      htmlFor="client-inactive" 
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
                setBusinessName('');
                setFirstName('');
                setLastName('');
                setEmail('');
                setClientStatus('active');
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
              onClick={handleUpdateClient}
              disabled={!businessName || !firstName || !lastName || !email}
              className="px-6 py-2.5 bg-foreground text-background rounded-[var(--radius-button)] hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[14px]"
              style={{ 
                fontFamily: 'var(--font-family-body)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              Update Client
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}