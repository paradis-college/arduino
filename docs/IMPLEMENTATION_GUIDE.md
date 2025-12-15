# Implementation Guide: Critical Architecture Fixes

This document provides a quickstart guide for implementing the critical fixes identified in the Architecture Review.

---

## Overview

The Architecture Review identified 5 critical issues that must be fixed before backend integration:

1. ✅ Auto-generate lesson manifest
2. ✅ Dynamic MDX loading  
3. ✅ API abstraction layer
4. ✅ Fix TypeScript build
5. ✅ Fix theme bug

**Estimated Time:** 1.5-2 days for all fixes

---

## Priority 1: Fix TypeScript Build (1 hour)

### Problem
Build fails: `Cannot find type definition file for 'vitest/globals'`

### Solution

Create `apps/web/tsconfig.test.json`:
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src/**/*.test.ts", "src/**/*.test.tsx"]
}
```

Update `apps/web/tsconfig.json` - remove this line:
```json
"types": ["vitest/globals"]  // DELETE THIS
```

Update `package.json`:
```json
{
  "scripts": {
    "lint": "tsc --noEmit",
    "lint:test": "tsc --noEmit --project tsconfig.test.json"
  }
}
```

Test:
```bash
npm run lint
npm run build
```

---

## Priority 2: Dynamic MDX Loading (2 hours)

### Problem
103 hard-coded import statements in `mdxClient.ts`

### Solution

Replace the entire `modules` object in `apps/web/src/lib/mdxClient.ts`:

```typescript
/**
 * Dynamically import all MDX files using Vite's import.meta.glob
 * Vite will handle code-splitting automatically
 */
const mdxModules = import.meta.glob<MDXModule>(
  '/src/content/lessons/**/*.mdx',
  { eager: false }  // Lazy load for better performance
);

/**
 * Load an MDX file by slug and language
 */
