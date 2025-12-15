/**
 * Mock projects data
 * Simulates community projects for Phase 1
 *
 * TODO: Replace with real API calls when backend is ready
 */

import type { ProjectMeta } from './types';

export const mockProjects: ProjectMeta[] = [
  {
    id: 'proj-1',
    title: 'Arduino Traffic Light',
    description: 'A simple traffic light simulation using 3 LEDs and timing control.',
    author: 'Maria P.',
    tags: ['LED', 'delay', 'beginner'],
    course: 'intro-arduino',
    difficulty: 'beginner',
    components: ['LED', 'Resistor', 'Arduino Uno'],
    createdAt: Date.now() - 86400000 * 7, // 7 days ago
    likes: 24,
  },
  {
    id: 'proj-2',
    title: 'PWM Rainbow LED Strip',
    description: 'Create smooth color transitions on an RGB LED strip using PWM signals.',
    author: 'Alex M.',
    tags: ['PWM', 'RGB', 'LED Strip'],
    course: 'intro-arduino',
    difficulty: 'intermediate',
    components: ['LED Strip', 'Arduino Nano', 'Power Supply'],
    createdAt: Date.now() - 86400000 * 3, // 3 days ago
    likes: 42,
  },
  {
    id: 'proj-3',
    title: 'Breathing LED Animation',
    description: 'LED that fades in and out like breathing, using analogWrite.',
    author: 'Ion T.',
    tags: ['PWM', 'analogWrite', 'animation'],
    course: 'intro-arduino',
    difficulty: 'beginner',
    components: ['LED', 'Resistor', 'Arduino Uno'],
    createdAt: Date.now() - 86400000 * 1, // 1 day ago
    likes: 18,
  },
  {
    id: 'proj-4',
    title: 'Night Light Sensor',
    description: 'Automatic LED that turns on in dark conditions using a photoresistor.',
    author: 'Elena R.',
    tags: ['sensor', 'LED', 'analog'],
    course: 'intro-arduino',
    difficulty: 'beginner',
    components: ['LED', 'Photoresistor', 'Arduino Uno'],
    createdAt: Date.now() - 86400000 * 5, // 5 days ago
    likes: 31,
  },
  {
    id: 'proj-5',
    title: 'Morse Code Flasher',
    description: 'Convert text to Morse code and flash it using an LED.',
    author: 'Andrei B.',
    tags: ['LED', 'communication', 'strings'],
    course: 'intro-arduino',
    difficulty: 'intermediate',
    components: ['LED', 'Buzzer', 'Arduino Uno'],
    createdAt: Date.now() - 86400000 * 10, // 10 days ago
    likes: 56,
  },
  {
    id: 'proj-6',
    title: 'LED Matrix Display',
    description: '8x8 LED matrix that displays scrolling text and simple animations.',
    author: 'Cristian D.',
    tags: ['LED Matrix', 'display', 'animation'],
    course: 'intro-arduino',
    difficulty: 'advanced',
    components: ['LED Matrix 8x8', 'MAX7219', 'Arduino Uno'],
    createdAt: Date.now() - 86400000 * 14, // 14 days ago
    likes: 89,
  },
];

/**
 * Get projects filtered by various criteria
 * TODO: Replace with API endpoint when backend is ready
 */
export function getFilteredProjects(filters?: {
  course?: string;
  difficulty?: string;
  tags?: string[];
}): ProjectMeta[] {
  let filtered = [...mockProjects];

  if (filters?.course) {
    filtered = filtered.filter((p) => p.course === filters.course);
  }

  if (filters?.difficulty) {
    filtered = filtered.filter((p) => p.difficulty === filters.difficulty);
  }

  if (filters?.tags && filters.tags.length > 0) {
    filtered = filtered.filter((p) =>
      filters.tags!.some((tag) => p.tags.includes(tag))
    );
  }

  return filtered;
}

/**
 * Get projects for a specific lesson
 */
export function getProjectsForLesson(_lessonSlug: string): ProjectMeta[] {
  // For now, return first 3 projects as related to any lesson
  // TODO: Implement proper relationship when backend is ready
  return mockProjects.slice(0, 3);
}

export default mockProjects;
