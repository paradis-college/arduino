/**
 * P2-C1-L4 Proximity Sensor - GIF 2
 * Threshold line with live distance indicator
 */
import type p5 from 'p5';

export const proximityThresholdSketch = (p: p5) => {
  let objectY = 100;
  let threshold = 150;
  let draggingObject = false;
  let draggingThreshold = false;
  
  p.setup = () => {
    p.createCanvas(400, 200);
    p.textFont('monospace');
  };
  
  p.draw = () => {
    p.background(30, 35, 45);
    
    // Calculate distance (object Y position from sensor at top)
    const distance = objectY - 30;
    const isNear = objectY < threshold;
    
    // Sensor at top
    p.fill(100, 150, 200);
    p.stroke(80, 120, 170);
    p.strokeWeight(2);
    p.rect(170, 10, 60, 30, 5);
    
    // Sensor indicator
    p.fill(isNear ? p.color(255, 100, 100) : p.color(100, 100, 100));
    p.noStroke();
    p.ellipse(200, 25, 15, 15);
    
    // Threshold line (draggable)
    p.stroke(255, 200, 100);
    p.strokeWeight(2);
    (p.drawingContext as CanvasRenderingContext2D).setLineDash([10, 5]);
    p.line(50, threshold, 350, threshold);
    (p.drawingContext as CanvasRenderingContext2D).setLineDash([]);
    
    // Threshold handle
    p.fill(draggingThreshold ? p.color(255, 255, 150) : p.color(255, 200, 100));
    p.noStroke();
    p.triangle(45, threshold - 8, 45, threshold + 8, 55, threshold);
    p.triangle(355, threshold - 8, 355, threshold + 8, 345, threshold);
    
    // Distance measurement line
    p.stroke(100, 200, 255, 150);
    p.strokeWeight(1);
    (p.drawingContext as CanvasRenderingContext2D).setLineDash([3, 3]);
    p.line(200, 40, 200, objectY - 15);
    (p.drawingContext as CanvasRenderingContext2D).setLineDash([]);
    
    // Object (draggable)
    const objColor = draggingObject ? p.color(150, 200, 255) : (isNear ? p.color(255, 100, 100) : p.color(100, 255, 100));
    p.fill(objColor);
    p.stroke(p.red(objColor) * 0.7, p.green(objColor) * 0.7, p.blue(objColor) * 0.7);
    p.strokeWeight(2);
    p.ellipse(200, objectY, 30, 30);
    
    // Distance bar on right
    p.fill(50, 55, 65);
    p.noStroke();
    p.rect(370, 50, 20, 130, 3);
    
    // Distance fill
    const fillHeight = p.map(objectY, 50, 180, 0, 120);
    const barColor = isNear ? p.color(255, 100, 100) : p.color(100, 255, 100);
    p.fill(barColor);
    p.rect(373, 53, 14, fillHeight, 2);
    
    // Threshold marker on bar
    const thresholdBarY = p.map(threshold, 50, 180, 53, 173);
    p.stroke(255, 200, 100);
    p.strokeWeight(2);
    p.line(368, thresholdBarY, 392, thresholdBarY);
    
    // Status display
    p.fill(50, 55, 65);
    p.noStroke();
    p.rect(10, 50, 100, 70, 5);
    
    p.fill(isNear ? p.color(255, 100, 100) : p.color(100, 255, 100));
    p.textSize(14);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(isNear ? 'NEAR' : 'FAR', 60, 70);
    
    p.fill(255);
    p.textSize(11);
    p.text(`Dist: ${distance.toFixed(0)}`, 60, 95);
    p.fill(255, 200, 100);
    p.text(`Thresh: ${(threshold - 30).toFixed(0)}`, 60, 110);
    
    // Legend
    p.fill(150);
    p.textSize(10);
    p.textAlign(p.CENTER, p.TOP);
    p.text('Drag object or threshold line', 200, 185);
  };
  
  p.mousePressed = () => {
    // Check if clicking on object
    if (p.dist(p.mouseX, p.mouseY, 200, objectY) < 20) {
      draggingObject = true;
    }
    // Check if clicking near threshold line
    else if (p.abs(p.mouseY - threshold) < 15 && p.mouseX > 40 && p.mouseX < 360) {
      draggingThreshold = true;
    }
  };
  
  p.mouseDragged = () => {
    if (draggingObject) {
      objectY = p.constrain(p.mouseY, 50, 180);
    }
    if (draggingThreshold) {
      threshold = p.constrain(p.mouseY, 60, 170);
    }
  };
  
  p.mouseReleased = () => {
    draggingObject = false;
    draggingThreshold = false;
  };
};
