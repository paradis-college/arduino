/**
 * P2-C1-L5 IR Receiver Wiring
 * Animation showing how to connect IR receiver to Arduino
 */
import type p5 from 'p5';

export const irReceiverWiringSketch = (p: p5) => {
  let animationStep = 0;
  let wireProgress = 0;
  const animationSpeed = 0.025;

  p.setup = () => {
    p.createCanvas(600, 400);
    p.textFont('monospace');
  };

  p.draw = () => {
    p.background(30, 35, 45);
    
    drawArduino();
    drawIRReceiver();
    drawWires();
    drawLabels();
    
    wireProgress += animationSpeed;
    if (wireProgress > 1) {
      wireProgress = 0;
      animationStep = (animationStep + 1) % 4;
    }
  };

  const drawArduino = () => {
    const x = 60;
    const y = 150;
    
    p.fill(0, 100, 150);
    p.stroke(0, 150, 200);
    p.strokeWeight(2);
    p.rect(x, y, 150, 170, 8);
    
    p.fill(200);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Arduino UNO', x + 75, y + 25);
    
    // 5V and GND
    p.fill(40, 50, 60);
    p.rect(x + 100, y + 55, 45, 50, 4);
    
    p.fill(255, 80, 80);
    p.rect(x + 105, y + 60, 15, 12, 2);
    p.fill(255);
    p.textSize(7);
    p.text('5V', x + 112, y + 66);
    
    p.fill(60);
    p.stroke(100);
    p.strokeWeight(1);
    p.rect(x + 125, y + 60, 15, 12, 2);
    p.fill(255);
    p.noStroke();
    p.text('GND', x + 132, y + 66);
    
    // Digital pin 11
    p.fill(40, 50, 60);
    p.rect(x + 10, y + 110, 55, 40, 4);
    
    p.fill(100, 200, 255);
    p.rect(x + 15, y + 118, 20, 12, 2);
    p.fill(0);
    p.textSize(8);
    p.text('11', x + 25, y + 124);
    
    p.fill(150);
    p.textSize(8);
    p.text('Digital', x + 37, y + 140);
  };

  const drawIRReceiver = () => {
    const x = 420;
    const y = 160;
    
    // IR Receiver module (TSOP shape)
    p.fill(20);
    p.stroke(50);
    p.strokeWeight(2);
    
    // Main body
    p.beginShape();
    p.vertex(x - 25, y);
    p.vertex(x + 25, y);
    p.vertex(x + 25, y + 35);
    p.bezierVertex(x + 25, y + 55, x - 25, y + 55, x - 25, y + 35);
    p.endShape(p.CLOSE);
    
    // IR window
    p.fill(40, 0, 40);
    p.stroke(80, 0, 80);
    p.strokeWeight(1);
    p.ellipse(x, y + 25, 30, 30);
    
    // IR detection animation
    if (animationStep >= 3) {
      const pulseAlpha = 100 + 50 * p.sin(p.frameCount * 0.15);
      p.fill(150, 0, 150, pulseAlpha);
      p.noStroke();
      p.ellipse(x, y + 25, 20, 20);
    }
    
    // Pins (pointing down)
    const pins = [
      { label: 'OUT', offset: -15, color: p.color(100, 200, 255) },
      { label: 'GND', offset: 0, color: p.color(60) },
      { label: 'VCC', offset: 15, color: p.color(255, 80, 80) }
    ];
    
    for (let i = 0; i < pins.length; i++) {
      const pin = pins[i];
      const isActive = (pin.label === 'VCC' && animationStep >= 1) ||
                       (pin.label === 'GND' && animationStep >= 2) ||
                       (pin.label === 'OUT' && animationStep >= 3);
      
      p.fill(180);
      p.stroke(isActive ? pin.color : p.color(100));
      p.strokeWeight(isActive ? 2 : 1);
      p.rect(x + pin.offset - 3, y + 55, 6, 30, 1);
      
      p.fill(isActive ? pin.color : p.color(120));
      p.noStroke();
      p.textSize(8);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(pin.label, x + pin.offset, y + 95);
    }
    
    p.fill(200);
    p.textSize(10);
    p.text('IR Receiver', x, y - 15);
    p.textSize(8);
    p.fill(150);
    p.text('TSOP1838', x, y - 5);
  };

  const drawWires = () => {
    // VCC wire (red)
    if (animationStep >= 1) {
      const progress = animationStep === 1 ? wireProgress : 1;
      drawAnimatedWire(210, 216, 435, 245, p.color(255, 80, 80), progress);
    }
    
    // GND wire (black)
    if (animationStep >= 2) {
      const progress = animationStep === 2 ? wireProgress : 1;
      drawAnimatedWire(210, 222, 420, 245, p.color(60), progress);
    }
    
    // OUT wire (blue)
    if (animationStep >= 3) {
      const progress = animationStep === 3 ? wireProgress : 1;
      drawAnimatedWire(135, 280, 405, 245, p.color(100, 200, 255), progress);
    }
  };

  const drawAnimatedWire = (
    x1: number, y1: number,
    x2: number, y2: number,
    wireColor: p5.Color,
    progress: number
  ) => {
    const midX = (x1 + x2) / 2;
    const midY = Math.min(y1, y2) - 30;
    
    p.stroke(wireColor);
    p.strokeWeight(3);
    p.noFill();
    
    p.beginShape();
    for (let t = 0; t <= progress; t += 0.02) {
      const px = p.bezierPoint(x1, midX, midX, x2, t);
      const py = p.bezierPoint(y1, midY, midY, y2, t);
      p.vertex(px, py);
    }
    p.endShape();
    
    const endX = p.bezierPoint(x1, midX, midX, x2, progress);
    const endY = p.bezierPoint(y1, midY, midY, y2, progress);
    p.fill(wireColor);
    p.noStroke();
    p.ellipse(endX, endY, 8, 8);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.LEFT, p.TOP);
    p.text('Connect IR Receiver', 20, 20);
    
    p.textSize(10);
    const steps = [
      { text: 'VCC → Arduino 5V', done: animationStep >= 1 },
      { text: 'GND → Arduino GND', done: animationStep >= 2 },
      { text: 'OUT → Arduino Pin 11', done: animationStep >= 3 }
    ];
    
    for (let i = 0; i < steps.length; i++) {
      p.fill(steps[i].done ? 100 : 80, steps[i].done ? 255 : 150, steps[i].done ? 100 : 80);
      p.text((steps[i].done ? '✓ ' : '○ ') + steps[i].text, 20, 50 + i * 18);
    }
    
    // Note about pin order
    p.fill(40, 50, 60);
    p.rect(20, 320, 230, 60, 6);
    p.fill(255, 200, 100);
    p.textSize(10);
    p.text('⚠ Check your receiver pinout!', 30, 330);
    p.fill(150);
    p.textSize(9);
    p.text('Pin order varies by manufacturer.', 30, 350);
    p.text('Common: OUT-GND-VCC or VCC-GND-OUT', 30, 365);
    
    p.fill(120);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Click to restart', 480, 380);
  };

  p.mousePressed = () => {
    if (p.mouseX > 0 && p.mouseX < 600 && p.mouseY > 0 && p.mouseY < 400) {
      animationStep = 0;
      wireProgress = 0;
    }
  };
};

export default irReceiverWiringSketch;
