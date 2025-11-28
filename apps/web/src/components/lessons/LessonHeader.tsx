import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n';
import { Badge, ProgressBar } from '@/components/common';
import {
  getLessonProgress,
  toggleSaved,
  setStars as setStarsInStore,
} from '@/lib/progressStore';
import type { LessonMeta } from '@/lib/types';

export interface LessonHeaderProps {
  lesson: LessonMeta;
  totalCheckpoints: number;
}

/**
 * Lesson header component
 * Displays title, metadata, progress, save button, and star rating
 */
export const LessonHeader: FC<LessonHeaderProps> = ({ lesson, totalCheckpoints }) => {
  const { t } = useLanguage();
  const lessonKey = `${lesson.language}/${lesson.slug}`;

  const [saved, setSaved] = useState(false);
  const [stars, setStars] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);

  // Load state from localStorage
  useEffect(() => {
    const lessonProgress = getLessonProgress(lessonKey);
    setSaved(lessonProgress.saved);
    setStars(lessonProgress.stars);

    // Calculate progress
    if (totalCheckpoints > 0) {
      const completedCount = Object.values(lessonProgress.checkpoints).filter(
        (cp) => cp.completed
      ).length;
      setProgress(Math.round((completedCount / totalCheckpoints) * 100));
    }
  }, [lessonKey, totalCheckpoints]);

  const handleToggleSaved = () => {
    const newSaved = toggleSaved(lessonKey);
    setSaved(newSaved);
  };

  const handleSetStars = (rating: number) => {
    setStars(rating);
    setStarsInStore(lessonKey, rating);
  };

  const difficultyColors = {
    beginner: 'success',
    intermediate: 'warning',
    advanced: 'error',
  } as const;

  return (
    <div className="mb-8">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-text mb-4">
        {lesson.title}
      </h1>

      {/* Metadata row */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Difficulty */}
        <Badge variant={difficultyColors[lesson.difficulty]}>
          {t(`difficulty.${lesson.difficulty}`)}
        </Badge>

        {/* Estimated time */}
        <span className="text-text-secondary text-sm flex items-center gap-1">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {lesson.estimatedMinutes} {t('lesson.minutes')}
        </span>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {lesson.tags.map((tag) => (
            <Badge key={tag} variant="default" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Actions row: Save + Stars */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        {/* Save button */}
        <button
          onClick={handleToggleSaved}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors duration-200 ${
            saved
              ? 'bg-primary/10 border-primary text-primary'
              : 'border-border text-text-secondary hover:border-primary hover:text-primary'
          }`}
          aria-pressed={saved}
        >
          <svg
            className="w-5 h-5"
            fill={saved ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
          <span className="text-sm font-medium">
            {saved ? t('lesson.unsaveLesson') : t('lesson.saveLesson')}
          </span>
        </button>

        {/* Star rating */}
        <div className="flex items-center gap-1">
          <span className="text-text-secondary text-sm mr-2">
            {t('lesson.rateLesson')}:
          </span>
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => handleSetStars(rating)}
              onMouseEnter={() => setHoverStar(rating)}
              onMouseLeave={() => setHoverStar(0)}
              className="p-0.5 transition-transform hover:scale-110"
              aria-label={`Rate ${rating} stars`}
            >
              <svg
                className={`w-6 h-6 transition-colors ${
                  rating <= (hoverStar || stars)
                    ? 'text-warning fill-warning'
                    : 'text-border'
                }`}
                fill={rating <= (hoverStar || stars) ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      {totalCheckpoints > 0 && (
        <div className="flex items-center gap-4">
          <span className="text-text-secondary text-sm shrink-0">
            {t('lesson.progress')}:
          </span>
          <ProgressBar
            value={progress}
            variant={progress === 100 ? 'success' : 'primary'}
            size="md"
            className="flex-1 max-w-xs"
          />
          <span className="text-text-secondary text-sm">{progress}%</span>
        </div>
      )}
    </div>
  );
};

export default LessonHeader;
