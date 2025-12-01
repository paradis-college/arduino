import type { FC } from 'react';

export interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
}

/**
 * YouTube embed component
 * Renders an embedded YouTube video with responsive aspect ratio
 */
export const YouTubeEmbed: FC<YouTubeEmbedProps> = ({ videoId, title = 'YouTube video' }) => {
  // Support both full URLs and video IDs
  const extractVideoId = (input: string): string => {
    // If it looks like a video ID (alphanumeric with - and _), use as-is
    if (/^[a-zA-Z0-9_-]+$/.test(input) && !input.includes('.')) {
      return input;
    }
    
    // Try to extract from URL
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/,
    ];
    
    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match) {
        return match[1];
      }
    }
    
    return input; // Return as-is if no match
  };

  const id = extractVideoId(videoId);
  const embedUrl = `https://www.youtube.com/embed/${id}`;

  return (
    <div className="rounded-lg border border-border overflow-hidden bg-surface">
      <div className="aspect-video">
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default YouTubeEmbed;
