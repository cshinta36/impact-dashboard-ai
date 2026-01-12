import { useState, useMemo } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/Button';
import { DataTable, Column } from '../components/DataTable';
import { StatusPill } from '../components/StatusPill';
import { Download, Search, Calendar as CalendarIcon, CheckCircle2, Trash2 } from 'lucide-react';
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
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '../components/ui/popover';
import { Calendar } from '../components/ui/calendar';

interface Export {
  id: string;
  project: string;
  dateRange: string;
  conversations: number;
  status: 'completed' | 'processing' | 'failed' | 'queued';
  createdBy: string;
  createdAt: string;
  createdAtTimestamp: number;
}

export function Exports() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewExportModalOpen, setIsNewExportModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [sortColumn, setSortColumn] = useState<string>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deletingExport, setDeletingExport] = useState<Export | null>(null);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2025, 11, 1), // Dec 1, 2025
    to: new Date(2025, 11, 31) // Dec 31, 2025
  });

  // Mock projects data
  const projects = [
    { id: 'support-bot', name: 'Support Bot' },
    { id: 'sales-assistant', name: 'Sales Assistant' },
    { id: 'faq-bot', name: 'FAQ Bot' },
    { id: 'onboarding-assistant', name: 'Onboarding Assistant' },
    { id: 'jeffbot', name: 'Jeffbot' },
  ];

  const formatDateRange = (from: Date, to: Date) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return `${from.toLocaleDateString('en-US', options)} - ${to.toLocaleDateString('en-US', options)}`;
  };

  const handleCreateExport = () => {
    console.log('Creating export for:', selectedProject, dateRange);
    // Add logic to create export
    setIsNewExportModalOpen(false);
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleDeleteExport = (exportItem: Export) => {
    setDeletingExport(exportItem);
    setDeleteConfirmText('');
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmText === 'DELETE' && deletingExport) {
      console.log('Deleting export:', deletingExport);
      // Add logic to delete export
      setIsDeleteModalOpen(false);
      setDeletingExport(null);
      setDeleteConfirmText('');
    }
  };

  const allExports: Export[] = [
    {
      id: '1',
      project: 'Support Bot',
      dateRange: 'Dec 1-31, 2025',
      conversations: 1247,
      status: 'completed',
      createdBy: 'John Doe',
      createdAt: 'Jan 8, 2026 14:23',
      createdAtTimestamp: new Date('2026-01-08T14:23:00').getTime()
    },
    {
      id: '2',
      project: 'Sales Assistant',
      dateRange: 'Dec 15-31, 2025',
      conversations: 856,
      status: 'completed',
      createdBy: 'Jane Smith',
      createdAt: 'Jan 8, 2026 09:15',
      createdAtTimestamp: new Date('2026-01-08T09:15:00').getTime()
    },
    {
      id: '3',
      project: 'FAQ Bot',
      dateRange: 'Jan 1-7, 2026',
      conversations: 423,
      status: 'processing',
      createdBy: 'John Doe',
      createdAt: 'Jan 8, 2026 08:30',
      createdAtTimestamp: new Date('2026-01-08T08:30:00').getTime()
    },
    {
      id: '4',
      project: 'Support Bot',
      dateRange: 'Jan 1-7, 2026',
      conversations: 0,
      status: 'queued',
      createdBy: 'Jane Smith',
      createdAt: 'Jan 8, 2026 07:45',
      createdAtTimestamp: new Date('2026-01-08T07:45:00').getTime()
    },
    {
      id: '5',
      project: 'Onboarding Assistant',
      dateRange: 'Dec 20-31, 2025',
      conversations: 234,
      status: 'failed',
      createdBy: 'Admin User',
      createdAt: 'Jan 7, 2026 16:20',
      createdAtTimestamp: new Date('2026-01-07T16:20:00').getTime()
    },
    {
      id: '6',
      project: 'Jeffbot',
      dateRange: 'Dec 10-20, 2025',
      conversations: 1543,
      status: 'completed',
      createdBy: 'John Doe',
      createdAt: 'Jan 7, 2026 11:30',
      createdAtTimestamp: new Date('2026-01-07T11:30:00').getTime()
    },
    {
      id: '7',
      project: 'Support Bot',
      dateRange: 'Dec 5-15, 2025',
      conversations: 982,
      status: 'completed',
      createdBy: 'Jane Smith',
      createdAt: 'Jan 6, 2026 15:45',
      createdAtTimestamp: new Date('2026-01-06T15:45:00').getTime()
    },
    {
      id: '8',
      project: 'Sales Assistant',
      dateRange: 'Dec 1-10, 2025',
      conversations: 671,
      status: 'completed',
      createdBy: 'Admin User',
      createdAt: 'Jan 6, 2026 10:20',
      createdAtTimestamp: new Date('2026-01-06T10:20:00').getTime()
    },
    {
      id: '9',
      project: 'FAQ Bot',
      dateRange: 'Nov 25-30, 2025',
      conversations: 345,
      status: 'completed',
      createdBy: 'John Doe',
      createdAt: 'Jan 5, 2026 14:10',
      createdAtTimestamp: new Date('2026-01-05T14:10:00').getTime()
    },
    {
      id: '10',
      project: 'Onboarding Assistant',
      dateRange: 'Nov 20-30, 2025',
      conversations: 512,
      status: 'completed',
      createdBy: 'Jane Smith',
      createdAt: 'Jan 5, 2026 09:55',
      createdAtTimestamp: new Date('2026-01-05T09:55:00').getTime()
    },
    {
      id: '11',
      project: 'Support Bot',
      dateRange: 'Nov 15-25, 2025',
      conversations: 1123,
      status: 'completed',
      createdBy: 'Admin User',
      createdAt: 'Jan 4, 2026 16:30',
      createdAtTimestamp: new Date('2026-01-04T16:30:00').getTime()
    },
    {
      id: '12',
      project: 'Jeffbot',
      dateRange: 'Nov 10-20, 2025',
      conversations: 892,
      status: 'completed',
      createdBy: 'John Doe',
      createdAt: 'Jan 4, 2026 11:15',
      createdAtTimestamp: new Date('2026-01-04T11:15:00').getTime()
    },
    {
      id: '13',
      project: 'Sales Assistant',
      dateRange: 'Nov 5-15, 2025',
      conversations: 0,
      status: 'processing',
      createdBy: 'Jane Smith',
      createdAt: 'Jan 3, 2026 13:40',
      createdAtTimestamp: new Date('2026-01-03T13:40:00').getTime()
    },
    {
      id: '14',
      project: 'FAQ Bot',
      dateRange: 'Nov 1-10, 2025',
      conversations: 456,
      status: 'completed',
      createdBy: 'Admin User',
      createdAt: 'Jan 3, 2026 08:25',
      createdAtTimestamp: new Date('2026-01-03T08:25:00').getTime()
    },
    {
      id: '15',
      project: 'Support Bot',
      dateRange: 'Oct 25-31, 2025',
      conversations: 734,
      status: 'completed',
      createdBy: 'John Doe',
      createdAt: 'Jan 2, 2026 15:50',
      createdAtTimestamp: new Date('2026-01-02T15:50:00').getTime()
    },
    {
      id: '16',
      project: 'Onboarding Assistant',
      dateRange: 'Oct 20-31, 2025',
      conversations: 289,
      status: 'completed',
      createdBy: 'Jane Smith',
      createdAt: 'Jan 2, 2026 10:35',
      createdAtTimestamp: new Date('2026-01-02T10:35:00').getTime()
    },
    {
      id: '17',
      project: 'Jeffbot',
      dateRange: 'Oct 15-25, 2025',
      conversations: 1267,
      status: 'completed',
      createdBy: 'Admin User',
      createdAt: 'Jan 1, 2026 14:20',
      createdAtTimestamp: new Date('2026-01-01T14:20:00').getTime()
    },
    {
      id: '18',
      project: 'Sales Assistant',
      dateRange: 'Oct 10-20, 2025',
      conversations: 0,
      status: 'failed',
      createdBy: 'John Doe',
      createdAt: 'Jan 1, 2026 09:05',
      createdAtTimestamp: new Date('2026-01-01T09:05:00').getTime()
    },
    {
      id: '19',
      project: 'FAQ Bot',
      dateRange: 'Oct 5-15, 2025',
      conversations: 567,
      status: 'completed',
      createdBy: 'Jane Smith',
      createdAt: 'Dec 31, 2025 16:45',
      createdAtTimestamp: new Date('2025-12-31T16:45:00').getTime()
    },
    {
      id: '20',
      project: 'Support Bot',
      dateRange: 'Oct 1-10, 2025',
      conversations: 891,
      status: 'completed',
      createdBy: 'Admin User',
      createdAt: 'Dec 31, 2025 11:30',
      createdAtTimestamp: new Date('2025-12-31T11:30:00').getTime()
    },
    {
      id: '21',
      project: 'Onboarding Assistant',
      dateRange: 'Sep 25-30, 2025',
      conversations: 412,
      status: 'completed',
      createdBy: 'John Doe',
      createdAt: 'Dec 30, 2025 15:15',
      createdAtTimestamp: new Date('2025-12-30T15:15:00').getTime()
    },
    {
      id: '22',
      project: 'Jeffbot',
      dateRange: 'Sep 20-30, 2025',
      conversations: 1098,
      status: 'completed',
      createdBy: 'Jane Smith',
      createdAt: 'Dec 30, 2025 10:00',
      createdAtTimestamp: new Date('2025-12-30T10:00:00').getTime()
    },
  ];

  const sortedAndFilteredExports = useMemo(() => {
    let filtered = allExports;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(exp =>
        exp.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.createdBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      let aVal: any = a[sortColumn as keyof Export];
      let bVal: any = b[sortColumn as keyof Export];

      // Special handling for createdAt - use timestamp for sorting
      if (sortColumn === 'createdAt') {
        aVal = a.createdAtTimestamp;
        bVal = b.createdAtTimestamp;
      }

      if (sortColumn === 'conversations') {
        aVal = a.conversations;
        bVal = b.conversations;
      }

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return sorted;
  }, [allExports, searchQuery, sortColumn, sortDirection]);

  const columns: Column<Export>[] = [
    {
      key: 'project',
      header: 'Project',
      width: '18%',
      sortable: true
    },
    {
      key: 'dateRange',
      header: 'Date Range',
      width: '16%',
      sortable: true,
      render: (row) => (
        <span className="text-muted-foreground">{row.dateRange}</span>
      )
    },
    {
      key: 'conversations',
      header: 'Conversations',
      width: '12%',
      sortable: true,
      render: (row) => (
        <span>{row.conversations > 0 ? row.conversations.toLocaleString() : '—'}</span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      width: '12%',
      sortable: true,
      render: (row) => {
        const statusMap: Record<string, 'success' | 'warning' | 'error' | 'pending'> = {
          completed: 'success',
          processing: 'warning',
          failed: 'error',
          queued: 'pending'
        };
        return <StatusPill status={statusMap[row.status]} label={row.status.charAt(0).toUpperCase() + row.status.slice(1)} />;
      }
    },
    {
      key: 'createdBy',
      header: 'Created By',
      width: '14%',
      sortable: true,
      render: (row) => (
        <span className="text-muted-foreground">{row.createdBy}</span>
      )
    },
    {
      key: 'createdAt',
      header: 'Created',
      width: '16%',
      sortable: true,
      render: (row) => (
        <span className="text-muted-foreground">{row.createdAt}</span>
      )
    },
    {
      key: 'actions',
      header: '',
      width: '8%',
      render: (row) => (
        <div className="flex items-center justify-end gap-1">
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
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteExport(row);
            }}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
            title="Delete export"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="h-full flex flex-col bg-background">
      <PageHeader 
        title="Exports"
        description="Manage and download conversation transcripts"
        actions={
          <Button 
            variant="primary" 
            icon={<Download className="w-4 h-4" />}
            onClick={() => setIsNewExportModalOpen(true)}
          >
            New Export
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
                placeholder="Search exports..."
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
            data={sortedAndFilteredExports}
            emptyMessage="No exports found. Create your first export to get started."
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={handleSort}
          />

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <p className="text-[13px] text-muted-foreground" style={{ fontFamily: 'var(--font-family-body)' }}>
              Showing {sortedAndFilteredExports.length} of {allExports.length} results
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

      {/* New Export Modal */}
      <Dialog open={isNewExportModalOpen} onOpenChange={setIsNewExportModalOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle 
              className="text-[18px] text-foreground"
              style={{ 
                fontFamily: 'var(--font-family-display)',
                fontWeight: 'var(--font-weight-normal)'
              }}
            >
              Create New Export
            </DialogTitle>
            <DialogDescription 
              className="text-[14px]"
              style={{ fontFamily: 'var(--font-family-body)' }}
            >
              Queue transcript export (CSV file) for the selected workspace and date range.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Project Selection */}
            <div className="space-y-2">
              <label 
                className="text-[12px] text-muted-foreground"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Select Workspace
              </label>
              <Select onValueChange={setSelectedProject} value={selectedProject}>
                <SelectTrigger className="w-full h-11 bg-background !border-border hover:border-accent transition-colors text-[14px]">
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map(project => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Range Selection */}
            <div className="space-y-2">
              <label 
                className="text-[12px] text-muted-foreground"
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
          </div>

          {/* Notification Box */}
          <div className="bg-[#d4f4dd] border border-[#7bcb93] rounded-lg p-3 flex items-center">
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

          <DialogFooter className="gap-3">
            <button
              type="button"
              onClick={() => setIsNewExportModalOpen(false)}
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
              onClick={handleCreateExport}
              disabled={!selectedProject}
              className="px-6 py-2.5 bg-foreground text-background rounded-[var(--radius-button)] hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[14px]"
              style={{ 
                fontFamily: 'var(--font-family-body)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              Queue CSV Export
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Export Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle 
              className="text-[18px] text-foreground"
              style={{ 
                fontFamily: 'var(--font-family-display)',
                fontWeight: 'var(--font-weight-normal)'
              }}
            >
              Delete Export
            </DialogTitle>
            <DialogDescription 
              className="text-[14px]"
              style={{ fontFamily: 'var(--font-family-body)' }}
            >
              Are you sure you want to delete this export? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Project - Read-only */}
            <div className="space-y-2">
              <label 
                className="text-[12px] text-muted-foreground"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Project
              </label>
              <div 
                className="w-full px-3 py-2 border border-border rounded-lg bg-muted/20 text-[14px] text-foreground h-11 flex items-center"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                {deletingExport?.project || ''}
              </div>
            </div>

            {/* Date Range - Read-only */}
            <div className="space-y-2">
              <label 
                className="text-[12px] text-muted-foreground"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Date Range
              </label>
              <div 
                className="w-full px-3 py-2 border border-border rounded-lg bg-muted/20 text-[14px] text-foreground h-11 flex items-center"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                {deletingExport ? formatDateRange(new Date(deletingExport.dateRange.split(',')[0]), new Date(deletingExport.dateRange.split(',')[1])) : ''}
              </div>
            </div>

            {/* Confirm Text */}
            <div className="space-y-2">
              <label 
                className="text-[12px] text-muted-foreground"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                Type "DELETE" to confirm
              </label>
              <input
                type="text"
                placeholder="DELETE"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                className="w-full pl-4 pr-4 py-2 bg-input-background border border-border rounded-lg text-[14px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring"
                style={{ fontFamily: 'var(--font-family-body)' }}
              />
            </div>
          </div>

          <DialogFooter className="gap-3">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
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
              onClick={handleConfirmDelete}
              disabled={deleteConfirmText !== 'DELETE'}
              className="px-6 py-2.5 bg-foreground text-background rounded-[var(--radius-button)] hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[14px]"
              style={{ 
                fontFamily: 'var(--font-family-body)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              Delete Export
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}