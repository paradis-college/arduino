/**
 * P2-C1-L2 LDR - GIF 2
 * LED auto-dimming according to LDR reading
 */
import type p5 from 'p5';

export const ledAutoDimSketch = (p: p5) => {
  let brightness = 150;
  let ledBrightness = 0;
  let targetLedBrightness = 0;

  p.setup = () => {
    p.createCanvas(400, 200);
    p.textFont('monospace');
  };

  p.draw = () => {
    // Background brightness based on slider
    const bgBright = p.map(brightness, 0, 255, 20, 200);
    p.background(bgBright, bgBright * 0.9, bgBright * 0.7);

    // LDR value (inverse of brightness - dark = high resistance = low reading)
    const ldrValue = p.map(brightness, 0, 255, 1023, 0);

    // LED should be brighter when it's dark (auto-dimming in bright light)
    targetLedBrightness = p.map(brightness, 0, 255, 255, 0);
    ledBrightness = p.lerp(ledBrightness, targetLedBrightness, 0.1);

    // Draw LDR sensor
    p.fill(80, 60, 40);
    p.stroke(60, 40, 20);
    p.strokeWeight(2);
    p.rect(60, 70, 60, 60, 5);

    // LDR surface (changes with light)
    const ldrColor = p.map(brightness, 0, 255, 50, 200);
    p.fill(ldrColor, ldrColor * 0.8, ldrColor * 0.5);
    p.noStroke();
    p.ellipse(90, 100, 40, 40);

    // Squiggly pattern on LDR
    p.stroke(ldrColor * 0.6, ldrColor * 0.5, ldrColor * 0.3);
    p.strokeWeight(2);
    p.noFill();
    p.beginShape();
    for (let i = 0; i < 5; i++) {
      p.vertex(75 + i * 8, 95 + (i % 2) * 10);
    }
    p.endShape();

    // Draw LED
    const ledGlow = ledBrightness / 255;

    // LED glow effect
    if (ledBrightness > 10) {
      for (let i = 5; i > 0; i--) {
        p.fill(255, 255, 100, ledGlow * 30 * i);
        p.noStroke();
        p.ellipse(280, 100, 40 + i * 15, 40 + i * 15);
      }
    }

    // LED body
    p.fill(200, 50, 50);
    p.stroke(150, 30, 30);
    p.strokeWeight(2);
    p.ellipse(280, 100, 40, 50);

    // LED lit surface
    p.fill(255, 255 * ledGlow, 100 * ledGlow, 200 + 55 * ledGlow);
    p.noStroke();
    p.ellipse(280, 95, 30, 35);

    // LED legs
    p.stroke(150);
    p.strokeWeight(3);
    p.line(270, 125, 270, 145);
    p.line(290, 125, 290, 145);

    // Arrow showing inverse relationship
    p.stroke(100, 200, 255);
    p.strokeWeight(2);
    p.line(140, 100, 230, 100);
    p.line(220, 90, 230, 100);
    p.line(220, 110, 230, 100);

    // Labels
    p.fill(255);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER);
    p.text('LDR', 90, 150);
    p.text('LED', 280, 165);

    // Brightness slider
    p.fill(50, 55, 65);
    p.rect(50, 170, 300, 20, 5);

    const sliderX = p.map(brightness, 0, 255, 55, 345);
    p.fill(255, 220, 100);
    p.ellipse(sliderX, 180, 16, 16);

    // Value displays
    p.fill(30, 35, 45);
    p.stroke(100);
    p.strokeWeight(1);
    p.rect(55, 20, 70, 35, 5);
    p.rect(275, 20, 70, 35, 5);

    p.noStroke();
    p.fill(100, 200, 255);
    p.textSize(10);
    p.text('LDR Value', 90, 32);
    p.textSize(14);
    p.text(ldrValue.toFixed(0), 90, 48);

    p.fill(255, 200, 100);
    p.textSize(10);
    p.text('LED PWM', 310, 32);
    p.textSize(14);
    p.text(ledBrightness.toFixed(0), 310, 48);

    // Sun/moon icon
    if (brightness > 127) {
      // Sun
      p.fill(255, 220, 50);
      p.ellipse(200, 40, 25, 25);
      for (let i = 0; i < 8; i++) {
        const angle = i * p.PI / 4;
        p.stroke(255, 220, 50);
        p.strokeWeight(2);
        p.line(
          200 + p.cos(angle) * 15,
          40 + p.sin(angle) * 15,
          200 + p.cos(angle) * 22,
          40 + p.sin(angle) * 22
        );
      }
    } else {
      // Moon
      p.fill(200, 200, 220);
      p.noStroke();
      p.ellipse(200, 40, 20, 20);
      p.fill(bgBright, bgBright * 0.9, bgBright * 0.7);
      p.ellipse(205, 35, 15, 15);
    }
  };

  p.mousePressed = () => {
    updateBrightness();
  };

  p.mouseDragged = () => {
    updateBrightness();
  };

  const updateBrightness = () => {
    if (p.mouseY > 160 && p.mouseY < 190) {
      brightness = p.constrain(p.map(p.mouseX, 55, 345, 0, 255), 0, 255);
    }
  };
};
