/**
 * P2-C1-L2 LDR Sketch 1
 * Room brightness slider changing LDR color and analog value bar.
 */
import type p5 from 'p5';

export const ldrSketch = (p: p5) => {
  let brightness = 0.5; // 0 = dark, 1 = bright

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    // Background changes with brightness (simulates room)
    const bgBrightness = p.lerp(20, 80, brightness);
    p.background(bgBrightness, bgBrightness + 5, bgBrightness + 10);

    drawSun();
    drawLDR();
    drawSlider();
    drawAnalogValue();
    drawLabels();
  };

  p.mouseDragged = () => {
    // Brightness slider
    if (p.mouseX > 50 && p.mouseX < 250 && p.mouseY > 320 && p.mouseY < 360) {
      brightness = p.constrain((p.mouseX - 50) / 200, 0, 1);
    }
  };

  const drawSun = () => {
    const sunX = 500;
    const sunY = 80;
    const sunSize = 40 + brightness * 30;

    // Sun glow
    if (brightness > 0.3) {
      p.noStroke();
      for (let r = sunSize + 40; r > sunSize; r -= 8) {
        p.fill(255, 220, 100, brightness * (1 - (r - sunSize) / 40) * 150);
        p.ellipse(sunX, sunY, r * 2, r * 2);
      }
    }

    // Sun body
    p.fill(p.lerpColor(p.color(100, 80, 60), p.color(255, 220, 100), brightness));
    p.noStroke();
    p.ellipse(sunX, sunY, sunSize * 2, sunSize * 2);

    // Sun rays
    if (brightness > 0.5) {
      p.stroke(255, 220, 100, brightness * 200);
      p.strokeWeight(3);
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * p.TWO_PI;
        const innerR = sunSize + 10;
        const outerR = sunSize + 25 + brightness * 20;
        p.line(
          sunX + p.cos(angle) * innerR,
          sunY + p.sin(angle) * innerR,
          sunX + p.cos(angle) * outerR,
          sunY + p.sin(angle) * outerR
        );
      }
    }

    // Label
    p.fill(200);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Light Source', sunX, sunY + sunSize + 30);
  };

  const drawLDR = () => {
    const cx = 200;
    const cy = 180;
    const size = 80;

    // LDR body (photoresistor)
    // Resistance decreases with light, so color gets darker (more conductive)
    const ldrColor = p.lerpColor(
      p.color(60, 80, 60),  // Dark green (high resistance - dark)
      p.color(200, 150, 100) // Light brown (low resistance - bright)
    , brightness);

    p.fill(ldrColor);
    p.stroke(100);
    p.strokeWeight(3);
    p.ellipse(cx, cy, size, size);

    // Zigzag pattern (resistive element)
    p.stroke(p.lerpColor(p.color(80, 60, 40), p.color(180, 140, 100), brightness));
    p.strokeWeight(2);
    p.noFill();
    p.beginShape();
    for (let i = 0; i < 6; i++) {
      const x = cx - 25 + i * 10;
      const y = cy + (i % 2 === 0 ? -10 : 10);
      p.vertex(x, y);
    }
    p.endShape();

    // Leads
    p.stroke(150);
    p.strokeWeight(3);
    p.line(cx - 10, cy + size / 2, cx - 10, cy + size / 2 + 30);
    p.line(cx + 10, cy + size / 2, cx + 10, cy + size / 2 + 30);

    // Light hitting LDR visualization
    if (brightness > 0.2) {
      p.stroke(255, 255, 200, brightness * 150);
      p.strokeWeight(1);
      for (let i = 0; i < 5; i++) {
        const startX = 400 - i * 30;
        const endX = cx + 30;
        const startY = 80 + i * 15;
        const endY = cy - 20 + i * 10;

        // Animated dashes
        const dashOffset = (p.frameCount * 2 + i * 10) % 20;
        for (let d = dashOffset; d < p.dist(startX, startY, endX, endY); d += 20) {
          const t = d / p.dist(startX, startY, endX, endY);
          const x = p.lerp(startX, endX, t);
          const y = p.lerp(startY, endY, t);
          p.point(x, y);
          p.point(x + 1, y);
          p.point(x + 2, y);
        }
      }
    }

    // Label
    p.fill(200);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('LDR', cx, cy + size / 2 + 50);
    p.textSize(10);
    p.text('(Photoresistor)', cx, cy + size / 2 + 65);
  };

  const drawSlider = () => {
    const x = 50;
    const y = 340;
    const w = 200;

    // Slider background (gradient from dark to light)
    for (let i = 0; i < w; i++) {
      const c = p.lerpColor(p.color(40, 40, 50), p.color(255, 240, 200), i / w);
      p.stroke(c);
      p.line(x + i, y - 8, x + i, y + 8);
    }

    // Border
    p.noFill();
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x, y - 8, w, 16, 8);

    // Handle
    const handleX = x + w * brightness;
    p.fill(200);
    p.stroke(255);
    p.strokeWeight(2);
    p.ellipse(handleX, y, 24, 24);

    // Icon on handle
    p.fill(50);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('☀', handleX, y);

    // Labels
    p.fill(200);
    p.textSize(12);
    p.text('Room Brightness', x + w / 2, y - 25);
    p.textSize(10);
    p.text('🌙 Dark', x - 5, y + 25);
    p.textAlign(p.RIGHT, p.CENTER);
    p.text('Bright ☀', x + w + 5, y + 25);
  };

  const drawAnalogValue = () => {
    const x = 380;
    const y = 180;
    const w = 150;
    const h = 120;

    // Value display box
    p.fill(40, 45, 55);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x, y - h / 2, w, h, 8);

    // Analog value (0-1023)
    const analogValue = Math.round((1 - brightness) * 1023); // Inverted: dark = high resistance = high value

    p.fill(100, 255, 150);
    p.noStroke();
    p.textSize(28);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(analogValue, x + w / 2, y - 20);

    p.fill(200);
    p.textSize(12);
    p.text('analogRead()', x + w / 2, y + 15);

    // Bar graph
    const barY = y + 35;
    p.fill(60);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(x + 10, barY, w - 20, 20, 4);

    const barFill = (analogValue / 1023) * (w - 20);
    p.fill(100, 200, 255);
    p.noStroke();
    p.rect(x + 10, barY, barFill, 20, 4);

    // Scale labels
    p.fill(150);
    p.textSize(9);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('0', x + 10, barY + 30);
    p.textAlign(p.RIGHT, p.CENTER);
    p.text('1023', x + w - 10, barY + 30);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('LDR: Light Dependent Resistor', 50, 50);
    p.text('→ Bright light = Low resistance = Low analog value', 60, 70);
    p.text('→ Darkness = High resistance = High analog value', 60, 90);

    p.fill(150);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Drag slider to simulate room brightness changes', 300, 385);
  };
};

export default ldrSketch;
