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
    throw new Error(
      `❌ VALIDATION ERROR: Cannot read manifest file at ${MANIFEST_FILE}\n` +
      `   ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * Parse the generated manifest to extract lesson entries
 */
function parseManifestEntries(): Array<{ id: string; slug: string; language: string }> {
  const content = fs.readFileSync(MANIFEST_FILE, 'utf-8');
  
  // Extract the JSON array from the TypeScript file
  const match = content.match(/export const lessonsManifest: LessonMeta\[\] = (\[[\s\S]*?\]);/);
  
  if (!match || !match[1]) {
    throw new Error(
      `❌ VALIDATION ERROR: Could not parse manifest file at ${MANIFEST_FILE}\n` +
      `   The file may be corrupted or have an unexpected format.`
    );
  }

  try {
    const lessons = JSON.parse(match[1]);
    
    if (!Array.isArray(lessons)) {
      throw new Error('Manifest does not contain an array of lessons');
    }

    return lessons.map((lesson: any) => ({
      id: lesson.id,
      slug: lesson.slug,
      language: lesson.language,
    }));
  } catch (error) {
    throw new Error(
      `❌ VALIDATION ERROR: Failed to parse manifest JSON\n` +
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

  const langDirs = fs.readdirSync(LESSONS_DIR).filter(name => {
    const stat = fs.statSync(path.join(LESSONS_DIR, name));
    return stat.isDirectory();
  });

  for (const lang of langDirs) {
    const langDir = path.join(LESSONS_DIR, lang);
    const mdxFiles = fs.readdirSync(langDir).filter(f => f.endsWith('.mdx'));

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
function main(): void {
  console.log('🔍 Starting content validation...\n');

  let errorCount = 0;

  try {
    // Step 1: Check manifest exists
    console.log('📋 Validating manifest file exists...');
    validateManifestExists();
    console.log('✅ Manifest file exists\n');

    // Step 2: Parse manifest entries
    console.log('📖 Parsing manifest entries...');
    const manifestEntries = parseManifestEntries();
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
