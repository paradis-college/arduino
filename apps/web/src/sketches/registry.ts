/**
 * Sketch Registry
 * Maps string IDs to sketch functions for use in MDX files
 */
import type p5 from 'p5';

export type SketchFunction = (p: p5) => void;

// Import all sketches
import { currentLoopSketch } from './p1-c1-l1/currentLoop';
import { buttonGapSketch } from './p1-c1-l2/buttonGap';
import { transistorSliderSketch } from './p1-c2-l1/transistorSlider';
import { capacitorChargeSketch } from './p1-c2-l2/capacitorCharge';
import { timer555Sketch } from './p1-c2-l3/timer555';
import { inductorFieldSketch } from './p1-c3-l1/inductorField';
import { dcMotorPWMSketch } from './p1-c3-l2/dcMotorPWM';
import { solenoidSketch } from './p1-c3-l3/solenoid';
import { relaySketch } from './p1-c3-l4/relay';
import { ultrasonicSketch } from './p2-c1-l1/ultrasonic';
import { ldrSketch } from './p2-c1-l2/ldr';
import { pirSketch } from './p2-c1-l3/pir';
import { proximitySketch } from './p2-c1-l4/proximity';
import { irCommunicationSketch } from './p2-c1-l5/irCommunication';
import { temperatureSketch } from './p2-c2-l1/temperature';
import { soilMoistureSketch } from './p2-c2-l2/soilMoisture';
import { gasSensorSketch } from './p2-c2-l3/gasSensor';
import { pressureSketch } from './p2-c2-l4/pressure';
import { accelGyroSketch } from './p2-c3-l1/accelGyro';
import { touchSensorSketch } from './p2-c3-l2/touchSensor';
import { vibrationSketch } from './p2-c3-l3/vibration';
import { basicBlinkSketch } from './p3-c1-l1/basicBlink';
import { multiLedChaseSketch } from './p3-c1-l2/multiLedChase';
import { pwmFadeSketch } from './p3-c1-l3/pwmFade';
import { delayTimingSketch } from './p3-c1-l4/delayTiming';
import { setupVsLoopSketch } from './p3-c1-l5/setupVsLoop';
import { pushButtonSketch } from './p3-c3-l1/pushButton';
import { potentiometerSketch } from './p3-c3-l2/potentiometer';
import { debouncingSketch } from './p3-c3-l3/debouncing';
import { controlPanelSketch } from './p3-c3-l4/controlPanel';
import { ledPatternsSketch } from './p3-c4-l1/ledPatterns';
import { buzzerSketch } from './p3-c4-l2/buzzer';
import { dcMotorSketch } from './p3-c4-l3/dcMotor';
import { servoSketch } from './p3-c4-l4/servo';
import { trafficLightSketch } from './p4-c1-l1/trafficLight';
import { smartPlantSketch } from './p4-c2-l1/smartPlant';
import { burglarAlarmSketch } from './p4-c3-l1/burglarAlarm';
import { simpleRobotSketch } from './p4-c4-l1/simpleRobot';
import { serialSketch } from './p5-c1-l1/serial';
import { irRemoteSketch } from './p5-c2-l1/irRemote';
import { bluetoothSketch } from './p5-c3-l1/bluetooth';
import { wifiSketch } from './p5-c4-l1/wifi';
import { linuxBasicsSketch } from './p6-c1-l1/linuxBasics';
import { gpioSketch } from './p6-c2-l1/gpio';
import { gpioAppsSketch } from './p6-c3-l1/gpioApps';
import { deviceCommSketch } from './p6-c4-l1/deviceComm';

/**
 * Registry mapping string IDs to sketch functions
 * Use these IDs in MDX files with the P5SketchEmbed component
 */
export const sketchRegistry: Record<string, SketchFunction> = {
  // Path 1: Electronic Engineering
  'p1-c1-l1-current-loop': currentLoopSketch,
  'p1-c1-l2-button-gap': buttonGapSketch,
  'p1-c2-l1-transistor': transistorSliderSketch,
  'p1-c2-l2-capacitor': capacitorChargeSketch,
  'p1-c2-l3-555-timer': timer555Sketch,
  'p1-c3-l1-inductor': inductorFieldSketch,
  'p1-c3-l2-motor-pwm': dcMotorPWMSketch,
  'p1-c3-l3-solenoid': solenoidSketch,
  'p1-c3-l4-relay': relaySketch,
  
  // Path 2: Electronic Sensors
  'p2-c1-l1-ultrasonic': ultrasonicSketch,
  'p2-c1-l2-ldr': ldrSketch,
  'p2-c1-l3-pir': pirSketch,
  'p2-c1-l4-proximity': proximitySketch,
  'p2-c1-l5-ir-comm': irCommunicationSketch,
  'p2-c2-l1-temperature': temperatureSketch,
  'p2-c2-l2-soil-moisture': soilMoistureSketch,
  'p2-c2-l3-gas-sensor': gasSensorSketch,
  'p2-c2-l4-pressure': pressureSketch,
  'p2-c3-l1-accel-gyro': accelGyroSketch,
  'p2-c3-l2-touch': touchSensorSketch,
  'p2-c3-l3-vibration': vibrationSketch,
  
  // Path 3: Arduino Basics
  'p3-c1-l1-basic-blink': basicBlinkSketch,
  'p3-c1-l2-multi-led': multiLedChaseSketch,
  'p3-c1-l3-pwm-fade': pwmFadeSketch,
  'p3-c1-l4-delay': delayTimingSketch,
  'p3-c1-l5-setup-loop': setupVsLoopSketch,
  'p3-c3-l1-push-button': pushButtonSketch,
  'p3-c3-l2-potentiometer': potentiometerSketch,
  'p3-c3-l3-debouncing': debouncingSketch,
  'p3-c3-l4-control-panel': controlPanelSketch,
  'p3-c4-l1-led-patterns': ledPatternsSketch,
  'p3-c4-l2-buzzer': buzzerSketch,
  'p3-c4-l3-dc-motor': dcMotorSketch,
  'p3-c4-l4-servo': servoSketch,
  
  // Path 4: Advanced Projects
  'p4-c1-l1-traffic-light': trafficLightSketch,
  'p4-c2-l1-smart-plant': smartPlantSketch,
  'p4-c3-l1-burglar-alarm': burglarAlarmSketch,
  'p4-c4-l1-simple-robot': simpleRobotSketch,
  
  // Path 5: Networking
  'p5-c1-l1-serial': serialSketch,
  'p5-c2-l1-ir-remote': irRemoteSketch,
  'p5-c3-l1-bluetooth': bluetoothSketch,
  'p5-c4-l1-wifi': wifiSketch,
  
  // Path 6: Raspberry Pi
  'p6-c1-l1-linux-basics': linuxBasicsSketch,
  'p6-c2-l1-gpio': gpioSketch,
  'p6-c3-l1-gpio-apps': gpioAppsSketch,
  'p6-c4-l1-device-comm': deviceCommSketch,
};

/**
 * Get a sketch function by ID
 * @param sketchId The string ID of the sketch
 * @returns The sketch function or undefined if not found
 */
export const getSketch = (sketchId: string): SketchFunction | undefined => {
  return sketchRegistry[sketchId];
};

export default sketchRegistry;
