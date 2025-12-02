import type { FC, ReactNode } from 'react';
import { useLanguage } from '@/i18n';
import { YouTubeEmbed } from '@/components/interactive';
import type { LessonKeyPoint } from '@/lib/types';

export interface LessonVideoSectionProps {
  /** YouTube video URL or video ID */
  youtubeUrl: string;
  /** Video title */
  videoTitle?: string;
  /** Key points from the video displayed on the left */
  keyPoints?: LessonKeyPoint[];
  /** Optional additional content to show in the explanations section */
  children?: ReactNode;
}

/**
 * LessonVideoSection component
 * Displays an embedded YouTube video on the right with key points and explanations on the left
 */
export const LessonVideoSection: FC<LessonVideoSectionProps> = ({
  youtubeUrl,
  videoTitle,
  keyPoints = [],
  children,
}) => {
  const { t } = useLanguage();

  return (
    <section className="my-8 bg-surface rounded-xl border border-border overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left side: Key points and explanations */}
        <div className="p-6 order-2 lg:order-1">
          <h3 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {t('lesson.keyPoints')}
          </h3>

          {keyPoints.length > 0 && (
            <ul className="space-y-3 mb-4">
              {keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-primary">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-text">{point.title}</span>
                    {point.description && (
                      <p className="text-text-secondary text-sm mt-1">
                        {point.description}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Additional content */}
          {children && (
            <div className="text-text-secondary text-sm">
              {children}
            </div>
          )}
        </div>

        {/* Right side: YouTube video */}
        <div className="p-6 bg-background-alt order-1 lg:order-2">
          <YouTubeEmbed url={youtubeUrl} title={videoTitle} />
        </div>
      </div>
    </section>
  );
};

export default LessonVideoSection;
