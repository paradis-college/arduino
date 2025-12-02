/**
 * Sketch Registry
 * Maps string IDs to sketch functions for use in MDX files
 */
import type p5 from 'p5';

export type SketchFunction = (p: p5) => void;

// Import all sketches - Path 1
import { currentLoopSketch } from './p1-c1-l1/currentLoop';
import { diodeDirectionSketch } from './p1-c1-l1/diodeDirection';
import { resistorColorCodeSketch } from './p1-c1-l1/resistorColorCode';
import { voltageSliderSketch } from './p1-c1-l1/voltageSlider';
import { ledPolaritySketch } from './p1-c1-l1/ledPolarity';
import { buttonGapSketch } from './p1-c1-l2/buttonGap';
import { buttonsSeriesSketch } from './p1-c1-l2/buttonsSeries';
import { buttonsParallelSketch } from './p1-c1-l2/buttonsParallel';
import { truthTableSketch } from './p1-c1-l2/truthTable';
import { transistorSliderSketch } from './p1-c2-l1/transistorSlider';
import { transistorLoadSketch } from './p1-c2-l1/transistorLoad';
import { capacitorChargeSketch } from './p1-c2-l2/capacitorCharge';
import { ledRCTimingSketch } from './p1-c2-l2/ledRCTiming';
import { timer555Sketch } from './p1-c2-l3/timer555';
import { shiftRegisterSketch } from './p1-c2-l3/shiftRegister';
import { inductorFieldSketch } from './p1-c3-l1/inductorField';
import { inductorSpikeSketch } from './p1-c3-l1/inductorSpike';
import { dcMotorPWMSketch } from './p1-c3-l2/dcMotorPWM';
import { servoControlSketch } from './p1-c3-l2/servoControl';
import { solenoidSketch } from './p1-c3-l3/solenoid';
import { flybackDiodeSketch } from './p1-c3-l3/flybackDiode';
import { relaySketch } from './p1-c3-l4/relay';
import { relayIsolationSketch } from './p1-c3-l4/relayIsolation';

// Import all sketches - Path 2
import { ultrasonicSketch } from './p2-c1-l1/ultrasonic';
import { distanceBarSketch } from './p2-c1-l1/distanceBar';
import { ldrSketch } from './p2-c1-l2/ldr';
import { ledAutoDimSketch } from './p2-c1-l2/ledAutoDim';
import { pirSketch } from './p2-c1-l3/pir';
import { pirTimelineSketch } from './p2-c1-l3/pirTimeline';
import { proximitySketch } from './p2-c1-l4/proximity';
import { proximityThresholdSketch } from './p2-c1-l4/proximityThreshold';
import { irCommunicationSketch } from './p2-c1-l5/irCommunication';
import { irHexDisplaySketch } from './p2-c1-l5/irHexDisplay';
import { temperatureSketch } from './p2-c2-l1/temperature';
import { humidityGaugeSketch } from './p2-c2-l1/humidityGauge';
import { soilMoistureSketch } from './p2-c2-l2/soilMoisture';
import { waterThresholdSketch } from './p2-c2-l2/waterThreshold';
import { gasSensorSketch } from './p2-c2-l3/gasSensor';
import { airQualityZonesSketch } from './p2-c2-l3/airQualityZones';
import { pressureSketch } from './p2-c2-l4/pressure';
import { weatherPressureSketch } from './p2-c2-l4/weatherPressure';
import { accelGyroSketch } from './p2-c3-l1/accelGyro';
import { rollPitchLabelsSketch } from './p2-c3-l1/rollPitchLabels';
import { touchSensorSketch } from './p2-c3-l2/touchSensor';
import { touchIndicatorSketch } from './p2-c3-l2/touchIndicator';
import { vibrationSketch } from './p2-c3-l3/vibration';
import { vibrationTimelineSketch } from './p2-c3-l3/vibrationTimeline';

