/**
 * Lessons Manifest
 * Re-exports auto-generated lesson manifest and provides helper functions
 */

import type { LessonMeta, CourseMeta, Language } from './types';
import { lessonsManifest as generatedLessonsManifest } from './generated/lessonsManifest';

// Re-export the auto-generated manifest
// NOTE: Run `npm run generate:manifest` before using this file
export { lessonsManifest } from './generated/lessonsManifest';

/** All available courses organized by learning paths */
export const coursesManifest: CourseMeta[] = [
  // Path 1: Electronic Engineering
  {
    id: 'passive-components',
    slug: 'passive-components',
    title: 'Passive Components',
    description: 'LEDs, resistors, buttons and switches fundamentals',
    difficulty: 'beginner',
    lessonCount: 2,
    estimatedHours: 2,
    tags: ['LED', 'resistor', 'button', 'switch'],
    pathId: 'electronic-engineering',
    order: 1,
  },
  {
    id: 'active-components',
    slug: 'active-components',
    title: 'Active Components',
    description: 'Transistors, capacitors, and integrated circuits',
    difficulty: 'intermediate',
    lessonCount: 3,
    estimatedHours: 4,
    tags: ['transistor', 'capacitor', 'NE555', 'shift register'],
    pathId: 'electronic-engineering',
    order: 2,
  },
  {
    id: 'electromechanical-components',
    slug: 'electromechanical-components',
    title: 'Electromechanical Components',
    description: 'Inductors, motors, solenoids, and relays',
    difficulty: 'intermediate',
    lessonCount: 4,
    estimatedHours: 5,
    tags: ['inductor', 'motor', 'servo', 'solenoid', 'relay'],
    pathId: 'electronic-engineering',
    order: 3,
  },
  // Path 2: Electronic Sensors
  {
    id: 'vision-detection-sensors',
    slug: 'vision-detection-sensors',
    title: 'Vision / Detection Sensors',
    description: 'Ultrasonic, light, motion, proximity, and IR sensors',
    difficulty: 'beginner',
    lessonCount: 5,
    estimatedHours: 6,
    tags: ['ultrasonic', 'LDR', 'PIR', 'proximity', 'IR'],
    pathId: 'electronic-sensors',
    order: 1,
  },
  {
    id: 'environmental-monitoring-sensors',
    slug: 'environmental-monitoring-sensors',
    title: 'Environmental Monitoring Sensors',
    description: 'Temperature, humidity, soil moisture, gas, and pressure sensors',
    difficulty: 'beginner',
    lessonCount: 4,
    estimatedHours: 5,
    tags: ['DHT11', 'DHT22', 'soil moisture', 'gas sensor', 'pressure'],
    pathId: 'electronic-sensors',
    order: 2,
  },
  {
    id: 'consumer-electronics-sensors',
    slug: 'consumer-electronics-sensors',
    title: 'Consumer Electronics Sensors',
    description: 'Accelerometers, gyroscopes, touch, and vibration sensors',
    difficulty: 'intermediate',
    lessonCount: 3,
    estimatedHours: 4,
    tags: ['accelerometer', 'gyroscope', 'touch', 'TTP223', 'vibration'],
    pathId: 'electronic-sensors',
    order: 3,
  },
  // Path 3: Arduino Basics
  {
    id: 'embedded-programming-basics',
    slug: 'embedded-programming-basics',
    title: 'Embedded Programming Basics',
    description: 'LED control, PWM, timing, and Arduino functions',
    difficulty: 'beginner',
    lessonCount: 5,
    estimatedHours: 4,
    tags: ['LED', 'blink', 'PWM', 'delay', 'setup', 'loop'],
    pathId: 'arduino-basics',
    order: 1,
  },
  {
    id: 'working-with-inputs',
    slug: 'working-with-inputs',
    title: 'Working with Inputs',
    description: 'Buttons, potentiometers, debouncing, and control panels',
    difficulty: 'beginner',
    lessonCount: 4,
    estimatedHours: 4,
    tags: ['digitalRead', 'analogRead', 'button', 'potentiometer', 'debounce'],
    pathId: 'arduino-basics',
    order: 2,
  },
  {
    id: 'working-with-outputs',
    slug: 'working-with-outputs',
    title: 'Working with Outputs',
    description: 'LEDs, buzzers, DC motors, and servo motors',
    difficulty: 'beginner',
    lessonCount: 4,
    estimatedHours: 4,
    tags: ['LED', 'buzzer', 'tone', 'motor', 'servo'],
    pathId: 'arduino-basics',
    order: 3,
  },
  // Path 4: Arduino Advanced (Projects)
  {
    id: 'traffic-light-controller',
    slug: 'traffic-light-controller',
    title: 'Traffic Light Intersection Controller',
    description: 'Build a complete traffic light system with timing and sequencing',
    difficulty: 'intermediate',
    lessonCount: 1,
    estimatedHours: 3,
    tags: ['LED', 'timing', 'state machine', 'project'],
    pathId: 'arduino-advanced',
    order: 1,
  },
  {
    id: 'smart-plant-monitor',
    slug: 'smart-plant-monitor',
    title: 'Smart Plant Monitor',
    description: 'Monitor soil moisture and automate plant watering',
    difficulty: 'intermediate',
    lessonCount: 1,
    estimatedHours: 3,
    tags: ['soil moisture', 'automation', 'sensor', 'project'],
    pathId: 'arduino-advanced',
    order: 2,
  },
  {
    id: 'burglar-alarm-system',
    slug: 'burglar-alarm-system',
    title: 'Mini Burglar Alarm System',
    description: 'Create a motion-detecting security alarm',
    difficulty: 'intermediate',
    lessonCount: 1,
    estimatedHours: 3,
    tags: ['PIR', 'buzzer', 'security', 'project'],
    pathId: 'arduino-advanced',
    order: 3,
  },
  {
    id: 'simple-robot',
    slug: 'simple-robot',
    title: 'Simple Robot',
    description: 'Build a line follower or obstacle avoider robot',
    difficulty: 'advanced',
    lessonCount: 1,
    estimatedHours: 5,
    tags: ['motor', 'sensor', 'robot', 'project'],
    pathId: 'arduino-advanced',
    order: 4,
  },
  // Path 5: Arduino Networking
  {
    id: 'serial-communication',
    slug: 'serial-communication',
    title: 'Serial Bus Communication',
    description: 'Serial Monitor and multi-device communication basics',
    difficulty: 'beginner',
    lessonCount: 1,
    estimatedHours: 2,
    tags: ['Serial', 'UART', 'communication'],
    pathId: 'arduino-networking',
    order: 1,
  },
  {
    id: 'ir-remote-control',
    slug: 'ir-remote-control',
    title: 'IR Remote Control',
    description: 'Control Arduino with infrared remote',
    difficulty: 'beginner',
    lessonCount: 1,
    estimatedHours: 2,
    tags: ['IR', 'remote', 'receiver'],
    pathId: 'arduino-networking',
    order: 2,
  },
  {
    id: 'bluetooth-communication',
    slug: 'bluetooth-communication',
    title: 'Bluetooth Communication',
    description: 'Wireless communication with Bluetooth modules',
    difficulty: 'intermediate',
    lessonCount: 1,
    estimatedHours: 3,
    tags: ['Bluetooth', 'HC-05', 'wireless'],
    pathId: 'arduino-networking',
    order: 3,
  },
  {
    id: 'wifi-web-server',
    slug: 'wifi-web-server',
    title: 'Wi-Fi and Simple Web Server',
    description: 'Connect Arduino to Wi-Fi and create a web interface',
    difficulty: 'intermediate',
    lessonCount: 1,
    estimatedHours: 4,
    tags: ['WiFi', 'ESP8266', 'web server', 'IoT'],
    pathId: 'arduino-networking',
    order: 4,
  },
  // Path 6: Raspberry Pi
  {
    id: 'linux-basics',
    slug: 'linux-basics',
    title: 'Linux OS Basics on Raspberry Pi',
    description: 'Introduction to Linux and Raspberry Pi setup',
    difficulty: 'beginner',
    lessonCount: 1,
    estimatedHours: 3,
    tags: ['Linux', 'Raspberry Pi', 'terminal', 'setup'],
    pathId: 'raspberry-pi',
    order: 1,
  },
  {
    id: 'gpio-pins',
    slug: 'gpio-pins',
    title: 'Controlling GPIO Pins',
    description: 'Control Raspberry Pi GPIO pins for input and output',
    difficulty: 'beginner',
    lessonCount: 1,
    estimatedHours: 2,
    tags: ['GPIO', 'Raspberry Pi', 'pins'],
    pathId: 'raspberry-pi',
    order: 2,
  },
  {
    id: 'gpio-python',
    slug: 'gpio-python',
    title: 'GPIO with Python Scripts',
    description: 'Communicate with local apps using Python',
    difficulty: 'intermediate',
    lessonCount: 1,
    estimatedHours: 3,
    tags: ['GPIO', 'Python', 'scripting', 'Raspberry Pi'],
    pathId: 'raspberry-pi',
    order: 3,
  },
  {
    id: 'gpio-device-communication',
    slug: 'gpio-device-communication',
    title: 'GPIO Device Communication',
    description: 'Communicate with Arduino using I2C and SPI',
    difficulty: 'advanced',
    lessonCount: 1,
    estimatedHours: 4,
    tags: ['I2C', 'SPI', 'Arduino', 'Raspberry Pi', 'communication'],
    pathId: 'raspberry-pi',
    order: 4,
  },
];

