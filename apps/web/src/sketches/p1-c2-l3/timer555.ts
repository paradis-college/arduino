/**
 * P1-C2-L3 555 & Shift Registers Sketch 1
 * 555 RC-controlled blink rate adjusting with R/C sliders.
 */
import type p5 from 'p5';

export const timer555Sketch = (p: p5) => {
  let resistance = 0.5; // 0-1 slider value
  let capacitance = 0.5; // 0-1 slider value
  let ledState = false;
  let timer = 0;
  let blinkHistory: boolean[] = [];
  const maxHistory = 100;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);

    // Calculate frequency based on R and C
    const R = 1000 + resistance * 99000; // 1k to 100k ohms
    const C = 0.1e-6 + capacitance * 99.9e-6; // 0.1uF to 100uF
    const frequency = 1.44 / ((R * 2) * C);
    const period = 1 / frequency;

    // Update timer and LED state
    timer += 1 / 60;
    if (timer >= period / 2) {
      timer = 0;
      ledState = !ledState;
    }

    // Record history
    blinkHistory.push(ledState);
    if (blinkHistory.length > maxHistory) {
      blinkHistory.shift();
    }

    draw555Chip();
    drawSliders();
    drawLED();
    drawWaveform();
    drawLabels(frequency, R, C);
  };

  p.mouseDragged = () => {
    // R slider
    if (p.mouseX > 50 && p.mouseX < 200 && p.mouseY > 300 && p.mouseY < 340) {
      resistance = p.constrain((p.mouseX - 50) / 150, 0, 1);
    }
    // C slider
    if (p.mouseX > 250 && p.mouseX < 400 && p.mouseY > 300 && p.mouseY < 340) {
      capacitance = p.constrain((p.mouseX - 250) / 150, 0, 1);
    }
  };

  const draw555Chip = () => {
    const cx = 300;
    const cy = 150;

    // IC body
    p.fill(40, 40, 50);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(cx - 60, cy - 50, 120, 100, 4);

    // Notch
    p.fill(30, 35, 45);
    p.noStroke();
    p.arc(cx, cy - 50, 20, 20, 0, p.PI);

    // Pin 1 marker
    p.fill(200);
    p.ellipse(cx - 50, cy - 40, 6, 6);

    // IC label
    p.fill(200);
    p.noStroke();
    p.textSize(16);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('555', cx, cy - 10);
    p.textSize(10);
    p.text('TIMER', cx, cy + 5);

    // Pin labels
    p.textSize(9);
    p.textAlign(p.RIGHT, p.CENTER);
    p.text('GND', cx - 65, cy - 35);
    p.text('TRIG', cx - 65, cy - 15);
    p.text('OUT', cx - 65, cy + 5);
    p.text('RESET', cx - 65, cy + 25);

    p.textAlign(p.LEFT, p.CENTER);
    p.text('VCC', cx + 65, cy - 35);
    p.text('DISCH', cx + 65, cy - 15);
    p.text('THRES', cx + 65, cy + 5);
    p.text('CTRL', cx + 65, cy + 25);

    // Output indicator
    const outColor = ledState ? p.color(100, 255, 100) : p.color(100, 100, 100);
    p.fill(outColor);
    p.noStroke();
    p.ellipse(cx - 60, cy + 5, 10, 10);
  };

  const drawSliders = () => {
    // R Slider
    drawSlider(50, 320, 150, 'Resistance (R)', resistance, '1kΩ', '100kΩ');

    // C Slider
    drawSlider(250, 320, 150, 'Capacitance (C)', capacitance, '0.1µF', '100µF');
  };

  const drawSlider = (x: number, y: number, w: number, label: string, value: number, minLabel: string, maxLabel: string) => {
    // Track
    p.fill(60);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x, y - 5, w, 10, 5);

    // Fill
    p.fill(255, 150, 50);
    p.noStroke();
    p.rect(x, y - 5, w * value, 10, 5, 0, 0, 5);

    // Handle
    const handleX = x + w * value;
    p.fill(200);
    p.stroke(255);
    p.strokeWeight(2);
    p.ellipse(handleX, y, 18, 18);

    // Labels
    p.fill(200);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(label, x + w / 2, y - 25);
    p.textSize(9);
    p.text(minLabel, x, y + 20);
    p.text(maxLabel, x + w, y + 20);
  };

  const drawLED = () => {
    const x = 520;
    const y = 150;

    // LED glow
    if (ledState) {
      p.noStroke();
      for (let r = 40; r > 0; r -= 8) {
        p.fill(255, 100, 100, (1 - r / 40) * 150);
        p.ellipse(x, y, r * 2, r * 2);
      }
    }

    // LED body
    p.fill(ledState ? p.color(255, 80, 80) : p.color(100, 40, 40));
    p.stroke(100);
    p.strokeWeight(2);
    p.arc(x, y - 8, 30, 30, p.PI, 0);
    p.rect(x - 15, y - 8, 30, 25, 0, 0, 4, 4);

    // Label
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('OUTPUT', x, y + 40);
    p.text('LED', x, y + 55);
  };

  const drawWaveform = () => {
    const x = 430;
    const y = 280;
    const w = 150;
    const h = 60;

    // Background
    p.fill(40, 45, 55);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(x, y, w, h);

    // Waveform
    p.stroke(100, 255, 100);
    p.strokeWeight(2);
    p.noFill();
    p.beginShape();
    for (let i = 0; i < blinkHistory.length; i++) {
      const px = x + (i / maxHistory) * w;
      const py = y + (blinkHistory[i] ? 10 : h - 10);
      p.vertex(px, py);
    }
    p.endShape();

    // Label
    p.fill(150);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Square Wave Output', x + w / 2, y - 12);
  };

  const drawLabels = (freq: number, R: number, C: number) => {
    p.fill(200);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.CENTER, p.CENTER);

    // Frequency display
    p.fill(100, 200, 255);
    p.text(`Frequency: ${freq.toFixed(2)} Hz`, 300, 230);

    p.fill(150);
    p.textSize(11);
    p.text(`R = ${(R / 1000).toFixed(1)}kΩ  |  C = ${(C * 1e6).toFixed(1)}µF`, 300, 250);

    // Formula
    p.textSize(10);
    p.text('f ≈ 1.44 / (2RC)', 300, 270);

    p.fill(150);
    p.textSize(10);
    p.text('Drag sliders to change blink rate', 300, 385);
  };
};

export default timer555Sketch;
