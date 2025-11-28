import type { FC, ReactNode } from 'react';
import { Navbar } from './Navbar';
import type { Theme } from '@/lib/types';
import { useLanguage } from '@/i18n';

interface SiteLayoutProps {
  children: ReactNode;
  theme: Theme;
  onToggleTheme: () => void;
}

/**
 * Main site layout component
 * Wraps all pages with header, main content, and footer
 */
export const SiteLayout: FC<SiteLayoutProps> = ({ children, theme, onToggleTheme }) => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />

      {/* Main content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="font-semibold text-lg text-text">Arduino @ Paradis</span>
              </div>
              <p className="text-text-secondary text-sm">
                {language === 'ro'
                  ? 'Platformă de învățare Arduino de la Paradis College'
                  : 'Arduino learning platform by Paradis College'}
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="font-semibold text-text mb-4">
                {language === 'ro' ? 'Linkuri rapide' : 'Quick Links'}
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href={`/${language}/courses`}
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    {t('common.courses')}
                  </a>
                </li>
                <li>
                  <a
                    href={`/${language}/projects`}
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    {t('common.projects')}
                  </a>
                </li>
                <li>
                  <a
                    href={`/${language}/community`}
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    {t('common.community')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-text mb-4">
                {language === 'ro' ? 'Resurse' : 'Resources'}
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://www.arduino.cc/reference/en/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    Arduino Reference
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tinkercad.com/circuits"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    Tinkercad Circuits
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center text-text-secondary text-sm">
            <p>
              © {new Date().getFullYear()} Paradis College.{' '}
              {language === 'ro' ? 'Toate drepturile rezervate.' : 'All rights reserved.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SiteLayout;
