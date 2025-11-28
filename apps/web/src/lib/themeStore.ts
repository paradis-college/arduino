/**
 * Theme Store
 * Manages light/dark theme preferences using localStorage
 */

import type { Theme } from './types';

const THEME_STORAGE_KEY = 'arduino-theme';

/**
 * Get the initial theme based on:
 * 1. localStorage preference
 * 2. System preference (prefers-color-scheme)
 * 3. Default to 'light'
 */
export function getInitialTheme(): Theme {
  // Check localStorage first
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }

    // Check system preference
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }

  return 'light';
}

/**
 * Save theme preference to localStorage
 */
export function saveTheme(theme: Theme): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }
}

/**
 * Apply theme class to document element
 */
export function applyTheme(theme: Theme): void {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add(`theme-${theme}`);
  }
}

/**
 * Toggle between light and dark themes
 */
export function toggleTheme(currentTheme: Theme): Theme {
  return currentTheme === 'light' ? 'dark' : 'light';
}

/**
 * Listen for system theme changes
 */
export function onSystemThemeChange(callback: (theme: Theme) => void): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handler = (e: MediaQueryListEvent) => {
    // Only apply if user hasn't set a manual preference
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (!stored) {
      callback(e.matches ? 'dark' : 'light');
    }
  };

  mediaQuery.addEventListener('change', handler);
  return () => mediaQuery.removeEventListener('change', handler);
}
