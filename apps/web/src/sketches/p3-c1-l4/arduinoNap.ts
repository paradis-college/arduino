import type p5 from 'p5';

/**
 * Shows Arduino sleeping/blocked during delay
 */
export const arduinoNapSketch = (p: p5) => {
  let isAwake = true;
  let napTimer = 0;
  let napDuration = 2000;
  let lastStateChange = 0;
  let ledOn = false;

  p.setup = () => {
    p.createCanvas(400, 280);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    p.background(30);

    // State machine for blinking simulation
    const now = p.millis();
    if (isAwake) {
      if (now - lastStateChange > 100) {
        ledOn = !ledOn;
        isAwake = false;
        napTimer = napDuration;
        lastStateChange = now;
      }
    } else {
      napTimer -= p.deltaTime;
      if (napTimer <= 0) {
        isAwake = true;
        lastStateChange = now;
      }
    }

    // Title
    p.fill(255);
    p.textSize(16);
    p.noStroke();
    p.text("Arduino's Nap Time! 😴", p.width / 2, 25);

    // Arduino "character"
    const arduinoX = p.width / 2;
    const arduinoY = 120;

    // Body (simplified board shape)
    p.fill(0, 80, 140);
    p.stroke(0, 60, 100);
    p.strokeWeight(3);
    p.rect(arduinoX - 60, arduinoY - 40, 120, 80, 10);

    // Face based on state
    if (isAwake) {
      // Awake eyes (open)
      p.fill(255);
      p.noStroke();
      p.ellipse(arduinoX - 20, arduinoY - 10, 25, 25);
      p.ellipse(arduinoX + 20, arduinoY - 10, 25, 25);

      // Pupils
      p.fill(30);
      p.ellipse(arduinoX - 20, arduinoY - 10, 12, 12);
      p.ellipse(arduinoX + 20, arduinoY - 10, 12, 12);

      // Happy mouth
      p.noFill();
      p.stroke(255);
      p.strokeWeight(3);
      p.arc(arduinoX, arduinoY + 15, 40, 25, 0, p.PI);
    } else {
      // Sleeping eyes (closed lines)
      p.stroke(255);
      p.strokeWeight(3);
      p.line(arduinoX - 30, arduinoY - 10, arduinoX - 10, arduinoY - 10);
      p.line(arduinoX + 10, arduinoY - 10, arduinoX + 30, arduinoY - 10);

      // Sleeping mouth (small 'o')
      p.noFill();
      p.ellipse(arduinoX, arduinoY + 15, 15, 20);

      // Z's for sleeping
      p.fill(200, 200, 255);
      p.noStroke();
      p.textSize(20);
      const zOffset = (p.millis() / 500) % 30;
      p.text('Z', arduinoX + 50 + zOffset * 0.3, arduinoY - 30 - zOffset);
      p.textSize(16);
      p.text('z', arduinoX + 60 + zOffset * 0.5, arduinoY - 45 - zOffset * 1.2);
      p.textSize(12);
      p.text('z', arduinoX + 65 + zOffset * 0.6, arduinoY - 55 - zOffset * 1.3);
    }

    // LED indicator
    const ledX = arduinoX + 45;
    const ledY = arduinoY + 25;

    if (ledOn) {
      p.noStroke();
      for (let i = 3; i > 0; i--) {
        p.fill(255, 200, 0, 50 * i);
        p.ellipse(ledX, ledY, 8 + i * 4, 8 + i * 4);
      }
      p.fill(255, 200, 50);
    } else {
      p.fill(80, 60, 30);
    }
    p.stroke(60);
    p.strokeWeight(1);
    p.ellipse(ledX, ledY, 10, 10);

    // Status display
    p.noStroke();
    if (isAwake) {
      p.fill('#4CAF50');
      p.textSize(14);
      p.text('🏃 Arduino is AWAKE! Working hard!', p.width / 2, 195);
    } else {
      p.fill('#f44336');
      p.textSize(14);
      p.text('😴 Arduino is NAPPING! delay(' + napDuration + ')', p.width / 2, 195);

      // Nap countdown
      p.fill(255);
      p.textSize(12);
      p.text('Waking up in: ' + Math.max(0, Math.round(napTimer)) + 'ms', p.width / 2, 215);
    }

    // Code display at bottom
    p.fill(40);
    p.rect(50, 235, 300, 35, 5);

    p.textSize(11);
    p.textAlign(p.LEFT, p.CENTER);

    p.fill(150);
    p.text('digitalWrite(LED, ' + (ledOn ? 'HIGH' : 'LOW') + ');', 60, 245);
    p.fill(isAwake ? '#969696' : '#f44336');
    p.text('delay(' + napDuration + '); // ← ', 60, 260);
    p.fill(isAwake ? '#969696' : '#ff9800');
    p.text(isAwake ? '' : 'SLEEPING!', 185, 260);

    // Instruction
    p.textAlign(p.CENTER, p.CENTER);
    p.fill(100);
    p.textSize(10);
    p.text('During delay(), Arduino sleeps and cannot do anything else!', p.width / 2, p.height - 8);
  };
};
