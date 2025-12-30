import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n';
import { updateCheckpoint, isCheckpointCompleted } from '@/lib/progressStore';
import { Button } from '@/components/common';
import type { ExerciseOption } from '@/lib/types';

export interface ExerciseMultipleChoiceProps {
  id: string;
  lessonKey: string;
  question: string;
  options: ExerciseOption[];
  correctIndex: number;
}

/**
 * Multiple choice exercise component
 * Allows users to answer questions and tracks completion in progressStore
 */
export const ExerciseMultipleChoice: FC<ExerciseMultipleChoiceProps> = ({
  id,
  lessonKey,
  question,
  options,
  correctIndex,
}) => {
  const { t } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Check if already completed
  useEffect(() => {
    const checkpointId = `ex-${id}`;
    const completed = isCheckpointCompleted(lessonKey, checkpointId);
    if (completed) {
      setSelectedIndex(correctIndex);
      setSubmitted(true);
      setIsCorrect(true);
    }
  }, [lessonKey, id, correctIndex]);

  const handleSelect = (index: number) => {
    if (submitted && isCorrect) return; // Don't allow changes after correct answer
    setSelectedIndex(index);
    setSubmitted(false);
  };

  const handleSubmit = () => {
    if (selectedIndex === null) return;

    const correct = selectedIndex === correctIndex;
    setSubmitted(true);
    setIsCorrect(correct);

    if (correct) {
      // Mark checkpoint as completed
      const checkpointId = `ex-${id}`;
      updateCheckpoint(lessonKey, checkpointId, true);
    }
  };

  const handleRetry = () => {
    setSelectedIndex(null);
    setSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <div className="my-6 p-6 rounded-lg border border-border bg-surface">
      {/* Question */}
      <h4 className="font-semibold text-text text-lg mb-4">{question}</h4>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const showCorrect = submitted && index === correctIndex;
          const showIncorrect = submitted && isSelected && !isCorrect;

          let optionClasses = 'border-border hover:border-primary';
          if (isSelected && !submitted) {
            optionClasses = 'border-primary bg-primary/5';
          } else if (showCorrect) {
            optionClasses = 'border-success bg-success/10';
          } else if (showIncorrect) {
            optionClasses = 'border-error bg-error/10';
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(index)}
              disabled={submitted && isCorrect}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${optionClasses} ${
                submitted && isCorrect ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Radio indicator */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSelected
                      ? showCorrect
                        ? 'border-success bg-success'
                        : showIncorrect
                        ? 'border-error bg-error'
                        : 'border-primary bg-primary'
                      : 'border-border'
                  }`}
                >
                  {isSelected && (
                    <div
                      className={`w-2 h-2 rounded-full ${
                        showCorrect || showIncorrect ? 'bg-white' : 'bg-white'
                      }`}
                    />
                  )}
                </div>

                {/* Option text */}
                <span
                  className={`flex-1 ${
                    showCorrect
                      ? 'text-success font-medium'
                      : showIncorrect
                      ? 'text-error'
                      : 'text-text'
                  }`}
                >
                  {option.text}
                </span>

                {/* Feedback icons */}
                {showCorrect && (
                  <svg
                    className="w-5 h-5 text-success"
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
                {showIncorrect && (
                  <svg
                    className="w-5 h-5 text-error"
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
            </button>
          );
        })}
      </div>

      {/* Feedback message */}
      {submitted && (
        <div
          className={`p-3 rounded-lg mb-4 ${
            isCorrect ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
          }`}
        >
          <p className="font-medium">
            {isCorrect ? t('exercise.correct') : t('exercise.incorrect')}
          </p>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        {!submitted ? (
          <Button
            onClick={handleSubmit}
            disabled={selectedIndex === null}
            variant="primary"
          >
            {t('exercise.checkAnswer')}
          </Button>
        ) : !isCorrect ? (
          <Button onClick={handleRetry} variant="outline">
            {t('exercise.tryAgain')}
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default ExerciseMultipleChoice;
