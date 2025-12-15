# Build Scripts

## generateLessonsManifest.ts

Auto-generates `src/lib/generated/lessonsManifest.ts` from MDX lesson frontmatter.

### Prerequisites

This script **must** be run before:
- `npm run dev` - automatically runs via npm script
- `npm run build` - automatically runs via npm script  
- `npm run lint` - automatically runs via npm script
- Any TypeScript compilation (`tsc`)

The generated manifest file is imported by `src/lib/lessonsManifest.ts`. Without it, TypeScript compilation will fail.

### Usage

```bash
npm run generate:manifest
```

### Validation

The script validates all required frontmatter fields:
- `id` - Unique lesson identifier (must include `-en` or `-ro` suffix)
- `title` - Lesson title
- `course` - Course identifier
- `difficulty` - Must be "beginner", "intermediate", or "advanced"
- `tags` - Non-empty array of strings
- `estimatedMinutes` - Number greater than 0
- `hasInteractiveExercises` - Boolean

Optional fields are also validated when present:
- `order` - Must be a number
- `tinkercadUrl` - Must be a valid URL
- `youtubeUrl` - Must be a valid URL
- `keyPoints` - Array of objects with required `title` (string) and optional `description` (string)

### Duplicate Detection

The script detects:
- Duplicate lesson IDs across all languages
- Duplicate slugs (filenames) within the same language

### Adding a New Lesson

1. Create an MDX file in `src/content/lessons/{lang}/` with valid frontmatter
2. Run `npm run dev` or `npm run build`
3. The manifest is automatically regenerated

Example frontmatter:
```yaml
---
id: p3-c1-l6-new-lesson-en
title: "My New Lesson"
course: "embedded-programming-basics"
difficulty: "beginner"
tags: ["LED", "basic"]
estimatedMinutes: 20
hasInteractiveExercises: true
---
```

### Error Messages

The script provides clear error messages for validation failures:

```
❌ VALIDATION ERROR in .../lesson.mdx:
   Missing required frontmatter fields: course
   Required fields: id, title, course, difficulty, tags, estimatedMinutes, hasInteractiveExercises
```

```
❌ DUPLICATE ID ERROR: Lesson ID 'p3-c1-l1-basic-led-blink' is already used.
   Each lesson must have a unique ID.
```
