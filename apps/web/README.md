# Arduino Learning Platform - Web App

> The main frontend application for the Arduino Learning Platform.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Development](#development)
- [Project Structure](#project-structure)
- [Content Management](#content-management)
- [Architecture](#architecture)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This is the React-based web application that powers the Arduino Learning Platform. It provides an interactive learning environment with:

- **51+ MDX-based lessons** with embedded interactive components
- **22 courses** organized into 6 learning paths
- **Progress tracking** using localStorage
- **Multi-language support** (English/Romanian)
- **Responsive design** with light/dark themes

### Tech Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Framework** | React 19 | UI components and state management |
| **Language** | TypeScript 5.9 | Type safety and developer experience |
| **Build Tool** | Vite 7 | Fast dev server and optimized builds |
| **Routing** | React Router 7 | Client-side navigation |
| **Styling** | Tailwind CSS 4 | Utility-first CSS framework |
| **Content** | MDX 3 | Interactive markdown lessons |
| **Testing** | Vitest | Unit and integration tests |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

```bash
# From the repository root
cd apps/web

# Install dependencies
npm install

# Generate lesson manifest
npm run generate:manifest

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### First Run Checklist

- [ ] Dependencies installed successfully
- [ ] Manifest generated without errors
- [ ] Dev server starts on port 5173
- [ ] Homepage loads correctly
- [ ] Navigation between lessons works
- [ ] Theme toggle functions properly

---

## 💻 Development

### Available Scripts

#### Development
```bash
npm run dev                # Start dev server (http://localhost:5173)
npm run generate:manifest  # Generate lessons manifest from MDX files
npm run validate:content   # Validate all lesson content and structure
```

#### Building
```bash
npm run build             # Production build (output: dist/)
npm run preview           # Preview production build locally
```

#### Quality Assurance
```bash
npm run lint              # Type check with TypeScript
npm run lint:test         # Type check test files
npm test                  # Run all tests once
npm run test:watch        # Run tests in watch mode
```

### Development Workflow

1. **Make changes** to components or lessons
2. **Hot reload** updates automatically in browser
3. **Run linting** to catch type errors
4. **Test changes** manually and with automated tests
5. **Generate manifest** if you added/modified lessons
6. **Commit changes** with clear messages

---

## 📁 Project Structure

```
apps/web/
├── public/                  # Static assets (images, favicon)
│   ├── images/             # Hero images and graphics
│   ├── logo.svg            # Platform logo
│   └── favicon.svg         # Browser favicon
├── scripts/                 # Build and utility scripts
│   ├── generateLessonsManifest.ts  # Auto-generate manifest
│   └── validateContent.ts          # Content validation
├── src/
│   ├── components/         # React components
│   │   ├── common/        # Reusable UI components
│   │   ├── interactive/   # Interactive learning components
│   │   ├── layout/        # Layout components (Navbar, Footer)
│   │   └── lessons/       # Lesson-specific components
│   ├── content/
│   │   └── lessons/       # MDX lesson files
│   │       ├── en/        # English lessons
│   │       └── ro/        # Romanian lessons
│   ├── i18n/              # Internationalization
│   │   ├── en.ts          # English translations
│   │   └── ro.ts          # Romanian translations
│   ├── lib/               # Utility functions and core logic
│   │   ├── lessonsManifest.ts  # Generated lesson metadata
│   │   ├── pathsManifest.ts    # Learning paths definitions
│   │   ├── progressStore.ts    # Progress tracking logic
│   │   ├── themeStore.ts       # Theme state management
│   │   └── types.ts            # TypeScript type definitions
│   ├── routes/            # Page components
│   │   ├── HomePage.tsx
│   │   ├── PathsPage.tsx
│   │   ├── CoursePage.tsx
│   │   ├── LessonPage.tsx
│   │   └── ...
│   ├── sketches/          # P5.js sketch files
│   ├── test/              # Test utilities and setup
│   ├── App.tsx            # Root component
│   ├── index.css          # Global styles and theme variables
│   └── main.tsx           # Application entry point
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
└── tailwind.config.cjs    # Tailwind CSS configuration
```

---

## 📝 Content Management

### Adding a New Lesson

1. **Create MDX file** in the appropriate language folder:
   ```bash
   apps/web/src/content/lessons/en/my-new-lesson.mdx
   ```

2. **Add frontmatter** with metadata:
   ```mdx
   ---
   id: p1-c1-l5-my-lesson
   slug: my-new-lesson
   title: My Awesome Lesson
   description: Learn something amazing
   course: passive-components
   difficulty: beginner
   estimatedMinutes: 15
   tags: [led, circuit]
   language: en
   order: 5
   ---

   # My Awesome Lesson

   Start writing your lesson content here...
   ```

3. **Use interactive components**:
   ```mdx
   <InfoBox type="tip">
     This is a helpful tip for students!
   </InfoBox>

   <Checkpoint id="checkpoint-1">
     Mark this checkpoint when you complete the circuit.
   </Checkpoint>

   <YouTubeEmbed videoId="abc123" title="Circuit Tutorial" />
   ```

4. **Generate manifest**:
   ```bash
   npm run generate:manifest
   ```

5. **Validate content**:
   ```bash
   npm run validate:content
   ```

6. **Test locally**:
   ```bash
   npm run dev
   # Navigate to your lesson in the browser
   ```

### Available MDX Components

| Component | Purpose | Example |
|-----------|---------|---------|
| `<InfoBox>` | Highlight important information | `<InfoBox type="tip">...</InfoBox>` |
| `<Checkpoint>` | Track lesson progress | `<Checkpoint id="cp-1">Complete step 1</Checkpoint>` |
| `<YouTubeEmbed>` | Embed videos | `<YouTubeEmbed videoId="abc123" />` |
| `<TinkercadEmbed>` | Circuit simulations | `<TinkercadEmbed projectId="abc" />` |
| `<P5SketchEmbed>` | Interactive sketches | `<P5SketchEmbed sketchName="led-blink" />` |
| `<ExerciseMultipleChoice>` | Quiz questions | See component documentation |
| `<ExercisePinMapping>` | Pin identification | See component documentation |

### Content Structure

**Learning Paths** → **Courses** → **Lessons**

```
Electronics Fundamentals (Path)
  └─ Passive Components (Course)
      ├─ LEDs and Resistors (Lesson)
      ├─ Buttons and Switches (Lesson)
      └─ ... more lessons
```

Each level has metadata in:
- **Paths**: `src/lib/pathsManifest.ts`
- **Courses**: Defined in `pathsManifest.ts`
- **Lessons**: `src/lib/lessonsManifest.ts` (auto-generated)

---

## 🏗️ Architecture

### Data Flow

```
User Action
    ↓
React Component
    ↓
Store/Context (theme, language, progress)
    ↓
localStorage / State Update
    ↓
Re-render UI
```

### State Management

| State | Storage | Scope | Persistence |
|-------|---------|-------|-------------|
| **Theme** | Context + localStorage | Global | Yes |
| **Language** | Context + localStorage | Global | Yes |
| **Progress** | localStorage | Global | Yes |
| **Current Lesson** | React Router | Page | No |

### Key Design Patterns

- **Component Composition** - Small, reusable components
- **Custom Hooks** - Logic extraction (useProgress, useTheme)
- **MDX Components** - Interactive content in markdown
- **CSS Variables** - Dynamic theming
- **TypeScript Interfaces** - Type-safe data structures

### Theme System

The app uses CSS variables for theming:

```css
/* Light mode (default) */
:root {
  --color-primary: #00979d;
  --color-background: #ffffff;
  --color-text: #1e293b;
}

/* Dark mode */
.theme-dark {
  --color-primary: #2dd4bf;
  --color-background: #0f172a;
  --color-text: #f1f5f9;
}
```

Theme is managed by `src/lib/themeStore.ts` and persisted to localStorage.

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests once
npm test

# Watch mode (re-runs on file changes)
npm run test:watch

# With coverage
npm test -- --coverage
```

### Test Structure

```
src/
├── components/
│   └── common/
│       ├── Button.tsx
│       └── Button.test.tsx    # Component test
└── lib/
    ├── progressStore.ts
    └── progressStore.test.ts  # Unit test
```

### Writing Tests

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### Current Test Coverage

- **Unit Tests**: Core utility functions (progressStore, types)
- **Component Tests**: Common UI components
- **Integration Tests**: Coming soon
- **E2E Tests**: Coming soon

---

## 🚀 Deployment

### Production Build

```bash
# Generate manifest and build
npm run build

# Output is in dist/ folder
ls dist/
```

### Build Output

The build creates optimized static files:
- HTML, CSS, JavaScript (minified)
- Code-split chunks for lazy loading
- Hashed filenames for cache busting

### Deployment Options

#### Static Hosting (Recommended)
- **Netlify**: Deploy from GitHub
- **Vercel**: Zero-config deployment
- **GitHub Pages**: Free static hosting
- **AWS S3 + CloudFront**: Scalable CDN

#### Server Deployment
- **Docker**: Containerized deployment
- **Traditional Server**: nginx or Apache

### Environment Variables

Currently, the app doesn't require environment variables. Future backend integration will add:

```env
VITE_API_URL=https://api.arduino-learn.com
VITE_AUTH_DOMAIN=auth.arduino-learn.com
```

---

## 🐛 Troubleshooting

### Common Issues

#### Build Errors

**Problem**: `Cannot find type definition file for 'vitest/globals'`

**Solution**:
```bash
npm run lint:test  # Use test-specific tsconfig
```

#### Port Already in Use

**Problem**: `Port 5173 is already in use`

**Solution**:
```bash
# Kill process on port 5173
npx kill-port 5173

# Or use different port
npm run dev -- --port 3000
```

#### Missing Manifest

**Problem**: `Cannot find module './lessonsManifest'`

**Solution**:
```bash
npm run generate:manifest
```

#### Hot Reload Not Working

**Problem**: Changes don't appear in browser

**Solution**:
1. Check browser console for errors
2. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. Restart dev server
4. Clear browser cache

#### Type Errors

**Problem**: TypeScript errors in IDE

**Solution**:
```bash
# Regenerate types
npm run generate:manifest

# Check for actual errors
npm run lint
```

### Getting Help

1. **Check Docs**: [Architecture Review](../../ARCHITECTURE_REVIEW.md)
2. **Search Issues**: [GitHub Issues](https://github.com/paradis-college/arduino/issues)
3. **Ask Questions**: Open a GitHub Discussion
4. **Report Bugs**: Create an issue with details

---

## 📚 Additional Resources

### Documentation
- [Main README](../../README.md) - Project overview
- [Architecture Review](../../ARCHITECTURE_REVIEW.md) - Technical deep dive
- [Implementation Guide](../../docs/IMPLEMENTATION_GUIDE.md) - Fix critical issues
- [Docs README](../../docs/README.md) - Documentation index

### External Links
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [MDX Documentation](https://mdxjs.com/)

---

## 🤝 Contributing

See the [main README](../../README.md#contributing) for contribution guidelines.

### Quick Contribution Checklist

- [ ] Code follows TypeScript best practices
- [ ] New components have JSDoc comments
- [ ] Tests added for new features
- [ ] Manifest regenerated if content changed
- [ ] Build passes (`npm run build`)
- [ ] Linting passes (`npm run lint`)
- [ ] Manual testing completed

---

**Questions?** Open an issue or start a discussion on GitHub!
