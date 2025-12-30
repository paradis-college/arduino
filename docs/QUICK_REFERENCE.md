# Quick Reference Guide

> Common tasks and commands for Arduino Learning Platform development.

---

## 🚀 Getting Started

```bash
# Clone and setup
git clone https://github.com/paradis-college/arduino.git
cd arduino/apps/web
npm install
npm run dev
```

---

## 📦 Common Commands

### Development
```bash
npm run dev                    # Start dev server (localhost:5173)
npm run generate:manifest      # Generate lessons manifest
npm run validate:content       # Validate lesson files
```

### Building
```bash
npm run build                 # Production build
npm run preview               # Preview production build
```

### Quality Checks
```bash
npm run lint                  # TypeScript type checking
npm run lint:test             # Type check tests
npm test                      # Run all tests
npm run test:watch            # Watch mode for tests
```

---

## 📝 Adding Content

### Quick Lesson Creation

```bash
# 1. Create file
touch apps/web/src/content/lessons/en/my-lesson.mdx

# 2. Add frontmatter (copy from existing lesson)

# 3. Write content

# 4. Generate manifest
npm run generate:manifest

# 5. Test
npm run dev
```

### Lesson Template

```mdx
---
id: p1-c1-l1-lesson-name-en
slug: lesson-name
title: Lesson Title
description: Brief description
course: course-id
difficulty: beginner
estimatedMinutes: 15
tags: [tag1, tag2]
language: en
order: 1
---

# Lesson Title

Introduction paragraph...

<InfoBox type="tip">
Helpful tip here
</InfoBox>

## Section Title

Content here...

<Checkpoint id="checkpoint-1">
Mark completion when done
</Checkpoint>
```

---

## 🔧 Common Git Workflows

### Create Feature Branch
```bash
git checkout main
git pull origin main
git checkout -b feature/my-feature
# ... make changes ...
git add .
git commit -m "feat: description"
git push origin feature/my-feature
```

### Update Branch from Main
```bash
git checkout main
git pull origin main
git checkout feature/my-feature
git merge main
# ... resolve conflicts if any ...
git push origin feature/my-feature
```

### Sync Fork
```bash
git remote add upstream https://github.com/paradis-college/arduino.git
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
npx kill-port 5173
# or
npm run dev -- --port 3000
```

### Module Not Found
```bash
npm install
npm run generate:manifest
```

### Build Errors
```bash
npm run lint              # Check types
rm -rf node_modules       # Fresh install
npm install
npm run build
```

### Clear Cache
```bash
rm -rf node_modules/.vite
rm -rf dist
npm run build
```

---

## 📊 Project Structure Quick Map

```
arduino/
├── apps/web/                    # Main app
│   ├── src/
│   │   ├── components/         # UI components
│   │   ├── content/lessons/    # MDX lessons
│   │   ├── lib/                # Utils & data
│   │   └── routes/             # Pages
│   └── scripts/                # Build scripts
├── docs/                        # Documentation
├── README.md                    # Start here
├── CONTRIBUTING.md              # How to contribute
└── ARCHITECTURE_REVIEW.md       # Technical analysis
```

---

## 🎯 Key Files

| File | Purpose |
|------|---------|
| `src/lib/lessonsManifest.ts` | Generated lesson metadata |
| `src/lib/pathsManifest.ts` | Learning paths definition |
| `src/lib/progressStore.ts` | Progress tracking logic |
| `src/lib/themeStore.ts` | Theme management |
| `src/lib/types.ts` | TypeScript types |
| `src/index.css` | Global styles & theme variables |
| `vite.config.ts` | Build configuration |
| `tailwind.config.cjs` | Tailwind setup |

---

## 📚 Documentation Links

- **[Main README](../README.md)** - Project overview
- **[Web App README](../apps/web/README.md)** - Development guide  
- **[Contributing](../CONTRIBUTING.md)** - Contribution guidelines
- **[Changelog](../CHANGELOG.md)** - Version history
- **[Architecture Review](../ARCHITECTURE_REVIEW.md)** - Technical deep dive

---

## 💡 Pro Tips

### Development
- Use `npm run dev` to see changes instantly
- Generate manifest after content changes
- Check console for errors
- Use React DevTools browser extension

### Content Creation
- Copy existing lessons as templates
- Use all frontmatter fields for discoverability
- Test interactive components locally
- Keep lessons focused and concise

### Code Quality
- Run `npm run lint` before committing
- Add tests for new features
- Follow existing code patterns
- Use TypeScript types

### Git Commits
- Use conventional commit format
- Keep commits small and focused
- Write clear commit messages
- Reference issues in commits

---

## 🆘 Getting Help

1. **Check Documentation** - Most answers are in the docs
2. **Search Issues** - Someone may have had the same problem
3. **Ask in Discussions** - Community can help
4. **Create an Issue** - For bugs or feature requests

**Links:**
- [GitHub Issues](https://github.com/paradis-college/arduino/issues)
- [GitHub Discussions](https://github.com/paradis-college/arduino/discussions)

---

## 🎓 Learning Resources

### React & TypeScript
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### MDX & Content
- [MDX Documentation](https://mdxjs.com/)
- [Markdown Guide](https://www.markdownguide.org/)

### Styling
- [Tailwind CSS](https://tailwindcss.com/docs)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

### Tools
- [Vite Guide](https://vitejs.dev/guide/)
- [Vitest Documentation](https://vitest.dev/)

---

**Quick, accessible reference for common development tasks** ⚡
