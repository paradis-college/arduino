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
import { ultrasonicWiringPowerSketch } from './p2-c1-l1/ultrasonicWiringPower';
import { ultrasonicWiringSignalSketch } from './p2-c1-l1/ultrasonicWiringSignal';
import { ldrSketch } from './p2-c1-l2/ldr';
import { ledAutoDimSketch } from './p2-c1-l2/ledAutoDim';
import { ldrIdentifySketch } from './p2-c1-l2/ldrIdentify';
import { ldrVoltageDividerSketch } from './p2-c1-l2/ldrVoltageDivider';
import { pirSketch } from './p2-c1-l3/pir';
import { pirTimelineSketch } from './p2-c1-l3/pirTimeline';
import { pirPinIdentifySketch } from './p2-c1-l3/pirPinIdentify';
import { pirWiringSketch } from './p2-c1-l3/pirWiring';
import { proximitySketch } from './p2-c1-l4/proximity';
import { proximityThresholdSketch } from './p2-c1-l4/proximityThreshold';
import { proximityWiringPowerSketch } from './p2-c1-l4/proximityWiringPower';
import { proximityWiringSignalSketch } from './p2-c1-l4/proximityWiringSignal';
import { irCommunicationSketch } from './p2-c1-l5/irCommunication';
import { irHexDisplaySketch } from './p2-c1-l5/irHexDisplay';
import { irReceiverWiringSketch } from './p2-c1-l5/irReceiverWiring';
import { irLibraryInstallSketch } from './p2-c1-l5/irLibraryInstall';
import { temperatureSketch } from './p2-c2-l1/temperature';
import { humidityGaugeSketch } from './p2-c2-l1/humidityGauge';
import { dhtWiringSketch } from './p2-c2-l1/dhtWiring';
import { dhtLibraryInstallSketch } from './p2-c2-l1/dhtLibraryInstall';
import { soilMoistureSketch } from './p2-c2-l2/soilMoisture';
import { waterThresholdSketch } from './p2-c2-l2/waterThreshold';
import { soilProbeWiringSketch } from './p2-c2-l2/soilProbeWiring';
import { soilArduinoWiringSketch } from './p2-c2-l2/soilArduinoWiring';
import { gasSensorSketch } from './p2-c2-l3/gasSensor';
import { airQualityZonesSketch } from './p2-c2-l3/airQualityZones';
import { mqMountingSketch } from './p2-c2-l3/mqMounting';
import { mqWiringSketch } from './p2-c2-l3/mqWiring';
import { pressureSketch } from './p2-c2-l4/pressure';
import { weatherPressureSketch } from './p2-c2-l4/weatherPressure';
import { bmpI2CWiringSketch } from './p2-c2-l4/bmpI2CWiring';
import { bmpPowerWiringSketch } from './p2-c2-l4/bmpPowerWiring';
import { accelGyroSketch } from './p2-c3-l1/accelGyro';
import { rollPitchLabelsSketch } from './p2-c3-l1/rollPitchLabels';
import { mpuWiringSketch } from './p2-c3-l1/mpuWiring';
import { mpuLibraryInstallSketch } from './p2-c3-l1/mpuLibraryInstall';
import { touchSensorSketch } from './p2-c3-l2/touchSensor';
import { touchIndicatorSketch } from './p2-c3-l2/touchIndicator';
import { touchWiringSketch } from './p2-c3-l2/touchWiring';
import { touchToggleModeSketch } from './p2-c3-l2/touchToggleMode';
import { vibrationSketch } from './p2-c3-l3/vibration';
import { vibrationTimelineSketch } from './p2-c3-l3/vibrationTimeline';
import { vibrationMountingSketch } from './p2-c3-l3/vibrationMounting';
import { vibrationWiringSketch } from './p2-c3-l3/vibrationWiring';

