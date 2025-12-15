/**
 * P3-C4-L1 LED Patterns Sketch 1
 * 8-LED chase (left→right→left).
 */
import type p5 from 'p5';

export const ledPatternsSketch = (p: p5) => {
  let currentLed = 0;
  let direction = 1;
  let timer = 0;
  const delay = 150;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);

    timer += p.deltaTime;
    if (timer >= delay) {
      timer = 0;
      currentLed += direction;
      if (currentLed >= 7) direction = -1;
      if (currentLed <= 0) direction = 1;
    }

    drawLEDs();
    drawLabels();
  };

  const drawLEDs = () => {
    const startX = 80;
    const y = 200;
    const spacing = 55;

    for (let i = 0; i < 8; i++) {
      const x = startX + i * spacing;
      const isOn = i === currentLed;

      if (isOn) {
        p.noStroke();
        for (let r = 35; r > 0; r -= 7) {
          p.fill(100, 255, 100, (1 - r / 35) * 180);
          p.ellipse(x, y, r * 2, r * 2);
        }
      }

      p.fill(isOn ? p.color(100, 255, 100) : p.color(50, 80, 50));
      p.stroke(80);
      p.strokeWeight(2);
      p.ellipse(x, y, 40, 40);

      p.fill(200);
      p.noStroke();
      p.textSize(10);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(`${i}`, x, y + 35);
    }

    // Direction indicator
    p.fill(255, 200, 100);
    p.textSize(20);
    p.text(direction > 0 ? '→' : '←', 300, 130);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('8-LED Chase Pattern (Knight Rider)', 50, 50);
    p.text('→ Light bounces left to right and back', 60, 70);

    p.fill(150);
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Watch the light bounce back and forth!', 300, 340);
  };
};

export default ledPatternsSketch;
