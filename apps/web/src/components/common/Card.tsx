import type { FC, ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

/**
 * Reusable card component for content containers
 */
export const Card: FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  padding = 'md',
  onClick,
}) => {
  const baseClasses =
    'bg-surface rounded-lg border border-border transition-all duration-200';

  const hoverClasses = hoverable
    ? 'hover:shadow-card-hover hover:border-primary cursor-pointer'
    : '';

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${paddingClasses[padding]} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
};

export default Card;
