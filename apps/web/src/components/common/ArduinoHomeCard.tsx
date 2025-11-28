import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common';
import type { Language } from '@/lib/types';

/**
 * Content configuration for the HomePage
 * Easy to localize later (RO/EN)
 */
const CONTENT = {
  en: {
    heroTitle: 'Learn Arduino',
    heroSubtitle: 'Master electronics and programming through hands-on courses, interactive labs, and real-world projects at Paradis College.',
    browseCourses: 'Browse Courses',
    viewCommunity: 'View Community',
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
    heroTitle: 'Învață Arduino',
    heroSubtitle: 'Stăpânește electronica și programarea prin cursuri practice, laboratoare interactive și proiecte reale la Paradis College.',
    browseCourses: 'Explorează cursurile',
    viewCommunity: 'Comunitate',
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

const HERO_IMAGES = [
  '/images/arduino-hero-1.jpg',
  '/images/arduino-hero-2.jpg',
];

interface ArduinoHomeCardProps {
  language: Language;
}

/**
 * Professional Arduino home page component
 * Features hero section with image carousel background
 */
export const ArduinoHomeCard: FC<ArduinoHomeCardProps> = ({ language }) => {
  const content = CONTENT[language];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section with Image Carousel Background */}
      <section className="relative rounded-2xl overflow-hidden min-h-[500px] md:min-h-[600px]">
        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          {HERO_IMAGES.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-center h-full min-h-[500px] md:min-h-[600px] px-8 md:px-16 py-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-2xl">
            {content.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
            {content.heroSubtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to={`/${language}/courses`}>
              <Button variant="primary" size="lg">
                {content.browseCourses}
              </Button>
            </Link>
            <Link to={`/${language}/community`}>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                {content.viewCommunity}
              </Button>
            </Link>
          </div>

          {/* Carousel Indicators */}
          <div className="flex gap-2 mt-8">
            {HERO_IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Two Column Layout - Courses and Labs */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Courses */}
        <div>
          <h2 className="text-2xl font-bold text-text mb-6">
            {content.coursesSection}
          </h2>
          <div className="space-y-4">
            {content.courses.map((course) => (
              <Link
                key={course.id}
                to={`/${language}/courses`}
                className="group flex items-center justify-between p-5 bg-surface rounded-xl border border-border hover:border-primary hover:shadow-md transition-all duration-200"
              >
                <div>
                  <span className="font-semibold text-primary text-lg">{course.title}</span>
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
          <h2 className="text-2xl font-bold text-text mb-6">
            {content.upcomingLabs}
          </h2>
          <div className="space-y-4">
            {/* TODO: Replace static data with real data from backend when available */}
            {content.labs.map((lab) => (
              <div
                key={lab.id}
                className="p-5 bg-surface rounded-xl border border-border"
              >
                <h3 className="font-semibold text-text text-lg mb-1">{lab.title}</h3>
                <p className="text-text-secondary">{lab.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArduinoHomeCard;
