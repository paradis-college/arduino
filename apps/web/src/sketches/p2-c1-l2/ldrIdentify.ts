/**
 * P2-C1-L2 LDR Wiring - Component Identification
 * Animation showing how to identify an LDR component
 */
import type p5 from 'p5';

export const ldrIdentifySketch = (p: p5) => {
  let animationPhase = 0;
  let phaseProgress = 0;
  const animationSpeed = 0.015;

  p.setup = () => {
    p.createCanvas(600, 400);
    p.textFont('monospace');
  };

  p.draw = () => {
    p.background(30, 35, 45);

    drawLDRComponent();
    drawHighlights();
    drawLabels();
    drawProgress();

    // Advance animation
    phaseProgress += animationSpeed;
    if (phaseProgress > 1) {
      phaseProgress = 0;
      animationPhase = (animationPhase + 1) % 4;
    }
  };

  const drawLDRComponent = () => {
    const x = 300;
    const y = 180;
    const scale = 2.5;

    // LDR disc body
    p.fill(80, 60, 40);
    p.stroke(100, 80, 60);
    p.strokeWeight(3);
    p.ellipse(x, y, 60 * scale, 60 * scale);

    // Wavy pattern on top (characteristic of LDR)
    p.fill(200, 150, 100);
    p.noStroke();
    p.ellipse(x, y, 50 * scale, 50 * scale);

    // Zigzag pattern
    p.stroke(80, 60, 40);
    p.strokeWeight(4);
    p.noFill();
    p.beginShape();
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * p.TWO_PI + p.frameCount * 0.005;
      const r1 = 15 * scale;
      const r2 = 20 * scale;
      const r = i % 2 === 0 ? r1 : r2;
      p.vertex(x + p.cos(angle) * r, y + p.sin(angle) * r);
    }
    p.endShape(p.CLOSE);

    // Inner pattern
    p.strokeWeight(3);
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * p.TWO_PI;
      const innerR = 8 * scale;
      const outerR = 18 * scale;
      p.line(
        x + p.cos(angle) * innerR,
        y + p.sin(angle) * innerR,
        x + p.cos(angle) * outerR,
        y + p.sin(angle) * outerR
      );
    }

    // Legs
    p.stroke(180, 180, 180);
    p.strokeWeight(4);
    p.line(x - 15, y + 30 * scale, x - 15, y + 55 * scale);
    p.line(x + 15, y + 30 * scale, x + 15, y + 55 * scale);

    // Leg ends
    p.fill(180);
    p.noStroke();
    p.rect(x - 18, y + 52 * scale, 6, 15, 2);
    p.rect(x + 12, y + 52 * scale, 6, 15, 2);
  };

  const drawHighlights = () => {
    const x = 300;
    const y = 180;
    const scale = 2.5;

    // Phase 1: Highlight disc
    if (animationPhase === 1) {
      p.noFill();
      p.stroke(100, 255, 100, 150 + 100 * p.sin(p.frameCount * 0.1));
      p.strokeWeight(4);
      p.ellipse(x, y, 70 * scale, 70 * scale);

      // Arrow pointing to disc
      p.fill(100, 255, 100);
      p.noStroke();
      p.push();
      p.translate(x + 100, y - 80);
      p.rotate(p.QUARTER_PI);
      p.triangle(0, -10, 0, 10, 20, 0);
      p.pop();

      p.fill(100, 255, 100);
      p.textSize(12);
      p.textAlign(p.LEFT, p.CENTER);
      p.text('Wavy pattern', x + 110, y - 80);
      p.text('on top', x + 110, y - 65);
    }

    // Phase 2: Highlight legs
    if (animationPhase === 2) {
      p.noFill();
      p.stroke(255, 200, 100, 150 + 100 * p.sin(p.frameCount * 0.1));
      p.strokeWeight(4);
      p.rect(x - 25, y + 25 * scale, 50, 50 * scale, 4);

      p.fill(255, 200, 100);
      p.textSize(12);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('Two metal legs', x, y + 80 * scale + 20);
    }

    // Phase 3: Show "not polarized" info
    if (animationPhase === 3) {
      // Draw swap arrows
      p.stroke(100, 200, 255);
      p.strokeWeight(3);
      p.noFill();

      // Curved arrow left to right
      p.arc(x, y + 55 * scale, 80, 40, p.PI, p.TWO_PI);
      // Arrow head
      p.fill(100, 200, 255);
      p.noStroke();
      p.push();
      p.translate(x + 40, y + 55 * scale);
      p.rotate(-p.QUARTER_PI);
      p.triangle(0, -5, 0, 5, 10, 0);
      p.pop();

      p.fill(100, 200, 255);
      p.textSize(12);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('Not polarized - either', x, y + 80 * scale + 20);
      p.text('leg can go either way!', x, y + 80 * scale + 35);
    }
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(16);
    p.textAlign(p.LEFT, p.TOP);
    p.text('Identifying an LDR', 20, 20);

    p.textSize(11);
    p.fill(180);
    p.text('Light Dependent Resistor', 20, 45);

    // Step indicators
    const features = [
      { text: 'Disc shape with wavy pattern', phase: 1 },
      { text: 'Two metal legs', phase: 2 },
      { text: 'Not polarized (no + or -)', phase: 3 }
    ];

    p.textSize(11);
    for (let i = 0; i < features.length; i++) {
      const isActive = animationPhase >= features[i].phase;
      p.fill(isActive ? 100 : 80, isActive ? 255 : 150, isActive ? 100 : 80);

      const checkmark = animationPhase > features[i].phase ? '✓ ' : '○ ';
      p.text(checkmark + features[i].text, 20, 80 + i * 25);
    }

    // Info box
    p.fill(40, 50, 60);
    p.rect(20, 320, 200, 60, 6);
    p.fill(200);
    p.textSize(10);
    p.textAlign(p.LEFT, p.TOP);
    p.text('LDR resistance changes', 30, 330);
    p.text('with light intensity:', 30, 345);
    p.text('• Dark = HIGH resistance', 30, 360);
  };

  const drawProgress = () => {
    // Progress bar
    const barWidth = 200;
    const barX = 380;
    const barY = 380;

    p.fill(50);
    p.noStroke();
    p.rect(barX, barY, barWidth, 8, 4);

    const totalProgress = (animationPhase + phaseProgress) / 4;
    p.fill(100, 200, 100);
    p.rect(barX, barY, barWidth * totalProgress, 8, 4);

    p.fill(120);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Click to restart', 480, 365);
  };

  p.mousePressed = () => {
    if (p.mouseX > 0 && p.mouseX < 600 && p.mouseY > 0 && p.mouseY < 400) {
      animationPhase = 0;
      phaseProgress = 0;
    }
  };
};

export default ldrIdentifySketch;