/** Course translations for localization */
const courseTranslations: Record<string, { ro: { title: string; description: string }; en: { title: string; description: string } }> = {
  // Path 1: Electronic Engineering
  'passive-components': {
    ro: { title: 'Componente Pasive', description: 'LED-uri, rezistoare, butoane și întrerupătoare' },
    en: { title: 'Passive Components', description: 'LEDs, resistors, buttons and switches fundamentals' },
  },
  'active-components': {
    ro: { title: 'Componente Active', description: 'Tranzistoare, condensatoare și circuite integrate' },
    en: { title: 'Active Components', description: 'Transistors, capacitors, and integrated circuits' },
  },
  'electromechanical-components': {
    ro: { title: 'Componente Electromecanice', description: 'Bobine, motoare, solenoizi și relee' },
    en: { title: 'Electromechanical Components', description: 'Inductors, motors, solenoids, and relays' },
  },
  // Path 2: Electronic Sensors
  'vision-detection-sensors': {
    ro: { title: 'Senzori de Viziune / Detecție', description: 'Senzori ultrasonici, de lumină, mișcare, proximitate și IR' },
    en: { title: 'Vision / Detection Sensors', description: 'Ultrasonic, light, motion, proximity, and IR sensors' },
  },
  'environmental-monitoring-sensors': {
    ro: { title: 'Senzori de Monitorizare a Mediului', description: 'Senzori de temperatură, umiditate, umiditate sol, gaz și presiune' },
    en: { title: 'Environmental Monitoring Sensors', description: 'Temperature, humidity, soil moisture, gas, and pressure sensors' },
  },
  'consumer-electronics-sensors': {
    ro: { title: 'Senzori pentru Electronică de Consum', description: 'Accelerometre, giroscoape, senzori tactili și de vibrație' },
    en: { title: 'Consumer Electronics Sensors', description: 'Accelerometers, gyroscopes, touch, and vibration sensors' },
  },
  // Path 3: Arduino Basics
  'embedded-programming-basics': {
    ro: { title: 'Bazele Programării Embedded', description: 'Control LED-uri, PWM, timing și funcții Arduino' },
    en: { title: 'Embedded Programming Basics', description: 'LED control, PWM, timing, and Arduino functions' },
  },
  'working-with-inputs': {
    ro: { title: 'Lucrul cu Intrări', description: 'Butoane, potențiometre, debouncing și panouri de control' },
    en: { title: 'Working with Inputs', description: 'Buttons, potentiometers, debouncing, and control panels' },
  },
  'working-with-outputs': {
    ro: { title: 'Lucrul cu Ieșiri', description: 'LED-uri, buzzere, motoare DC și servomotoare' },
    en: { title: 'Working with Outputs', description: 'LEDs, buzzers, DC motors, and servo motors' },
  },
  // Path 4: Arduino Advanced (Projects)
  'traffic-light-controller': {
    ro: { title: 'Controler de Intersecție cu Semafoare', description: 'Construiește un sistem complet de semafoare cu timing și secvențiere' },
    en: { title: 'Traffic Light Intersection Controller', description: 'Build a complete traffic light system with timing and sequencing' },
  },
  'smart-plant-monitor': {
    ro: { title: 'Monitor Inteligent pentru Plante', description: 'Monitorizează umiditatea solului și automatizează udarea plantelor' },
    en: { title: 'Smart Plant Monitor', description: 'Monitor soil moisture and automate plant watering' },
  },
  'burglar-alarm-system': {
    ro: { title: 'Sistem Mini de Alarmă Antifurt', description: 'Creează o alarmă de securitate cu detectare de mișcare' },
    en: { title: 'Mini Burglar Alarm System', description: 'Create a motion-detecting security alarm' },
  },
  'simple-robot': {
    ro: { title: 'Robot Simplu', description: 'Construiește un robot care urmărește linia sau evită obstacole' },
    en: { title: 'Simple Robot', description: 'Build a line follower or obstacle avoider robot' },
  },
  // Path 5: Arduino Networking
  'serial-communication': {
    ro: { title: 'Comunicare Serial', description: 'Serial Monitor și bazele comunicării multi-dispozitiv' },
    en: { title: 'Serial Bus Communication', description: 'Serial Monitor and multi-device communication basics' },
  },
  'ir-remote-control': {
    ro: { title: 'Control cu Telecomandă IR', description: 'Controlează Arduino-ul cu telecomandă infraroșu' },
    en: { title: 'IR Remote Control', description: 'Control Arduino with infrared remote' },
  },
  'bluetooth-communication': {
    ro: { title: 'Comunicare Bluetooth', description: 'Comunicare wireless cu module Bluetooth' },
    en: { title: 'Bluetooth Communication', description: 'Wireless communication with Bluetooth modules' },
  },
  'wifi-web-server': {
    ro: { title: 'Wi-Fi și Server Web Simplu', description: 'Conectează Arduino la Wi-Fi și creează o interfață web' },
    en: { title: 'Wi-Fi and Simple Web Server', description: 'Connect Arduino to Wi-Fi and create a web interface' },
  },
  // Path 6: Raspberry Pi
  'linux-basics': {
    ro: { title: 'Bazele Linux pe Raspberry Pi', description: 'Introducere în Linux și configurarea Raspberry Pi' },
    en: { title: 'Linux OS Basics on Raspberry Pi', description: 'Introduction to Linux and Raspberry Pi setup' },
  },
  'gpio-pins': {
    ro: { title: 'Controlul Pinilor GPIO', description: 'Controlează pinii GPIO pentru intrare și ieșire' },
    en: { title: 'Controlling GPIO Pins', description: 'Control Raspberry Pi GPIO pins for input and output' },
  },
  'gpio-python': {
    ro: { title: 'GPIO cu Scripturi Python', description: 'Comunică cu aplicații locale folosind Python' },
    en: { title: 'GPIO with Python Scripts', description: 'Communicate with local apps using Python' },
  },
  'gpio-device-communication': {
    ro: { title: 'Comunicare GPIO cu Dispozitive', description: 'Comunică cu Arduino folosind I2C și SPI' },
    en: { title: 'GPIO Device Communication', description: 'Communicate with Arduino using I2C and SPI' },
  },
};

