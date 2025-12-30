/**
 * P1-C3-L1 Inductors Sketch 1
 * Coil with rising current and magnetic field lines expanding.
 */
import type p5 from 'p5';

export const inductorFieldSketch = (p: p5) => {
  let current = 0;
  let targetCurrent = 0;
  let switchOn = false;
  let fieldLines: { radius: number; angle: number; strength: number }[] = [];

  p.setup = () => {
    p.createCanvas(600, 400);

    // Initialize field lines
    for (let i = 0; i < 12; i++) {
      fieldLines.push({
        radius: 0,
        angle: (i / 12) * p.TWO_PI,
        strength: 0
      });
    }
  };

  p.draw = () => {
    p.background(30, 35, 45);

    // Update current (inductors resist change)
    targetCurrent = switchOn ? 1 : 0;
    current = p.lerp(current, targetCurrent, 0.02); // Slow rise/fall

    drawCoil();
    drawFieldLines();
    drawCurrentMeter();
    drawSwitch();
    drawLabels();
  };

  p.mousePressed = () => {
    // Toggle switch
    if (p.mouseX > 100 && p.mouseX < 180 && p.mouseY > 300 && p.mouseY < 360) {
      switchOn = !switchOn;
    }
  };

  const drawCoil = () => {
    const cx = 300;
    const cy = 180;
    const coilWidth = 120;
    const coilHeight = 80;
    const turns = 8;

    // Core (iron)
    p.fill(80, 80, 100);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(cx - 20, cy - coilHeight / 2 - 10, 40, coilHeight + 20, 4);

    // Coil windings
    p.stroke(180, 120, 60);
    p.strokeWeight(4);
    p.noFill();

    for (let i = 0; i < turns; i++) {
      const y = cy - coilHeight / 2 + (i + 0.5) * (coilHeight / turns);

      // Back of coil (behind core)
      p.stroke(120, 80, 40);
      p.arc(cx, y, coilWidth, 20, p.PI, 0);

      // Front of coil
      p.stroke(180, 120, 60);
      p.arc(cx, y, coilWidth, 20, 0, p.PI);
    }

    // Connection wires
    p.stroke(100, 150, 200);
    p.strokeWeight(3);
    p.line(cx - coilWidth / 2, cy - coilHeight / 2 + 5, cx - coilWidth / 2 - 50, cy - coilHeight / 2 + 5);
    p.line(cx - coilWidth / 2, cy + coilHeight / 2 - 5, cx - coilWidth / 2 - 50, cy + coilHeight / 2 - 5);

    // Current flow indicators
    if (current > 0.1) {
      const flowSpeed = p.frameCount * 0.1 * current;
      p.fill(100, 200, 255);
      p.noStroke();

      for (let i = 0; i < 5; i++) {
        const phase = (flowSpeed + i * 0.5) % (turns + 1);
        if (phase < turns) {
          const y = cy - coilHeight / 2 + (phase + 0.5) * (coilHeight / turns);
          p.ellipse(cx - coilWidth / 2, y + 10, 8, 8);
        }
      }
    }

    // Label
    p.fill(200);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Inductor', cx, cy + 70);
    p.textSize(11);
    p.text('(Coil)', cx, cy + 85);
  };

  const drawFieldLines = () => {
    const cx = 300;
    const cy = 180;

    // Magnetic field strength proportional to current
    const fieldStrength = current;

    if (fieldStrength > 0.05) {
      p.noFill();

      // Expanding field lines around coil
      for (let ring = 1; ring <= 4; ring++) {
        const baseRadius = 70 + ring * 25;
        const expandedRadius = baseRadius * (0.8 + fieldStrength * 0.4);

        // Animate expansion
        const animatedRadius = p.lerp(0, expandedRadius, p.min(fieldStrength * 2, 1));

        p.stroke(100, 150, 255, fieldStrength * 150 * (1 - ring * 0.2));
        p.strokeWeight(2 - ring * 0.3);

        // Draw field loop (elliptical)
        p.ellipse(cx, cy, animatedRadius * 2, animatedRadius * 1.5);
      }

      // Field direction arrows
      const arrowRadius = 80 + fieldStrength * 40;
      for (let i = 0; i < 4; i++) {
        const angle = i * p.HALF_PI + p.QUARTER_PI;
        const x = cx + p.cos(angle) * arrowRadius;
        const y = cy + p.sin(angle) * arrowRadius * 0.75;

        p.fill(100, 150, 255, fieldStrength * 200);
        p.noStroke();

        // Arrow pointing in field direction
        p.push();
        p.translate(x, y);
        p.rotate(angle + p.HALF_PI);
        p.triangle(-5, 0, 5, 0, 0, -10);
        p.pop();
      }

      // "B" field label
      p.fill(100, 150, 255, fieldStrength * 200);
      p.textSize(16);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('B', cx + 120 * fieldStrength + 50, cy - 60);
    }
  };

  const drawCurrentMeter = () => {
    const x = 480;
    const y = 180;
    const w = 100;
    const h = 80;

    // Meter body
    p.fill(40, 45, 55);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x - w / 2, y - h / 2, w, h, 8);

    // Meter arc
    p.noFill();
    p.stroke(80);
    p.strokeWeight(1);
    p.arc(x, y + 10, 70, 70, p.PI, 0);

    // Scale marks
    for (let i = 0; i <= 10; i++) {
      const angle = p.PI + (i / 10) * p.PI;
      const r1 = 30;
      const r2 = 35;
      p.stroke(150);
      p.line(
        x + p.cos(angle) * r1,
        y + 10 + p.sin(angle) * r1,
        x + p.cos(angle) * r2,
        y + 10 + p.sin(angle) * r2
      );
    }

    // Needle
    const needleAngle = p.PI + current * p.PI;
    p.stroke(255, 100, 100);
    p.strokeWeight(2);
    p.line(x, y + 10, x + p.cos(needleAngle) * 28, y + 10 + p.sin(needleAngle) * 28);

    // Center dot
    p.fill(200);
    p.noStroke();
    p.ellipse(x, y + 10, 8, 8);

    // Labels
    p.fill(200);
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Current', x, y - h / 2 - 15);
    p.textSize(10);
    p.text(`${(current * 100).toFixed(0)}%`, x, y + h / 2 - 10);
  };

  const drawSwitch = () => {
    const x = 140;
    const y = 330;
    const w = 80;
    const h = 50;

    // Switch body
    p.fill(switchOn ? p.color(60, 120, 60) : p.color(80, 80, 90));
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x - w / 2, y - h / 2, w, h, 8);

    // Switch label
    p.fill(255);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(switchOn ? 'ON' : 'OFF', x, y);

    p.fill(150);
    p.textSize(10);
    p.text('Click to toggle', x, y + 40);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(13);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('When current flows through the coil:', 50, 50);
    p.text('→ A magnetic field is created', 60, 70);
    p.text('→ Field strength ∝ Current', 60, 90);

    p.fill(150);
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Notice how current rises slowly (inductor resists change)', 300, 385);
  };
};

export default inductorFieldSketch;
