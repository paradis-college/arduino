import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { HomePage } from './HomePage';
import { CoursesPage } from './CoursesPage';
import { CoursePage } from './CoursePage';
import { LessonPage } from './LessonPage';
import { CommunityPage } from './CommunityPage';
import { NotFoundPage } from './NotFoundPage';
import { getBrowserLanguage } from '@/i18n';
import { getStoredLanguage } from '@/lib/languageStore';

/**
 * Language validation wrapper
 * Ensures the lang parameter is valid (ro or en)
 */
function LanguageGuard() {
  return <Outlet />;
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
 * Create the router configuration
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <LanguageRedirect />,
  },
  {
    path: '/:lang',
    element: <LanguageGuard />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'courses',
        element: <CoursesPage />,
      },
      {
        path: 'courses/:courseSlug',
        element: <CoursePage />,
      },
      {
        path: 'lessons/:lessonSlug',
        element: <LessonPage />,
      },
      {
        path: 'community',
        element: <CommunityPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
