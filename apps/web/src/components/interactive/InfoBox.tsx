import type { FC, ReactNode } from 'react';
import { useLanguage } from '@/i18n';

export type InfoBoxType = 'info' | 'warning' | 'tip' | 'danger';

export interface InfoBoxProps {
  type?: InfoBoxType;
  title?: string;
  children: ReactNode;
}

/**
 * Info box component for highlighting important information
 * Used in MDX content for tips, warnings, and notes
 */
export const InfoBox: FC<InfoBoxProps> = ({ type = 'info', title, children }) => {
  const { t } = useLanguage();

  const typeConfig = {
    info: {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-info/10',
      borderColor: 'border-info',
      textColor: 'text-info',
      defaultTitle: t('infoBox.info'),
    },
    warning: {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning',
      textColor: 'text-warning',
      defaultTitle: t('infoBox.warning'),
    },
    tip: {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      bgColor: 'bg-success/10',
      borderColor: 'border-success',
      textColor: 'text-success',
      defaultTitle: t('infoBox.tip'),
    },
    danger: {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-error/10',
      borderColor: 'border-error',
      textColor: 'text-error',
      defaultTitle: t('infoBox.danger'),
    },
  };

  const config = typeConfig[type];

  return (
    <div
      className={`${config.bgColor} border-l-4 ${config.borderColor} rounded-r-lg p-4 my-4`}
      role="note"
    >
      <div className="flex items-start gap-3">
        <span className={config.textColor}>{config.icon}</span>
        <div className="flex-1 min-w-0">
          <h4 className={`font-semibold ${config.textColor} mb-1`}>
            {title || config.defaultTitle}
          </h4>
          <div className="text-text text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
