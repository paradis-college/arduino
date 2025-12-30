/**
 * P2-C1-L1 Ultrasonic Sensor Wiring - Trig and Echo
 * Animation showing how to connect HC-SR04 signal pins to Arduino
 */
import type p5 from 'p5';

export const ultrasonicWiringSignalSketch = (p: p5) => {
  let animationStep = 0;
  let wireProgress = 0;
  const animationSpeed = 0.02;

  p.setup = () => {
    p.createCanvas(600, 400);
    p.textFont('monospace');
  };

  p.draw = () => {
    p.background(30, 35, 45);

    drawArduino();
    drawSensor();
    drawWires();
    drawLabels();
    drawProgress();

    // Advance animation
    wireProgress += animationSpeed;
    if (wireProgress > 1) {
      wireProgress = 0;
      animationStep = (animationStep + 1) % 3;
    }
  };

  const drawArduino = () => {
    const x = 80;
    const y = 180;

    // Arduino board
    p.fill(0, 100, 150);
    p.stroke(0, 150, 200);
    p.strokeWeight(2);
    p.rect(x, y, 180, 140, 8);

    // USB port
    p.fill(60);
    p.stroke(80);
    p.rect(x + 70, y - 15, 40, 20, 4);

    // Label
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Arduino UNO', x + 90, y + 70);

    // Digital pins area
    p.fill(40, 50, 60);
    p.rect(x + 5, y + 95, 120, 40, 4);

    // Pin 9 (Trig)
    p.fill(255, 200, 50);
    p.rect(x + 55, y + 100, 15, 12, 2);
    p.fill(0);
    p.textSize(8);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('9', x + 62, y + 106);

    // Pin 10 (Echo)
    p.fill(50, 200, 255);
    p.rect(x + 75, y + 100, 15, 12, 2);
    p.fill(0);
    p.text('10', x + 82, y + 106);

    // Pin labels below
    p.fill(150);
    p.textSize(7);
    p.text('TRIG', x + 62, y + 125);
    p.text('ECHO', x + 82, y + 125);
  };

  const drawSensor = () => {
    const x = 400;
    const y = 140;

    // HC-SR04 board
    p.fill(30, 80, 30);
    p.stroke(50, 120, 50);
    p.strokeWeight(2);
    p.rect(x, y, 140, 80, 6);

    // Ultrasonic transducers
    p.fill(180);
    p.stroke(200);
    p.ellipse(x + 35, y + 40, 40, 40);
    p.ellipse(x + 105, y + 40, 40, 40);

    // Inner circles
    p.fill(60);
    p.ellipse(x + 35, y + 40, 20, 20);
    p.ellipse(x + 105, y + 40, 20, 20);

    // Label
    p.fill(255);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('HC-SR04', x + 70, y + 75);

    // Pin labels
    const pins = ['VCC', 'Trig', 'Echo', 'GND'];
    const pinX = x + 25;
    const pinY = y + 90;

    for (let i = 0; i < 4; i++) {
      const px = pinX + i * 30;

      // Pin highlight for Trig and Echo
      if (i === 1) {
        p.fill(255, 200, 50, animationStep >= 1 ? 255 : 100);
      } else if (i === 2) {
        p.fill(50, 200, 255, animationStep >= 2 ? 255 : 100);
      } else {
        p.fill(100);
      }

      p.rect(px, pinY, 20, 30, 2);

      // Pin label
      p.fill(255);
      p.textSize(8);
      p.text(pins[i], px + 10, pinY + 40);
    }
  };

  const drawWires = () => {
    // Trig wire (yellow) - step 1
    if (animationStep >= 1) {
      const progress = animationStep === 1 ? wireProgress : 1;
      drawAnimatedWire(
        142, 286,  // Arduino pin 9
        455, 230,  // Sensor Trig pin
        p.color(255, 200, 50),
        progress
      );
    }

    // Echo wire (blue) - step 2
    if (animationStep >= 2) {
      const progress = animationStep === 2 ? wireProgress : 1;
      drawAnimatedWire(
        162, 286,  // Arduino pin 10
        485, 230,  // Sensor Echo pin
        p.color(50, 200, 255),
        progress
      );
    }
  };

  const drawAnimatedWire = (
    x1: number, y1: number,
    x2: number, y2: number,
    wireColor: p5.Color,
    progress: number
  ) => {
    // Calculate intermediate points for curved wire
    const midX = (x1 + x2) / 2;
    const midY = Math.min(y1, y2) - 40;

    // Draw wire path
    p.stroke(wireColor);
    p.strokeWeight(4);
    p.noFill();

    p.beginShape();
    for (let t = 0; t <= progress; t += 0.02) {
      const px = p.bezierPoint(x1, midX, midX, x2, t);
      const py = p.bezierPoint(y1, midY, midY, y2, t);
      p.vertex(px, py);
    }
    p.endShape();

    // Draw connection point at the end
    const endX = p.bezierPoint(x1, midX, midX, x2, progress);
    const endY = p.bezierPoint(y1, midY, midY, y2, progress);

    p.fill(wireColor);
    p.noStroke();
    p.ellipse(endX, endY, 10, 10);

    // Pulse effect at end when complete
    if (progress > 0.9) {
      const pulseSize = 15 + p.sin(p.frameCount * 0.2) * 5;
      p.fill(p.red(wireColor), p.green(wireColor), p.blue(wireColor), 100);
      p.ellipse(x2, y2, pulseSize, pulseSize);
    }
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.LEFT, p.TOP);
    p.text('Connect HC-SR04 Signal Pins', 20, 20);

    p.textSize(11);
    p.fill(150);

    const steps = [
      '1. Connect Trig → Arduino Pin 9 (yellow)',
      '2. Connect Echo → Arduino Pin 10 (blue)'
    ];

    for (let i = 0; i < steps.length; i++) {
      const isActive = i < animationStep || (i === animationStep && wireProgress > 0);
      p.fill(isActive ? 100 : 80, isActive ? 255 : 150, isActive ? 100 : 80);
      p.text(steps[i], 20, 50 + i * 20);

      if (i < animationStep) {
        p.text('✓', 5, 50 + i * 20);
      }
    }

    // Info box
    p.fill(40, 50, 60);
    p.rect(20, 330, 250, 50, 6);
    p.fill(200);
    p.textSize(9);
    p.textAlign(p.LEFT, p.TOP);
    p.text('Trig = Trigger (output to sensor)', 30, 340);
    p.text('Echo = Echo return (input from sensor)', 30, 355);
  };

  const drawProgress = () => {
    // Progress bar
    const barWidth = 200;
    const barX = 330;
    const barY = 380;

    p.fill(50);
    p.noStroke();
    p.rect(barX, barY, barWidth, 8, 4);

    const totalProgress = (animationStep + wireProgress) / 3;
    p.fill(100, 200, 100);
    p.rect(barX, barY, barWidth * totalProgress, 8, 4);

    // Click to restart hint
    p.fill(120);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Click to restart', 430, 365);
  };

  p.mousePressed = () => {
    if (p.mouseX > 0 && p.mouseX < 600 && p.mouseY > 0 && p.mouseY < 400) {
      animationStep = 0;
      wireProgress = 0;
    }
  };
};

export default ultrasonicWiringSignalSketch;
