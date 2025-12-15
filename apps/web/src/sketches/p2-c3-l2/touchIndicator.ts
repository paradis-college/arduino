/**
 * P2-C3-L2 Touch Sensors - GIF 2
 * Touch HIGH/LOW indicator toggling instantly
 */
import type p5 from 'p5';

export const touchIndicatorSketch = (p: p5) => {
  let isTouched = false;
  let touchCount = 0;
  const touchHistory: boolean[] = [];
  const maxHistory = 60;

  p.setup = () => {
    p.createCanvas(400, 200);
    p.textFont('monospace');
    // Initialize history
    for (let i = 0; i < maxHistory; i++) {
      touchHistory.push(false);
    }
  };

  p.draw = () => {
    p.background(30, 35, 45);

    // Update history
    if (p.frameCount % 2 === 0) {
      touchHistory.shift();
      touchHistory.push(isTouched);
    }

    // Touch pad area
    p.fill(isTouched ? p.color(80, 120, 180) : p.color(60, 70, 90));
    p.stroke(isTouched ? p.color(100, 150, 220) : p.color(80, 90, 110));
    p.strokeWeight(3);
    p.rect(30, 30, 140, 100, 15);

    // Capacitive pattern
    p.stroke(isTouched ? p.color(120, 170, 240, 150) : p.color(90, 100, 120, 100));
    p.strokeWeight(1);
    p.noFill();
    for (let i = 0; i < 4; i++) {
      p.rect(45 + i * 30, 45, 20, 70, 3);
    }

    // Touch ripple effect when touched
    if (isTouched) {
      const rippleSize = (p.frameCount % 30) * 4;
      const rippleAlpha = 255 - rippleSize * 8;
      p.noFill();
      p.stroke(100, 200, 255, rippleAlpha);
      p.strokeWeight(2);
      p.ellipse(100, 80, rippleSize, rippleSize);
    }

    // Finger icon
    p.fill(isTouched ? p.color(255, 200, 180) : p.color(150, 120, 100));
    p.noStroke();
    const fingerY = isTouched ? 75 : 50;
    p.ellipse(100, fingerY, 25, 35);
    p.rect(88, fingerY, 24, 40, 5);

    // Digital indicator panel
    p.fill(20, 25, 35);
    p.stroke(isTouched ? p.color(100, 255, 100) : p.color(150, 100, 100));
    p.strokeWeight(3);
    p.rect(200, 30, 180, 60, 10);

    // HIGH/LOW text
    p.fill(isTouched ? p.color(100, 255, 100) : p.color(255, 100, 100));
    p.noStroke();
    p.textSize(28);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(isTouched ? 'HIGH' : 'LOW', 290, 50);

    // Binary value
    p.fill(200);
    p.textSize(16);
    p.text(isTouched ? '1' : '0', 290, 75);

    // LED indicator
    const ledColor = isTouched ? p.color(100, 255, 100) : p.color(50, 50, 50);

    // LED glow
    if (isTouched) {
      for (let i = 3; i > 0; i--) {
        p.fill(100, 255, 100, 30 * i);
        p.noStroke();
        p.ellipse(350, 60, 20 + i * 10, 20 + i * 10);
      }
    }

    p.fill(ledColor);
    p.stroke(80);
    p.strokeWeight(1);
    p.ellipse(350, 60, 20, 20);

    // Touch timeline
    p.fill(40, 45, 55);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(30, 145, 340, 45, 5);

    // Timeline labels
    p.fill(150);
    p.noStroke();
    p.textSize(9);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('HIGH', 35, 155);
    p.text('LOW', 35, 180);

    // Timeline grid
    p.stroke(60);
    p.line(70, 157, 360, 157);
    p.line(70, 178, 360, 178);

    // Draw touch signal
    p.stroke(100, 200, 255);
    p.strokeWeight(2);
    p.noFill();
    p.beginShape();

    for (let i = 0; i < touchHistory.length; i++) {
      const x = p.map(i, 0, maxHistory - 1, 70, 360);
      const y = touchHistory[i] ? 157 : 178;

      if (i > 0 && touchHistory[i] !== touchHistory[i - 1]) {
        const prevX = p.map(i - 1, 0, maxHistory - 1, 70, 360);
        p.vertex(prevX, touchHistory[i - 1] ? 157 : 178);
        p.vertex(x, y);
      }
      p.vertex(x, y);
    }
    p.endShape();

    // Current state marker
    p.fill(isTouched ? p.color(100, 255, 100) : p.color(255, 100, 100));
    p.noStroke();
    p.ellipse(360, isTouched ? 157 : 178, 8, 8);

    // Touch count
    p.fill(150);
    p.textSize(10);
    p.textAlign(p.RIGHT, p.TOP);
    p.text(`Touches: ${touchCount}`, 370, 135);

    // Instructions
    p.fill(120);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Click/hold touch pad to activate', 100, 140);
  };

  p.mousePressed = () => {
    if (p.mouseX > 30 && p.mouseX < 170 && p.mouseY > 30 && p.mouseY < 130) {
      isTouched = true;
      touchCount++;
    }
  };

  p.mouseReleased = () => {
    isTouched = false;
  };
};
