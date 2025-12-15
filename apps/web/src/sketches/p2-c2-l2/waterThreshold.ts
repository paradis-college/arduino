/**
 * P2-C2-L2 Soil Moisture - GIF 2
 * Threshold indicator flashing 'needs water'
 */
import type p5 from 'p5';

export const waterThresholdSketch = (p: p5) => {
  let moisture = 30;
  let threshold = 40;
  let dragging = false;
  let draggingThreshold = false;

  p.setup = () => {
    p.createCanvas(400, 200);
    p.textFont('monospace');
  };

  p.draw = () => {
    p.background(30, 35, 45);

    const needsWater = moisture < threshold;
    const flashOn = needsWater && (p.frameCount % 30 < 15);

    // Soil container
    p.fill(60, 50, 40);
    p.stroke(80, 70, 60);
    p.strokeWeight(2);
    p.rect(30, 80, 120, 100, 5);

    // Soil layers
    const soilColor = p.lerpColor(
      p.color(100, 80, 60),
      p.color(60, 40, 30),
      moisture / 100
    );
    p.fill(soilColor);
    p.noStroke();
    p.rect(35, 85, 110, 90, 3);

    // Moisture indicator in soil
    p.fill(50, 100 + moisture, 150 + moisture * 0.5, moisture * 2);
    p.rect(35, 175 - moisture * 0.9, 110, moisture * 0.9, 0, 0, 3, 3);

    // Sensor probe
    p.fill(150);
    p.stroke(120);
    p.strokeWeight(1);
    p.rect(80, 50, 10, 80, 2);
    p.rect(100, 50, 10, 80, 2);

    // Sensor head
    p.fill(80, 80, 90);
    p.rect(70, 35, 50, 20, 5);

    // Warning indicator
    if (needsWater) {
      p.fill(flashOn ? p.color(255, 100, 100) : p.color(100, 50, 50));
      p.stroke(flashOn ? p.color(255, 150, 150) : p.color(150, 80, 80));
      p.strokeWeight(2);
      p.rect(170, 40, 200, 60, 10);

      p.fill(255);
      p.noStroke();
      p.textSize(16);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('⚠ NEEDS WATER!', 270, 60);

      p.textSize(12);
      p.text(`Moisture: ${moisture.toFixed(0)}% < ${threshold.toFixed(0)}%`, 270, 82);
    } else {
      p.fill(50, 100, 50);
      p.stroke(80, 150, 80);
      p.strokeWeight(2);
      p.rect(170, 40, 200, 60, 10);

      p.fill(100, 255, 100);
      p.noStroke();
      p.textSize(16);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('✓ MOISTURE OK', 270, 60);

      p.textSize(12);
      p.text(`Moisture: ${moisture.toFixed(0)}% ≥ ${threshold.toFixed(0)}%`, 270, 82);
    }

    // Moisture bar
    p.fill(50, 55, 65);
    p.noStroke();
    p.rect(170, 120, 200, 25, 5);

    // Moisture fill
    const barWidth = p.map(moisture, 0, 100, 0, 190);
    const barColor = needsWater ? p.color(255, 150, 100) : p.color(100, 200, 255);
    p.fill(barColor);
    p.rect(175, 125, barWidth, 15, 3);

    // Threshold marker
    const thresholdX = p.map(threshold, 0, 100, 175, 365);
    p.stroke(255, 200, 100);
    p.strokeWeight(3);
    p.line(thresholdX, 115, thresholdX, 150);

    // Threshold handle
    p.fill(draggingThreshold ? p.color(255, 255, 150) : p.color(255, 200, 100));
    p.noStroke();
    p.triangle(thresholdX - 8, 115, thresholdX + 8, 115, thresholdX, 122);

    // Labels
    p.fill(150);
    p.textSize(10);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('0%', 175, 155);
    p.textAlign(p.RIGHT, p.CENTER);
    p.text('100%', 365, 155);

    // Slider for moisture
    p.fill(50, 55, 65);
    p.rect(170, 170, 200, 15, 5);

    const sliderX = p.map(moisture, 0, 100, 175, 365);
    p.fill(dragging ? p.color(150, 200, 255) : p.color(100, 150, 200));
    p.noStroke();
    p.ellipse(sliderX, 177, 16, 16);

    // Instructions
    p.fill(120);
    p.textSize(9);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Drag slider for moisture, drag yellow marker for threshold', 270, 195);
  };

  p.mousePressed = () => {
    // Check threshold marker
    const thresholdX = p.map(threshold, 0, 100, 175, 365);
    if (p.abs(p.mouseX - thresholdX) < 15 && p.mouseY > 110 && p.mouseY < 155) {
      draggingThreshold = true;
    }
    // Check moisture slider
    else if (p.mouseY > 165 && p.mouseY < 190 && p.mouseX > 165 && p.mouseX < 375) {
      dragging = true;
      updateMoisture();
    }
  };

  p.mouseDragged = () => {
    if (dragging) {
      updateMoisture();
    }
    if (draggingThreshold) {
      threshold = p.constrain(p.map(p.mouseX, 175, 365, 0, 100), 10, 90);
    }
  };

  p.mouseReleased = () => {
    dragging = false;
    draggingThreshold = false;
  };

  const updateMoisture = () => {
    moisture = p.constrain(p.map(p.mouseX, 175, 365, 0, 100), 0, 100);
  };
};
