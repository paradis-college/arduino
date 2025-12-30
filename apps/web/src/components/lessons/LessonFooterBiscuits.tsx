import type { FC } from 'react';
import { useLanguage } from '@/i18n';
import { Card, Badge } from '@/components/common';
import type { ProjectMeta } from '@/lib/types';

export interface LessonFooterBiscuitsProps {
  projects: ProjectMeta[];
}

/**
 * Lesson footer "biscuits" component
 * Shows community projects related to the lesson
 */
export const LessonFooterBiscuits: FC<LessonFooterBiscuitsProps> = ({ projects }) => {
  const { t } = useLanguage();

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h3 className="text-xl font-semibold text-text mb-6">
        {t('lesson.communityProjects')}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card key={project.id} hoverable padding="md">
            {/* Project image placeholder */}
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
            ) : (
              <div className="w-full h-32 bg-background-alt rounded-lg mb-3 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-text-secondary"
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
            )}

            <h4 className="font-semibold text-text mb-1">{project.title}</h4>
            <p className="text-text-secondary text-sm mb-3 line-clamp-2">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="default" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Author and likes */}
            <div className="flex items-center justify-between mt-3 text-sm text-text-secondary">
              <span>{project.author}</span>
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {project.likes}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* CTA for submitting projects */}
      <div className="mt-6 p-4 bg-background-alt rounded-lg text-center">
        <p className="text-text-secondary text-sm">
          {t('community.loginToSubmit')}
        </p>
      </div>
    </div>
  );
};

export default LessonFooterBiscuits;
