/**
 * P3-C1-L1 Basic Blink Sketch 1
 * Square-wave signal and moving cursor synced with LED blinking.
 */
import type p5 from 'p5';

export const basicBlinkSketch = (p: p5) => {
  let ledState = false;
  let timer = 0;
  let delay = 1000; // milliseconds
  let waveformData: boolean[] = [];
  const maxDataPoints = 100;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);
    
    // Update LED state based on timer
    timer += p.deltaTime;
    if (timer >= delay) {
      timer = 0;
      ledState = !ledState;
    }
    
    // Record waveform data
    waveformData.push(ledState);
    if (waveformData.length > maxDataPoints) {
      waveformData.shift();
    }
    
    drawArduino();
    drawLED();
    drawWaveform();
    drawDelaySlider();
    drawLabels();
  };

  p.mouseDragged = () => {
    if (p.mouseX > 350 && p.mouseX < 550 && p.mouseY > 320 && p.mouseY < 360) {
      delay = p.map(p.mouseX, 350, 550, 200, 2000);
      delay = p.constrain(delay, 200, 2000);
    }
  };

  const drawArduino = () => {
    const x = 120;
    const y = 200;
    
    // Arduino board
    p.fill(30, 60, 100);
    p.stroke(50, 80, 120);
    p.strokeWeight(3);
    p.rect(x - 60, y - 80, 120, 160, 5);
    
    // USB port
    p.fill(80, 80, 90);
    p.stroke(60);
    p.strokeWeight(1);
    p.rect(x - 15, y - 80 - 15, 30, 20, 3);
    
    // Microcontroller chip
    p.fill(30, 30, 40);
    p.stroke(50);
    p.rect(x - 25, y - 30, 50, 60, 2);
    
    // Chip legs
    for (let i = 0; i < 6; i++) {
      p.rect(x - 30, y - 25 + i * 10, 8, 3);
      p.rect(x + 22, y - 25 + i * 10, 8, 3);
    }
    
    // Pin header
    p.fill(40, 40, 50);
    for (let i = 0; i < 10; i++) {
      p.rect(x + 40, y - 60 + i * 12, 15, 8, 1);
    }
    
    // Pin 13 indicator
    p.fill(ledState ? p.color(255, 200, 100) : p.color(100, 80, 50));
    p.noStroke();
    p.ellipse(x + 47, y - 60 + 5 * 12 + 4, 6, 6);
    
    // Arduino label
    p.fill(200);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('ARDUINO', x, y + 50);
    p.text('UNO', x, y + 62);
    
    // Pin 13 label
    p.textSize(8);
    p.text('13', x + 58, y - 60 + 5 * 12 + 4);
  };

  const drawLED = () => {
    const x = 280;
    const y = 200;
    
    // LED glow when on
    if (ledState) {
      p.noStroke();
      for (let r = 60; r > 0; r -= 10) {
        p.fill(255, 200, 50, (1 - r / 60) * 150);
        p.ellipse(x, y, r * 2, r * 2);
      }
    }
    
    // LED body
    p.fill(ledState ? p.color(255, 200, 50) : p.color(100, 80, 50));
    p.stroke(ledState ? p.color(255, 220, 100) : p.color(80, 60, 40));
    p.strokeWeight(3);
    p.arc(x, y - 10, 40, 40, p.PI, 0);
    p.rect(x - 20, y - 10, 40, 30, 0, 0, 5, 5);
    
    // LED legs
    p.stroke(150);
    p.strokeWeight(2);
    p.line(x - 8, y + 20, x - 8, y + 50);
    p.line(x + 8, y + 20, x + 8, y + 50);
    
    // Status text
    p.fill(ledState ? p.color(255, 255, 100) : p.color(150));
    p.noStroke();
    p.textSize(16);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(ledState ? 'ON' : 'OFF', x, y + 70);
    
    // Connection wire
    p.stroke(100, 150, 200);
    p.strokeWeight(2);
    p.noFill();
    p.bezier(180, 200, 210, 180, 240, 180, 260, 200);
  };

  const drawWaveform = () => {
    const x = 350;
    const y = 120;
    const w = 200;
    const h = 100;
    
    // Background
    p.fill(40, 45, 55);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(x, y, w, h);
    
    // Grid lines
    p.stroke(60);
    p.line(x, y + h / 2, x + w, y + h / 2);
    
    // Draw square wave
    p.stroke(100, 255, 100);
    p.strokeWeight(2);
    p.noFill();
    p.beginShape();
    for (let i = 0; i < waveformData.length; i++) {
      const px = x + (i / maxDataPoints) * w;
      const py = y + (waveformData[i] ? 15 : h - 15);
      p.vertex(px, py);
    }
    p.endShape();
    
    // Current position marker
    if (waveformData.length > 0) {
      const lastX = x + ((waveformData.length - 1) / maxDataPoints) * w;
      const lastY = y + (waveformData[waveformData.length - 1] ? 15 : h - 15);
      
      p.fill(255, 200, 100);
      p.noStroke();
      p.ellipse(lastX, lastY, 10, 10);
    }
    
    // Labels
    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Digital Output (Pin 13)', x + w / 2, y - 15);
    
    p.textAlign(p.RIGHT, p.CENTER);
    p.text('HIGH', x - 5, y + 15);
    p.text('LOW', x - 5, y + h - 15);
    
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Time →', x + w / 2, y + h + 15);
  };

  const drawDelaySlider = () => {
    const x = 350;
    const y = 340;
    const w = 200;
    
    // Track
    p.fill(60);
    p.stroke(80);
    p.strokeWeight(2);
    p.rect(x, y - 8, w, 16, 8);
    
    // Handle
    const handleX = p.map(delay, 200, 2000, x, x + w);
    p.fill(100, 200, 255);
    p.stroke(150, 220, 255);
    p.strokeWeight(2);
    p.ellipse(handleX, y, 22, 22);
    
    // Labels
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Blink Delay', x + w / 2, y - 30);
    p.textSize(14);
    p.fill(100, 200, 255);
    p.text(`${Math.round(delay)}ms`, x + w / 2, y + 30);
    
    p.fill(150);
    p.textSize(9);
    p.text('Fast', x - 15, y);
    p.text('Slow', x + w + 15, y);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Basic LED Blink: digitalWrite() + delay()', 50, 50);
    p.text('→ Turns LED on, waits, turns off, waits, repeat', 60, 70);
    
    p.fill(150);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Drag slider to change blink speed', 450, 385);
  };
};

export default basicBlinkSketch;
