/**
 * P2-C1-L1 Ultrasonic Sensor Sketch 1
 * Expanding sound waves from sensor bouncing off draggable obstacle.
 */
import type p5 from 'p5';

export const ultrasonicSketch = (p: p5) => {
  let obstacleX = 350;
  let obstacleY = 200;
  let isDragging = false;
  let waves: { x: number; radius: number; returning: boolean }[] = [];
  let lastWaveTime = 0;
  let measuredDistance = 0;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);

    // Create new wave periodically
    if (p.millis() - lastWaveTime > 500) {
      waves.push({ x: 100, radius: 0, returning: false });
      lastWaveTime = p.millis();
    }

    updateWaves();
    drawSensor();
    drawObstacle();
    drawWaves();
    drawDistanceDisplay();
    drawLabels();
  };

  p.mousePressed = () => {
    const d = p.dist(p.mouseX, p.mouseY, obstacleX, obstacleY);
    if (d < 40) {
      isDragging = true;
    }
  };

  p.mouseReleased = () => {
    isDragging = false;
  };

  p.mouseDragged = () => {
    if (isDragging) {
      obstacleX = p.constrain(p.mouseX, 180, 550);
      obstacleY = p.constrain(p.mouseY, 80, 320);
    }
  };

  const updateWaves = () => {
    const sensorX = 100;

    for (let i = waves.length - 1; i >= 0; i--) {
      const wave = waves[i];

      if (!wave.returning) {
        wave.radius += 4;

        // Check if wave hit obstacle
        const waveRightEdge = sensorX + wave.radius;
        if (waveRightEdge >= obstacleX - 30) {
          wave.returning = true;
          wave.x = obstacleX - 30;
        }

        // Remove if too far
        if (wave.radius > 500) {
          waves.splice(i, 1);
        }
      } else {
        wave.x -= 4;

        // Check if returned to sensor
        if (wave.x <= sensorX + 20) {
          // Calculate distance
          const distance = obstacleX - sensorX - 50;
          measuredDistance = p.lerp(measuredDistance, distance, 0.3);
          waves.splice(i, 1);
        }
      }
    }
  };

  const drawSensor = () => {
    const x = 80;
    const y = 200;

    // Sensor body
    p.fill(50, 50, 60);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x - 30, y - 50, 50, 100, 8);

    // Ultrasonic transducers (two "eyes")
    p.fill(40, 40, 50);
    p.stroke(150);
    p.strokeWeight(2);
    p.ellipse(x, y - 20, 30, 30);
    p.ellipse(x, y + 20, 30, 30);

    // Mesh pattern
    p.stroke(80);
    p.strokeWeight(1);
    for (let i = -10; i <= 10; i += 5) {
      p.line(x + i, y - 30, x + i, y - 10);
      p.line(x + i, y + 10, x + i, y + 30);
    }

    // Label
    p.fill(200);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('HC-SR04', x, y + 65);
    p.text('Ultrasonic', x, y + 80);
  };

  const drawObstacle = () => {
    // Obstacle (draggable box)
    p.fill(100, 80, 60);
    p.stroke(150, 120, 80);
    p.strokeWeight(3);
    p.rect(obstacleX - 30, obstacleY - 40, 60, 80, 8);

    // Drag indicator
    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('DRAG', obstacleX, obstacleY - 10);
    p.text('ME', obstacleX, obstacleY + 5);

    // Drag handle visual
    p.fill(150);
    for (let i = 0; i < 3; i++) {
      p.ellipse(obstacleX, obstacleY + 20 + i * 6, 4, 4);
    }
  };

  const drawWaves = () => {
    const sensorX = 100;
    const sensorY = 200;

    for (const wave of waves) {
      if (!wave.returning) {
        // Outgoing wave (arc expanding from sensor)
        p.noFill();
        p.stroke(100, 200, 255, 200 - wave.radius * 0.3);
        p.strokeWeight(2);
        p.arc(sensorX + 20, sensorY, wave.radius * 2, wave.radius * 1.5, -p.QUARTER_PI, p.QUARTER_PI);
      } else {
        // Returning wave
        p.noFill();
        p.stroke(255, 200, 100, 200);
        p.strokeWeight(2);
        const returnRadius = (obstacleX - wave.x) * 0.8;
        p.arc(wave.x, sensorY, returnRadius, returnRadius * 0.8, p.PI - p.QUARTER_PI, p.PI + p.QUARTER_PI);
      }
    }
  };

  const drawDistanceDisplay = () => {
    const x = 450;
    const y = 80;
    const w = 130;
    const h = 70;

    // Display background
    p.fill(40, 45, 55);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x, y, w, h, 8);

    // Distance value
    p.fill(100, 255, 150);
    p.noStroke();
    p.textSize(24);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(`${Math.round(measuredDistance)}`, x + w / 2, y + 25);

    p.fill(200);
    p.textSize(12);
    p.text('cm', x + w / 2, y + 50);

    // Distance bar
    const barY = y + h + 20;
    p.fill(60);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(x, barY, w, 15, 4);

    const barFill = p.map(measuredDistance, 0, 400, 0, w);
    const barColor = p.lerpColor(p.color(100, 255, 100), p.color(255, 100, 100), measuredDistance / 400);
    p.fill(barColor);
    p.noStroke();
    p.rect(x, barY, barFill, 15, 4);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Ultrasonic sensor emits sound waves', 50, 50);
    p.text('→ Measures time for echo to return', 60, 70);
    p.text('→ Distance = (Time × Speed of Sound) / 2', 60, 90);

    p.fill(150);
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Drag the obstacle to see distance change', 300, 370);

    // Wave legend
    p.fill(100, 200, 255);
    p.text('Blue = Outgoing wave', 200, 385);
    p.fill(255, 200, 100);
    p.text('Orange = Returning echo', 420, 385);
  };
};

export default ultrasonicSketch;
