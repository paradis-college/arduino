/**
 * MDX Client
 * Helper functions to load and render MDX content
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
 * Dynamically import an MDX file
 * TODO: Consider pre-loading all MDX at build time for better performance
 */
export async function loadMDX(slug: string, language: Language): Promise<MDXModule | null> {
  const cacheKey = `${language}/${slug}`;
  
  if (mdxCache.has(cacheKey)) {
    return mdxCache.get(cacheKey)!;
  }

  try {
    // Dynamic import based on language and slug
    // Vite will handle code-splitting automatically
    const modules: Record<string, () => Promise<MDXModule>> = {
      'ro/basics-blink': () => import('@/content/lessons/ro/basics-blink.mdx'),
      'ro/pwm-led': () => import('@/content/lessons/ro/pwm-led.mdx'),
      'en/basics-blink': () => import('@/content/lessons/en/basics-blink.mdx'),
      'en/pwm-led': () => import('@/content/lessons/en/pwm-led.mdx'),
    };

    const loader = modules[cacheKey];
    if (!loader) {
      console.error(`MDX module not found: ${cacheKey}`);
      return null;
    }

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
