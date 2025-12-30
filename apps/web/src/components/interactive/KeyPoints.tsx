import type { FC, ReactNode } from 'react';

export interface KeyPointsProps {
  title?: string;
  children: ReactNode;
}

/**
 * Key Points component
 * Displays a styled list of key takeaways or learning objectives
 */
export const KeyPoints: FC<KeyPointsProps> = ({ title, children }) => {
  return (
    <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
      {title && (
        <h3 className="text-lg font-semibold text-text mb-3 flex items-center gap-2">
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
          {title}
        </h3>
      )}
      <div className="key-points-list text-text">
        {children}
      </div>
    </div>
  );
};

export default KeyPoints;
