import type p5 from 'p5';

/**
 * Shows the breathing light effect - fade in, fade out
 */
export const breathingLightSketch = (p: p5) => {
  let brightness = 0;
  let increasing = true;

  p.setup = () => {
    p.createCanvas(400, 260);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    p.background(30);

    // Update brightness for breathing effect
    if (increasing) {
      brightness += 2;
      if (brightness >= 255) {
        brightness = 255;
        increasing = false;
      }
    } else {
      brightness -= 2;
      if (brightness <= 0) {
        brightness = 0;
        increasing = true;
      }
    }

    // Title
    p.fill(255);
    p.textSize(16);
    p.noStroke();
    p.text('Watch It Breathe! 💫', p.width / 2, 25);

    // LED
    const ledX = p.width / 2;
    const ledY = 100;
    const ledR = 80;
    const b = brightness / 255;

    // LED glow
    if (b > 0.05) {
      p.noStroke();
      for (let i = 6; i > 0; i--) {
        p.fill(255, 200, 50, b * 40 * i);
        p.ellipse(ledX, ledY, ledR + i * 15 * b, ledR + i * 15 * b);
      }
    }

    // LED body
    const ledColor = p.lerpColor(p.color(60, 50, 30), p.color(255, 220, 50), b);
    p.fill(ledColor);
    p.stroke(100);
    p.strokeWeight(2);
    p.ellipse(ledX, ledY, ledR, ledR);

    // "Inhale/Exhale" indicator
    p.fill(increasing ? '#4CAF50' : '#2196F3');
    p.textSize(14);
    p.text(increasing ? '😮‍💨 Breathing IN (getting brighter)' : '😌 Breathing OUT (getting dimmer)', p.width / 2, 165);

    // Brightness value display
    p.fill(255, 200, 0);
    p.textSize(24);
    p.text(Math.round(brightness), p.width / 2, 200);

    // Waveform visualization
    const waveX = 50;
    const waveY = 225;
    const waveW = 300;
    const waveH = 30;

    // Background
    p.fill(40);
    p.noStroke();
    p.rect(waveX, waveY, waveW, waveH, 5);

    // Draw sine wave
    p.stroke(100, 200, 255);
    p.strokeWeight(2);
    p.noFill();
    p.beginShape();
    for (let x = 0; x <= waveW; x += 2) {
      const angle = (x / waveW) * p.TWO_PI * 2;
      const y = waveY + waveH / 2 + p.sin(angle) * (waveH / 2 - 5);
      p.vertex(waveX + x, y);
    }
    p.endShape();

    // Current position marker on wave
    const progress = increasing ? brightness / 255 : 1 - brightness / 255;
    const totalProgress = increasing ? progress / 2 : 0.5 + progress / 2;
    const markerX = waveX + totalProgress * waveW;
    const markerAngle = totalProgress * p.TWO_PI * 2;
    const markerY = waveY + waveH / 2 + p.sin(markerAngle) * (waveH / 2 - 5);

    p.fill(255, 100, 100);
    p.noStroke();
    p.ellipse(markerX, markerY, 12, 12);

    // Labels
    p.fill(150);
    p.textSize(10);
    p.text('Fade UP ↗', waveX + 40, waveY - 8);
    p.text('Fade DOWN ↘', waveX + waveW - 50, waveY - 8);
  };
};
