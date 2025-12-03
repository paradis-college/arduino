/**
 * P2-C1-L1 Ultrasonic Sensor - GIF 2
 * Distance bar and number updated continuously as object moves
 */
import type p5 from 'p5';

export const distanceBarSketch = (p: p5) => {
  let objectX = 250;
  let dragging = false;
  const sensorX = 50;
  const minDist = 60;
  const maxDist = 350;
  
  p.setup = () => {
    p.createCanvas(400, 200);
    p.textFont('monospace');
  };
  
  p.draw = () => {
    p.background(30, 35, 45);
    
    // Calculate distance
    const distance = objectX - sensorX - 20;
    const distanceCm = p.map(distance, minDist - sensorX, maxDist - sensorX, 2, 400);
    const normalizedDist = p.constrain(p.map(distance, 40, 300, 0, 1), 0, 1);
    
    // Draw sensor
    p.fill(100, 150, 200);
    p.noStroke();
    p.rect(sensorX - 15, 70, 30, 60, 5);
    
    // Sensor eyes
    p.fill(50, 50, 50);
    p.ellipse(sensorX - 5, 90, 12, 12);
    p.ellipse(sensorX + 5, 90, 12, 12);
    
    // Draw draggable object
    const objColor = dragging ? p.color(255, 200, 100) : p.color(200, 100, 100);
    p.fill(objColor);
    p.rect(objectX - 20, 60, 40, 80, 5);
    p.fill(150, 70, 70);
    p.rect(objectX - 15, 70, 30, 60, 3);
    
    // Draw distance line
    p.stroke(100, 200, 255, 150);
    p.strokeWeight(2);
    p.drawingContext.setLineDash([5, 5]);
    p.line(sensorX + 15, 100, objectX - 20, 100);
    p.drawingContext.setLineDash([]);
    
    // Distance bar background
    p.noStroke();
    p.fill(50, 55, 65);
    p.rect(50, 160, 300, 25, 5);
    
    // Distance bar fill
    const barWidth = normalizedDist * 290;
    const barColor = p.lerpColor(p.color(100, 255, 100), p.color(255, 100, 100), normalizedDist);
    p.fill(barColor);
    p.rect(55, 165, barWidth, 15, 3);
    
    // Distance text
    p.fill(255);
    p.textSize(16);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(`Distance: ${distanceCm.toFixed(1)} cm`, 200, 30);
    
    // Numeric display
    p.fill(30, 35, 45);
    p.stroke(100, 200, 255);
    p.strokeWeight(2);
    p.rect(300, 60, 80, 40, 5);
    p.noStroke();
    p.fill(100, 255, 150);
    p.textSize(18);
    p.text(`${distanceCm.toFixed(0)}`, 340, 80);
    
    // Instructions
    p.fill(150);
    p.textSize(11);
    p.text('Drag the object to see distance update', 200, 145);
  };
  
  p.mousePressed = () => {
    if (p.dist(p.mouseX, p.mouseY, objectX, 100) < 40) {
      dragging = true;
    }
  };
  
  p.mouseDragged = () => {
    if (dragging) {
      objectX = p.constrain(p.mouseX, minDist, maxDist);
    }
  };
  
  p.mouseReleased = () => {
    dragging = false;
  };
};