export async function loadMDX(slug: string, language: Language): Promise<MDXModule | null> {
  const cacheKey = `${language}/${slug}`;
  
  if (mdxCache.has(cacheKey)) {
    return mdxCache.get(cacheKey)!;
  }

  try {
    const modulePath = `/src/content/lessons/${language}/${slug}.mdx`;
    const loader = mdxModules[modulePath];
    
    if (!loader) {
      console.error(`MDX module not found: ${modulePath}`);
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
```

Add helper for debugging:
```typescript
/**
 * Get list of all available MDX files
 */
export function getAvailableMDXFiles(): string[] {
  return Object.keys(mdxModules).map(path => 
    path.replace('/src/content/lessons/', '').replace('.mdx', '')
  );
}
```

Test:
```bash
npm run dev
# Navigate to a lesson page
# Check browser console for any errors
```

---

## Priority 3: API Abstraction Layer (4 hours)

### Problem
Components directly import data functions, making backend migration difficult.

### Solution

#### Step 1: Create API Client (30 min)

Create `apps/web/src/api/client.ts`:

```typescript
const config = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
};

async function apiFetch<T>(endpoint: string, options?: RequestInit) {
  const url = `${config.baseUrl}${endpoint}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (err: any) {
    clearTimeout(timeoutId);
    console.error('API Error:', err);
    throw err;
  }
}

export const api = {
  get: <T>(endpoint: string) => apiFetch<T>(endpoint, { method: 'GET' }),
  post: <T>(endpoint: string, body: unknown) =>
    apiFetch<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }),
};
```

#### Step 2: Create Lessons API Service (30 min)

Create `apps/web/src/api/lessons.ts`:

```typescript
import type { LessonMeta, Language } from '@/lib/types';
import { api } from './client';
import { 
  getLesson as getLocalLesson,
  getLessonsByCourse as getLocalLessonsByCourse 
} from '@/lib/lessonsManifest';

const USE_API = import.meta.env.VITE_USE_API === 'true';

export async function fetchLesson(
  slug: string,
  language: Language
): Promise<LessonMeta | null> {
  if (!USE_API) {
    return getLocalLesson(slug, language) || null;
  }
  
  try {
    return await api.get<LessonMeta>(`/lessons/${slug}?lang=${language}`);
  } catch (error) {
    console.error('Failed to fetch lesson:', error);
    return null;
  }
}

export async function fetchLessonsByCourse(
  courseId: string,
  language: Language
): Promise<LessonMeta[]> {
  if (!USE_API) {
    return getLocalLessonsByCourse(courseId, language);
  }
  
  try {
    return await api.get<LessonMeta[]>(`/courses/${courseId}/lessons?lang=${language}`);
  } catch (error) {
    console.error('Failed to fetch lessons:', error);
    return [];
  }
}
```

#### Step 3: Optional - Add React Query (2 hours)

Install:
```bash
npm install @tanstack/react-query
```

Create hooks:
```typescript
// apps/web/src/api/hooks/useLessons.ts
import { useQuery } from '@tanstack/react-query';
import { fetchLesson } from '../lessons';
import type { Language } from '@/lib/types';

export function useLesson(slug: string, language: Language) {
  return useQuery({
    queryKey: ['lesson', slug, language],
    queryFn: () => fetchLesson(slug, language),
    staleTime: 5 * 60 * 1000,
  });
}
```

Update App.tsx:
```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* existing app */}
    </QueryClientProvider>
  );
}
```

---

## Priority 4: Fix Theme Bug (2-4 hours)

### Investigation

Run these commands to find problematic code:

```bash
cd apps/web/src

# Find hardcoded colors
grep -r "text-slate-" components/ routes/
grep -r "text-gray-" components/ routes/
grep -r "bg-white\b" components/ routes/

# Find gradients
grep -r "from-primary" components/ routes/
```

### Common Issues and Fixes

**Issue 1: Gradients with poor contrast**

Before:
```tsx
<div className="bg-gradient-to-r from-primary/10 to-secondary/10">
  <h1 className="text-text">Title</h1>
</div>
```

After:
```tsx
<div className="bg-gradient-to-r from-primary/10 to-secondary/10">
  <div className="bg-surface/90 backdrop-blur-sm rounded-lg p-4">
    <h1 className="text-text">Title</h1>
  </div>
</div>
```

**Issue 2: Hardcoded Tailwind colors**

Before:
```tsx
<span className="text-gray-600">Secondary text</span>
```

After:
```tsx
<span className="text-text-secondary">Secondary text</span>
```

**Issue 3: SVG icons not inheriting theme**

Before:
```tsx
<svg fill="#000000">...</svg>
```

After:
```tsx
<svg fill="currentColor" className="text-text">...</svg>
```

---

## Priority 5: Auto-Generate Manifest (Optional - 4 hours)

This is optional for Phase 1 but recommended for Phase 2.

### Simple Vite Plugin

Create `apps/web/plugins/generate-manifest.ts`:

```typescript
import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function generateManifestPlugin(): Plugin {
  return {
    name: 'generate-lesson-manifest',
    buildStart() {
      const lessonsDir = path.resolve(__dirname, '../src/content/lessons');
      const lessons: any[] = [];
      
      ['en', 'ro'].forEach(lang => {
        const langDir = path.join(lessonsDir, lang);
        if (!fs.existsSync(langDir)) return;
        
        fs.readdirSync(langDir)
          .filter(f => f.endsWith('.mdx'))
          .forEach(file => {
            const content = fs.readFileSync(path.join(langDir, file), 'utf-8');
            const { data } = matter(content);
            
            lessons.push({
              ...data,
              slug: file.replace('.mdx', ''),
              language: lang,
            });
          });
      });
      
      const outputPath = path.resolve(__dirname, '../src/lib/generated/lessonsManifest.ts');
      const outputDir = path.dirname(outputPath);
      
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      fs.writeFileSync(
        outputPath,
        `export const lessonsManifest = ${JSON.stringify(lessons, null, 2)};`
      );
      
      console.log(`✅ Generated manifest with ${lessons.length} lessons`);
    },
  };
}
```

Add to `vite.config.ts`:
```typescript
import { generateManifestPlugin } from './plugins/generate-manifest';

export default defineConfig({
  plugins: [
    generateManifestPlugin(),
    react(),
    mdx(),
  ],
});
```

---

## Testing All Fixes

### Quick Smoke Test

```bash
# 1. Build should pass
npm run build

# 2. TypeScript should pass
npm run lint

# 3. Dev server should start
npm run dev

# 4. Test in browser:
# - Navigate to a lesson
# - Toggle theme (light/dark)
# - Check console for errors
# - Verify text is readable in both modes
```

### Comprehensive Test

```bash
# Run all tests
npm test

# Check for build warnings
npm run build 2>&1 | grep -i warning

# Visual inspection:
# - Open app in browser
# - Test all routes
# - Toggle theme on each page
# - Check mobile responsive
```

---

## Deployment

### Before Deploying

- [ ] All tests pass
- [ ] Build succeeds
- [ ] No TypeScript errors
- [ ] Theme tested in both modes
- [ ] At least one lesson loads correctly
- [ ] Navigation works

### Environment Variables

Add to `.env`:
```
VITE_USE_API=false
VITE_API_BASE_URL=http://localhost:3000/api
```

For production:
```
VITE_USE_API=false  # Change to true when backend is ready
VITE_API_BASE_URL=https://api.arduino-learn.com
```

---

## Rollback Plan

If something breaks:

1. **TypeScript issues**: Revert tsconfig changes, move types back
2. **MDX loading**: Revert mdxClient.ts to hard-coded imports
3. **API layer**: Set `VITE_USE_API=false`
4. **Theme issues**: Revert specific component changes

---

## Next Steps

After these fixes are complete:

1. **Week 2-3**: Implement remaining quick wins
   - Course/path progress aggregation
   - Export/import progress UI
   - Better error handling

2. **Week 4-8**: Backend integration
   - Database schema
   - REST API
   - Content migration

3. **Week 9-12**: User features
   - Authentication
   - Project submissions
   - Social features

---

## Support

If you encounter issues:

1. Check console for errors
2. Review the full `ARCHITECTURE_REVIEW.md`
3. Search for similar patterns in existing code
4. Create an issue with error details

---

**Document Version:** 1.0  
**Last Updated:** December 15, 2025  
**Estimated Implementation Time:** 9-15 hours total
