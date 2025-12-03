/**
 * P4-C2-L1 Smart Plant Monitor Sketch 1
 * Plant health animation reacting to moisture changes.
 */
import type p5 from 'p5';

export const smartPlantSketch = (p: p5) => {
  let moisture = 50;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);
    drawPlant();
    drawMoistureBar();
    drawWaterButton();
    drawLabels();
  };

  p.mousePressed = () => {
    if (p.mouseX > 450 && p.mouseX < 550 && p.mouseY > 300 && p.mouseY < 360) {
      moisture = p.min(moisture + 30, 100);
    }
  };

  p.draw = () => {
    p.background(30, 35, 45);
    moisture = p.max(moisture - 0.05, 0);
    drawPlant();
    drawMoistureBar();
    drawWaterButton();
    drawLabels();
  };

  const drawPlant = () => {
    const x = 200;
    const y = 250;
    
    // Pot
    p.fill(160, 90, 60);
    p.stroke(120, 70, 50);
    p.strokeWeight(2);
    p.beginShape();
    p.vertex(x - 50, y);
    p.vertex(x + 50, y);
    p.vertex(x + 40, y + 60);
    p.vertex(x - 40, y + 60);
    p.endShape(p.CLOSE);
    
    // Soil
    const soilColor = p.lerpColor(p.color(180, 140, 100), p.color(80, 60, 40), moisture / 100);
    p.fill(soilColor);
    p.noStroke();
    p.rect(x - 45, y + 5, 90, 20);
    
    // Stem
    p.stroke(80 + moisture * 0.5, 150 - (100 - moisture) * 0.3, 80);
    p.strokeWeight(5);
    p.line(x, y, x, y - 80);
    
    // Leaves
    const droop = (100 - moisture) * 0.3;
    const leafColor = moisture > 30 ? p.color(80, 180, 80) : p.color(180, 150, 80);
    
    p.fill(leafColor);
    p.stroke(60, 120, 60);
    p.strokeWeight(2);
    
    // Left leaf
    p.push();
    p.translate(x - 10, y - 50);
    p.rotate(p.radians(-30 + droop));
    p.ellipse(25, 0, 50, 20);
    p.pop();
    
    // Right leaf
    p.push();
    p.translate(x + 10, y - 50);
    p.rotate(p.radians(30 - droop));
    p.ellipse(-25, 0, 50, 20);
    p.pop();
    
    // Top leaf
    p.ellipse(x, y - 100, 25, 45);
    
    // Status emoji
    p.textSize(30);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(moisture > 50 ? '😊' : moisture > 20 ? '😟' : '😰', x, y - 130);
  };

  const drawMoistureBar = () => {
    const x = 400;
    const y = 100;
    const w = 40;
    const h = 150;
    
    // Container
    p.fill(50, 55, 65);
    p.stroke(80);
    p.strokeWeight(2);
    p.rect(x - w / 2, y, w, h, 5);
    
    // Fill
    const fillH = (moisture / 100) * (h - 10);
    const fillColor = moisture > 50 ? p.color(100, 200, 255) : moisture > 20 ? p.color(255, 200, 100) : p.color(255, 100, 100);
    p.fill(fillColor);
    p.noStroke();
    p.rect(x - w / 2 + 5, y + h - 5 - fillH, w - 10, fillH, 3);
    
    // Value
    p.fill(200);
    p.textSize(16);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(`${Math.round(moisture)}%`, x, y - 20);
    p.textSize(11);
    p.text('Moisture', x, y + h + 20);
  };

  const drawWaterButton = () => {
    p.fill(100, 150, 255);
    p.stroke(80, 130, 230);
    p.strokeWeight(2);
    p.rect(450, 300, 100, 60, 10);
    
    p.fill(255);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('💧 Water', 500, 330);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Smart Plant Monitor', 50, 50);
    p.text('→ Monitors soil moisture', 60, 70);
    
    p.fill(150);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Click "Water" button to increase moisture', 300, 380);
  };
};

export default smartPlantSketch;