/** Get course metadata with localized title */
export function getCourse(courseId: string, language: Language): CourseMeta | undefined {
  const course = coursesManifest.find((c) => c.id === courseId);
  if (!course) return undefined;

  const translations = courseTranslations[course.id];
  if (translations && translations[language]) {
    return {
      ...course,
      title: translations[language].title,
      description: translations[language].description,
    };
  }

  return course;
}

/** Get lessons for a specific language */
export function getLessonsByLanguage(language: Language): LessonMeta[] {
  return generatedLessonsManifest
    .filter((lesson) => lesson.language === language)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

/** Get lessons for a specific course and language */
export function getLessonsByCourse(courseId: string, language: Language): LessonMeta[] {
  return getLessonsByLanguage(language)
    .filter((lesson) => lesson.course === courseId);
}

/** Get a specific lesson by slug and language */
export function getLesson(slug: string, language: Language): LessonMeta | undefined {
  return generatedLessonsManifest.find(
    (lesson) => lesson.slug === slug && lesson.language === language
  );
}

/** Get next and previous lessons */
export function getAdjacentLessons(
  slug: string,
  language: Language
): { prev?: LessonMeta; next?: LessonMeta } {
  const lessons = getLessonsByLanguage(language);
  const currentIndex = lessons.findIndex((l) => l.slug === slug);

  if (currentIndex === -1) {
    return {};
  }

  return {
    prev: currentIndex > 0 ? lessons[currentIndex - 1] : undefined,
    next: currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : undefined,
  };
}

/** Get courses for a specific path with localized content (only courses with available lessons) */
export function getCoursesByPath(pathId: string, language: Language): CourseMeta[] {
  // Get all lessons for the language once and build a set of course IDs that have lessons
  const lessonsForLanguage = getLessonsByLanguage(language);
  const courseIdsWithLessons = new Set(lessonsForLanguage.map((l) => l.course));

  return coursesManifest
    .filter((course) => course.pathId === pathId)
    .filter((course) => courseIdsWithLessons.has(course.id))
    .map((course) => {
      const translations = courseTranslations[course.id];
      if (translations && translations[language]) {
        return {
          ...course,
          title: translations[language].title,
          description: translations[language].description,
        };
      }
      return course;
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

/** Get all courses with localized content (only courses with available lessons) */
export function getAllCourses(language: Language): CourseMeta[] {
  // Get all lessons for the language once and build a set of course IDs that have lessons
  const lessonsForLanguage = getLessonsByLanguage(language);
  const courseIdsWithLessons = new Set(lessonsForLanguage.map((l) => l.course));

  return coursesManifest
    .filter((course) => courseIdsWithLessons.has(course.id))
    .map((course) => {
      const translations = courseTranslations[course.id];
      if (translations && translations[language]) {
        return {
          ...course,
          title: translations[language].title,
          description: translations[language].description,
        };
      }
      return course;
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}
