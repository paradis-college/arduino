/**
 * P3-C4-L2 Buzzer Tones Sketch 1
 * Waveform stretching/compressing with pitch changes.
 */
import type p5 from 'p5';

export const buzzerSketch = (p: p5) => {
  let frequency = 440;
  let wavePhase = 0;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);
    wavePhase += frequency / 100;
    drawSlider();
    drawWaveform();
    drawBuzzer();
    drawLabels();
  };

  p.mouseDragged = () => {
    if (p.mouseX > 100 && p.mouseX < 500 && p.mouseY > 300 && p.mouseY < 340) {
      frequency = p.map(p.mouseX, 100, 500, 100, 2000);
    }
  };

  const drawSlider = () => {
    const x = 100;
    const y = 320;
    const w = 400;
    
    p.fill(60);
    p.stroke(80);
    p.strokeWeight(2);
    p.rect(x, y - 8, w, 16, 8);
    
    const handleX = p.map(frequency, 100, 2000, x, x + w);
    p.fill(255, 200, 100);
    p.stroke(255);
    p.ellipse(handleX, y, 24, 24);
    
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Frequency (Hz)', x + w / 2, y - 30);
    p.fill(255, 200, 100);
    p.textSize(18);
    p.text(`${Math.round(frequency)} Hz`, x + w / 2, y + 35);
    
    p.fill(150);
    p.textSize(10);
    p.text('Low', x - 20, y);
    p.text('High', x + w + 25, y);
  };

  const drawWaveform = () => {
    const x = 50;
    const y = 150;
    const w = 500;
    const h = 100;
    
    p.fill(40, 45, 55);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(x, y - h / 2, w, h);
    
    p.stroke(100, 255, 150);
    p.strokeWeight(2);
    p.noFill();
    p.beginShape();
    
    const wavelength = 5000 / frequency;
    for (let i = 0; i < w; i++) {
      const px = x + i;
      const py = y + Math.sin((i / wavelength + wavePhase) * p.TWO_PI) * 35;
      p.vertex(px, py);
    }
    p.endShape();
    
    p.fill(200);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Sound Wave', x + w / 2, y - h / 2 - 15);
    
    const pitch = frequency < 300 ? 'Low Pitch' : frequency < 800 ? 'Medium Pitch' : 'High Pitch';
    p.fill(100, 255, 150);
    p.text(pitch, x + w / 2, y + h / 2 + 15);
  };

  const drawBuzzer = () => {
    const x = 550;
    const y = 150;
    const intensity = p.map(frequency, 100, 2000, 0.3, 1);
    
    p.fill(50, 50, 60);
    p.stroke(80);
    p.strokeWeight(2);
    p.ellipse(x, y, 50, 50);
    
    p.fill(40, 40, 50);
    p.ellipse(x, y, 35, 35);
    
    // Sound waves
    p.noFill();
    p.stroke(255, 200, 100, 150 * intensity);
    p.strokeWeight(2);
    for (let i = 1; i <= 3; i++) {
      const offset = (p.frameCount * 2 + i * 10) % 30;
      p.arc(x - 10, y, 40 + offset, 40 + offset, -p.QUARTER_PI, p.QUARTER_PI);
    }
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Piezo Buzzer: tone() function', 50, 50);
    p.text('→ Higher frequency = higher pitch', 60, 70);
    
    p.fill(150);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Drag slider to change frequency', 300, 385);
  };
};

export default buzzerSketch;
