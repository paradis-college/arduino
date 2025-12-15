/**
 * P1-C2-L2 GIF2: LED RC Timing
 * "LED brightness slowly rising and fading from RC charge/discharge timing."
 */
import type p5 from 'p5';

export const ledRCTimingSketch = (p: p5): void => {
  let voltage = 0;
  let isCharging = true;
  const R = 10000; // 10kΩ
  const C = 100e-6; // 100µF
  const tau = R * C; // Time constant = 1 second
  let startTime = 0;

  p.setup = () => {
    p.createCanvas(400, 280);
    p.textAlign(p.CENTER, p.CENTER);
    startTime = p.millis() / 1000;
  };

  p.draw = () => {
    p.background(30, 30, 40);

    const currentTime = p.millis() / 1000;
    const elapsed = currentTime - startTime;

    // Calculate voltage based on RC charging/discharging
    if (isCharging) {
      // Charging: V = Vmax * (1 - e^(-t/RC))
      voltage = 5 * (1 - Math.exp(-elapsed / tau));
    } else {
      // Discharging: V = Vstart * e^(-t/RC)
      voltage = 5 * Math.exp(-elapsed / tau);
    }

    // Auto-toggle when nearly charged/discharged
    if (isCharging && voltage > 4.9) {
      isCharging = false;
      startTime = currentTime;
    } else if (!isCharging && voltage < 0.1) {
      isCharging = true;
      startTime = currentTime;
    }

    // Title
    p.fill(200);
    p.textSize(14);
    p.text('RC Timing - LED Fade Effect', p.width/2, 20);

    // Draw circuit
    const cx = 80;
    const cy = 130;

    // Power source
    p.stroke(150);
    p.strokeWeight(2);
    p.line(cx, cy - 50, cx, cy + 50);
    p.line(cx - 10, cy - 50, cx + 10, cy - 50);
    p.line(cx - 5, cy - 40, cx + 5, cy - 40);

    // Top wire
    p.line(cx, cy - 50, cx + 40, cy - 50);

    // Resistor
    p.noFill();
    p.beginShape();
    for (let i = 0; i < 6; i++) {
      p.vertex(cx + 40 + i * 10, cy - 50 + (i % 2 === 0 ? -6 : 6));
    }
    p.endShape();

    // Wire to capacitor
    p.line(cx + 100, cy - 50, cx + 130, cy - 50);
    p.line(cx + 130, cy - 50, cx + 130, cy - 20);

    // Capacitor
    p.strokeWeight(3);
    p.line(cx + 120, cy - 20, cx + 140, cy - 20);
    p.line(cx + 120, cy - 10, cx + 140, cy - 10);

    // Capacitor charge indicator
    const chargeHeight = p.map(voltage, 0, 5, 0, 30);
    p.noStroke();
    p.fill(0, 150, 255, 150);
    p.rect(cx + 122, cy - 20 - chargeHeight, 16, chargeHeight);

    // Wire to LED
    p.stroke(150);
    p.strokeWeight(2);
    p.line(cx + 130, cy - 10, cx + 130, cy + 20);

    // LED
    const ledBrightness = p.map(voltage, 0, 5, 0, 255);
    p.fill(255, ledBrightness, 0);
    p.stroke(150);
    p.strokeWeight(2);
    p.triangle(cx + 120, cy + 20, cx + 140, cy + 20, cx + 130, cy + 40);
    p.line(cx + 120, cy + 40, cx + 140, cy + 40);

    // LED glow
    if (ledBrightness > 50) {
      p.noStroke();
      p.fill(255, ledBrightness, 0, ledBrightness * 0.4);
      p.ellipse(cx + 130, cy + 30, 50 + ledBrightness/10, 50 + ledBrightness/10);
    }

    // Ground return
    p.stroke(150);
    p.strokeWeight(2);
    p.line(cx + 130, cy + 40, cx + 130, cy + 50);
    p.line(cx + 130, cy + 50, cx, cy + 50);

    // Ground symbol
    p.line(cx - 10, cy + 50, cx + 10, cy + 50);

    // Component labels
    p.fill(150);
    p.noStroke();
    p.textSize(9);
    p.text('R = 10kΩ', cx + 70, cy - 65);
    p.text('C = 100µF', cx + 155, cy - 15);
    p.text('LED', cx + 155, cy + 30);

    // Voltage graph
    const graphX = 200;
    const graphY = 60;
    const graphW = 180;
    const graphH = 80;

    // Graph background
    p.fill(40);
    p.noStroke();
    p.rect(graphX, graphY, graphW, graphH);

    // Grid lines
    p.stroke(60);
    p.strokeWeight(1);
    for (let i = 1; i < 5; i++) {
      const y = graphY + (graphH / 5) * i;
      p.line(graphX, y, graphX + graphW, y);
    }

    // Draw RC curve
    p.stroke(0, 200, 255);
    p.strokeWeight(2);
    p.noFill();
    p.beginShape();
    for (let x = 0; x < graphW; x++) {
      const t = (x / graphW) * 5; // 5 tau range
      let v: number;
      if (isCharging) {
        v = 5 * (1 - Math.exp(-t));
      } else {
        v = 5 * Math.exp(-t);
      }
      const y = graphY + graphH - (v / 5) * graphH;
      p.vertex(graphX + x, y);
    }
    p.endShape();

    // Current position marker
    const markerX = graphX + (elapsed / (5 * tau)) * graphW;
    const markerY = graphY + graphH - (voltage / 5) * graphH;
    if (markerX < graphX + graphW) {
      p.fill(255, 200, 0);
      p.noStroke();
      p.ellipse(markerX, markerY, 10, 10);
    }

    // Graph labels
    p.fill(150);
    p.textSize(9);
    p.text('5V', graphX - 15, graphY + 5);
    p.text('0V', graphX - 15, graphY + graphH);
    p.text('Time →', graphX + graphW/2, graphY + graphH + 15);
    p.text('τ = RC = 1s', graphX + graphW/2, graphY - 10);

    // Status panel
    p.fill(50);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(200, 160, 180, 70, 5);

    p.fill(200);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.LEFT, p.CENTER);
    p.text(`Capacitor: ${voltage.toFixed(2)}V`, 210, 180);
    p.text(`LED Brightness: ${Math.round(ledBrightness / 2.55)}%`, 210, 200);
    p.text(`Mode: ${isCharging ? 'CHARGING ↑' : 'DISCHARGING ↓'}`, 210, 220);

    p.textAlign(p.CENTER, p.CENTER);

    // Brightness bar
    p.fill(60);
    p.noStroke();
    p.rect(210, 235, 160, 10, 3);
    p.fill(255, ledBrightness, 0);
    p.rect(210, 235, ledBrightness / 255 * 160, 10, 3);

    // Click instruction
    p.fill(100);
    p.textSize(10);
    p.text('Click to toggle charge/discharge', p.width/2, p.height - 10);
  };

  p.mousePressed = () => {
    if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
      isCharging = !isCharging;
      startTime = p.millis() / 1000;
    }
  };
};
