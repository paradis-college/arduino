/**
 * Content Validation Script
 *
 * This script validates the content structure and ensures:
 * 1. All MDX files have valid frontmatter with required fields
 * 2. Generated manifest entries correspond to real MDX files
 * 3. All validations from generateLessonsManifest.ts pass
 *
 * This is intended to run in CI to catch content issues early.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LESSONS_DIR = path.join(__dirname, '../src/content/lessons');
const MANIFEST_FILE = path.join(__dirname, '../src/lib/generated/lessonsManifest.ts');

/**
 * Check if manifest file exists and is readable
 */
function validateManifestExists(): void {
  if (!fs.existsSync(MANIFEST_FILE)) {
    throw new Error(
      `❌ VALIDATION ERROR: Manifest file not found at ${MANIFEST_FILE}\n` +
      `   Run 'npm run generate:manifest' to create it.`
    );
  }

  try {
    fs.readFileSync(MANIFEST_FILE, 'utf-8');
  } catch (error) {
    const err = error as NodeJS.ErrnoException | Error | unknown;

    let detailMessage: string;

    if (err && typeof err === 'object' && 'code' in err && typeof (err as any).code === 'string') {
      const code = (err as any).code as string;
      const baseMessage =
        err instanceof Error && err.message ? err.message : `Filesystem error with code ${code}`;

      if (code === 'EACCES' || code === 'EPERM') {
        detailMessage =
          `${baseMessage}\n` +
          `   This appears to be a permission issue. Ensure the manifest file is readable by the current user.`;
      } else {
        detailMessage = baseMessage;
      }
    } else {
      detailMessage = err instanceof Error ? err.message : String(err);
    }

    throw new Error(
      `❌ VALIDATION ERROR: Cannot read manifest file at ${MANIFEST_FILE}\n` +
      `   ${detailMessage}`
    );
  }
}

/**
 * Parse the generated manifest to extract lesson entries
 * Uses dynamic import for more robust parsing instead of regex
 */
