/**
 * P1-C3-L4 GIF2: Relay Electrical Isolation
 * "Electrical isolation showing low-voltage coil controlling separate high-voltage lamp."
 */
import type p5 from 'p5';

export const relayIsolationSketch = (p: p5): void => {
  let coilEnergized = false;
  let armaturePos = 0;
  
  p.setup = () => {
    p.createCanvas(400, 300);
    p.textAlign(p.CENTER, p.CENTER);
  };
  
  p.draw = () => {
    p.background(30, 30, 40);
    
    // Animate armature
    if (coilEnergized) {
      armaturePos = p.min(armaturePos + 0.15, 1);
    } else {
      armaturePos = p.max(armaturePos - 0.1, 0);
    }
    
    const contactClosed = armaturePos > 0.8;
    
    // Title
    p.fill(200);
    p.textSize(14);
    p.text('Relay Electrical Isolation', p.width/2, 20);
    
    // Isolation line (visual separator)
    p.stroke(100, 100, 255);
    p.strokeWeight(2);
    (p.drawingContext as CanvasRenderingContext2D).setLineDash([5, 5]);
    p.line(200, 50, 200, 250);
    (p.drawingContext as CanvasRenderingContext2D).setLineDash([]);
    
    p.fill(100, 100, 255);
    p.noStroke();
    p.textSize(10);
    p.text('ISOLATION', 200, 265);
    p.text('BARRIER', 200, 278);
    
    // === LEFT SIDE: Low Voltage Control Circuit ===
    p.fill(150);
    p.textSize(11);
    p.text('LOW VOLTAGE', 80, 45);
    p.text('Control Circuit', 80, 58);
    p.textSize(9);
    p.text('(5V Arduino)', 80, 72);
    
    // Arduino representation
    p.fill(0, 100, 150);
    p.stroke(0, 150, 200);
    p.strokeWeight(2);
    p.rect(30, 100, 60, 80, 5);
    
    p.fill(200);
    p.noStroke();
    p.textSize(8);
    p.text('Arduino', 60, 115);
    p.text('UNO', 60, 127);
    
    // Digital pin indicator
    p.fill(coilEnergized ? p.color(0, 255, 0) : p.color(100));
    p.ellipse(80, 145, 10, 10);
    p.fill(150);
    p.textSize(7);
    p.text('D7', 80, 160);
    
    // Wire to transistor/relay coil
    p.stroke(150);
    p.strokeWeight(2);
    p.line(90, 145, 110, 145);
    
    // Transistor (simplified)
    p.fill(60);
    p.stroke(100);
    p.rect(110, 130, 25, 30, 3);
    p.fill(150);
    p.noStroke();
    p.textSize(7);
    p.text('NPN', 122, 145);
    
    // Wire to relay coil
    p.stroke(150);
    p.strokeWeight(2);
    p.line(135, 145, 155, 145);
    p.line(155, 145, 155, 130);
    
    // Relay coil
    p.noFill();
    p.stroke(coilEnergized ? p.color(100, 200, 255) : p.color(150));
    p.strokeWeight(2);
    for (let i = 0; i < 3; i++) {
      p.arc(155, 110 - i * 12, 20, 12, p.PI, 0);
    }
    
    // Magnetic field
    if (coilEnergized) {
      p.stroke(100, 150, 255, 100);
      p.noFill();
      for (let i = 0; i < 2; i++) {
        p.ellipse(155, 95, 30 + i * 10, 50 + i * 10);
      }
    }
    
    // Coil return to ground
    p.stroke(150);
    p.strokeWeight(2);
    p.line(155, 75, 155, 65);
    p.line(155, 65, 60, 65);
    p.line(60, 65, 60, 100);
    
    // 5V supply indicator
    p.fill(100, 255, 100);
    p.noStroke();
    p.textSize(8);
    p.text('5V', 60, 55);
    
    // === RIGHT SIDE: High Voltage Load Circuit ===
    p.fill(150);
    p.textSize(11);
    p.text('HIGH VOLTAGE', 310, 45);
    p.text('Load Circuit', 310, 58);
    p.textSize(9);
    p.text('(120V AC)', 310, 72);
    
    // AC source
    p.fill(255, 150, 50);
    p.stroke(255, 200, 100);
    p.strokeWeight(2);
    p.ellipse(360, 140, 30, 30);
    
    p.fill(0);
    p.noStroke();
    p.textSize(10);
    p.text('AC', 360, 140);
    
    p.fill(255, 150, 50);
    p.textSize(8);
    p.text('120V', 360, 165);
    
    // Wire from AC to relay contact
    p.stroke(contactClosed ? p.color(255, 200, 50) : p.color(150));
    p.strokeWeight(2);
    p.line(345, 140, 280, 140);
    p.line(280, 140, 280, 110);
    
    // Relay contact (NO contact)
    p.stroke(150);
    p.strokeWeight(3);
    p.point(280, 110);
    p.point(240, 90);
    
    // Armature
    p.stroke(contactClosed ? p.color(100, 255, 100) : p.color(150));
    p.strokeWeight(2);
    const armAngle = p.lerp(-0.3, 0, armaturePos);
    p.push();
    p.translate(280, 110);
    p.rotate(armAngle);
    p.line(0, 0, -40, -15);
    p.pop();
    
    // Wire from contact to lamp
    p.stroke(contactClosed ? p.color(255, 200, 50) : p.color(150));
    p.strokeWeight(2);
    p.line(240, 90, 240, 100);
    p.line(240, 100, 260, 100);
    p.line(260, 100, 260, 130);
    
    // High power lamp
    const lampBrightness = contactClosed ? 255 : 50;
    
    // Lamp bulb
    p.fill(lampBrightness, lampBrightness * 0.9, lampBrightness * 0.5);
    p.stroke(150);
    p.strokeWeight(2);
    p.ellipse(260, 165, 35, 45);
    
    // Lamp base
    p.fill(100);
    p.rect(250, 187, 20, 15, 3);
    
    // Lamp glow
    if (contactClosed) {
      p.noStroke();
      p.fill(255, 255, 150, 100);
      p.ellipse(260, 165, 60, 70);
      p.fill(255, 255, 200, 50);
      p.ellipse(260, 165, 80, 90);
    }
    
    // Wire from lamp to AC return
    p.stroke(contactClosed ? p.color(255, 200, 50) : p.color(150));
    p.strokeWeight(2);
    p.line(260, 202, 260, 220);
    p.line(260, 220, 360, 220);
    p.line(360, 220, 360, 155);
    
    // Info boxes
    // Control side power
    p.fill(50, 80, 50);
    p.stroke(100, 200, 100);
    p.strokeWeight(1);
    p.rect(20, 200, 90, 35, 5);
    p.fill(100, 255, 100);
    p.noStroke();
    p.textSize(9);
    p.text('Control Power:', 65, 212);
    p.text('~20mA @ 5V', 65, 225);
    
    // Load side power
    p.fill(80, 50, 50);
    p.stroke(200, 100, 100);
    p.strokeWeight(1);
    p.rect(290, 200, 90, 35, 5);
    p.fill(255, 150, 150);
    p.noStroke();
    p.textSize(9);
    p.text('Load Power:', 335, 212);
    p.text('10A @ 120V', 335, 225);
    
    // Control button
    p.fill(coilEnergized ? p.color(100, 200, 100) : p.color(80));
    p.stroke(150);
    p.strokeWeight(2);
    p.rect(145, 240, 110, 40, 8);
    
    p.fill(255);
    p.noStroke();
    p.textSize(11);
    p.text(coilEnergized ? 'RELEASE' : 'ACTIVATE', 200, 260);
    
    // Status text
    p.fill(contactClosed ? p.color(100, 255, 100) : p.color(255, 100, 100));
    p.textSize(10);
    p.text(contactClosed ? '● Lamp ON' : '○ Lamp OFF', 260, 250);
  };
  
  p.mousePressed = () => {
    if (p.mouseX > 145 && p.mouseX < 255 && p.mouseY > 240 && p.mouseY < 280) {
      coilEnergized = !coilEnergized;
    }
  };
};
