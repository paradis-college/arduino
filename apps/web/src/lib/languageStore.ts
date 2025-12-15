/**
 * Language Store
 * Manages language preferences using localStorage
 *
 * Language detection priority:
 * 1. User's explicit choice (stored in localStorage with user-set flag)
 * 2. IP-based geolocation (if user is from Romania, default to Romanian)
 * 3. Browser/OS language preference
 * 4. Default to Romanian (since most users are likely Romanian)
 */

import type { Language } from './types';
import { getBrowserLanguage, isValidLanguage } from '@/i18n';

const LANGUAGE_STORAGE_KEY = 'arduino-language';
const LANGUAGE_USER_SET_KEY = 'arduino-language-user-set';
const LANGUAGE_DETECTED_KEY = 'arduino-language-detected';

/**
 * Check if user's browser/OS language indicates Romanian
 */
export function isBrowserLanguageRomanian(): boolean {
  if (typeof navigator === 'undefined') return false;

  // Check navigator.language (primary language)
  const primaryLang = navigator.language?.toLowerCase() || '';
  if (primaryLang.startsWith('ro')) return true;

  // Check navigator.languages (all preferred languages)
  const languages = navigator.languages || [];
  for (const lang of languages) {
    if (lang.toLowerCase().startsWith('ro')) return true;
  }

  return false;
}

/**
 * Detect language from IP address using a geolocation API
 * Returns a promise that resolves to 'ro' if user is from Romania, 'en' otherwise
 * Falls back to null if detection fails
 */
export async function detectLanguageFromIP(): Promise<Language | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

  try {
    // Use a free IP geolocation API to detect country
    const response = await fetch('https://ipapi.co/json/', {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) return null;

    const data = await response.json();

    // Validate response structure
    if (!data || typeof data !== 'object') return null;

    const countryCode = typeof data.country_code === 'string'
      ? data.country_code.toUpperCase()
      : null;

    if (!countryCode) return null;

    // If user is from Romania, return 'ro'
    if (countryCode === 'RO') {
      return 'ro';
    }

    return 'en';
  } catch {
    clearTimeout(timeoutId);
    // If geolocation fails (network error, timeout, etc.), return null
    return null;
  }
}

/**
 * Get the initial language synchronously
 * This is used for initial render - async detection happens afterward
 *
 * Priority:
 * 1. User's explicit choice (stored with user-set flag)
 * 2. Previously detected language from IP
 * 3. Browser language preference
 * 4. Default to 'ro'
 */
export function getInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    // Check if user has explicitly set a language preference
    const userSet = localStorage.getItem(LANGUAGE_USER_SET_KEY);
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);

    if (userSet === 'true' && stored && isValidLanguage(stored)) {
      // User has explicitly chosen a language - respect that choice
      return stored;
    }

    // Check if we've previously detected language from IP
    const detected = localStorage.getItem(LANGUAGE_DETECTED_KEY);
    if (detected && isValidLanguage(detected)) {
      return detected;
    }

    // Fall back to browser language detection
    return getBrowserLanguage();
  }

  return 'ro';
}

/**
 * Initialize language detection from IP
 * This runs asynchronously after initial render
 * Only runs once for first-time visitors (no stored preference)
 *
 * Returns the detected language, or null if detection was skipped
 */
export async function initializeLanguageFromIP(): Promise<Language | null> {
  if (typeof window === 'undefined') return null;

  // If user has explicitly set a language, don't override it
  const userSet = localStorage.getItem(LANGUAGE_USER_SET_KEY);
  if (userSet === 'true') {
    return null;
  }

  // If we've already detected language from IP, don't detect again
  const detected = localStorage.getItem(LANGUAGE_DETECTED_KEY);
  if (detected && isValidLanguage(detected)) {
    return null;
  }

  // Check browser language first - if Romanian, no need for IP detection
  if (isBrowserLanguageRomanian()) {
    localStorage.setItem(LANGUAGE_DETECTED_KEY, 'ro');
    localStorage.setItem(LANGUAGE_STORAGE_KEY, 'ro');
    return 'ro';
  }

  // Try IP-based detection
  const ipLanguage = await detectLanguageFromIP();

  if (ipLanguage) {
    localStorage.setItem(LANGUAGE_DETECTED_KEY, ipLanguage);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, ipLanguage);
    return ipLanguage;
  }

  // If IP detection fails, default to Romanian (since most users are likely Romanian)
  localStorage.setItem(LANGUAGE_DETECTED_KEY, 'ro');
  localStorage.setItem(LANGUAGE_STORAGE_KEY, 'ro');
  return 'ro';
}

/**
 * Save language preference to localStorage
 * Marks this as a user-set preference (intentional change)
 */
export function saveLanguage(language: Language): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    // Mark that user has explicitly set a language preference
    localStorage.setItem(LANGUAGE_USER_SET_KEY, 'true');
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

/**
 * Check if user has explicitly set a language preference
 */
export function hasUserSetLanguage(): boolean {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(LANGUAGE_USER_SET_KEY) === 'true';
  }
  return false;
}

/**
 * Clear all language preferences (useful for testing)
 */
export function clearLanguagePreferences(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(LANGUAGE_STORAGE_KEY);
    localStorage.removeItem(LANGUAGE_USER_SET_KEY);
    localStorage.removeItem(LANGUAGE_DETECTED_KEY);
  }
}
