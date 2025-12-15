/**
 * P1-C1-L1 GIF5: LED Polarity
 * "Correct vs reversed LED wiring; reversed one stays dark while current dots bounce back."
 */
import type p5 from 'p5';

export const ledPolaritySketch = (p: p5): void => {
  let dotPos1 = 0;
  let dotPos2 = 0;
  let bounceBack = false;

  p.setup = () => {
    p.createCanvas(400, 280);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    p.background(30, 30, 40);

    // Title
    p.fill(200);
    p.textSize(14);
    p.text('LED Polarity Comparison', p.width/2, 20);

    // Draw two circuits side by side
    drawCircuit(p, 50, 60, true, dotPos1);  // Correct
    drawCircuit(p, 220, 60, false, dotPos2, bounceBack); // Reversed

    // Labels
    p.fill(100, 255, 100);
    p.textSize(12);
    p.text('✓ CORRECT', 130, 50);

    p.fill(255, 100, 100);
    p.text('✗ REVERSED', 300, 50);

    // Explanation
    p.fill(150);
    p.textSize(10);
    p.text('Long leg (+) → Short leg (−)', 130, 240);
    p.text('Short leg (−) → Long leg (+)', 300, 240);

    // Animate dots
    dotPos1 = (dotPos1 + 3) % 200;

    // Bounce animation for reversed circuit
    dotPos2 = (dotPos2 + 3) % 120;
    if (dotPos2 > 80) {
      bounceBack = true;
    } else {
      bounceBack = false;
    }

    // Footer instruction
    p.fill(100);
    p.textSize(10);
    p.text('LEDs only allow current flow in one direction', p.width/2, p.height - 10);
  };

  function drawCircuit(p: p5, x: number, y: number, correct: boolean, dotPosition: number, bounce = false) {
    const w = 120;
    const h = 150;

    // Battery
    p.stroke(150);
    p.strokeWeight(2);
    // Positive terminal (longer line)
    p.line(x + 10, y + 20, x + 10, y + 50);
    p.line(x, y + 20, x + 20, y + 20);
    p.line(x + 3, y + 30, x + 17, y + 30);

    // Battery label
    p.fill(150);
    p.noStroke();
    p.textSize(8);
    p.text('+', x + 10, y + 10);
    p.text('−', x + 10, y + 60);

    // Top wire
    p.stroke(150);
    p.strokeWeight(2);
    p.line(x + 10, y + 20, x + w - 10, y + 20);

    // Resistor
    p.noFill();
    p.beginShape();
    const rx = x + 30;
    for (let i = 0; i < 6; i++) {
      p.vertex(rx + i * 8, y + 20 + (i % 2 === 0 ? -6 : 6));
    }
    p.endShape();

    // LED position
    const ledY = y + 60;

    // Wire to LED
    p.stroke(150);
    p.line(x + w - 10, y + 20, x + w - 10, ledY - 20);

    // LED with correct polarity indicator
    if (correct) {
      // Current flows through - LED on
      p.fill(255, 200, 0);
      p.stroke(150);
      p.strokeWeight(2);
      // Triangle pointing down (forward bias)
      p.triangle(x + w - 20, ledY - 15, x + w, ledY - 15, x + w - 10, ledY + 5);
      p.line(x + w - 20, ledY + 5, x + w, ledY + 5);

      // Glow effect
      p.noStroke();
      p.fill(255, 200, 0, 100);
      p.ellipse(x + w - 10, ledY - 5, 40, 40);

      // Light rays
      p.stroke(255, 200, 0);
      p.strokeWeight(1);
      for (let i = 0; i < 3; i++) {
        const angle = p.map(i, 0, 2, -p.PI/4, p.PI/4) - p.PI/2;
        p.line(
          x + w - 10 + p.cos(angle) * 15,
          ledY - 5 + p.sin(angle) * 15,
          x + w - 10 + p.cos(angle) * 25,
          ledY - 5 + p.sin(angle) * 25
        );
      }

      // LED legs indicator
      p.fill(100);
      p.noStroke();
      p.textSize(7);
      p.text('long', x + w - 25, ledY - 25);
      p.text('short', x + w + 5, ledY + 15);
    } else {
      // Reversed - LED off
      p.fill(80);
      p.stroke(150);
      p.strokeWeight(2);
      // Triangle pointing up (reverse bias - blocked)
      p.triangle(x + w - 20, ledY + 5, x + w, ledY + 5, x + w - 10, ledY - 15);
      p.line(x + w - 20, ledY - 15, x + w, ledY - 15);

      // X mark showing blocked
      p.stroke(255, 50, 50);
      p.strokeWeight(2);
      p.line(x + w - 18, ledY - 12, x + w - 2, ledY + 2);
      p.line(x + w - 2, ledY - 12, x + w - 18, ledY + 2);

      // LED legs indicator (reversed)
      p.fill(100);
      p.noStroke();
      p.textSize(7);
      p.text('short', x + w - 25, ledY - 25);
      p.text('long', x + w + 5, ledY + 15);
    }

    // Wire from LED
    p.stroke(150);
    p.strokeWeight(2);
    p.line(x + w - 10, ledY + 20, x + w - 10, y + h);

    // Bottom wire back to battery
    p.line(x + w - 10, y + h, x + 10, y + h);
    p.line(x + 10, y + h, x + 10, y + 50);

    // Current dots
    p.noStroke();
    if (correct) {
      // Flowing current
      p.fill(0, 255, 255);

      // Calculate position along path
      const totalLength = 200;
      const pos = dotPosition % totalLength;

      for (let d = 0; d < 3; d++) {
        const dp = (pos + d * 70) % totalLength;
        let px: number, py: number;

        if (dp < 50) {
          // Top horizontal
          px = x + 10 + dp * 2;
          py = y + 20;
        } else if (dp < 80) {
          // Right vertical down
          px = x + w - 10;
          py = y + 20 + (dp - 50) * 3;
        } else if (dp < 110) {
          // Through LED area
          px = x + w - 10;
          py = ledY + (dp - 80) * 2;
        } else if (dp < 160) {
          // Bottom horizontal
          px = x + w - 10 - (dp - 110) * 2;
          py = y + h;
        } else {
          // Left vertical up
          px = x + 10;
          py = y + h - (dp - 160) * 2.5;
        }

        p.ellipse(px, py, 6, 6);
      }
    } else {
      // Bouncing back current
      const pos = bounce ? 80 - (dotPosition - 80) : dotPosition;

      p.fill(bounce ? 255 : 0, bounce ? 100 : 255, bounce ? 100 : 255);

      if (pos < 50) {
        p.ellipse(x + 10 + pos * 2, y + 20, 6, 6);
      } else {
        p.ellipse(x + w - 10, y + 20 + (pos - 50) * 1.5, 6, 6);
      }

      // Show "blocked" indicator
      if (!bounce && pos > 60) {
        p.fill(255, 100, 100, 150);
        p.textSize(10);
        p.text('blocked!', x + w - 10, ledY + 40);
      }
    }
  }
};
