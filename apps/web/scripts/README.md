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

Validates content structure and ensures data integrity between MDX files, courses, and paths.

### Purpose

This script provides comprehensive content validation that:
1. Verifies all MDX files have valid frontmatter by regenerating the manifest (using `generateLessonsManifest.ts`)
2. Ensures manifest entries correspond to real MDX files
3. Detects orphaned MDX files not included in the manifest
4. **Validates domain relationships (lesson → course → path)**
5. **Detects duplicate IDs and slugs across all content**
6. **Reports translation coverage (warnings only)**
7. Runs in CI to catch content issues before deployment

### Usage

```bash
npm run validate:content
```

This command:
1. Regenerates the manifest (running all frontmatter validations)
2. Validates manifest-to-file correspondence
3. **Validates domain relationships**
4. **Checks for duplicates**
5. **Reports translation coverage**
6. Exits with code 1 if any validation fails

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

#### 4. Domain Relationship Validation (NEW)
Validates the hierarchy: **Lesson → Course → Path**

**Lesson → Course:**
- Every lesson's `course` field must reference a valid course in `coursesManifest`
- Detects orphaned lessons:
```
❌ ORPHANED LESSON: Lesson 'p3-c1-l1-basic-led-blink-en' (en) references non-existent course 'invalid-course'
   File: /path/to/src/content/lessons/en/p3-c1-l1-basic-led-blink.mdx
   Fix: Update the 'course' field in frontmatter to a valid course ID
```

**Course → Path:**
- Every course's `pathId` field must reference a valid path in `pathsManifest`
- Detects orphaned courses:
```
❌ ORPHANED COURSE: Course 'embedded-programming-basics' references non-existent path 'invalid-path'
   File: src/lib/lessonsManifest.ts
   Fix: Update the 'pathId' field to a valid path ID or remove it
```

#### 5. Duplicate Detection (NEW)
Checks for duplicate IDs and slugs:

**Lesson Duplicates:**
```
❌ DUPLICATE LESSON ID: 'p3-c1-l1-basic-led-blink-en' is used by multiple lessons:
   1. /path/to/lesson1.mdx
   2. /path/to/lesson2.mdx
   Fix: Each lesson must have a unique 'id' field in frontmatter

❌ DUPLICATE LESSON SLUG: Slug 'basic-led-blink' is used by multiple lessons in language 'en':
   1. /path/to/lesson1.mdx
   2. /path/to/lesson2.mdx
   Fix: Each lesson within a language must have a unique slug (filename)
```

**Course Duplicates:**
```
❌ DUPLICATE COURSE ID: 'embedded-programming-basics' is defined multiple times in coursesManifest
   File: src/lib/lessonsManifest.ts
   Fix: Each course must have a unique 'id' field

❌ DUPLICATE COURSE SLUG: 'embedded-programming-basics' is used by multiple courses
   File: src/lib/lessonsManifest.ts
   Fix: Each course must have a unique 'slug' field
```

**Path Duplicates:**
```
❌ DUPLICATE PATH ID: 'arduino-basics' is defined multiple times in pathsManifest
   File: src/lib/pathsManifest.ts
   Fix: Each path must have a unique 'id' field

❌ DUPLICATE PATH SLUG: 'arduino-basics' is used by multiple paths
   File: src/lib/pathsManifest.ts
   Fix: Each path must have a unique 'slug' field
```

#### 6. Translation Coverage (NEW - Warnings Only)
Reports lessons missing translations without failing CI:

```
⚠️  Translation Coverage Warnings:

   ⚠️  Lesson 'p1-c1-l1-leds-resistors' is only available in [en], missing translations: [ro]
   ⚠️  Lesson 'p1-c1-l2-buttons-switches' is only available in [en], missing translations: [ro]

📊 Translation Coverage:
   - Total unique lessons: 46
   - Fully translated: 5/46 (10.9%)
   - Missing translations: 41
```

### CI Integration

This validation runs automatically in GitHub Actions on:
- Push to `main` branch (when content, scripts, or manifests change)
- Pull requests to `main` branch (when content, scripts, or manifests change)

Triggers on changes to:
- MDX content files (`apps/web/src/content/**/*.mdx`)
- Validation scripts (`apps/web/scripts/**`)
- **Manifest files (`apps/web/src/lib/lessonsManifest.ts`, `apps/web/src/lib/pathsManifest.ts`)** (NEW)
- Workflow file (`.github/workflows/validate-content.yml`)

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
   - Domain relationships validated
   - No duplicates found
   - All checks passed ✅
```

### Testing

Tests for validation functions are in `src/lib/contentValidation.test.ts`.

Run tests:
```bash
npm test
```
