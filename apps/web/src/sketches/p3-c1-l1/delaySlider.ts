import type p5 from 'p5';

/**
 * Delay slider changing blink speed live
 * gif2: Delay slider changing blink speed live
 */
export const delaySliderSketch = (p: p5) => {
  let delayMs = 500;
  let lastToggle = 0;
  let ledOn = false;
  let sliderDragging = false;

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
    p.text('Delay Slider - Blink Speed Control', p.width / 2, 25);

    // Slider
    const sliderX = 50;
    const sliderY = 180;
    const sliderW = 300;
    const sliderH = 20;

    // Slider track
    p.fill(60);
    p.rect(sliderX, sliderY, sliderW, sliderH, 10);

    // Calculate slider position from delay (100ms to 2000ms)
    const sliderPos = p.map(delayMs, 100, 2000, sliderX, sliderX + sliderW - 20);

    // Slider handle
    p.fill(sliderDragging ? '#ff9800' : '#4CAF50');
    p.rect(sliderPos, sliderY - 5, 20, sliderH + 10, 5);

    // Slider labels
    p.fill(200);
    p.textSize(12);
    p.text('100ms (Fast)', sliderX + 40, sliderY + 40);
    p.text('2000ms (Slow)', sliderX + sliderW - 50, sliderY + 40);

    // Current delay display
    p.fill(255);
    p.textSize(14);
    p.text(`Delay: ${Math.round(delayMs)}ms`, p.width / 2, sliderY + 60);

    // LED
    const ledX = p.width / 2;
    const ledY = 90;
    const ledR = 40;

    // Toggle LED based on delay
    if (p.millis() - lastToggle > delayMs) {
      ledOn = !ledOn;
      lastToggle = p.millis();
    }

    // LED glow
    if (ledOn) {
      p.noStroke();
      for (let i = 5; i > 0; i--) {
        p.fill(255, 200, 0, 30 * i);
        p.ellipse(ledX, ledY, ledR + i * 10, ledR + i * 10);
      }
      p.fill(255, 220, 50);
    } else {
      p.fill(80, 50, 30);
    }
    p.stroke(100);
    p.strokeWeight(2);
    p.ellipse(ledX, ledY, ledR, ledR);

    // LED label
    p.noStroke();
    p.fill(200);
    p.textSize(12);
    p.text(ledOn ? 'ON' : 'OFF', ledX, ledY + 45);

    // Instructions
    p.fill(150);
    p.textSize(11);
    p.text('Drag slider to adjust blink speed', p.width / 2, p.height - 15);
  };

  p.mousePressed = () => {
    const sliderX = 50;
    const sliderY = 180;
    const sliderW = 300;
    const sliderH = 20;

    if (
      p.mouseX >= sliderX &&
      p.mouseX <= sliderX + sliderW &&
      p.mouseY >= sliderY - 10 &&
      p.mouseY <= sliderY + sliderH + 10
    ) {
      sliderDragging = true;
    }
  };

  p.mouseDragged = () => {
    if (sliderDragging) {
      const sliderX = 50;
      const sliderW = 300;
      const newPos = p.constrain(p.mouseX, sliderX, sliderX + sliderW);
      delayMs = p.map(newPos, sliderX, sliderX + sliderW, 100, 2000);
    }
  };

  p.mouseReleased = () => {
    sliderDragging = false;
  };
};
