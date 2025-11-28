import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common';
import type { Language } from '@/lib/types';

/**
 * Content configuration for the ArduinoHomeCard
 * Easy to localize later (RO/EN)
 */
const CONTENT = {
  en: {
    brand: 'Arduino @ Paradis',
    heroTitle: 'Arduino courses for 2024–2025',
    heroSubtitle: 'Hands-on lessons with boards, sensors and real classroom projects.',
    browseCourses: 'Browse Courses',
    learningTracks: 'Learning tracks',
    upcomingLabs: 'Upcoming labs & projects',
    tracks: [
      { id: 'starter', title: 'Starter: Blink & Basics' },
      { id: 'maker', title: 'Maker: Sensors & Inputs' },
      { id: 'robotics', title: 'Robotics: Motors & Motion' },
      { id: 'iot', title: 'IoT: Web & Cloud' },
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
    learningTracks: 'Trasee de învățare',
    upcomingLabs: 'Laboratoare & proiecte viitoare',
    tracks: [
      { id: 'starter', title: 'Start: Blink & Bazele' },
      { id: 'maker', title: 'Maker: Senzori & Intrări' },
      { id: 'robotics', title: 'Robotică: Motoare & Mișcare' },
      { id: 'iot', title: 'IoT: Web & Cloud' },
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
 * Arduino-themed hero card for the Home page
 * Features a hero section, learning tracks, and upcoming labs
 */
export const ArduinoHomeCard: FC<ArduinoHomeCardProps> = ({ language }) => {
  const content = CONTENT[language];

  return (
    <div className="bg-surface rounded-2xl border border-border shadow-card max-w-[1200px] mx-auto p-6 sm:p-8 md:p-10">
      {/* Brand header */}
      <div className="mb-8">
        <span className="text-sm font-medium text-primary">{content.brand}</span>
      </div>

      {/* Hero section */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text mb-4">
          {content.heroTitle}
        </h1>
        <p className="text-lg text-text-secondary mb-6 max-w-2xl">
          {content.heroSubtitle}
        </p>
        <Link to={`/${language}/courses`}>
          <Button variant="primary" size="lg">
            {content.browseCourses}
          </Button>
        </Link>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column - Learning tracks */}
        <div>
          <h2 className="text-lg font-semibold text-text mb-4">
            {content.learningTracks}
          </h2>
          <div className="space-y-3">
            {content.tracks.map((track) => (
              <Link
                key={track.id}
                to={`/${language}/courses`}
                // TODO: Add filtering by track when supported, e.g., ?track=${track.id}
                className="group flex items-center justify-between w-full p-4 bg-background-alt rounded-lg border border-border hover:border-primary hover:shadow-card transition-all duration-200"
              >
                <span className="font-medium text-text group-hover:text-primary transition-colors">
                  {track.title}
                </span>
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

        {/* Right column - Upcoming labs & projects */}
        <div>
          <h2 className="text-lg font-semibold text-text mb-4">
            {content.upcomingLabs}
          </h2>
          <div className="space-y-3">
            {/* TODO: Replace static data with real data from backend when available */}
            {content.labs.map((lab) => (
              <div
                key={lab.id}
                className="p-4 bg-background-alt rounded-lg border border-border"
              >
                <h3 className="font-medium text-text mb-1">{lab.title}</h3>
                <p className="text-sm text-text-secondary">{lab.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArduinoHomeCard;
