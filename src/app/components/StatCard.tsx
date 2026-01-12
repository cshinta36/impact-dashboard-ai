import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  icon?: ReactNode;
}

export function StatCard({ title, value, subtitle, trend, icon }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-[var(--radius-card)] p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p 
            className="text-[12px] uppercase tracking-wide text-muted-foreground"
            style={{ fontFamily: 'var(--font-family-body)' }}
          >
            {title}
          </p>
          <div className="mt-3">
            <p 
              className="text-[32px] text-foreground"
              style={{ 
                fontFamily: 'var(--font-family-display)',
                fontWeight: 'var(--font-weight-light)',
                lineHeight: '1.2'
              }}
            >
              {value}
            </p>
          </div>
          {(subtitle || trend) && (
            <div className="mt-2 flex items-center gap-2">
              {trend && (
                <div className={`flex items-center gap-1 ${trend.direction === 'up' ? 'text-chart-3' : 'text-destructive'}`}>
                  {trend.direction === 'up' ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span className="text-[12px]" style={{ fontFamily: 'var(--font-family-body)' }}>
                    {trend.value}%
                  </span>
                </div>
              )}
              {subtitle && (
                <p className="text-[12px] text-muted-foreground" style={{ fontFamily: 'var(--font-family-body)' }}>
                  {subtitle}
                </p>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div className="text-muted">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
