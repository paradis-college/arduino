/**
 * P2-C1-L4 Proximity Sensor Wiring - Signal
 * Animation showing signal connection for proximity sensor
 */
import type p5 from 'p5';

export const proximityWiringSignalSketch = (p: p5) => {
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
    drawAdjustmentInfo();

    wireProgress += animationSpeed;
    if (wireProgress > 1) {
      wireProgress = 0;
      animationStep = (animationStep + 1) % 2;
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

    // Digital pin 7
    p.fill(40, 50, 60);
    p.rect(x + 10, y + 90, 50, 40, 4);

    p.fill(100, 200, 100);
    p.rect(x + 15, y + 98, 18, 12, 2);
    p.fill(0);
    p.textSize(8);
    p.text('7', x + 24, y + 104);

    p.fill(150);
    p.textSize(8);
    p.text('Digital', x + 35, y + 120);
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

    // IR beam animation
    if (animationStep >= 1) {
      const beamAlpha = 100 + 50 * p.sin(p.frameCount * 0.1);
      p.fill(255, 0, 0, beamAlpha);
      p.noStroke();
      p.ellipse(x - 25, y + 35, 18, 18);
    }

    // IR Receiver
    p.fill(30);
    p.stroke(60);
    p.strokeWeight(1);
    p.rect(x + 10, y + 22, 25, 25, 4);

    // Potentiometer (highlighted)
    p.fill(100);
    p.stroke(animationStep >= 1 ? p.color(255, 200, 100) : p.color(120));
    p.strokeWeight(animationStep >= 1 ? 2 : 1);
    p.ellipse(x + 35, y + 70, 18, 18);

    // Pot adjustment arrow
    if (animationStep >= 1) {
      p.stroke(255, 200, 100);
      p.strokeWeight(2);
      const angle = p.frameCount * 0.03;
      p.noFill();
      p.arc(x + 35, y + 70, 28, 28, angle, angle + p.HALF_PI);

      // Arrow head
      const endAngle = angle + p.HALF_PI;
      const arrowX = x + 35 + p.cos(endAngle) * 14;
      const arrowY = y + 70 + p.sin(endAngle) * 14;
      p.fill(255, 200, 100);
      p.noStroke();
      p.push();
      p.translate(arrowX, arrowY);
      p.rotate(endAngle + p.HALF_PI);
      p.triangle(0, -4, 0, 4, 8, 0);
      p.pop();
    }

    // Pins - OUT is highlighted
    const pins = [
      { label: 'VCC', offset: -30, color: p.color(120) },
      { label: 'GND', offset: 0, color: p.color(120) },
      { label: 'OUT', offset: 30, color: p.color(100, 200, 100) }
    ];

    for (let i = 0; i < pins.length; i++) {
      const pin = pins[i];
      const isSignal = pin.label === 'OUT';
      const isActive = isSignal && animationStep >= 1;

      p.fill(isActive ? 200 : 120);
      p.stroke(isActive ? pin.color : p.color(80));
      p.strokeWeight(isActive ? 2 : 1);
      p.rect(x + pin.offset - 8, y + 90, 16, 22, 2);

      p.fill(isActive ? pin.color : p.color(120));
      p.noStroke();
      p.textSize(8);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(pin.label, x + pin.offset, y + 125);
    }

    p.fill(200);
    p.textSize(9);
    p.text('Proximity Sensor', x, y - 10);
  };

  const drawWires = () => {
    if (animationStep >= 1) {
      const progress = animationStep === 1 ? wireProgress : 1;
      drawAnimatedWire(128, 264, 450, 235, p.color(100, 200, 100), progress);
    }
  };

  const drawAnimatedWire = (
    x1: number, y1: number,
    x2: number, y2: number,
    wireColor: p5.Color,
    progress: number
  ) => {
    const midX = (x1 + x2) / 2;
    const midY = Math.max(y1, y2) + 30;

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

    if (progress > 0.95) {
      const pulse = 15 + 5 * p.sin(p.frameCount * 0.15);
      p.fill(100, 200, 100, 100);
      p.ellipse(x2, y2, pulse, pulse);
    }
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.LEFT, p.TOP);
    p.text('Connect Signal Output', 20, 20);

    p.textSize(10);
    const done = animationStep >= 1;
    p.fill(done ? 100 : 80, done ? 255 : 150, done ? 100 : 80);
    p.text((done ? '✓ ' : '○ ') + 'OUT/SIG → Arduino Pin 7', 20, 50);
  };

  const drawAdjustmentInfo = () => {
    p.fill(40, 50, 60);
    p.rect(20, 280, 220, 100, 6);
    p.fill(200);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.LEFT, p.TOP);
    p.text('Adjust Detection Range', 30, 290);

    p.fill(150);
    p.textSize(9);
    p.text('Turn the potentiometer to set', 30, 310);
    p.text('the detection distance.', 30, 325);
    p.text('', 30, 340);
    p.fill(255, 200, 100);
    p.text('↻ Clockwise = Closer detection', 30, 355);
    p.fill(150);
    p.text('↺ Counter-CW = Farther', 30, 370);
  };

  p.mousePressed = () => {
    if (p.mouseX > 0 && p.mouseX < 600 && p.mouseY > 0 && p.mouseY < 400) {
      animationStep = 0;
      wireProgress = 0;
    }
  };
};

export default proximityWiringSignalSketch;
