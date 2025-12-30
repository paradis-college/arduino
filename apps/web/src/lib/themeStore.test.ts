import { describe, it, expect, beforeEach } from 'vitest';
import {
  getInitialTheme,
  saveTheme,
  applyTheme,
  toggleTheme,
} from '@/lib/themeStore';

describe('themeStore', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('theme-light', 'theme-dark');
  });

  describe('getInitialTheme', () => {
    it('returns stored theme from localStorage', () => {
      localStorage.setItem('arduino-theme', 'dark');

      expect(getInitialTheme()).toBe('dark');
    });

    it('returns light as default when no preference', () => {
      expect(getInitialTheme()).toBe('light');
    });
  });

  describe('saveTheme', () => {
    it('saves theme to localStorage', () => {
      saveTheme('dark');

      expect(localStorage.getItem('arduino-theme')).toBe('dark');
    });
  });

  describe('applyTheme', () => {
    it('applies light theme class', () => {
      applyTheme('light');

      expect(document.documentElement.classList.contains('theme-light')).toBe(true);
      expect(document.documentElement.classList.contains('theme-dark')).toBe(false);
    });

    it('applies dark theme class', () => {
      applyTheme('dark');

      expect(document.documentElement.classList.contains('theme-dark')).toBe(true);
      expect(document.documentElement.classList.contains('theme-light')).toBe(false);
    });

    it('removes old theme class when switching', () => {
      applyTheme('dark');
      applyTheme('light');

      expect(document.documentElement.classList.contains('theme-light')).toBe(true);
      expect(document.documentElement.classList.contains('theme-dark')).toBe(false);
    });
  });

  describe('toggleTheme', () => {
    it('toggles from light to dark', () => {
      expect(toggleTheme('light')).toBe('dark');
    });

    it('toggles from dark to light', () => {
      expect(toggleTheme('dark')).toBe('light');
    });
  });
});
