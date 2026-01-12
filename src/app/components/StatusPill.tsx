interface StatusPillProps {
  status: 'active' | 'inactive' | 'pending' | 'error' | 'success' | 'warning';
  label?: string;
}

export function StatusPill({ status, label }: StatusPillProps) {
  const statusConfig = {
    active: {
      bg: 'bg-chart-3/10',
      text: 'text-chart-3',
      label: label || 'Active'
    },
    success: {
      bg: 'bg-chart-3/10',
      text: 'text-chart-3',
      label: label || 'Success'
    },
    inactive: {
      bg: 'bg-muted/20',
      text: 'text-muted-foreground',
      label: label || 'Inactive'
    },
    pending: {
      bg: 'bg-chart-4/10',
      text: 'text-chart-4',
      label: label || 'Pending'
    },
    warning: {
      bg: 'bg-chart-4/10',
      text: 'text-chart-4',
      label: label || 'Warning'
    },
    error: {
      bg: 'bg-destructive/10',
      text: 'text-destructive',
      label: label || 'Error'
    }
  };

  const config = statusConfig[status];

  return (
    <span 
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] ${config.bg} ${config.text}`}
      style={{ fontFamily: 'var(--font-family-body)', fontWeight: 'var(--font-weight-medium)' }}
    >
      {config.label}
    </span>
  );
}
