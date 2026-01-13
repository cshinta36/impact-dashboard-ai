import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="border-b border-border bg-background">
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <h1 
              className="text-[22px] sm:text-[24px] lg:text-[28px] text-foreground" 
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
                className="text-[13px] sm:text-[14px] text-muted-foreground mt-1"
                style={{ fontFamily: 'var(--font-family-body)' }}
              >
                {description}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}