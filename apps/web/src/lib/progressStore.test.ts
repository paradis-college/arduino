import { describe, it, expect, beforeEach } from 'vitest';
import {
  getLessonProgress,
  updateCheckpoint,
  toggleSaved,
  setStars,
  getSavedLessons,
  getProgressPercentage,
  isCheckpointCompleted,
  resetLessonProgress,
  clearAllProgress,
} from '@/lib/progressStore';

describe('progressStore', () => {
  beforeEach(() => {
    clearAllProgress();
  });

  describe('getLessonProgress', () => {
    it('returns empty progress for new lesson', () => {
      const progress = getLessonProgress('test-lesson');
      
      expect(progress.lessonKey).toBe('test-lesson');
      expect(progress.checkpoints).toEqual({});
      expect(progress.saved).toBe(false);
      expect(progress.stars).toBe(0);
    });

    it('returns existing progress', () => {
      updateCheckpoint('test-lesson', 'cp-1', true);
      
      const progress = getLessonProgress('test-lesson');
      
      expect(progress.checkpoints['cp-1'].completed).toBe(true);
    });
  });

  describe('updateCheckpoint', () => {
    it('marks checkpoint as completed', () => {
      updateCheckpoint('test-lesson', 'cp-1', true);
      
      expect(isCheckpointCompleted('test-lesson', 'cp-1')).toBe(true);
    });

    it('marks checkpoint as incomplete', () => {
      updateCheckpoint('test-lesson', 'cp-1', true);
      updateCheckpoint('test-lesson', 'cp-1', false);
      
      expect(isCheckpointCompleted('test-lesson', 'cp-1')).toBe(false);
    });

    it('sets completedAt timestamp when completing', () => {
      updateCheckpoint('test-lesson', 'cp-1', true);
      
      const progress = getLessonProgress('test-lesson');
      
      expect(progress.checkpoints['cp-1'].completedAt).toBeDefined();
    });
  });

  describe('toggleSaved', () => {
    it('saves a lesson', () => {
      const saved = toggleSaved('test-lesson');
      
      expect(saved).toBe(true);
      expect(getLessonProgress('test-lesson').saved).toBe(true);
    });

    it('unsaves a lesson', () => {
      toggleSaved('test-lesson'); // save
      const saved = toggleSaved('test-lesson'); // unsave
      
      expect(saved).toBe(false);
      expect(getLessonProgress('test-lesson').saved).toBe(false);
    });
  });

  describe('setStars', () => {
    it('sets star rating', () => {
      setStars('test-lesson', 4);
      
      expect(getLessonProgress('test-lesson').stars).toBe(4);
    });

    it('clamps stars to 0-5 range', () => {
      setStars('test-lesson', 10);
      expect(getLessonProgress('test-lesson').stars).toBe(5);
      
      setStars('test-lesson', -2);
      expect(getLessonProgress('test-lesson').stars).toBe(0);
    });
  });

  describe('getSavedLessons', () => {
    it('returns empty array when no lessons saved', () => {
      expect(getSavedLessons()).toEqual([]);
    });

    it('returns saved lesson keys', () => {
      toggleSaved('lesson-1');
      toggleSaved('lesson-2');
      
      const saved = getSavedLessons();
      
      expect(saved).toContain('lesson-1');
      expect(saved).toContain('lesson-2');
    });
  });

  describe('getProgressPercentage', () => {
    it('returns 0 for no checkpoints', () => {
      expect(getProgressPercentage('test-lesson', 0)).toBe(0);
    });

    it('calculates correct percentage', () => {
      updateCheckpoint('test-lesson', 'cp-1', true);
      updateCheckpoint('test-lesson', 'cp-2', true);
      
      expect(getProgressPercentage('test-lesson', 4)).toBe(50);
    });

    it('returns 100 when all completed', () => {
      updateCheckpoint('test-lesson', 'cp-1', true);
      updateCheckpoint('test-lesson', 'cp-2', true);
      
      expect(getProgressPercentage('test-lesson', 2)).toBe(100);
    });
  });

  describe('resetLessonProgress', () => {
    it('resets progress for a lesson', () => {
      updateCheckpoint('test-lesson', 'cp-1', true);
      setStars('test-lesson', 5);
      toggleSaved('test-lesson');
      
      resetLessonProgress('test-lesson');
      
      const progress = getLessonProgress('test-lesson');
      expect(progress.checkpoints).toEqual({});
      expect(progress.stars).toBe(0);
      expect(progress.saved).toBe(false);
    });
  });
});
