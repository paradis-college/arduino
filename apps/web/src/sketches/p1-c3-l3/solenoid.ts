/**
 * P1-C3-L3 Solenoids Sketch 1
 * Coil magnetic field pulling plunger inside and pushing mechanical lever.
 */
import type p5 from 'p5';

export const solenoidSketch = (p: p5) => {
  let activated = false;
  let plungerPosition = 0; // 0 = extended, 1 = retracted
  let leverAngle = 0;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);
    
    // Animate plunger
    const targetPos = activated ? 1 : 0;
    plungerPosition = p.lerp(plungerPosition, targetPos, 0.1);
    leverAngle = plungerPosition * 30;
    
    drawSolenoid();
    drawMagneticField();
    drawLever();
    drawButton();
    drawLabels();
  };

  p.mousePressed = () => {
    // Toggle button
    if (p.mouseX > 50 && p.mouseX < 150 && p.mouseY > 320 && p.mouseY < 370) {
      activated = !activated;
    }
  };

  const drawSolenoid = () => {
    const cx = 300;
    const cy = 180;
    const coilLength = 150;
    const coilHeight = 60;
    
    // Solenoid housing
    p.fill(50, 50, 60);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(cx - coilLength / 2, cy - coilHeight / 2 - 10, coilLength, coilHeight + 20, 4);
    
    // Coil windings
    p.stroke(180, 120, 60);
    p.strokeWeight(3);
    for (let i = 0; i < 12; i++) {
      const x = cx - coilLength / 2 + 15 + i * 10;
      p.line(x, cy - coilHeight / 2, x, cy + coilHeight / 2);
    }
    
    // Plunger
    const plungerX = cx + coilLength / 2 - plungerPosition * 40;
    p.fill(100, 100, 120);
    p.stroke(150);
    p.strokeWeight(2);
    p.rect(plungerX - 10, cy - 15, 60, 30, 2);
    
    // Plunger tip (iron core)
    p.fill(80, 80, 100);
    p.rect(plungerX - 30, cy - 12, 25, 24, 2);
    
    // Current flow indicators when activated
    if (activated) {
      p.fill(100, 200, 255);
      p.noStroke();
      for (let i = 0; i < 12; i++) {
        const x = cx - coilLength / 2 + 15 + i * 10;
        const yOffset = p.sin(p.frameCount * 0.2 + i) * 5;
        p.ellipse(x, cy + yOffset, 5, 5);
      }
    }
    
    // Terminals
    p.fill(180, 50, 50);
    p.stroke(100);
    p.strokeWeight(1);
    p.rect(cx - coilLength / 2 - 20, cy - 20, 15, 10, 2);
    p.fill(50, 50, 180);
    p.rect(cx - coilLength / 2 - 20, cy + 10, 15, 10, 2);
  };

  const drawMagneticField = () => {
    if (!activated) return;
    
    const cx = 300;
    const cy = 180;
    
    // Field lines inside coil
    p.stroke(100, 150, 255, 150);
    p.strokeWeight(1);
    p.noFill();
    
    for (let i = 0; i < 5; i++) {
      const yOffset = (i - 2) * 10;
      const startX = cx - 60;
      const endX = cx + 50;
      
      // Animated dashes
      const dashOffset = (p.frameCount * 2 + i * 20) % 20;
      for (let x = startX + dashOffset; x < endX; x += 20) {
        p.line(x, cy + yOffset, p.min(x + 10, endX), cy + yOffset);
      }
    }
    
    // Force arrow on plunger
    p.fill(255, 200, 100);
    p.noStroke();
    const arrowX = cx + 30;
    p.triangle(arrowX - 20, cy - 8, arrowX - 20, cy + 8, arrowX - 35, cy);
    
    p.fill(255, 200, 100);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('PULL', arrowX - 50, cy);
  };

  const drawLever = () => {
    const pivotX = 450;
    const pivotY = 200;
    const leverLength = 80;
    
    // Pivot point
    p.fill(80);
    p.stroke(100);
    p.strokeWeight(2);
    p.ellipse(pivotX, pivotY, 20, 20);
    
    // Lever arm
    p.push();
    p.translate(pivotX, pivotY);
    p.rotate(p.radians(-leverAngle));
    
    p.fill(100, 100, 120);
    p.stroke(150);
    p.strokeWeight(2);
    p.rect(-leverLength, -8, leverLength * 2, 16, 4);
    
    // Connection point to plunger
    p.fill(150);
    p.ellipse(-leverLength + 10, 0, 12, 12);
    
    // Action end (pushes something)
    p.fill(180, 100, 50);
    p.rect(leverLength - 15, -10, 20, 20, 4);
    
    p.pop();
    
    // Labels
    p.fill(200);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Lever', pivotX, pivotY + 50);
    
    // Show mechanical action
    if (activated && leverAngle > 20) {
      p.fill(100, 255, 100);
      p.text('PUSHING!', pivotX + 60, pivotY - 40);
    }
  };

  const drawButton = () => {
    const x = 100;
    const y = 345;
    const w = 100;
    const h = 50;
    
    // Button
    p.fill(activated ? p.color(60, 120, 60) : p.color(80, 80, 90));
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x - w / 2, y - h / 2, w, h, 8);
    
    p.fill(255);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(activated ? 'ENERGIZED' : 'OFF', x, y);
    
    p.fill(150);
    p.textSize(10);
    p.text('Click to toggle', x, y + 40);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Solenoid: Electromagnetic actuator', 50, 50);
    p.text('→ Current through coil creates magnetic field', 60, 70);
    p.text('→ Field pulls iron plunger into coil', 60, 90);
    
    p.fill(150);
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Used in door locks, valves, and mechanical switches', 300, 385);
  };
};

export default solenoidSketch;
