import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="border-b border-border bg-background">
      <div className="px-8 py-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 
              className="text-[28px] text-foreground" 
              style={{ 
                fontFamily: 'var(--font-family-display)',
                fontWeight: 'var(--font-weight-normal)',
                lineHeight: '1.3'
              }}
            >
              {title}
            </h1>
            {description && (
              <p 
                className="text-[14px] text-muted-foreground mt-1"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                {description}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
