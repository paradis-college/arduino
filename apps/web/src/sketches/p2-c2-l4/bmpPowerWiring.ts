/**
 * P2-C2-L4 BMP/BME Power Connection
 * Animation showing power wiring for pressure sensor
 */
import type p5 from 'p5';

export const bmpPowerWiringSketch = (p: p5) => {
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
    drawBMPSensor();
    drawWires();
    drawLabels();
    drawVoltageNote();
    
    wireProgress += animationSpeed;
    if (wireProgress > 1) {
      wireProgress = 0;
      animationStep = (animationStep + 1) % 3;
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
    
    // Power pins highlighted
    p.fill(40, 50, 60);
    p.stroke(animationStep >= 1 ? p.color(255, 200, 100) : p.color(60, 70, 80));
    p.strokeWeight(animationStep >= 1 ? 2 : 1);
    p.rect(x + 95, y + 50, 50, 60, 4);
    
    // 3.3V (preferred for BMP)
    p.fill(255, 150, 50);
    p.rect(x + 100, y + 58, 18, 14, 2);
    p.fill(0);
    p.textSize(7);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('3.3V', x + 109, y + 65);
    
    // 5V (with regulator on some modules)
    p.fill(255, 80, 80);
    p.rect(x + 122, y + 58, 18, 14, 2);
    p.fill(255);
    p.text('5V', x + 131, y + 65);
    
    // GND
    p.fill(60);
    p.stroke(100);
    p.strokeWeight(1);
    p.rect(x + 100, y + 78, 40, 14, 2);
    p.fill(200);
    p.noStroke();
    p.text('GND', x + 120, y + 85);
    
    // Note about voltage
    p.fill(150);
    p.textSize(7);
    p.textAlign(p.LEFT, p.TOP);
    p.text('Use 3.3V for', x + 100, y + 98);
    p.text('BMP sensors', x + 100, y + 108);
  };

  const drawBMPSensor = () => {
    const x = 420;
    const y = 140;
    
    // Module PCB
    p.fill(80, 40, 100);
    p.stroke(120, 60, 150);
    p.strokeWeight(2);
    p.rect(x - 50, y, 100, 80, 6);
    
    // Chip
    p.fill(30);
    p.stroke(50);
    p.strokeWeight(1);
    p.rect(x - 20, y + 20, 40, 30, 2);
    
    // Vent
    p.fill(20);
    p.noStroke();
    p.ellipse(x, y + 35, 10, 10);
    
    // Voltage regulator (if present)
    p.fill(40);
    p.stroke(60);
    p.strokeWeight(1);
    p.rect(x + 20, y + 20, 15, 12, 2);
    p.fill(100);
    p.textSize(6);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('REG', x + 27, y + 26);
    
    // Labels
    p.fill(255);
    p.noStroke();
    p.textSize(10);
    p.text('BME280', x, y + 65);
    
    // Pins
    const pins = [
      { label: 'VCC', offset: -30, color: p.color(255, 150, 50) },
      { label: 'GND', offset: 0, color: p.color(60) }
    ];
    
    for (let i = 0; i < pins.length; i++) {
      const pin = pins[i];
      const isActive = animationStep > i;
      
      p.fill(180);
      p.stroke(isActive ? pin.color : p.color(80));
      p.strokeWeight(isActive ? 2 : 1);
      p.rect(x + pin.offset - 8, y + 80, 16, 25, 2);
      
      p.fill(isActive ? pin.color : p.color(120));
      p.noStroke();
      p.textSize(8);
      p.text(pin.label, x + pin.offset, y + 115);
    }
    
    p.fill(200);
    p.textSize(9);
    p.text('Pressure/Temp Sensor', x, y - 12);
  };

  const drawWires = () => {
    // VCC wire to 3.3V
    if (animationStep >= 1) {
      const progress = animationStep === 1 ? wireProgress : 1;
      drawAnimatedWire(209, 215, 390, 235, p.color(255, 150, 50), progress);
    }
    
    // GND wire
    if (animationStep >= 2) {
      const progress = animationStep === 2 ? wireProgress : 1;
      drawAnimatedWire(210, 242, 420, 235, p.color(60), progress);
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
    p.strokeWeight(4);
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
    p.ellipse(endX, endY, 10, 10);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.LEFT, p.TOP);
    p.text('Power the Sensor', 20, 20);
    
    p.textSize(10);
    const steps = [
      { text: 'VCC → Arduino 3.3V', done: animationStep >= 1 },
      { text: 'GND → Arduino GND', done: animationStep >= 2 }
    ];
    
    for (let i = 0; i < steps.length; i++) {
      p.fill(steps[i].done ? 100 : 80, steps[i].done ? 255 : 150, steps[i].done ? 100 : 80);
      p.text((steps[i].done ? '✓ ' : '○ ') + steps[i].text, 20, 50 + i * 18);
    }
  };

  const drawVoltageNote = () => {
    p.fill(40, 50, 60);
    p.rect(20, 300, 250, 80, 6);
    p.fill(255, 200, 100);
    p.textSize(10);
    p.textAlign(p.LEFT, p.TOP);
    p.text('⚠ Voltage Compatibility', 30, 310);
    p.fill(150);
    p.textSize(9);
    p.text('• BMP/BME sensors are 3.3V devices', 30, 330);
    p.text('• Many modules have onboard regulator', 30, 345);
    p.text('• Check module specs before using 5V', 30, 360);
    p.text('• When in doubt, use 3.3V', 30, 375);
    
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

export default bmpPowerWiringSketch;
