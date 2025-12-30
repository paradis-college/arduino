import type { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '@/i18n';
import { Button } from '@/components/common';
import type { Language } from '@/lib/types';

/**
 * 404 Not Found page component
 */
export const NotFoundPage: FC = () => {
  const { t, language } = useLanguage();
  const params = useParams<{ lang?: string }>();
  const currentLang = (params.lang as Language) || language;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      {/* 404 illustration */}
      <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mb-8">
        <svg
          className="w-16 h-16 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-bold text-text mb-4">404</h1>

      {/* Message */}
      <p className="text-xl text-text-secondary mb-8 max-w-md">
        {t('common.notFound')}
      </p>

      {/* Action buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <Link to={`/${currentLang}`}>
          <Button variant="primary" size="lg">
            {t('common.home')}
          </Button>
        </Link>
        <Link to={`/${currentLang}/courses`}>
          <Button variant="outline" size="lg">
            {t('common.courses')}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
