import type { FC } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useLanguage } from '@/i18n';
import { Card, Badge, ProgressBar, Breadcrumbs } from '@/components/common';
import { getCourse, getLessonsByCourse } from '@/lib/lessonsManifest';
import { getPath } from '@/lib/pathsManifest';
import { getLessonProgress } from '@/lib/progressStore';
import type { Language } from '@/lib/types';
import type { BreadcrumbItem } from '@/components/common';

/**
 * Course page component
 * Shows course details and list of lessons
 */
export const CoursePage: FC = () => {
  const { t, language } = useLanguage();
  const params = useParams<{ lang: string; courseSlug: string }>();
  const currentLang = (params.lang as Language) || language;
  const courseSlug = params.courseSlug || '';

  const course = getCourse(courseSlug, currentLang);
  const lessons = course ? getLessonsByCourse(course.id, currentLang) : [];
  const path = course?.pathId ? getPath(course.pathId, currentLang) : undefined;

  // Redirect if course not found
  if (!course) {
    return <Navigate to={`/${currentLang}/courses`} replace />;
  }

  // Build breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: t('common.home'), href: `/${currentLang}` },
    { label: t('paths.title'), href: `/${currentLang}/paths` },
  ];

  if (path) {
    breadcrumbItems.push({
      label: path.title,
      href: `/${currentLang}/paths/${path.slug}`
    });
  }

  breadcrumbItems.push({ label: course.title });

  return (
    <div className="space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} className="mb-2" />

      {/* Course header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
        <Badge
          variant={
            course.difficulty === 'beginner'
              ? 'success'
              : course.difficulty === 'intermediate'
              ? 'warning'
              : 'error'
          }
          className="mb-4"
        >
          {t(`difficulty.${course.difficulty}`)}
        </Badge>

        <h1 className="text-3xl md:text-4xl font-bold text-text mb-4">
          {course.title}
        </h1>

        <p className="text-text-secondary text-lg mb-6 max-w-2xl">
          {course.description}
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
            {lessons.length > 0 ? lessons.length : course.lessonCount} {t('courses.lessons')}
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
            ~{course.estimatedHours} {t('courses.hours')}
          </span>
        </div>
      </div>

      {/* Lessons list */}
      <div>
        <h2 className="text-2xl font-bold text-text mb-6">
          {currentLang === 'ro' ? 'Lecții' : 'Lessons'}
        </h2>

        <div className="space-y-4">
          {lessons.map((lesson, index) => {
            const lessonKey = `${currentLang}/${lesson.slug}`;
            const progress = getLessonProgress(lessonKey);
            const checkpointCount = Object.keys(progress.checkpoints).length;
            const completedCount = Object.values(progress.checkpoints).filter(
              (cp) => cp.completed
            ).length;
            const progressPercent =
              checkpointCount > 0
                ? Math.round((completedCount / checkpointCount) * 100)
                : 0;

            return (
              <Link
                key={lesson.id}
                to={`/${currentLang}/lessons/${lesson.slug}`}
                className="block"
              >
                <Card hoverable padding="md">
                  <div className="flex items-start gap-4">
                    {/* Lesson number */}
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <span className="font-semibold text-primary">
                        {index + 1}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-text text-lg mb-1">
                            {lesson.title}
                          </h3>
                          <p className="text-text-secondary text-sm mb-3">
                            {lesson.description}
                          </p>
                        </div>

                        {/* Save indicator */}
                        {progress.saved && (
                          <svg
                            className="w-5 h-5 text-primary shrink-0"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                        )}
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
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {lesson.estimatedMinutes} {t('lesson.minutes')}
                        </span>

                        <div className="flex gap-1.5">
                          {lesson.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="default" size="sm">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Progress bar */}
                      {checkpointCount > 0 && (
                        <div className="flex items-center gap-3">
                          <ProgressBar
                            value={progressPercent}
                            variant={progressPercent === 100 ? 'success' : 'primary'}
                            size="sm"
                            className="flex-1 max-w-xs"
                          />
                          <span className="text-xs text-text-secondary">
                            {progressPercent}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Empty state */}
      {lessons.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-secondary">
            {currentLang === 'ro'
              ? 'Nu există lecții disponibile pentru acest curs.'
              : 'No lessons available for this course.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default CoursePage;
