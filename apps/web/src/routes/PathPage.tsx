import type { FC } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useLanguage } from '@/i18n';
import { Card, Badge, Breadcrumbs } from '@/components/common';
import { getPath } from '@/lib/pathsManifest';
import { getCoursesByPath, getLessonsByCourse } from '@/lib/lessonsManifest';
import type { Language } from '@/lib/types';
import type { BreadcrumbItem } from '@/components/common';

/**
 * Path page component
 * Shows path details and list of courses
 */
export const PathPage: FC = () => {
  const { t, language } = useLanguage();
  const params = useParams<{ lang: string; pathSlug: string }>();
  const currentLang = (params.lang as Language) || language;
  const pathSlug = params.pathSlug || '';

  const path = getPath(pathSlug, currentLang);
  const courses = path ? getCoursesByPath(path.id, currentLang) : [];

  // Redirect if path not found
  if (!path) {
    return <Navigate to={`/${currentLang}/paths`} replace />;
  }

  // Build breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: t('common.home'), href: `/${currentLang}` },
    { label: t('paths.title'), href: `/${currentLang}/paths` },
    { label: path.title },
  ];

  return (
    <div className="space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} className="mb-2" />

      {/* Path header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
        <Badge variant="primary" className="mb-4">
          {currentLang === 'ro' ? 'Traseu' : 'Path'} {path.order}
        </Badge>

        <h1 className="text-3xl md:text-4xl font-bold text-text mb-4">
          {path.title}
        </h1>

        <p className="text-text-secondary text-lg mb-6 max-w-2xl">
          {path.description}
        </p>

        <div className="flex flex-wrap items-center gap-6 text-text-secondary">
          <span className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            {courses.length} {t('paths.courses')}
          </span>
          <span className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            ~{courses.reduce((total, c) => total + c.estimatedHours, 0)} {t('courses.hours')}
          </span>
        </div>
      </div>

      {/* Courses list */}
      <div>
        <h2 className="text-2xl font-bold text-text mb-6">
          {currentLang === 'ro' ? 'Cursuri' : 'Courses'}
        </h2>

        <div className="space-y-4">
          {courses.map((course, index) => {
            const lessons = getLessonsByCourse(course.id, currentLang);
            
            return (
              <Link
                key={course.id}
                to={`/${currentLang}/courses/${course.slug}`}
                className="block"
              >
                <Card hoverable padding="md">
                  <div className="flex items-start gap-4">
                    {/* Course number */}
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <span className="font-semibold text-primary">
                        {index + 1}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          {/* Difficulty badge */}
                          <Badge
                            variant={
                              course.difficulty === 'beginner'
                                ? 'success'
                                : course.difficulty === 'intermediate'
                                ? 'warning'
                                : 'error'
                            }
                            size="sm"
                            className="mb-2"
                          >
                            {t(`difficulty.${course.difficulty}`)}
                          </Badge>

                          <h3 className="font-semibold text-text text-lg mb-1">
                            {course.title}
                          </h3>
                          <p className="text-text-secondary text-sm mb-3">
                            {course.description}
                          </p>
                        </div>
                      </div>

                      {/* Meta info */}
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-text-secondary text-sm flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                          {lessons.length > 0 ? lessons.length : course.lessonCount} {t('courses.lessons')}
                        </span>
                        <span className="text-text-secondary text-sm flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          ~{course.estimatedHours} {t('courses.hours')}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {course.tags.slice(0, 4).map((tag) => (
                          <Badge key={tag} variant="default" size="sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Empty state */}
      {courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-secondary">
            {currentLang === 'ro'
              ? 'Nu există cursuri disponibile pentru acest traseu.'
              : 'No courses available for this path.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default PathPage;
