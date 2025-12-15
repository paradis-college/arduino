/**
 * MDX Client
 * Helper functions to load and render MDX content using dynamic imports
 */

import type { Language } from './types';
import type { ComponentType } from 'react';

/** MDX module type */
export interface MDXModule {
  default: ComponentType<{ components?: Record<string, ComponentType<unknown>> }>;
  frontmatter?: Record<string, unknown>;
}

/** MDX content cache */
const mdxCache = new Map<string, MDXModule>();

/**
 * Dynamically discover all MDX files using Vite's import.meta.glob
 * This creates a mapping of lesson paths to their lazy loaders
 * Using lazy loading (eager: false) for better code-splitting and initial load performance
 */
const mdxModules = import.meta.glob<MDXModule>(
  '/src/content/lessons/**/*.mdx',
  { eager: false }
);

/**
 * Dynamically import an MDX file
 * Uses import.meta.glob for automatic discovery - adding new MDX files requires zero code changes
 */
export async function loadMDX(slug: string, language: Language): Promise<MDXModule | null> {
  const cacheKey = `${language}/${slug}`;

  // Return cached module if available
  if (mdxCache.has(cacheKey)) {
    return mdxCache.get(cacheKey)!;
  }

  try {
    // Construct the expected file path
    const modulePath = `/src/content/lessons/${language}/${slug}.mdx`;

    // Get the loader function for this module
    const loader = mdxModules[modulePath];

    if (!loader) {
      // Friendly handling - lesson not found, return null instead of crashing
      // Only log in development to avoid production log noise
      if (import.meta.env.DEV) {
        console.warn(`MDX module not found: ${modulePath}`);
      }
      return null;
    }

    // Load and cache the module
    const module = await loader();
    mdxCache.set(cacheKey, module);
    return module;
  } catch (error) {
    console.error(`Failed to load MDX: ${cacheKey}`, error);
    return null;
  }
}

/**
 * Clear the MDX cache
 * Useful for hot reloading during development
 */
export function clearMDXCache(): void {
  mdxCache.clear();
}
