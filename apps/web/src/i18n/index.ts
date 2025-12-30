/**
 * Internationalization (i18n) module
 * Simple JSON-based translation system
 */

import { createContext, useContext } from 'react';
import type { Language } from '@/lib/types';
import roTranslations from './ro.json';
import enTranslations from './en.json';

/** Translation dictionaries */
export const translations: Record<Language, typeof roTranslations> = {
  ro: roTranslations,
  en: enTranslations,
};

/** Get nested translation value by dot-notation key */
export function getTranslation(
  language: Language,
  key: string
): string {
  const keys = key.split('.');
  let value: unknown = translations[language];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      // Fallback to key if translation not found
      console.warn(`Translation not found: ${key} for language: ${language}`);
      return key;
    }
  }

  return typeof value === 'string' ? value : key;
}

/** Language context interface */
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

/** Language context */
export const LanguageContext = createContext<LanguageContextType>({
  language: 'ro',
  setLanguage: () => {},
  t: (key) => key,
});

/** Hook to access language context */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

/** Helper to get browser's preferred language */
export function getBrowserLanguage(): Language {
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('ro')) {
    return 'ro';
  }
  return 'en';
}

/** Validate if a string is a valid language */
export function isValidLanguage(lang: string): lang is Language {
  return lang === 'ro' || lang === 'en';
}

export default translations;
