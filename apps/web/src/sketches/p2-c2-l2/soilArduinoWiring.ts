/**
 * P2-C2-L2 Soil Moisture to Arduino Wiring
 * Animation showing how to wire soil sensor module to Arduino
 */
import type p5 from 'p5';

export const soilArduinoWiringSketch = (p: p5) => {
  let animationStep = 0;
  let wireProgress = 0;
  const animationSpeed = 0.025;

  p.setup = () => {
    p.createCanvas(600, 400);
    p.textFont('monospace');
  };

  p.draw = () => {
    p.background(30, 35, 45);

    drawArduino();
    drawSensorModule();
    drawWires();
    drawLabels();

    wireProgress += animationSpeed;
    if (wireProgress > 1) {
      wireProgress = 0;
      animationStep = (animationStep + 1) % 4;
    }
  };

  const drawArduino = () => {
    const x = 60;
    const y = 150;

    p.fill(0, 100, 150);
    p.stroke(0, 150, 200);
    p.strokeWeight(2);
    p.rect(x, y, 150, 170, 8);

    p.fill(200);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Arduino UNO', x + 75, y + 25);

    // Power pins
    p.fill(40, 50, 60);
    p.rect(x + 100, y + 55, 45, 50, 4);

    // 5V
    p.fill(255, 80, 80);
    p.rect(x + 105, y + 60, 15, 12, 2);
    p.fill(255);
    p.textSize(7);
    p.text('5V', x + 112, y + 66);

    // GND
    p.fill(60);
    p.stroke(100);
    p.strokeWeight(1);
    p.rect(x + 125, y + 60, 15, 12, 2);
    p.fill(255);
    p.noStroke();
    p.text('GND', x + 132, y + 66);

    // Analog pin A0
    p.fill(40, 50, 60);
    p.rect(x + 10, y + 110, 55, 40, 4);

    p.fill(100, 200, 255);
    p.rect(x + 15, y + 118, 20, 12, 2);
    p.fill(0);
    p.textSize(8);
    p.text('A0', x + 25, y + 124);

    p.fill(150);
    p.textSize(8);
    p.text('Analog', x + 37, y + 140);
  };

  const drawSensorModule = () => {
    const x = 420;
    const y = 140;

    // Module PCB
    p.fill(0, 80, 50);
    p.stroke(0, 120, 70);
    p.strokeWeight(2);
    p.rect(x - 60, y, 120, 100, 6);

    // Comparator chip
    p.fill(30);
    p.stroke(50);
    p.strokeWeight(1);
    p.rect(x - 30, y + 25, 35, 25, 2);

    // LEDs
    p.fill(255, 50, 50);
    p.noStroke();
    p.ellipse(x + 35, y + 25, 8, 8);
    p.fill(50, 255, 50);
    p.ellipse(x + 35, y + 40, 8, 8);

    // Potentiometer
    p.fill(80);
    p.stroke(100);
    p.ellipse(x - 30, y + 70, 18, 18);

    // Pin labels
    const pins = [
      { label: 'VCC', x: x - 40, color: p.color(255, 80, 80) },
      { label: 'GND', x: x - 15, color: p.color(60) },
      { label: 'AO', x: x + 10, color: p.color(100, 200, 255) }
    ];

    for (let i = 0; i < pins.length; i++) {
      const pin = pins[i];
      const isActive = animationStep > i;

      p.fill(180);
      p.stroke(isActive ? pin.color : p.color(80));
      p.strokeWeight(isActive ? 2 : 1);
      p.rect(pin.x - 8, y + 100, 16, 25, 2);

      p.fill(isActive ? pin.color : p.color(120));
      p.noStroke();
      p.textSize(8);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(pin.label, pin.x, y + 135);
    }

    p.fill(200);
    p.textSize(10);
    p.text('Soil Sensor', x, y - 12);
  };

  const drawWires = () => {
    // VCC wire (red)
    if (animationStep >= 1) {
      const progress = animationStep === 1 ? wireProgress : 1;
      drawAnimatedWire(210, 216, 380, 255, p.color(255, 80, 80), progress);
    }

    // GND wire (black)
    if (animationStep >= 2) {
      const progress = animationStep === 2 ? wireProgress : 1;
      drawAnimatedWire(210, 222, 405, 255, p.color(60), progress);
    }

    // AO wire (blue)
    if (animationStep >= 3) {
      const progress = animationStep === 3 ? wireProgress : 1;
      drawAnimatedWire(135, 280, 430, 255, p.color(100, 200, 255), progress);
    }
  };

  const drawAnimatedWire = (
    x1: number, y1: number,
    x2: number, y2: number,
    wireColor: p5.Color,
    progress: number
  ) => {
    const midX = (x1 + x2) / 2;
    const midY = Math.min(y1, y2) - 30;

    p.stroke(wireColor);
    p.strokeWeight(3);
    p.noFill();

    p.beginShape();
    for (let t = 0; t <= progress; t += 0.02) {
      const px = p.bezierPoint(x1, midX, midX, x2, t);
      const py = p.bezierPoint(y1, midY, midY, y2, t);
      p.vertex(px, py);
    }
    p.endShape();

    const endX = p.bezierPoint(x1, midX, midX, x2, progress);
    const endY = p.bezierPoint(y1, midY, midY, y2, progress);
    p.fill(wireColor);
    p.noStroke();
    p.ellipse(endX, endY, 8, 8);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.LEFT, p.TOP);
    p.text('Wire to Arduino', 20, 20);

    p.textSize(10);
    const steps = [
      { text: 'VCC → Arduino 5V', done: animationStep >= 1 },
      { text: 'GND → Arduino GND', done: animationStep >= 2 },
      { text: 'AO → Arduino A0', done: animationStep >= 3 }
    ];

    for (let i = 0; i < steps.length; i++) {
      p.fill(steps[i].done ? 100 : 80, steps[i].done ? 255 : 150, steps[i].done ? 100 : 80);
      p.text((steps[i].done ? '✓ ' : '○ ') + steps[i].text, 20, 50 + i * 18);
    }

    p.fill(40, 50, 60);
    p.rect(20, 320, 220, 60, 6);
    p.fill(200);
    p.textSize(10);
    p.text('analogRead(A0)', 30, 330);
    p.fill(150);
    p.textSize(9);
    p.text('Returns 0-1023', 30, 350);
    p.text('High = dry, Low = wet', 30, 365);

    p.fill(120);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Click to restart', 480, 380);
  };

  p.mousePressed = () => {
    if (p.mouseX > 0 && p.mouseX < 600 && p.mouseY > 0 && p.mouseY < 400) {
      animationStep = 0;
      wireProgress = 0;
    }
  };
};

export default soilArduinoWiringSketch;
