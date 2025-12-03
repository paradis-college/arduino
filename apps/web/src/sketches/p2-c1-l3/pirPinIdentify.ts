/**
 * P2-C1-L3 PIR Sensor Pin Identification
 * Animation showing PIR sensor pins
 */
import type p5 from 'p5';

export const pirPinIdentifySketch = (p: p5) => {
  let highlightPin = 0;
  let animationProgress = 0;
  const animationSpeed = 0.01;

  p.setup = () => {
    p.createCanvas(600, 400);
    p.textFont('monospace');
  };

  p.draw = () => {
    p.background(30, 35, 45);
    
    drawPIRSensor();
    drawPinHighlights();
    drawLabels();
    drawProgress();
    
    // Advance animation
    animationProgress += animationSpeed;
    if (animationProgress > 1) {
      animationProgress = 0;
      highlightPin = (highlightPin + 1) % 4;
    }
  };

  const drawPIRSensor = () => {
    const x = 300;
    const y = 150;
    
    // PCB board
    p.fill(30, 100, 30);
    p.stroke(50, 150, 50);
    p.strokeWeight(3);
    p.rect(x - 80, y - 60, 160, 140, 8);
    
    // Fresnel lens dome
    p.fill(255, 255, 255, 30);
    p.stroke(200, 200, 200, 100);
    p.strokeWeight(2);
    p.ellipse(x, y - 10, 100, 100);
    
    // Dome top highlight
    p.noStroke();
    p.fill(255, 255, 255, 50);
    p.ellipse(x - 15, y - 30, 30, 20);
    
    // Fresnel ring pattern
    p.noFill();
    p.stroke(200, 200, 200, 80);
    p.strokeWeight(1);
    for (let r = 15; r <= 45; r += 10) {
      p.ellipse(x, y - 10, r * 2, r * 2);
    }
    
    // Potentiometers
    p.fill(100, 100, 100);
    p.stroke(150);
    p.strokeWeight(1);
    p.ellipse(x - 50, y + 40, 20, 20);
    p.ellipse(x + 50, y + 40, 20, 20);
    
    // Potentiometer slots
    p.stroke(60);
    p.strokeWeight(2);
    p.line(x - 55, y + 40, x - 45, y + 40);
    p.line(x + 45, y + 40, x + 55, y + 40);
    
    // Labels for pots
    p.fill(150);
    p.noStroke();
    p.textSize(8);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('SENS', x - 50, y + 58);
    p.text('TIME', x + 50, y + 58);
    
    // Pin header area
    p.fill(30, 30, 30);
    p.rect(x - 55, y + 75, 110, 25, 4);
    
    // Pins
    const pins = [
      { label: 'VCC', x: x - 35, color: p.color(255, 80, 80) },
      { label: 'OUT', x: x, color: p.color(80, 200, 80) },
      { label: 'GND', x: x + 35, color: p.color(80, 80, 80) }
    ];
    
    for (let i = 0; i < pins.length; i++) {
      const pin = pins[i];
      const isHighlighted = highlightPin === i + 1;
      
      // Pin
      p.fill(isHighlighted ? 255 : 180);
      p.stroke(isHighlighted ? pin.color : p.color(100));
      p.strokeWeight(isHighlighted ? 3 : 1);
      p.rect(pin.x - 8, y + 80, 16, 30, 2);
      
      // Glow effect when highlighted
      if (isHighlighted) {
        p.noFill();
        p.stroke(p.red(pin.color), p.green(pin.color), p.blue(pin.color), 100 + 100 * p.sin(p.frameCount * 0.1));
        p.strokeWeight(4);
        p.rect(pin.x - 12, y + 76, 24, 38, 4);
      }
    }
    
    // Pin labels below
    p.noStroke();
    p.textSize(10);
    for (let i = 0; i < pins.length; i++) {
      const pin = pins[i];
      const isHighlighted = highlightPin === i + 1;
      p.fill(isHighlighted ? pin.color : p.color(150));
      p.text(pin.label, pin.x, y + 125);
    }
  };

  const drawPinHighlights = () => {
    const x = 450;
    const y = 100;
    
    // Info boxes for each pin
    const pinInfo = [
      { name: 'Overview', desc: 'PIR motion sensor module', tip: '3 pins + adjustment pots' },
      { name: 'VCC', desc: 'Power input (5-12V)', tip: 'Connect to Arduino 5V' },
      { name: 'OUT', desc: 'Digital signal output', tip: 'HIGH when motion detected' },
      { name: 'GND', desc: 'Ground connection', tip: 'Connect to Arduino GND' }
    ];
    
    const info = pinInfo[highlightPin];
    
    // Info box
    p.fill(40, 50, 60);
    p.stroke(60, 80, 100);
    p.strokeWeight(2);
    p.rect(x, y, 130, 100, 8);
    
    // Pin name
    const colors = [p.color(200), p.color(255, 80, 80), p.color(80, 200, 80), p.color(150)];
    p.fill(colors[highlightPin]);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.LEFT, p.TOP);
    p.text(info.name, x + 10, y + 10);
    
    // Description
    p.fill(200);
    p.textSize(10);
    p.text(info.desc, x + 10, y + 35);
    
    // Tip
    p.fill(150);
    p.textSize(9);
    p.text(info.tip, x + 10, y + 60);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(16);
    p.textAlign(p.LEFT, p.TOP);
    p.text('PIR Sensor Pins', 20, 20);
    
    p.textSize(10);
    p.fill(150);
    p.text('HC-SR501 / Similar modules', 20, 45);
    
    // Adjustment pots info
    p.fill(40, 50, 60);
    p.rect(20, 280, 180, 100, 6);
    p.fill(200);
    p.textSize(10);
    p.textAlign(p.LEFT, p.TOP);
    p.text('Adjustment Pots:', 30, 290);
    p.fill(150);
    p.textSize(9);
    p.text('SENS: Detection distance', 30, 310);
    p.text('TIME: Output hold duration', 30, 325);
    p.text('', 30, 340);
    p.text('Some models have a jumper', 30, 355);
    p.text('for trigger mode (H/L)', 30, 368);
  };

  const drawProgress = () => {
    const barWidth = 200;
    const barX = 200;
    const barY = 380;
    
    p.fill(50);
    p.noStroke();
    p.rect(barX, barY, barWidth, 8, 4);
    
    const totalProgress = (highlightPin + animationProgress) / 4;
    p.fill(100, 200, 100);
    p.rect(barX, barY, barWidth * totalProgress, 8, 4);
    
    // Pin indicators
    for (let i = 0; i < 4; i++) {
      const ix = barX + (i / 4) * barWidth;
      p.fill(i <= highlightPin ? p.color(100, 200, 100) : p.color(80));
      p.ellipse(ix + barWidth / 8, barY + 4, 8, 8);
    }
    
    p.fill(120);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Click to restart', 300, 365);
  };

  p.mousePressed = () => {
    if (p.mouseX > 0 && p.mouseX < 600 && p.mouseY > 0 && p.mouseY < 400) {
      highlightPin = 0;
      animationProgress = 0;
    }
  };
};

export default pirPinIdentifySketch;
