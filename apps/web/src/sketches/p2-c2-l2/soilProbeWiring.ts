/**
 * P2-C2-L2 Soil Moisture Sensor Probe Connection
 * Animation showing how to connect probe to module
 */
import type p5 from 'p5';

export const soilProbeWiringSketch = (p: p5) => {
  let animationStep = 0;
  let wireProgress = 0;
  const animationSpeed = 0.02;

  p.setup = () => {
    p.createCanvas(600, 400);
    p.textFont('monospace');
  };

  p.draw = () => {
    p.background(30, 35, 45);
    
    drawSensorModule();
    drawProbe();
    drawConnection();
    drawLabels();
    
    wireProgress += animationSpeed;
    if (wireProgress > 1) {
      wireProgress = 0;
      animationStep = (animationStep + 1) % 3;
    }
  };

  const drawSensorModule = () => {
    const x = 150;
    const y = 150;
    
    // Module PCB
    p.fill(0, 80, 50);
    p.stroke(0, 120, 70);
    p.strokeWeight(2);
    p.rect(x - 50, y, 100, 80, 6);
    
    // Comparator chip
    p.fill(30);
    p.stroke(50);
    p.strokeWeight(1);
    p.rect(x - 25, y + 20, 30, 20, 2);
    
    // LED indicators
    p.fill(255, 50, 50);
    p.noStroke();
    p.ellipse(x + 25, y + 20, 8, 8);
    p.fill(50, 255, 50);
    p.ellipse(x + 25, y + 35, 8, 8);
    
    // Potentiometer
    p.fill(80);
    p.stroke(100);
    p.ellipse(x - 25, y + 55, 15, 15);
    
    // Probe connector (2 pins)
    p.fill(animationStep >= 1 ? 200 : 120);
    p.stroke(animationStep >= 1 ? p.color(255, 200, 100) : p.color(80));
    p.strokeWeight(animationStep >= 1 ? 2 : 1);
    p.rect(x + 10, y + 45, 30, 25, 3);
    
    // Connector pins
    p.fill(180);
    p.noStroke();
    p.rect(x + 18, y + 50, 5, 15);
    p.rect(x + 28, y + 50, 5, 15);
    
    p.fill(200);
    p.textSize(9);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Sensor Module', x, y - 12);
    p.textSize(8);
    p.fill(150);
    p.text('LM393', x - 10, y + 30);
  };

  const drawProbe = () => {
    const x = 420;
    const y = 120;
    
    // Probe board
    p.fill(150, 120, 80);
    p.stroke(180, 150, 100);
    p.strokeWeight(2);
    p.rect(x - 15, y, 30, 150, 4);
    
    // Copper traces
    p.fill(180, 140, 60);
    p.noStroke();
    for (let i = 0; i < 10; i++) {
      p.rect(x - 12, y + 20 + i * 12, 24, 4, 2);
    }
    
    // Wire attachment holes
    p.fill(animationStep >= 2 ? 200 : 100);
    p.stroke(animationStep >= 2 ? p.color(255, 200, 100) : p.color(80));
    p.strokeWeight(animationStep >= 2 ? 2 : 1);
    p.ellipse(x - 5, y + 160, 10, 10);
    p.ellipse(x + 5, y + 160, 10, 10);
    
    p.fill(200);
    p.noStroke();
    p.textSize(9);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Probe', x, y - 12);
    
    // Depth indicator
    p.fill(100);
    p.textSize(8);
    p.text('Insert 2/3', x, y + 180);
    p.text('into soil', x, y + 192);
  };

  const drawConnection = () => {
    if (animationStep >= 1) {
      const progress = animationStep === 1 ? wireProgress : 1;
      
      // Wire 1
      drawAnimatedWire(200, 215, 415, 280, p.color(255, 100, 100), progress);
      // Wire 2
      drawAnimatedWire(200, 222, 425, 280, p.color(50), progress);
    }
  };

  const drawAnimatedWire = (
    x1: number, y1: number,
    x2: number, y2: number,
    wireColor: p5.Color,
    progress: number
  ) => {
    const midX = (x1 + x2) / 2;
    const midY = Math.max(y1, y2) + 30;
    
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
    p.text('Connect Sensor Probe', 20, 20);
    
    p.textSize(10);
    const steps = [
      '1. Locate 2-pin connector on module',
      '2. Connect probe wires to connector'
    ];
    
    for (let i = 0; i < steps.length; i++) {
      const done = animationStep > i;
      p.fill(done ? 100 : 80, done ? 255 : 150, done ? 100 : 80);
      p.text((done ? '✓ ' : '○ ') + steps[i], 20, 50 + i * 18);
    }
    
    // Tips
    p.fill(40, 50, 60);
    p.rect(20, 320, 230, 60, 6);
    p.fill(200);
    p.textSize(10);
    p.text('Probe insertion depth:', 30, 330);
    p.fill(150);
    p.textSize(9);
    p.text('• Insert about 2/3 of prongs', 30, 350);
    p.text('• Keep module above soil/water', 30, 365);
    
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

export default soilProbeWiringSketch;
