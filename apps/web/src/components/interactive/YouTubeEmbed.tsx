import type { FC } from 'react';
import { useState } from 'react';
import { useLanguage } from '@/i18n';
import { Button } from '@/components/common';

export interface YouTubeEmbedProps {
  url: string;
  title?: string;
}

/**
 * Extracts YouTube video ID from various URL formats
 */
function getYouTubeVideoId(url: string): string | null {
  // Handle different YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/, // Direct video ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  return null;
}

/**
 * YouTube embed component
 * Lazy loads YouTube video to avoid heavy initial page load
 */
export const YouTubeEmbed: FC<YouTubeEmbedProps> = ({ url, title }) => {
  const { t } = useLanguage();
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const videoId = getYouTubeVideoId(url);

  const handleLoad = () => {
    setLoading(true);
    // Small delay to show loading state
    setTimeout(() => {
      setLoaded(true);
      setLoading(false);
    }, 100);
  };

  if (!videoId) {
    return (
      <div className="my-6 rounded-lg border border-border bg-background-alt p-4">
        <p className="text-text-secondary text-sm">Invalid YouTube URL</p>
      </div>
    );
  }

  if (!loaded) {
    return (
      <div className="rounded-lg border-2 border-dashed border-border bg-background-alt overflow-hidden">
        <div className="aspect-video flex flex-col items-center justify-center gap-4 p-8">
          {/* YouTube icon placeholder */}
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-500"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </div>

          <div className="text-center">
            <h4 className="font-semibold text-text mb-2">
              {title || 'YouTube Video'}
            </h4>
            <p className="text-text-secondary text-sm mb-4">
              {t('lesson.loadVideo')}
            </p>
          </div>

          <Button onClick={handleLoad} isLoading={loading}>
            {loading ? t('common.loading') : t('lesson.loadVideo')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      {title && (
        <div className="bg-surface px-4 py-2 border-b border-border">
          <h4 className="font-medium text-text text-sm">{title}</h4>
        </div>
      )}
      <div className="aspect-video relative">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0`}
          className="w-full h-full"
          title={title || 'YouTube Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default YouTubeEmbed;
