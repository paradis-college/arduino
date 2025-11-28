/**
 * Progress Store
 * Manages lesson progress, checkpoints, saved lessons, and ratings using localStorage
 */

import type { LessonProgress, CheckpointState, ProgressStore } from './types';

const PROGRESS_STORAGE_KEY = 'arduino-progress';
const CURRENT_VERSION = 1;

/**
 * Get the initial progress store from localStorage
 */
function getStore(): ProgressStore {
  if (typeof window === 'undefined') {
    return createEmptyStore();
  }

  try {
    const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as ProgressStore;
      // Handle version migrations here if needed
      if (parsed.version === CURRENT_VERSION) {
        return parsed;
      }
      // TODO: Add migration logic for future versions
      return migrateStore(parsed);
    }
  } catch (error) {
    console.error('Failed to parse progress store:', error);
  }

  return createEmptyStore();
}

/**
 * Create an empty progress store
 */
function createEmptyStore(): ProgressStore {
  return {
    version: CURRENT_VERSION,
    lessons: {},
    preferredLanguage: 'ro',
  };
}

/**
 * Migrate store from older versions
 * TODO: Implement actual migration logic when schema changes
 */
function migrateStore(oldStore: Partial<ProgressStore>): ProgressStore {
  // For now, just create a new store with existing data
  return {
    ...createEmptyStore(),
    ...oldStore,
    version: CURRENT_VERSION,
  };
}

/**
 * Save the store to localStorage
 */
function saveStore(store: ProgressStore): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(store));
    } catch (error) {
      console.error('Failed to save progress store:', error);
    }
  }
}

/**
 * Create an empty lesson progress object
 */
function createEmptyLessonProgress(lessonKey: string): LessonProgress {
  return {
    lessonKey,
    checkpoints: {},
    saved: false,
    stars: 0,
    startedAt: Date.now(),
  };
}

/**
 * Get progress for a specific lesson
 */
export function getLessonProgress(lessonKey: string): LessonProgress {
  const store = getStore();
  return store.lessons[lessonKey] || createEmptyLessonProgress(lessonKey);
}

/**
 * Update a checkpoint's completion status
 */
export function updateCheckpoint(
  lessonKey: string,
  checkpointId: string,
  completed: boolean
): void {
  const store = getStore();
  
  if (!store.lessons[lessonKey]) {
    store.lessons[lessonKey] = createEmptyLessonProgress(lessonKey);
  }

  const checkpoint: CheckpointState = {
    id: checkpointId,
    completed,
    completedAt: completed ? Date.now() : undefined,
  };

  store.lessons[lessonKey].checkpoints[checkpointId] = checkpoint;
  store.lessons[lessonKey].lastVisited = Date.now();

  saveStore(store);
}

/**
 * Toggle the saved status of a lesson
 */
export function toggleSaved(lessonKey: string): boolean {
  const store = getStore();

  if (!store.lessons[lessonKey]) {
    store.lessons[lessonKey] = createEmptyLessonProgress(lessonKey);
  }

  store.lessons[lessonKey].saved = !store.lessons[lessonKey].saved;
  store.lessons[lessonKey].lastVisited = Date.now();

  saveStore(store);
  return store.lessons[lessonKey].saved;
}

/**
 * Set star rating for a lesson
 */
export function setStars(lessonKey: string, stars: number): void {
  const store = getStore();

  if (!store.lessons[lessonKey]) {
    store.lessons[lessonKey] = createEmptyLessonProgress(lessonKey);
  }

  // Clamp stars between 0 and 5
  store.lessons[lessonKey].stars = Math.max(0, Math.min(5, stars));
  store.lessons[lessonKey].lastVisited = Date.now();

  saveStore(store);
}

/**
 * Get all saved lessons
 */
export function getSavedLessons(): string[] {
  const store = getStore();
  return Object.entries(store.lessons)
    .filter(([, progress]) => progress.saved)
    .map(([key]) => key);
}

/**
 * Calculate progress percentage for a lesson
 */
export function getProgressPercentage(
  lessonKey: string,
  totalCheckpoints: number
): number {
  if (totalCheckpoints === 0) return 0;

  const progress = getLessonProgress(lessonKey);
  const completedCount = Object.values(progress.checkpoints)
    .filter((cp) => cp.completed).length;

  return Math.round((completedCount / totalCheckpoints) * 100);
}

/**
 * Check if a specific checkpoint is completed
 */
export function isCheckpointCompleted(
  lessonKey: string,
  checkpointId: string
): boolean {
  const progress = getLessonProgress(lessonKey);
  return progress.checkpoints[checkpointId]?.completed ?? false;
}

/**
 * Mark a lesson as completed (all checkpoints done)
 */
export function markLessonCompleted(lessonKey: string): void {
  const store = getStore();

  if (!store.lessons[lessonKey]) {
    store.lessons[lessonKey] = createEmptyLessonProgress(lessonKey);
  }

  store.lessons[lessonKey].completedAt = Date.now();
  store.lessons[lessonKey].lastVisited = Date.now();

  saveStore(store);
}

/**
 * Reset progress for a specific lesson
 */
export function resetLessonProgress(lessonKey: string): void {
  const store = getStore();

  if (store.lessons[lessonKey]) {
    store.lessons[lessonKey] = createEmptyLessonProgress(lessonKey);
    saveStore(store);
  }
}

/**
 * Clear all progress data
 * TODO: Add confirmation before calling in production
 */
export function clearAllProgress(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(PROGRESS_STORAGE_KEY);
  }
}

/**
 * Export progress data for backup
 * TODO: Add backend sync when available
 */
export function exportProgress(): string {
  const store = getStore();
  return JSON.stringify(store, null, 2);
}

/**
 * Import progress data from backup
 * TODO: Add validation and backend sync when available
 */
export function importProgress(data: string): boolean {
  try {
    const parsed = JSON.parse(data) as ProgressStore;
    if (parsed.version && parsed.lessons) {
      saveStore(parsed);
      return true;
    }
  } catch (error) {
    console.error('Failed to import progress:', error);
  }
  return false;
}
