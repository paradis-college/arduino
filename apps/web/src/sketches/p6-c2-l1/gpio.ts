/**
 * P6-C2-L1 GPIO Basics Sketch 1
 * Clickable Pi pins toggling HIGH/LOW.
 */
import type p5 from 'p5';

export const gpioSketch = (p: p5) => {
  const pinStates: boolean[] = new Array(8).fill(false);

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);
    drawRaspberryPi();
    drawPins();
    drawLEDs();
    drawLabels();
  };

  p.mousePressed = () => {
    for (let i = 0; i < 8; i++) {
      const pinX = 160 + i * 35;
      const pinY = 150;
      if (p.dist(p.mouseX, p.mouseY, pinX, pinY) < 12) {
        pinStates[i] = !pinStates[i];
      }
    }
  };

  const drawRaspberryPi = () => {
    // Board
    p.fill(50, 120, 70);
    p.stroke(40, 100, 60);
    p.strokeWeight(3);
    p.rect(100, 100, 350, 150, 10);
    
    // CPU
    p.fill(60, 60, 70);
    p.stroke(80);
    p.strokeWeight(2);
    p.rect(200, 170, 60, 60, 5);
    
    // Logo placeholder
    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Raspberry', 230, 195);
    p.text('Pi', 230, 210);
    
    // Ethernet port
    p.fill(80, 80, 90);
    p.stroke(60);
    p.strokeWeight(1);
    p.rect(420, 130, 25, 40, 2);
    
    // USB ports
    p.rect(420, 180, 25, 35, 2);
    
    // HDMI
    p.fill(50, 50, 60);
    p.rect(320, 245, 40, 12, 2);
    
    // Label
    p.fill(200);
    p.textSize(12);
    p.text('Raspberry Pi', 275, 280);
  };

  const drawPins = () => {
    const startX = 160;
    const y = 150;
    const spacing = 35;
    
    // GPIO header
    p.fill(30, 30, 40);
    p.stroke(60);
    p.strokeWeight(1);
    p.rect(startX - 20, y - 25, spacing * 8 + 10, 50, 3);
    
    for (let i = 0; i < 8; i++) {
      const x = startX + i * spacing;
      const isOn = pinStates[i];
      
      // Pin
      p.fill(isOn ? p.color(255, 200, 100) : p.color(100, 100, 110));
      p.stroke(isOn ? p.color(255, 220, 150) : p.color(80));
      p.strokeWeight(2);
      p.ellipse(x, y, 20, 20);
      
      // Pin number
      p.fill(isOn ? 30 : 180);
      p.noStroke();
      p.textSize(9);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(`${i + 2}`, x, y);
      
      // State label
      p.fill(isOn ? p.color(100, 255, 100) : p.color(255, 100, 100));
      p.textSize(8);
      p.text(isOn ? 'HIGH' : 'LOW', x, y + 35);
    }
    
    p.fill(150);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('GPIO Header (click pins to toggle)', startX + spacing * 3.5, y - 40);
  };

  const drawLEDs = () => {
    const startX = 160;
    const y = 330;
    const spacing = 35;
    
    // Breadboard
    p.fill(240, 235, 220);
    p.stroke(200);
    p.strokeWeight(2);
    p.rect(startX - 30, y - 30, spacing * 8 + 30, 60, 5);
    
    for (let i = 0; i < 8; i++) {
      const x = startX + i * spacing;
      const isOn = pinStates[i];
      
      // LED glow
      if (isOn) {
        p.noStroke();
        for (let r = 20; r > 0; r -= 4) {
          p.fill(100, 255, 100, (1 - r / 20) * 150);
          p.ellipse(x, y, r * 2, r * 2);
        }
      }
      
      // LED
      p.fill(isOn ? p.color(100, 255, 100) : p.color(50, 80, 50));
      p.stroke(isOn ? p.color(80, 200, 80) : p.color(60));
      p.strokeWeight(1);
      p.ellipse(x, y, 18, 18);
    }
    
    p.fill(100);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Breadboard LEDs', startX + spacing * 3.5, y + 40);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Raspberry Pi GPIO Control', 50, 50);
    p.text('→ GPIO: General Purpose Input/Output pins', 60, 70);
    
    p.fill(150);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Click GPIO pins to toggle HIGH/LOW and control LEDs', 300, 390);
  };
};

export default gpioSketch;
