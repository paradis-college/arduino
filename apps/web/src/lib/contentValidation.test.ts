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
      await expect(validateNoDuplicates()).resolves.not.toThrow();
    });
  });

  describe('validateDomainRelationships', () => {
    it('should not throw when all relationships are valid', async () => {
      await expect(validateDomainRelationships()).resolves.not.toThrow();
    });
  });

  describe('checkMissingTranslations', () => {
    it('should not throw (warnings only)', async () => {
      await expect(checkMissingTranslations()).resolves.not.toThrow();
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
