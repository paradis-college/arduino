/**
 * P3-C4-L1 gif2: Binary counter visualizing 00000000→11111111
 * 8 LEDs counting up in binary from 0 to 255
 */
import type p5 from 'p5';

export const binaryCounterSketch = (p: p5) => {
  let counter = 0;
  let frameCounter = 0;
  let speed = 10;

  p.setup = () => {
    p.createCanvas(400, 300);
  };

  p.draw = () => {
    p.background(30);
    frameCounter++;

    // Update counter
    if (frameCounter % speed === 0) {
      counter = (counter + 1) % 256;
    }

    // Title
    p.fill(255);
    p.textSize(16);
    p.textAlign(p.CENTER);
    p.text('8-Bit Binary Counter', p.width / 2, 25);

    // Draw 8 LEDs
    const startX = 50;
    const ledSpacing = 40;
    const ledY = 100;

    // Bit labels
    p.fill(150);
    p.textSize(10);
    for (let i = 0; i < 8; i++) {
      const x = startX + i * ledSpacing;
      p.text(`Bit ${7 - i}`, x, ledY - 35);
      p.text(`2^${7 - i}`, x, ledY - 22);
    }

    // Draw LEDs
    for (let i = 0; i < 8; i++) {
      const x = startX + i * ledSpacing;
      const bitValue = (counter >> (7 - i)) & 1;

      // LED glow
      if (bitValue === 1) {
        p.noStroke();
        for (let j = 4; j > 0; j--) {
          p.fill(100, 255, 100, 40 * (5 - j));
          p.ellipse(x, ledY, 25 + j * 8);
        }
      }

      // LED body
      p.fill(bitValue === 1 ? [100, 255, 100] : [30, 60, 30]);
      p.stroke(100);
      p.strokeWeight(2);
      p.ellipse(x, ledY, 25);

      // LED legs
      p.stroke(150);
      p.strokeWeight(2);
      p.line(x - 5, ledY + 13, x - 5, ledY + 30);
      p.line(x + 5, ledY + 13, x + 5, ledY + 35);

      // Binary value label
      p.noStroke();
      p.fill(bitValue === 1 ? [100, 255, 100] : [100, 100, 100]);
      p.textSize(14);
      p.text(bitValue.toString(), x, ledY + 55);
    }

    // Binary string
    const binaryStr = counter.toString(2).padStart(8, '0');
    p.fill(100, 255, 100);
    p.textSize(18);
    p.text(`Binary: ${binaryStr}`, p.width / 2, 200);

    // Decimal value
    p.fill(255, 200, 50);
    p.textSize(18);
    p.text(`Decimal: ${counter}`, p.width / 2, 230);

    // Hexadecimal value
    p.fill(100, 200, 255);
    p.textSize(14);
    p.text(`Hex: 0x${counter.toString(16).toUpperCase().padStart(2, '0')}`, p.width / 2, 255);

    // Speed control hint
    p.fill(150);
    p.textSize(11);
    p.text('Press UP/DOWN arrows to change speed | SPACE to reset', p.width / 2, p.height - 15);

    // Current speed indicator
    p.fill(200);
    p.textSize(10);
    p.textAlign(p.RIGHT);
    p.text(`Speed: ${11 - speed}x`, p.width - 20, 25);
  };

  p.keyPressed = () => {
    if (p.keyCode === p.UP_ARROW as unknown as number) {
      speed = Math.max(1, speed - 2);
    } else if (p.keyCode === p.DOWN_ARROW as unknown as number) {
      speed = Math.min(20, speed + 2);
    } else if (p.key === ' ') {
      counter = 0;
    }
  };
};
