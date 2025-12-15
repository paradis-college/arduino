/**
 * P3-C3-L2 gif2: LED brightness proportional to analogReading
 * LED brightness changes proportionally to the potentiometer's analog reading
 */
import type p5 from 'p5';

export const potLedBrightnessSketch = (p: p5) => {
  let potValue = 512;
  let dragging = false;

  p.setup = () => {
    p.createCanvas(400, 300);
  };

  p.draw = () => {
    p.background(30);

    // Title
    p.fill(255);
    p.textSize(16);
    p.textAlign(p.CENTER);
    p.text('LED Brightness from Analog Reading', p.width / 2, 25);

    // Potentiometer
    const potX = 100;
    const potY = 150;
    const potRadius = 50;

    p.fill(80);
    p.stroke(120);
    p.strokeWeight(3);
    p.ellipse(potX, potY, potRadius * 2);

    // Knob indicator
    const angle = p.map(potValue, 0, 1023, -p.PI * 0.75, p.PI * 0.75);
    p.stroke(255, 100, 100);
    p.strokeWeight(4);
    const indicatorLen = potRadius * 0.8;
    p.line(
      potX,
      potY,
      potX + Math.cos(angle - p.PI / 2) * indicatorLen,
      potY + Math.sin(angle - p.PI / 2) * indicatorLen
    );

    // Analog value display
    p.noStroke();
    p.fill(255);
    p.textSize(14);
    p.textAlign(p.CENTER);
    p.text('Potentiometer', potX, potY + 70);
    p.text(`Value: ${potValue}`, potX, potY + 90);

    // Arrow
    p.stroke(100, 200, 100);
    p.strokeWeight(2);
    p.line(160, 150, 220, 150);
    p.line(210, 145, 220, 150);
    p.line(210, 155, 220, 150);

    // LED with brightness based on pot value
    const ledX = 300;
    const ledY = 150;
    const ledBrightness = p.map(potValue, 0, 1023, 0, 255);

    // LED glow
    if (ledBrightness > 10) {
      p.noStroke();
      for (let i = 5; i > 0; i--) {
        p.fill(255, 200, 50, ledBrightness / 5 * (6 - i) / 5);
        p.ellipse(ledX, ledY, 30 + i * 15);
      }
    }

    // LED body
    p.fill(50 + ledBrightness * 0.8, 50 + ledBrightness * 0.6, 0);
    p.stroke(100);
    p.strokeWeight(2);
    p.ellipse(ledX, ledY, 30);

    // LED legs
    p.stroke(150);
    p.strokeWeight(2);
    p.line(ledX - 8, ledY + 15, ledX - 8, ledY + 40);
    p.line(ledX + 8, ledY + 15, ledX + 8, ledY + 50);

    // Brightness percentage
    const brightnessPercent = Math.round((potValue / 1023) * 100);
    p.noStroke();
    p.fill(255);
    p.text('LED', ledX, ledY + 70);
    p.text(`Brightness: ${brightnessPercent}%`, ledX, ledY + 90);

    // Brightness bar
    const barWidth = 200;
    const barHeight = 20;
    const barX = (p.width - barWidth) / 2;
    const barY = p.height - 50;

    p.fill(50);
    p.stroke(100);
    p.strokeWeight(1);
    p.rect(barX, barY, barWidth, barHeight, 5);

    p.noStroke();
    p.fill(255, 200, 50, 200);
    p.rect(barX + 2, barY + 2, (barWidth - 4) * (potValue / 1023), barHeight - 4, 3);

    p.fill(255);
    p.textSize(12);
    p.text('0', barX - 10, barY + 15);
    p.text('1023', barX + barWidth + 20, barY + 15);

    // Instructions
    p.fill(150);
    p.textSize(11);
    p.text('Drag the potentiometer knob to adjust LED brightness', p.width / 2, p.height - 15);
  };

  p.mousePressed = () => {
    const potX = 100;
    const potY = 150;
    const d = p.dist(p.mouseX, p.mouseY, potX, potY);
    if (d < 50) {
      dragging = true;
    }
  };

  p.mouseDragged = () => {
    if (dragging) {
      const potX = 100;
      const potY = 150;
      const angle = Math.atan2(p.mouseY - potY, p.mouseX - potX) + p.PI / 2;
      const constrainedAngle = p.constrain(angle, -p.PI * 0.75, p.PI * 0.75);
      potValue = Math.round(p.map(constrainedAngle, -p.PI * 0.75, p.PI * 0.75, 0, 1023));
    }
  };

  p.mouseReleased = () => {
    dragging = false;
  };
};
