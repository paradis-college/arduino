/**
 * Lessons Manifest
 * Lists all available lessons with their metadata
 * 
 * TODO: Auto-generate this from MDX files at build time
 * For now, manually maintained
 */

import type { LessonMeta, CourseMeta, Language } from './types';

/** All available lessons */
// NOTE: YouTube URLs are placeholder examples. Replace with actual tutorial video URLs.
export const lessonsManifest: LessonMeta[] = [
  // Romanian lessons
  {
    id: 'basics-blink-ro',
    slug: 'basics-blink',
    title: 'LED Blink de bază',
    description: 'Învață să aprinzi și să stingi un LED folosind Arduino.',
    course: 'intro-arduino',
    difficulty: 'beginner',
    tags: ['digitalWrite', 'delay', 'pinMode', 'LED'],
    estimatedMinutes: 20,
    tinkercadUrl: 'https://www.tinkercad.com/things/example-blink',
    // TODO: Replace with actual Arduino LED blink tutorial video
    youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID',
    keyPoints: [
      { title: 'Înțelegerea LED-urilor', description: 'Cum funcționează diodele emițătoare de lumină' },
      { title: 'Funcția pinMode()', description: 'Configurarea pinilor ca intrări sau ieșiri' },
      { title: 'Bazele digitalWrite()', description: 'Controlul semnalelor digitale de ieșire' },
      { title: 'Folosirea delay()', description: 'Crearea temporizărilor în programele tale' },
    ],
    hasInteractiveExercises: true,
    language: 'ro',
    order: 1,
  },
  {
    id: 'pwm-led-ro',
    slug: 'pwm-led',
    title: 'Control PWM pentru LED',
    description: 'Folosește PWM pentru a controla luminozitatea LED-ului.',
    course: 'intro-arduino',
    difficulty: 'beginner',
    tags: ['analogWrite', 'PWM', 'LED', 'fade'],
    estimatedMinutes: 25,
    tinkercadUrl: 'https://www.tinkercad.com/things/example-pwm',
    // TODO: Replace with actual Arduino PWM tutorial video
    youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID',
    keyPoints: [
      { title: 'Ce este PWM', description: 'Modularea lățimii pulsului explicată' },
      { title: 'Funcția analogWrite()', description: 'Controlul valorilor analogice pe pinii PWM' },
      { title: 'Ciclul de funcționare', description: 'Înțelegerea procentelor de luminozitate' },
      { title: 'Efecte de fade', description: 'Crearea tranzițiilor de luminozitate fluide' },
    ],
    hasInteractiveExercises: true,
    language: 'ro',
    order: 2,
  },
  // English lessons
  {
    id: 'basics-blink-en',
    slug: 'basics-blink',
    title: 'Basic LED Blink',
    description: 'Learn to turn an LED on and off using Arduino.',
    course: 'intro-arduino',
    difficulty: 'beginner',
    tags: ['digitalWrite', 'delay', 'pinMode', 'LED'],
    estimatedMinutes: 20,
    tinkercadUrl: 'https://www.tinkercad.com/things/example-blink',
    // TODO: Replace with actual Arduino LED blink tutorial video
    youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID',
    keyPoints: [
      { title: 'Understanding LEDs', description: 'Learn how Light Emitting Diodes work and their polarity' },
      { title: 'The pinMode() function', description: 'Configure pins as inputs or outputs' },
      { title: 'digitalWrite() basics', description: 'Control digital output signals' },
      { title: 'Using delay()', description: 'Create timing in your programs' },
    ],
    hasInteractiveExercises: true,
    language: 'en',
    order: 1,
  },
  {
    id: 'pwm-led-en',
    slug: 'pwm-led',
    title: 'PWM LED Control',
    description: 'Use PWM to control LED brightness.',
    course: 'intro-arduino',
    difficulty: 'beginner',
    tags: ['analogWrite', 'PWM', 'LED', 'fade'],
    estimatedMinutes: 25,
    tinkercadUrl: 'https://www.tinkercad.com/things/example-pwm',
    // TODO: Replace with actual Arduino PWM tutorial video
    youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID',
    keyPoints: [
      { title: 'What is PWM', description: 'Pulse Width Modulation explained' },
      { title: 'The analogWrite() function', description: 'Control analog values on PWM pins' },
      { title: 'Duty cycle', description: 'Understanding brightness percentages' },
      { title: 'Fade effects', description: 'Creating smooth brightness transitions' },
    ],
    hasInteractiveExercises: true,
    language: 'en',
    order: 2,
  },
];

/** All available courses */
export const coursesManifest: CourseMeta[] = [
  {
    id: 'intro-arduino',
    slug: 'intro-arduino',
    title: 'Introducere în Arduino',
    description: 'Primii pași cu placa Arduino și LED-uri.',
    difficulty: 'beginner',
    lessonCount: 2,
    estimatedHours: 1,
    tags: ['LED', 'digital', 'PWM'],
    thumbnail: '/images/courses/intro-arduino.png',
  },
];

/** Get course metadata with localized title */
export function getCourse(courseId: string, language: Language): CourseMeta | undefined {
  const course = coursesManifest.find((c) => c.id === courseId);
  if (!course) return undefined;

  // TODO: This hard-coded string comparison for translations is fragile and 
  // difficult to maintain. Better approaches:
  // 1. Store translations in the i18n JSON files with course IDs as keys
  // 2. Store both language versions in the coursesManifest
  // 3. Use a translation key system (e.g., course.id + '.title')
  // For now, this works for Phase 1 but should be refactored with backend.
  if (language === 'en') {
    return {
      ...course,
      title: course.title === 'Introducere în Arduino' ? 'Introduction to Arduino' : course.title,
      description: course.description === 'Primii pași cu placa Arduino și LED-uri.' 
        ? 'First steps with Arduino board and LEDs.' 
        : course.description,
    };
  }

  return course;
}

/** Get lessons for a specific language */
export function getLessonsByLanguage(language: Language): LessonMeta[] {
  return lessonsManifest
    .filter((lesson) => lesson.language === language)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

/** Get lessons for a specific course and language */
export function getLessonsByCourse(courseId: string, language: Language): LessonMeta[] {
  return getLessonsByLanguage(language)
    .filter((lesson) => lesson.course === courseId);
}

/** Get a specific lesson by slug and language */
export function getLesson(slug: string, language: Language): LessonMeta | undefined {
  return lessonsManifest.find(
    (lesson) => lesson.slug === slug && lesson.language === language
  );
}

/** Get next and previous lessons */
export function getAdjacentLessons(
  slug: string,
  language: Language
): { prev?: LessonMeta; next?: LessonMeta } {
  const lessons = getLessonsByLanguage(language);
  const currentIndex = lessons.findIndex((l) => l.slug === slug);

  if (currentIndex === -1) {
    return {};
  }

  return {
    prev: currentIndex > 0 ? lessons[currentIndex - 1] : undefined,
    next: currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : undefined,
  };
}