// Import all sketches - Path 3
import { basicBlinkSketch } from './p3-c1-l1/basicBlink';
import { delaySliderSketch } from './p3-c1-l1/delaySlider';
import { ledSyncSketch } from './p3-c1-l1/ledSync';
import { multiLedChaseSketch } from './p3-c1-l2/multiLedChase';
import { simultaneousBlinkSketch } from './p3-c1-l2/simultaneousBlink';
import { pwmFadeSketch } from './p3-c1-l3/pwmFade';
import { ledBrightnessSketch } from './p3-c1-l3/ledBrightness';
import { rgbMixingSketch } from './p3-c1-l3/rgbMixing';
import { delayTimingSketch } from './p3-c1-l4/delayTiming';
import { frozenTaskSketch } from './p3-c1-l4/frozenTask';
import { setupVsLoopSketch } from './p3-c1-l5/setupVsLoop';
import { codeHighlightSketch } from './p3-c1-l5/codeHighlight';
import { pushButtonSketch } from './p3-c3-l1/pushButton';
import { ledButtonStateSketch } from './p3-c3-l1/ledButtonState';
import { potentiometerSketch } from './p3-c3-l2/potentiometer';
import { potLedBrightnessSketch } from './p3-c3-l2/potLedBrightness';
import { debouncingSketch } from './p3-c3-l3/debouncing';
import { filteredSignalSketch } from './p3-c3-l3/filteredSignal';
import { controlPanelSketch } from './p3-c3-l4/controlPanel';
import { logicDiagramSketch } from './p3-c3-l4/logicDiagram';
import { ledPatternsSketch } from './p3-c4-l1/ledPatterns';
import { binaryCounterSketch } from './p3-c4-l1/binaryCounter';
import { buzzerSketch } from './p3-c4-l2/buzzer';
import { pianoKeysSketch } from './p3-c4-l2/pianoKeys';
import { dcMotorSketch } from './p3-c4-l3/dcMotor';
import { transistorFlowSketch } from './p3-c4-l3/transistorFlow';
import { servoSketch } from './p3-c4-l4/servo';
import { angleTextSketch } from './p3-c4-l4/angleText';

// Import all sketches - Path 4
import { trafficLightSketch } from './p4-c1-l1/trafficLight';
import { smartPlantSketch } from './p4-c2-l1/smartPlant';
import { burglarAlarmSketch } from './p4-c3-l1/burglarAlarm';
import { simpleRobotSketch } from './p4-c4-l1/simpleRobot';

// Import all sketches - Path 5
import { serialSketch } from './p5-c1-l1/serial';
import { irRemoteSketch } from './p5-c2-l1/irRemote';
import { bluetoothSketch } from './p5-c3-l1/bluetooth';
import { wifiSketch } from './p5-c4-l1/wifi';

// Import all sketches - Path 6
import { linuxBasicsSketch } from './p6-c1-l1/linuxBasics';
import { gpioSketch } from './p6-c2-l1/gpio';
import { gpioAppsSketch } from './p6-c3-l1/gpioApps';
import { deviceCommSketch } from './p6-c4-l1/deviceComm';

/**
 * Registry mapping string IDs to sketch functions
 * Use these IDs in MDX files with the P5SketchEmbed component
 */