// Import all sketches - Path 3
import { basicBlinkSketch } from './p3-c1-l1/basicBlink';
import { delaySliderSketch } from './p3-c1-l1/delaySlider';
import { ledSyncSketch } from './p3-c1-l1/ledSync';
import { arduinoBoardSketch } from './p3-c1-l1/arduinoBoard';
import { setupLoopBoxesSketch } from './p3-c1-l1/setupLoopBoxes';
import { uploadButtonSketch } from './p3-c1-l1/uploadButton';
import { multiLedChaseSketch } from './p3-c1-l2/multiLedChase';
import { simultaneousBlinkSketch } from './p3-c1-l2/simultaneousBlink';
import { threeLedSetupSketch } from './p3-c1-l2/threeLedSetup';
import { chasePatternSketch } from './p3-c1-l2/chasePattern';
import { pwmFadeSketch } from './p3-c1-l3/pwmFade';
import { ledBrightnessSketch } from './p3-c1-l3/ledBrightness';
import { rgbMixingSketch } from './p3-c1-l3/rgbMixing';
import { brightnessScaleSketch } from './p3-c1-l3/brightnessScale';
import { breathingLightSketch } from './p3-c1-l3/breathingLight';
import { delayTimingSketch } from './p3-c1-l4/delayTiming';
import { frozenTaskSketch } from './p3-c1-l4/frozenTask';
import { arduinoNapSketch } from './p3-c1-l4/arduinoNap';
import { missedButtonSketch } from './p3-c1-l4/missedButton';
import { clockMethodSketch } from './p3-c1-l4/clockMethod';
import { setupVsLoopSketch } from './p3-c1-l5/setupVsLoop';
import { codeHighlightSketch } from './p3-c1-l5/codeHighlight';
import { setupOnceSketch } from './p3-c1-l5/setupOnce';
import { loopForeverSketch } from './p3-c1-l5/loopForever';
import { programFlowSketch } from './p3-c1-l5/programFlow';
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
import { pedestrianButtonSketch } from './p4-c1-l1/pedestrianButton';
import { smartPlantSketch } from './p4-c2-l1/smartPlant';
import { waterButtonSketch } from './p4-c2-l1/waterButton';
import { burglarAlarmSketch } from './p4-c3-l1/burglarAlarm';
import { armedStateSketch } from './p4-c3-l1/armedState';
import { simpleRobotSketch } from './p4-c4-l1/simpleRobot';
import { obstacleAvoidanceSketch } from './p4-c4-l1/obstacleAvoidance';

// Import all sketches - Path 5
import { serialSketch } from './p5-c1-l1/serial';
import { serialMonitorSketch } from './p5-c1-l1/serialMonitor';
import { irRemoteSketch } from './p5-c2-l1/irRemote';
import { irCodeDisplaySketch } from './p5-c2-l1/irCodeDisplay';
import { bluetoothSketch } from './p5-c3-l1/bluetooth';
import { btLedMotorSketch } from './p5-c3-l1/btLedMotor';
import { wifiSketch } from './p5-c4-l1/wifi';
import { espResponseSketch } from './p5-c4-l1/espResponse';

