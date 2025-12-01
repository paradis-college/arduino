import type { FC, ComponentType } from 'react';
import { useState, useEffect, Suspense } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { useLanguage } from '@/i18n';
import { getLesson, getAdjacentLessons, getCourse } from '@/lib/lessonsManifest';
import { loadMDX } from '@/lib/mdxClient';
import { getProjectsForLesson } from '@/lib/mockProjects';
import { LessonHeader, LessonOutline, LessonFooterBiscuits } from '@/components/lessons';
import { 
  InfoBox, 
  Checkpoint, 
  TinkercadEmbed, 
  ExerciseMultipleChoice, 
  ExercisePinMapping,
  YouTubeEmbed,
  LessonIntro,
  Chapter,
  StepWithGif,
  KeyPoints
} from '@/components/interactive';
import { Button, Card, Breadcrumbs } from '@/components/common';
import type { Language, OutlineHeading } from '@/lib/types';
import type { BreadcrumbItem } from '@/components/common/Breadcrumbs';

// MDX components mapping - cast to satisfy MDXProvider's expected type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mdxComponents: Record<string, ComponentType<any>> = {
  InfoBox,
  Checkpoint,
  TinkercadEmbed,
  ExerciseMultipleChoice,
  ExercisePinMapping,
  YouTubeEmbed,
  LessonIntro,
  Chapter,
  StepWithGif,
  KeyPoints,
  // Add more components as needed
};

/**
 * Lesson page component
 * Renders MDX content with interactive components
 */
export const LessonPage: FC = () => {
  const { t, language } = useLanguage();
  const params = useParams<{ lang: string; lessonSlug: string }>();
  const currentLang = (params.lang as Language) || language;
  const lessonSlug = params.lessonSlug || '';

  const [MDXContent, setMDXContent] = useState<React.ComponentType<{
    components?: Record<string, React.ComponentType<unknown>>;
  }> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const lesson = getLesson(lessonSlug, currentLang);
  const { prev, next } = getAdjacentLessons(lessonSlug, currentLang);
  const relatedProjects = getProjectsForLesson(lessonSlug);
  
  // Get course info for breadcrumbs
  const course = lesson ? getCourse(lesson.course, currentLang) : undefined;

  // Load MDX content
  useEffect(() => {
    async function loadContent() {
      if (!lesson) return;

      setLoading(true);
      setError(null);

      try {
        const mdxModule = await loadMDX(lessonSlug, currentLang);
        if (mdxModule) {
          setMDXContent(() => mdxModule.default);
        } else {
          setError('Failed to load lesson content');
        }
      } catch (err) {
        console.error('Error loading MDX:', err);
        setError('Failed to load lesson content');
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, [lessonSlug, currentLang, lesson]);

  // Redirect if lesson not found
  if (!lesson) {
    return <Navigate to={`/${currentLang}/courses`} replace />;
  }

  // Static outline for now
  // TODO: Extract headings from MDX content dynamically
  const outlineHeadings: OutlineHeading[] = [
    { id: 'what-youll-learn', text: currentLang === 'ro' ? 'Ce vei învăța' : "What You'll Learn", level: 2 },
    { id: 'required-components', text: currentLang === 'ro' ? 'Componentele necesare' : 'Required Components', level: 2 },
    { id: 'tinkercad-simulation', text: currentLang === 'ro' ? 'Simularea Tinkercad' : 'Tinkercad Simulation', level: 2 },
    { id: 'the-code', text: currentLang === 'ro' ? 'Codul' : 'The Code', level: 2 },
    { id: 'summary', text: currentLang === 'ro' ? 'Rezumat' : 'Summary', level: 2 },
  ];

  // Count total checkpoints (for progress bar)
  // TODO: Calculate from MDX content
  const totalCheckpoints = 3;

  // Build breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: t('common.home'), href: `/${currentLang}` },
    { label: t('common.courses'), href: `/${currentLang}/courses` },
  ];
  
  if (course) {
    breadcrumbItems.push({ 
      label: course.title, 
      href: `/${currentLang}/courses/${course.slug}` 
    });
  }
  
  breadcrumbItems.push({ label: lesson.title });

  return (
    <div className="flex gap-8">
      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />
        
        {/* Header */}
        <LessonHeader lesson={lesson} totalCheckpoints={totalCheckpoints} />

        {/* Content */}
        <div className="mdx-content">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : error ? (
            <Card padding="lg" className="text-center">
              <p className="text-error mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                {t('exercise.tryAgain')}
              </Button>
            </Card>
          ) : MDXContent ? (
            <MDXProvider components={mdxComponents}>
              <Suspense
                fallback={
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                  </div>
                }
              >
                <MDXContent components={mdxComponents} />
              </Suspense>
            </MDXProvider>
          ) : null}
        </div>

        {/* Navigation between lessons */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
          {prev ? (
            <Link to={`/${currentLang}/lessons/${prev.slug}`}>
              <Button variant="outline">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                {t('lesson.previousLesson')}
              </Button>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link to={`/${currentLang}/lessons/${next.slug}`}>
              <Button variant="primary">
                {t('lesson.nextLesson')}
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>
            </Link>
          ) : (
            <Link to={`/${currentLang}/courses`}>
              <Button variant="primary">
                {currentLang === 'ro' ? 'Înapoi la cursuri' : 'Back to Courses'}
              </Button>
            </Link>
          )}
        </div>

        {/* Community projects */}
        <LessonFooterBiscuits projects={relatedProjects} />
      </div>

      {/* Sidebar with outline (desktop only) */}
      <aside className="hidden lg:block w-64 shrink-0">
        <LessonOutline headings={outlineHeadings} />
      </aside>
    </div>
  );
};

export default LessonPage;
