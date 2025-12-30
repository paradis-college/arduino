/**
 * P2-C1-L2 LDR Voltage Divider Wiring
 * Animation showing how to build the voltage divider circuit
 */
import type p5 from 'p5';

export const ldrVoltageDividerSketch = (p: p5) => {
  let animationStep = 0;
  let wireProgress = 0;
  const animationSpeed = 0.02;

  p.setup = () => {
    p.createCanvas(600, 400);
    p.textFont('monospace');
  };

  p.draw = () => {
    p.background(30, 35, 45);

    drawBreadboard();
    drawArduino();
    drawComponents();
    drawWires();
    drawLabels();
    drawProgress();

    // Advance animation
    wireProgress += animationSpeed;
    if (wireProgress > 1) {
      wireProgress = 0;
      animationStep = (animationStep + 1) % 5;
    }
  };

  const drawBreadboard = () => {
    const x = 280;
    const y = 100;

    // Breadboard body
    p.fill(240, 240, 230);
    p.stroke(200);
    p.strokeWeight(2);
    p.rect(x, y, 280, 200, 8);

    // Power rails
    p.fill(255, 50, 50);
    p.noStroke();
    p.rect(x + 10, y + 10, 260, 15, 4);
    p.fill(50, 50, 50);
    p.rect(x + 10, y + 175, 260, 15, 4);

    // Rail labels
    p.fill(255);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('+ 5V Rail', x + 140, y + 17);
    p.fill(200);
    p.text('- GND Rail', x + 140, y + 182);

    // Breadboard holes (simplified)
    p.fill(30);
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 10; col++) {
        p.ellipse(x + 30 + col * 25, y + 50 + row * 30, 6, 6);
      }
    }
  };

  const drawArduino = () => {
    const x = 40;
    const y = 150;

    // Arduino board (simplified side view)
    p.fill(0, 100, 150);
    p.stroke(0, 150, 200);
    p.strokeWeight(2);
    p.rect(x, y, 100, 150, 6);

    // Label
    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Arduino', x + 50, y + 20);

    // Pins
    const pins = [
      { label: '5V', y: y + 50, color: p.color(255, 50, 50) },
      { label: 'GND', y: y + 75, color: p.color(50) },
      { label: 'A0', y: y + 110, color: p.color(100, 200, 100) }
    ];

    for (const pin of pins) {
      p.fill(pin.color);
      p.rect(x + 85, pin.y, 20, 12, 2);
      p.fill(255);
      p.textSize(8);
      p.text(pin.label, x + 95, pin.y + 6);
    }
  };

  const drawComponents = () => {
    // LDR on breadboard
    const ldrX = 355;
    const ldrY = 120;

    if (animationStep >= 1) {
      // LDR disc
      p.fill(200, 150, 100);
      p.stroke(150, 100, 50);
      p.strokeWeight(2);
      p.ellipse(ldrX, ldrY, 35, 35);

      // Wavy pattern
      p.stroke(100, 70, 40);
      p.strokeWeight(2);
      p.noFill();
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * p.TWO_PI;
        p.line(
          ldrX + p.cos(angle) * 8,
          ldrY + p.sin(angle) * 8,
          ldrX + p.cos(angle) * 15,
          ldrY + p.sin(angle) * 15
        );
      }

      // Legs going into breadboard
      p.stroke(180);
      p.strokeWeight(3);
      p.line(ldrX - 8, ldrY + 17, ldrX - 8, ldrY + 30);
      p.line(ldrX + 8, ldrY + 17, ldrX + 8, ldrY + 30);

      p.fill(255);
      p.noStroke();
      p.textSize(9);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('LDR', ldrX, ldrY + 45);
    }

    // 10kΩ Resistor
    const resX = 430;
    const resY = 190;

    if (animationStep >= 2) {
      // Resistor body
      p.fill(200, 180, 150);
      p.stroke(150, 130, 100);
      p.strokeWeight(2);
      p.rect(resX - 20, resY - 8, 40, 16, 4);

      // Color bands (Brown, Black, Orange = 10k)
      p.noStroke();
      p.fill(139, 69, 19);  // Brown
      p.rect(resX - 15, resY - 7, 4, 14);
      p.fill(0);            // Black
      p.rect(resX - 8, resY - 7, 4, 14);
      p.fill(255, 140, 0);  // Orange
      p.rect(resX - 1, resY - 7, 4, 14);

      // Legs
      p.stroke(180);
      p.strokeWeight(3);
      p.line(resX - 20, resY, resX - 35, resY);
      p.line(resX + 20, resY, resX + 35, resY);

      p.fill(255);
      p.noStroke();
      p.textSize(9);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('10kΩ', resX, resY + 20);
    }
  };

  const drawWires = () => {
    // Step 3: 5V to LDR
    if (animationStep >= 3) {
      const progress = animationStep === 3 ? wireProgress : 1;
      drawAnimatedWire(160, 156, 347, 115, p.color(255, 50, 50), progress);
    }

    // Step 4: LDR to A0 junction + resistor
    if (animationStep >= 4) {
      const progress = animationStep === 4 ? wireProgress : 1;
      // Junction wire to A0
      drawAnimatedWire(363, 150, 160, 216, p.color(100, 200, 100), progress);
      // Already connected via breadboard to resistor
    }

    // Step 5: Resistor to GND (implicit through breadboard rail)
    // Shown as connection to GND rail
  };

  const drawAnimatedWire = (
    x1: number, y1: number,
    x2: number, y2: number,
    wireColor: p5.Color,
    progress: number
  ) => {
    p.stroke(wireColor);
    p.strokeWeight(3);
    p.noFill();

    const midX = (x1 + x2) / 2;
    const midY = Math.max(y1, y2) + 20;

    p.beginShape();
    for (let t = 0; t <= progress; t += 0.02) {
      const px = p.bezierPoint(x1, midX, midX, x2, t);
      const py = p.bezierPoint(y1, midY, midY, y2, t);
      p.vertex(px, py);
    }
    p.endShape();

    // End point
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
    p.text('LDR Voltage Divider', 20, 20);

    p.textSize(10);
    p.fill(150);

    const steps = [
      '1. Place LDR on breadboard',
      '2. Place 10kΩ resistor',
      '3. Connect 5V to LDR leg',
      '4. Connect junction to A0'
    ];

    for (let i = 0; i < steps.length; i++) {
      const isActive = i < animationStep;
      p.fill(isActive ? 100 : 80, isActive ? 255 : 150, isActive ? 100 : 80);
      const check = isActive ? '✓ ' : '○ ';
      p.text(check + steps[i], 20, 50 + i * 18);
    }

    // Circuit diagram hint
    p.fill(40, 50, 60);
    p.rect(20, 320, 170, 65, 6);
    p.fill(200);
    p.textSize(9);
    p.textAlign(p.LEFT, p.TOP);
    p.text('5V → [LDR] → A0 → [10k] → GND', 30, 330);
    p.text('', 30, 345);
    p.text('A0 reads voltage at junction', 30, 355);
    p.text('between LDR and resistor', 30, 368);
  };

  const drawProgress = () => {
    const barWidth = 180;
    const barX = 400;
    const barY = 380;

    p.fill(50);
    p.noStroke();
    p.rect(barX, barY, barWidth, 8, 4);

    const totalProgress = (animationStep + wireProgress) / 5;
    p.fill(100, 200, 100);
    p.rect(barX, barY, barWidth * totalProgress, 8, 4);

    p.fill(120);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Click to restart', 490, 365);
  };

  p.mousePressed = () => {
    if (p.mouseX > 0 && p.mouseX < 600 && p.mouseY > 0 && p.mouseY < 400) {
      animationStep = 0;
      wireProgress = 0;
    }
  };
};

export default ldrVoltageDividerSketch;
