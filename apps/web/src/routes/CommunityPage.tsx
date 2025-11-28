import type { FC } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/i18n';
import { Card, Badge, Button } from '@/components/common';
import { mockProjects, getFilteredProjects } from '@/lib/mockProjects';
import type { Language, Difficulty } from '@/lib/types';

/**
 * Community page component
 * Shows community projects with filters
 */
export const CommunityPage: FC = () => {
  const { t, language } = useLanguage();
  const params = useParams<{ lang: string }>();
  const currentLang = (params.lang as Language) || language;

  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | ''>('');
  const [courseFilter, setCourseFilter] = useState<string>('');

  // Get filtered projects
  const projects = getFilteredProjects({
    difficulty: difficultyFilter || undefined,
    course: courseFilter || undefined,
  });

  // Get unique values for filters
  const difficulties: Difficulty[] = ['beginner', 'intermediate', 'advanced'];
  const courses = [...new Set(mockProjects.map((p) => p.course))];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">
          {t('community.title')}
        </h1>
        <p className="text-text-secondary text-lg">
          {t('community.subtitle')}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 p-4 bg-surface rounded-lg border border-border">
        {/* Difficulty filter */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            {t('community.filterByDifficulty')}
          </label>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value as Difficulty | '')}
            className="px-3 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">{currentLang === 'ro' ? 'Toate' : 'All'}</option>
            {difficulties.map((diff) => (
              <option key={diff} value={diff}>
                {t(`difficulty.${diff}`)}
              </option>
            ))}
          </select>
        </div>

        {/* Course filter */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">
            {t('community.filterByCourse')}
          </label>
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">{currentLang === 'ro' ? 'Toate' : 'All'}</option>
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        {/* Clear filters */}
        {(difficultyFilter || courseFilter) && (
          <div className="flex items-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setDifficultyFilter('');
                setCourseFilter('');
              }}
            >
              {currentLang === 'ro' ? 'Resetează filtre' : 'Clear filters'}
            </Button>
          </div>
        )}
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} hoverable padding="none" className="overflow-hidden">
            {/* Project image */}
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
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
            )}

            <div className="p-5">
              {/* Difficulty badge */}
              <Badge
                variant={
                  project.difficulty === 'beginner'
                    ? 'success'
                    : project.difficulty === 'intermediate'
                    ? 'warning'
                    : 'error'
                }
                size="sm"
                className="mb-3"
              >
                {t(`difficulty.${project.difficulty}`)}
              </Badge>

              {/* Title */}
              <h3 className="font-semibold text-text text-lg mb-2">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.slice(0, 4).map((tag) => (
                  <Badge key={tag} variant="default" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Author and likes */}
              <div className="flex items-center justify-between text-sm text-text-secondary pt-4 border-t border-border">
                <span className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">
                      {project.author.charAt(0)}
                    </span>
                  </div>
                  {project.author}
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  {project.likes} {t('community.likes')}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-secondary mb-4">
            {t('community.noProjectsFound')}
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setDifficultyFilter('');
              setCourseFilter('');
            }}
          >
            {currentLang === 'ro' ? 'Resetează filtre' : 'Clear filters'}
          </Button>
        </div>
      )}

      {/* Submit project CTA */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center">
        <h3 className="text-xl font-semibold text-text mb-2">
          {t('community.submitProject')}
        </h3>
        <p className="text-text-secondary mb-4">
          {t('community.loginToSubmit')}
        </p>
        <Button variant="primary" disabled>
          {t('common.login')}
        </Button>
        {/* TODO: Implement project submission when backend is ready */}
      </div>
    </div>
  );
};

export default CommunityPage;
