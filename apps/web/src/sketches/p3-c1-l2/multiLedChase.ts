/**
 * P3-C1-L2 Multi-LED Blink Sketch 1
 * 3-LED chase animation.
 */
import type p5 from 'p5';

export const multiLedChaseSketch = (p: p5) => {
  let currentLed = 0;
  let timer = 0;
  const chaseDelay = 300; // ms

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);
    
    // Update chase position
    timer += p.deltaTime;
    if (timer >= chaseDelay) {
      timer = 0;
      currentLed = (currentLed + 1) % 3;
    }
    
    drawLEDs();
    drawArduino();
    drawConnections();
    drawLabels();
  };

  const drawLEDs = () => {
    const startX = 300;
    const y = 180;
    const spacing = 80;
    const colors = [
      p.color(255, 80, 80),   // Red
      p.color(255, 200, 80),  // Yellow
      p.color(80, 255, 80)    // Green
    ];
    
    for (let i = 0; i < 3; i++) {
      const x = startX + i * spacing;
      const isOn = i === currentLed;
      const baseColor = colors[i];
      
      // LED glow when on
      if (isOn) {
        p.noStroke();
        for (let r = 50; r > 0; r -= 8) {
          p.fill(p.red(baseColor), p.green(baseColor), p.blue(baseColor), (1 - r / 50) * 150);
          p.ellipse(x, y, r * 2, r * 2);
        }
      }
      
      // LED body
      p.fill(isOn ? baseColor : p.color(p.red(baseColor) * 0.3, p.green(baseColor) * 0.3, p.blue(baseColor) * 0.3));
      p.stroke(isOn ? p.color(255) : p.color(100));
      p.strokeWeight(2);
      p.arc(x, y - 8, 35, 35, p.PI, 0);
      p.rect(x - 17, y - 8, 34, 25, 0, 0, 4, 4);
      
      // LED legs
      p.stroke(150);
      p.strokeWeight(2);
      p.line(x - 6, y + 17, x - 6, y + 40);
      p.line(x + 6, y + 17, x + 6, y + 40);
      
      // Pin labels
      p.fill(200);
      p.noStroke();
      p.textSize(12);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(`LED ${i + 1}`, x, y + 55);
      p.textSize(10);
      p.text(`Pin ${9 + i}`, x, y + 70);
    }
    
    // Animation direction indicator
    p.fill(100, 200, 255);
    p.textSize(14);
    p.text('← Chase Direction →', startX + spacing, y - 60);
    
    // Current LED indicator
    const indicatorX = startX + currentLed * spacing;
    p.fill(255, 200, 100);
    p.noStroke();
    p.triangle(indicatorX - 10, y - 50, indicatorX + 10, y - 50, indicatorX, y - 40);
  };

  const drawArduino = () => {
    const x = 100;
    const y = 200;
    
    // Simplified Arduino
    p.fill(30, 60, 100);
    p.stroke(50, 80, 120);
    p.strokeWeight(2);
    p.rect(x - 40, y - 60, 80, 120, 5);
    
    // Chip
    p.fill(30, 30, 40);
    p.stroke(50);
    p.strokeWeight(1);
    p.rect(x - 20, y - 20, 40, 50, 2);
    
    // Pin header (pins 9-11)
    p.fill(40, 40, 50);
    for (let i = 0; i < 3; i++) {
      p.stroke(i === currentLed ? p.color(255, 200, 100) : p.color(60));
      p.strokeWeight(i === currentLed ? 2 : 1);
      p.rect(x + 25, y - 30 + i * 15, 12, 8, 1);
    }
    
    // Pin labels
    p.fill(150);
    p.noStroke();
    p.textSize(8);
    p.textAlign(p.LEFT, p.CENTER);
    for (let i = 0; i < 3; i++) {
      p.text(`${9 + i}`, x + 40, y - 26 + i * 15);
    }
    
    // Board label
    p.fill(200);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('ARDUINO', x, y + 45);
  };

  const drawConnections = () => {
    const arduinoX = 137;
    const ledStartX = 300;
    const spacing = 80;
    
    p.strokeWeight(2);
    p.noFill();
    
    for (let i = 0; i < 3; i++) {
      const ledX = ledStartX + i * spacing - 6;
      const pinY = 200 - 26 + i * 15;
      
      // Wire color based on active state
      p.stroke(i === currentLed ? p.color(100, 200, 255) : p.color(80, 100, 120));
      
      // Bezier curve from pin to LED
      p.bezier(
        arduinoX, pinY,
        arduinoX + 50, pinY,
        ledX - 50, 220,
        ledX, 220
      );
    }
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Multi-LED Chase Animation', 50, 50);
    p.text('→ LEDs turn on one after another', 60, 70);
    p.text('→ Creates a "running light" effect', 60, 90);
    
    p.fill(150);
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Watch the lights chase from left to right!', 300, 370);
    
    // Code hint
    p.fill(100, 150, 100);
    p.textSize(10);
    p.text('for(i=0; i<3; i++) { digitalWrite(pin[i], i==current); }', 300, 385);
  };
};

export default multiLedChaseSketch;