// Import all sketches - Path 6
import { linuxBasicsSketch } from './p6-c1-l1/linuxBasics';
import { nanoEditorSketch } from './p6-c1-l1/nanoEditor';
import { gpioSketch } from './p6-c2-l1/gpio';
import { breadboardLedsSketch } from './p6-c2-l1/breadboardLeds';
import { gpioAppsSketch } from './p6-c3-l1/gpioApps';
import { eventLogSketch } from './p6-c3-l1/eventLog';
import { deviceCommSketch } from './p6-c4-l1/deviceComm';
import { byteCounterSketch } from './p6-c4-l1/byteCounter';

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
  'p2-c1-l1-wiring-power': ultrasonicWiringPowerSketch,
  'p2-c1-l1-wiring-signal': ultrasonicWiringSignalSketch,
  'p2-c1-l2-ldr': ldrSketch,
  'p2-c1-l2-led-auto-dim': ledAutoDimSketch,
  'p2-c1-l2-ldr-identify': ldrIdentifySketch,
  'p2-c1-l2-voltage-divider': ldrVoltageDividerSketch,
  'p2-c1-l3-pir': pirSketch,
  'p2-c1-l3-pir-timeline': pirTimelineSketch,
  'p2-c1-l3-pir-pins': pirPinIdentifySketch,
  'p2-c1-l3-pir-wiring': pirWiringSketch,
  'p2-c1-l4-proximity': proximitySketch,
  'p2-c1-l4-proximity-threshold': proximityThresholdSketch,
  'p2-c1-l4-proximity-power': proximityWiringPowerSketch,
  'p2-c1-l4-proximity-signal': proximityWiringSignalSketch,
  'p2-c1-l5-ir-comm': irCommunicationSketch,
  'p2-c1-l5-ir-hex': irHexDisplaySketch,
  'p2-c1-l5-ir-wiring': irReceiverWiringSketch,
  'p2-c1-l5-ir-library': irLibraryInstallSketch,
  'p2-c2-l1-temperature': temperatureSketch,
  'p2-c2-l1-humidity': humidityGaugeSketch,
  'p2-c2-l1-dht-wiring': dhtWiringSketch,
  'p2-c2-l1-dht-library': dhtLibraryInstallSketch,
  'p2-c2-l2-soil-moisture': soilMoistureSketch,
  'p2-c2-l2-water-threshold': waterThresholdSketch,
  'p2-c2-l2-soil-probe': soilProbeWiringSketch,
  'p2-c2-l2-soil-arduino': soilArduinoWiringSketch,
  'p2-c2-l3-gas-sensor': gasSensorSketch,
  'p2-c2-l3-air-quality': airQualityZonesSketch,
  'p2-c2-l3-mq-mounting': mqMountingSketch,
  'p2-c2-l3-mq-wiring': mqWiringSketch,
  'p2-c2-l4-pressure': pressureSketch,
  'p2-c2-l4-weather': weatherPressureSketch,
  'p2-c2-l4-bmp-i2c': bmpI2CWiringSketch,
  'p2-c2-l4-bmp-power': bmpPowerWiringSketch,
  'p2-c3-l1-accel-gyro': accelGyroSketch,
  'p2-c3-l1-roll-pitch': rollPitchLabelsSketch,
  'p2-c3-l1-mpu-wiring': mpuWiringSketch,
  'p2-c3-l1-mpu-library': mpuLibraryInstallSketch,
  'p2-c3-l2-touch': touchSensorSketch,
  'p2-c3-l2-touch-indicator': touchIndicatorSketch,
  'p2-c3-l2-touch-wiring': touchWiringSketch,
  'p2-c3-l2-touch-toggle': touchToggleModeSketch,
  'p2-c3-l3-vibration': vibrationSketch,
  'p2-c3-l3-vibration-timeline': vibrationTimelineSketch,
  'p2-c3-l3-vibration-mounting': vibrationMountingSketch,
  'p2-c3-l3-vibration-wiring': vibrationWiringSketch,
  
  // Path 3: Arduino Basics
  'p3-c1-l1-basic-blink': basicBlinkSketch,
  'p3-c1-l1-delay-slider': delaySliderSketch,
  'p3-c1-l1-led-sync': ledSyncSketch,
  'p3-c1-l1-arduino-board': arduinoBoardSketch,
  'p3-c1-l1-setup-loop-boxes': setupLoopBoxesSketch,
  'p3-c1-l1-upload-button': uploadButtonSketch,
  'p3-c1-l2-multi-led': multiLedChaseSketch,
  'p3-c1-l2-simultaneous-blink': simultaneousBlinkSketch,
  'p3-c1-l2-three-led-setup': threeLedSetupSketch,
  'p3-c1-l2-chase-pattern': chasePatternSketch,
  'p3-c1-l3-pwm-fade': pwmFadeSketch,
  'p3-c1-l3-led-brightness': ledBrightnessSketch,
  'p3-c1-l3-rgb-mixing': rgbMixingSketch,
  'p3-c1-l3-brightness-scale': brightnessScaleSketch,
  'p3-c1-l3-breathing-light': breathingLightSketch,
  'p3-c1-l4-delay': delayTimingSketch,
  'p3-c1-l4-frozen-task': frozenTaskSketch,
  'p3-c1-l4-arduino-nap': arduinoNapSketch,
  'p3-c1-l4-missed-button': missedButtonSketch,
  'p3-c1-l4-clock-method': clockMethodSketch,
  'p3-c1-l5-setup-loop': setupVsLoopSketch,
  'p3-c1-l5-code-highlight': codeHighlightSketch,
  'p3-c1-l5-setup-once': setupOnceSketch,
  'p3-c1-l5-loop-forever': loopForeverSketch,
  'p3-c1-l5-program-flow': programFlowSketch,
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
  'p4-c1-l1-pedestrian-button': pedestrianButtonSketch,
  'p4-c2-l1-smart-plant': smartPlantSketch,
  'p4-c2-l1-water-button': waterButtonSketch,
  'p4-c3-l1-burglar-alarm': burglarAlarmSketch,
  'p4-c3-l1-armed-state': armedStateSketch,
  'p4-c4-l1-simple-robot': simpleRobotSketch,
  'p4-c4-l1-obstacle-avoidance': obstacleAvoidanceSketch,
  
  // Path 5: Networking
  'p5-c1-l1-serial': serialSketch,
  'p5-c1-l1-serial-monitor': serialMonitorSketch,
  'p5-c2-l1-ir-remote': irRemoteSketch,
  'p5-c2-l1-ir-code-display': irCodeDisplaySketch,
  'p5-c3-l1-bluetooth': bluetoothSketch,
  'p5-c3-l1-bt-led-motor': btLedMotorSketch,
  'p5-c4-l1-wifi': wifiSketch,
  'p5-c4-l1-esp-response': espResponseSketch,
  
  // Path 6: Raspberry Pi
  'p6-c1-l1-linux-basics': linuxBasicsSketch,
  'p6-c1-l1-nano-editor': nanoEditorSketch,
  'p6-c2-l1-gpio': gpioSketch,
  'p6-c2-l1-breadboard-leds': breadboardLedsSketch,
  'p6-c3-l1-gpio-apps': gpioAppsSketch,
  'p6-c3-l1-event-log': eventLogSketch,
  'p6-c4-l1-device-comm': deviceCommSketch,
  'p6-c4-l1-byte-counter': byteCounterSketch,
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
