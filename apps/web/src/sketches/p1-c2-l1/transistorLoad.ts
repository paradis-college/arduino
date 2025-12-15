/**
 * P1-C2-L1 GIF2: Transistor Load Control
 * "Load (motor/LED) turning on/off as transistor saturates/cuts off."
 */
import type p5 from 'p5';

export const transistorLoadSketch = (p: p5): void => {
  let baseVoltage = 0;
  let motorAngle = 0;
  let dragging = false;

  p.setup = () => {
    p.createCanvas(400, 280);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    p.background(30, 30, 40);

    // Calculate transistor state
    const vbe = baseVoltage;
    const isSaturated = vbe >= 0.7;
    const isCutoff = vbe < 0.3;
    const isActive = !isSaturated && !isCutoff;

    // Calculate collector current (simplified)
    const ic = isSaturated ? 100 : (isActive ? p.map(vbe, 0.3, 0.7, 0, 100) : 0);

    // Title
    p.fill(200);
    p.textSize(14);
    p.text('Transistor as a Switch', p.width/2, 20);

    // Transistor state indicator
    let stateText: string;
    let stateColor: p5.Color;
    if (isCutoff) {
      stateText = 'CUT-OFF';
      stateColor = p.color(255, 100, 100);
    } else if (isSaturated) {
      stateText = 'SATURATED';
      stateColor = p.color(100, 255, 100);
    } else {
      stateText = 'ACTIVE';
      stateColor = p.color(255, 255, 100);
    }

    p.fill(stateColor);
    p.textSize(12);
    p.text(stateText, 320, 50);

    // Draw circuit
    const cx = 150;
    const cy = 150;

    // Vcc supply
    p.stroke(150);
    p.strokeWeight(2);
    p.line(cx + 50, 50, cx + 50, 80);
    p.fill(255, 100, 100);
    p.noStroke();
    p.textSize(10);
    p.text('+Vcc', cx + 50, 42);

    // Load (Motor or LED)
    p.stroke(150);
    p.strokeWeight(2);

    // Motor representation
    p.fill(80);
    p.stroke(100);
    p.ellipse(cx + 50, 110, 40, 40);
    p.fill(150);
    p.textSize(8);
    p.noStroke();
    p.text('MOTOR', cx + 50, 110);

    // Motor spinning animation
    if (ic > 10) {
      motorAngle += ic / 500;
      p.stroke(isSaturated ? p.color(100, 255, 100) : p.color(255, 255, 100));
      p.strokeWeight(2);
      for (let i = 0; i < 4; i++) {
        const angle = motorAngle + i * p.HALF_PI;
        p.line(
          cx + 50 + p.cos(angle) * 8,
          110 + p.sin(angle) * 8,
          cx + 50 + p.cos(angle) * 18,
          110 + p.sin(angle) * 18
        );
      }
    }

    // Wire from motor to transistor collector
    p.stroke(150);
    p.strokeWeight(2);
    p.line(cx + 50, 130, cx + 50, cy - 20);

    // Transistor symbol (NPN)
    p.stroke(150);
    p.strokeWeight(2);
    // Collector
    p.line(cx + 50, cy - 20, cx + 30, cy);
    // Base
    p.line(cx - 20, cy, cx + 10, cy);
    // Base vertical line
    p.line(cx + 10, cy - 15, cx + 10, cy + 15);
    // Emitter with arrow
    p.line(cx + 10, cy + 5, cx + 30, cy + 25);
    // Arrow on emitter
    p.fill(150);
    p.noStroke();
    p.triangle(cx + 30, cy + 25, cx + 22, cy + 18, cx + 25, cy + 28);

    // Emitter to ground
    p.stroke(150);
    p.strokeWeight(2);
    p.line(cx + 30, cy + 25, cx + 50, cy + 45);
    p.line(cx + 50, cy + 45, cx + 50, cy + 60);

    // Ground symbol
    p.line(cx + 40, cy + 60, cx + 60, cy + 60);
    p.line(cx + 43, cy + 65, cx + 57, cy + 65);
    p.line(cx + 46, cy + 70, cx + 54, cy + 70);

    // Base resistor
    p.noFill();
    p.stroke(150);
    p.beginShape();
    for (let i = 0; i < 5; i++) {
      p.vertex(cx - 60 + i * 8, cy + (i % 2 === 0 ? -5 : 5));
    }
    p.endShape();

    // Base input wire
    p.line(cx - 80, cy, cx - 60, cy);

    // Base voltage control slider
    const sliderX = 30;
    const sliderY = 80;
    const sliderH = 120;

    p.fill(60);
    p.noStroke();
    p.rect(sliderX - 5, sliderY, 30, sliderH, 5);

    // Slider gradient
    for (let y = 0; y < sliderH; y++) {
      const v = p.map(y, 0, sliderH, 5, 0);
      const hue = p.map(v, 0, 5, 0, 120);
      p.stroke(p.color(`hsl(${hue}, 70%, 40%)`));
      p.line(sliderX - 3, sliderY + y, sliderX + 23, sliderY + y);
    }

    // Slider handle
    const handleY = p.map(baseVoltage, 5, 0, sliderY, sliderY + sliderH);
    p.fill(dragging ? 255 : 200);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(sliderX - 8, handleY - 8, 36, 16, 4);

    p.fill(0);
    p.noStroke();
    p.textSize(9);
    p.text(baseVoltage.toFixed(1) + 'V', sliderX + 10, handleY);

    // Slider labels
    p.fill(150);
    p.textSize(10);
    p.text('5V', sliderX + 10, sliderY - 10);
    p.text('0V', sliderX + 10, sliderY + sliderH + 15);
    p.text('Vbase', sliderX + 10, sliderY - 25);

    // Current flow indicators
    if (ic > 10) {
      p.fill(0, 255, 255, p.map(ic, 0, 100, 50, 200));
      p.noStroke();

      // Collector current arrow
      const arrowY = 100 + (p.frameCount * 2) % 40;
      p.triangle(cx + 45, arrowY, cx + 55, arrowY, cx + 50, arrowY + 10);
    }

    // Status panel
    p.fill(50);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(260, 70, 120, 100, 5);

    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.LEFT, p.CENTER);
    p.text(`Vbe: ${baseVoltage.toFixed(2)}V`, 270, 90);
    p.text(`Ic: ${ic.toFixed(0)}%`, 270, 110);
    p.text(`Motor: ${ic > 50 ? 'FAST' : ic > 10 ? 'SLOW' : 'OFF'}`, 270, 130);

    // Status bar
    p.fill(60);
    p.rect(270, 145, 100, 15, 3);
    p.fill(ic > 50 ? p.color(100, 255, 100) : ic > 10 ? p.color(255, 255, 100) : p.color(100));
    p.rect(270, 145, ic, 15, 3);

    p.textAlign(p.CENTER, p.CENTER);

    // Explanation
    p.fill(100);
    p.textSize(9);
    p.text('Vbe < 0.3V: Cut-off (no current)', p.width/2, 230);
    p.text('Vbe 0.3-0.7V: Active region', p.width/2, 245);
    p.text('Vbe ≥ 0.7V: Saturated (full current)', p.width/2, 260);

    // Drag slider
    if (dragging) {
      baseVoltage = p.constrain(p.map(p.mouseY, sliderY, sliderY + sliderH, 5, 0), 0, 5);
    }
  };

  p.mousePressed = () => {
    const sliderX = 30;
    const sliderY = 80;
    const sliderH = 120;

    if (p.mouseX > sliderX - 15 && p.mouseX < sliderX + 35 &&
        p.mouseY > sliderY - 10 && p.mouseY < sliderY + sliderH + 10) {
      dragging = true;
    }
  };

  p.mouseReleased = () => {
    dragging = false;
  };
};
