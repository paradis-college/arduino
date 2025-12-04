import { useState, useEffect, useMemo, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { SiteLayout } from './components/layout';
import { LanguageContext, getTranslation, getBrowserLanguage } from './i18n';
import { getInitialTheme, saveTheme, applyTheme, toggleTheme, onSystemThemeChange } from './lib/themeStore';
import { getInitialLanguage, saveLanguage, getStoredLanguage, initializeLanguageFromIP } from './lib/languageStore';
import type { Language, Theme } from './lib/types';

// Import pages
import { HomePage } from './routes/HomePage';
import { PathsPage } from './routes/PathsPage';
import { PathPage } from './routes/PathPage';
import { CoursesPage } from './routes/CoursesPage';
import { CoursePage } from './routes/CoursePage';
import { LessonPage } from './routes/LessonPage';
import { ProjectsPage } from './routes/ProjectsPage';
import { CommunityPage } from './routes/CommunityPage';
import { NotFoundPage } from './routes/NotFoundPage';

import './styles/globals.css';

// Theme context for sharing theme state
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

/**
 * Layout wrapper that includes SiteLayout with routes
 */
function LayoutWrapper() {
  const { theme, toggleTheme } = useTheme();

  return (
    <SiteLayout theme={theme} onToggleTheme={toggleTheme}>
      <Outlet />
    </SiteLayout>
  );
}

/**
 * Redirect to default language based on preference or browser
 */
function LanguageRedirect() {
  const storedLang = getStoredLanguage();
  const defaultLang = storedLang || getBrowserLanguage();
  return <Navigate to={`/${defaultLang}`} replace />;
}

/**
 * Main App component
 * Provides theme and language contexts to the entire application
 */
function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  // Apply theme on mount and when it changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const cleanup = onSystemThemeChange((newTheme) => {
      setTheme(newTheme);
      applyTheme(newTheme);
    });
    return cleanup;
  }, []);

  // Initialize language from IP on first visit (async)
  useEffect(() => {
    initializeLanguageFromIP().then((detectedLang) => {
      if (detectedLang) {
        setLanguage(detectedLang);
      }
    });
  }, []);

  const handleToggleTheme = () => {
    const newTheme = toggleTheme(theme);
    setTheme(newTheme);
    saveTheme(newTheme);
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    saveLanguage(lang);
  };

  // Memoize the language context value
  const languageContextValue = useMemo(
    () => ({
      language,
      setLanguage: handleSetLanguage,
      t: (key: string) => getTranslation(language, key),
    }),
    [language]
  );

  // Memoize the theme context value
  const themeContextValue = useMemo(
    () => ({
      theme,
      toggleTheme: handleToggleTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <LanguageContext.Provider value={languageContextValue}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LanguageRedirect />} />
            <Route element={<LayoutWrapper />}>
              <Route path="/:lang" element={<HomePage />} />
              <Route path="/:lang/paths" element={<PathsPage />} />
              <Route path="/:lang/paths/:pathSlug" element={<PathPage />} />
              <Route path="/:lang/courses" element={<CoursesPage />} />
              <Route path="/:lang/courses/:courseSlug" element={<CoursePage />} />
              <Route path="/:lang/lessons/:lessonSlug" element={<LessonPage />} />
              <Route path="/:lang/projects" element={<ProjectsPage />} />
              <Route path="/:lang/community" element={<CommunityPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
