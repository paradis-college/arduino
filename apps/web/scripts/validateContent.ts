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
import { fileURLToPath } from 'url';

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
    const manifestModule = await import(MANIFEST_FILE);
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
      `❌ VALIDATION ERROR: Failed to parse manifest\n` +
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

    // Success!
    console.log('✨ Content validation passed!\n');
    console.log('📊 Summary:');
    console.log(`   - ${mdxFiles.length} MDX files validated`);
    console.log(`   - ${manifestEntries.length} manifest entries validated`);
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
  main();
}

export {
  validateManifestExists,
  parseManifestEntries,
  validateManifestEntriesHaveFiles,
  getAllMdxFiles,
  validateAllFilesInManifest,
};
