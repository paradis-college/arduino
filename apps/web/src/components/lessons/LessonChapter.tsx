import type { FC, ReactNode } from 'react';

export interface LessonChapterProps {
  title: string;
  id?: string;
  children: ReactNode;
}

/**
 * Lesson chapter component
 * Groups lesson content into clearly formatted sections with headings
 */
export const LessonChapter: FC<LessonChapterProps> = ({ title, id, children }) => {
  const headingId = id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <section className="my-8" aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="text-2xl font-bold text-text mb-4 pb-2 border-b border-border scroll-mt-20"
      >
        {title}
      </h2>
      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
};

export default LessonChapter;
