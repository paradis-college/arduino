import type { FC, ReactNode } from 'react';

export interface GifStepProps {
  /** URL to the GIF showing the step */
  gifUrl: string;
  /** Step number for ordering */
  stepNumber?: number;
  /** Brief title for the step */
  title?: string;
  /** Alt text for the GIF (for accessibility) */
  alt?: string;
  /** Detailed explanation shown below the GIF */
  children: ReactNode;
}

/**
 * GifStep component
 * Displays a step-by-step GIF with detailed textual explanation
 * Used to show users exactly what to do at each step
 */
export const GifStep: FC<GifStepProps> = ({
  gifUrl,
  stepNumber,
  title,
  alt,
  children,
}) => {
  return (
    <div className="my-6 rounded-lg border border-border bg-surface overflow-hidden">
      {/* Header with step number and title */}
      {(stepNumber !== undefined || title) && (
        <div className="bg-primary/5 px-4 py-3 border-b border-border">
          <div className="flex items-center gap-3">
            {stepNumber !== undefined && (
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0">
                <span className="text-white font-semibold text-sm">
                  {stepNumber}
                </span>
              </div>
            )}
            {title && (
              <h4 className="font-semibold text-text">{title}</h4>
            )}
          </div>
        </div>
      )}

      {/* GIF Display */}
      <div className="bg-background-alt p-4">
        <div className="rounded-lg overflow-hidden border border-border/50 max-w-2xl mx-auto">
          <img
            src={gifUrl}
            alt={alt || title || 'Step demonstration'}
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
      </div>

      {/* Detailed explanation */}
      <div className="p-4 text-text-secondary">
        <div className="prose prose-sm max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GifStep;