export const sketchRegistry: Record<string, SketchFunction> = {
  // Path 1: Electronic Engineering - Course 1: Passive Components
  'p1-c1-l1-current-loop': currentLoopSketch,
  'p1-c1-l1-diode-direction': diodeDirectionSketch,
  'p1-c1-l1-resistor-color': resistorColorCodeSketch,
  'p1-c1-l1-voltage-slider': voltageSliderSketch,
  'p1-c1-l1-led-polarity': ledPolaritySketch,
  'p1-c1-l2-button-gap': buttonGapSketch,
  'p1-c1-l2-buttons-series': buttonsSeriesSketch,
  'p1-c1-l2-buttons-parallel': buttonsParallelSketch,
  'p1-c1-l2-truth-table': truthTableSketch,
  
  // Path 1: Course 2: Active Components
  'p1-c2-l1-transistor': transistorSliderSketch,
  'p1-c2-l1-transistor-load': transistorLoadSketch,
  'p1-c2-l2-capacitor': capacitorChargeSketch,
  'p1-c2-l2-led-rc-timing': ledRCTimingSketch,
  'p1-c2-l3-555-timer': timer555Sketch,
  'p1-c2-l3-shift-register': shiftRegisterSketch,
  
  // Path 1: Course 3: Electromechanical Components
  'p1-c3-l1-inductor': inductorFieldSketch,
  'p1-c3-l1-inductor-spike': inductorSpikeSketch,
  'p1-c3-l2-motor-pwm': dcMotorPWMSketch,
  'p1-c3-l2-servo-control': servoControlSketch,
  'p1-c3-l3-solenoid': solenoidSketch,
  'p1-c3-l3-flyback-diode': flybackDiodeSketch,
  'p1-c3-l4-relay': relaySketch,
  'p1-c3-l4-relay-isolation': relayIsolationSketch,
  
  // Path 2: Electronic Sensors
  'p2-c1-l1-ultrasonic': ultrasonicSketch,
  'p2-c1-l1-distance-bar': distanceBarSketch,
  'p2-c1-l2-ldr': ldrSketch,
  'p2-c1-l2-led-auto-dim': ledAutoDimSketch,
  'p2-c1-l3-pir': pirSketch,
  'p2-c1-l3-pir-timeline': pirTimelineSketch,
  'p2-c1-l4-proximity': proximitySketch,
  'p2-c1-l4-proximity-threshold': proximityThresholdSketch,
  'p2-c1-l5-ir-comm': irCommunicationSketch,
  'p2-c1-l5-ir-hex': irHexDisplaySketch,
  'p2-c2-l1-temperature': temperatureSketch,
  'p2-c2-l1-humidity': humidityGaugeSketch,
  'p2-c2-l2-soil-moisture': soilMoistureSketch,
  'p2-c2-l2-water-threshold': waterThresholdSketch,
  'p2-c2-l3-gas-sensor': gasSensorSketch,
  'p2-c2-l3-air-quality': airQualityZonesSketch,
  'p2-c2-l4-pressure': pressureSketch,
  'p2-c2-l4-weather': weatherPressureSketch,
  'p2-c3-l1-accel-gyro': accelGyroSketch,
  'p2-c3-l1-roll-pitch': rollPitchLabelsSketch,
  'p2-c3-l2-touch': touchSensorSketch,
  'p2-c3-l2-touch-indicator': touchIndicatorSketch,
  'p2-c3-l3-vibration': vibrationSketch,
  'p2-c3-l3-vibration-timeline': vibrationTimelineSketch,
  
  // Path 3: Arduino Basics
  'p3-c1-l1-basic-blink': basicBlinkSketch,
  'p3-c1-l1-delay-slider': delaySliderSketch,
  'p3-c1-l1-led-sync': ledSyncSketch,
  'p3-c1-l2-multi-led': multiLedChaseSketch,
  'p3-c1-l2-simultaneous-blink': simultaneousBlinkSketch,
  'p3-c1-l3-pwm-fade': pwmFadeSketch,
  'p3-c1-l3-led-brightness': ledBrightnessSketch,
  'p3-c1-l3-rgb-mixing': rgbMixingSketch,
  'p3-c1-l4-delay': delayTimingSketch,
  'p3-c1-l4-frozen-task': frozenTaskSketch,
  'p3-c1-l5-setup-loop': setupVsLoopSketch,
  'p3-c1-l5-code-highlight': codeHighlightSketch,
  'p3-c3-l1-push-button': pushButtonSketch,
  'p3-c3-l1-led-button-state': ledButtonStateSketch,
  'p3-c3-l2-potentiometer': potentiometerSketch,
  'p3-c3-l2-pot-led-brightness': potLedBrightnessSketch,
  'p3-c3-l3-debouncing': debouncingSketch,
  'p3-c3-l3-filtered-signal': filteredSignalSketch,
  'p3-c3-l4-control-panel': controlPanelSketch,
  'p3-c3-l4-logic-diagram': logicDiagramSketch,
  'p3-c4-l1-led-patterns': ledPatternsSketch,
  'p3-c4-l1-binary-counter': binaryCounterSketch,
  'p3-c4-l2-buzzer': buzzerSketch,
  'p3-c4-l2-piano-keys': pianoKeysSketch,
  'p3-c4-l3-dc-motor': dcMotorSketch,
  'p3-c4-l3-transistor-flow': transistorFlowSketch,
  'p3-c4-l4-servo': servoSketch,
  'p3-c4-l4-angle-text': angleTextSketch,
  
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
