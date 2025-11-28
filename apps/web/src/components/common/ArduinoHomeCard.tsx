import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Badge } from '@/components/common';
import { getLessonsByLanguage } from '@/lib/lessonsManifest';
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
    beginnerFriendly: 'Beginner Friendly',
    popularLessons: 'Popular Lessons',
    upcomingLabs: 'Upcoming labs & projects',
    viewAll: 'View All',
    minutes: 'min',
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
    beginnerFriendly: 'Pentru Începători',
    popularLessons: 'Lecții Populare',
    upcomingLabs: 'Laboratoare & proiecte viitoare',
    viewAll: 'Vezi toate',
    minutes: 'min',
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
  
  // Get lessons from manifest
  const allLessons = getLessonsByLanguage(language);
  
  // Filter beginner-friendly lessons
  const beginnerLessons = allLessons.filter(lesson => lesson.difficulty === 'beginner');
  
  // Popular lessons (for now, just take first lessons - TODO: implement actual popularity tracking)
  const popularLessons = allLessons.slice(0, 2);

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

      {/* Beginner Friendly Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text">
            {content.beginnerFriendly}
          </h2>
          <Link 
            to={`/${language}/courses`}
            className="text-primary hover:text-primary-hover font-medium transition-colors"
          >
            {content.viewAll} →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {beginnerLessons.map((lesson) => (
            <Link
              key={lesson.id}
              to={`/${language}/lessons/${lesson.slug}`}
              className="group p-5 bg-surface rounded-xl border border-border hover:border-primary hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="success" size="sm">
                      {language === 'en' ? 'Beginner' : 'Începător'}
                    </Badge>
                    <span className="text-sm text-text-secondary">
                      ~{lesson.estimatedMinutes} {content.minutes}
                    </span>
                  </div>
                  <h3 className="font-semibold text-text text-lg group-hover:text-primary transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-text-secondary mt-1">{lesson.description}</p>
                </div>
                <svg
                  className="w-5 h-5 text-text-secondary group-hover:text-primary transition-colors ml-4 flex-shrink-0"
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
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Lessons Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text">
            {content.popularLessons}
          </h2>
          <Link 
            to={`/${language}/courses`}
            className="text-primary hover:text-primary-hover font-medium transition-colors"
          >
            {content.viewAll} →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* TODO: Replace with actual popularity tracking from backend */}
          {popularLessons.map((lesson) => (
            <Link
              key={lesson.id}
              to={`/${language}/lessons/${lesson.slug}`}
              className="group p-5 bg-surface rounded-xl border border-border hover:border-primary hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="default" size="sm">
                      {lesson.difficulty === 'beginner' 
                        ? (language === 'en' ? 'Beginner' : 'Începător')
                        : lesson.difficulty === 'intermediate'
                        ? (language === 'en' ? 'Intermediate' : 'Intermediar')
                        : (language === 'en' ? 'Advanced' : 'Avansat')
                      }
                    </Badge>
                    <span className="text-sm text-text-secondary">
                      ~{lesson.estimatedMinutes} {content.minutes}
                    </span>
                  </div>
                  <h3 className="font-semibold text-text text-lg group-hover:text-primary transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-text-secondary mt-1">{lesson.description}</p>
                </div>
                <svg
                  className="w-5 h-5 text-text-secondary group-hover:text-primary transition-colors ml-4 flex-shrink-0"
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
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Upcoming Labs Section */}
      <section>
        <h2 className="text-2xl font-bold text-text mb-6">
          {content.upcomingLabs}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </section>
    </div>
  );
};

export default ArduinoHomeCard;
