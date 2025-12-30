/**
 * P3-C4-L3 DC Motor Sketch 1
 * PWM slider controlling fan-spin speed.
 */
import type p5 from 'p5';

export const dcMotorSketch = (p: p5) => {
  let pwmValue = 128;
  let motorAngle = 0;
  let motorSpeed = 0;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);

    const targetSpeed = (pwmValue / 255) * 0.25;
    motorSpeed = p.lerp(motorSpeed, targetSpeed, 0.05);
    motorAngle += motorSpeed;

    drawSlider();
    drawMotor();
    drawLabels();
  };

  p.mouseDragged = () => {
    if (p.mouseX > 350 && p.mouseX < 550 && p.mouseY > 280 && p.mouseY < 320) {
      pwmValue = p.map(p.mouseX, 350, 550, 0, 255);
      pwmValue = p.constrain(pwmValue, 0, 255);
    }
  };

  const drawSlider = () => {
    const x = 350;
    const y = 300;
    const w = 200;

    p.fill(60);
    p.stroke(80);
    p.strokeWeight(2);
    p.rect(x, y - 8, w, 16, 8);

    p.fill(100, 200, 100);
    p.noStroke();
    p.rect(x, y - 8, w * (pwmValue / 255), 16, 8, 0, 0, 8);

    const handleX = p.map(pwmValue, 0, 255, x, x + w);
    p.fill(200);
    p.stroke(255);
    p.strokeWeight(2);
    p.ellipse(handleX, y, 22, 22);

    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('PWM Speed Control', x + w / 2, y - 30);
    p.fill(100, 200, 255);
    p.textSize(16);
    p.text(`${Math.round(pwmValue)}`, x + w / 2, y + 30);
  };

  const drawMotor = () => {
    const cx = 200;
    const cy = 200;
    const radius = 80;

    p.fill(60, 60, 70);
    p.stroke(100);
    p.strokeWeight(3);
    p.ellipse(cx, cy, radius * 2, radius * 2);

    p.fill(80, 80, 90);
    p.ellipse(cx, cy, radius * 1.5, radius * 1.5);

    p.push();
    p.translate(cx, cy);
    p.rotate(motorAngle);

    p.fill(150, 100, 50);
    p.stroke(100);
    p.strokeWeight(2);
    for (let i = 0; i < 4; i++) {
      p.push();
      p.rotate(i * p.HALF_PI);
      p.beginShape();
      p.vertex(0, -5);
      p.vertex(50, -10);
      p.vertex(55, 0);
      p.vertex(50, 10);
      p.vertex(0, 5);
      p.endShape(p.CLOSE);
      p.pop();
    }

    p.fill(100);
    p.ellipse(0, 0, 25, 25);
    p.pop();

    if (motorSpeed > 0.1) {
      p.noFill();
      p.stroke(255, 255, 255, motorSpeed * 200);
      p.strokeWeight(1);
      for (let i = 0; i < 3; i++) {
        p.ellipse(cx, cy, radius * 1.3 + i * 5, radius * 1.3 + i * 5);
      }
    }

    const rpm = Math.round(motorSpeed * 3000);
    p.fill(200);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(`${rpm} RPM`, cx, cy + radius + 30);
    p.text('DC Motor', cx, cy + radius + 50);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('DC Motor with PWM Control', 50, 50);
    p.text('→ Higher PWM = faster rotation', 60, 70);

    p.fill(150);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Drag slider to control motor speed', 450, 360);
  };
};

export default dcMotorSketch;
