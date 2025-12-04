import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getInitialLanguage,
  saveLanguage,
  getStoredLanguage,
  hasUserSetLanguage,
  clearLanguagePreferences,
  isBrowserLanguageRomanian,
  detectLanguageFromIP,
  initializeLanguageFromIP,
} from '@/lib/languageStore';

describe('languageStore', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  describe('getInitialLanguage', () => {
    it('returns stored language when user has explicitly set it', () => {
      localStorage.setItem('arduino-language', 'en');
      localStorage.setItem('arduino-language-user-set', 'true');
      
      expect(getInitialLanguage()).toBe('en');
    });

    it('returns detected language from previous IP detection', () => {
      localStorage.setItem('arduino-language-detected', 'ro');
      localStorage.setItem('arduino-language', 'ro');
      
      expect(getInitialLanguage()).toBe('ro');
    });

    it('returns browser language when no stored preference', () => {
      // Default mock returns 'en' for non-Romanian browser
      expect(getInitialLanguage()).toBe('en');
    });
  });

  describe('saveLanguage', () => {
    it('saves language to localStorage', () => {
      saveLanguage('ro');
      
      expect(localStorage.getItem('arduino-language')).toBe('ro');
    });

    it('marks language as user-set', () => {
      saveLanguage('en');
      
      expect(localStorage.getItem('arduino-language-user-set')).toBe('true');
    });
  });

  describe('getStoredLanguage', () => {
    it('returns null when no language stored', () => {
      expect(getStoredLanguage()).toBeNull();
    });

    it('returns stored language when present', () => {
      localStorage.setItem('arduino-language', 'ro');
      
      expect(getStoredLanguage()).toBe('ro');
    });

    it('returns null for invalid language', () => {
      localStorage.setItem('arduino-language', 'invalid');
      
      expect(getStoredLanguage()).toBeNull();
    });
  });

  describe('hasUserSetLanguage', () => {
    it('returns false when user has not set language', () => {
      expect(hasUserSetLanguage()).toBe(false);
    });

    it('returns true when user has set language', () => {
      localStorage.setItem('arduino-language-user-set', 'true');
      
      expect(hasUserSetLanguage()).toBe(true);
    });
  });

  describe('clearLanguagePreferences', () => {
    it('clears all language preferences', () => {
      localStorage.setItem('arduino-language', 'en');
      localStorage.setItem('arduino-language-user-set', 'true');
      localStorage.setItem('arduino-language-detected', 'ro');
      
      clearLanguagePreferences();
      
      expect(localStorage.getItem('arduino-language')).toBeNull();
      expect(localStorage.getItem('arduino-language-user-set')).toBeNull();
      expect(localStorage.getItem('arduino-language-detected')).toBeNull();
    });
  });

  describe('isBrowserLanguageRomanian', () => {
    it('returns false for non-Romanian browser (default mock)', () => {
      expect(isBrowserLanguageRomanian()).toBe(false);
    });
  });

  describe('detectLanguageFromIP', () => {
    it('returns ro when user is from Romania', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ country_code: 'RO' }),
      });
      
      const result = await detectLanguageFromIP();
      
      expect(result).toBe('ro');
    });

    it('returns en when user is not from Romania', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ country_code: 'US' }),
      });
      
      const result = await detectLanguageFromIP();
      
      expect(result).toBe('en');
    });

    it('returns null when API fails', async () => {
      globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
      
      const result = await detectLanguageFromIP();
      
      expect(result).toBeNull();
    });

    it('returns null when API returns non-ok response', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
      });
      
      const result = await detectLanguageFromIP();
      
      expect(result).toBeNull();
    });

    it('returns null when API returns malformed response', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(null),
      });
      
      const result = await detectLanguageFromIP();
      
      expect(result).toBeNull();
    });

    it('returns null when country_code is not a string', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ country_code: 123 }),
      });
      
      const result = await detectLanguageFromIP();
      
      expect(result).toBeNull();
    });
  });

  describe('initializeLanguageFromIP', () => {
    it('returns null when user has explicitly set language', async () => {
      localStorage.setItem('arduino-language-user-set', 'true');
      localStorage.setItem('arduino-language', 'en');
      
      const result = await initializeLanguageFromIP();
      
      expect(result).toBeNull();
    });

    it('returns null when language already detected', async () => {
      localStorage.setItem('arduino-language-detected', 'ro');
      
      const result = await initializeLanguageFromIP();
      
      expect(result).toBeNull();
    });

    it('returns ro and saves when IP detection returns Romania', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ country_code: 'RO' }),
      });
      
      const result = await initializeLanguageFromIP();
      
      expect(result).toBe('ro');
      expect(localStorage.getItem('arduino-language')).toBe('ro');
      expect(localStorage.getItem('arduino-language-detected')).toBe('ro');
    });

    it('returns en and saves when IP detection returns non-Romania', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ country_code: 'DE' }),
      });
      
      const result = await initializeLanguageFromIP();
      
      expect(result).toBe('en');
      expect(localStorage.getItem('arduino-language')).toBe('en');
      expect(localStorage.getItem('arduino-language-detected')).toBe('en');
    });

    it('defaults to ro when IP detection fails', async () => {
      globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
      
      const result = await initializeLanguageFromIP();
      
      expect(result).toBe('ro');
      expect(localStorage.getItem('arduino-language')).toBe('ro');
      expect(localStorage.getItem('arduino-language-detected')).toBe('ro');
    });
  });

  describe('user language preference persistence', () => {
    it('respects user choice over IP detection', async () => {
      // User explicitly sets language to English
      saveLanguage('en');
      
      // IP detection should be skipped
      const result = await initializeLanguageFromIP();
      
      expect(result).toBeNull();
      expect(getInitialLanguage()).toBe('en');
    });

    it('user can switch from auto-detected to different language', async () => {
      // First visit: auto-detect Romanian from IP
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ country_code: 'RO' }),
      });
      
      await initializeLanguageFromIP();
      expect(getInitialLanguage()).toBe('ro');
      
      // User intentionally switches to English
      saveLanguage('en');
      
      // Future visits should use English
      expect(getInitialLanguage()).toBe('en');
      expect(hasUserSetLanguage()).toBe(true);
    });
  });
});
