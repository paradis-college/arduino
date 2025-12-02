/**
 * P1-C1-L1 GIF4: Voltage Slider
 * "Voltage slider (3.3V–5V) adjusting bar-graph current; LED brightness updates live."
 */
import type p5 from 'p5';

export const voltageSliderSketch = (p: p5): void => {
  let voltage = 5.0;
  let sliderY = 50;
  let dragging = false;
  
  const resistorValue = 220; // 220Ω
  const ledForwardVoltage = 2.0; // ~2V for red LED
  
  p.setup = () => {
    p.createCanvas(400, 280);
    p.textAlign(p.CENTER, p.CENTER);
  };
  
  p.draw = () => {
    p.background(30, 30, 40);
    
    // Calculate current: I = (V - Vf) / R
    const current = Math.max(0, (voltage - ledForwardVoltage) / resistorValue) * 1000; // mA
    const brightness = p.map(current, 0, 15, 0, 255);
    
    // Draw voltage slider
    const sliderX = 50;
    const sliderHeight = 150;
    const sliderTop = 60;
    
    // Slider track
    p.fill(60);
    p.noStroke();
    p.rect(sliderX - 5, sliderTop, 30, sliderHeight, 5);
    
    // Voltage gradient on track
    for (let y = 0; y < sliderHeight; y++) {
      const v = p.map(y, 0, sliderHeight, 5.0, 3.3);
      const hue = p.map(v, 3.3, 5.0, 0.3, 0.1);
      p.stroke(p.color(`hsl(${hue * 360}, 80%, 50%)`));
      p.line(sliderX - 3, sliderTop + y, sliderX + 23, sliderTop + y);
    }
    
    // Slider handle
    sliderY = p.map(voltage, 5.0, 3.3, sliderTop, sliderTop + sliderHeight);
    p.fill(dragging ? 255 : 200);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(sliderX - 8, sliderY - 10, 36, 20, 5);
    
    // Voltage label on handle
    p.fill(0);
    p.noStroke();
    p.textSize(10);
    p.text(voltage.toFixed(1) + 'V', sliderX + 10, sliderY);
    
    // Voltage labels
    p.fill(150);
    p.textSize(11);
    p.text('5.0V', sliderX + 10, sliderTop - 15);
    p.text('3.3V', sliderX + 10, sliderTop + sliderHeight + 15);
    
    // Draw circuit schematic
    const circuitX = 150;
    const circuitY = 100;
    
    // Battery
    p.stroke(150);
    p.strokeWeight(2);
    p.line(circuitX, circuitY, circuitX, circuitY + 60);
    p.line(circuitX - 15, circuitY, circuitX + 15, circuitY);
    p.line(circuitX - 8, circuitY + 10, circuitX + 8, circuitY + 10);
    
    // Wire to resistor
    p.line(circuitX, circuitY, circuitX + 50, circuitY);
    
    // Resistor symbol
    p.noFill();
    p.beginShape();
    for (let i = 0; i < 6; i++) {
      const x = circuitX + 50 + i * 10;
      const y = circuitY + (i % 2 === 0 ? -8 : 8);
      p.vertex(x, y);
    }
    p.endShape();
    
    // Wire to LED
    p.line(circuitX + 110, circuitY, circuitX + 150, circuitY);
    
    // LED (triangle + line)
    p.fill(brightness > 50 ? p.color(255, brightness, 0) : 80);
    p.stroke(150);
    p.triangle(circuitX + 150, circuitY - 15, circuitX + 150, circuitY + 15, circuitX + 175, circuitY);
    p.line(circuitX + 175, circuitY - 15, circuitX + 175, circuitY + 15);
    
    // LED glow
    if (brightness > 50) {
      p.noStroke();
      p.fill(255, brightness, 0, brightness * 0.3);
      p.ellipse(circuitX + 165, circuitY, 40 + brightness/10, 40 + brightness/10);
    }
    
    // Complete circuit
    p.stroke(150);
    p.strokeWeight(2);
    p.line(circuitX + 175, circuitY, circuitX + 200, circuitY);
    p.line(circuitX + 200, circuitY, circuitX + 200, circuitY + 60);
    p.line(circuitX + 200, circuitY + 60, circuitX, circuitY + 60);
    
    // Current bar graph
    const barX = 280;
    const barY = 60;
    const barHeight = 150;
    const barWidth = 40;
    
    // Bar background
    p.fill(50);
    p.noStroke();
    p.rect(barX, barY, barWidth, barHeight);
    
    // Bar fill
    const fillHeight = p.map(current, 0, 15, 0, barHeight);
    const barColor = p.lerpColor(p.color(0, 100, 255), p.color(255, 100, 0), current / 15);
    p.fill(barColor);
    p.rect(barX, barY + barHeight - fillHeight, barWidth, fillHeight);
    
    // Bar outline
    p.stroke(100);
    p.strokeWeight(2);
    p.noFill();
    p.rect(barX, barY, barWidth, barHeight);
    
    // Scale markings
    p.fill(150);
    p.textSize(9);
    p.textAlign(p.LEFT, p.CENTER);
    for (let i = 0; i <= 15; i += 5) {
      const y = p.map(i, 0, 15, barY + barHeight, barY);
      p.line(barX + barWidth, y, barX + barWidth + 5, y);
      p.text(i + 'mA', barX + barWidth + 8, y);
    }
    
    // Current value display
    p.textAlign(p.CENTER, p.CENTER);
    p.fill(255);
    p.textSize(16);
    p.text(current.toFixed(1) + ' mA', barX + barWidth/2, barY + barHeight + 25);
    
    // Labels
    p.fill(200);
    p.textSize(12);
    p.text('VOLTAGE', sliderX + 10, 40);
    p.text('CURRENT', barX + barWidth/2, 45);
    
    // Formula
    p.fill(100);
    p.textSize(10);
    p.text(`I = (${voltage.toFixed(1)}V - 2.0V) / 220Ω`, p.width/2, p.height - 15);
    
    // Drag slider
    if (dragging) {
      voltage = p.constrain(p.map(p.mouseY, sliderTop, sliderTop + sliderHeight, 5.0, 3.3), 3.3, 5.0);
    }
  };
  
  p.mousePressed = () => {
    const sliderX = 50;
    const sliderTop = 60;
    const sliderHeight = 150;
    
    if (p.mouseX > sliderX - 15 && p.mouseX < sliderX + 35 &&
        p.mouseY > sliderTop - 10 && p.mouseY < sliderTop + sliderHeight + 10) {
      dragging = true;
    }
  };
  
  p.mouseReleased = () => {
    dragging = false;
  };
};
