/**
 * P3-C4-L4 gif2: Angle text updating in real time
 * Shows servo angle value updating as the arm moves
 */
import type p5 from 'p5';

export const angleTextSketch = (p: p5) => {
  let targetAngle = 90;
  let currentAngle = 90;
  let dragging = false;

  p.setup = () => {
    p.createCanvas(400, 300);
  };

  p.draw = () => {
    p.background(30);

    // Smooth animation towards target
    currentAngle += (targetAngle - currentAngle) * 0.1;

    // Title
    p.fill(255);
    p.textSize(16);
    p.textAlign(p.CENTER);
    p.text('Servo Angle Display', p.width / 2, 25);

    // Servo body
    const servoX = 150;
    const servoY = 180;
    const servoW = 80;
    const servoH = 40;

    p.fill(50);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(servoX - servoW / 2, servoY - servoH / 2, servoW, servoH, 5);

    // Servo horn mount
    p.fill(70);
    p.ellipse(servoX, servoY, 25);

    // Servo arm
    const armLength = 70;
    const armAngle = p.map(currentAngle, 0, 180, -p.PI / 2, p.PI / 2);
    const armEndX = servoX + Math.cos(armAngle - p.PI / 2) * armLength;
    const armEndY = servoY + Math.sin(armAngle - p.PI / 2) * armLength;

    p.stroke(200, 100, 50);
    p.strokeWeight(8);
    p.line(servoX, servoY, armEndX, armEndY);

    // Arm end circle (draggable)
    p.fill(255, 150, 50);
    p.stroke(255, 200, 100);
    p.strokeWeight(2);
    p.ellipse(armEndX, armEndY, 20);

    // Angle arc visualization
    p.noFill();
    p.stroke(100, 200, 255, 100);
    p.strokeWeight(2);
    p.arc(servoX, servoY, 100, 100, -p.PI, 0);

    // Angle markers
    p.fill(150);
    p.noStroke();
    p.textSize(10);
    for (let angle = 0; angle <= 180; angle += 30) {
      const markerAngle = p.map(angle, 0, 180, -p.PI / 2, p.PI / 2);
      const markerX = servoX + Math.cos(markerAngle - p.PI / 2) * 60;
      const markerY = servoY + Math.sin(markerAngle - p.PI / 2) * 60;

      p.stroke(100);
      p.strokeWeight(1);
      p.line(
        servoX + Math.cos(markerAngle - p.PI / 2) * 45,
        servoY + Math.sin(markerAngle - p.PI / 2) * 45,
        markerX,
        markerY
      );

      p.noStroke();
      p.text(angle + '°', markerX, markerY - 8);
    }

    // Large angle display
    const displayX = 300;
    const displayY = 120;

    // Display background
    p.fill(20);
    p.stroke(100, 200, 255);
    p.strokeWeight(2);
    p.rect(displayX - 60, displayY - 40, 120, 80, 10);

    // Angle value
    p.fill(100, 255, 100);
    p.noStroke();
    p.textSize(36);
    p.textAlign(p.CENTER);
    p.text(Math.round(currentAngle) + '°', displayX, displayY + 15);

    // Label
    p.fill(150);
    p.textSize(12);
    p.text('ANGLE', displayX, displayY - 20);

    // Code preview
    p.fill(40);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(240, 200, 140, 60, 5);

    p.fill(100, 200, 255);
    p.textSize(11);
    p.textAlign(p.LEFT);
    p.text('servo.write(', 250, 220);
    p.fill(100, 255, 100);
    p.text(Math.round(currentAngle), 250 + p.textWidth('servo.write('), 220);
    p.fill(100, 200, 255);
    p.text(');', 250 + p.textWidth('servo.write(' + Math.round(currentAngle)), 220);

    p.fill(150);
    p.textSize(9);
    p.text(`// Angle: ${Math.round(currentAngle)}°`, 250, 240);
    p.text(`// PWM: ~${Math.round(p.map(currentAngle, 0, 180, 1000, 2000))}µs`, 250, 252);

    // PWM visualization
    const pwmWidth = p.map(currentAngle, 0, 180, 30, 100);
    p.fill(100, 255, 100);
    p.noStroke();
    p.rect(50, 260, pwmWidth, 15);
    p.fill(50);
    p.rect(50 + pwmWidth, 260, 100 - pwmWidth + 30, 15);

    p.fill(255);
    p.textSize(10);
    p.textAlign(p.CENTER);
    p.text('PWM Signal', 100, 255);

    // Instructions
    p.fill(150);
    p.textSize(11);
    p.textAlign(p.CENTER);
    p.text('Drag the servo arm to change angle', p.width / 2, p.height - 10);
  };

  p.mousePressed = () => {
    const servoX = 150;
    const servoY = 180;
    const armLength = 70;
    const armAngle = p.map(currentAngle, 0, 180, -p.PI / 2, p.PI / 2);
    const armEndX = servoX + Math.cos(armAngle - p.PI / 2) * armLength;
    const armEndY = servoY + Math.sin(armAngle - p.PI / 2) * armLength;

    if (p.dist(p.mouseX, p.mouseY, armEndX, armEndY) < 20) {
      dragging = true;
    }
  };

  p.mouseDragged = () => {
    if (dragging) {
      const servoX = 150;
      const servoY = 180;
      const angle = Math.atan2(p.mouseY - servoY, p.mouseX - servoX) + p.PI / 2;
      targetAngle = p.constrain(p.map(angle, -p.PI / 2, p.PI / 2, 0, 180), 0, 180);
    }
  };

  p.mouseReleased = () => {
    dragging = false;
  };
};
