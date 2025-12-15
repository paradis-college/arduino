/**
 * P3-C4-L4 Servo Motor Sketch 1
 * Servo arm sweeping 0°–180° with slider.
 */
import type p5 from 'p5';

export const servoSketch = (p: p5) => {
  let targetAngle = 90;
  let currentAngle = 90;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);
    currentAngle = p.lerp(currentAngle, targetAngle, 0.08);
    drawSlider();
    drawServo();
    drawLabels();
  };

  p.mouseDragged = () => {
    if (p.mouseX > 350 && p.mouseX < 550 && p.mouseY > 300 && p.mouseY < 340) {
      targetAngle = p.map(p.mouseX, 350, 550, 0, 180);
    }
  };

  const drawSlider = () => {
    const x = 350;
    const y = 320;
    const w = 200;

    p.fill(60);
    p.stroke(80);
    p.strokeWeight(2);
    p.rect(x, y - 8, w, 16, 8);

    const handleX = p.map(targetAngle, 0, 180, x, x + w);
    p.fill(255, 150, 100);
    p.stroke(255);
    p.strokeWeight(2);
    p.ellipse(handleX, y, 22, 22);

    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Servo Angle', x + w / 2, y - 30);
    p.fill(255, 150, 100);
    p.textSize(20);
    p.text(`${Math.round(currentAngle)}°`, x + w / 2, y + 35);

    p.fill(150);
    p.textSize(10);
    p.text('0°', x - 15, y);
    p.text('180°', x + w + 20, y);
  };

  const drawServo = () => {
    const cx = 200;
    const cy = 200;

    // Servo body
    p.fill(50, 50, 60);
    p.stroke(80);
    p.strokeWeight(2);
    p.rect(cx - 50, cy - 30, 100, 60, 5);

    // Mounting tabs
    p.fill(60, 60, 70);
    p.rect(cx - 60, cy - 10, 15, 20, 2);
    p.rect(cx + 45, cy - 10, 15, 20, 2);

    // Rotation hub
    p.fill(40, 40, 50);
    p.stroke(100);
    p.ellipse(cx, cy, 40, 40);

    // Servo arm
    const armAngle = p.radians(currentAngle - 90);
    p.push();
    p.translate(cx, cy);
    p.rotate(armAngle);

    p.fill(200, 150, 100);
    p.stroke(180, 130, 80);
    p.strokeWeight(2);
    p.rect(-8, -80, 16, 80, 3);

    // Arm holes
    p.fill(150, 100, 60);
    p.noStroke();
    for (let i = 1; i <= 3; i++) {
      p.ellipse(0, -20 - i * 15, 6, 6);
    }

    p.pop();

    // Center screw
    p.fill(100);
    p.stroke(80);
    p.strokeWeight(1);
    p.ellipse(cx, cy, 15, 15);

    // Angle arc indicator
    p.noFill();
    p.stroke(100, 200, 255, 150);
    p.strokeWeight(3);
    p.arc(cx, cy, 100, 100, p.radians(-90), p.radians(currentAngle - 90));

    // Scale marks
    p.stroke(150);
    p.strokeWeight(1);
    for (let a = 0; a <= 180; a += 30) {
      const rad = p.radians(a - 90);
      const r1 = 55;
      const r2 = 65;
      p.line(cx + p.cos(rad) * r1, cy + p.sin(rad) * r1, cx + p.cos(rad) * r2, cy + p.sin(rad) * r2);

      p.fill(150);
      p.noStroke();
      p.textSize(9);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(`${a}`, cx + p.cos(rad) * 75, cy + p.sin(rad) * 75);
      p.stroke(150);
      p.strokeWeight(1);
    }

    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Servo Motor', cx, cy + 90);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Servo Motor: Precise angle control', 50, 50);
    p.text('→ Rotates to exact position (0-180°)', 60, 70);

    p.fill(150);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Drag slider to set target angle', 450, 380);
  };
};

export default servoSketch;
