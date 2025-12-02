/**
 * Lessons Manifest
 * Lists all available lessons with their metadata
 * 
 * TODO: Auto-generate this from MDX files at build time
 * For now, manually maintained
 */

import type { LessonMeta, CourseMeta, Language } from './types';

/** All available lessons - currently placeholder for existing content */
// NOTE: YouTube URLs are placeholder examples. Replace with actual tutorial video URLs.
export const lessonsManifest: LessonMeta[] = [
  // ==========================================
  // EXISTING LESSONS (keep for backward compatibility)
  // ==========================================
  // Romanian lessons - Arduino Basics - Embedded Programming Basics
  {
    id: 'basics-blink-ro',
    slug: 'basics-blink',
    title: 'LED Blink de bază',
    description: 'Învață să aprinzi și să stingi un LED folosind Arduino.',
    course: 'embedded-programming-basics',
    difficulty: 'beginner',
    tags: ['digitalWrite', 'delay', 'pinMode', 'LED'],
    estimatedMinutes: 20,
    tinkercadUrl: 'https://www.tinkercad.com/things/example-blink',
    youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID',
    keyPoints: [
      { title: 'Înțelegerea LED-urilor', description: 'Cum funcționează diodele emițătoare de lumină' },
      { title: 'Funcția pinMode()', description: 'Configurarea pinilor ca intrări sau ieșiri' },
      { title: 'Bazele digitalWrite()', description: 'Controlul semnalelor digitale de ieșire' },
      { title: 'Folosirea delay()', description: 'Crearea temporizărilor în programele tale' },
    ],
    hasInteractiveExercises: true,
    language: 'ro',
    order: 1,
  },
  {
    id: 'pwm-led-ro',
    slug: 'pwm-led',
    title: 'Control PWM pentru LED',
    description: 'Folosește PWM pentru a controla luminozitatea LED-ului.',
    course: 'embedded-programming-basics',
    difficulty: 'beginner',
    tags: ['analogWrite', 'PWM', 'LED', 'fade'],
    estimatedMinutes: 25,
    tinkercadUrl: 'https://www.tinkercad.com/things/example-pwm',
    youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID',
    keyPoints: [
      { title: 'Ce este PWM', description: 'Modularea lățimii pulsului explicată' },
      { title: 'Funcția analogWrite()', description: 'Controlul valorilor analogice pe pinii PWM' },
      { title: 'Ciclul de funcționare', description: 'Înțelegerea procentelor de luminozitate' },
      { title: 'Efecte de fade', description: 'Crearea tranzițiilor de luminozitate fluide' },
    ],
    hasInteractiveExercises: true,
    language: 'ro',
    order: 3,
  },
  // English lessons - Arduino Basics - Embedded Programming Basics
  {
    id: 'basics-blink-en',
    slug: 'basics-blink',
    title: 'Basic LED Blink',
    description: 'Learn to turn an LED on and off using Arduino.',
    course: 'embedded-programming-basics',
    difficulty: 'beginner',
    tags: ['digitalWrite', 'delay', 'pinMode', 'LED'],
    estimatedMinutes: 20,
    tinkercadUrl: 'https://www.tinkercad.com/things/example-blink',
    youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID',
    keyPoints: [
      { title: 'Understanding LEDs', description: 'Learn how Light Emitting Diodes work and their polarity' },
      { title: 'The pinMode() function', description: 'Configure pins as inputs or outputs' },
      { title: 'digitalWrite() basics', description: 'Control digital output signals' },
      { title: 'Using delay()', description: 'Create timing in your programs' },
    ],
    hasInteractiveExercises: true,
    language: 'en',
    order: 1,
  },
  {
    id: 'pwm-led-en',
    slug: 'pwm-led',
    title: 'PWM LED Control',
    description: 'Use PWM to control LED brightness.',
    course: 'embedded-programming-basics',
    difficulty: 'beginner',
    tags: ['analogWrite', 'PWM', 'LED', 'fade'],
    estimatedMinutes: 25,
    tinkercadUrl: 'https://www.tinkercad.com/things/example-pwm',
    youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID',
    keyPoints: [
      { title: 'What is PWM', description: 'Pulse Width Modulation explained' },
      { title: 'The analogWrite() function', description: 'Control analog values on PWM pins' },
      { title: 'Duty cycle', description: 'Understanding brightness percentages' },
      { title: 'Fade effects', description: 'Creating smooth brightness transitions' },
    ],
    hasInteractiveExercises: true,
    language: 'en',
    order: 3,
  },

  // ==========================================
  // PATH 1: ELECTRONIC ENGINEERING - English
  // ==========================================
  // Course: Passive Components
  { id: 'p1-c1-l1-leds-resistors-en', slug: 'p1-c1-l1-leds-resistors', title: 'How LEDs and Resistors Work', description: 'Learn V/I/R, LED polarity, and resistor calculations.', course: 'passive-components', difficulty: 'beginner', tags: ['LED', 'resistor', 'V/I/R', 'polarity'], estimatedMinutes: 25, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "Ohm's Law Basics", description: "Understanding V = I × R relationships" }, { title: "LED Polarity", description: "Identifying anode (long leg) and cathode (short leg)" }, { title: "Why Resistors Matter", description: "Current limiting to protect LEDs" }, { title: "Resistor Calculations", description: "Choosing values for 5V and 3.3V systems" }],  language: 'en', order: 1 },
  { id: 'p1-c1-l2-buttons-switches-en', slug: 'p1-c1-l2-buttons-switches', title: 'Buttons & Switches (Series vs Parallel)', description: 'Learn button logic: series=AND, parallel=OR.', course: 'passive-components', difficulty: 'beginner', tags: ['button', 'switch', 'AND', 'OR', 'logic'], estimatedMinutes: 25, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "Button Basics", description: "Open and closed states in circuits" }, { title: "Series = AND Logic", description: "Both buttons must be pressed for current flow" }, { title: "Parallel = OR Logic", description: "Either button allows current flow" }, { title: "Reading Circuit Logic", description: "Understanding truth tables from circuits" }],  language: 'en', order: 2 },
  // Course: Active Components
  { id: 'p1-c2-l1-transistors-switches-en', slug: 'p1-c2-l1-transistors-switches', title: 'Transistors as Switches', description: 'NPN transistors to control high-current loads.', course: 'active-components', difficulty: 'intermediate', tags: ['transistor', 'NPN', 'switch', 'motor'], estimatedMinutes: 30, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "NPN Transistor Symbol", description: "Understanding Base, Collector, Emitter pins" }, { title: "Current Amplification", description: "Small base current controls large load" }, { title: "Switching High-Power Loads", description: "Controlling motors and LED strips" }, { title: "Protection Diodes", description: "Protecting transistors from back-EMF" }],  language: 'en', order: 1 },
  { id: 'p1-c2-l2-capacitors-en', slug: 'p1-c2-l2-capacitors', title: 'Capacitors (Charging & Discharging)', description: 'Capacitor basics and RC timing circuits.', course: 'active-components', difficulty: 'intermediate', tags: ['capacitor', 'RC', 'timing', 'charge'], estimatedMinutes: 30, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "Capacitor Symbol & Types", description: "Ceramic vs electrolytic capacitors" }, { title: "Charging Behavior", description: "How capacitors store energy" }, { title: "Discharging Behavior", description: "How capacitors release energy" }, { title: "RC Time Constant", description: "τ = R × C for timing circuits" }],  language: 'en', order: 2 },
  { id: 'p1-c2-l3-ics-555-shift-registers-en', slug: 'p1-c2-l3-ics-555-shift-registers', title: 'ICs – 555 Timers & Shift Registers', description: '555 oscillator and 74HC595 output expansion.', course: 'active-components', difficulty: 'intermediate', tags: ['IC', '555', 'shift register', '74HC595'], estimatedMinutes: 35, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "What are ICs", description: "Integrated circuits as building blocks" }, { title: "555 Timer Basics", description: "Creating oscillator and timing circuits" }, { title: "74HC595 Shift Register", description: "Serial to parallel output expansion" }, { title: "Expanding Arduino Outputs", description: "Control 8 outputs with 3 pins" }],  language: 'en', order: 3 },
  // Course: Electromechanical Components
  { id: 'p1-c3-l1-inductors-en', slug: 'p1-c3-l1-inductors', title: 'Inductors – Coils That Resist Change', description: 'Inductors, magnetic fields, and voltage spikes.', course: 'electromechanical-components', difficulty: 'intermediate', tags: ['inductor', 'coil', 'magnetic field', 'EMF'], estimatedMinutes: 30, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "Inductor Symbol", description: "Recognizing inductors in schematics" }, { title: "Opposing Current Changes", description: "How inductors resist sudden changes" }, { title: "Magnetic Field Energy", description: "Energy storage in magnetic fields" }, { title: "Switch-Off Voltage Spikes", description: "Understanding and protecting against spikes" }],  language: 'en', order: 1 },
  { id: 'p1-c3-l2-motors-en', slug: 'p1-c3-l2-motors', title: 'Motors – Turning Electricity into Motion', description: 'DC and servo motors with PWM speed control.', course: 'electromechanical-components', difficulty: 'intermediate', tags: ['motor', 'DC', 'servo', 'PWM'], estimatedMinutes: 30, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "DC vs Servo Motors", description: "Continuous rotation vs position control" }, { title: "PWM Speed Control", description: "Using pulse width modulation for speed" }, { title: "Direction Control", description: "Basic H-bridge concepts" }, { title: "Motor Protection", description: "Flyback diodes and current limiting" }],  language: 'en', order: 2 },
  { id: 'p1-c3-l3-solenoids-en', slug: 'p1-c3-l3-solenoids', title: 'Solenoids – Linear Motion from Coils', description: 'Solenoid structure and flyback protection.', course: 'electromechanical-components', difficulty: 'intermediate', tags: ['solenoid', 'coil', 'plunger', 'flyback'], estimatedMinutes: 25, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "Solenoid Structure", description: "Coil and plunger components" }, { title: "Linear Motion", description: "Converting electrical to mechanical motion" }, { title: "Energizing Solenoids", description: "Current requirements and timing" }, { title: "Flyback Diode Protection", description: "Essential protection circuitry" }],  language: 'en', order: 3 },
  { id: 'p1-c3-l4-relays-en', slug: 'p1-c3-l4-relays', title: 'Relays – Electrically Controlled Switches', description: 'Relay coils, NO/NC contacts, and isolation.', course: 'electromechanical-components', difficulty: 'intermediate', tags: ['relay', 'NO', 'NC', 'isolation'], estimatedMinutes: 30, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "Relay Components", description: "Coil and contact mechanisms" }, { title: "NO/NC Contacts", description: "Normally Open vs Normally Closed" }, { title: "Voltage Isolation", description: "Separating low and high voltage circuits" }, { title: "Relay Selection", description: "Choosing the right relay for your load" }],  language: 'en', order: 4 },

  // ==========================================
  // PATH 2: ELECTRONIC SENSORS - English
  // ==========================================
  // Course: Vision/Detection Sensors
  { id: 'p2-c1-l1-ultrasonic-sensor-en', slug: 'p2-c1-l1-ultrasonic-sensor', title: 'Ultrasonic Distance Sensor', description: 'HC-SR04 distance measurement basics.', course: 'vision-detection-sensors', difficulty: 'intermediate', tags: ['ultrasonic', 'HC-SR04', 'distance'], estimatedMinutes: 30, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "HC-SR04 Pins", description: "VCC, GND, Trig, and Echo connections" }, { title: "Echo Time to Distance", description: "Converting pulse duration to centimeters" }, { title: "pulseIn() Function", description: "Measuring echo pulse duration" }, { title: "Distance-Based Control", description: "Triggering actions at specific distances" }],  language: 'en', order: 1 },
  { id: 'p2-c1-l2-light-sensor-ldr-en', slug: 'p2-c1-l2-light-sensor-ldr', title: 'Light Sensor (LDR)', description: 'Light dependent resistors and voltage dividers.', course: 'vision-detection-sensors', difficulty: 'beginner', tags: ['LDR', 'light', 'analog', 'photoresistor'], estimatedMinutes: 25, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "LDR Characteristics", description: "Resistance changes with light intensity" }, { title: "Voltage Divider Circuit", description: "Converting resistance to voltage" }, { title: "analogRead() Values", description: "Reading 0-1023 brightness levels" }, { title: "Threshold-Based Control", description: "Light/dark triggered actions" }],  language: 'en', order: 2 },
  { id: 'p2-c1-l3-pir-motion-en', slug: 'p2-c1-l3-pir-motion', title: 'PIR Motion Detection', description: 'Passive infrared motion sensors for alarms.', course: 'vision-detection-sensors', difficulty: 'intermediate', tags: ['PIR', 'motion', 'infrared', 'detection'], estimatedMinutes: 25, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "PIR Field of View", description: "Detection cone and range" }, { title: "HIGH/LOW Output", description: "Digital motion detection signal" }, { title: "Sensitivity Adjustment", description: "Tuning detection sensitivity" }, { title: "Alarm Applications", description: "Simple motion-triggered projects" }],  language: 'en', order: 3 },
  { id: 'p2-c1-l4-proximity-sensors-en', slug: 'p2-c1-l4-proximity-sensors', title: 'Proximity Sensors', description: 'Threshold detection and avoiding false triggers.', course: 'vision-detection-sensors', difficulty: 'intermediate', tags: ['proximity', 'threshold', 'detection'], estimatedMinutes: 25, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "Proximity vs Distance", description: "Presence detection vs measurement" }, { title: "Threshold Detection", description: "Binary near/far output" }, { title: "Avoiding False Triggers", description: "Environmental considerations" }, { title: "Hysteresis", description: "Different ON/OFF thresholds for stability" }],  language: 'en', order: 4 },
  { id: 'p2-c1-l5-ir-communication-en', slug: 'p2-c1-l5-ir-communication', title: 'IR Communication Sensors & Transmitters', description: 'IR remotes and modulated signals.', course: 'vision-detection-sensors', difficulty: 'intermediate', tags: ['IR', 'remote', 'communication', 'receiver'], estimatedMinutes: 30, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "IR LED vs Receiver", description: "Transmitter and receiver components" }, { title: "Modulated IR Signals", description: "38kHz carrier frequency" }, { title: "Reading Remote Codes", description: "Decoding hex values from remotes" }, { title: "Mapping Codes to Actions", description: "Triggering Arduino functions" }],  language: 'en', order: 5 },
  // Course: Environmental Monitoring Sensors
  { id: 'p2-c2-l1-temperature-humidity-dht-en', slug: 'p2-c2-l1-temperature-humidity-dht', title: 'Temperature & Humidity Sensors (DHT)', description: 'DHT11/DHT22 for environmental monitoring.', course: 'environmental-monitoring-sensors', difficulty: 'intermediate', tags: ['DHT11', 'DHT22', 'temperature', 'humidity'], estimatedMinutes: 25, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "DHT Sensor Wiring", description: "Power, data, and pull-up resistor" }, { title: "Reading Temperature", description: "Celsius and Fahrenheit values" }, { title: "Reading Humidity", description: "Relative humidity percentage" }, { title: "Comfort Ranges", description: "Ideal temperature and humidity levels" }],  language: 'en', order: 1 },
  { id: 'p2-c2-l2-soil-moisture-en', slug: 'p2-c2-l2-soil-moisture', title: 'Soil Moisture Sensors', description: 'Plant monitoring and automated watering.', course: 'environmental-monitoring-sensors', difficulty: 'intermediate', tags: ['soil', 'moisture', 'plant', 'gardening'], estimatedMinutes: 25, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "Sensor Wiring", description: "Power and analog signal connections" }, { title: "Moisture Range Mapping", description: "Calibrating wet and dry values" }, { title: "Water Threshold", description: "When plants need watering" }, { title: "Plant Health Indicators", description: "Visual feedback systems" }],  language: 'en', order: 2 },
  { id: 'p2-c2-l3-gas-sensors-mq-en', slug: 'p2-c2-l3-gas-sensors-mq', title: 'Gas Level Sensors (MQ)', description: 'MQ sensors for air quality monitoring.', course: 'environmental-monitoring-sensors', difficulty: 'intermediate', tags: ['MQ', 'gas', 'air quality', 'smoke'], estimatedMinutes: 30, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "MQ Sensor Basics", description: "Different sensors for different gases" }, { title: "Warm-Up Time", description: "Pre-heating for accurate readings" }, { title: "Analog Output Reading", description: "Concentration vs voltage" }, { title: "Air Quality Zones", description: "Green/yellow/red indicator levels" }],  language: 'en', order: 3 },
  { id: 'p2-c2-l4-atmospheric-pressure-en', slug: 'p2-c2-l4-atmospheric-pressure', title: 'Atmospheric Pressure Sensors', description: 'BMP/BME sensors and weather correlation.', course: 'environmental-monitoring-sensors', difficulty: 'intermediate', tags: ['BMP', 'BME', 'pressure', 'weather', 'I2C'], estimatedMinutes: 30, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "BMP/BME Wiring", description: "I2C connection to Arduino" }, { title: "Reading Pressure", description: "hPa and altitude calculations" }, { title: "Weather Correlation", description: "Pressure patterns and forecasting" }, { title: "Altitude Estimation", description: "Calculating height from pressure" }],  language: 'en', order: 4 },
  // Course: Consumer Electronics Sensors
  { id: 'p2-c3-l1-accelerometers-gyros-en', slug: 'p2-c3-l1-accelerometers-gyros', title: 'Accelerometers & Gyros', description: 'IMU sensors for tilt and motion detection.', course: 'consumer-electronics-sensors', difficulty: 'intermediate', tags: ['accelerometer', 'gyroscope', 'IMU', 'tilt'], estimatedMinutes: 35, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "Tilt Switch Introduction", description: "Simple orientation detection" }, { title: "Accelerometer Axes", description: "X, Y, Z acceleration vectors" }, { title: "Reading Orientation", description: "Tilt angles from acceleration" }, { title: "Motion Detection", description: "Detecting movement and gestures" }],  language: 'en', order: 1 },
  { id: 'p2-c3-l2-touch-sensors-en', slug: 'p2-c3-l2-touch-sensors', title: 'Touch Sensors', description: 'Capacitive touch as button replacement.', course: 'consumer-electronics-sensors', difficulty: 'intermediate', tags: ['touch', 'capacitive', 'TTP223', 'button'], estimatedMinutes: 25, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "Capacitive Touch", description: "How touch changes capacitance" }, { title: "Touch Pad Behavior", description: "HIGH/LOW output on touch" }, { title: "Button Replacement", description: "Touch vs mechanical buttons" }, { title: "Debouncing Touch", description: "Clean signal handling" }],  language: 'en', order: 2 },
  { id: 'p2-c3-l3-vibration-sensors-en', slug: 'p2-c3-l3-vibration-sensors', title: 'Vibration Sensors', description: 'Shock detection for alarms and monitoring.', course: 'consumer-electronics-sensors', difficulty: 'intermediate', tags: ['vibration', 'shock', 'SW-420', 'alarm'], estimatedMinutes: 25, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "Vibration Pulse Detection", description: "Sensing mechanical vibrations" }, { title: "Tap vs Continuous", description: "Distinguishing vibration types" }, { title: "Sensitivity Tuning", description: "Adjusting detection threshold" }, { title: "Alarm Applications", description: "Tamper detection and alerts" }],  language: 'en', order: 3 },

  // ==========================================
  // PATH 3: ARDUINO BASICS - English
  // ==========================================
  // Course: Embedded Programming Basics
  { id: 'p3-c1-l1-basic-led-blink-en', slug: 'p3-c1-l1-basic-led-blink', title: 'Basic LED Blink (Pin 13)', description: 'Your first Arduino sketch: blinking an LED.', course: 'embedded-programming-basics', difficulty: 'beginner', tags: ['LED', 'blink', 'digitalWrite', 'delay'], estimatedMinutes: 20, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "Sketch Structure", description: "setup() and loop() functions" }, { title: "pinMode() Function", description: "Configuring pins as OUTPUT" }, { title: "digitalWrite() Control", description: "HIGH and LOW states" }, { title: "delay() Timing", description: "Pausing program execution" }],  language: 'en', order: 10 },
  { id: 'p3-c1-l2-multi-led-blink-en', slug: 'p3-c1-l2-multi-led-blink', title: 'Multi-LED Blink (Pins 9, 10, 11)', description: 'Control multiple LEDs with arrays and patterns.', course: 'embedded-programming-basics', difficulty: 'beginner', tags: ['LED', 'array', 'pattern', 'multiple'], estimatedMinutes: 25, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "Multiple Outputs", description: "Controlling several LEDs" }, { title: "Arrays for Pins", description: "Storing pin numbers efficiently" }, { title: "Loop-Based Control", description: "Iterating through LED arrays" }, { title: "Blink Patterns", description: "All, chase, and alternate patterns" }],  language: 'en', order: 11 },
  { id: 'p3-c1-l3-pwm-led-fade-en', slug: 'p3-c1-l3-pwm-led-fade', title: 'PWM LED Fade (analogWrite)', description: 'Smooth LED brightness control with PWM.', course: 'embedded-programming-basics', difficulty: 'beginner', tags: ['PWM', 'analogWrite', 'fade', 'brightness'], estimatedMinutes: 25, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "PWM Concept", description: "Pulse width modulation explained" }, { title: "analogWrite() Function", description: "0-255 brightness control" }, { title: "PWM Pins", description: "Which Arduino pins support PWM" }, { title: "Fade Effects", description: "Creating smooth brightness transitions" }],  language: 'en', order: 12 },
  { id: 'p3-c1-l4-understanding-delay-en', slug: 'p3-c1-l4-understanding-delay', title: 'Understanding delay() and Timing', description: 'Blocking vs non-blocking timing approaches.', course: 'embedded-programming-basics', difficulty: 'beginner', tags: ['delay', 'timing', 'millis', 'blocking'], estimatedMinutes: 25, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "What delay() Does", description: "Blocking program execution" }, { title: "Impact on Responsiveness", description: "Why long delays cause problems" }, { title: "millis() Alternative", description: "Non-blocking timing approach" }, { title: "When to Use delay()", description: "Appropriate use cases" }],  language: 'en', order: 13 },
  { id: 'p3-c1-l5-setup-vs-loop-en', slug: 'p3-c1-l5-setup-vs-loop', title: 'setup() vs loop()', description: 'Understanding Arduino program structure.', course: 'embedded-programming-basics', difficulty: 'beginner', tags: ['setup', 'loop', 'structure', 'basics'], estimatedMinutes: 20, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "setup() Runs Once", description: "Initialization at power-on" }, { title: "loop() Repeats Forever", description: "Main program execution" }, { title: "Where to Put Code", description: "Init code vs main logic placement" }, { title: "Program Flow", description: "Understanding execution order" }],  language: 'en', order: 14 },
  // Course: Working with Inputs
  { id: 'p3-c3-l1-reading-push-button-en', slug: 'p3-c3-l1-reading-push-button', title: 'Reading a Push Button', description: 'Button wiring and INPUT_PULLUP mode.', course: 'working-with-inputs', difficulty: 'beginner', tags: ['button', 'digitalRead', 'INPUT_PULLUP'], estimatedMinutes: 25, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "Button Wiring", description: "Pull-up and pull-down configurations" }, { title: "INPUT vs INPUT_PULLUP", description: "Internal pull-up resistors" }, { title: "digitalRead() Function", description: "Reading button state" }, { title: "Button-Controlled LED", description: "Simple input-to-output logic" }],  language: 'en', order: 1 },
  { id: 'p3-c3-l2-potentiometer-analog-en', slug: 'p3-c3-l2-potentiometer-analog', title: 'Potentiometer as Analog Input', description: 'Reading variable resistance with analogRead.', course: 'working-with-inputs', difficulty: 'beginner', tags: ['potentiometer', 'analogRead', 'analog'], estimatedMinutes: 25, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "Potentiometer Wiring", description: "3-pin connection to Arduino" }, { title: "analogRead() Function", description: "Reading 0-1023 values" }, { title: "Value Mapping", description: "Converting to useful ranges" }, { title: "Variable Control", description: "Controlling LED brightness" }],  language: 'en', order: 2 },
  { id: 'p3-c3-l3-multiple-buttons-debouncing-en', slug: 'p3-c3-l3-multiple-buttons-debouncing', title: 'Multiple Buttons & Debouncing', description: 'Handling button bounce and multiple inputs.', course: 'working-with-inputs', difficulty: 'intermediate', tags: ['button', 'debounce', 'multiple inputs'], estimatedMinutes: 30, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "Multiple Input Handling", description: "Managing several buttons" }, { title: "Button Bounce", description: "Understanding the bouncing problem" }, { title: "Software Debouncing", description: "Filtering out noise" }, { title: "Clean Signal Reading", description: "Reliable button detection" }],  language: 'en', order: 3 },
  { id: 'p3-c3-l4-combining-inputs-outputs-en', slug: 'p3-c3-l4-combining-inputs-outputs', title: 'Combining Inputs and Outputs', description: 'Building interactive control panels.', course: 'working-with-inputs', difficulty: 'intermediate', tags: ['input', 'output', 'control panel', 'logic'], estimatedMinutes: 30, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "Input/Output Combination", description: "Using buttons and knobs together" }, { title: "Control Logic", description: "Writing output rules from inputs" }, { title: "Control Panel Design", description: "Building interactive interfaces" }, { title: "State Management", description: "Tracking system states" }],  language: 'en', order: 4 },
  // Course: Working with Outputs
  { id: 'p3-c4-l1-multiple-leds-patterns-en', slug: 'p3-c4-l1-multiple-leds-patterns', title: 'Multiple LEDs & Patterns', description: 'Chase, ping-pong, and binary LED patterns.', course: 'working-with-outputs', difficulty: 'intermediate', tags: ['LED', 'array', 'pattern', 'chase'], estimatedMinutes: 30, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "LED Arrays", description: "Managing multiple LED pins" }, { title: "Loop Sequences", description: "Automated pattern generation" }, { title: "Pattern Design", description: "Chase, ping-pong, binary count" }, { title: "Speed Control", description: "Adjustable pattern timing" }],  language: 'en', order: 1 },
  { id: 'p3-c4-l2-buzzer-tones-en', slug: 'p3-c4-l2-buzzer-tones', title: 'Buzzer and Tones', description: 'Making sounds with tone() and buzzers.', course: 'working-with-outputs', difficulty: 'intermediate', tags: ['buzzer', 'tone', 'music', 'sound'], estimatedMinutes: 25, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "Active vs Passive Buzzers", description: "Built-in vs external oscillator" }, { title: "tone() Function", description: "Generating specific frequencies" }, { title: "noTone() Function", description: "Stopping sound output" }, { title: "Musical Notes", description: "Mapping notes to frequencies" }],  language: 'en', order: 2 },
  { id: 'p3-c4-l3-dc-motor-transistor-en', slug: 'p3-c4-l3-dc-motor-transistor', title: 'DC Motor with Transistor', description: 'Motor control with transistors and PWM.', course: 'working-with-outputs', difficulty: 'intermediate', tags: ['motor', 'transistor', 'PWM', 'diode'], estimatedMinutes: 30, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "Motor + Transistor Wiring", description: "Current switching circuit" }, { title: "Flyback Diode", description: "Motor protection circuit" }, { title: "PWM Speed Control", description: "Analog speed adjustment" }, { title: "Safe Motor Operation", description: "Current limits and protection" }],  language: 'en', order: 3 },
  { id: 'p3-c4-l4-servo-motor-control-en', slug: 'p3-c4-l4-servo-motor-control', title: 'Servo Motor Control', description: 'Precise angle control with the Servo library.', course: 'working-with-outputs', difficulty: 'intermediate', tags: ['servo', 'Servo library', 'angle', 'position'], estimatedMinutes: 25, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "Servo vs DC Motor", description: "Position control differences" }, { title: "Servo Library", description: "Using the built-in library" }, { title: "Angle Mapping", description: "Converting input to 0-180 degrees" }, { title: "Smooth Movement", description: "Controlled servo transitions" }],  language: 'en', order: 4 },

  // ==========================================
  // PATH 4: ARDUINO ADVANCED PROJECTS - English
  // ==========================================
  { id: 'p4-c1-l1-traffic-light-controller-en', slug: 'p4-c1-l1-traffic-light-controller', title: 'Project – Traffic Light Controller', description: 'State machine traffic light with pedestrian button.', course: 'traffic-light-controller', difficulty: 'intermediate', tags: ['LED', 'state machine', 'timing', 'project'], estimatedMinutes: 45, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "State-Based Logic", description: "Managing light phases with states" }, { title: "Timed Phase Transitions", description: "Automatic state changes" }, { title: "Pedestrian Button", description: "Interrupt-based crossing requests" }, { title: "Safety Considerations", description: "All-red transition states" }],  language: 'en', order: 1 },
  { id: 'p4-c2-l1-smart-plant-monitor-en', slug: 'p4-c2-l1-smart-plant-monitor', title: 'Project – Smart Plant Monitor', description: 'Soil moisture monitoring with visual feedback.', course: 'smart-plant-monitor', difficulty: 'intermediate', tags: ['soil moisture', 'automation', 'sensor', 'project'], estimatedMinutes: 40, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "Sensor Integration", description: "Soil moisture monitoring" }, { title: "Threshold Settings", description: "Defining dry/wet boundaries" }, { title: "Visual Feedback", description: "LED indicators for plant status" }, { title: "Automation Basics", description: "Triggering watering actions" }],  language: 'en', order: 1 },
  { id: 'p4-c3-l1-mini-burglar-alarm-en', slug: 'p4-c3-l1-mini-burglar-alarm', title: 'Project – Mini Burglar Alarm', description: 'PIR motion alarm with armed/triggered states.', course: 'burglar-alarm-system', difficulty: 'intermediate', tags: ['PIR', 'buzzer', 'alarm', 'security', 'project'], estimatedMinutes: 40, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "System States", description: "Armed, triggered, and idle modes" }, { title: "PIR Motion Trigger", description: "Detecting intruders" }, { title: "Alarm Output", description: "Buzzer and LED alerts" }, { title: "User Interface", description: "Arming and disarming controls" }],  language: 'en', order: 1 },
  { id: 'p4-c4-l1-simple-robot-en', slug: 'p4-c4-l1-simple-robot', title: 'Project – Simple Robot (Line/Obstacle)', description: 'Line follower or obstacle avoiding robot.', course: 'simple-robot', difficulty: 'advanced', tags: ['robot', 'motor', 'sensor', 'line follower'], estimatedMinutes: 60, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "Differential Drive", description: "Two-wheel steering basics" }, { title: "Sensor-Based Decisions", description: "Line or obstacle detection" }, { title: "Motor Control Logic", description: "Speed and direction algorithms" }, { title: "Threshold Tuning", description: "Calibrating sensor responses" }],  language: 'en', order: 1 },

  // ==========================================
  // PATH 5: ARDUINO NETWORKING - English
  // ==========================================
  { id: 'p5-c1-l1-serial-communication-en', slug: 'p5-c1-l1-serial-communication', title: 'Serial Communication Basics', description: 'Serial.begin/print/read and simple protocols.', course: 'serial-communication', difficulty: 'intermediate', tags: ['Serial', 'UART', 'baud rate', 'communication'], estimatedMinutes: 30, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "Serial.begin()", description: "Setting baud rate" }, { title: "Serial.print()", description: "Sending data to computer" }, { title: "Serial.read()", description: "Receiving commands" }, { title: "Simple Protocols", description: "Command-based communication" }],  language: 'en', order: 1 },
  { id: 'p5-c2-l1-ir-remote-control-en', slug: 'p5-c2-l1-ir-remote-control', title: 'IR Remote Control with Arduino', description: 'Decode IR codes and map to actions.', course: 'ir-remote-control', difficulty: 'intermediate', tags: ['IR', 'remote', 'control', 'IRremote'], estimatedMinutes: 30, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "IR Code Decoding", description: "Reading remote button codes" }, { title: "IRremote Library", description: "Using the IR receiver library" }, { title: "Code Mapping", description: "Assigning codes to actions" }, { title: "Remote-Controlled Outputs", description: "Controlling LEDs and motors" }],  language: 'en', order: 1 },
  { id: 'p5-c3-l1-bluetooth-communication-en', slug: 'p5-c3-l1-bluetooth-communication', title: 'Bluetooth Communication', description: 'HC-05/06 wireless serial communication.', course: 'bluetooth-communication', difficulty: 'intermediate', tags: ['Bluetooth', 'HC-05', 'wireless', 'serial'], estimatedMinutes: 35, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "HC-05/06 Wiring", description: "UART connection to Arduino" }, { title: "Pairing Process", description: "Connecting from phone/PC" }, { title: "Serial over Bluetooth", description: "Wireless serial commands" }, { title: "Mobile App Control", description: "Using phone to control Arduino" }],  language: 'en', order: 1 },
  { id: 'p5-c4-l1-wifi-web-server-en', slug: 'p5-c4-l1-wifi-web-server', title: 'Wi-Fi & Simple Web Server', description: 'ESP8266/ESP32 web server for IoT control.', course: 'wifi-web-server', difficulty: 'advanced', tags: ['WiFi', 'ESP8266', 'web server', 'IoT'], estimatedMinutes: 45, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "ESP Wi-Fi Connection", description: "Connecting to your network" }, { title: "Minimal Web Server", description: "Serving a simple HTML page" }, { title: "HTTP Pin Control", description: "Toggle outputs via web requests" }, { title: "IoT Basics", description: "Internet-connected devices" }],  language: 'en', order: 1 },

  // ==========================================
  // PATH 6: RASPBERRY PI - English
  // ==========================================
  { id: 'p6-c1-l1-linux-basics-en', slug: 'p6-c1-l1-linux-basics', title: 'Linux Basics on Raspberry Pi', description: 'Terminal commands: ls, cd, mkdir, nano.', course: 'linux-basics', difficulty: 'intermediate', tags: ['Linux', 'Raspberry Pi', 'terminal', 'commands'], estimatedMinutes: 40, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "Booting Raspberry Pi", description: "First power-on steps" }, { title: "Terminal Basics", description: "Opening and using the terminal" }, { title: "Core Commands", description: "ls, cd, mkdir, nano essentials" }, { title: "File Management", description: "Creating and editing files" }],  language: 'en', order: 1 },
  { id: 'p6-c2-l1-gpio-control-en', slug: 'p6-c2-l1-gpio-control', title: 'Raspberry Pi GPIO Control', description: 'GPIO numbering and gpiozero library.', course: 'gpio-pins', difficulty: 'intermediate', tags: ['GPIO', 'Raspberry Pi', 'Python', 'gpiozero'], estimatedMinutes: 35, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "GPIO Numbering", description: "BCM vs Board pin numbers" }, { title: "gpiozero Library", description: "Simple Python GPIO control" }, { title: "LED Control Script", description: "Blinking LED with Python" }, { title: "Button Input Script", description: "Reading button presses" }],  language: 'en', order: 1 },
  { id: 'p6-c3-l1-gpio-local-apps-en', slug: 'p6-c3-l1-gpio-local-apps', title: 'GPIO with Local Apps', description: 'Event-driven GPIO with Python UIs.', course: 'gpio-python', difficulty: 'intermediate', tags: ['GPIO', 'Python', 'event-driven', 'UI'], estimatedMinutes: 35, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "Event-Driven Scripts", description: "Responding to GPIO events" }, { title: "Python UI Integration", description: "Linking GPIO to GUI apps" }, { title: "Data Logging", description: "Recording sensor data" }, { title: "Local App Communication", description: "GPIO to application bridge" }],  language: 'en', order: 1 },
  { id: 'p6-c4-l1-gpio-device-communication-en', slug: 'p6-c4-l1-gpio-device-communication', title: 'Pi GPIO to Other Devices', description: 'UART/I2C/SPI communication with Arduino.', course: 'gpio-device-communication', difficulty: 'advanced', tags: ['I2C', 'SPI', 'UART', 'Arduino', 'communication'], estimatedMinutes: 45, hasInteractiveExercises: true, youtubeUrl: 'https://www.youtube.com/watch?v=EXAMPLE_VIDEO_ID', keyPoints: [{ title: "UART Communication", description: "Serial connection to Arduino" }, { title: "I2C Protocol", description: "Two-wire sensor communication" }, { title: "SPI Protocol", description: "High-speed peripheral communication" }, { title: "Pi-Arduino Protocol", description: "Building a communication bridge" }],  language: 'en', order: 1 },
];

/**
 * All available courses organized by learning paths
 * Each course belongs to a path and contains multiple lessons
 */
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
  return lessonsManifest
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
  return lessonsManifest.find(
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

/** Get courses for a specific path with localized content */
export function getCoursesByPath(pathId: string, language: Language): CourseMeta[] {
  return coursesManifest
    .filter((course) => course.pathId === pathId)
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

/** Get all courses with localized content */
export function getAllCourses(language: Language): CourseMeta[] {
  return coursesManifest
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
