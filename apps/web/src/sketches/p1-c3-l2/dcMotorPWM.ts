/**
 * P1-C3-L2 Motors Sketch 1
 * DC motor speed controlled by PWM slider (faster pulses = faster spin).
 */
import type p5 from 'p5';

export const dcMotorPWMSketch = (p: p5) => {
  let pwmValue = 128; // 0-255
  let motorAngle = 0;
  let motorSpeed = 0;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);

    // Calculate motor speed from PWM
    const targetSpeed = (pwmValue / 255) * 0.3;
    motorSpeed = p.lerp(motorSpeed, targetSpeed, 0.05);
    motorAngle += motorSpeed;

    drawPWMSlider();
    drawPWMWaveform();
    drawMotor();
    drawLabels();
  };

  p.mouseDragged = () => {
    // PWM slider
    if (p.mouseX > 50 && p.mouseX < 250 && p.mouseY > 300 && p.mouseY < 340) {
      pwmValue = p.constrain(p.map(p.mouseX, 50, 250, 0, 255), 0, 255);
    }
  };

  const drawPWMSlider = () => {
    const x = 50;
    const y = 320;
    const w = 200;

    // Track
    p.fill(60);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x, y - 5, w, 10, 5);

    // Fill
    p.fill(100, 200, 100);
    p.noStroke();
    p.rect(x, y - 5, w * (pwmValue / 255), 10, 5, 0, 0, 5);

    // Handle
    const handleX = x + w * (pwmValue / 255);
    p.fill(200);
    p.stroke(255);
    p.strokeWeight(2);
    p.ellipse(handleX, y, 20, 20);

    // Labels
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('PWM Duty Cycle', x + w / 2, y - 30);
    p.textSize(10);
    p.text('0', x - 10, y);
    p.text('255', x + w + 15, y);

    // Value display
    p.fill(100, 200, 255);
    p.textSize(14);
    p.text(`PWM: ${Math.round(pwmValue)} (${((pwmValue / 255) * 100).toFixed(0)}%)`, x + w / 2, y + 30);
  };

  const drawPWMWaveform = () => {
    const x = 50;
    const y = 180;
    const w = 200;
    const h = 80;
    const dutyCycle = pwmValue / 255;

    // Background
    p.fill(40, 45, 55);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(x, y, w, h);

    // Draw PWM waveform
    p.stroke(100, 255, 100);
    p.strokeWeight(2);
    p.noFill();

    const period = w / 4; // 4 cycles visible
    p.beginShape();
    for (let i = 0; i < 4; i++) {
      const startX = x + i * period;
      const highWidth = period * dutyCycle;

      // High portion
      p.vertex(startX, y + 10);
      p.vertex(startX + highWidth, y + 10);

      // Low portion
      p.vertex(startX + highWidth, y + h - 10);
      p.vertex(startX + period, y + h - 10);
    }
    p.endShape();

    // Labels
    p.fill(150);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('PWM Signal', x + w / 2, y - 15);
    p.text('HIGH', x - 25, y + 15);
    p.text('LOW', x - 25, y + h - 15);
  };

  const drawMotor = () => {
    const cx = 450;
    const cy = 200;
    const motorRadius = 70;

    // Motor housing
    p.fill(60, 60, 70);
    p.stroke(100);
    p.strokeWeight(3);
    p.ellipse(cx, cy, motorRadius * 2, motorRadius * 2);

    // Inner ring
    p.fill(80, 80, 90);
    p.ellipse(cx, cy, motorRadius * 1.4, motorRadius * 1.4);

    // Rotating shaft/blade
    p.push();
    p.translate(cx, cy);
    p.rotate(motorAngle);

    // Motor blades/rotor
    p.fill(150, 100, 50);
    p.stroke(100);
    p.strokeWeight(2);
    for (let i = 0; i < 4; i++) {
      p.push();
      p.rotate(i * p.HALF_PI);
      p.beginShape();
      p.vertex(0, -5);
      p.vertex(40, -8);
      p.vertex(45, 0);
      p.vertex(40, 8);
      p.vertex(0, 5);
      p.endShape(p.CLOSE);
      p.pop();
    }

    // Center hub
    p.fill(100);
    p.ellipse(0, 0, 20, 20);

    p.pop();

    // Speed blur effect
    if (motorSpeed > 0.1) {
      p.noFill();
      p.stroke(255, 255, 255, motorSpeed * 100);
      p.strokeWeight(1);
      for (let i = 0; i < 3; i++) {
        p.ellipse(cx, cy, motorRadius * 1.2 + i * 5, motorRadius * 1.2 + i * 5);
      }
    }

    // Motor terminals
    p.fill(180, 50, 50);
    p.stroke(100);
    p.strokeWeight(1);
    p.rect(cx - 80, cy - 10, 15, 8, 2);
    p.fill(50, 50, 180);
    p.rect(cx - 80, cy + 2, 15, 8, 2);

    // Speed display
    p.fill(200);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.CENTER, p.CENTER);
    const rpm = Math.round(motorSpeed * 3000);
    p.text(`${rpm} RPM`, cx, cy + motorRadius + 30);
    p.text('DC Motor', cx, cy + motorRadius + 50);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Higher PWM duty cycle = More power to motor', 50, 50);
    p.text('→ Motor spins faster!', 60, 70);

    p.fill(150);
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Drag the slider to adjust motor speed', 300, 385);
  };
};

export default dcMotorPWMSketch;
