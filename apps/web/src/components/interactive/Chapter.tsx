import type { FC, ReactNode } from 'react';

export interface ChapterProps {
  id?: string;
  title: string;
  number?: number;
  children: ReactNode;
}

/**
 * Chapter component for organizing lesson content into clear sections
 * Each chapter has a title with optional number and visual separator
 */
export const Chapter: FC<ChapterProps> = ({ id, title, number, children }) => {
  return (
    <section id={id} className="mb-10">
      {/* Chapter header */}
      <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-primary/30">
        {number !== undefined && (
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
            <span className="font-bold text-primary text-lg">{number}</span>
          </div>
        )}
        <h2 className="text-2xl font-bold text-text m-0 p-0 border-0">
          {title}
        </h2>
      </div>

      {/* Chapter content */}
      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
};

export default Chapter;
