/**
 * Tests for content validation
 *
 * These tests verify that:
 * 1. Manifest generation properly validates frontmatter
 * 2. Content validation catches orphaned manifest entries
 * 3. Content validation catches orphaned MDX files
 */

import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import {
  validateManifestExists,
  parseManifestEntries,
  validateManifestEntriesHaveFiles,
  getAllMdxFiles,
  validateAllFilesInManifest,
  validateDomainRelationships,
  validateNoDuplicates,
  checkMissingTranslations,
} from '../../scripts/validateContent';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Maximum depth to search for repository root
const MAX_REPO_ROOT_SEARCH_DEPTH = 20;

describe('Content Validation', () => {
  describe('validateManifestExists', () => {
    it('should not throw when manifest file exists', () => {
      // The manifest should be generated as part of the build process
      expect(() => validateManifestExists()).not.toThrow();
    });
  });

  describe('parseManifestEntries', () => {
    it('should parse manifest and return array of entries', async () => {
      const entries = await parseManifestEntries();

      expect(Array.isArray(entries)).toBe(true);
      expect(entries.length).toBeGreaterThan(0);

      // Check structure of first entry
      const firstEntry = entries[0];
      expect(firstEntry).toHaveProperty('id');
      expect(firstEntry).toHaveProperty('slug');
      expect(firstEntry).toHaveProperty('language');
      expect(typeof firstEntry.id).toBe('string');
      expect(typeof firstEntry.slug).toBe('string');
      expect(typeof firstEntry.language).toBe('string');
    });
  });

  describe('getAllMdxFiles', () => {
    it('should return array of MDX files', () => {
      const files = getAllMdxFiles();

      expect(Array.isArray(files)).toBe(true);
      expect(files.length).toBeGreaterThan(0);

      // Check structure of first file
      const firstFile = files[0];
      expect(firstFile).toHaveProperty('filepath');
      expect(firstFile).toHaveProperty('language');
      expect(firstFile).toHaveProperty('filename');
      expect(firstFile.filename.endsWith('.mdx')).toBe(true);
    });

    it('should only include MDX files', () => {
      const files = getAllMdxFiles();

      files.forEach(file => {
        expect(file.filename.endsWith('.mdx')).toBe(true);
      });
    });
  });

  describe('validateManifestEntriesHaveFiles', () => {
    it('should not throw when all manifest entries have corresponding files', async () => {
      const entries = await parseManifestEntries();

      expect(() => validateManifestEntriesHaveFiles(entries)).not.toThrow();
    });
  });

  describe('validateAllFilesInManifest', () => {
    it('should not throw when all MDX files are in manifest', async () => {
      const mdxFiles = getAllMdxFiles();
      const manifestEntries = await parseManifestEntries();

      expect(() => validateAllFilesInManifest(mdxFiles, manifestEntries)).not.toThrow();
    });
  });

  describe('validateNoDuplicates', () => {
    it('should not throw when there are no duplicate IDs or slugs', async () => {
      const manifestEntries = await parseManifestEntries();
      const lessons = manifestEntries.map(e => ({
        id: e.id,
        slug: e.slug,
        language: e.language,
        course: 'test-course'
      }));
      const courses = [{ id: 'course1', slug: 'course-1' }];
      const paths = [{ id: 'path1', slug: 'path-1' }];

      expect(() => validateNoDuplicates(lessons, courses, paths)).not.toThrow();
    });

    it('should throw when duplicate lesson IDs are found', () => {
      const lessons = [
        { id: 'dup-id', slug: 'lesson-1', language: 'en', course: 'course1' },
        { id: 'dup-id', slug: 'lesson-2', language: 'en', course: 'course1' }
      ];
      const courses = [{ id: 'course1', slug: 'course-1' }];
      const paths = [{ id: 'path1', slug: 'path-1' }];

      expect(() => validateNoDuplicates(lessons, courses, paths))
        .toThrow(/DUPLICATE LESSON ID.*dup-id/);
    });

    it('should throw when duplicate lesson slugs in same language are found', () => {
      const lessons = [
        { id: 'lesson-1', slug: 'dup-slug', language: 'en', course: 'course1' },
        { id: 'lesson-2', slug: 'dup-slug', language: 'en', course: 'course1' }
      ];
      const courses = [{ id: 'course1', slug: 'course-1' }];
      const paths = [{ id: 'path1', slug: 'path-1' }];

      expect(() => validateNoDuplicates(lessons, courses, paths))
        .toThrow(/DUPLICATE LESSON SLUG.*dup-slug/);
    });

    it('should throw when duplicate course IDs are found', () => {
      const lessons = [{ id: 'lesson-1', slug: 'lesson-1', language: 'en', course: 'course1' }];
      const courses = [
        { id: 'dup-course', slug: 'course-1' },
        { id: 'dup-course', slug: 'course-2' }
      ];
      const paths = [{ id: 'path1', slug: 'path-1' }];

      expect(() => validateNoDuplicates(lessons, courses, paths))
        .toThrow(/DUPLICATE COURSE ID.*dup-course/);
    });

    it('should throw when duplicate path IDs are found', () => {
      const lessons = [{ id: 'lesson-1', slug: 'lesson-1', language: 'en', course: 'course1' }];
      const courses = [{ id: 'course1', slug: 'course-1' }];
      const paths = [
        { id: 'dup-path', slug: 'path-1' },
        { id: 'dup-path', slug: 'path-2' }
      ];

      expect(() => validateNoDuplicates(lessons, courses, paths))
        .toThrow(/DUPLICATE PATH ID.*dup-path/);
    });

    it('should report all occurrences when there are 3+ duplicates', () => {
      const lessons = [
        { id: 'dup-id', slug: 'lesson-1', language: 'en', course: 'course1' },
        { id: 'dup-id', slug: 'lesson-2', language: 'en', course: 'course1' },
        { id: 'dup-id', slug: 'lesson-3', language: 'en', course: 'course1' }
      ];
      const courses = [{ id: 'course1', slug: 'course-1' }];
      const paths = [{ id: 'path1', slug: 'path-1' }];

      try {
        validateNoDuplicates(lessons, courses, paths);
        fail('Should have thrown an error');
      } catch (error) {
        const message = (error as Error).message;
        // Should contain all three occurrences
        expect(message).toContain('1.');
        expect(message).toContain('2.');
        expect(message).toContain('3.');
      }
    });
  });

  describe('validateDomainRelationships', () => {
    it('should not throw when all relationships are valid', () => {
      const lessons = [{ id: 'lesson-1', slug: 'lesson-1', language: 'en', course: 'course1' }];
      const courses = [{ id: 'course1', slug: 'course-1', pathId: 'path1' }];
      const paths = [{ id: 'path1', slug: 'path-1' }];

      expect(() => validateDomainRelationships(lessons, courses, paths)).not.toThrow();
    });

    it('should throw when lesson references non-existent course', () => {
      const lessons = [{ id: 'lesson-1', slug: 'lesson-1', language: 'en', course: 'invalid-course' }];
      const courses = [{ id: 'course1', slug: 'course-1' }];
      const paths = [{ id: 'path1', slug: 'path-1' }];

      expect(() => validateDomainRelationships(lessons, courses, paths))
        .toThrow(/ORPHANED LESSON.*invalid-course/);
    });

    it('should throw when course references non-existent path', () => {
      const lessons = [{ id: 'lesson-1', slug: 'lesson-1', language: 'en', course: 'course1' }];
      const courses = [{ id: 'course1', slug: 'course-1', pathId: 'invalid-path' }];
      const paths = [{ id: 'path1', slug: 'path-1' }];

      expect(() => validateDomainRelationships(lessons, courses, paths))
        .toThrow(/ORPHANED COURSE.*invalid-path/);
    });

    it('should include file path in error message', () => {
      const lessons = [{ id: 'test-lesson', slug: 'test-slug', language: 'en', course: 'invalid' }];
      const courses = [{ id: 'course1', slug: 'course-1' }];
      const paths = [{ id: 'path1', slug: 'path-1' }];

      try {
        validateDomainRelationships(lessons, courses, paths);
        fail('Should have thrown an error');
      } catch (error) {
        const message = (error as Error).message;
        expect(message).toContain('File:');
        expect(message).toContain('test-slug.mdx');
      }
    });
  });

  describe('checkMissingTranslations', () => {
    it('should not throw (warnings only)', () => {
      const lessons = [
        { id: 'lesson-1', slug: 'lesson-1', language: 'en', course: 'course1' },
        { id: 'lesson-2', slug: 'lesson-2', language: 'en', course: 'course1' }
      ];

      expect(() => checkMissingTranslations(lessons)).not.toThrow();
    });

    it('should report missing translations without failing', () => {
      const lessons = [
        { id: 'lesson-1-en', slug: 'lesson-1', language: 'en', course: 'course1' }
        // Missing Romanian translation
      ];

      // Should not throw even though translation is missing
      expect(() => checkMissingTranslations(lessons)).not.toThrow();
    });
  });

  describe('Integration', () => {
    it('should have matching counts between files and manifest entries', async () => {
      const mdxFiles = getAllMdxFiles();
      const manifestEntries = await parseManifestEntries();

      expect(mdxFiles.length).toBe(manifestEntries.length);
    });

    it('should have npm validate:content script', () => {
      // Use path.resolve for more robust path resolution
      const packageJsonPath = path.resolve(__dirname, '../../package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      expect(packageJson.scripts).toHaveProperty('validate:content');
      expect(packageJson.scripts['validate:content']).toContain('validateContent.ts');
    });

    it('should have GitHub Actions workflow', () => {
      // Find repository root by looking for .git directory
      let currentDir = __dirname;
      let repoRoot: string | null = null;
      let depth = 0;

      // Walk up the directory tree to find .git
      while (currentDir !== path.dirname(currentDir) && depth < MAX_REPO_ROOT_SEARCH_DEPTH) {
        if (fs.existsSync(path.join(currentDir, '.git'))) {
          repoRoot = currentDir;
          break;
        }
        currentDir = path.dirname(currentDir);
        depth++;
      }

      // Ensure we found the repository root
      expect(repoRoot).not.toBeNull();

      const workflowPath = path.join(repoRoot!, '.github/workflows/validate-content.yml');

      expect(fs.existsSync(workflowPath)).toBe(true);

      const workflowContent = fs.readFileSync(workflowPath, 'utf-8');
      expect(workflowContent).toContain('npm run validate:content');
    });
  });
});
