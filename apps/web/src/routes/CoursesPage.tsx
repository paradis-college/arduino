import type { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '@/i18n';
import { Card, Badge } from '@/components/common';
import { getAllCourses, getLessonsByCourse } from '@/lib/lessonsManifest';
import { getPaths } from '@/lib/pathsManifest';
import type { Language } from '@/lib/types';

/**
 * Courses page component
 * Lists all available courses grouped by learning path
 */
export const CoursesPage: FC = () => {
  const { t, language } = useLanguage();
  const params = useParams<{ lang: string }>();
  const currentLang = (params.lang as Language) || language;

  const paths = getPaths(currentLang);
  const courses = getAllCourses(currentLang);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">
          {t('courses.title')}
        </h1>
        <p className="text-text-secondary text-lg">
          {t('courses.subtitle')}
        </p>
      </div>

      {/* Courses grouped by path */}
      {paths.map((path) => {
        const pathCourses = courses.filter((c) => c.pathId === path.id);
        if (pathCourses.length === 0) return null;

        return (
          <div key={path.id} className="space-y-4">
            {/* Path header */}
            <div className="flex items-center gap-3">
              <Link
                to={`/${currentLang}/paths/${path.slug}`}
                className="text-xl font-semibold text-text hover:text-primary transition-colors"
              >
                {path.title}
              </Link>
              <Badge variant="default" size="sm">
                {pathCourses.length} {t('paths.courses')}
              </Badge>
            </div>

            {/* Courses grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pathCourses.map((course) => {
                const lessons = getLessonsByCourse(course.id, currentLang);
                
                return (
                  <Link
                    key={course.id}
                    to={`/${currentLang}/courses/${course.slug}`}
                    className="block"
                  >
                    <Card hoverable padding="none" className="overflow-hidden h-full">
                      {/* Course thumbnail */}
                      <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <svg
                          className="w-20 h-20 text-primary/40"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                          />
                        </svg>
                      </div>

                      <div className="p-5">
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
                          className="mb-3"
                        >
                          {t(`difficulty.${course.difficulty}`)}
                        </Badge>

                        {/* Title */}
                        <h2 className="font-semibold text-text text-xl mb-2">
                          {course.title}
                        </h2>

                        {/* Description */}
                        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                          {course.description}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
                          <span className="flex items-center gap-1">
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
                          <span className="flex items-center gap-1">
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
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Empty state if no courses */}
      {courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-secondary">
            {currentLang === 'ro'
              ? 'Nu există cursuri disponibile momentan.'
              : 'No courses available at the moment.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
