import type { FC } from 'react';
import { useState } from 'react';
import { useLanguage } from '@/i18n';
import type { PinMapping } from '@/lib/types';
import { Button } from '@/components/common';

export interface ExercisePinMappingProps {
  id: string;
  lessonKey: string;
  pins: string[];
  components: string[];
  correctMappings: PinMapping[];
}

/**
 * Pin mapping exercise component (stub)
 * Allows users to match pins to components
 * 
 * TODO: Implement drag-and-drop functionality for richer interaction
 * For now, uses simple dropdown selectors
 */
export const ExercisePinMapping: FC<ExercisePinMappingProps> = ({
  id: _id, // TODO: Use for checkpoint tracking
  lessonKey: _lessonKey, // TODO: Use for progress store
  pins,
  components,
  correctMappings,
}) => {
  const { t } = useLanguage();
  const [mappings, setMappings] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});

  const handleMappingChange = (pin: string, component: string) => {
    setMappings((prev) => ({
      ...prev,
      [pin]: component,
    }));
    setSubmitted(false);
  };

  const handleSubmit = () => {
    const newResults: Record<string, boolean> = {};
    
    for (const pin of pins) {
      const correct = correctMappings.find((m) => m.pinLabel === pin);
      newResults[pin] = mappings[pin] === correct?.componentLabel;
    }

    setResults(newResults);
    setSubmitted(true);

    // TODO: Update progressStore if all correct
  };

  const handleReset = () => {
    setMappings({});
    setSubmitted(false);
    setResults({});
  };

  const allCorrect = submitted && Object.values(results).every(Boolean);

  return (
    <div className="my-6 p-6 rounded-lg border border-border bg-surface">
      <h4 className="font-semibold text-text text-lg mb-2">
        {t('exercise.pinMapping')}
      </h4>
      <p className="text-text-secondary text-sm mb-6">
        {t('exercise.dragInstruction')}
      </p>

      {/* Mapping table */}
      <div className="space-y-4 mb-6">
        {pins.map((pin) => {
          const isCorrect = results[pin];
          const showResult = submitted;

          return (
            <div
              key={pin}
              className={`flex items-center gap-4 p-3 rounded-lg border ${
                showResult
                  ? isCorrect
                    ? 'border-success bg-success/10'
                    : 'border-error bg-error/10'
                  : 'border-border'
              }`}
            >
              {/* Pin label */}
              <div className="w-24 font-mono font-medium text-text bg-background-alt px-3 py-2 rounded">
                {pin}
              </div>

              {/* Arrow */}
              <svg
                className="w-6 h-6 text-text-secondary shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>

              {/* Component selector */}
              <select
                value={mappings[pin] || ''}
                onChange={(e) => handleMappingChange(pin, e.target.value)}
                disabled={allCorrect}
                className={`flex-1 px-3 py-2 rounded-lg border bg-background text-text focus:outline-none focus:ring-2 focus:ring-primary ${
                  showResult
                    ? isCorrect
                      ? 'border-success'
                      : 'border-error'
                    : 'border-border'
                }`}
                style={{ colorScheme: 'light dark' }}
              >
                <option value="" className="bg-background text-text">-- Select --</option>
                {components.map((comp) => (
                  <option key={comp} value={comp} className="bg-background text-text">
                    {comp}
                  </option>
                ))}
              </select>

              {/* Result indicator */}
              {showResult && (
                <div className="shrink-0">
                  {isCorrect ? (
                    <svg
                      className="w-6 h-6 text-success"
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
                  ) : (
                    <svg
                      className="w-6 h-6 text-error"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Feedback */}
      {submitted && (
        <div
          className={`p-3 rounded-lg mb-4 ${
            allCorrect ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
          }`}
        >
          <p className="font-medium">
            {allCorrect ? t('exercise.correct') : t('exercise.incorrect')}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        {!allCorrect && (
          <>
            <Button onClick={handleSubmit} variant="primary">
              {t('exercise.checkAnswer')}
            </Button>
            {submitted && (
              <Button onClick={handleReset} variant="outline">
                {t('exercise.tryAgain')}
              </Button>
            )}
          </>
        )}
      </div>

      {/* TODO note for future enhancement */}
      <p className="mt-4 text-xs text-text-secondary">
        {/* TODO: Implement drag-and-drop interface for better UX */}
      </p>
    </div>
  );
};

export default ExercisePinMapping;
