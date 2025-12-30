import type { FC, ReactNode } from 'react';
import { YouTubeEmbed } from './YouTubeEmbed';

export interface LessonIntroProps {
  videoId?: string;
  videoTitle?: string;
  children: ReactNode;
}

/**
 * Lesson intro section component
 * Displays video on the right and key points/overview on the left
 * Responsive: stacks on mobile, side-by-side on desktop
 */
export const LessonIntro: FC<LessonIntroProps> = ({
  videoId,
  videoTitle = 'Lesson Video',
  children
}) => {
  // If no video, just render children normally
  if (!videoId) {
    return <div className="mb-8">{children}</div>;
  }

  return (
    <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      {/* Left side: Key points and explanations */}
      <div className="order-2 lg:order-1">
        {children}
      </div>

      {/* Right side: YouTube video */}
      <div className="order-1 lg:order-2 lg:sticky lg:top-20">
        <YouTubeEmbed url={videoId} title={videoTitle} />
      </div>
    </div>
  );
};

export default LessonIntro;
