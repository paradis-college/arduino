import type { FC } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '@/i18n';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import type { Theme, Language } from '@/lib/types';

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

/**
 * Main navigation bar component
 * Includes logo, navigation links, language switcher, theme toggle, and login button
 */
export const Navbar: FC<NavbarProps> = ({ theme, onToggleTheme }) => {
  const { t, language } = useLanguage();
  const params = useParams<{ lang?: string }>();
  const currentLang = (params.lang as Language) || language;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', labelKey: 'common.home', path: `/${currentLang}` },
    { key: 'courses', labelKey: 'common.courses', path: `/${currentLang}/courses` },
    { key: 'projects', labelKey: 'common.projects', path: `/${currentLang}/projects` },
    { key: 'community', labelKey: 'common.community', path: `/${currentLang}/community` },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-surface border-b border-border backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={`/${currentLang}`} className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-semibold text-lg text-text hidden sm:block">
              Arduino @ Paradis
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className="text-text-secondary hover:text-text font-medium transition-colors duration-200"
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            
            {/* Login button placeholder */}
            {/* TODO: Replace with actual auth when backend is ready */}
            <button
              className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
              aria-disabled="true"
              aria-label={`${t('common.login')} - Coming soon`}
              title="Coming soon"
            >
              {t('common.login')}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-surface-hover transition-colors duration-200"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-6 h-6 text-text"
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
              ) : (
                <svg
                  className="w-6 h-6 text-text"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-text-secondary hover:text-text hover:bg-surface-hover rounded-lg font-medium transition-colors duration-200"
                >
                  {t(item.labelKey)}
                </Link>
              ))}
              {/* Mobile login button */}
              <button
                className="mt-2 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
                aria-disabled="true"
                aria-label={`${t('common.login')} - Coming soon`}
                title="Coming soon"
              >
                {t('common.login')}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
