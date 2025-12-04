/**
 * Paths Manifest
 * Defines learning paths, courses, and lesson structure
 * 
 * A path is a collection of related courses forming a complete learning track
 */

import type { PathMeta, Language } from './types';
import { getCoursesByPath } from './lessonsManifest';

/** All available paths */
export const pathsManifest: PathMeta[] = [
  {
    id: 'electronic-engineering',
    slug: 'electronic-engineering',
    title: 'Electronic Engineering',
    description: 'Learn about passive, active, and electromechanical components',
    icon: 'circuit',
    courseCount: 3,
    order: 1,
  },
  {
    id: 'electronic-sensors',
    slug: 'electronic-sensors',
    title: 'Electronic Sensors',
    description: 'Master various sensors for vision, environment, and consumer electronics',
    icon: 'sensor',
    courseCount: 3,
    order: 2,
  },
  {
    id: 'arduino-basics',
    slug: 'arduino-basics',
    title: 'Arduino Basics',
    description: 'Get started with embedded programming, inputs, and outputs',
    icon: 'arduino',
    courseCount: 3,
    order: 3,
  },
  {
    id: 'arduino-advanced',
    slug: 'arduino-advanced',
    title: 'Arduino Advanced (Projects)',
    description: 'Build complete projects: traffic lights, plant monitors, alarms, and robots',
    icon: 'project',
    courseCount: 4,
    order: 4,
  },
  {
    id: 'arduino-networking',
    slug: 'arduino-networking',
    title: 'Arduino Networking',
    description: 'Connect your Arduino via Serial, IR, Bluetooth, and Wi-Fi',
    icon: 'network',
    courseCount: 4,
    order: 5,
  },
  {
    id: 'raspberry-pi',
    slug: 'raspberry-pi',
    title: 'Raspberry Pi',
    description: 'Learn Linux, GPIO, Python, and device communication on Raspberry Pi',
    icon: 'raspberry',
    courseCount: 4,
    order: 6,
  },
];

/** Path translations for localization */
const pathTranslations: Record<string, { ro: { title: string; description: string }; en: { title: string; description: string } }> = {
  'electronic-engineering': {
    ro: {
      title: 'Inginerie Electronică',
      description: 'Învață despre componente pasive, active și electromecanice',
    },
    en: {
      title: 'Electronic Engineering',
      description: 'Learn about passive, active, and electromechanical components',
    },
  },
  'electronic-sensors': {
    ro: {
      title: 'Senzori Electronici',
      description: 'Stăpânește diverși senzori pentru viziune, mediu și electronice de consum',
    },
    en: {
      title: 'Electronic Sensors',
      description: 'Master various sensors for vision, environment, and consumer electronics',
    },
  },
  'arduino-basics': {
    ro: {
      title: 'Bazele Arduino',
      description: 'Începe cu programarea embedded, intrări și ieșiri',
    },
    en: {
      title: 'Arduino Basics',
      description: 'Get started with embedded programming, inputs, and outputs',
    },
  },
  'arduino-advanced': {
    ro: {
      title: 'Arduino Avansat (Proiecte)',
      description: 'Construiește proiecte complete: semafoare, monitoare pentru plante, alarme și roboți',
    },
    en: {
      title: 'Arduino Advanced (Projects)',
      description: 'Build complete projects: traffic lights, plant monitors, alarms, and robots',
    },
  },
  'arduino-networking': {
    ro: {
      title: 'Arduino Networking',
      description: 'Conectează Arduino-ul prin Serial, IR, Bluetooth și Wi-Fi',
    },
    en: {
      title: 'Arduino Networking',
      description: 'Connect your Arduino via Serial, IR, Bluetooth, and Wi-Fi',
    },
  },
  'raspberry-pi': {
    ro: {
      title: 'Raspberry Pi',
      description: 'Învață Linux, GPIO, Python și comunicarea cu dispozitive pe Raspberry Pi',
    },
    en: {
      title: 'Raspberry Pi',
      description: 'Learn Linux, GPIO, Python, and device communication on Raspberry Pi',
    },
  },
};

/** Get all paths with localized content (only paths with available courses) */
export function getPaths(language: Language): PathMeta[] {
  return pathsManifest
    .filter((path) => getCoursesByPath(path.id, language).length > 0)
    .map((path) => {
      const translations = pathTranslations[path.id];
      if (translations && translations[language]) {
        return {
          ...path,
          title: translations[language].title,
          description: translations[language].description,
        };
      }
      return path;
    })
    .sort((a, b) => a.order - b.order);
}

/** Get a specific path by slug with localized content */
export function getPath(slug: string, language: Language): PathMeta | undefined {
  const path = pathsManifest.find((p) => p.slug === slug);
  if (!path) return undefined;

  const translations = pathTranslations[path.id];
  if (translations && translations[language]) {
    return {
      ...path,
      title: translations[language].title,
      description: translations[language].description,
    };
  }
  return path;
}
