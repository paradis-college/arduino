/**
 * P2-C3-L2 Touch Sensor Wiring
 * Animation showing how to wire TTP223 touch sensor
 */
import type p5 from 'p5';

export const touchWiringSketch = (p: p5) => {
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
    drawTouchSensor();
    drawWires();
    drawLabels();
    drawTouchDemo();

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

    // 3.3V/5V
    p.fill(255, 150, 50);
    p.rect(x + 105, y + 60, 15, 12, 2);
    p.fill(0);
    p.textSize(6);
    p.text('3.3V', x + 112, y + 66);

    // GND
    p.fill(60);
    p.stroke(100);
    p.strokeWeight(1);
    p.rect(x + 125, y + 60, 15, 12, 2);
    p.fill(255);
    p.noStroke();
    p.textSize(7);
    p.text('GND', x + 132, y + 66);

    // Digital pin 2
    p.fill(40, 50, 60);
    p.rect(x + 10, y + 110, 55, 40, 4);

    p.fill(100, 200, 100);
    p.rect(x + 15, y + 118, 18, 12, 2);
    p.fill(0);
    p.textSize(8);
    p.text('2', x + 24, y + 124);

    p.fill(150);
    p.textSize(8);
    p.text('Digital', x + 37, y + 140);
  };

  const drawTouchSensor = () => {
    const x = 420;
    const y = 130;

    // Small blue PCB
    p.fill(20, 60, 120);
    p.stroke(40, 90, 160);
    p.strokeWeight(2);
    p.rect(x - 40, y, 80, 70, 6);

    // Touch pad (copper circle)
    const touchActive = animationStep >= 3 && p.sin(p.frameCount * 0.1) > 0;
    p.fill(touchActive ? p.color(255, 200, 100) : p.color(180, 140, 60));
    p.stroke(touchActive ? p.color(255, 220, 150) : p.color(200, 160, 80));
    p.strokeWeight(2);
    p.ellipse(x, y + 30, 45, 45);

    // Touch indicator ripple
    if (touchActive) {
      p.noFill();
      p.stroke(255, 200, 100, 150);
      p.strokeWeight(2);
      const ripple = (p.frameCount % 30) / 30;
      p.ellipse(x, y + 30, 45 + ripple * 30, 45 + ripple * 30);
    }

    // TTP223 chip
    p.fill(30);
    p.stroke(50);
    p.strokeWeight(1);
    p.rect(x - 12, y + 50, 24, 12, 2);

    // Label
    p.fill(255);
    p.noStroke();
    p.textSize(7);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('TTP223', x, y + 56);

    // Pins
    const pins = [
      { label: 'VCC', offset: -20, color: p.color(255, 150, 50) },
      { label: 'GND', offset: 0, color: p.color(60) },
      { label: 'SIG', offset: 20, color: p.color(100, 200, 100) }
    ];

    for (let i = 0; i < pins.length; i++) {
      const pin = pins[i];
      const isActive = animationStep > i;

      p.fill(180);
      p.stroke(isActive ? pin.color : p.color(80));
      p.strokeWeight(isActive ? 2 : 1);
      p.rect(x + pin.offset - 6, y + 70, 12, 22, 1);

      p.fill(isActive ? pin.color : p.color(120));
      p.noStroke();
      p.textSize(7);
      p.text(pin.label, x + pin.offset, y + 102);
    }

    p.fill(200);
    p.textSize(10);
    p.text('Touch Sensor', x, y - 12);
  };

  const drawWires = () => {
    // VCC wire
    if (animationStep >= 1) {
      const progress = animationStep === 1 ? wireProgress : 1;
      drawAnimatedWire(210, 216, 400, 215, p.color(255, 150, 50), progress);
    }

    // GND wire
    if (animationStep >= 2) {
      const progress = animationStep === 2 ? wireProgress : 1;
      drawAnimatedWire(210, 222, 420, 215, p.color(60), progress);
    }

    // SIG wire
    if (animationStep >= 3) {
      const progress = animationStep === 3 ? wireProgress : 1;
      drawAnimatedWire(133, 280, 440, 215, p.color(100, 200, 100), progress);
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
    p.text('Connect Touch Pad', 20, 20);

    p.textSize(10);
    const steps = [
      { text: 'VCC → 3.3V or 5V', done: animationStep >= 1 },
      { text: 'GND → GND', done: animationStep >= 2 },
      { text: 'SIG → Pin 2', done: animationStep >= 3 }
    ];

    for (let i = 0; i < steps.length; i++) {
      p.fill(steps[i].done ? 100 : 80, steps[i].done ? 255 : 150, steps[i].done ? 100 : 80);
      p.text((steps[i].done ? '✓ ' : '○ ') + steps[i].text, 20, 50 + i * 18);
    }
  };

  const drawTouchDemo = () => {
    p.fill(40, 50, 60);
    p.rect(20, 310, 200, 70, 6);
    p.fill(200);
    p.textSize(10);
    p.textAlign(p.LEFT, p.TOP);
    p.text('Touch Pad Operation:', 30, 320);
    p.fill(150);
    p.textSize(9);
    p.text('• Touch = HIGH output', 30, 340);
    p.text('• Release = LOW output', 30, 355);
    p.text('• No moving parts, durable', 30, 370);

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

export default touchWiringSketch;
