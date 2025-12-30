import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n';
import { updateCheckpoint, isCheckpointCompleted } from '@/lib/progressStore';
import { Button } from '@/components/common';

export interface CheckpointProps {
  id: string;
  lessonKey: string;
  label?: string;
}

/**
 * Checkpoint component
 * Allows users to mark progress within a lesson
 * State is persisted to localStorage via progressStore
 */
export const Checkpoint: FC<CheckpointProps> = ({ id, lessonKey, label }) => {
  const { t } = useLanguage();
  const [completed, setCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Load initial state from localStorage
  useEffect(() => {
    const isCompleted = isCheckpointCompleted(lessonKey, id);
    setCompleted(isCompleted);
  }, [lessonKey, id]);

  const handleToggle = () => {
    const newState = !completed;
    setCompleted(newState);
    updateCheckpoint(lessonKey, id, newState);

    // Show confetti animation when completing
    if (newState) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  return (
    <div
      className={`relative my-6 p-4 rounded-lg border-2 transition-all duration-300 ${
        completed
          ? 'bg-success/10 border-success'
          : 'bg-surface border-border hover:border-primary'
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Checkbox */}
        <button
          onClick={handleToggle}
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            completed
              ? 'bg-success border-success text-white'
              : 'border-border hover:border-primary'
          }`}
          aria-pressed={completed}
          aria-label={completed ? t('lesson.checkpointCompleted') : t('lesson.markComplete')}
        >
          {completed && (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>

        {/* Label */}
        <div className="flex-1">
          <span
            className={`font-medium ${completed ? 'text-success' : 'text-text'}`}
          >
            {label || t('lesson.markComplete')}
          </span>
          {completed && (
            <span className="ml-2 text-sm text-success">
              ✓ {t('lesson.checkpointCompleted')}
            </span>
          )}
        </div>

        {/* Toggle button for mobile */}
        <Button
          variant={completed ? 'ghost' : 'outline'}
          size="sm"
          onClick={handleToggle}
          className="md:hidden"
        >
          {completed ? t('lesson.checkpointCompleted') : t('lesson.markComplete')}
        </Button>
      </div>

      {/* Confetti animation (simple CSS-based) */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="text-2xl animate-bounce absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            🎉
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkpoint;
