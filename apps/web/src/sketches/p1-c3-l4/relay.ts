/**
 * P1-C3-L4 Relays Sketch 1
 * Relay coil energizing and armature switching NO→NC contacts.
 */
import type p5 from 'p5';

export const relaySketch = (p: p5) => {
  let coilEnergized = false;
  let armaturePosition = 0; // 0 = NC, 1 = NO

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);

    // Animate armature
    const targetPos = coilEnergized ? 1 : 0;
    armaturePosition = p.lerp(armaturePosition, targetPos, 0.15);

    drawRelay();
    drawCircuits();
    drawButton();
    drawLabels();
  };

  p.mousePressed = () => {
    if (p.mouseX > 50 && p.mouseX < 150 && p.mouseY > 320 && p.mouseY < 370) {
      coilEnergized = !coilEnergized;
    }
  };

  const drawRelay = () => {
    const cx = 300;
    const cy = 180;

    // Relay housing
    p.fill(45, 45, 55);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(cx - 100, cy - 90, 200, 180, 8);

    // Coil section (left side)
    p.fill(60, 60, 70);
    p.rect(cx - 90, cy - 40, 60, 80, 4);

    // Coil windings
    p.stroke(180, 120, 60);
    p.strokeWeight(2);
    for (let i = 0; i < 8; i++) {
      const y = cy - 30 + i * 8;
      p.line(cx - 85, y, cx - 35, y);
    }

    // Iron core
    p.fill(80, 80, 100);
    p.noStroke();
    p.rect(cx - 70, cy - 35, 20, 70, 2);

    // Magnetic field when energized
    if (coilEnergized) {
      p.stroke(100, 150, 255, 100);
      p.strokeWeight(1);
      p.noFill();
      for (let i = 1; i <= 3; i++) {
        p.ellipse(cx - 60, cy, 30 + i * 15, 60 + i * 20);
      }
    }

    // Contact section (right side)
    // NC contact (normally closed)
    p.fill(150);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(cx + 30, cy - 60, 50, 15, 3);
    p.fill(200);
    p.textSize(9);
    p.noStroke();
    p.text('NC', cx + 55, cy - 52);

    // NO contact (normally open)
    p.fill(150);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(cx + 30, cy + 45, 50, 15, 3);
    p.fill(200);
    p.textSize(9);
    p.noStroke();
    p.text('NO', cx + 55, cy + 53);

    // COM (common) terminal
    p.fill(150);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(cx + 30, cy - 8, 50, 15, 3);
    p.fill(200);
    p.textSize(9);
    p.noStroke();
    p.text('COM', cx + 55, cy);

    // Armature (moving contact)
    p.push();
    p.translate(cx + 30, cy);

    // Pivot point
    p.fill(100);
    p.stroke(120);
    p.strokeWeight(2);
    p.ellipse(0, 0, 12, 12);

    // Armature arm
    const armAngle = p.lerp(p.radians(-35), p.radians(35), armaturePosition);
    p.rotate(armAngle);

    p.fill(180, 150, 50);
    p.stroke(200, 170, 70);
    p.strokeWeight(2);
    p.rect(0, -4, 35, 8, 2);

    // Contact tip
    p.fill(200);
    p.ellipse(35, 0, 10, 10);

    p.pop();

    // Connection to coil core (magnetic pull)
    if (coilEnergized) {
      p.stroke(100, 150, 255, 150);
      p.strokeWeight(1);
      const pullX = cx - 30;
      const pullY = cy;
      p.line(pullX, pullY - 20, cx + 20, cy - armaturePosition * 30);
      p.line(pullX, pullY + 20, cx + 20, cy + armaturePosition * 30);
    }

    // Status indicators
    const ncConnected = armaturePosition < 0.5;
    const noConnected = armaturePosition > 0.5;

    // NC indicator
    p.fill(ncConnected ? p.color(100, 255, 100) : p.color(100, 100, 100));
    p.noStroke();
    p.ellipse(cx + 90, cy - 52, 12, 12);

    // NO indicator
    p.fill(noConnected ? p.color(100, 255, 100) : p.color(100, 100, 100));
    p.ellipse(cx + 90, cy + 53, 12, 12);
  };

  const drawCircuits = () => {
    // Control circuit (low voltage)
    p.stroke(100, 150, 200);
    p.strokeWeight(3);
    p.noFill();

    // Coil connections
    p.line(100, 220, 210, 220);
    p.line(100, 260, 210, 260);

    // Low voltage label
    p.fill(100, 150, 200);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('5V Control', 80, 240);

    // Load circuit (high voltage) - simplified representation
    p.stroke(255, 200, 100);
    p.strokeWeight(3);

    // High voltage connections (to NO/NC)
    p.line(480, 128, 380, 128);
    p.line(480, 233, 380, 233);

    p.fill(255, 200, 100);
    p.noStroke();
    p.textSize(11);
    p.text('120V Load', 520, 180);

    // Bulb icon
    const bulbOn = armaturePosition > 0.5;
    p.fill(bulbOn ? p.color(255, 255, 100) : p.color(100, 100, 100));
    p.stroke(150);
    p.strokeWeight(2);
    p.ellipse(520, 233, 30, 35);

    if (bulbOn) {
      // Glow
      p.noStroke();
      for (let r = 40; r > 0; r -= 8) {
        p.fill(255, 255, 100, (1 - r / 40) * 80);
        p.ellipse(520, 233, r, r);
      }
    }
  };

  const drawButton = () => {
    const x = 100;
    const y = 345;
    const w = 100;
    const h = 50;

    p.fill(coilEnergized ? p.color(60, 120, 60) : p.color(80, 80, 90));
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x - w / 2, y - h / 2, w, h, 8);

    p.fill(255);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(coilEnergized ? 'ENERGIZED' : 'DE-ENERGIZED', x, y);

    p.fill(150);
    p.textSize(10);
    p.text('Click to toggle', x, y + 40);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Relay: Electrically controlled switch', 50, 50);
    p.text('→ Low-voltage coil controls high-voltage circuit', 60, 70);

    p.fill(150);
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);

    const state = coilEnergized ? 'COM connected to NO (lamp ON)' : 'COM connected to NC (lamp OFF)';
    p.text(state, 300, 385);
  };
};

export default relaySketch;
