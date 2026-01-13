import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/Button';
import { DataTable, Column } from '../components/DataTable';
import { StatusPill } from '../components/StatusPill';
import { Plus, Search, Edit2 } from 'lucide-react';
import { useState, useMemo } from 'react';
import { AddUserModal } from '../components/modals/AddUserModal';
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

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'viewer';
  client: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

export function Users() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  // Form state
  const [selectedClient, setSelectedClient] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('client');
  const [userStatus, setUserStatus] = useState<'active' | 'inactive'>('active');

  // Mock clients data
  const clients = [
    { id: 'acme-corp', name: 'Acme Corp' },
    { id: 'techstart-inc', name: 'TechStart Inc' },
    { id: 'megacorp-ltd', name: 'MegaCorp Ltd' },
    { id: 'startupxyz', name: 'StartupXYZ' },
  ];

  const handleAddUser = () => {
    console.log('Adding user:', { 
      selectedClient, 
      userFirstName, 
      userLastName, 
      userEmail, 
      userPassword, 
      confirmPassword, 
      selectedRole, 
      userStatus 
    });
    // Add logic to create user
    setIsAddUserModalOpen(false);
    // Reset form
    setSelectedClient('');
    setUserFirstName('');
    setUserLastName('');
    setUserEmail('');
    setUserPassword('');
    setConfirmPassword('');
    setSelectedRole('client');
    setUserStatus('active');
  };

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setUserFirstName(user.name.split(' ')[0]);
    setUserLastName(user.name.split(' ')[1] || '');
    setUserEmail(user.email);
    setSelectedClient(clients.find(c => c.name === user.client)?.id || '');
    setSelectedRole(user.role === 'admin' ? 'superadmin' : 'client');
    setUserStatus(user.status);
    setUserPassword('');
    setConfirmPassword('');
    setIsEditUserModalOpen(true);
  };

  const handleEditUser = () => {
    if (editingUser) {
      console.log('Editing user:', { 
        selectedClient, 
        userFirstName, 
        userLastName, 
        userEmail, 
        userPassword, 
        confirmPassword, 
        selectedRole, 
        userStatus 
      });
      // Add logic to update user
      setIsEditUserModalOpen(false);
      // Reset form
      setSelectedClient('');
      setUserFirstName('');
      setUserLastName('');
      setUserEmail('');
      setUserPassword('');
      setConfirmPassword('');
      setSelectedRole('client');
      setUserStatus('active');
      setEditingUser(null);
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

  const users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@acmecorp.com',
      role: 'admin',
      client: 'Acme Corp',
      status: 'active',
      lastLogin: '2 hours ago'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@techstart.com',
      role: 'manager',
      client: 'TechStart Inc',
      status: 'active',
      lastLogin: '5 minutes ago'
    },
    {
      id: '3',
      name: 'Admin User',
      email: 'admin@juicebox.ai',
      role: 'admin',
      client: 'System',
      status: 'active',
      lastLogin: '1 hour ago'
    },
    {
      id: '4',
      name: 'Bob Johnson',
      email: 'bob@megacorp.com',
      role: 'viewer',
      client: 'MegaCorp Ltd',
      status: 'active',
      lastLogin: '1 day ago'
    },
    {
      id: '5',
      name: 'Sarah Williams',
      email: 'sarah@startupxyz.com',
      role: 'manager',
      client: 'StartupXYZ',
      status: 'inactive',
      lastLogin: '2 weeks ago'
    },
  ];

  const roleLabels: Record<string, string> = {
    admin: 'Admin',
    manager: 'Manager',
    viewer: 'Viewer'
  };

  const columns: Column<User>[] = [
    {
      key: 'name',
      header: 'Name',
      width: '18%',
      sortable: true,
      onSort: () => handleSort('name')
    },
    {
      key: 'email',
      header: 'Email',
      width: '22%',
      sortable: true,
      onSort: () => handleSort('email'),
      render: (row) => (
        <span className="text-muted-foreground">{row.email}</span>
      )
    },
    {
      key: 'role',
      header: 'Role',
      width: '12%',
      sortable: true,
      onSort: () => handleSort('role'),
      render: (row) => (
        <span className="text-[13px] px-2.5 py-1 bg-secondary rounded-md" style={{ fontFamily: 'var(--font-family-body)' }}>
          {roleLabels[row.role]}
        </span>
      )
    },
    {
      key: 'client',
      header: 'Client',
      width: '16%',
      sortable: true,
      onSort: () => handleSort('client'),
      render: (row) => (
        <span className="text-muted-foreground">{row.client}</span>
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
      key: 'lastLogin',
      header: 'Last Login',
      width: '12%',
      render: (row) => (
        <span className="text-muted-foreground">{row.lastLogin}</span>
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
              handleEditClick(row);
            }}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
            title="Edit user"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  const filteredAndSortedUsers = useMemo(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.client.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      let aVal: any = a[sortColumn as keyof User];
      let bVal: any = b[sortColumn as keyof User];

      // Handle string sorting
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return 0;
    });

    return sorted;
  }, [users, searchQuery, sortColumn, sortDirection]);

  return (
    <div className="h-full flex flex-col bg-background">
      <PageHeader 
        title="Users"
        description="Manage user accounts and permissions"
        actions={
          <Button 
            variant="primary" 
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddUserModalOpen(true)}
          >
            Add User
          </Button>
        }
      />

      <div className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
          {/* Search */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg text-[13px] sm:text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                style={{ fontFamily: 'var(--font-family-body)' }}
              />
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-[12px] uppercase tracking-wide text-muted-foreground" style={{ fontFamily: 'var(--font-family-body)' }}>
                Total Users
              </p>
              <p className="text-[24px] text-foreground mt-2" style={{ fontFamily: 'var(--font-family-display)', fontWeight: 'var(--font-weight-light)' }}>
                {users.length}
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-[12px] uppercase tracking-wide text-muted-foreground" style={{ fontFamily: 'var(--font-family-body)' }}>
                Active
              </p>
              <p className="text-[24px] text-chart-3 mt-2" style={{ fontFamily: 'var(--font-family-display)', fontWeight: 'var(--font-weight-light)' }}>
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-[12px] uppercase tracking-wide text-muted-foreground" style={{ fontFamily: 'var(--font-family-body)' }}>
                Admins
              </p>
              <p className="text-[24px] text-foreground mt-2" style={{ fontFamily: 'var(--font-family-display)', fontWeight: 'var(--font-weight-light)' }}>
                {users.filter(u => u.role === 'admin').length}
              </p>
            </div>
          </div>

          {/* Table */}
          <DataTable 
            columns={columns}
            data={filteredAndSortedUsers}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            emptyMessage="No users found. Add your first user to get started."
          />
        </div>
      </div>

      {/* Add User Modal */}
      <AddUserModal
        open={isAddUserModalOpen}
        onOpenChange={setIsAddUserModalOpen}
        clients={clients}
        onSubmit={(data) => {
          console.log('Adding user:', data);
          // Add logic to create user
        }}
      />

      {/* Edit User Modal */}
      <Dialog open={isEditUserModalOpen} onOpenChange={setIsEditUserModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle 
              className="text-[18px] text-foreground"
              style={{ 
                fontFamily: 'var(--font-family-display)',
                fontWeight: 'var(--font-weight-normal)'
              }}
            >
              User Details
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Name and Email in two columns */}
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
                  value={userFirstName}
                  onChange={(e) => setUserFirstName(e.target.value)}
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
                  value={userLastName}
                  onChange={(e) => setUserLastName(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-accent transition-colors text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring h-11"
                  style={{ fontFamily: 'var(--font-family-body)' }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label 
                className="text-[12px] text-muted-foreground"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Email <span className="text-destructive">*</span>
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-accent transition-colors text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring h-11"
                style={{ fontFamily: 'var(--font-family-body)' }}
              />
            </div>

            {/* Password and Confirm Password in two columns */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label 
                  className="text-[12px] text-muted-foreground"
                  style={{ fontFamily: 'var(--font-family-body)' }}
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-accent transition-colors text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring h-11"
                  style={{ fontFamily: 'var(--font-family-body)' }}
                />
              </div>

              <div className="space-y-2">
                <label 
                  className="text-[12px] text-muted-foreground"
                  style={{ fontFamily: 'var(--font-family-body)' }}
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-accent transition-colors text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring h-11"
                  style={{ fontFamily: 'var(--font-family-body)' }}
                />
              </div>
            </div>

            {/* Role */}
            <div className="space-y-3">
              <label 
                className="text-[14px] text-foreground"
                style={{ 
                  fontFamily: 'var(--font-family-body)',
                  fontWeight: 'var(--font-weight-medium)'
                }}
              >
                Role
              </label>
              <p 
                className="text-[12px] text-muted-foreground"
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
                        className="text-[14px] text-foreground cursor-pointer block"
                        style={{ fontFamily: 'var(--font-family-body)', fontWeight: 'var(--font-weight-medium)' }}
                      >
                        Super Admin
                      </label>
                      <p 
                        className="text-[12px] text-muted-foreground mt-1"
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
                        className="text-[14px] text-foreground cursor-pointer block"
                        style={{ fontFamily: 'var(--font-family-body)', fontWeight: 'var(--font-weight-medium)' }}
                      >
                        Client
                      </label>
                      <p 
                        className="text-[12px] text-muted-foreground mt-1"
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
                  <SelectTrigger className="w-full h-11 bg-background !border-border hover:border-accent transition-colors text-[14px]">
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

          <DialogFooter className="gap-3">
            <button
              type="button"
              onClick={() => setIsEditUserModalOpen(false)}
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
              onClick={handleEditUser}
              disabled={!userFirstName || !userLastName || !userEmail || (selectedRole === 'client' && !selectedClient)}
              className="px-6 py-2.5 bg-foreground text-background rounded-[var(--radius-button)] hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[14px]"
              style={{ 
                fontFamily: 'var(--font-family-body)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              Update User
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}