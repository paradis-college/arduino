/**
 * P1-C3-L3 GIF2: Flyback Diode
 * "Flyback diode absorbing voltage spike when coil de-energizes."
 */
import type p5 from 'p5';

export const flybackDiodeSketch = (p: p5): void => {
  let coilEnergized = false;
  let current = 0;
  let flybackCurrent = 0;
  let spikeVoltage = 0;
  let withDiode = true;
  
  p.setup = () => {
    p.createCanvas(400, 300);
    p.textAlign(p.CENTER, p.CENTER);
  };
  
  p.draw = () => {
    p.background(30, 30, 40);
    
    // Update currents
    if (coilEnergized) {
      current = p.min(current + 0.03, 1);
      flybackCurrent = 0;
      spikeVoltage = 0;
    } else {
      if (current > 0.1) {
        if (withDiode) {
          // Diode conducts flyback current
          flybackCurrent = current;
          current *= 0.97; // Slow decay through diode
          spikeVoltage = 0.7; // Just diode forward voltage
        } else {
          // No diode - voltage spike!
          spikeVoltage = current * 100; // Huge spike
          current *= 0.8; // Fast decay
        }
      } else {
        current = 0;
        flybackCurrent = 0;
        spikeVoltage = p.max(spikeVoltage - 5, 0);
      }
    }
    
    // Title
    p.fill(200);
    p.textSize(14);
    p.text('Flyback Diode Protection', p.width/2, 20);
    
    // Mode toggle
    p.fill(withDiode ? p.color(100, 255, 100) : p.color(255, 100, 100));
    p.stroke(150);
    p.strokeWeight(2);
    p.rect(280, 40, 100, 30, 8);
    
    p.fill(0);
    p.noStroke();
    p.textSize(10);
    p.text(withDiode ? 'WITH DIODE' : 'NO DIODE', 330, 55);
    
    // Draw circuit
    const cx = 150;
    const cy = 150;
    
    // Power supply
    p.stroke(150);
    p.strokeWeight(2);
    p.line(50, cy - 70, 50, cy + 70);
    p.line(40, cy - 70, 60, cy - 70);
    p.line(45, cy - 60, 55, cy - 60);
    
    p.fill(150);
    p.noStroke();
    p.textSize(9);
    p.text('+V', 50, cy - 85);
    
    // Top wire
    p.stroke(150);
    p.strokeWeight(2);
    p.line(50, cy - 70, 100, cy - 70);
    
    // Switch (transistor simplified as switch)
    p.strokeWeight(3);
    p.point(100, cy - 70);
    p.point(140, cy - 70);
    
    if (coilEnergized) {
      p.stroke(100, 255, 100);
      p.strokeWeight(2);
      p.line(100, cy - 70, 140, cy - 70);
    } else {
      p.stroke(255, 100, 100);
      p.strokeWeight(2);
      p.line(100, cy - 70, 130, cy - 90);
    }
    
    // Wire to coil
    p.stroke(150);
    p.strokeWeight(2);
    p.line(140, cy - 70, 180, cy - 70);
    p.line(180, cy - 70, 180, cy - 40);
    
    // Solenoid/relay coil
    p.noFill();
    p.stroke(current > 0.3 ? p.color(100, 200, 255) : 150);
    p.strokeWeight(2);
    
    // Coil windings
    for (let i = 0; i < 4; i++) {
      p.arc(180, cy - 40 + i * 15, 25, 15, -p.HALF_PI, p.HALF_PI);
    }
    
    // Magnetic field when energized
    if (current > 0.3) {
      p.stroke(100, 150, 255, current * 100);
      p.strokeWeight(1);
      p.noFill();
      for (let i = 0; i < 3; i++) {
        p.ellipse(180, cy, 35 + i * 8, 80 + i * 10);
      }
    }
    
    // Wire from coil bottom
    p.stroke(150);
    p.strokeWeight(2);
    p.line(180, cy + 20, 180, cy + 70);
    p.line(180, cy + 70, 50, cy + 70);
    
    // Flyback diode (if enabled)
    if (withDiode) {
      // Diode symbol parallel to coil
      p.stroke(flybackCurrent > 0.1 ? p.color(0, 255, 100) : 150);
      p.strokeWeight(2);
      
      // Connection wires
      p.line(180, cy - 40, 220, cy - 40);
      p.line(180, cy + 20, 220, cy + 20);
      p.line(220, cy - 40, 220, cy - 20);
      p.line(220, cy + 20, 220, cy);
      
      // Diode triangle (pointing up for flyback direction)
      p.fill(flybackCurrent > 0.1 ? p.color(0, 255, 100) : 80);
      p.triangle(210, cy, 230, cy, 220, cy - 20);
      p.line(210, cy - 20, 230, cy - 20);
      
      // Flyback current flow indicator
      if (flybackCurrent > 0.1) {
        p.fill(0, 255, 100);
        p.noStroke();
        const arrowY = cy - 40 + (p.frameCount * 3) % 60;
        p.triangle(222, arrowY, 218, arrowY, 220, arrowY + 8);
        
        p.textSize(8);
        p.text('Flyback', 250, cy);
        p.text('current', 250, cy + 12);
      }
    }
    
    // Voltage spike visualization (without diode)
    if (spikeVoltage > 5 && !withDiode) {
      // Dangerous spark at switch
      p.stroke(255, 255, 0, spikeVoltage);
      p.strokeWeight(3);
      
      p.noFill();
      p.beginShape();
      for (let i = 0; i <= 8; i++) {
        const t = i / 8;
        const x = p.lerp(100, 130, t);
        const y = cy - 70 + p.sin(t * p.PI * 4) * 20 * p.random(0.5, 1.5);
        p.vertex(x, y - 10);
      }
      p.endShape();
      
      p.noStroke();
      p.fill(255, 255, 0, spikeVoltage * 0.5);
      p.ellipse(115, cy - 80, 50, 30);
      
      // Warning
      p.fill(255, 50, 50);
      p.textSize(10);
      p.text('⚠ DANGER!', 115, cy - 110);
    }
    
    // Voltage graph
    const graphX = 260;
    const graphY = 100;
    const graphW = 120;
    const graphH = 80;
    
    p.fill(40);
    p.noStroke();
    p.rect(graphX, graphY, graphW, graphH);
    
    // Grid
    p.stroke(60);
    p.strokeWeight(1);
    p.line(graphX, graphY + graphH/2, graphX + graphW, graphY + graphH/2);
    
    // Labels
    p.fill(150);
    p.noStroke();
    p.textSize(8);
    p.text('Coil', graphX - 15, graphY + 10);
    p.text('Voltage', graphX - 15, graphY + 22);
    
    // Voltage line
    const vDisplay = withDiode ? (current * 12 + spikeVoltage) : (current * 12 + spikeVoltage);
    const vClamped = p.min(vDisplay, 50);
    const vY = p.map(vClamped, 0, 50, graphY + graphH, graphY);
    
    p.stroke(withDiode ? p.color(0, 255, 100) : (spikeVoltage > 5 ? p.color(255, 50, 50) : p.color(0, 255, 100)));
    p.strokeWeight(2);
    p.line(graphX, vY, graphX + graphW, vY);
    
    // Spike indicator
    if (!withDiode && spikeVoltage > 5) {
      p.fill(255, 50, 50);
      p.noStroke();
      p.textSize(9);
      p.text(`${Math.round(spikeVoltage)}V SPIKE!`, graphX + graphW/2, graphY - 10);
    }
    
    // Info panel
    p.fill(50);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(260, 195, 120, 60, 5);
    
    p.fill(200);
    p.noStroke();
    p.textSize(9);
    p.textAlign(p.LEFT, p.CENTER);
    p.text(`Coil: ${coilEnergized ? 'ON' : 'OFF'}`, 270, 210);
    p.text(`Current: ${(current * 100).toFixed(0)}%`, 270, 225);
    p.text(`Spike: ${spikeVoltage.toFixed(1)}V`, 270, 240);
    
    p.textAlign(p.CENTER, p.CENTER);
    
    // Control button
    p.fill(coilEnergized ? p.color(100, 200, 100) : p.color(80));
    p.stroke(150);
    p.strokeWeight(2);
    p.rect(50, 240, 100, 40, 8);
    
    p.fill(255);
    p.noStroke();
    p.textSize(11);
    p.text(coilEnergized ? 'RELEASE' : 'ENERGIZE', 100, 260);
    
    // Explanation
    p.fill(100);
    p.textSize(9);
    p.text('Flyback diode provides path for collapsing', p.width/2, p.height - 20);
    p.text('magnetic field current, preventing voltage spikes', p.width/2, p.height - 8);
  };
  
  p.mousePressed = () => {
    // Toggle coil
    if (p.mouseX > 50 && p.mouseX < 150 && p.mouseY > 240 && p.mouseY < 280) {
      coilEnergized = !coilEnergized;
    }
    
    // Toggle diode mode
    if (p.mouseX > 280 && p.mouseX < 380 && p.mouseY > 40 && p.mouseY < 70) {
      withDiode = !withDiode;
    }
  };
};
