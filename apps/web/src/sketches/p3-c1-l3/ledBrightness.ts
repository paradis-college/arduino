import type p5 from 'p5';

/**
 * LED brightness rising and falling smoothly
 * gif2: LED brightness rising and falling smoothly
 */
export const ledBrightnessSketch = (p: p5) => {
  let brightness = 0;
  let increasing = true;
  const fadeSpeed = 3;

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
    p.text('LED Brightness Fade', p.width / 2, 25);

    // Update brightness
    if (increasing) {
      brightness += fadeSpeed;
      if (brightness >= 255) {
        brightness = 255;
        increasing = false;
      }
    } else {
      brightness -= fadeSpeed;
      if (brightness <= 0) {
        brightness = 0;
        increasing = true;
      }
    }

    // LED
    const ledX = p.width / 2;
    const ledY = 100;
    const ledR = 60;

    // LED glow proportional to brightness
    const glowIntensity = brightness / 255;
    if (glowIntensity > 0) {
      p.noStroke();
      for (let i = 5; i > 0; i--) {
        p.fill(255, 200, 0, glowIntensity * 30 * i);
        p.ellipse(ledX, ledY, ledR + i * 15 * glowIntensity, ledR + i * 15 * glowIntensity);
      }
    }

    // LED body
    p.stroke(100);
    p.strokeWeight(2);
    const ledColor = p.lerpColor(p.color(80, 50, 30), p.color(255, 220, 50), glowIntensity);
    p.fill(ledColor);
    p.ellipse(ledX, ledY, ledR, ledR);

    // Brightness bar
    const barX = 100;
    const barY = 180;
    const barW = 200;
    const barH = 25;

    // Bar background
    p.fill(50);
    p.noStroke();
    p.rect(barX, barY, barW, barH, 5);

    // Bar fill
    p.fill(255, 200, 0);
    p.rect(barX, barY, (brightness / 255) * barW, barH, 5);

    // Bar label
    p.fill(255);
    p.textSize(12);
    p.text(`PWM: ${Math.round(brightness)} / 255`, p.width / 2, barY + barH + 20);

    // Direction indicator
    p.fill(150);
    p.textSize(11);
    p.text(increasing ? '▲ Brightening' : '▼ Dimming', p.width / 2, p.height - 15);
  };
};
