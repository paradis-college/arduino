import type p5 from 'p5';

/**
 * Simultaneous blink pattern toggle
 * gif2: Simultaneous blink pattern toggle
 */
export const simultaneousBlinkSketch = (p: p5) => {
  let ledStates = [false, false, false];
  let lastToggle = 0;
  const delayMs = 500;

  p.setup = () => {
    p.createCanvas(400, 250);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    p.background(30);

    // Title
    p.fill(255);
    p.textSize(16);
    p.noStroke();
    p.text('Simultaneous Blink Pattern', p.width / 2, 25);

    // Toggle all LEDs at once
    if (p.millis() - lastToggle > delayMs) {
      for (let i = 0; i < ledStates.length; i++) {
        ledStates[i] = !ledStates[i];
      }
      lastToggle = p.millis();
    }

    // Draw 3 LEDs
    const colors = [
      { on: [255, 50, 50], off: [100, 30, 30] },
      { on: [50, 255, 50], off: [30, 100, 30] },
      { on: [50, 50, 255], off: [30, 30, 100] },
    ];
    const labels = ['RED', 'GREEN', 'BLUE'];

    for (let i = 0; i < 3; i++) {
      const ledX = 100 + i * 100;
      const ledY = 120;
      const ledR = 50;

      // LED glow
      if (ledStates[i]) {
        p.noStroke();
        for (let j = 4; j > 0; j--) {
          p.fill(colors[i].on[0], colors[i].on[1], colors[i].on[2], 30 * j);
          p.ellipse(ledX, ledY, ledR + j * 12, ledR + j * 12);
        }
        p.fill(colors[i].on[0], colors[i].on[1], colors[i].on[2]);
      } else {
        p.fill(colors[i].off[0], colors[i].off[1], colors[i].off[2]);
      }
      p.stroke(80);
      p.strokeWeight(2);
      p.ellipse(ledX, ledY, ledR, ledR);

      // Label
      p.noStroke();
      p.fill(200);
      p.textSize(11);
      p.text(labels[i], ledX, ledY + 45);
    }

    // Pattern indicator
    p.fill(ledStates[0] ? '#4CAF50' : '#f44336');
    p.textSize(14);
    p.text(ledStates[0] ? 'ALL ON' : 'ALL OFF', p.width / 2, p.height - 40);

    // Description
    p.fill(150);
    p.textSize(11);
    p.text('All LEDs toggle simultaneously', p.width / 2, p.height - 15);
  };
};
