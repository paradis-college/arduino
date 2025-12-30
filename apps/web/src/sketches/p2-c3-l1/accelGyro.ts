/**
 * P2-C3-L1 Accelerometer/Gyroscope Sketch 1
 * Tiltable 3D board rotating with X/Y sliders.
 */
import type p5 from 'p5';

export const accelGyroSketch = (p: p5) => {
  let rotX = 0;
  let rotY = 0;
  let targetRotX = 0;
  let targetRotY = 0;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);

    // Smooth animation
    rotX = p.lerp(rotX, targetRotX, 0.1);
    rotY = p.lerp(rotY, targetRotY, 0.1);

    draw3DBoard();
    drawSliders();
    drawAxesDisplay();
    drawLabels();
  };

  p.mouseDragged = () => {
    // X-axis slider
    if (p.mouseX > 50 && p.mouseX < 200 && p.mouseY > 320 && p.mouseY < 360) {
      targetRotX = p.map(p.mouseX, 50, 200, -45, 45);
    }
    // Y-axis slider
    if (p.mouseX > 250 && p.mouseX < 400 && p.mouseY > 320 && p.mouseY < 360) {
      targetRotY = p.map(p.mouseX, 250, 400, -45, 45);
    }
  };

  const draw3DBoard = () => {
    const cx = 250;
    const cy = 180;
    const boardW = 180;
    const boardH = 100;

    // Calculate 3D vertices with rotation
    const vertices = [
      { x: -boardW / 2, y: -boardH / 2, z: 0 },
      { x: boardW / 2, y: -boardH / 2, z: 0 },
      { x: boardW / 2, y: boardH / 2, z: 0 },
      { x: -boardW / 2, y: boardH / 2, z: 0 }
    ];

    // Apply rotation
    const radX = p.radians(rotX);
    const radY = p.radians(rotY);

    const rotatedVertices = vertices.map(v => {
      // Rotate around Y axis
      let x1 = v.x * p.cos(radY) - v.z * p.sin(radY);
      let z1 = v.x * p.sin(radY) + v.z * p.cos(radY);

      // Rotate around X axis
      let y2 = v.y * p.cos(radX) - z1 * p.sin(radX);
      let z2 = v.y * p.sin(radX) + z1 * p.cos(radX);

      // Perspective projection
      const scale = 300 / (300 + z2);
      return {
        x: cx + x1 * scale,
        y: cy + y2 * scale,
        z: z2
      };
    });

    // Draw shadow
    p.fill(0, 0, 0, 30);
    p.noStroke();
    p.beginShape();
    for (const v of rotatedVertices) {
      p.vertex(v.x + 10, v.y + 10);
    }
    p.endShape(p.CLOSE);

    // Draw PCB board
    p.fill(30, 100, 60);
    p.stroke(50, 130, 80);
    p.strokeWeight(3);
    p.beginShape();
    for (const v of rotatedVertices) {
      p.vertex(v.x, v.y);
    }
    p.endShape(p.CLOSE);

    // Draw circuit traces
    p.stroke(200, 180, 50, 150);
    p.strokeWeight(1);
    for (let i = 0; i < 6; i++) {
      const t = (i + 1) / 7;
      const x1 = p.lerp(rotatedVertices[0].x, rotatedVertices[1].x, t);
      const y1 = p.lerp(rotatedVertices[0].y, rotatedVertices[1].y, t);
      const x2 = p.lerp(rotatedVertices[3].x, rotatedVertices[2].x, t);
      const y2 = p.lerp(rotatedVertices[3].y, rotatedVertices[2].y, t);
      p.line(x1, y1, x2, y2);
    }

    // Draw IMU chip in center
    const chipCx = (rotatedVertices[0].x + rotatedVertices[2].x) / 2;
    const chipCy = (rotatedVertices[0].y + rotatedVertices[2].y) / 2;

    p.fill(40, 40, 50);
    p.stroke(60);
    p.strokeWeight(2);
    p.rect(chipCx - 20, chipCy - 20, 40, 40, 3);

    // Chip label
    p.fill(200);
    p.noStroke();
    p.textSize(8);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('MPU', chipCx, chipCy - 5);
    p.text('6050', chipCx, chipCy + 5);

    // Draw axis arrows
    const arrowLen = 40;
    const centerX = chipCx;
    const centerY = chipCy;

    // X axis (red)
    p.stroke(255, 100, 100);
    p.strokeWeight(2);
    const xEnd = { x: centerX + arrowLen * p.cos(radY), y: centerY };
    p.line(centerX, centerY, xEnd.x, xEnd.y);
    p.fill(255, 100, 100);
    p.noStroke();
    p.text('X', xEnd.x + 10, xEnd.y);

    // Y axis (green)
    p.stroke(100, 255, 100);
    p.strokeWeight(2);
    const yEnd = { x: centerX, y: centerY - arrowLen * p.cos(radX) };
    p.line(centerX, centerY, yEnd.x, yEnd.y);
    p.fill(100, 255, 100);
    p.noStroke();
    p.text('Y', yEnd.x, yEnd.y - 10);

    // Z axis (blue) - pointing out
    p.stroke(100, 100, 255);
    p.strokeWeight(2);
    p.fill(100, 100, 255);
    p.ellipse(centerX, centerY, 8, 8);
    p.text('Z', centerX - 15, centerY - 15);
  };

  const drawSliders = () => {
    // X rotation slider
    drawSlider(50, 340, 150, 'Pitch (X)', targetRotX, -45, 45, p.color(255, 100, 100));

    // Y rotation slider
    drawSlider(250, 340, 150, 'Roll (Y)', targetRotY, -45, 45, p.color(100, 255, 100));
  };

  const drawSlider = (x: number, y: number, w: number, label: string, value: number, minVal: number, maxVal: number, color: p5.Color) => {
    p.fill(60);
    p.stroke(80);
    p.strokeWeight(2);
    p.rect(x, y - 8, w, 16, 8);

    const handleX = p.map(value, minVal, maxVal, x, x + w);
    p.fill(color);
    p.stroke(255);
    p.strokeWeight(2);
    p.ellipse(handleX, y, 20, 20);

    p.fill(200);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(label, x + w / 2, y - 25);
    p.textSize(9);
    p.text(`${minVal}°`, x - 15, y);
    p.text(`${maxVal}°`, x + w + 15, y);
  };

  const drawAxesDisplay = () => {
    const x = 500;
    const y = 180;

    // Display box
    p.fill(40, 45, 55);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x - 60, y - 80, 120, 160, 10);

    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Orientation', x, y - 65);

    // X value
    p.fill(255, 100, 100);
    p.textSize(14);
    p.text(`X: ${rotX.toFixed(1)}°`, x, y - 30);

    // Y value
    p.fill(100, 255, 100);
    p.text(`Y: ${rotY.toFixed(1)}°`, x, y);

    // Z value (fixed)
    p.fill(100, 100, 255);
    p.text(`Z: 0.0°`, x, y + 30);

    // Status
    p.fill(150);
    p.textSize(10);
    const tilt = Math.sqrt(rotX * rotX + rotY * rotY);
    let status;
    if (tilt < 5) {
      status = 'Level';
    } else if (tilt < 20) {
      status = 'Slight tilt';
    } else {
      status = 'Tilted';
    }
    p.text(status, x, y + 60);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Accelerometer & Gyroscope (IMU)', 50, 50);
    p.text('→ Measures orientation and motion', 60, 70);

    p.fill(150);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Drag sliders to tilt the board', 300, 385);
  };
};

export default accelGyroSketch;
