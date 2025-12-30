/**
 * P2-C2-L2 Soil Moisture Sketch 1
 * Plant leaves change color as soil moisture bar moves.
 */
import type p5 from 'p5';

export const soilMoistureSketch = (p: p5) => {
  let moisture = 50; // 0-100%

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);

    drawPot();
    drawPlant();
    drawSensor();
    drawSlider();
    drawMoistureDisplay();
    drawLabels();
  };

  p.mouseDragged = () => {
    if (p.mouseX > 380 && p.mouseX < 550 && p.mouseY > 300 && p.mouseY < 340) {
      moisture = p.map(p.mouseX, 380, 550, 0, 100);
      moisture = p.constrain(moisture, 0, 100);
    }
  };

  const drawPot = () => {
    const x = 200;
    const y = 280;
    const w = 120;
    const h = 80;

    // Pot body
    p.fill(160, 90, 60);
    p.stroke(120, 70, 50);
    p.strokeWeight(3);
    p.beginShape();
    p.vertex(x - w / 2 - 10, y - h);
    p.vertex(x + w / 2 + 10, y - h);
    p.vertex(x + w / 2, y);
    p.vertex(x - w / 2, y);
    p.endShape(p.CLOSE);

    // Pot rim
    p.fill(140, 80, 55);
    p.rect(x - w / 2 - 15, y - h - 12, w + 30, 15, 3);

    // Soil
    const soilColor = p.lerpColor(
      p.color(180, 140, 100), // Dry soil
      p.color(80, 60, 40),    // Wet soil
      moisture / 100
    );
    p.fill(soilColor);
    p.noStroke();
    p.rect(x - w / 2 + 5, y - h + 5, w - 10, 30);

    // Water droplets on soil when wet
    if (moisture > 50) {
      p.fill(100, 150, 200, (moisture - 50) * 3);
      for (let i = 0; i < 5; i++) {
        const dx = p.random(-w / 2 + 15, w / 2 - 15);
        const dy = p.random(8, 25);
        p.ellipse(x + dx, y - h + dy, 4, 4);
      }
    }
  };

  const drawPlant = () => {
    const x = 200;
    const y = 200;

    // Stem
    p.stroke(80, 150, 80);
    p.strokeWeight(6);
    p.line(x, y + 80, x, y - 20);

    // Plant health color based on moisture
    let leafColor;
    if (moisture < 20) {
      leafColor = p.color(180, 150, 80); // Wilted/brown
    } else if (moisture < 40) {
      leafColor = p.color(150, 180, 80); // Yellow-green
    } else if (moisture < 80) {
      leafColor = p.color(80, 180, 80);  // Healthy green
    } else {
      leafColor = p.color(60, 160, 100); // Over-watered
    }

    // Leaves
    p.fill(leafColor);
    p.stroke(p.red(leafColor) - 20, p.green(leafColor) - 20, p.blue(leafColor) - 20);
    p.strokeWeight(2);

    // Leaf droop based on moisture
    const droop = moisture < 30 ? (30 - moisture) / 30 * 20 : 0;

    // Left leaves
    drawLeaf(x - 30, y - 10, -40 + droop, 0.8);
    drawLeaf(x - 25, y + 20, -30 + droop * 0.5, 0.6);

    // Right leaves
    drawLeaf(x + 30, y - 10, 40 - droop, 0.8);
    drawLeaf(x + 25, y + 20, 30 - droop * 0.5, 0.6);

    // Top leaf
    drawLeaf(x, y - 30, 0, 1);

    // Status indicator
    p.fill(200);
    p.noStroke();
    p.textSize(24);
    p.textAlign(p.CENTER, p.CENTER);

    let statusIcon;
    if (moisture < 20) {
      statusIcon = '😰';
    } else if (moisture < 40) {
      statusIcon = '😟';
    } else if (moisture < 80) {
      statusIcon = '😊';
    } else {
      statusIcon = '💦';
    }
    p.text(statusIcon, x, y - 70);
  };

  const drawLeaf = (x: number, y: number, angle: number, scale: number) => {
    p.push();
    p.translate(x, y);
    p.rotate(p.radians(angle));
    p.scale(scale);
    // Draw simple leaf shape using ellipse
    p.ellipse(25, 0, 50, 25);
    p.pop();
  };

  const drawSensor = () => {
    const x = 250;
    const y = 245;

    // Probe body
    p.fill(50, 50, 60);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x, y - 50, 25, 30, 4);

    // Prongs in soil
    p.fill(150);
    p.stroke(120);
    p.strokeWeight(1);
    p.rect(x + 5, y - 20, 5, 45);
    p.rect(x + 15, y - 20, 5, 45);

    // Wire
    p.stroke(100, 100, 150);
    p.strokeWeight(2);
    p.noFill();
    p.bezier(x + 25, y - 40, x + 50, y - 60, x + 80, y - 80, x + 100, y - 100);

    // Label
    p.fill(200);
    p.noStroke();
    p.textSize(9);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Sensor', x + 12, y - 60);
  };

  const drawSlider = () => {
    const x = 380;
    const y = 320;
    const w = 170;

    // Gradient (dry to wet)
    for (let i = 0; i < w; i++) {
      const c = p.lerpColor(p.color(180, 140, 100), p.color(80, 120, 180), i / w);
      p.stroke(c);
      p.line(x + i, y - 8, x + i, y + 8);
    }

    p.noFill();
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x, y - 8, w, 16, 8);

    const handleX = p.map(moisture, 0, 100, x, x + w);
    p.fill(200);
    p.stroke(255);
    p.strokeWeight(2);
    p.ellipse(handleX, y, 24, 24);

    // Droplet icon on handle
    p.fill(100, 150, 200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('💧', handleX, y);

    p.fill(200);
    p.textSize(12);
    p.text('Soil Moisture', x + w / 2, y - 30);
    p.textSize(10);
    p.text('🏜 Dry', x - 5, y + 25);
    p.textAlign(p.RIGHT, p.CENTER);
    p.text('Wet 🌊', x + w + 5, y + 25);
  };

  const drawMoistureDisplay = () => {
    const x = 480;
    const y = 150;

    // Display
    p.fill(40, 45, 55);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x - 60, y - 50, 120, 100, 10);

    // Value
    let valueColor;
    if (moisture < 30) {
      valueColor = p.color(255, 150, 100);
    } else if (moisture < 70) {
      valueColor = p.color(100, 255, 150);
    } else {
      valueColor = p.color(100, 200, 255);
    }

    p.fill(valueColor);
    p.noStroke();
    p.textSize(28);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(`${Math.round(moisture)}%`, x, y - 10);

    // Status text
    p.fill(200);
    p.textSize(11);
    let status;
    if (moisture < 20) {
      status = 'NEEDS WATER!';
    } else if (moisture < 40) {
      status = 'Getting dry';
    } else if (moisture < 70) {
      status = 'Perfect!';
    } else {
      status = 'Very wet';
    }
    p.text(status, x, y + 25);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Soil Moisture Sensor', 50, 50);
    p.text('→ Measures water content in soil', 60, 70);
    p.text('→ Helps automate plant watering', 60, 90);

    p.fill(150);
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Drag slider to simulate soil moisture changes', 300, 385);
  };
};

export default soilMoistureSketch;
