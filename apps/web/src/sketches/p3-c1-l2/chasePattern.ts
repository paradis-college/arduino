import type p5 from 'p5';

/**
 * Shows the chase pattern animation - lights going one by one
 */
export const chasePatternSketch = (p: p5) => {
  let currentLed = 0;
  let lastToggle = 0;
  const delayMs = 300;

  p.setup = () => {
    p.createCanvas(400, 260);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    p.background(30);

    // Update chase
    if (p.millis() - lastToggle > delayMs) {
      currentLed = (currentLed + 1) % 3;
      lastToggle = p.millis();
    }

    // Title
    p.fill(255);
    p.textSize(16);
    p.noStroke();
    p.text('The Chase Pattern! 🐛', p.width / 2, 25);

    // Three LEDs
    const ledColors = [
      { on: [255, 80, 80], off: [100, 40, 40] },
      { on: [255, 200, 80], off: [100, 80, 40] },
      { on: [80, 255, 80], off: [40, 100, 40] }
    ];

    const ledStartX = 80;
    const ledSpacing = 100;
    const ledY = 100;

    for (let i = 0; i < 3; i++) {
      const ledX = ledStartX + i * ledSpacing;
      const isOn = i === currentLed;
      const color = ledColors[i];

      // LED glow
      if (isOn) {
        p.noStroke();
        for (let j = 5; j > 0; j--) {
          p.fill(color.on[0], color.on[1], color.on[2], 30 * j);
          p.ellipse(ledX, ledY, 40 + j * 12, 40 + j * 12);
        }
      }

      // LED body
      p.fill(isOn ? p.color(color.on[0], color.on[1], color.on[2]) : p.color(color.off[0], color.off[1], color.off[2]));
      p.stroke(isOn ? 255 : 80);
      p.strokeWeight(isOn ? 3 : 1);
      p.ellipse(ledX, ledY, 50, 50);

      // LED label
      p.fill(isOn ? 255 : 150);
      p.noStroke();
      p.textSize(12);
      p.text(`LED ${i + 1}`, ledX, ledY + 45);
    }

    // Chase arrow
    p.stroke(100, 200, 255);
    p.strokeWeight(3);
    const arrowY = ledY - 50;
    p.line(ledStartX, arrowY, ledStartX + 2 * ledSpacing, arrowY);
    
    // Arrow head
    p.fill(100, 200, 255);
    p.noStroke();
    p.triangle(
      ledStartX + 2 * ledSpacing + 10, arrowY,
      ledStartX + 2 * ledSpacing, arrowY - 8,
      ledStartX + 2 * ledSpacing, arrowY + 8
    );

    // Current position indicator
    const indicatorX = ledStartX + currentLed * ledSpacing;
    p.fill(255, 200, 0);
    p.triangle(indicatorX - 10, arrowY - 15, indicatorX + 10, arrowY - 15, indicatorX, arrowY - 5);

    // Caterpillar analogy
    p.fill(200);
    p.textSize(12);
    p.text('🐛 Like a caterpillar crawling along!', p.width / 2, 175);

    // Code at bottom
    p.fill(40);
    p.noStroke();
    p.rect(30, 195, 340, 55, 5);

    p.textSize(10);
    p.textAlign(p.LEFT, p.TOP);
    
    const codeLines = [
      'digitalWrite(9, HIGH); delay(200); digitalWrite(9, LOW);',
      'digitalWrite(10, HIGH); delay(200); digitalWrite(10, LOW);',
      'digitalWrite(11, HIGH); delay(200); digitalWrite(11, LOW);'
    ];

    for (let i = 0; i < 3; i++) {
      p.fill(i === currentLed ? '#4CAF50' : 100);
      p.text(codeLines[i], 40, 202 + i * 15);
    }

    // Status
    p.textAlign(p.CENTER, p.CENTER);
    p.fill(100, 200, 255);
    p.textSize(11);
    p.text('LED ' + (currentLed + 1) + ' is ON - then passes to LED ' + ((currentLed + 1) % 3 + 1) + '!', p.width / 2, p.height - 8);
  };
};
