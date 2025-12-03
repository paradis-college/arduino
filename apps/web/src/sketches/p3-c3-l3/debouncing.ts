/**
 * P3-C3-L3 Debouncing Sketch 1
 * Noisy raw signal with rapid bounce pulses.
 */
import type p5 from 'p5';

export const debouncingSketch = (p: p5) => {
  let rawSignal: number[] = [];
  let debouncedSignal: number[] = [];
  let buttonPressed = false;
  let bounceTimer = 0;
  const maxPoints = 150;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);
    updateSignals();
    drawSignals();
    drawButton();
    drawLabels();
  };

  p.mousePressed = () => {
    if (p.dist(p.mouseX, p.mouseY, 100, 300) < 35) {
      buttonPressed = true;
      bounceTimer = 15;
    }
  };

  p.mouseReleased = () => {
    if (buttonPressed) {
      buttonPressed = false;
      bounceTimer = 15;
    }
  };

  const updateSignals = () => {
    let rawValue: number;
    if (bounceTimer > 0) {
      rawValue = p.random() > 0.4 ? 1 : 0;
      bounceTimer--;
    } else {
      rawValue = buttonPressed ? 1 : 0;
    }
    
    rawSignal.push(rawValue);
    if (rawSignal.length > maxPoints) rawSignal.shift();
    
    const stableCount = rawSignal.slice(-10).filter(v => v === rawValue).length;
    const debouncedValue = stableCount >= 8 ? rawValue : (debouncedSignal[debouncedSignal.length - 1] || 0);
    
    debouncedSignal.push(debouncedValue);
    if (debouncedSignal.length > maxPoints) debouncedSignal.shift();
  };

  const drawSignals = () => {
    // Raw signal
    drawWaveform(50, 80, 400, 80, rawSignal, p.color(255, 100, 100), 'Raw Signal (with bounce)');
    
    // Debounced signal
    drawWaveform(50, 200, 400, 80, debouncedSignal, p.color(100, 255, 100), 'Debounced Signal (clean)');
  };

  const drawWaveform = (x: number, y: number, w: number, h: number, data: number[], color: p5.Color, label: string) => {
    p.fill(40, 45, 55);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(x, y, w, h);
    
    if (data.length > 1) {
      p.stroke(color);
      p.strokeWeight(2);
      p.noFill();
      p.beginShape();
      for (let i = 0; i < data.length; i++) {
        const px = x + (i / maxPoints) * w;
        const py = y + (data[i] === 1 ? 15 : h - 15);
        p.vertex(px, py);
      }
      p.endShape();
    }
    
    p.fill(color);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.LEFT, p.CENTER);
    p.text(label, x, y - 12);
  };

  const drawButton = () => {
    const x = 520;
    const y = 150;
    
    p.fill(buttonPressed ? p.color(100, 200, 100) : p.color(80, 80, 90));
    p.stroke(100);
    p.strokeWeight(2);
    p.ellipse(x, y, 70, 70);
    
    p.fill(255);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('CLICK', x, y);
    
    p.fill(200);
    p.textSize(10);
    p.text('Button', x, y + 50);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Button Debouncing', 50, 50);
    
    p.fill(255, 100, 100);
    p.text('→ Raw: Noisy "bounce" when pressed/released', 60, 310);
    p.fill(100, 255, 100);
    p.text('→ Debounced: Clean, stable signal', 60, 330);
    
    p.fill(150);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Click the button to see bounce vs debounced signal', 300, 380);
  };
};

export default debouncingSketch;
