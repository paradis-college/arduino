import type p5 from 'p5';

/**
 * Shows button press being missed during delay
 */
export const missedButtonSketch = (p: p5) => {
  let isBlocked = false;
  let blockTimer = 0;
  const blockDuration = 3000;
  let buttonPressed = false;
  let buttonMissed = false;
  let lastCycleStart = 0;
  let ledOn = false;
  let missCount = 0;

  p.setup = () => {
    p.createCanvas(400, 280);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    p.background(30);

    // Simulation of blink cycle with delay
    const now = p.millis();
    if (!isBlocked) {
      if (now - lastCycleStart > 100) {
        ledOn = !ledOn;
        isBlocked = true;
        blockTimer = blockDuration;
        lastCycleStart = now;
      }
    } else {
      blockTimer -= p.deltaTime;
      if (blockTimer <= 0) {
        isBlocked = false;
        buttonMissed = false; // Reset for next cycle
      }
    }

    // Title
    p.fill(255);
    p.textSize(16);
    p.noStroke();
    p.text('Missed Button Press! 🔘', p.width / 2, 25);

    // LED
    const ledX = 100;
    const ledY = 100;
    
    if (ledOn) {
      p.noStroke();
      for (let i = 4; i > 0; i--) {
        p.fill(255, 200, 0, 40 * i);
        p.ellipse(ledX, ledY, 30 + i * 10, 30 + i * 10);
      }
      p.fill(255, 220, 50);
    } else {
      p.fill(80, 60, 30);
    }
    p.stroke(100);
    p.strokeWeight(2);
    p.ellipse(ledX, ledY, 40, 40);
    
    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.text('LED', ledX, ledY + 35);

    // Button
    const btnX = 300;
    const btnY = 100;
    const btnHover = p.dist(p.mouseX, p.mouseY, btnX, btnY) < 30;

    // Button body
    p.fill(btnHover ? 80 : 60);
    p.stroke(100);
    p.strokeWeight(2);
    p.ellipse(btnX, btnY, 60, 60);

    // Button top
    p.fill(buttonPressed ? '#4CAF50' : (btnHover ? 180 : 150));
    p.ellipse(btnX, btnY - 3, 45, 45);

    p.fill(buttonPressed ? 255 : 50);
    p.noStroke();
    p.textSize(10);
    p.text('PUSH', btnX, btnY - 3);

    p.fill(200);
    p.textSize(10);
    p.text('Button', btnX, btnY + 45);

    // "Missed!" indicator
    if (buttonMissed) {
      p.fill(255, 100, 100);
      p.textSize(14);
      p.text('❌ MISSED!', btnX, btnY - 50);
      
      // X mark effect
      p.stroke(255, 100, 100);
      p.strokeWeight(3);
      const xSize = 20;
      p.line(btnX - xSize, btnY - 80 - xSize, btnX + xSize, btnY - 80 + xSize);
      p.line(btnX - xSize, btnY - 80 + xSize, btnX + xSize, btnY - 80 - xSize);
    }

    // Status panel
    p.fill(isBlocked ? 60 : 50, isBlocked ? 40 : 60, isBlocked ? 40 : 60);
    p.stroke(isBlocked ? '#f44336' : '#4CAF50');
    p.strokeWeight(2);
    p.rect(50, 160, 300, 50, 5);

    p.noStroke();
    if (isBlocked) {
      p.fill('#f44336');
      p.textSize(14);
      p.text('😴 Arduino is SLEEPING (delay)', 200, 175);
      p.fill(255);
      p.textSize(11);
      p.text(`Cannot read button! ${Math.round(blockTimer)}ms left...`, 200, 195);
    } else {
      p.fill('#4CAF50');
      p.textSize(14);
      p.text('👀 Arduino is AWAKE', 200, 175);
      p.fill(255);
      p.textSize(11);
      p.text('Can read the button now!', 200, 195);
    }

    // Miss counter
    p.fill(255, 100, 100);
    p.textSize(12);
    p.text(`Missed presses: ${missCount}`, p.width / 2, 230);

    // Instruction
    p.fill(150);
    p.textSize(11);
    p.text('Click the button during delay to see it get MISSED!', p.width / 2, p.height - 15);
  };

  p.mousePressed = () => {
    const btnX = 300;
    const btnY = 100;
    
    if (p.dist(p.mouseX, p.mouseY, btnX, btnY) < 30) {
      buttonPressed = true;
      
      if (isBlocked) {
        buttonMissed = true;
        missCount++;
      }
      
      setTimeout(() => {
        buttonPressed = false;
      }, 150);
    }
  };
};
