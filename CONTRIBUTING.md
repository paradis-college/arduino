# Contributing to Arduino Learning Platform

Thank you for your interest in contributing to the Arduino Learning Platform! This document provides guidelines and instructions for contributing.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Contribution Workflow](#contribution-workflow)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Content Contribution](#content-contribution)

---

## 🤝 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of:
- Experience level
- Age, gender identity, or expression
- Nationality or ethnicity
- Educational background
- Disability

### Expected Behavior

- Be respectful and considerate in all interactions
- Use welcoming and inclusive language
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Trolling, insulting, or derogatory remarks
- Personal or political attacks
- Publishing others' private information
- Unprofessional conduct

**Enforcement**: Violations may result in temporary or permanent ban from the project.

---

## 🎯 How Can I Contribute?

### 1. 🐛 Report Bugs

Found a bug? Help us fix it!

**Before submitting:**
- Search [existing issues](https://github.com/paradis-college/arduino/issues) to avoid duplicates
- Check if it's already fixed in the latest version

**Include in your report:**
- Clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots/videos (if applicable)
- Browser/OS information
- Error messages or console logs

**Template:**
```markdown
**Bug Description**
A clear description of what the bug is.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen.

**Actual Behavior**
What actually happens.

**Environment**
- OS: [e.g., Windows 10, macOS 13]
- Browser: [e.g., Chrome 120, Firefox 118]
- Version: [e.g., commit hash or release tag]

**Screenshots**
If applicable, add screenshots.
```

### 2. 💡 Suggest Features

Have an idea? We'd love to hear it!

**Before suggesting:**
- Check if it's already proposed
- Consider if it fits the project's goals

**Include in your suggestion:**
- Clear description of the feature
- Use cases and benefits
- Possible implementation approach
- Alternative solutions considered

### 3. 📝 Improve Documentation

Documentation contributions are highly valued!

**Areas to improve:**
- Fix typos and grammar
- Add missing information
- Clarify confusing sections
- Add examples and tutorials
- Improve formatting and structure

### 4. 🎨 Create Content

Help us expand the learning library!

**Content types:**
- New lessons and tutorials
- Interactive exercises
- Code examples
- Circuit diagrams
- Video demonstrations

See [Content Contribution](#content-contribution) section for details.

### 5. 💻 Submit Code

Contribute code improvements and new features!

**Good first issues:**
- Look for `good first issue` label
- Bug fixes and small improvements
- Test coverage improvements
- Documentation code examples

---

## 🛠️ Development Setup

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- Git
- Code editor (VS Code recommended)

### Initial Setup

```bash
# 1. Fork the repository on GitHub
# Click the "Fork" button at https://github.com/paradis-college/arduino

# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/arduino.git
cd arduino

# 3. Add upstream remote
git remote add upstream https://github.com/paradis-college/arduino.git

# 4. Install dependencies
cd apps/web
npm install

# 5. Generate manifest
npm run generate:manifest

# 6. Start development server
npm run dev
```

### Verify Setup

- [ ] Dev server runs without errors
- [ ] Homepage loads at http://localhost:5173
- [ ] Hot reload works when editing files
- [ ] Tests run successfully (`npm test`)
- [ ] Build completes (`npm run build`)

---

## 🔄 Contribution Workflow

### 1. Sync Your Fork

Before starting work, sync with upstream:

```bash
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
```

### 2. Create a Branch

Create a descriptive branch name:

```bash
# Feature branches
git checkout -b feature/add-lesson-search
git checkout -b feature/user-profiles

# Bug fix branches
git checkout -b fix/theme-toggle-bug
git checkout -b fix/mobile-navigation

# Documentation branches
git checkout -b docs/improve-setup-guide
git checkout -b docs/add-api-reference
```

### 3. Make Changes

**Best practices:**
- Make small, focused commits
- Test your changes thoroughly
- Run linting before committing
- Update documentation if needed
- Add tests for new features

```bash
# Run linting
npm run lint

# Run tests
npm test

# Generate manifest (if content changed)
npm run generate:manifest

# Validate content (if lessons changed)
npm run validate:content
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add lesson search functionality"
```

See [Commit Messages](#commit-messages) for guidelines.

### 5. Push to Your Fork

```bash
git push origin feature/add-lesson-search
```

### 6. Create Pull Request

1. Go to your fork on GitHub
2. Click "Compare & pull request"
3. Fill out the PR template
4. Link related issues
5. Request review

---

## 📐 Style Guidelines

### TypeScript/JavaScript

**Code Style:**
- Use TypeScript for type safety
- Follow existing code patterns
- Use meaningful variable names
- Add JSDoc comments for functions
- Keep functions small and focused

**Example:**
```typescript
/**
 * Calculate course completion percentage
 * @param courseId - The course identifier
 * @param language - The language of lessons
 * @returns Completion percentage (0-100)
 */
export function getCourseProgress(
  courseId: string,
  language: Language
): number {
  const lessons = getLessonsByCourse(courseId, language);
  // ... implementation
}
```

**Naming Conventions:**
- Components: `PascalCase` (e.g., `LessonCard`)
- Functions: `camelCase` (e.g., `getLesson`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRIES`)
- Files: Match component name or use `kebab-case`

### React Components

**Structure:**
```typescript
import { useState } from 'react';
import type { ComponentProps } from './types';

// Types first
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

// Component
export function Button({ 
  children, 
  variant = 'primary',
  onClick 
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

**Best practices:**
- Prefer function components over class components
- Use hooks for state and effects
- Extract complex logic to custom hooks
- Keep JSX readable with proper indentation
- Use TypeScript for prop types

### CSS/Tailwind

**Preferences:**
- Use Tailwind utility classes first
- Create custom CSS only when necessary
- Use CSS variables for theme values
- Follow mobile-first responsive design

**Example:**
```tsx
<div className="container mx-auto px-4 md:px-6 lg:px-8">
  <h1 className="text-2xl md:text-3xl font-bold text-primary">
    Title
  </h1>
</div>
```

### File Organization

**Components:**
```
components/
├── common/           # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   └── index.ts     # Barrel export
├── lessons/          # Lesson-specific components
└── layout/           # Layout components
```

**Naming:**
- One component per file
- File name matches component name
- Index files for barrel exports

---

## 📝 Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, no logic change)
- `refactor`: Code restructuring (no behavior change)
- `perf`: Performance improvement
- `test`: Adding or updating tests
- `chore`: Maintenance tasks (dependencies, config)
- `ci`: CI/CD changes

### Examples

```bash
# Feature
git commit -m "feat(lessons): add interactive circuit simulator"

# Bug fix
git commit -m "fix(theme): resolve dark mode contrast issue"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Multiple changes
git commit -m "feat(lessons): add quiz component

- Implement multiple choice questions
- Add answer validation
- Include progress tracking"

# Breaking change
git commit -m "feat(api)!: change lesson data structure

BREAKING CHANGE: Lesson metadata now requires 'difficulty' field"
```

### Guidelines

- Use present tense ("add" not "added")
- Use imperative mood ("move" not "moves")
- Keep subject line under 50 characters
- Capitalize subject line
- No period at the end
- Separate subject from body with blank line
- Wrap body at 72 characters
- Explain what and why, not how

---

## 🔍 Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Documentation updated (if needed)
- [ ] Commits follow conventional format
- [ ] Branch is up to date with main

### PR Template

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Performance improvement

## Related Issues
Fixes #123
Relates to #456

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] All tests pass

## Screenshots
(If applicable)

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
```

### Review Process

1. **Automated Checks**: CI/CD runs tests and linting
2. **Code Review**: Maintainer reviews code
3. **Feedback**: Address review comments
4. **Approval**: Maintainer approves PR
5. **Merge**: PR is merged to main branch

### After Merge

- Delete your feature branch
- Update your local main branch
- Celebrate! 🎉

---

## 🎨 Content Contribution

### Creating New Lessons

#### 1. Plan Your Lesson

**Consider:**
- Target audience (beginner/intermediate/advanced)
- Prerequisites (what should students know?)
- Learning objectives (what will they learn?)
- Estimated time to complete
- Required components/materials

#### 2. Create MDX File

```bash
# Choose language folder
cd apps/web/src/content/lessons/en

# Create file with descriptive name
touch my-awesome-lesson.mdx
```

#### 3. Add Frontmatter

```mdx
---
id: p1-c2-l3-my-lesson-en
slug: my-awesome-lesson
title: Understanding Pull-Up Resistors
description: Learn how pull-up resistors work and when to use them
course: passive-components
difficulty: beginner
estimatedMinutes: 20
tags: [resistor, circuit, theory]
language: en
order: 3
---
```

#### 4. Write Content

**Structure:**
1. Introduction (what and why)
2. Theory explanation
3. Practical examples
4. Hands-on exercises
5. Summary and next steps

**Example:**
```mdx
# Understanding Pull-Up Resistors

Pull-up resistors are essential components in digital circuits. Let's learn how they work!

## What is a Pull-Up Resistor?

A pull-up resistor connects a signal line to a positive voltage...

<InfoBox type="definition">
A **pull-up resistor** ensures a signal reads HIGH when not actively driven LOW.
</InfoBox>

## Why Do We Need Them?

Without a pull-up resistor, floating inputs can cause:
- Unpredictable behavior
- False readings
- Noise sensitivity

## Building the Circuit

<Checkpoint id="checkpoint-1">
Gather these components:
- 1x Arduino Uno
- 1x Button
- 1x 10kΩ resistor
- Breadboard and jumper wires
</Checkpoint>

<TinkercadEmbed projectId="abc123" title="Pull-Up Resistor Circuit" />

## Try It Yourself!

<ExerciseMultipleChoice
  id="exercise-1"
  question="What voltage does a pull-up resistor connect to?"
  options={[
    { id: 'a', text: 'Ground (0V)', correct: false },
    { id: 'b', text: 'Supply voltage (5V)', correct: true },
    { id: 'c', text: 'Negative voltage', correct: false }
  ]}
/>
```

#### 5. Use Interactive Components

Available components:
- `<InfoBox>` - Highlights (tip, warning, note, definition)
- `<Checkpoint>` - Progress tracking
- `<YouTubeEmbed>` - Video tutorials
- `<TinkercadEmbed>` - Circuit simulations
- `<P5SketchEmbed>` - Interactive sketches
- `<ExerciseMultipleChoice>` - Quiz questions

#### 6. Generate and Validate

```bash
# Generate manifest
npm run generate:manifest

# Validate content
npm run validate:content

# Test locally
npm run dev
```

### Translation Guidelines

When translating lessons:

1. **Preserve structure**: Keep same components and IDs
2. **Adapt examples**: Use culturally relevant examples
3. **Maintain technical accuracy**: Double-check terminology
4. **Test thoroughly**: Ensure all links and embeds work

**Example:**
```mdx
<!-- English -->
<InfoBox type="tip">
Connect the LED with the longer leg to positive!
</InfoBox>

<!-- Romanian -->
<InfoBox type="tip">
Conectați LED-ul cu picior mai lung la pozitiv!
</InfoBox>
```

---

## ❓ Questions?

- **General Questions**: Open a [GitHub Discussion](https://github.com/paradis-college/arduino/discussions)
- **Bug Reports**: Create an [Issue](https://github.com/paradis-college/arduino/issues)
- **Security Issues**: Email security@paradis-college.org (if exists)

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the project's MIT License.

---

**Thank you for contributing to Arduino Learning Platform!** 🎉
