import type { FC } from 'react';
import { useState } from 'react';
import { useLanguage } from '@/i18n';
import { Button } from '@/components/common';

export interface TinkercadEmbedProps {
  url: string;
  title?: string;
}

/**
 * Tinkercad embed component
 * Lazy loads Tinkercad simulation to avoid heavy initial page load
 */
export const TinkercadEmbed: FC<TinkercadEmbedProps> = ({ url, title }) => {
  const { t } = useLanguage();
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  // Convert regular Tinkercad URL to embed URL
  const getEmbedUrl = (originalUrl: string): string => {
    // If it's already an embed URL, return as-is
    if (originalUrl.includes('/embed/')) {
      return originalUrl;
    }

    // Convert /things/xxx to /embed/xxx
    return originalUrl.replace('/things/', '/embed/');
  };

  const handleLoad = () => {
    setLoading(true);
    // Simulate a small delay to show loading state
    setTimeout(() => {
      setLoaded(true);
      setLoading(false);
    }, 100);
  };

  const handleIframeLoad = () => {
    setLoading(false);
  };

  if (!loaded) {
    return (
      <div className="my-6 rounded-lg border-2 border-dashed border-border bg-background-alt overflow-hidden">
        <div className="aspect-video flex flex-col items-center justify-center gap-4 p-8">
          {/* Tinkercad icon placeholder */}
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
          </div>

          <div className="text-center">
            <h4 className="font-semibold text-text mb-2">
              {title || 'Tinkercad Simulation'}
            </h4>
            <p className="text-text-secondary text-sm mb-4">
              {t('lesson.loadSimulation')}
            </p>
          </div>

          <Button onClick={handleLoad} isLoading={loading}>
            {loading ? t('common.loading') : t('lesson.loadSimulation')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-6 rounded-lg border border-border overflow-hidden">
      {title && (
        <div className="bg-surface px-4 py-2 border-b border-border">
          <h4 className="font-medium text-text text-sm">{title}</h4>
        </div>
      )}
      <div className="aspect-video relative">
        {loading && (
          <div className="absolute inset-0 bg-background-alt flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        )}
        <iframe
          src={getEmbedUrl(url)}
          className="w-full h-full"
          title={title || 'Tinkercad Simulation'}
          allow="fullscreen"
          loading="lazy"
          onLoad={handleIframeLoad}
        />
      </div>
    </div>
  );
};

export default TinkercadEmbed;
