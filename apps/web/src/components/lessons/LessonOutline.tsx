import type { FC } from 'react';
import { useLanguage } from '@/i18n';
import type { OutlineHeading } from '@/lib/types';

export interface LessonOutlineProps {
  headings: OutlineHeading[];
}

/**
 * Lesson outline component
 * Displays a table of contents based on headings (H2/H3)
 */
export const LessonOutline: FC<LessonOutlineProps> = ({ headings }) => {
  const { t } = useLanguage();

  if (headings.length === 0) {
    return null;
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="sticky top-20 p-4 bg-surface rounded-lg border border-border">
      <h3 className="font-semibold text-text mb-3">{t('lesson.outline')}</h3>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={heading.level === 3 ? 'ml-4' : ''}
          >
            <button
              onClick={() => scrollToHeading(heading.id)}
              className="text-left text-sm text-text-secondary hover:text-primary transition-colors duration-200 block w-full truncate"
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LessonOutline;
