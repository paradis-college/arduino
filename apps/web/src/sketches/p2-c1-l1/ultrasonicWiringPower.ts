/**
 * P2-C1-L1 Ultrasonic Sensor Wiring - VCC and GND
 * Animation showing how to connect HC-SR04 power pins to Arduino
 */
import type p5 from 'p5';

export const ultrasonicWiringPowerSketch = (p: p5) => {
  let animationStep = 0;
  let wireProgress = 0;
  const animationSpeed = 0.02;

  p.setup = () => {
    p.createCanvas(600, 400);
    p.textFont('monospace');
  };

  p.draw = () => {
    p.background(30, 35, 45);
    
    drawArduino();
    drawSensor();
    drawWires();
    drawLabels();
    drawProgress();
    
    // Advance animation
    wireProgress += animationSpeed;
    if (wireProgress > 1) {
      wireProgress = 0;
      animationStep = (animationStep + 1) % 3;
    }
  };

  const drawArduino = () => {
    const x = 80;
    const y = 180;
    
    // Arduino board
    p.fill(0, 100, 150);
    p.stroke(0, 150, 200);
    p.strokeWeight(2);
    p.rect(x, y, 180, 140, 8);
    
    // USB port
    p.fill(60);
    p.stroke(80);
    p.rect(x + 70, y - 15, 40, 20, 4);
    
    // Label
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Arduino UNO', x + 90, y + 70);
    
    // Power pins area
    p.fill(40, 50, 60);
    p.rect(x + 130, y + 95, 45, 40, 4);
    
    // 5V pin
    p.fill(255, 50, 50);
    p.rect(x + 135, y + 100, 15, 12, 2);
    p.fill(255);
    p.textSize(8);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('5V', x + 142, y + 106);
    
    // GND pin
    p.fill(30);
    p.stroke(100);
    p.strokeWeight(1);
    p.rect(x + 155, y + 100, 15, 12, 2);
    p.fill(255);
    p.noStroke();
    p.text('GND', x + 162, y + 106);
  };

  const drawSensor = () => {
    const x = 400;
    const y = 140;
    
    // HC-SR04 board
    p.fill(30, 80, 30);
    p.stroke(50, 120, 50);
    p.strokeWeight(2);
    p.rect(x, y, 140, 80, 6);
    
    // Ultrasonic transducers
    p.fill(180);
    p.stroke(200);
    p.ellipse(x + 35, y + 40, 40, 40);
    p.ellipse(x + 105, y + 40, 40, 40);
    
    // Inner circles
    p.fill(60);
    p.ellipse(x + 35, y + 40, 20, 20);
    p.ellipse(x + 105, y + 40, 20, 20);
    
    // Label
    p.fill(255);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('HC-SR04', x + 70, y + 75);
    
    // Pin labels
    const pins = ['VCC', 'Trig', 'Echo', 'GND'];
    const pinX = x + 25;
    const pinY = y + 90;
    
    for (let i = 0; i < 4; i++) {
      const px = pinX + i * 30;
      
      // Pin highlight for VCC and GND
      if (i === 0) {
        p.fill(255, 50, 50, animationStep >= 1 ? 255 : 100);
      } else if (i === 3) {
        p.fill(100, animationStep >= 2 ? 255 : 100);
      } else {
        p.fill(100);
      }
      
      p.rect(px, pinY, 20, 30, 2);
      
      // Pin label
      p.fill(255);
      p.textSize(8);
      p.text(pins[i], px + 10, pinY + 40);
    }
  };

  const drawWires = () => {
    // VCC wire (red) - step 1
    if (animationStep >= 1) {
      const progress = animationStep === 1 ? wireProgress : 1;
      drawAnimatedWire(
        222, 286,  // Arduino 5V pin
        425, 230,  // Sensor VCC pin
        p.color(255, 50, 50),
        progress
      );
    }
    
    // GND wire (black) - step 2
    if (animationStep >= 2) {
      const progress = animationStep === 2 ? wireProgress : 1;
      drawAnimatedWire(
        242, 286,  // Arduino GND pin
        515, 230,  // Sensor GND pin
        p.color(50),
        progress
      );
    }
  };

  const drawAnimatedWire = (
    x1: number, y1: number,
    x2: number, y2: number,
    wireColor: p5.Color,
    progress: number
  ) => {
    // Calculate intermediate points for curved wire
    const midX = (x1 + x2) / 2;
    const midY = Math.min(y1, y2) - 50;
    
    // Draw wire path
    p.stroke(wireColor);
    p.strokeWeight(4);
    p.noFill();
    
    const endX = p.lerp(x1, x2, progress);
    const endY = p.lerp(y1, y2, progress);
    const ctrlY = midY + (y1 - midY) * (1 - progress);
    
    p.beginShape();
    for (let t = 0; t <= progress; t += 0.02) {
      const px = p.bezierPoint(x1, midX, midX, x2, t);
      const py = p.bezierPoint(y1, midY, midY, y2, t);
      p.vertex(px, py);
    }
    p.endShape();
    
    // Draw connection point
    p.fill(wireColor);
    p.noStroke();
    p.ellipse(endX, endY - (1 - progress) * 30, 10, 10);
    
    // Pulse effect at end
    if (progress > 0.9) {
      const pulseSize = 15 + p.sin(p.frameCount * 0.2) * 5;
      p.fill(p.red(wireColor), p.green(wireColor), p.blue(wireColor), 100);
      p.ellipse(x2, y2, pulseSize, pulseSize);
    }
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.LEFT, p.TOP);
    p.text('Connect HC-SR04 Power', 20, 20);
    
    p.textSize(11);
    p.fill(150);
    
    const steps = [
      '1. Connect VCC → Arduino 5V (red wire)',
      '2. Connect GND → Arduino GND (black wire)'
    ];
    
    for (let i = 0; i < steps.length; i++) {
      const isActive = i < animationStep || (i === animationStep && wireProgress > 0);
      p.fill(isActive ? 100 : 80, isActive ? 255 : 150, isActive ? 100 : 80);
      p.text(steps[i], 20, 50 + i * 20);
      
      if (i < animationStep) {
        p.text('✓', 5, 50 + i * 20);
      }
    }
  };

  const drawProgress = () => {
    // Progress bar
    const barWidth = 200;
    const barX = 200;
    const barY = 380;
    
    p.fill(50);
    p.noStroke();
    p.rect(barX, barY, barWidth, 8, 4);
    
    const totalProgress = (animationStep + wireProgress) / 3;
    p.fill(100, 200, 100);
    p.rect(barX, barY, barWidth * totalProgress, 8, 4);
    
    // Click to restart hint
    p.fill(120);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Click to restart animation', 300, 365);
  };

  p.mousePressed = () => {
    if (p.mouseX > 0 && p.mouseX < 600 && p.mouseY > 0 && p.mouseY < 400) {
      animationStep = 0;
      wireProgress = 0;
    }
  };
};

export default ultrasonicWiringPowerSketch;
