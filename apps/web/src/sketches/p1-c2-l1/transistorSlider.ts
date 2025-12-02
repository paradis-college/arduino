/**
 * P1-C2-L1 Transistors Sketch 1
 * Base slider raising small base current unlocks large collector–emitter flow.
 */
import type p5 from 'p5';

export const transistorSliderSketch = (p: p5) => {
  let baseCurrent = 0;
  let collectorCurrent = 0;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);
    
    // Update base current from slider position
    const sliderX = 100;
    const sliderY = 320;
    const sliderWidth = 150;
    
    drawSlider(sliderX, sliderY, sliderWidth);
    drawTransistor();
    drawCurrentFlows();
    drawLabels();
    
    // Update collector current based on base current (gain ~100)
    const targetCollector = baseCurrent * 100;
    collectorCurrent = p.lerp(collectorCurrent, targetCollector, 0.1);
  };

  p.mouseDragged = () => {
    const sliderX = 100;
    const sliderY = 320;
    const sliderWidth = 150;
    
    if (p.mouseY > sliderY - 20 && p.mouseY < sliderY + 20) {
      const newValue = p.constrain((p.mouseX - sliderX) / sliderWidth, 0, 1);
      baseCurrent = newValue;
    }
  };

  const drawSlider = (x: number, y: number, w: number) => {
    // Slider track
    p.fill(60);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x, y - 5, w, 10, 5);
    
    // Slider fill
    p.fill(100, 150, 255);
    p.noStroke();
    p.rect(x, y - 5, w * baseCurrent, 10, 5, 0, 0, 5);
    
    // Slider handle
    const handleX = x + w * baseCurrent;
    p.fill(200);
    p.stroke(255);
    p.strokeWeight(2);
    p.ellipse(handleX, y, 20, 20);
    
    // Labels
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Base Current Control', x + w / 2, y - 30);
    p.text('0', x - 15, y);
    p.text('Max', x + w + 20, y);
    
    // Value display
    p.textSize(14);
    p.fill(100, 200, 255);
    p.text(`Ib = ${(baseCurrent * 0.1).toFixed(2)} mA`, x + w / 2, y + 30);
  };

  const drawTransistor = () => {
    const cx = 400;
    const cy = 180;
    
    // Transistor symbol background
    p.fill(50, 50, 60);
    p.stroke(100);
    p.strokeWeight(2);
    p.ellipse(cx, cy, 120, 120);
    
    // Base line
    p.stroke(200);
    p.strokeWeight(3);
    p.line(cx - 60, cy, cx - 20, cy);
    
    // Vertical bar
    p.strokeWeight(4);
    p.line(cx - 20, cy - 30, cx - 20, cy + 30);
    
    // Collector line
    p.strokeWeight(3);
    p.line(cx - 20, cy - 15, cx + 20, cy - 40);
    p.line(cx + 20, cy - 40, cx + 20, cy - 60);
    
    // Emitter line with arrow
    p.line(cx - 20, cy + 15, cx + 20, cy + 40);
    p.line(cx + 20, cy + 40, cx + 20, cy + 60);
    
    // Arrow on emitter
    p.fill(200);
    p.noStroke();
    p.triangle(cx + 5, cy + 30, cx + 15, cy + 20, cx + 20, cy + 35);
    
    // Pin labels
    p.fill(200);
    p.textSize(14);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('B', cx - 75, cy);
    p.text('C', cx + 35, cy - 60);
    p.text('E', cx + 35, cy + 60);
    
    // NPN label
    p.text('NPN', cx, cy);
    
    // Current flow visualization
    const baseColor = p.lerpColor(p.color(100, 100, 100), p.color(255, 200, 100), baseCurrent);
    const collectorColor = p.lerpColor(p.color(100, 100, 100), p.color(100, 255, 100), p.min(collectorCurrent / 100, 1));
    
    // Base current indicator
    if (baseCurrent > 0.05) {
      p.stroke(baseColor);
      p.strokeWeight(2 + baseCurrent * 3);
      p.line(cx - 100, cy, cx - 60, cy);
      
      // Arrow
      p.fill(baseColor);
      p.noStroke();
      p.triangle(cx - 65, cy - 5, cx - 65, cy + 5, cx - 55, cy);
    }
    
    // Collector current indicator
    if (collectorCurrent > 5) {
      const thickness = 2 + p.min(collectorCurrent / 30, 8);
      p.stroke(collectorColor);
      p.strokeWeight(thickness);
      p.line(cx + 20, cy - 100, cx + 20, cy - 60);
      p.line(cx + 20, cy + 60, cx + 20, cy + 100);
      
      // Arrows
      p.fill(collectorColor);
      p.noStroke();
      p.triangle(cx + 15, cy - 75, cx + 25, cy - 75, cx + 20, cy - 65);
      p.triangle(cx + 15, cy + 85, cx + 25, cy + 85, cx + 20, cy + 95);
    }
  };

  const drawCurrentFlows = () => {
    // Current meters
    const collectorY = 320;
    
    // Collector current meter
    p.fill(40, 45, 55);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(350, collectorY - 15, 180, 60, 8);
    
    // Meter value
    p.fill(100, 255, 100);
    p.noStroke();
    p.textSize(18);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(`Ic = ${collectorCurrent.toFixed(1)} mA`, 440, collectorY + 5);
    
    p.fill(150);
    p.textSize(11);
    p.text('Collector Current (to load)', 440, collectorY + 28);
    
    // Gain indicator
    if (baseCurrent > 0.05) {
      p.fill(255, 200, 100);
      p.textSize(14);
      p.text(`Gain ≈ ${Math.round(collectorCurrent / (baseCurrent * 0.1))}x`, 440, collectorY - 40);
    }
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(13);
    p.textAlign(p.LEFT, p.CENTER);
    
    p.text('Small base current (Ib)', 50, 50);
    p.text('controls large collector current (Ic)', 50, 70);
    
    p.fill(150);
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Drag the slider to adjust base current', 300, 385);
  };
};

export default transistorSliderSketch;
