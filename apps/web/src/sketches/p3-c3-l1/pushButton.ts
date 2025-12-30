/**
 * P3-C3-L1 Push Button Sketch 1
 * Button press flipping digital HIGH/LOW indicator.
 */
import type p5 from 'p5';

export const pushButtonSketch = (p: p5) => {
  let buttonPressed = false;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);
    drawButton();
    drawIndicator();
    drawLabels();
  };

  p.mousePressed = () => {
    if (p.dist(p.mouseX, p.mouseY, 200, 200) < 40) {
      buttonPressed = true;
    }
  };

  p.mouseReleased = () => {
    buttonPressed = false;
  };

  const drawButton = () => {
    const x = 200;
    const y = 200;

    // Button body
    p.fill(50, 50, 60);
    p.stroke(80);
    p.strokeWeight(3);
    p.rect(x - 50, y - 50, 100, 100, 10);

    // Button cap
    const capY = buttonPressed ? y + 5 : y - 5;
    p.fill(buttonPressed ? p.color(150, 200, 100) : p.color(200, 80, 80));
    p.stroke(buttonPressed ? p.color(180, 230, 130) : p.color(230, 110, 110));
    p.strokeWeight(2);
    p.ellipse(x, capY, 60, 40);

    // Button label
    p.fill(255);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('PUSH', x, capY);

    p.fill(200);
    p.textSize(11);
    p.text('Push Button', x, y + 70);
    p.text('(Click & hold)', x, y + 85);
  };

  const drawIndicator = () => {
    const x = 420;
    const y = 200;

    // Display box
    p.fill(40, 45, 55);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x - 80, y - 80, 160, 160, 10);

    // LED indicator
    if (buttonPressed) {
      p.noStroke();
      for (let r = 50; r > 0; r -= 10) {
        p.fill(100, 255, 100, (1 - r / 50) * 150);
        p.ellipse(x, y - 20, r * 2, r * 2);
      }
    }

    p.fill(buttonPressed ? p.color(100, 255, 100) : p.color(100, 100, 100));
    p.stroke(80);
    p.strokeWeight(2);
    p.ellipse(x, y - 20, 50, 50);

    // Status text
    p.fill(buttonPressed ? p.color(100, 255, 100) : p.color(255, 100, 100));
    p.noStroke();
    p.textSize(24);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(buttonPressed ? 'HIGH' : 'LOW', x, y + 40);

    // Digital read value
    p.fill(200);
    p.textSize(12);
    p.text(`digitalRead() = ${buttonPressed ? '1' : '0'}`, x, y + 65);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Push Button: Digital Input', 50, 50);
    p.text('→ Pressed = HIGH (5V)', 60, 70);
    p.text('→ Released = LOW (0V)', 60, 90);

    p.fill(150);
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Click and hold the button to see state change', 300, 370);
  };
};

export default pushButtonSketch;
