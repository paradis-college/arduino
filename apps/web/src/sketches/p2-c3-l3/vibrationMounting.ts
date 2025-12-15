/**
 * P2-C3-L3 Vibration Sensor Mounting
 * Animation showing how to mount SW-420 vibration sensor
 */
import type p5 from 'p5';

export const vibrationMountingSketch = (p: p5) => {
  let animationStep = 0;
  let stepProgress = 0;
  const animationSpeed = 0.015;

  p.setup = () => {
    p.createCanvas(600, 400);
    p.textFont('monospace');
  };

  p.draw = () => {
    p.background(30, 35, 45);

    drawSurface();
    drawSensor();
    drawMountingInfo();
    drawLabels();

    stepProgress += animationSpeed;
    if (stepProgress > 1) {
      stepProgress = 0;
      animationStep = (animationStep + 1) % 3;
    }
  };

  const drawSurface = () => {
    const x = 150;
    const y = 200;

    // Surface to monitor
    p.fill(80, 60, 50);
    p.stroke(100, 80, 70);
    p.strokeWeight(3);
    p.rect(x, y, 300, 120, 8);

    // Surface texture
    p.stroke(90, 70, 60);
    p.strokeWeight(1);
    for (let i = 0; i < 10; i++) {
      p.line(x + 20 + i * 28, y + 10, x + 20 + i * 28, y + 110);
    }

    // Label
    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Surface to Monitor', x + 150, y + 60);
    p.textSize(8);
    p.fill(150);
    p.text('(door, machine, etc.)', x + 150, y + 75);

    // Vibration waves when active
    if (animationStep >= 2) {
      p.noFill();
      p.stroke(100, 200, 100, 150 - stepProgress * 100);
      p.strokeWeight(2);
      for (let i = 0; i < 3; i++) {
        const wave = stepProgress * 30 + i * 15;
        p.arc(x + 150, y + 60, wave * 2, wave, 0, p.PI);
      }
    }
  };

  const drawSensor = () => {
    const x = 300;
    let y = animationStep >= 1 ? 155 : 60;

    if (animationStep === 1) {
      y = p.lerp(60, 155, stepProgress);
    }

    // Sensor module
    p.fill(0, 80, 50);
    p.stroke(0, 120, 70);
    p.strokeWeight(2);
    p.rect(x - 30, y, 60, 45, 4);

    // Spring sensor element
    p.fill(180);
    p.stroke(200);
    p.strokeWeight(1);
    p.ellipse(x, y + 15, 20, 20);

    // Spring coil inside
    p.stroke(150);
    p.strokeWeight(1);
    p.noFill();
    p.beginShape();
    for (let i = 0; i < 3; i++) {
      const ang = (i / 3) * p.TWO_PI + p.frameCount * 0.05;
      p.vertex(x + p.cos(ang) * 5, y + 15 + p.sin(ang) * 5);
    }
    p.endShape();

    // Potentiometer
    p.fill(80);
    p.stroke(100);
    p.ellipse(x + 15, y + 35, 12, 12);

    // LED indicator
    const ledOn = animationStep >= 2 && p.sin(p.frameCount * 0.2) > 0;
    p.fill(ledOn ? p.color(255, 50, 50) : p.color(100, 30, 30));
    p.noStroke();
    p.ellipse(x - 15, y + 35, 8, 8);

    // Label
    p.fill(200);
    p.textSize(8);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('SW-420', x, y - 10);

    // Mounting indicator
    if (animationStep >= 2) {
      // Show firm contact
      p.stroke(100, 255, 100);
      p.strokeWeight(2);
      p.noFill();
      p.rect(x - 35, y - 5, 70, 55, 6);

      p.fill(100, 255, 100);
      p.noStroke();
      p.textSize(9);
      p.text('Firmly mounted', x, y + 55);
    }
  };

  const drawMountingInfo = () => {
    p.fill(40, 50, 60);
    p.rect(20, 280, 220, 100, 6);

    p.fill(200);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.LEFT, p.TOP);
    p.text('Mounting Tips:', 30, 290);

    p.fill(150);
    p.textSize(9);
    const tips = [
      '• Mount firmly for best sensitivity',
      '• Use double-sided tape or screws',
      '• Position near vibration source',
      '• Keep electronics away from moisture'
    ];

    for (let i = 0; i < tips.length; i++) {
      p.text(tips[i], 30, 310 + i * 15);
    }
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.LEFT, p.TOP);
    p.text('Mount Vibration Sensor', 20, 20);

    p.textSize(10);
    const steps = [
      '1. Choose monitoring surface',
      '2. Secure sensor firmly'
    ];

    for (let i = 0; i < steps.length; i++) {
      const done = animationStep > i;
      p.fill(done ? 100 : 80, done ? 255 : 150, done ? 100 : 80);
      p.text((done ? '✓ ' : '○ ') + steps[i], 20, 50 + i * 18);
    }

    p.fill(120);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Click to restart', 480, 380);
  };

  p.mousePressed = () => {
    if (p.mouseX > 0 && p.mouseX < 600 && p.mouseY > 0 && p.mouseY < 400) {
      animationStep = 0;
      stepProgress = 0;
    }
  };
};

export default vibrationMountingSketch;
