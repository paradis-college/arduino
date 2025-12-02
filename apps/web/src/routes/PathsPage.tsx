import type { FC, ReactElement } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '@/i18n';
import { Card, Badge } from '@/components/common';
import { getPaths } from '@/lib/pathsManifest';
import { getCoursesByPath } from '@/lib/lessonsManifest';
import type { Language } from '@/lib/types';

/** Path icon component */
const PathIcon: FC<{ icon?: string; className?: string }> = ({ icon, className = 'w-16 h-16' }) => {
  const iconMap: Record<string, ReactElement> = {
    circuit: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    sensor: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    arduino: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    project: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    network: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    raspberry: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
  };

  return iconMap[icon ?? 'circuit'] || iconMap.circuit;
};

/**
 * Paths page component
 * Lists all available learning paths
 */
export const PathsPage: FC = () => {
  const { t, language } = useLanguage();
  const params = useParams<{ lang: string }>();
  const currentLang = (params.lang as Language) || language;

  const paths = getPaths(currentLang);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">
          {t('paths.title')}
        </h1>
        <p className="text-text-secondary text-lg">
          {t('paths.subtitle')}
        </p>
      </div>

      {/* Paths grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paths.map((path) => {
          const pathCourses = getCoursesByPath(path.id, currentLang);
          
          return (
            <Link
              key={path.id}
              to={`/${currentLang}/paths/${path.slug}`}
              className="block"
            >
              <Card hoverable padding="none" className="overflow-hidden h-full">
                {/* Path icon header */}
                <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <PathIcon icon={path.icon} className="w-20 h-20 text-primary/60" />
                </div>

                <div className="p-5">
                  {/* Order badge */}
                  <Badge variant="primary" size="sm" className="mb-3">
                    {currentLang === 'ro' ? 'Traseu' : 'Path'} {path.order}
                  </Badge>

                  {/* Title */}
                  <h2 className="font-semibold text-text text-xl mb-2">
                    {path.title}
                  </h2>

                  {/* Description */}
                  <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                    {path.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-text-secondary">
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
                      {pathCourses.length} {t('paths.courses')}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Empty state if no paths */}
      {paths.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-secondary">
            {currentLang === 'ro'
              ? 'Nu există trasee disponibile momentan.'
              : 'No learning paths available at the moment.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default PathsPage;
