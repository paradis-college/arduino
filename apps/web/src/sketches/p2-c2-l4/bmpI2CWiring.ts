/**
 * P2-C2-L4 BMP/BME I2C Wiring
 * Animation showing how to wire I2C pressure sensor
 */
import type p5 from 'p5';

export const bmpI2CWiringSketch = (p: p5) => {
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
    drawBMPSensor();
    drawWires();
    drawLabels();
    drawI2CInfo();

    wireProgress += animationSpeed;
    if (wireProgress > 1) {
      wireProgress = 0;
      animationStep = (animationStep + 1) % 5;
    }
  };

  const drawArduino = () => {
    const x = 60;
    const y = 140;

    p.fill(0, 100, 150);
    p.stroke(0, 150, 200);
    p.strokeWeight(2);
    p.rect(x, y, 150, 180, 8);

    p.fill(200);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Arduino UNO', x + 75, y + 25);

    // Power pins
    p.fill(40, 50, 60);
    p.rect(x + 100, y + 50, 45, 50, 4);

    // 3.3V
    p.fill(255, 150, 50);
    p.rect(x + 105, y + 55, 15, 12, 2);
    p.fill(0);
    p.textSize(6);
    p.text('3.3V', x + 112, y + 61);

    // GND
    p.fill(60);
    p.stroke(100);
    p.strokeWeight(1);
    p.rect(x + 125, y + 55, 15, 12, 2);
    p.fill(255);
    p.noStroke();
    p.textSize(7);
    p.text('GND', x + 132, y + 61);

    // I2C pins (A4/SDA, A5/SCL)
    p.fill(40, 50, 60);
    p.rect(x + 10, y + 110, 85, 50, 4);

    p.fill(100, 200, 255);
    p.rect(x + 15, y + 118, 20, 12, 2);
    p.fill(0);
    p.textSize(7);
    p.text('A4', x + 25, y + 124);

    p.fill(150, 100, 255);
    p.rect(x + 40, y + 118, 20, 12, 2);
    p.fill(255);
    p.text('A5', x + 50, y + 124);

    p.fill(150);
    p.textSize(8);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('SDA', x + 15, y + 140);
    p.text('SCL', x + 40, y + 140);
  };

  const drawBMPSensor = () => {
    const x = 420;
    const y = 130;

    // Small purple PCB
    p.fill(80, 40, 100);
    p.stroke(120, 60, 150);
    p.strokeWeight(2);
    p.rect(x - 40, y, 80, 70, 4);

    // BMP chip
    p.fill(30);
    p.stroke(50);
    p.strokeWeight(1);
    p.rect(x - 15, y + 15, 30, 25, 2);

    // Small vent hole
    p.fill(20);
    p.noStroke();
    p.ellipse(x, y + 27, 8, 8);

    // Label
    p.fill(255);
    p.textSize(8);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('BME280', x, y + 55);

    // Pins
    const pins = [
      { label: 'VCC', offset: -25, color: p.color(255, 150, 50) },
      { label: 'GND', offset: -8, color: p.color(60) },
      { label: 'SDA', offset: 8, color: p.color(100, 200, 255) },
      { label: 'SCL', offset: 25, color: p.color(150, 100, 255) }
    ];

    for (let i = 0; i < pins.length; i++) {
      const pin = pins[i];
      const isActive = animationStep > i;

      p.fill(180);
      p.stroke(isActive ? pin.color : p.color(80));
      p.strokeWeight(isActive ? 2 : 1);
      p.rect(x + pin.offset - 5, y + 70, 10, 22, 1);

      p.fill(isActive ? pin.color : p.color(120));
      p.noStroke();
      p.textSize(7);
      p.text(pin.label, x + pin.offset, y + 102);
    }

    p.fill(200);
    p.textSize(10);
    p.text('Pressure Sensor', x, y - 12);
  };

  const drawWires = () => {
    // VCC wire (orange to 3.3V)
    if (animationStep >= 1) {
      const progress = animationStep === 1 ? wireProgress : 1;
      drawAnimatedWire(210, 207, 395, 215, p.color(255, 150, 50), progress);
    }

    // GND wire
    if (animationStep >= 2) {
      const progress = animationStep === 2 ? wireProgress : 1;
      drawAnimatedWire(210, 213, 412, 215, p.color(60), progress);
    }

    // SDA wire (A4)
    if (animationStep >= 3) {
      const progress = animationStep === 3 ? wireProgress : 1;
      drawAnimatedWire(135, 280, 428, 215, p.color(100, 200, 255), progress);
    }

    // SCL wire (A5)
    if (animationStep >= 4) {
      const progress = animationStep === 4 ? wireProgress : 1;
      drawAnimatedWire(160, 280, 445, 215, p.color(150, 100, 255), progress);
    }
  };

  const drawAnimatedWire = (
    x1: number, y1: number,
    x2: number, y2: number,
    wireColor: p5.Color,
    progress: number
  ) => {
    const midX = (x1 + x2) / 2;
    const midY = Math.min(y1, y2) - 25;

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
    p.text('Connect I2C Pins', 20, 20);

    p.textSize(10);
    const steps = [
      { text: 'VCC → Arduino 3.3V', done: animationStep >= 1 },
      { text: 'GND → Arduino GND', done: animationStep >= 2 },
      { text: 'SDA → Arduino A4', done: animationStep >= 3 },
      { text: 'SCL → Arduino A5', done: animationStep >= 4 }
    ];

    for (let i = 0; i < steps.length; i++) {
      p.fill(steps[i].done ? 100 : 80, steps[i].done ? 255 : 150, steps[i].done ? 100 : 80);
      p.text((steps[i].done ? '✓ ' : '○ ') + steps[i].text, 20, 50 + i * 16);
    }
  };

  const drawI2CInfo = () => {
    p.fill(40, 50, 60);
    p.rect(20, 310, 230, 70, 6);
    p.fill(200);
    p.textSize(10);
    p.textAlign(p.LEFT, p.TOP);
    p.text('I2C Communication', 30, 320);
    p.fill(150);
    p.textSize(9);
    p.text('SDA = Data line (A4 on Uno)', 30, 340);
    p.text('SCL = Clock line (A5 on Uno)', 30, 355);
    p.text('Default I2C address: 0x76 or 0x77', 30, 370);

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

export default bmpI2CWiringSketch;
