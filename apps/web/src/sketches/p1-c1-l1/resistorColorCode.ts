/**
 * P1-C1-L1 GIF3: Resistor Color Code
 * "220Ω color-code bands appearing on resistor with numerical decode overlay."
 */
import type p5 from 'p5';

export const resistorColorCodeSketch = (p: p5): void => {
  const colorNames = ['Black', 'Brown', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Violet', 'Gray', 'White'];
  const colorValues: [number, number, number][] = [
    [0, 0, 0], [139, 69, 19], [255, 0, 0], [255, 165, 0], [255, 255, 0],
    [0, 128, 0], [0, 0, 255], [148, 0, 211], [128, 128, 128], [255, 255, 255]
  ];
  const multipliers = ['×1Ω', '×10Ω', '×100Ω', '×1kΩ', '×10kΩ', '×100kΩ', '×1MΩ', '×10MΩ', '×100MΩ', '×1GΩ'];
  
  // 220Ω = Red Red Brown (2 2 × 10)
  let band1 = 2; // Red = 2
  let band2 = 2; // Red = 2
  let band3 = 1; // Brown = ×10
  let animPhase = 0;
  
  p.setup = () => {
    p.createCanvas(400, 280);
    p.textAlign(p.CENTER, p.CENTER);
  };
  
  p.draw = () => {
    p.background(30, 30, 40);
    
    // Animation phase
    animPhase = (animPhase + 0.02) % (2 * p.PI);
    
    // Draw resistor body
    const rx = 100;
    const ry = 100;
    const rw = 200;
    const rh = 60;
    
    // Leads
    p.stroke(180);
    p.strokeWeight(4);
    p.line(50, ry + rh/2, rx, ry + rh/2);
    p.line(rx + rw, ry + rh/2, 350, ry + rh/2);
    
    // Body
    p.fill(210, 180, 140);
    p.stroke(150, 120, 90);
    p.strokeWeight(2);
    p.rect(rx, ry, rw, rh, 10);
    
    // Band positions
    const bandWidth = 20;
    const bandPositions = [rx + 30, rx + 70, rx + 110, rx + 160];
    
    // Draw bands with animation
    const bands = [band1, band2, band3, 5]; // Gold tolerance band (5 = green placeholder for gold)
    
    for (let i = 0; i < 4; i++) {
      const bandX = bandPositions[i];
      const delay = i * 0.5;
      const alpha = p.constrain(p.map(p.sin(animPhase - delay), -1, 1, 100, 255), 100, 255);
      
      if (i === 3) {
        // Gold tolerance band
        p.fill(218, 165, 32, alpha);
      } else {
        const c = colorValues[bands[i]];
        p.fill(c[0], c[1], c[2], alpha);
      }
      p.noStroke();
      p.rect(bandX, ry + 5, bandWidth, rh - 10);
    }
    
    // Draw decode overlay
    p.fill(255);
    p.textSize(12);
    
    // Band value labels
    for (let i = 0; i < 4; i++) {
      const bandX = bandPositions[i] + bandWidth/2;
      p.fill(200);
      
      if (i === 0) {
        p.text(band1.toString(), bandX, ry - 20);
        p.fill(100);
        p.textSize(9);
        p.text(colorNames[band1], bandX, ry - 35);
      } else if (i === 1) {
        p.textSize(12);
        p.fill(200);
        p.text(band2.toString(), bandX, ry - 20);
        p.fill(100);
        p.textSize(9);
        p.text(colorNames[band2], bandX, ry - 35);
      } else if (i === 2) {
        p.textSize(12);
        p.fill(200);
        p.text(multipliers[band3], bandX, ry - 20);
        p.fill(100);
        p.textSize(9);
        p.text(colorNames[band3], bandX, ry - 35);
      } else {
        p.textSize(12);
        p.fill(200);
        p.text('±5%', bandX, ry - 20);
        p.fill(100);
        p.textSize(9);
        p.text('Gold', bandX, ry - 35);
      }
    }
    
    // Calculate and display value
    const value = (band1 * 10 + band2) * Math.pow(10, band3);
    let valueStr: string;
    if (value >= 1000000) {
      valueStr = (value / 1000000).toFixed(1) + 'MΩ';
    } else if (value >= 1000) {
      valueStr = (value / 1000).toFixed(1) + 'kΩ';
    } else {
      valueStr = value.toString() + 'Ω';
    }
    
    // Value display box
    p.fill(50, 50, 70);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(100, 180, 200, 50, 8);
    
    p.fill(0, 255, 150);
    p.noStroke();
    p.textSize(24);
    p.text(valueStr, 200, 205);
    
    // Formula
    p.fill(150);
    p.textSize(11);
    p.text(`${band1}${band2} × ${Math.pow(10, band3)} = ${value}Ω`, 200, 250);
    
    // Instructions
    p.fill(100);
    p.textSize(10);
    p.text('Click bands to change values', 200, p.height - 10);
  };
  
  p.mousePressed = () => {
    const rx = 100;
    const ry = 100;
    const rh = 60;
    const bandWidth = 20;
    const bandPositions = [rx + 30, rx + 70, rx + 110];
    
    // Check which band was clicked
    for (let i = 0; i < 3; i++) {
      if (p.mouseX > bandPositions[i] && p.mouseX < bandPositions[i] + bandWidth &&
          p.mouseY > ry && p.mouseY < ry + rh) {
        if (i === 0) {
          band1 = (band1 + 1) % 10;
        } else if (i === 1) {
          band2 = (band2 + 1) % 10;
        } else {
          band3 = (band3 + 1) % 7; // Up to 1MΩ multiplier
        }
      }
    }
  };
};
