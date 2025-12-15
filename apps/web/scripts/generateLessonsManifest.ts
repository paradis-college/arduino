/**
 * Script to generate lessonsManifest.ts from MDX frontmatter
 * This runs at build time to create a deterministic manifest
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import type { LessonMeta, Difficulty, Language } from '../src/lib/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface FrontmatterData {
  id: string;
  title: string;
  course: string;
  difficulty: Difficulty;
  tags: string[];
  estimatedMinutes: number;
  hasInteractiveExercises: boolean;
  videoId?: string;
  description?: string;
  tinkercadUrl?: string;
  youtubeUrl?: string;
  keyPoints?: Array<{ title: string; description?: string }>;
  order?: number;
}

const REQUIRED_FIELDS = [
  'id',
  'title',
  'course',
  'difficulty',
  'tags',
  'estimatedMinutes',
  'hasInteractiveExercises'
] as const;

const LESSONS_DIR = path.join(__dirname, '../src/content/lessons');
const OUTPUT_FILE = path.join(__dirname, '../src/lib/generated/lessonsManifest.ts');

/**
 * Validates that all required frontmatter fields are present
 */
function validateFrontmatter(
  data: Record<string, unknown>,
  filepath: string
): asserts data is FrontmatterData {
  const missing: string[] = [];
  
  for (const field of REQUIRED_FIELDS) {
    if (!(field in data) || data[field] === undefined || data[field] === null) {
      missing.push(field);
    }
  }
  
  if (missing.length > 0) {
    throw new Error(
      `❌ VALIDATION ERROR in ${filepath}:\n` +
      `   Missing required frontmatter fields: ${missing.join(', ')}\n` +
      `   Required fields: ${REQUIRED_FIELDS.join(', ')}`
    );
  }
  
  // Validate types
  if (typeof data.id !== 'string') {
    throw new Error(`❌ VALIDATION ERROR in ${filepath}: 'id' must be a string`);
  }
  if (typeof data.title !== 'string') {
    throw new Error(`❌ VALIDATION ERROR in ${filepath}: 'title' must be a string`);
  }
  if (typeof data.course !== 'string') {
    throw new Error(`❌ VALIDATION ERROR in ${filepath}: 'course' must be a string`);
  }
  if (!['beginner', 'intermediate', 'advanced'].includes(data.difficulty as string)) {
    throw new Error(
      `❌ VALIDATION ERROR in ${filepath}: 'difficulty' must be 'beginner', 'intermediate', or 'advanced'`
    );
  }
  if (!Array.isArray(data.tags)) {
    throw new Error(`❌ VALIDATION ERROR in ${filepath}: 'tags' must be an array`);
  }
  if (typeof data.estimatedMinutes !== 'number') {
    throw new Error(`❌ VALIDATION ERROR in ${filepath}: 'estimatedMinutes' must be a number`);
  }
  if (typeof data.hasInteractiveExercises !== 'boolean') {
    throw new Error(`❌ VALIDATION ERROR in ${filepath}: 'hasInteractiveExercises' must be a boolean`);
  }
}

/**
 * Parse a single MDX file and extract lesson metadata
 */
function parseLessonFile(filepath: string, language: Language): LessonMeta {
  const content = fs.readFileSync(filepath, 'utf-8');
  const { data } = matter(content);
  
  // Validate frontmatter
  validateFrontmatter(data, filepath);
  
  // Extract slug from filename (remove .mdx extension)
  const filename = path.basename(filepath, '.mdx');
  const slug = filename;
  
  // Build lesson metadata
  const lesson: LessonMeta = {
    id: data.id,
    slug,
    title: data.title,
    description: data.description,
    course: data.course,
    difficulty: data.difficulty,
    tags: data.tags,
    estimatedMinutes: data.estimatedMinutes,
    hasInteractiveExercises: data.hasInteractiveExercises,
    language,
    order: data.order,
  };
  
  // Optional fields
  if (data.tinkercadUrl) {
    lesson.tinkercadUrl = data.tinkercadUrl;
  }
  
  // Handle youtubeUrl - prefer explicit youtubeUrl, fallback to constructing from videoId
  if (data.youtubeUrl) {
    lesson.youtubeUrl = data.youtubeUrl;
  } else if (data.videoId) {
    lesson.youtubeUrl = `https://www.youtube.com/watch?v=${data.videoId}`;
  }
  
  if (data.keyPoints) {
    lesson.keyPoints = data.keyPoints;
  }
  
  return lesson;
}

/**
 * Scan all MDX files and generate manifest
 */
function generateManifest(): LessonMeta[] {
  const lessons: LessonMeta[] = [];
  
  // Get all language directories
  const langDirs = fs.readdirSync(LESSONS_DIR).filter(name => {
    const stat = fs.statSync(path.join(LESSONS_DIR, name));
    return stat.isDirectory();
  });
  
  console.log(`📂 Found language directories: ${langDirs.join(', ')}`);
  
  for (const lang of langDirs) {
    if (lang !== 'en' && lang !== 'ro') {
      console.warn(`⚠️  Skipping unknown language directory: ${lang}`);
      continue;
    }
    
    const langDir = path.join(LESSONS_DIR, lang);
    const files = fs.readdirSync(langDir).filter(f => f.endsWith('.mdx'));
    
    console.log(`📄 Processing ${files.length} files in ${lang}/`);
    
    for (const file of files) {
      const filepath = path.join(langDir, file);
      try {
        const lesson = parseLessonFile(filepath, lang as Language);
        lessons.push(lesson);
        console.log(`  ✓ ${file} -> ${lesson.id}`);
      } catch (error) {
        // Re-throw with context
        if (error instanceof Error) {
          throw new Error(`Failed to process ${filepath}: ${error.message}`);
        }
        throw error;
      }
    }
  }
  
  // Sort lessons for deterministic output
  lessons.sort((a, b) => {
    // Sort by language first
    if (a.language !== b.language) {
      return a.language.localeCompare(b.language);
    }
    // Then by id
    return a.id.localeCompare(b.id);
  });
  
  console.log(`\n✅ Successfully processed ${lessons.length} lessons`);
  
  return lessons;
}

/**
 * Generate TypeScript file content
 */
function generateTypeScriptFile(lessons: LessonMeta[]): string {
  const header = `/**
 * ⚠️ AUTO-GENERATED FILE — DO NOT EDIT MANUALLY ⚠️
 * 
 * This file is automatically generated from MDX frontmatter.
 * To modify lesson metadata, edit the frontmatter in the MDX files.
 * 
 * Generated at: ${new Date().toISOString()}
 * Total lessons: ${lessons.length}
 */

import type { LessonMeta } from '../types';

export const lessonsManifest: LessonMeta[] = `;

  const data = JSON.stringify(lessons, null, 2);
  
  const footer = `;\n`;
  
  return header + data + footer;
}

/**
 * Main execution
 */
function main(): void {
  console.log('🚀 Generating lessons manifest...\n');
  
  try {
    // Generate manifest
    const lessons = generateManifest();
    
    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log(`📁 Created directory: ${outputDir}`);
    }
    
    // Generate TypeScript file
    const content = generateTypeScriptFile(lessons);
    
    // Write to file
    fs.writeFileSync(OUTPUT_FILE, content, 'utf-8');
    
    console.log(`\n📝 Manifest written to: ${OUTPUT_FILE}`);
    console.log('✨ Done!\n');
  } catch (error) {
    console.error('\n❌ FATAL ERROR:\n');
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    console.error('\n💡 Fix the errors above and try again.\n');
    process.exit(1);
  }
}

// Run if executed directly (ES module equivalent)
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateManifest, parseLessonFile };
