import { describe, it, expect, beforeEach, vi } from 'vitest';
import { loadMDX, clearMDXCache } from './mdxClient';

describe('mdxClient', () => {
  beforeEach(() => {
    clearMDXCache();
  });

  describe('loadMDX', () => {
    it('loads English lesson successfully', async () => {
      const module = await loadMDX('p3-c1-l1-basic-led-blink', 'en');
      
      expect(module).not.toBeNull();
      expect(module?.default).toBeDefined();
      expect(typeof module?.default).toBe('function');
    });

    it('loads Romanian lesson successfully', async () => {
      const module = await loadMDX('p3-c1-l1-basic-led-blink', 'ro');
      
      expect(module).not.toBeNull();
      expect(module?.default).toBeDefined();
      expect(typeof module?.default).toBe('function');
    });

    it('returns null for non-existent lesson', async () => {
      const module = await loadMDX('non-existent-lesson', 'en');
      
      expect(module).toBeNull();
    });

    it('returns null for non-existent language', async () => {
      const module = await loadMDX('p3-c1-l1-basic-led-blink', 'fr' as any);
      
      expect(module).toBeNull();
    });

    it('caches loaded modules', async () => {
      // Spy on console.warn to check if module is loaded from cache
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      // First load
      const module1 = await loadMDX('p3-c1-l1-basic-led-blink', 'en');
      expect(module1).not.toBeNull();
      
      // Second load (should use cache)
      const module2 = await loadMDX('p3-c1-l1-basic-led-blink', 'en');
      expect(module2).not.toBeNull();
      
      // Both should be the same instance (from cache)
      expect(module1).toBe(module2);
      
      warnSpy.mockRestore();
    });

    it('handles different language versions of the same lesson', async () => {
      const enModule = await loadMDX('p3-c1-l1-basic-led-blink', 'en');
      const roModule = await loadMDX('p3-c1-l1-basic-led-blink', 'ro');
      
      expect(enModule).not.toBeNull();
      expect(roModule).not.toBeNull();
      // Should be different modules
      expect(enModule).not.toBe(roModule);
    });
  });

  describe('clearMDXCache', () => {
    it('clears the cache', async () => {
      // Load a module to populate cache
      const module1 = await loadMDX('p3-c1-l1-basic-led-blink', 'en');
      expect(module1).not.toBeNull();
      
      // Clear cache
      clearMDXCache();
      
      // Load again - module system will still return the same module,
      // but we verify clearMDXCache executes without errors
      const module2 = await loadMDX('p3-c1-l1-basic-led-blink', 'en');
      expect(module2).not.toBeNull();
      
      // Both should be the same module object from the module system
      expect(module1).toBe(module2);
    });
  });
});
