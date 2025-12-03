/**
 * P3-C1-L3 PWM LED Fade Sketch 1
 * Duty-cycle bar growing/shrinking with slider 0–255.
 */
import type p5 from 'p5';

export const pwmFadeSketch = (p: p5) => {
  let pwmValue = 128;
  let ledBrightness = 0;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);
    
    // Animate LED brightness smoothly
    ledBrightness = p.lerp(ledBrightness, pwmValue, 0.1);
    
    drawPWMSlider();
    drawDutyCycleVisualization();
    drawLED();
    drawLabels();
  };

  p.mouseDragged = () => {
    if (p.mouseX > 50 && p.mouseX < 300 && p.mouseY > 300 && p.mouseY < 340) {
      pwmValue = p.map(p.mouseX, 50, 300, 0, 255);
      pwmValue = p.constrain(pwmValue, 0, 255);
    }
  };

  const drawPWMSlider = () => {
    const x = 50;
    const y = 320;
    const w = 250;
    
    // Track
    p.fill(60);
    p.stroke(80);
    p.strokeWeight(2);
    p.rect(x, y - 8, w, 16, 8);
    
    // Fill
    const fillColor = p.lerpColor(p.color(100, 100, 100), p.color(100, 200, 255), pwmValue / 255);
    p.fill(fillColor);
    p.noStroke();
    p.rect(x, y - 8, w * (pwmValue / 255), 16, 8, 0, 0, 8);
    
    // Handle
    const handleX = p.map(pwmValue, 0, 255, x, x + w);
    p.fill(200);
    p.stroke(255);
    p.strokeWeight(2);
    p.ellipse(handleX, y, 24, 24);
    
    // Labels
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('PWM Value (analogWrite)', x + w / 2, y - 30);
    
    p.fill(100, 200, 255);
    p.textSize(20);
    p.text(`${Math.round(pwmValue)}`, x + w / 2, y + 35);
    
    p.fill(150);
    p.textSize(10);
    p.text('0', x - 15, y);
    p.text('255', x + w + 20, y);
    
    // Percentage
    p.fill(200);
    p.textSize(12);
    p.text(`(${((pwmValue / 255) * 100).toFixed(0)}% duty cycle)`, x + w / 2, y + 55);
  };

  const drawDutyCycleVisualization = () => {
    const x = 50;
    const y = 100;
    const w = 250;
    const h = 100;
    
    // Background
    p.fill(40, 45, 55);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(x, y, w, h);
    
    // Draw PWM waveform
    const dutyCycle = pwmValue / 255;
    const period = w / 5; // 5 cycles
    
    p.stroke(100, 255, 100);
    p.strokeWeight(2);
    p.noFill();
    p.beginShape();
    
    for (let i = 0; i < 5; i++) {
      const startX = x + i * period;
      const highWidth = period * dutyCycle;
      
      p.vertex(startX, y + h - 15);
      p.vertex(startX, y + 15);
      p.vertex(startX + highWidth, y + 15);
      p.vertex(startX + highWidth, y + h - 15);
    }
    p.vertex(x + w, y + h - 15);
    p.endShape();
    
    // Duty cycle fill indicator
    p.fill(100, 255, 100, 50);
    p.noStroke();
    for (let i = 0; i < 5; i++) {
      const startX = x + i * period;
      const highWidth = period * dutyCycle;
      p.rect(startX, y + 15, highWidth, h - 30);
    }
    
    // Labels
    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('PWM Signal (Square Wave)', x + w / 2, y - 15);
    
    p.textAlign(p.RIGHT, p.CENTER);
    p.text('HIGH', x - 5, y + 15);
    p.text('LOW', x - 5, y + h - 15);
    
    // Duty cycle annotation
    if (dutyCycle > 0.1 && dutyCycle < 0.9) {
      const annotX = x + period * dutyCycle / 2;
      p.fill(100, 255, 100);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(9);
      p.text(`${(dutyCycle * 100).toFixed(0)}%`, annotX, y + h / 2);
    }
  };

  const drawLED = () => {
    const x = 450;
    const y = 200;
    const brightness = ledBrightness / 255;
    
    // LED glow (proportional to brightness)
    if (brightness > 0.05) {
      p.noStroke();
      for (let r = 80 * brightness; r > 0; r -= 8) {
        p.fill(255, 200, 100, brightness * (1 - r / (80 * brightness)) * 200);
        p.ellipse(x, y, r * 2, r * 2);
      }
    }
    
    // LED body
    const ledColor = p.lerpColor(p.color(80, 60, 40), p.color(255, 200, 100), brightness);
    p.fill(ledColor);
    p.stroke(100);
    p.strokeWeight(2);
    p.arc(x, y - 10, 50, 50, p.PI, 0);
    p.rect(x - 25, y - 10, 50, 35, 0, 0, 6, 6);
    
    // LED legs
    p.stroke(150);
    p.strokeWeight(3);
    p.line(x - 10, y + 25, x - 10, y + 55);
    p.line(x + 10, y + 25, x + 10, y + 55);
    
    // Brightness indicator bar
    const barX = x - 25;
    const barY = y + 80;
    const barW = 50;
    const barH = 15;
    
    p.fill(60);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(barX, barY, barW, barH, 4);
    
    p.fill(p.lerpColor(p.color(80, 80, 80), p.color(255, 200, 100), brightness));
    p.noStroke();
    p.rect(barX, barY, barW * brightness, barH, 4);
    
    // Label
    p.fill(200);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('LED', x, y + 110);
    p.textSize(11);
    p.fill(ledColor);
    p.text(`Brightness: ${(brightness * 100).toFixed(0)}%`, x, y + 128);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('PWM: Pulse Width Modulation', 50, 50);
    p.text('→ Higher duty cycle = brighter LED', 60, 70);
    
    p.fill(150);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Drag slider to adjust LED brightness (analogWrite)', 175, 385);
  };
};

export default pwmFadeSketch;