async function parseManifestEntries(): Promise<Array<{ id: string; slug: string; language: string }>> {
  try {
    // Use dynamic import to load the manifest module
    // Convert file path to file:// URL for proper cross-platform module resolution
    const manifestUrl = pathToFileURL(MANIFEST_FILE).href;
    const manifestModule = await import(manifestUrl);
    const lessons = manifestModule.lessonsManifest;

    if (!Array.isArray(lessons)) {
      throw new Error('Manifest does not contain an array of lessons');
    }

    // Validate and extract required fields with proper type checking
    return lessons.map((lesson: unknown) => {
      if (typeof lesson !== 'object' || lesson === null) {
        throw new Error('Lesson entry is not an object');
      }

      const lessonObj = lesson as Record<string, unknown>;

      if (typeof lessonObj.id !== 'string') {
        throw new Error('Lesson entry missing required string field: id');
      }
      if (typeof lessonObj.slug !== 'string') {
        throw new Error('Lesson entry missing required string field: slug');
      }
      if (typeof lessonObj.language !== 'string') {
        throw new Error('Lesson entry missing required string field: language');
      }

      return {
        id: lessonObj.id,
        slug: lessonObj.slug,
        language: lessonObj.language,
      };
    });
  } catch (error) {
    throw new Error(
      `❌ VALIDATION ERROR: Failed to load or parse manifest module\n` +
      `   ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * Validate that all manifest entries have corresponding MDX files
 */
function validateManifestEntriesHaveFiles(
  entries: Array<{ id: string; slug: string; language: string }>
): void {
  const errors: string[] = [];

  for (const entry of entries) {
    const expectedFile = path.join(LESSONS_DIR, entry.language, `${entry.slug}.mdx`);

    if (!fs.existsSync(expectedFile)) {
      errors.push(
        `❌ Manifest entry '${entry.id}' (${entry.language}) references non-existent file:\n` +
        `   Expected: ${expectedFile}`
      );
    }
  }

  if (errors.length > 0) {
    throw new Error(
      `❌ VALIDATION ERROR: Manifest contains entries without corresponding MDX files:\n\n` +
      errors.join('\n\n') +
      `\n\n💡 Fix: Either create the missing MDX files or regenerate the manifest with 'npm run generate:manifest'`
    );
  }
}

/**
 * Get all MDX files in the lessons directory
 */
function getAllMdxFiles(): Array<{ filepath: string; language: string; filename: string }> {
  const files: Array<{ filepath: string; language: string; filename: string }> = [];

  // Check if lessons directory exists
  if (!fs.existsSync(LESSONS_DIR)) {
    throw new Error(
      `❌ VALIDATION ERROR: Lessons directory not found\n` +
      `   Expected: ${LESSONS_DIR}\n` +
      `   💡 Fix: Ensure the content directory structure is correct`
    );
  }

  const langDirs = fs.readdirSync(LESSONS_DIR).filter(name => {
    const fullPath = path.join(LESSONS_DIR, name);
    try {
      const stat = fs.statSync(fullPath);
      return stat.isDirectory();
    } catch (error) {
      console.error(
        `⚠️ VALIDATION WARNING: Unable to stat path ${fullPath}\n` +
        `   ${error instanceof Error ? error.message : String(error)}`
      );
      return false;
    }
  });

  for (const lang of langDirs) {
    const langDir = path.join(LESSONS_DIR, lang);
    let mdxFiles: string[];
    try {
      mdxFiles = fs.readdirSync(langDir).filter(f => f.endsWith('.mdx'));
    } catch (error) {
      throw new Error(
        `❌ VALIDATION ERROR: Cannot read lessons directory for language '${lang}'\n` +
        `   Path: ${langDir}\n` +
        `   ${error instanceof Error ? error.message : String(error)}`
      );
    }

    for (const file of mdxFiles) {
      files.push({
        filepath: path.join(langDir, file),
        language: lang,
        filename: file,
      });
    }
  }

  return files;
}

/**
 * Validate that all MDX files are included in the manifest
 */
function validateAllFilesInManifest(
  mdxFiles: Array<{ filepath: string; language: string; filename: string }>,
  manifestEntries: Array<{ id: string; slug: string; language: string }>
): void {
  const manifestSlugs = new Set(
    manifestEntries.map(e => `${e.language}:${e.slug}`)
  );

  const errors: string[] = [];

  for (const file of mdxFiles) {
    const slug = path.basename(file.filename, '.mdx');
    const key = `${file.language}:${slug}`;

    if (!manifestSlugs.has(key)) {
      errors.push(
        `❌ MDX file exists but is not in manifest:\n` +
        `   File: ${file.filepath}\n` +
        `   Language: ${file.language}\n` +
        `   Slug: ${slug}`
      );
    }
  }

  if (errors.length > 0) {
    throw new Error(
      `❌ VALIDATION ERROR: Found MDX files that are not included in the manifest:\n\n` +
      errors.join('\n\n') +
      `\n\n💡 Fix: Run 'npm run generate:manifest' to regenerate the manifest, or check if the MDX files have invalid frontmatter.`
    );
  }
}

/**
 * Validate domain relationships: lesson → course, course → path
 */
function validateDomainRelationships(lessons: any[], courses: any[], paths: any[]): void {
  const errors: string[] = [];

  // Build sets of valid IDs for efficient lookup
  const validCourseIds = new Set(courses.map((c: any) => c.id));
  const validPathIds = new Set(paths.map((p: any) => p.id));

  // Validate lesson → course relationships
  for (const lesson of lessons) {
    if (!validCourseIds.has(lesson.course)) {
      errors.push(
        `❌ ORPHANED LESSON: Lesson '${lesson.id}' (${lesson.language}) references non-existent course '${lesson.course}'\n` +
        `   File: ${path.join(LESSONS_DIR, lesson.language, lesson.slug + '.mdx')}\n` +
        `   Fix: Update the 'course' field in frontmatter to a valid course ID`
      );
    }
  }

  // Validate course → path relationships
  for (const course of courses) {
    if (course.pathId && !validPathIds.has(course.pathId)) {
      errors.push(
        `❌ ORPHANED COURSE: Course '${course.id}' references non-existent path '${course.pathId}'\n` +
        `   File: src/lib/lessonsManifest.ts\n` +
        `   Fix: Update the 'pathId' field to a valid path ID or remove it`
      );
    }
  }

  if (errors.length > 0) {
    throw new Error(
      `❌ VALIDATION ERROR: Found ${errors.length} domain relationship issue(s):\n\n` +
      errors.join('\n\n') +
      `\n\n💡 Fix: Ensure all lessons reference valid courses and all courses reference valid paths.`
    );
  }
}

/**
 * Detect duplicate IDs and slugs
 */
function validateNoDuplicates(lessons: any[], courses: any[], paths: any[]): void {
  const errors: string[] = [];

  // Check for duplicate lesson IDs (already done in generateLessonsManifest.ts, but double-check)
  const seenLessonIds = new Map<string, string[]>();
  for (const lesson of lessons) {
    const lessonPath = path.join(LESSONS_DIR, lesson.language, lesson.slug + '.mdx');
    const existing = seenLessonIds.get(lesson.id);
    if (existing) {
      existing.push(lessonPath);
    } else {
      seenLessonIds.set(lesson.id, [lessonPath]);
    }
  }

  for (const [lessonId, lessonPaths] of seenLessonIds.entries()) {
    if (lessonPaths.length > 1) {
      const details = lessonPaths
        .map((p, index) => `   ${index + 1}. ${p}`)
        .join('\n');
      errors.push(
        `❌ DUPLICATE LESSON ID: '${lessonId}' is used by multiple lessons:\n` +
        `${details}\n` +
        `   Fix: Each lesson must have a unique 'id' field in frontmatter`
      );
    }
  }

  // Check for duplicate lesson slugs within the same language
  const seenLessonSlugs = new Map<string, string[]>();
  for (const lesson of lessons) {
    const key = `${lesson.language}:${lesson.slug}`;
    const lessonPath = path.join(LESSONS_DIR, lesson.language, lesson.slug + '.mdx');
    const existing = seenLessonSlugs.get(key);
    if (existing) {
      existing.push(lessonPath);
    } else {
      seenLessonSlugs.set(key, [lessonPath]);
    }
  }

  for (const [key, lessonPaths] of seenLessonSlugs.entries()) {
    if (lessonPaths.length > 1) {
      const [language, slug] = key.split(':', 2);
      const details = lessonPaths
        .map((p, index) => `   ${index + 1}. ${p}`)
        .join('\n');
      errors.push(
        `❌ DUPLICATE LESSON SLUG: Slug '${slug}' is used by multiple lessons in language '${language}':\n` +
        `${details}\n` +
        `   Fix: Each lesson within a language must have a unique slug (filename)`
      );
    }
  }

  // Check for duplicate course IDs
  const seenCourseIds = new Map<string, string[]>();
  for (const course of courses) {
    const existing = seenCourseIds.get(course.id);
    if (existing) {
      existing.push(course.slug);
    } else {
      seenCourseIds.set(course.id, [course.slug]);
    }
  }

  for (const [courseId, courseSlugs] of seenCourseIds.entries()) {
    if (courseSlugs.length > 1) {
      const details = courseSlugs
        .map((slug, index) => `   ${index + 1}. Course slug: ${slug}`)
        .join('\n');
      errors.push(
        `❌ DUPLICATE COURSE ID: '${courseId}' is defined multiple times in coursesManifest\n` +
        `${details}\n` +
        `   File: src/lib/lessonsManifest.ts\n` +
        `   Fix: Each course must have a unique 'id' field`
      );
    }
  }

  // Check for duplicate course slugs
  const seenCourseSlugs = new Map<string, string[]>();
  for (const course of courses) {
    const existing = seenCourseSlugs.get(course.slug);
    if (existing) {
      existing.push(course.id);
    } else {
      seenCourseSlugs.set(course.slug, [course.id]);
    }
  }

  for (const [courseSlug, courseIds] of seenCourseSlugs.entries()) {
    if (courseIds.length > 1) {
      const details = courseIds
        .map((id, index) => `   ${index + 1}. Course ID: ${id}`)
        .join('\n');
      errors.push(
        `❌ DUPLICATE COURSE SLUG: '${courseSlug}' is used by multiple courses:\n` +
        `${details}\n` +
        `   File: src/lib/lessonsManifest.ts\n` +
        `   Fix: Each course must have a unique 'slug' field`
      );
    }
  }

  // Check for duplicate path IDs
  const seenPathIds = new Map<string, string[]>();
  for (const pathItem of paths) {
    const existing = seenPathIds.get(pathItem.id);
    if (existing) {
      existing.push(pathItem.slug);
    } else {
      seenPathIds.set(pathItem.id, [pathItem.slug]);
    }
  }

  for (const [pathId, pathSlugs] of seenPathIds.entries()) {
    if (pathSlugs.length > 1) {
      const details = pathSlugs
        .map((slug, index) => `   ${index + 1}. Path slug: ${slug}`)
        .join('\n');
      errors.push(
        `❌ DUPLICATE PATH ID: '${pathId}' is defined multiple times in pathsManifest\n` +
        `${details}\n` +
        `   File: src/lib/pathsManifest.ts\n` +
        `   Fix: Each path must have a unique 'id' field`
      );
    }
  }

  // Check for duplicate path slugs
  const seenPathSlugs = new Map<string, string[]>();
  for (const pathItem of paths) {
    const existing = seenPathSlugs.get(pathItem.slug);
    if (existing) {
      existing.push(pathItem.id);
    } else {
      seenPathSlugs.set(pathItem.slug, [pathItem.id]);
    }
  }

  for (const [pathSlug, pathIds] of seenPathSlugs.entries()) {
    if (pathIds.length > 1) {
      const details = pathIds
        .map((id, index) => `   ${index + 1}. Path ID: ${id}`)
        .join('\n');
      errors.push(
        `❌ DUPLICATE PATH SLUG: '${pathSlug}' is used by multiple paths:\n` +
        `${details}\n` +
        `   File: src/lib/pathsManifest.ts\n` +
        `   Fix: Each path must have a unique 'slug' field`
      );
    }
  }

  if (errors.length > 0) {
    throw new Error(
      `❌ VALIDATION ERROR: Found ${errors.length} duplicate ID/slug issue(s):\n\n` +
      errors.join('\n\n')
    );
  }
}

/**
 * Check for missing translations and report warnings (non-fatal)
 */
function checkMissingTranslations(lessons: any[]): void {
  // Group lessons by slug
  const lessonsBySlug = new Map<string, Set<string>>();
  for (const lesson of lessons) {
    if (!lessonsBySlug.has(lesson.slug)) {
      lessonsBySlug.set(lesson.slug, new Set());
    }
    lessonsBySlug.get(lesson.slug)!.add(lesson.language);
  }

  const warnings: string[] = [];
  const supportedLanguages = ['en', 'ro'];

  // Check which lessons are missing translations
  for (const [slug, languages] of lessonsBySlug.entries()) {
    const missingLanguages = supportedLanguages.filter(lang => !languages.has(lang));
    if (missingLanguages.length > 0) {
      const availableLanguages = Array.from(languages).join(', ');
      warnings.push(
        `⚠️  Lesson '${slug}' is only available in [${availableLanguages}], missing translations: [${missingLanguages.join(', ')}]`
      );
    }
  }

  if (warnings.length > 0) {
    console.log('⚠️  Translation Coverage Warnings:\n');
    warnings.forEach(warning => console.log(`   ${warning}`));
    console.log();

    // Calculate and display translation coverage statistics
    const totalLessons = lessonsBySlug.size;
    const fullyTranslated = Array.from(lessonsBySlug.values()).filter(
      langs => langs.size === supportedLanguages.length
    ).length;
    const coverage = ((fullyTranslated / totalLessons) * 100).toFixed(1);

    console.log('📊 Translation Coverage:');
    console.log(`   - Total unique lessons: ${totalLessons}`);
    console.log(`   - Fully translated: ${fullyTranslated}/${totalLessons} (${coverage}%)`);
    console.log(`   - Missing translations: ${totalLessons - fullyTranslated}`);
    console.log();
  }
}

/**
 * Main validation function
 */
async function main(): Promise<void> {
  console.log('🔍 Starting content validation...\n');

  try {
    // Step 1: Check manifest exists
    console.log('📋 Validating manifest file exists...');
    validateManifestExists();
    console.log('✅ Manifest file exists\n');

    // Step 2: Parse manifest entries
    console.log('📖 Parsing manifest entries...');
    const manifestEntries = await parseManifestEntries();
    console.log(`✅ Found ${manifestEntries.length} entries in manifest\n`);

    // Step 3: Validate manifest entries have corresponding files
    console.log('🔗 Validating manifest entries have corresponding MDX files...');
    validateManifestEntriesHaveFiles(manifestEntries);
    console.log('✅ All manifest entries have corresponding MDX files\n');

    // Step 4: Get all MDX files
    console.log('📂 Scanning for MDX files...');
    const mdxFiles = getAllMdxFiles();
    console.log(`✅ Found ${mdxFiles.length} MDX files\n`);

    // Step 5: Validate all files are in manifest
    console.log('🔗 Validating all MDX files are in manifest...');
    validateAllFilesInManifest(mdxFiles, manifestEntries);
    console.log('✅ All MDX files are included in manifest\n');

    // Step 6: Load all manifests once for remaining validations
    console.log('📥 Loading manifests for validation...');
    const lessonsManifestUrl = pathToFileURL(MANIFEST_FILE).href;
    const manifestModule = await import(lessonsManifestUrl);
    const lessons = manifestModule.lessonsManifest;

    const lessonsManifestLibPath = path.join(__dirname, '../src/lib/lessonsManifest.ts');
    const lessonsManifestLibUrl = pathToFileURL(lessonsManifestLibPath).href;
    const lessonsManifestLibModule = await import(lessonsManifestLibUrl);
    const courses = lessonsManifestLibModule.coursesManifest;

    const pathsManifestPath = path.join(__dirname, '../src/lib/pathsManifest.ts');
    const pathsManifestUrl = pathToFileURL(pathsManifestPath).href;
    const pathsModule = await import(pathsManifestUrl);
    const paths = pathsModule.pathsManifest;
    console.log('✅ Manifests loaded\n');

    // Step 7: Validate domain relationships (lesson → course → path)
    console.log('🔗 Validating domain relationships (lesson → course → path)...');
    validateDomainRelationships(lessons, courses, paths);
    console.log('✅ All domain relationships are valid\n');

    // Step 8: Check for duplicate IDs and slugs
    console.log('🔍 Checking for duplicate IDs and slugs...');
    validateNoDuplicates(lessons, courses, paths);
    console.log('✅ No duplicate IDs or slugs found\n');

    // Step 9: Check for missing translations (warnings only)
    console.log('🌐 Checking translation coverage...');
    checkMissingTranslations(lessons);

    // Success!
    console.log('✨ Content validation passed!\n');
    console.log('📊 Summary:');
    console.log(`   - ${mdxFiles.length} MDX files validated`);
    console.log(`   - ${manifestEntries.length} manifest entries validated`);
    console.log(`   - Domain relationships validated`);
    console.log(`   - No duplicates found`);
    console.log(`   - All checks passed ✅\n`);

  } catch (error) {
    console.error('\n❌ CONTENT VALIDATION FAILED\n');

    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(String(error));
    }

    console.error('\n💡 Please fix the errors above and try again.\n');
    process.exit(1);
  }
}

// Run if executed directly
const isMainModule = process.argv[1] === fileURLToPath(import.meta.url);
if (isMainModule) {
  main().catch((error) => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
}

export {
  validateManifestExists,
  parseManifestEntries,
  validateManifestEntriesHaveFiles,
  getAllMdxFiles,
  validateAllFilesInManifest,
  validateDomainRelationships,
  validateNoDuplicates,
  checkMissingTranslations,
};
