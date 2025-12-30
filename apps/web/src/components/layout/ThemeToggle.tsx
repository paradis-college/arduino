import type { FC } from 'react';
import { useLanguage } from '@/i18n';

/**
 * Theme toggle button component
 * Switches between light and dark modes
 */
interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export const ThemeToggle: FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-lg hover:bg-surface-hover transition-colors duration-200"
      aria-label={t('theme.toggle')}
      title={isDark ? t('theme.light') : t('theme.dark')}
    >
      {isDark ? (
        // Sun icon for switching to light mode
        <svg
          className="w-5 h-5 text-text"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        // Moon icon for switching to dark mode
        <svg
          className="w-5 h-5 text-text"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
