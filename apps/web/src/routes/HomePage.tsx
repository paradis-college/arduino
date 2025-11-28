import type { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '@/i18n';
import { Button, Card, Badge } from '@/components/common';
import { getLessonsByLanguage, coursesManifest, getCourse } from '@/lib/lessonsManifest';
import type { Language } from '@/lib/types';

/**
 * Home page component
 * Landing page with featured courses and call-to-action
 */
export const HomePage: FC = () => {
  const { t, language } = useLanguage();
  const params = useParams<{ lang: string }>();
  const currentLang = (params.lang as Language) || language;

  const lessons = getLessonsByLanguage(currentLang);
  const courses = coursesManifest.map((c) => getCourse(c.id, currentLang)!);

  return (
    <div className="space-y-12">
      {/* Hero section */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-text mb-6">
          {t('home.title')}
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
          {t('home.subtitle')}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to={`/${currentLang}/courses`}>
            <Button variant="primary" size="lg">
              {t('home.startLearning')}
            </Button>
          </Link>
          <Link to={`/${currentLang}/courses`}>
            <Button variant="outline" size="lg">
              {t('home.exploreCourses')}
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card padding="lg" className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-text mb-2">
            {currentLang === 'ro' ? 'Învățare Interactivă' : 'Interactive Learning'}
          </h3>
          <p className="text-text-secondary">
            {currentLang === 'ro'
              ? 'Lecții cu simulări Tinkercad și exerciții practice.'
              : 'Lessons with Tinkercad simulations and hands-on exercises.'}
          </p>
        </Card>

        <Card padding="lg" className="text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-success"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-text mb-2">
            {currentLang === 'ro' ? 'Progres Salvat' : 'Progress Tracking'}
          </h3>
          <p className="text-text-secondary">
            {currentLang === 'ro'
              ? 'Checkpoint-uri și progres salvat automat.'
              : 'Checkpoints and automatically saved progress.'}
          </p>
        </Card>

        <Card padding="lg" className="text-center">
          <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-warning"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-text mb-2">
            {currentLang === 'ro' ? 'Comunitate' : 'Community'}
          </h3>
          <p className="text-text-secondary">
            {currentLang === 'ro'
              ? 'Împărtășește proiectele tale cu alți elevi.'
              : 'Share your projects with other students.'}
          </p>
        </Card>
      </section>

      {/* Featured courses */}
      <section>
        <h2 className="text-2xl font-bold text-text mb-6">
          {t('home.featuredCourses')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link
              key={course.id}
              to={`/${currentLang}/courses/${course.slug}`}
              className="block"
            >
              <Card hoverable padding="none" className="overflow-hidden">
                {/* Course thumbnail placeholder */}
                <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-primary/40"
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
                <div className="p-4">
                  <Badge variant="success" size="sm" className="mb-2">
                    {t(`difficulty.${course.difficulty}`)}
                  </Badge>
                  <h3 className="font-semibold text-text text-lg mb-1">
                    {course.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-3">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-text-secondary">
                    <span>
                      {course.lessonCount} {t('courses.lessons')}
                    </span>
                    <span>
                      ~{course.estimatedHours} {t('courses.hours')}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent lessons */}
      <section>
        <h2 className="text-2xl font-bold text-text mb-6">
          {currentLang === 'ro' ? 'Lecții recente' : 'Recent Lessons'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lessons.slice(0, 4).map((lesson) => (
            <Link
              key={lesson.id}
              to={`/${currentLang}/lessons/${lesson.slug}`}
              className="block"
            >
              <Card hoverable padding="md">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <svg
                      className="w-6 h-6 text-primary"
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
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text mb-1 truncate">
                      {lesson.title}
                    </h3>
                    <p className="text-text-secondary text-sm mb-2">
                      {lesson.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {lesson.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="default" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
