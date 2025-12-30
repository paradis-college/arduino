/**
 * P2-C1-L4 Proximity Sensor Sketch 1
 * Object approaching sensor triggers near/far LED color changes.
 */
import type p5 from 'p5';

export const proximitySketch = (p: p5) => {
  let objectX = 450;
  let isDragging = false;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);

    const sensorX = 100;
    const distance = objectX - sensorX - 50;
    const normalizedDistance = p.constrain(distance / 350, 0, 1);

    drawSensor(sensorX);
    drawDetectionBeam(sensorX, distance);
    drawObject();
    drawDistanceIndicator(distance, normalizedDistance);
    drawLEDIndicator(normalizedDistance);
    drawLabels();
  };

  p.mousePressed = () => {
    if (p.dist(p.mouseX, p.mouseY, objectX, 200) < 40) {
      isDragging = true;
    }
  };

  p.mouseReleased = () => {
    isDragging = false;
  };

  p.mouseDragged = () => {
    if (isDragging) {
      objectX = p.constrain(p.mouseX, 200, 550);
    }
  };

  const drawSensor = (x: number) => {
    const y = 200;

    // Sensor body
    p.fill(50, 50, 60);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x - 40, y - 35, 70, 70, 8);

    // IR LED (emitter)
    p.fill(80, 40, 60);
    p.stroke(100);
    p.ellipse(x - 10, y - 10, 20, 20);

    // Photodiode (receiver)
    p.fill(40, 40, 60);
    p.ellipse(x - 10, y + 10, 20, 20);

    // Labels
    p.fill(150);
    p.noStroke();
    p.textSize(8);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('TX', x - 10, y - 10);
    p.text('RX', x - 10, y + 10);

    // Main label
    p.fill(200);
    p.textSize(11);
    p.text('Proximity', x - 5, y + 55);
    p.text('Sensor', x - 5, y + 68);
  };

  const drawDetectionBeam = (sensorX: number, distance: number) => {
    const y = 200;
    const beamLength = p.min(distance + 30, 400);

    // Outgoing IR beam
    p.stroke(255, 100, 100, 100);
    p.strokeWeight(3);

    // Animated dashes
    const dashOffset = (p.frameCount * 3) % 20;
    for (let x = sensorX + 30 + dashOffset; x < sensorX + beamLength; x += 20) {
      p.line(x, y - 5, p.min(x + 10, sensorX + beamLength), y - 5);
    }

    // Reflected beam (if object is close enough)
    if (distance < 350) {
      p.stroke(100, 100, 255, 150 * (1 - distance / 350));
      const returnDashOffset = (p.frameCount * 3) % 20;
      for (let x = objectX - 30 - returnDashOffset; x > sensorX + 30; x -= 20) {
        p.line(x, y + 5, p.max(x - 10, sensorX + 30), y + 5);
      }
    }
  };

  const drawObject = () => {
    const y = 200;

    // Object body
    p.fill(100, 80, 60);
    p.stroke(150, 120, 80);
    p.strokeWeight(3);
    p.rect(objectX - 25, y - 40, 50, 80, 8);

    // Reflection surface
    p.fill(150, 130, 100);
    p.noStroke();
    p.rect(objectX - 25, y - 35, 8, 70);

    // Drag indicator
    p.fill(200);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('DRAG', objectX, y - 10);
    p.text('←→', objectX, y + 10);
  };

  const drawDistanceIndicator = (distance: number, normalized: number) => {
    const x = 200;
    const y = 320;
    const w = 250;
    const h = 25;

    // Background
    p.fill(60);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(x, y, w, h, 4);

    // Distance bar (color coded)
    const barColor = p.lerpColor(
      p.color(100, 255, 100), // Green (near)
      p.color(255, 100, 100), // Red (far)
      normalized
    );
    p.fill(barColor);
    p.noStroke();
    p.rect(x, y, w * (1 - normalized), h, 4, 0, 0, 4);

    // Value display
    p.fill(200);
    p.textSize(14);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(`Distance: ${Math.round(distance)} units`, x + w / 2, y - 20);

    // Scale labels
    p.fill(150);
    p.textSize(10);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('NEAR', x, y + h + 15);
    p.textAlign(p.RIGHT, p.CENTER);
    p.text('FAR', x + w, y + h + 15);
  };

  const drawLEDIndicator = (normalized: number) => {
    const x = 520;
    const y = 320;

    // LED housing
    p.fill(40, 45, 55);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x - 35, y - 35, 70, 70, 8);

    // LED color based on distance
    const ledColor = p.lerpColor(
      p.color(100, 255, 100), // Green (near)
      p.color(255, 100, 100), // Red (far)
      normalized
    );

    // LED glow
    if (normalized < 0.7) {
      p.noStroke();
      for (let r = 35; r > 0; r -= 7) {
        const alpha = (1 - normalized) * (1 - r / 35) * 150;
        p.fill(p.red(ledColor), p.green(ledColor), p.blue(ledColor), alpha);
        p.ellipse(x, y, r * 2, r * 2);
      }
    }

    // LED body
    p.fill(ledColor);
    p.stroke(100);
    p.strokeWeight(2);
    p.ellipse(x, y, 25, 25);

    // Status text
    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);

    let status: string;
    if (normalized < 0.3) {
      status = 'VERY NEAR';
    } else if (normalized < 0.6) {
      status = 'NEAR';
    } else if (normalized < 0.8) {
      status = 'FAR';
    } else {
      status = 'OUT OF RANGE';
    }
    p.text(status, x, y - 50);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Proximity Sensor: Detects nearby objects', 50, 50);
    p.text('→ IR light bounces off objects and returns', 60, 70);
    p.text('→ Closer objects = stronger signal', 60, 90);

    p.fill(150);
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Drag the object to see LED color change', 300, 385);
  };
};

export default proximitySketch;
