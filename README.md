# 🔌 Arduino Learning Platform

> An interactive web platform for learning Arduino, electronics, and embedded systems programming.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)](https://vitejs.dev/)

---

## 📖 About

The Arduino Learning Platform is an educational web application designed to teach electronics and Arduino programming through interactive lessons, hands-on projects, and a structured curriculum. The platform features:

- **51+ Lessons** across 22 courses organized into 6 learning paths
- **Interactive Components** including circuit simulations, code editors, and quizzes
- **Multi-language Support** (English and Romanian)
- **Progress Tracking** with checkpoints and bookmarks
- **Light/Dark Mode** for comfortable learning

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/paradis-college/arduino.git
cd arduino

# Navigate to the web app
cd apps/web

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

---

## 📁 Project Structure

```
arduino/
├── apps/
│   └── web/                 # Main React web application
│       ├── src/
│       │   ├── components/  # React components
│       │   ├── content/     # MDX lesson files
│       │   ├── lib/         # Utility functions and data
│       │   ├── routes/      # Page components
│       │   └── i18n/        # Internationalization
│       ├── public/          # Static assets
│       └── scripts/         # Build scripts
├── docs/                    # Documentation
│   ├── IMPLEMENTATION_GUIDE.md
│   └── README.md
└── ARCHITECTURE_REVIEW.md   # Comprehensive architecture analysis
```

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router 7** - Client-side routing
- **Tailwind CSS 4** - Styling

### Content Management
- **MDX** - Markdown with JSX for interactive lessons
- **Gray Matter** - Frontmatter parsing

### State Management
- **localStorage** - Client-side progress tracking
- **React Context** - Theme and language state

---

## 📚 Documentation

### For Developers
- **[Web App README](apps/web/README.md)** - Detailed setup and development guide
- **[Quick Reference](docs/QUICK_REFERENCE.md)** - Common commands and workflows
- **[Implementation Guide](docs/IMPLEMENTATION_GUIDE.md)** - Step-by-step fixes for critical issues
- **[Architecture Review](ARCHITECTURE_REVIEW.md)** - In-depth technical analysis

### For Contributors
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute to the project
- **[Changelog](CHANGELOG.md)** - Version history and upcoming features

### Key Documentation Topics
- Project setup and development workflow
- Content creation (adding new lessons)
- Component library usage
- Testing strategies
- Deployment procedures

---

## 🎯 Features

### ✅ Current Features
- **Structured Learning Paths** - 6 organized paths from beginner to advanced
- **Interactive Lessons** - MDX-based content with embedded exercises
- **Progress Tracking** - Save progress, bookmark lessons, complete checkpoints
- **Theming** - Light/dark mode with system preference detection
- **Internationalization** - English and Romanian translations
- **Responsive Design** - Mobile, tablet, and desktop support
- **Circuit Simulations** - Embedded Tinkercad projects
- **Code Playgrounds** - P5.js sketches and Arduino code examples

### 🚧 In Development
- Backend API integration
- User authentication and profiles
- Community project submissions
- Advanced progress analytics
- Course completion certificates

---

## 🎓 Learning Paths

1. **Electronics Fundamentals** - LEDs, resistors, switches, sensors
2. **Arduino Basics** - Programming fundamentals, digital I/O
3. **Analog Electronics** - Potentiometers, analog sensors, PWM
4. **Advanced Arduino** - Interrupts, timers, serial communication
5. **Communication Protocols** - I2C, SPI, wireless modules
6. **Creative Projects** - Combining concepts into real-world applications

---

## 💻 Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload
npm run generate:manifest # Generate lesson manifest from MDX files

# Building
npm run build           # Production build
npm run preview         # Preview production build

# Quality Checks
npm run lint            # Type check with TypeScript
npm test                # Run unit tests
npm run test:watch      # Run tests in watch mode
npm run validate:content # Validate all lesson content
```

### Adding New Lessons

1. Create an MDX file in `apps/web/src/content/lessons/{language}/`
2. Add frontmatter metadata (title, description, difficulty, etc.)
3. Write lesson content with interactive components
4. Run `npm run generate:manifest` to update the manifest
5. Test locally with `npm run dev`

See [Web App README](apps/web/README.md) for detailed instructions.

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute
- 🐛 **Report bugs** - Open an issue with details
- 💡 **Suggest features** - Share your ideas
- 📝 **Improve documentation** - Fix typos, add examples
- 🎨 **Create content** - Write new lessons or exercises
- 💻 **Submit code** - Fix bugs or implement features

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm test && npm run lint`)
5. Commit with clear messages (`git commit -m 'Add amazing feature'`)
6. Push to your fork (`git push origin feature/amazing-feature`)
7. Open a Pull Request

---

## 📊 Project Status

**Current Phase:** Foundation Complete (60%)

**Next Milestone:** Backend Integration

**Timeline:**
- ✅ **Phase 1:** Frontend foundation - COMPLETE
- 🚧 **Phase 2:** Critical fixes (Weeks 1-3) - IN PROGRESS
- 📋 **Phase 3:** Backend foundation (Weeks 4-8)
- 📋 **Phase 4:** User features (Weeks 9-12)

See [Architecture Review](ARCHITECTURE_REVIEW.md) for detailed roadmap.

---

## 🔒 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **Arduino Community** - Inspiration and technical resources
- **Contributors** - Everyone who has contributed to this project
- **Paradis College** - Project stewardship and support

---

## 📞 Contact

- **Issues:** [GitHub Issues](https://github.com/paradis-college/arduino/issues)
- **Discussions:** [GitHub Discussions](https://github.com/paradis-college/arduino/discussions)
- **Organization:** [Paradis College](https://github.com/paradis-college)

---

**Made with ❤️ for the Arduino learning community**
