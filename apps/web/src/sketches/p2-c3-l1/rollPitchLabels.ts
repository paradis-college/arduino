/**
 * P2-C3-L1 Accel/Gyro - GIF 2
 * Axes arrows updating roll/pitch labels
 */
import type p5 from 'p5';

export const rollPitchLabelsSketch = (p: p5) => {
  let roll = 0;
  let pitch = 0;
  let dragging = false;
  let dragStart = { x: 0, y: 0 };
  
  p.setup = () => {
    p.createCanvas(400, 220);
    p.textFont('monospace');
  };
  
  p.draw = () => {
    p.background(30, 35, 45);
    
    // Draw 3D-ish board representation
    p.push();
    p.translate(200, 100);
    
    // Apply rotations visually
    const rollRad = roll * p.PI / 180;
    const pitchRad = pitch * p.PI / 180;
    
    // Board shadow
    p.fill(20, 25, 35);
    p.noStroke();
    p.quad(
      -60 + pitch * 0.3, 30 + roll * 0.3,
      60 + pitch * 0.3, 30 + roll * 0.3,
      70 + pitch * 0.3, 50 - roll * 0.3,
      -70 + pitch * 0.3, 50 - roll * 0.3
    );
    
    // Board top surface
    const boardColor = p.color(50, 120, 80);
    p.fill(boardColor);
    p.stroke(80, 150, 100);
    p.strokeWeight(2);
    
    // Perspective transformation based on roll/pitch
    const tl = { x: -60 - roll * 0.5, y: -30 - pitch * 0.5 };
    const tr = { x: 60 + roll * 0.5, y: -30 + pitch * 0.5 };
    const br = { x: 70 + roll * 0.5, y: 30 + pitch * 0.5 };
    const bl = { x: -70 - roll * 0.5, y: 30 - pitch * 0.5 };
    
    p.quad(tl.x, tl.y, tr.x, tr.y, br.x, br.y, bl.x, bl.y);
    
    // Chip on board
    p.fill(30, 30, 40);
    p.stroke(50);
    p.strokeWeight(1);
    const chipOffset = { x: pitch * 0.1, y: roll * 0.1 };
    p.rect(-15 + chipOffset.x, -10 + chipOffset.y, 30, 20, 2);
    
    // Draw axes arrows
    const arrowLen = 40;
    
    // X axis (Roll) - Red
    p.stroke(255, 100, 100);
    p.strokeWeight(3);
    const xEndX = arrowLen * p.cos(rollRad * 0.3);
    const xEndY = arrowLen * p.sin(rollRad * 0.3) * 0.5;
    p.line(0, 0, xEndX, xEndY);
    drawArrowHead(p, xEndX, xEndY, p.atan2(xEndY, xEndX), p.color(255, 100, 100));
    
    // Y axis (Pitch) - Green
    p.stroke(100, 255, 100);
    p.strokeWeight(3);
    const yEndX = arrowLen * p.sin(pitchRad * 0.3) * 0.5;
    const yEndY = -arrowLen * p.cos(pitchRad * 0.3);
    p.line(0, 0, yEndX, yEndY);
    drawArrowHead(p, yEndX, yEndY, p.atan2(yEndY, yEndX), p.color(100, 255, 100));
    
    // Z axis - Blue (simplified)
    p.stroke(100, 100, 255);
    p.strokeWeight(3);
    p.line(0, 0, -20, -20);
    drawArrowHead(p, -20, -20, p.atan2(-20, -20), p.color(100, 100, 255));
    
    // Axis labels near arrows
    p.noStroke();
    p.textSize(12);
    p.fill(255, 100, 100);
    p.text('X', xEndX + 10, xEndY);
    p.fill(100, 255, 100);
    p.text('Y', yEndX, yEndY - 10);
    p.fill(100, 100, 255);
    p.text('Z', -30, -30);
    
    p.pop();
    
    // Roll/Pitch display panels
    // Roll panel
    p.fill(50, 55, 65);
    p.stroke(255, 100, 100);
    p.strokeWeight(2);
    p.rect(20, 160, 170, 50, 10);
    
    p.fill(255, 100, 100);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('ROLL (X)', 30, 175);
    
    p.fill(255);
    p.textSize(20);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(`${roll.toFixed(1)}°`, 105, 192);
    
    // Roll indicator bar
    p.fill(40);
    p.rect(30, 200, 150, 6, 3);
    const rollIndicator = p.map(roll, -45, 45, 30, 180);
    p.fill(255, 100, 100);
    p.ellipse(rollIndicator, 203, 10, 10);
    
    // Pitch panel
    p.fill(50, 55, 65);
    p.stroke(100, 255, 100);
    p.strokeWeight(2);
    p.rect(210, 160, 170, 50, 10);
    
    p.fill(100, 255, 100);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('PITCH (Y)', 220, 175);
    
    p.fill(255);
    p.textSize(20);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(`${pitch.toFixed(1)}°`, 295, 192);
    
    // Pitch indicator bar
    p.fill(40);
    p.rect(220, 200, 150, 6, 3);
    const pitchIndicator = p.map(pitch, -45, 45, 220, 370);
    p.fill(100, 255, 100);
    p.ellipse(pitchIndicator, 203, 10, 10);
    
    // Instructions
    p.fill(120);
    p.textSize(10);
    p.textAlign(p.CENTER, p.TOP);
    p.text('Drag on board to tilt', 200, 5);
    
    // Raw values display
    p.fill(80);
    p.textSize(9);
    p.textAlign(p.RIGHT, p.TOP);
    p.text(`Raw X: ${(roll * 182).toFixed(0)}`, 390, 20);
    p.text(`Raw Y: ${(pitch * 182).toFixed(0)}`, 390, 32);
  };
  
  const drawArrowHead = (p: p5, x: number, y: number, angle: number, color: p5.Color) => {
    p.push();
    p.translate(x, y);
    p.rotate(angle);
    p.fill(color);
    p.noStroke();
    p.triangle(0, 0, -10, -5, -10, 5);
    p.pop();
  };
  
  p.mousePressed = () => {
    if (p.mouseX > 100 && p.mouseX < 300 && p.mouseY > 50 && p.mouseY < 150) {
      dragging = true;
      dragStart = { x: p.mouseX, y: p.mouseY };
    }
  };
  
  p.mouseDragged = () => {
    if (dragging) {
      roll = p.constrain((p.mouseX - 200) * 0.5, -45, 45);
      pitch = p.constrain((p.mouseY - 100) * 0.5, -45, 45);
    }
  };
  
  p.mouseReleased = () => {
    dragging = false;
  };
};
