/**
 * P3-C3-L2 Potentiometer Sketch 1
 * Knob rotates mapping to 0–1023 bar.
 */
import type p5 from 'p5';

export const potentiometerSketch = (p: p5) => {
  let knobAngle = 0;
  let isDragging = false;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);
    const analogValue = Math.round(p.map(knobAngle, -135, 135, 0, 1023));
    drawPotentiometer();
    drawValueDisplay(analogValue);
    drawLabels();
  };

  p.mousePressed = () => {
    if (p.dist(p.mouseX, p.mouseY, 180, 200) < 60) {
      isDragging = true;
    }
  };

  p.mouseReleased = () => {
    isDragging = false;
  };

  p.mouseDragged = () => {
    if (isDragging) {
      const dx = p.mouseX - 180;
      const dy = p.mouseY - 200;
      knobAngle = p.degrees(p.atan2(dy, dx)) + 90;
      knobAngle = p.constrain(knobAngle, -135, 135);
    }
  };

  const drawPotentiometer = () => {
    const x = 180;
    const y = 200;
    const radius = 60;

    // Base
    p.fill(40, 40, 50);
    p.stroke(80);
    p.strokeWeight(3);
    p.ellipse(x, y, radius * 2 + 20, radius * 2 + 20);

    // Track
    p.noFill();
    p.stroke(60, 80, 100);
    p.strokeWeight(8);
    p.arc(x, y, radius * 1.6, radius * 1.6, p.radians(-225), p.radians(45));

    // Value arc
    const valueAngle = p.map(knobAngle, -135, 135, -225, 45);
    p.stroke(100, 200, 255);
    p.arc(x, y, radius * 1.6, radius * 1.6, p.radians(-225), p.radians(valueAngle));

    // Knob
    p.fill(80, 80, 90);
    p.stroke(100);
    p.strokeWeight(2);
    p.ellipse(x, y, radius * 1.2, radius * 1.2);

    // Indicator line on knob
    p.push();
    p.translate(x, y);
    p.rotate(p.radians(knobAngle));
    p.stroke(200);
    p.strokeWeight(3);
    p.line(0, -10, 0, -radius * 0.5);
    p.fill(255, 200, 100);
    p.noStroke();
    p.ellipse(0, -radius * 0.5, 10, 10);
    p.pop();

    // Labels
    p.fill(200);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Potentiometer', x, y + 90);
    p.text('(Drag to rotate)', x, y + 105);

    p.textSize(9);
    p.text('0', x - 70, y + 50);
    p.text('1023', x + 70, y + 50);
  };

  const drawValueDisplay = (value: number) => {
    const x = 420;
    const y = 200;
    const w = 160;
    const h = 150;

    // Display box
    p.fill(40, 45, 55);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x - w / 2, y - h / 2, w, h, 10);

    // Value
    p.fill(100, 200, 255);
    p.noStroke();
    p.textSize(36);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(value, x, y - 30);

    p.fill(200);
    p.textSize(12);
    p.text('analogRead()', x, y + 5);

    // Bar graph
    const barY = y + 35;
    p.fill(60);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(x - 60, barY, 120, 20, 4);

    const barWidth = (value / 1023) * 120;
    p.fill(100, 200, 255);
    p.noStroke();
    p.rect(x - 60, barY, barWidth, 20, 4);

    // Scale
    p.fill(150);
    p.textSize(9);
    p.text('0', x - 60, barY + 30);
    p.textAlign(p.RIGHT, p.CENTER);
    p.text('1023', x + 60, barY + 30);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Potentiometer: Analog Input', 50, 50);
    p.text('→ Variable resistor (0-10kΩ)', 60, 70);
    p.text('→ Maps to 0-1023 (10-bit ADC)', 60, 90);

    p.fill(150);
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Drag the knob to change the analog value', 300, 370);
  };
};

export default potentiometerSketch;
