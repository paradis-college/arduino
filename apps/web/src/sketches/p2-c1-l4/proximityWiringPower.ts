/**
 * P2-C1-L4 Proximity Sensor Wiring - Power
 * Animation showing power connection for proximity sensor
 */
import type p5 from 'p5';

export const proximityWiringPowerSketch = (p: p5) => {
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
    drawProximitySensor();
    drawWires();
    drawLabels();
    drawProgress();

    wireProgress += animationSpeed;
    if (wireProgress > 1) {
      wireProgress = 0;
      animationStep = (animationStep + 1) % 3;
    }
  };

  const drawArduino = () => {
    const x = 60;
    const y = 160;

    p.fill(0, 100, 150);
    p.stroke(0, 150, 200);
    p.strokeWeight(2);
    p.rect(x, y, 140, 160, 8);

    p.fill(200);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Arduino', x + 70, y + 25);

    // Power pins
    p.fill(40, 50, 60);
    p.rect(x + 90, y + 50, 45, 50, 4);

    // 5V
    p.fill(255, 80, 80);
    p.rect(x + 95, y + 58, 15, 12, 2);
    p.fill(255);
    p.textSize(7);
    p.text('5V', x + 102, y + 64);

    // GND
    p.fill(60);
    p.stroke(100);
    p.strokeWeight(1);
    p.rect(x + 115, y + 58, 15, 12, 2);
    p.fill(255);
    p.noStroke();
    p.text('GND', x + 122, y + 64);
  };

  const drawProximitySensor = () => {
    const x = 420;
    const y = 130;

    // Module PCB
    p.fill(0, 60, 120);
    p.stroke(0, 100, 180);
    p.strokeWeight(2);
    p.rect(x - 60, y, 120, 90, 6);

    // IR LED
    p.fill(100, 0, 0);
    p.stroke(150, 0, 0);
    p.ellipse(x - 25, y + 35, 25, 25);
    p.fill(255, 100, 100, 150);
    p.noStroke();
    p.ellipse(x - 25, y + 35, 15, 15);

    // IR Receiver
    p.fill(30);
    p.stroke(60);
    p.strokeWeight(1);
    p.rect(x + 10, y + 22, 25, 25, 4);

    // Potentiometer
    p.fill(80);
    p.stroke(120);
    p.ellipse(x + 35, y + 70, 18, 18);
    p.stroke(40);
    p.strokeWeight(2);
    p.line(x + 35, y + 63, x + 35, y + 77);

    // Labels
    p.fill(200);
    p.noStroke();
    p.textSize(9);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Proximity', x, y - 12);
    p.text('Sensor', x, y + 0);
    p.text('IR TX', x - 25, y + 55);
    p.text('IR RX', x + 22, y + 55);

    // Pins
    const pins = [
      { label: 'VCC', offset: -30, color: p.color(255, 80, 80) },
      { label: 'GND', offset: 0, color: p.color(60) },
      { label: 'OUT', offset: 30, color: p.color(100, 200, 100) }
    ];

    for (let i = 0; i < pins.length; i++) {
      const pin = pins[i];
      const isActive = animationStep > i || (animationStep === i && i < 2);

      p.fill(isActive ? 200 : 120);
      p.stroke(isActive ? pin.color : p.color(80));
      p.strokeWeight(isActive ? 2 : 1);
      p.rect(x + pin.offset - 8, y + 90, 16, 22, 2);

      p.fill(isActive ? pin.color : p.color(120));
      p.noStroke();
      p.textSize(8);
      p.text(pin.label, x + pin.offset, y + 125);
    }
  };

  const drawWires = () => {
    // VCC wire
    if (animationStep >= 1) {
      const progress = animationStep === 1 ? wireProgress : 1;
      drawAnimatedWire(200, 224, 390, 235, p.color(255, 80, 80), progress);
    }

    // GND wire
    if (animationStep >= 2) {
      const progress = animationStep === 2 ? wireProgress : 1;
      drawAnimatedWire(200, 224, 420, 235, p.color(60), progress);
    }
  };

  const drawAnimatedWire = (
    x1: number, y1: number,
    x2: number, y2: number,
    wireColor: p5.Color,
    progress: number
  ) => {
    const midX = (x1 + x2) / 2;
    const midY = Math.min(y1, y2) - 40;

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

    const endX = p.bezierPoint(x1, midX, midX, x2, progress);
    const endY = p.bezierPoint(y1, midY, midY, y2, progress);
    p.fill(wireColor);
    p.noStroke();
    p.ellipse(endX, endY, 10, 10);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.LEFT, p.TOP);
    p.text('Connect Sensor Power', 20, 20);

    p.textSize(10);
    const steps = [
      '1. VCC → Arduino 5V',
      '2. GND → Arduino GND'
    ];

    for (let i = 0; i < steps.length; i++) {
      const done = animationStep > i;
      p.fill(done ? 100 : 80, done ? 255 : 150, done ? 100 : 80);
      p.text((done ? '✓ ' : '○ ') + steps[i], 20, 50 + i * 18);
    }

    p.fill(40, 50, 60);
    p.rect(20, 330, 200, 50, 6);
    p.fill(200);
    p.textSize(9);
    p.text('Most proximity sensors', 30, 340);
    p.text('work on 3.3V - 5V', 30, 355);
  };

  const drawProgress = () => {
    const barWidth = 200;
    const barX = 350;
    const barY = 380;

    p.fill(50);
    p.noStroke();
    p.rect(barX, barY, barWidth, 8, 4);

    p.fill(100, 200, 100);
    p.rect(barX, barY, barWidth * ((animationStep + wireProgress) / 3), 8, 4);

    p.fill(120);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Click to restart', 450, 365);
  };

  p.mousePressed = () => {
    if (p.mouseX > 0 && p.mouseX < 600 && p.mouseY > 0 && p.mouseY < 400) {
      animationStep = 0;
      wireProgress = 0;
    }
  };
};

export default proximityWiringPowerSketch;
