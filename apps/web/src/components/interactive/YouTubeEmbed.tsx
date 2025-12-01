import type { FC } from 'react';
import { useState } from 'react';

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
 * Gets the YouTube thumbnail URL for a video
 * Uses maxresdefault for best quality (1280x720)
 */
function getYouTubeThumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

/**
 * YouTube embed component
 * Shows thumbnail with play button, loads iframe on click
 */
export const YouTubeEmbed: FC<YouTubeEmbedProps> = ({ url, title }) => {
  const [loaded, setLoaded] = useState(false);

  const videoId = getYouTubeVideoId(url);

  if (!videoId) {
    return (
      <div className="my-6 rounded-lg border border-border bg-background-alt p-4">
        <p className="text-text-secondary text-sm">Invalid YouTube URL</p>
      </div>
    );
  }

  const thumbnailUrl = getYouTubeThumbnailUrl(videoId);

  if (!loaded) {
    return (
      <div className="rounded-lg border border-border overflow-hidden">
        {title && (
          <div className="bg-surface px-4 py-2 border-b border-border">
            <h4 className="font-medium text-text text-sm">{title}</h4>
          </div>
        )}
        <button
          onClick={() => setLoaded(true)}
          className="relative w-full aspect-video group cursor-pointer"
          aria-label={`Play video: ${title || 'YouTube Video'}`}
        >
          {/* Thumbnail image */}
          <img
            src={thumbnailUrl}
            alt={title || 'YouTube Video thumbnail'}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:bg-red-700 group-hover:scale-110 transition-all">
              <svg
                className="w-8 h-8 md:w-10 md:h-10 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </button>
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
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default YouTubeEmbed;
