import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common';
import type { Language } from '@/lib/types';

/**
 * Content configuration for the HomePage
 * Easy to localize later (RO/EN)
 */
const CONTENT = {
  en: {
    brand: 'Arduino @ Paradis',
    heroTitle: 'Arduino courses for 2024–2025',
    heroSubtitle: 'Hands-on lessons with boards, sensors and real classroom projects.',
    browseCourses: 'Browse Courses',
    coursesSection: 'Courses',
    upcomingLabs: 'Upcoming labs & projects',
    courses: [
      { id: '9a', title: '9A', subtitle: 'Introduction to Arduino' },
      { id: '9b', title: '9B', subtitle: 'Sensors and Inputs' },
    ],
    labs: [
      { id: 'lab1', title: 'Intro Lab: Blink an LED', subtitle: 'Next session: April 28' },
      { id: 'lab2', title: 'Workshop: Line-following robot', subtitle: 'Coming soon' },
    ],
  },
  ro: {
    brand: 'Arduino @ Paradis',
    heroTitle: 'Cursuri Arduino pentru 2024–2025',
    heroSubtitle: 'Lecții practice cu plăci, senzori și proiecte reale în clasă.',
    browseCourses: 'Explorează cursurile',
    coursesSection: 'Cursuri',
    upcomingLabs: 'Laboratoare & proiecte viitoare',
    courses: [
      { id: '9a', title: '9A', subtitle: 'Introducere în Arduino' },
      { id: '9b', title: '9B', subtitle: 'Senzori și Intrări' },
    ],
    labs: [
      { id: 'lab1', title: 'Lab intro: Aprinde un LED', subtitle: 'Următoarea sesiune: 28 Aprilie' },
      { id: 'lab2', title: 'Atelier: Robot care urmărește linia', subtitle: 'În curând' },
    ],
  },
};

interface ArduinoHomeCardProps {
  language: Language;
}

/**
 * Professional Arduino home page component
 * Clean card-based design matching the mockup
 */
export const ArduinoHomeCard: FC<ArduinoHomeCardProps> = ({ language }) => {
  const content = CONTENT[language];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Main Hero Card */}
      <div className="bg-surface rounded-2xl border border-border shadow-sm p-8 md:p-12">
        {/* Brand */}
        <p className="text-text-secondary text-sm mb-6">{content.brand}</p>
        
        {/* Hero Title & Subtitle */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-4 leading-tight">
          {content.heroTitle}
        </h1>
        <p className="text-lg text-text-secondary mb-8 max-w-2xl">
          {content.heroSubtitle}
        </p>
        
        {/* CTA Button */}
        <Link to={`/${language}/courses`}>
          <Button variant="primary" size="lg">
            {content.browseCourses}
          </Button>
        </Link>

        {/* Hero Images Section */}
        {/* TODO: Add actual project images when available */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="aspect-video bg-background-alt rounded-xl flex items-center justify-center border border-border overflow-hidden">
            <img 
              src="/images/arduino-hero-1.jpg" 
              alt="Arduino project setup"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = `
                  <div class="flex flex-col items-center justify-center text-text-secondary p-4">
                    <svg class="w-12 h-12 mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                    <span class="text-sm">Arduino Project</span>
                  </div>
                `;
              }}
            />
          </div>
          <div className="aspect-video bg-background-alt rounded-xl flex items-center justify-center border border-border overflow-hidden">
            <img 
              src="/images/arduino-hero-2.jpg" 
              alt="Arduino workshop"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = `
                  <div class="flex flex-col items-center justify-center text-text-secondary p-4">
                    <svg class="w-12 h-12 mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                    <span class="text-sm">Workshop Setup</span>
                  </div>
                `;
              }}
            />
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Left Column - Courses */}
          <div>
            <h2 className="text-xl font-semibold text-text mb-4">
              {content.coursesSection}
            </h2>
            <div className="space-y-3">
              {content.courses.map((course) => (
                <Link
                  key={course.id}
                  to={`/${language}/courses`}
                  className="group flex items-center justify-between p-4 bg-background rounded-xl border border-border hover:border-primary hover:shadow-sm transition-all duration-200"
                >
                  <div>
                    <span className="font-semibold text-primary">{course.title}</span>
                    <span className="text-text-secondary ml-2">– {course.subtitle}</span>
                  </div>
                  <svg
                    className="w-5 h-5 text-text-secondary group-hover:text-primary transition-colors"
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
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column - Upcoming Labs */}
          <div>
            <h2 className="text-xl font-semibold text-text mb-4">
              {content.upcomingLabs}
            </h2>
            <div className="space-y-3">
              {/* TODO: Replace static data with real data from backend when available */}
              {content.labs.map((lab) => (
                <div
                  key={lab.id}
                  className="p-4 bg-background rounded-xl border border-border"
                >
                  <h3 className="font-semibold text-text mb-1">{lab.title}</h3>
                  <p className="text-sm text-text-secondary">{lab.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArduinoHomeCard;
