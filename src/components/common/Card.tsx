import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  badge?: React.ReactNode;
  id?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  subtitle,
  action,
  badge,
  id,
  onClick,
}) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`bg-[#111726] border border-slate-800/80 rounded-xl p-5 text-slate-100 shadow-sm transition-colors ${className}`}
    >
      {(title || subtitle || action || badge) && (
        <div className="flex items-start justify-between gap-3 pb-4 mb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              {title && <h3 className="text-base font-semibold text-white tracking-tight">{title}</h3>}
              {badge}
            </div>
            {subtitle && <p className="text-xs text-slate-400 mt-1 leading-relaxed">{subtitle}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
