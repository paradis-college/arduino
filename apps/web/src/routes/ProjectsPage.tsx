import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/i18n';
import { Card } from '@/components/common';
import type { Language } from '@/lib/types';

/**
 * Projects page component (placeholder)
 * TODO: Implement full projects page with filtering and project showcase
 */
export const ProjectsPage: FC = () => {
  const { language } = useLanguage();
  const params = useParams<{ lang: string }>();
  const currentLang = (params.lang as Language) || language;

  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-text mb-4">
          {currentLang === 'ro' ? 'Proiecte' : 'Projects'}
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          {currentLang === 'ro'
            ? 'Explorează proiectele create de comunitatea noastră și inspiră-te pentru următoarea ta creație.'
            : 'Explore projects created by our community and get inspired for your next creation.'}
        </p>
      </section>

      <Card padding="lg" className="text-center">
        <div className="py-12">
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
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-text mb-2">
            {currentLang === 'ro' ? 'În curând' : 'Coming Soon'}
          </h2>
          <p className="text-text-secondary">
            {currentLang === 'ro'
              ? 'Pagina de proiecte este în dezvoltare. Revino în curând!'
              : 'The projects page is under development. Check back soon!'}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ProjectsPage;
