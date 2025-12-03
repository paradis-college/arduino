/**
 * P2-C2-L3 MQ Gas Sensor Mounting
 * Animation showing how to mount MQ sensor on breadboard
 */
import type p5 from 'p5';

export const mqMountingSketch = (p: p5) => {
  let animationStep = 0;
  let stepProgress = 0;
  const animationSpeed = 0.02;

  p.setup = () => {
    p.createCanvas(600, 400);
    p.textFont('monospace');
  };

  p.draw = () => {
    p.background(30, 35, 45);
    
    drawBreadboard();
    drawMQSensor();
    drawPinLabels();
    drawLabels();
    
    stepProgress += animationSpeed;
    if (stepProgress > 1) {
      stepProgress = 0;
      animationStep = (animationStep + 1) % 3;
    }
  };

  const drawBreadboard = () => {
    const x = 200;
    const y = 150;
    
    // Breadboard
    p.fill(240, 240, 230);
    p.stroke(200);
    p.strokeWeight(2);
    p.rect(x, y, 280, 150, 8);
    
    // Holes
    p.fill(30);
    p.noStroke();
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 12; col++) {
        p.ellipse(x + 25 + col * 20, y + 30 + row * 30, 5, 5);
      }
    }
    
    // Labels
    p.fill(150);
    p.textSize(8);
    p.textAlign(p.CENTER, p.CENTER);
    for (let col = 0; col < 12; col++) {
      p.text(String.fromCharCode(65 + col), x + 25 + col * 20, y + 140);
    }
  };

  const drawMQSensor = () => {
    const x = 340;
    const y = animationStep >= 1 ? 170 : 80;
    
    // Interpolate position
    const targetY = animationStep >= 1 ? 170 : 80;
    const currentY = animationStep === 1 ? p.lerp(80, 170, stepProgress) : targetY;
    
    // Sensor body (metal mesh cylinder)
    p.fill(60);
    p.stroke(80);
    p.strokeWeight(2);
    p.ellipse(x, currentY + 25, 50, 50);
    
    // Top mesh pattern
    p.stroke(100);
    p.strokeWeight(1);
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * p.PI;
      p.line(
        x + p.cos(angle) * 20,
        currentY + 25 + p.sin(angle) * 20,
        x - p.cos(angle) * 20,
        currentY + 25 - p.sin(angle) * 20
      );
    }
    
    // Module PCB
    p.fill(0, 80, 50);
    p.stroke(0, 120, 70);
    p.strokeWeight(2);
    p.rect(x - 35, currentY + 50, 70, 50, 4);
    
    // Potentiometer
    p.fill(80);
    p.stroke(100);
    p.ellipse(x - 15, currentY + 75, 12, 12);
    
    // LEDs
    p.fill(255, 50, 50);
    p.noStroke();
    p.ellipse(x + 15, currentY + 65, 6, 6);
    p.fill(50, 255, 50);
    p.ellipse(x + 15, currentY + 80, 6, 6);
    
    // Pins
    const pinColors = [
      p.color(255, 80, 80),  // VCC
      p.color(60),           // GND
      p.color(100, 200, 255), // AO
      p.color(100, 200, 100)  // DO
    ];
    
    for (let i = 0; i < 4; i++) {
      const px = x - 25 + i * 17;
      const isInserted = animationStep >= 2;
      
      p.fill(180);
      p.stroke(isInserted ? pinColors[i] : p.color(100));
      p.strokeWeight(isInserted ? 2 : 1);
      p.rect(px - 3, currentY + 100, 6, isInserted ? 20 : 30, 1);
    }
    
    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('MQ Sensor', x, currentY);
  };

  const drawPinLabels = () => {
    if (animationStep >= 2) {
      const x = 340;
      const y = 300;
      
      const pins = ['VCC', 'GND', 'AO', 'DO'];
      const colors = [
        p.color(255, 80, 80),
        p.color(120),
        p.color(100, 200, 255),
        p.color(100, 200, 100)
      ];
      
      for (let i = 0; i < pins.length; i++) {
        const px = x - 25 + i * 17;
        p.fill(colors[i]);
        p.textSize(8);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(pins[i], px, y);
      }
    }
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.LEFT, p.TOP);
    p.text('Mount MQ Sensor', 20, 20);
    
    p.textSize(10);
    const steps = [
      '1. Position sensor over breadboard',
      '2. Insert pins into holes'
    ];
    
    for (let i = 0; i < steps.length; i++) {
      const done = animationStep > i;
      p.fill(done ? 100 : 80, done ? 255 : 150, done ? 100 : 80);
      p.text((done ? '✓ ' : '○ ') + steps[i], 20, 50 + i * 18);
    }
    
    // Pin info
    p.fill(40, 50, 60);
    p.rect(20, 280, 160, 100, 6);
    p.fill(200);
    p.textSize(10);
    p.text('MQ Module Pins:', 30, 290);
    p.fill(255, 80, 80);
    p.text('VCC - 5V Power', 30, 310);
    p.fill(120);
    p.text('GND - Ground', 30, 325);
    p.fill(100, 200, 255);
    p.text('AO - Analog Output', 30, 340);
    p.fill(100, 200, 100);
    p.text('DO - Digital Output', 30, 355);
    
    p.fill(120);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Click to restart', 480, 380);
  };

  p.mousePressed = () => {
    if (p.mouseX > 0 && p.mouseX < 600 && p.mouseY > 0 && p.mouseY < 400) {
      animationStep = 0;
      stepProgress = 0;
    }
  };
};

export default mqMountingSketch;
