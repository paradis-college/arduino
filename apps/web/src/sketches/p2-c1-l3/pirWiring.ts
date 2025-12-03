/**
 * P2-C1-L3 PIR Sensor Wiring
 * Animation showing how to connect PIR to Arduino
 */
import type p5 from 'p5';

export const pirWiringSketch = (p: p5) => {
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
    drawPIRSensor();
    drawWires();
    drawLabels();
    drawProgress();
    
    // Advance animation
    wireProgress += animationSpeed;
    if (wireProgress > 1) {
      wireProgress = 0;
      animationStep = (animationStep + 1) % 4;
    }
  };

  const drawArduino = () => {
    const x = 50;
    const y = 150;
    
    // Arduino board
    p.fill(0, 100, 150);
    p.stroke(0, 150, 200);
    p.strokeWeight(2);
    p.rect(x, y, 150, 180, 8);
    
    // USB port
    p.fill(60);
    p.stroke(80);
    p.rect(x + 55, y - 15, 40, 20, 4);
    
    // Label
    p.fill(200);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Arduino UNO', x + 75, y + 25);
    
    // Power pins
    p.fill(40, 50, 60);
    p.rect(x + 100, y + 50, 45, 50, 4);
    
    // 5V pin
    p.fill(255, 80, 80);
    p.rect(x + 105, y + 55, 15, 12, 2);
    p.fill(255);
    p.textSize(7);
    p.text('5V', x + 112, y + 61);
    
    // GND pin
    p.fill(60);
    p.stroke(100);
    p.strokeWeight(1);
    p.rect(x + 125, y + 55, 15, 12, 2);
    p.fill(255);
    p.noStroke();
    p.text('GND', x + 132, y + 61);
    
    // Digital pin 2
    p.fill(40, 50, 60);
    p.rect(x + 10, y + 120, 60, 40, 4);
    
    p.fill(80, 200, 80);
    p.rect(x + 15, y + 128, 18, 12, 2);
    p.fill(0);
    p.textSize(8);
    p.text('2', x + 24, y + 134);
    
    p.fill(150);
    p.textSize(8);
    p.text('Digital', x + 40, y + 150);
  };

  const drawPIRSensor = () => {
    const x = 400;
    const y = 120;
    
    // PCB
    p.fill(30, 100, 30);
    p.stroke(50, 150, 50);
    p.strokeWeight(2);
    p.rect(x - 50, y, 100, 100, 6);
    
    // Dome
    p.fill(255, 255, 255, 40);
    p.stroke(200, 200, 200, 100);
    p.ellipse(x, y + 40, 70, 70);
    
    // Fresnel rings
    p.noFill();
    p.stroke(200, 200, 200, 60);
    p.strokeWeight(1);
    for (let r = 10; r <= 30; r += 8) {
      p.ellipse(x, y + 40, r * 2, r * 2);
    }
    
    // Pins
    const pins = [
      { label: 'VCC', offset: -25, color: p.color(255, 80, 80) },
      { label: 'OUT', offset: 0, color: p.color(80, 200, 80) },
      { label: 'GND', offset: 25, color: p.color(80) }
    ];
    
    for (let i = 0; i < pins.length; i++) {
      const pin = pins[i];
      const isActive = animationStep > i;
      
      p.fill(isActive ? 200 : 120);
      p.stroke(isActive ? pin.color : p.color(80));
      p.strokeWeight(isActive ? 2 : 1);
      p.rect(x + pin.offset - 8, y + 100, 16, 25, 2);
      
      // Label
      p.fill(isActive ? pin.color : p.color(120));
      p.noStroke();
      p.textSize(9);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(pin.label, x + pin.offset, y + 138);
    }
    
    // Label
    p.fill(200);
    p.textSize(10);
    p.text('PIR Sensor', x, y - 15);
  };

  const drawWires = () => {
    // Step 1: VCC to 5V (red)
    if (animationStep >= 1) {
      const progress = animationStep === 1 ? wireProgress : 1;
      drawAnimatedWire(
        200, 211,  // Arduino 5V
        375, 225,  // PIR VCC
        p.color(255, 80, 80),
        progress,
        -30
      );
    }
    
    // Step 2: GND to GND (black)
    if (animationStep >= 2) {
      const progress = animationStep === 2 ? wireProgress : 1;
      drawAnimatedWire(
        200, 211,  // Arduino GND (offset)
        425, 225,  // PIR GND
        p.color(60),
        progress,
        -60
      );
    }
    
    // Step 3: OUT to pin 2 (green)
    if (animationStep >= 3) {
      const progress = animationStep === 3 ? wireProgress : 1;
      drawAnimatedWire(
        128, 284,  // Arduino pin 2
        400, 225,  // PIR OUT
        p.color(80, 200, 80),
        progress,
        40
      );
    }
  };

  const drawAnimatedWire = (
    x1: number, y1: number,
    x2: number, y2: number,
    wireColor: p5.Color,
    progress: number,
    curveOffset: number
  ) => {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2 + curveOffset;
    
    p.stroke(wireColor);
    p.strokeWeight(4);
    p.noFill();
    
    p.beginShape();
    for (let t = 0; t <= progress; t += 0.02) {
      const px = p.bezierPoint(x1, midX, midX, x2, t);
      const py = p.bezierPoint(y1, midY, midY, y2, t);
      p.vertex(px, py);
    }
    p.endShape();
    
    // End point
    const endX = p.bezierPoint(x1, midX, midX, x2, progress);
    const endY = p.bezierPoint(y1, midY, midY, y2, progress);
    p.fill(wireColor);
    p.noStroke();
    p.ellipse(endX, endY, 10, 10);
    
    // Pulse when complete
    if (progress > 0.95) {
      p.fill(p.red(wireColor), p.green(wireColor), p.blue(wireColor), 100);
      const pulseSize = 15 + 5 * p.sin(p.frameCount * 0.15);
      p.ellipse(x2, y2, pulseSize, pulseSize);
    }
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.LEFT, p.TOP);
    p.text('Connect PIR Sensor', 20, 20);
    
    p.textSize(10);
    
    const steps = [
      { text: 'VCC → Arduino 5V (red)', done: animationStep > 0 },
      { text: 'GND → Arduino GND (black)', done: animationStep > 1 },
      { text: 'OUT → Arduino Pin 2 (green)', done: animationStep > 2 }
    ];
    
    for (let i = 0; i < steps.length; i++) {
      p.fill(steps[i].done ? 100 : 80, steps[i].done ? 255 : 150, steps[i].done ? 100 : 80);
      const check = steps[i].done ? '✓ ' : '○ ';
      p.text(check + steps[i].text, 20, 50 + i * 18);
    }
    
    // Code hint
    p.fill(40, 50, 60);
    p.rect(20, 320, 220, 60, 6);
    p.fill(200);
    p.textSize(9);
    p.textAlign(p.LEFT, p.TOP);
    p.text('pinMode(2, INPUT);', 30, 330);
    p.text('int motion = digitalRead(2);', 30, 345);
    p.text('// HIGH = motion detected', 30, 360);
  };

  const drawProgress = () => {
    const barWidth = 200;
    const barX = 350;
    const barY = 380;
    
    p.fill(50);
    p.noStroke();
    p.rect(barX, barY, barWidth, 8, 4);
    
    const totalProgress = (animationStep + wireProgress) / 4;
    p.fill(100, 200, 100);
    p.rect(barX, barY, barWidth * totalProgress, 8, 4);
    
    p.fill(120);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Click to restart', 450, 365);
  };

  p.mousePressed = () => {
    if (p.mouseX > 0 && p.mouseX < 600 && p.mouseY > 0 && p.mouseY < 400) {
      animationStep = 0;
      wireProgress = 0;
    }
  };
};

export default pirWiringSketch;
