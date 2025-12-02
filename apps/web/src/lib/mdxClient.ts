/**
 * MDX Client
 * Helper functions to load and render MDX content
 */

import type { Language } from './types';
import type { ComponentType } from 'react';

/** MDX module type */
export interface MDXModule {
  default: ComponentType<{ components?: Record<string, ComponentType<unknown>> }>;
  frontmatter?: Record<string, unknown>;
}

/** MDX content cache */
const mdxCache = new Map<string, MDXModule>();

/**
 * Dynamically import an MDX file
 * TODO: Consider pre-loading all MDX at build time for better performance
 */
export async function loadMDX(slug: string, language: Language): Promise<MDXModule | null> {
  const cacheKey = `${language}/${slug}`;
  
  if (mdxCache.has(cacheKey)) {
    return mdxCache.get(cacheKey)!;
  }

  try {
    // Dynamic import based on language and slug
    // Vite will handle code-splitting automatically
    // 
    // TODO: This hard-coded module mapping doesn't scale well. Each new lesson
    // requires manual code changes. Consider:
    // 1. Using import.meta.glob to dynamically discover MDX files
    // 2. Generating this mapping at build time via a Vite plugin
    // 3. Using a manifest file that's auto-generated from the content directory
    const modules: Record<string, () => Promise<MDXModule>> = {
      // Existing lessons
      'ro/basics-blink': () => import('@/content/lessons/ro/basics-blink.mdx'),
      'ro/pwm-led': () => import('@/content/lessons/ro/pwm-led.mdx'),
      'en/basics-blink': () => import('@/content/lessons/en/basics-blink.mdx'),
      'en/pwm-led': () => import('@/content/lessons/en/pwm-led.mdx'),

      // Path 1: Electronic Engineering - English
      'en/p1-c1-l1-leds-resistors': () => import('@/content/lessons/en/p1-c1-l1-leds-resistors.mdx'),
      'en/p1-c1-l2-buttons-switches': () => import('@/content/lessons/en/p1-c1-l2-buttons-switches.mdx'),
      'en/p1-c2-l1-transistors-switches': () => import('@/content/lessons/en/p1-c2-l1-transistors-switches.mdx'),
      'en/p1-c2-l2-capacitors': () => import('@/content/lessons/en/p1-c2-l2-capacitors.mdx'),
      'en/p1-c2-l3-ics-555-shift-registers': () => import('@/content/lessons/en/p1-c2-l3-ics-555-shift-registers.mdx'),
      'en/p1-c3-l1-inductors': () => import('@/content/lessons/en/p1-c3-l1-inductors.mdx'),
      'en/p1-c3-l2-motors': () => import('@/content/lessons/en/p1-c3-l2-motors.mdx'),
      'en/p1-c3-l3-solenoids': () => import('@/content/lessons/en/p1-c3-l3-solenoids.mdx'),
      'en/p1-c3-l4-relays': () => import('@/content/lessons/en/p1-c3-l4-relays.mdx'),

      // Path 2: Electronic Sensors - English
      'en/p2-c1-l1-ultrasonic-sensor': () => import('@/content/lessons/en/p2-c1-l1-ultrasonic-sensor.mdx'),
      'en/p2-c1-l2-light-sensor-ldr': () => import('@/content/lessons/en/p2-c1-l2-light-sensor-ldr.mdx'),
      'en/p2-c1-l3-pir-motion': () => import('@/content/lessons/en/p2-c1-l3-pir-motion.mdx'),
      'en/p2-c1-l4-proximity-sensors': () => import('@/content/lessons/en/p2-c1-l4-proximity-sensors.mdx'),
      'en/p2-c1-l5-ir-communication': () => import('@/content/lessons/en/p2-c1-l5-ir-communication.mdx'),
      'en/p2-c2-l1-temperature-humidity-dht': () => import('@/content/lessons/en/p2-c2-l1-temperature-humidity-dht.mdx'),
      'en/p2-c2-l2-soil-moisture': () => import('@/content/lessons/en/p2-c2-l2-soil-moisture.mdx'),
      'en/p2-c2-l3-gas-sensors-mq': () => import('@/content/lessons/en/p2-c2-l3-gas-sensors-mq.mdx'),
      'en/p2-c2-l4-atmospheric-pressure': () => import('@/content/lessons/en/p2-c2-l4-atmospheric-pressure.mdx'),
      'en/p2-c3-l1-accelerometers-gyros': () => import('@/content/lessons/en/p2-c3-l1-accelerometers-gyros.mdx'),
      'en/p2-c3-l2-touch-sensors': () => import('@/content/lessons/en/p2-c3-l2-touch-sensors.mdx'),
      'en/p2-c3-l3-vibration-sensors': () => import('@/content/lessons/en/p2-c3-l3-vibration-sensors.mdx'),

      // Path 3: Arduino Basics - English
      'en/p3-c1-l1-basic-led-blink': () => import('@/content/lessons/en/p3-c1-l1-basic-led-blink.mdx'),
      'en/p3-c1-l2-multi-led-blink': () => import('@/content/lessons/en/p3-c1-l2-multi-led-blink.mdx'),
      'en/p3-c1-l3-pwm-led-fade': () => import('@/content/lessons/en/p3-c1-l3-pwm-led-fade.mdx'),
      'en/p3-c1-l4-understanding-delay': () => import('@/content/lessons/en/p3-c1-l4-understanding-delay.mdx'),
      'en/p3-c1-l5-setup-vs-loop': () => import('@/content/lessons/en/p3-c1-l5-setup-vs-loop.mdx'),
      'en/p3-c3-l1-reading-push-button': () => import('@/content/lessons/en/p3-c3-l1-reading-push-button.mdx'),
      'en/p3-c3-l2-potentiometer-analog': () => import('@/content/lessons/en/p3-c3-l2-potentiometer-analog.mdx'),
      'en/p3-c3-l3-multiple-buttons-debouncing': () => import('@/content/lessons/en/p3-c3-l3-multiple-buttons-debouncing.mdx'),
      'en/p3-c3-l4-combining-inputs-outputs': () => import('@/content/lessons/en/p3-c3-l4-combining-inputs-outputs.mdx'),
      'en/p3-c4-l1-multiple-leds-patterns': () => import('@/content/lessons/en/p3-c4-l1-multiple-leds-patterns.mdx'),
      'en/p3-c4-l2-buzzer-tones': () => import('@/content/lessons/en/p3-c4-l2-buzzer-tones.mdx'),
      'en/p3-c4-l3-dc-motor-transistor': () => import('@/content/lessons/en/p3-c4-l3-dc-motor-transistor.mdx'),
      'en/p3-c4-l4-servo-motor-control': () => import('@/content/lessons/en/p3-c4-l4-servo-motor-control.mdx'),

      // Path 4: Arduino Advanced Projects - English
      'en/p4-c1-l1-traffic-light-controller': () => import('@/content/lessons/en/p4-c1-l1-traffic-light-controller.mdx'),
      'en/p4-c2-l1-smart-plant-monitor': () => import('@/content/lessons/en/p4-c2-l1-smart-plant-monitor.mdx'),
      'en/p4-c3-l1-mini-burglar-alarm': () => import('@/content/lessons/en/p4-c3-l1-mini-burglar-alarm.mdx'),
      'en/p4-c4-l1-simple-robot': () => import('@/content/lessons/en/p4-c4-l1-simple-robot.mdx'),

      // Path 5: Arduino Networking - English
      'en/p5-c1-l1-serial-communication': () => import('@/content/lessons/en/p5-c1-l1-serial-communication.mdx'),
      'en/p5-c2-l1-ir-remote-control': () => import('@/content/lessons/en/p5-c2-l1-ir-remote-control.mdx'),
      'en/p5-c3-l1-bluetooth-communication': () => import('@/content/lessons/en/p5-c3-l1-bluetooth-communication.mdx'),
      'en/p5-c4-l1-wifi-web-server': () => import('@/content/lessons/en/p5-c4-l1-wifi-web-server.mdx'),

      // Path 6: Raspberry Pi - English
      'en/p6-c1-l1-linux-basics': () => import('@/content/lessons/en/p6-c1-l1-linux-basics.mdx'),
      'en/p6-c2-l1-gpio-control': () => import('@/content/lessons/en/p6-c2-l1-gpio-control.mdx'),
      'en/p6-c3-l1-gpio-local-apps': () => import('@/content/lessons/en/p6-c3-l1-gpio-local-apps.mdx'),
      'en/p6-c4-l1-gpio-device-communication': () => import('@/content/lessons/en/p6-c4-l1-gpio-device-communication.mdx'),
    };

    const loader = modules[cacheKey];
    if (!loader) {
      console.error(`MDX module not found: ${cacheKey}`);
      return null;
    }

    const module = await loader();
    mdxCache.set(cacheKey, module);
    return module;
  } catch (error) {
    console.error(`Failed to load MDX: ${cacheKey}`, error);
    return null;
  }
}

/**
 * Clear the MDX cache
 * Useful for hot reloading during development
 */
export function clearMDXCache(): void {
  mdxCache.clear();
}
