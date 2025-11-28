/**
 * Language Store
 * Manages language preferences using localStorage
 */

import type { Language } from './types';
import { getBrowserLanguage, isValidLanguage } from '@/i18n';

const LANGUAGE_STORAGE_KEY = 'arduino-language';

/**
 * Get the initial language based on:
 * 1. localStorage preference
 * 2. Browser language
 * 3. Default to 'ro'
 */
export function getInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && isValidLanguage(stored)) {
      return stored;
    }

    return getBrowserLanguage();
  }

  return 'ro';
}

/**
 * Save language preference to localStorage
 */
export function saveLanguage(language: Language): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }
}

/**
 * Get language from localStorage
 */
export function getStoredLanguage(): Language | null {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && isValidLanguage(stored)) {
      return stored;
    }
  }
  return null;
}
