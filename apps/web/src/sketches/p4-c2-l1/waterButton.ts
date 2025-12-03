import type p5 from "p5";

/**
 * P4-C2-L1 Smart Plant - gif2
 * 'Water' button restoring healthy green state
 */
export const waterButtonSketch = (p: p5) => {
  let soilMoisture = 20; // 0-100
  let plantHealth = 30; // 0-100
  let lastWaterTime = 0;
  let wateringAnimation = false;
  let waterDrops: { x: number; y: number; speed: number }[] = [];

  p.setup = () => {
    p.createCanvas(400, 350);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    // Background - gradient sky
    for (let y = 0; y < 200; y++) {
      const inter = p.map(y, 0, 200, 0, 1);
      const c = p.lerpColor(p.color(135, 206, 235), p.color(200, 230, 255), inter);
      p.stroke(c);
      p.line(0, y, p.width, y);
    }

    // Ground
    p.noStroke();
    p.fill(139, 90, 43);
    p.rect(0, 200, p.width, 150);

    // Title
    p.fill(50);
    p.textSize(14);
    p.text("Smart Plant Watering System", p.width / 2, 20);

    // Draw pot and plant
    drawPot(200, 200);
    drawPlant(200, 170);

    // Water drops animation
    updateWaterDrops();
    drawWaterDrops();

    // Draw moisture meter
    drawMoistureMeter(60, 100);

    // Draw water button
    drawWaterButton(320, 200);

    // Status display
    drawStatus();

    // Natural moisture decrease
    if (p.frameCount % 120 === 0 && soilMoisture > 0) {
      soilMoisture = Math.max(0, soilMoisture - 2);
      updatePlantHealth();
    }
  };

  const drawPot = (x: number, y: number) => {
    // Pot body
    p.fill(180, 100, 60);
    p.noStroke();
    p.beginShape();
    p.vertex(x - 50, y);
    p.vertex(x + 50, y);
    p.vertex(x + 40, y + 70);
    p.vertex(x - 40, y + 70);
    p.endShape(p.CLOSE);

    // Pot rim
    p.fill(160, 80, 50);
    p.rect(x - 55, y - 10, 110, 15, 3);

    // Soil
    const soilColor = p.lerpColor(
      p.color(150, 100, 60), // Dry
      p.color(80, 50, 30),   // Wet
      soilMoisture / 100
    );
    p.fill(soilColor);
    p.ellipse(x, y + 5, 90, 20);
  };

  const drawPlant = (x: number, y: number) => {
    // Plant color based on health
    const healthyGreen = p.color(50, 180, 50);
    const unhealthyYellow = p.color(180, 180, 50);
    const deadBrown = p.color(139, 90, 43);

    let plantColor;
    if (plantHealth > 60) {
      plantColor = p.lerpColor(unhealthyYellow, healthyGreen, (plantHealth - 60) / 40);
    } else {
      plantColor = p.lerpColor(deadBrown, unhealthyYellow, plantHealth / 60);
    }

    // Stem
    p.stroke(plantColor);
    p.strokeWeight(4);
    p.line(x, y, x, y - 60);

    // Leaves - droop based on health
    const droopAngle = p.map(plantHealth, 0, 100, 0.8, 0);

    p.fill(plantColor);
    p.noStroke();

    // Left leaves
    p.push();
    p.translate(x - 5, y - 30);
    p.rotate(-p.PI / 4 + droopAngle);
    p.ellipse(0, -15, 15, 35);
    p.pop();

    p.push();
    p.translate(x - 5, y - 50);
    p.rotate(-p.PI / 5 + droopAngle * 0.7);
    p.ellipse(0, -12, 12, 30);
    p.pop();

    // Right leaves
    p.push();
    p.translate(x + 5, y - 35);
    p.rotate(p.PI / 4 - droopAngle);
    p.ellipse(0, -15, 15, 35);
    p.pop();

    p.push();
    p.translate(x + 5, y - 55);
    p.rotate(p.PI / 5 - droopAngle * 0.7);
    p.ellipse(0, -12, 12, 30);
    p.pop();

    // Top leaf
    p.push();
    p.translate(x, y - 60);
    p.ellipse(0, -15, 12, 35);
    p.pop();

    // Health indicator emoji
    p.textSize(20);
    if (plantHealth > 70) {
      p.text("😊", x, y - 90);
    } else if (plantHealth > 40) {
      p.text("😐", x, y - 90);
    } else {
      p.text("😢", x, y - 90);
    }
  };

  const drawMoistureMeter = (x: number, y: number) => {
    // Label
    p.fill(50);
    p.noStroke();
    p.textSize(11);
    p.text("Soil Moisture", x, y - 40);

    // Meter background
    p.fill(200);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x - 20, y - 30, 40, 100, 5);

    // Moisture level
    const meterHeight = p.map(soilMoisture, 0, 100, 0, 90);
    const moistureColor = soilMoisture > 30
      ? p.color(50, 150, 255)
      : p.color(255, 100, 100);
    p.fill(moistureColor);
    p.noStroke();
    p.rect(x - 15, y + 65 - meterHeight, 30, meterHeight, 3);

    // Percentage
    p.fill(50);
    p.textSize(14);
    p.text(`${Math.round(soilMoisture)}%`, x, y + 85);

    // Threshold line
    p.stroke(255, 100, 100);
    p.strokeWeight(2);
    p.setLineDash([5, 5]);
    p.line(x - 25, y + 35, x + 25, y + 35); // 30% threshold
    p.setLineDash([]);

    p.fill(255, 100, 100);
    p.textSize(8);
    p.text("30%", x + 35, y + 35);
  };

  const drawWaterButton = (x: number, y: number) => {
    const isHovered = p.dist(p.mouseX, p.mouseY, x, y + 30) < 30;

    // Button background
    p.fill(isHovered ? p.color(60, 160, 255) : p.color(50, 130, 220));
    p.stroke(30, 90, 180);
    p.strokeWeight(3);
    p.rect(x - 40, y, 80, 60, 10);

    // Water drop icon
    p.fill(255);
    p.noStroke();
    p.beginShape();
    p.vertex(x, y + 10);
    p.bezierVertex(x - 15, y + 30, x - 15, y + 45, x, y + 50);
    p.bezierVertex(x + 15, y + 45, x + 15, y + 30, x, y + 10);
    p.endShape();

    // Label
    p.fill(255);
    p.textSize(12);
    p.text("WATER", x, y + 72);

    // Click hint
    p.fill(200);
    p.textSize(9);
    p.text("Click to water", x, y + 88);
  };

  const drawStatus = () => {
    p.fill(50);
    p.textSize(12);

    let status = "";
    if (soilMoisture < 30) {
      status = "⚠️ Low moisture! Plant needs water!";
      p.fill(200, 50, 50);
    } else if (soilMoisture > 80) {
      status = "💧 Plenty of water - Plant is happy!";
      p.fill(50, 150, 50);
    } else {
      status = "✓ Moisture level OK";
      p.fill(50, 100, 150);
    }

    p.text(status, p.width / 2, 330);
  };

  const updateWaterDrops = () => {
    for (let i = waterDrops.length - 1; i >= 0; i--) {
      waterDrops[i].y += waterDrops[i].speed;
      if (waterDrops[i].y > 210) {
        waterDrops.splice(i, 1);
      }
    }

    if (wateringAnimation && p.frameCount % 5 === 0) {
      waterDrops.push({
        x: 200 + p.random(-20, 20),
        y: 80,
        speed: p.random(3, 6)
      });
    }

    // Stop animation after a while
    if (wateringAnimation && p.frameCount - lastWaterTime > 60) {
      wateringAnimation = false;
    }
  };

  const drawWaterDrops = () => {
    p.fill(100, 180, 255, 200);
    p.noStroke();
    for (const drop of waterDrops) {
      p.ellipse(drop.x, drop.y, 6, 10);
    }
  };

  const updatePlantHealth = () => {
    // Plant health follows moisture with some delay
    if (soilMoisture > 30) {
      plantHealth = Math.min(100, plantHealth + 1);
    } else {
      plantHealth = Math.max(0, plantHealth - 2);
    }
  };

  p.mousePressed = () => {
    const btnX = 320;
    const btnY = 230;
    if (p.dist(p.mouseX, p.mouseY, btnX, btnY) < 40) {
      // Water the plant
      soilMoisture = Math.min(100, soilMoisture + 40);
      wateringAnimation = true;
      lastWaterTime = p.frameCount;
      updatePlantHealth();
    }
  };

  // Polyfill for setLineDash
  (p as any).setLineDash = (list: number[]) => {
    (p.drawingContext as CanvasRenderingContext2D).setLineDash(list);
  };
};
