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

## validateContent.ts

Validates content structure and ensures data integrity between MDX files and the generated manifest.

### Purpose

This script provides comprehensive content validation that:
1. Verifies all MDX files have valid frontmatter by regenerating the manifest (using `generateLessonsManifest.ts`)
2. Ensures manifest entries correspond to real MDX files
3. Detects orphaned MDX files not included in the manifest
4. Runs in CI to catch content issues before deployment

### Usage

```bash
npm run validate:content
```

This command:
1. Regenerates the manifest (running all frontmatter validations)
2. Validates manifest-to-file correspondence
3. Exits with code 1 if any validation fails

### Validation Checks

#### 1. Manifest File Exists
Ensures the generated manifest file is present and readable.

#### 2. Manifest Entries Have Files
Verifies each entry in the manifest has a corresponding MDX file:
```
❌ Manifest entry 'test-lesson-en' (en) references non-existent file:
   Expected: /path/to/src/content/lessons/en/test-lesson.mdx
```

#### 3. All Files in Manifest
Ensures no orphaned MDX files exist:
```
❌ MDX file exists but is not in manifest:
   File: /path/to/src/content/lessons/en/orphaned-lesson.mdx
   Language: en
   Slug: orphaned-lesson
```

### CI Integration

This validation runs automatically in GitHub Actions on:
- Push to `main` branch (when content or scripts change)
- Pull requests to `main` branch (when content or scripts change)

See `.github/workflows/validate-content.yml` for the CI configuration.

### Error Messages

All validation errors include:
- Clear description of the problem
- File paths and identifiers
- Suggested fixes

Example output on success:
```
✨ Content validation passed!

📊 Summary:
   - 51 MDX files validated
   - 51 manifest entries validated
   - All checks passed ✅
```
