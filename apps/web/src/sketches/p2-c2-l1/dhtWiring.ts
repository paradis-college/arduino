/**
 * P2-C2-L1 DHT Sensor Wiring
 * Animation showing how to wire DHT11/DHT22 sensor
 */
import type p5 from 'p5';

export const dhtWiringSketch = (p: p5) => {
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
    drawDHTSensor();
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

  const drawDHTSensor = () => {
    const x = 420;
    const y = 120;

    // DHT body (blue plastic case)
    p.fill(30, 100, 180);
    p.stroke(20, 80, 150);
    p.strokeWeight(2);
    p.rect(x - 40, y, 80, 90, 6);

    // Vents/grille
    p.stroke(20, 70, 140);
    p.strokeWeight(1);
    for (let i = 0; i < 5; i++) {
      p.line(x - 30, y + 15 + i * 12, x + 30, y + 15 + i * 12);
    }

    // Label
    p.fill(255);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('DHT22', x, y + 75);

    // Pins
    const pins = [
      { label: 'VCC', offset: -20, color: p.color(255, 80, 80) },
      { label: 'DATA', offset: 0, color: p.color(100, 200, 100) },
      { label: 'GND', offset: 20, color: p.color(60) }
    ];

    for (let i = 0; i < pins.length; i++) {
      const pin = pins[i];
      const isActive = animationStep > i;

      p.fill(180);
      p.stroke(isActive ? pin.color : p.color(100));
      p.strokeWeight(isActive ? 2 : 1);
      p.rect(x + pin.offset - 6, y + 90, 12, 30, 1);

      p.fill(isActive ? pin.color : p.color(120));
      p.noStroke();
      p.textSize(8);
      p.text(pin.label, x + pin.offset, y + 130);
    }

    p.fill(200);
    p.textSize(10);
    p.text('Temp/Humidity', x, y - 12);
  };

  const drawWires = () => {
    // VCC wire
    if (animationStep >= 1) {
      const progress = animationStep === 1 ? wireProgress : 1;
      drawAnimatedWire(210, 216, 400, 230, p.color(255, 80, 80), progress);
    }

    // DATA wire
    if (animationStep >= 2) {
      const progress = animationStep === 2 ? wireProgress : 1;
      drawAnimatedWire(133, 280, 420, 230, p.color(100, 200, 100), progress);
    }

    // GND wire
    if (animationStep >= 3) {
      const progress = animationStep === 3 ? wireProgress : 1;
      drawAnimatedWire(210, 222, 440, 230, p.color(60), progress);
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
    p.text('Wire DHT Sensor', 20, 20);

    p.textSize(10);
    const steps = [
      { text: 'VCC → Arduino 5V', done: animationStep >= 1 },
      { text: 'DATA → Pin 2 (with 10k pull-up)', done: animationStep >= 2 },
      { text: 'GND → Arduino GND', done: animationStep >= 3 }
    ];

    for (let i = 0; i < steps.length; i++) {
      p.fill(steps[i].done ? 100 : 80, steps[i].done ? 255 : 150, steps[i].done ? 100 : 80);
      p.text((steps[i].done ? '✓ ' : '○ ') + steps[i].text, 20, 50 + i * 18);
    }

    // Pull-up resistor note
    p.fill(40, 50, 60);
    p.rect(20, 320, 250, 60, 6);
    p.fill(255, 200, 100);
    p.textSize(10);
    p.text('⚠ Add 10kΩ pull-up resistor', 30, 330);
    p.fill(150);
    p.textSize(9);
    p.text('Between DATA and VCC', 30, 350);
    p.text('(Some modules have it built-in)', 30, 365);

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

export default dhtWiringSketch;
