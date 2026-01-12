import { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {icon && (
        <div className="text-muted mb-4">
          {icon}
        </div>
      )}
      <h3 
        className="text-[18px] text-foreground text-center"
        style={{ 
          fontFamily: 'var(--font-family-display)',
          fontWeight: 'var(--font-weight-normal)'
        }}
      >
        {title}
      </h3>
      <p 
        className="text-[14px] text-muted-foreground text-center mt-2 max-w-md"
        style={{ fontFamily: 'var(--font-family-body)' }}
      >
        {description}
      </p>
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}
