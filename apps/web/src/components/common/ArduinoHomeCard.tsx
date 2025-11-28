import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Badge } from '@/components/common';
import { coursesManifest, getCourse } from '@/lib/lessonsManifest';
import type { Language } from '@/lib/types';

/**
 * Content configuration for the HomePage
 * Easy to localize later (RO/EN)
 */
const CONTENT = {
  en: {
    heroTitle: 'Learn Arduino Programming',
    heroSubtitle: 'Master electronics and programming through hands-on courses, interactive labs, and real-world projects.',
    browseCourses: 'Browse Courses',
    viewCommunity: 'View Community',
    featuredCourses: 'Featured Courses',
    upcomingLabs: 'Upcoming Labs',
    viewAllCourses: 'View All Courses',
    lessons: 'lessons',
    hours: 'hours',
    labs: [
      { id: 'lab1', title: 'Intro Lab: Blink an LED', subtitle: 'Next session: April 28', badge: 'Beginner' },
      { id: 'lab2', title: 'Workshop: Line-following Robot', subtitle: 'Coming soon', badge: 'Intermediate' },
    ],
  },
  ro: {
    heroTitle: 'Învață Programare Arduino',
    heroSubtitle: 'Stăpânește electronica și programarea prin cursuri practice, laboratoare interactive și proiecte reale.',
    browseCourses: 'Vezi Cursurile',
    viewCommunity: 'Comunitate',
    featuredCourses: 'Cursuri Recomandate',
    upcomingLabs: 'Laboratoare Programate',
    viewAllCourses: 'Toate Cursurile',
    lessons: 'lecții',
    hours: 'ore',
    labs: [
      { id: 'lab1', title: 'Lab Intro: Aprinde un LED', subtitle: 'Următoarea sesiune: 28 Aprilie', badge: 'Începător' },
      { id: 'lab2', title: 'Atelier: Robot Line-follower', subtitle: 'În curând', badge: 'Intermediar' },
    ],
  },
};

const DIFFICULTY_LABELS = {
  en: { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' },
  ro: { beginner: 'Începător', intermediate: 'Intermediar', advanced: 'Avansat' },
};

interface ArduinoHomeCardProps {
  language: Language;
}

/**
 * Professional Arduino home page component
 * Features hero section, featured courses, and upcoming labs
 */
export const ArduinoHomeCard: FC<ArduinoHomeCardProps> = ({ language }) => {
  const content = CONTENT[language];
  const difficultyLabels = DIFFICULTY_LABELS[language];
  const courses = coursesManifest.map((c) => getCourse(c.id, language)!).slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text mb-6 leading-tight">
          {content.heroTitle}
        </h1>
        <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-8">
          {content.heroSubtitle}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to={`/${language}/courses`}>
            <Button variant="primary" size="lg">
              {content.browseCourses}
            </Button>
          </Link>
          <Link to={`/${language}/community`}>
            <Button variant="outline" size="lg">
              {content.viewCommunity}
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text">
            {content.featuredCourses}
          </h2>
          <Link 
            to={`/${language}/courses`}
            className="text-primary hover:text-primary-hover font-medium transition-colors"
          >
            {content.viewAllCourses} →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link
              key={course.id}
              to={`/${language}/courses/${course.slug}`}
              className="block"
            >
              <Card hoverable padding="none" className="overflow-hidden h-full">
                <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-primary/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                  </svg>
                </div>
                <div className="p-5">
                  <Badge variant="success" size="sm" className="mb-3">
                    {difficultyLabels[course.difficulty as keyof typeof difficultyLabels]}
                  </Badge>
                  <h3 className="font-semibold text-text text-lg mb-2">
                    {course.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-text-secondary">
                    <span>{course.lessonCount} {content.lessons}</span>
                    <span>~{course.estimatedHours} {content.hours}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Upcoming Labs Section */}
      <section>
        <h2 className="text-2xl font-bold text-text mb-6">
          {content.upcomingLabs}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TODO: Replace static data with real data from backend when available */}
          {content.labs.map((lab) => (
            <Card key={lab.id} padding="lg" className="flex items-start gap-4">
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
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-text">{lab.title}</h3>
                  <Badge variant="default" size="sm">{lab.badge}</Badge>
                </div>
                <p className="text-sm text-text-secondary">{lab.subtitle}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArduinoHomeCard;
