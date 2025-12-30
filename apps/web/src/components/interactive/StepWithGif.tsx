import type { FC, ReactNode } from 'react';

export interface StepWithGifProps {
  stepNumber: number;
  title: string;
  gifUrl?: string;
  gifAlt?: string;
  children: ReactNode;
}

/**
 * Step with GIF component for visual step-by-step instructions
 * Shows a GIF/image on one side and detailed explanation on the other
 */
export const StepWithGif: FC<StepWithGifProps> = ({
  stepNumber,
  title,
  gifUrl,
  gifAlt,
  children
}) => {
  const hasGif = Boolean(gifUrl);
  const containerClasses = hasGif
    ? 'grid grid-cols-1 md:grid-cols-2 gap-4 items-start'
    : '';
  const textClasses = hasGif
    ? 'text-text-secondary text-sm leading-relaxed'
    : 'text-text-secondary text-sm leading-relaxed w-full';

  return (
    <div className="my-6 p-4 bg-surface rounded-lg border border-border">
      {/* Step header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center shrink-0">
          <span className="font-semibold text-secondary text-sm">{stepNumber}</span>
        </div>
        <h3 className="text-lg font-semibold text-text m-0">{title}</h3>
      </div>

      {/* Content: GIF on top/left, explanation below/right */}
      <div className={containerClasses}>
        {/* GIF/Image */}
        {gifUrl && (
          <div className="rounded-lg overflow-hidden border border-border bg-background-alt">
            <img
              src={gifUrl}
              alt={gifAlt || `Step ${stepNumber}: ${title}`}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        )}

        {/* Detailed explanation */}
        <div className={textClasses}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default StepWithGif;
