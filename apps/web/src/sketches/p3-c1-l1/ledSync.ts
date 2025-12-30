import type p5 from 'p5';

/**
 * Onboard LED + external LED glowing in sync
 * gif3: Onboard LED + external LED glowing in sync
 */
export const ledSyncSketch = (p: p5) => {
  let ledOn = false;
  let lastToggle = 0;
  const delayMs = 500;

  p.setup = () => {
    p.createCanvas(400, 280);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    p.background(30);

    // Title
    p.fill(255);
    p.textSize(16);
    p.noStroke();
    p.text('Synchronized LEDs', p.width / 2, 25);

    // Toggle LED
    if (p.millis() - lastToggle > delayMs) {
      ledOn = !ledOn;
      lastToggle = p.millis();
    }

    // Arduino board (simplified)
    const boardX = 80;
    const boardY = 80;
    const boardW = 100;
    const boardH = 140;

    p.fill(0, 100, 150);
    p.stroke(0, 80, 120);
    p.strokeWeight(2);
    p.rect(boardX, boardY, boardW, boardH, 5);

    // USB port
    p.fill(180);
    p.noStroke();
    p.rect(boardX + 35, boardY - 10, 30, 15);

    // Board label
    p.fill(255);
    p.textSize(10);
    p.text('Arduino', boardX + boardW / 2, boardY + boardH - 15);

    // Onboard LED (L)
    const onboardX = boardX + boardW - 25;
    const onboardY = boardY + 40;

    p.fill(50);
    p.noStroke();
    p.rect(onboardX - 8, onboardY - 5, 16, 10, 2);

    if (ledOn) {
      // LED glow
      for (let i = 3; i > 0; i--) {
        p.fill(255, 200, 0, 40 * i);
        p.ellipse(onboardX, onboardY, 8 + i * 6, 8 + i * 6);
      }
      p.fill(255, 220, 50);
    } else {
      p.fill(80, 50, 30);
    }
    p.ellipse(onboardX, onboardY, 8, 8);

    // LED label
    p.fill(200);
    p.textSize(8);
    p.text('L', onboardX, onboardY + 15);

    // External LED on breadboard
    const breadX = 230;
    const breadY = 80;
    const breadW = 120;
    const breadH = 140;

    // Breadboard
    p.fill(230, 230, 220);
    p.stroke(180);
    p.strokeWeight(1);
    p.rect(breadX, breadY, breadW, breadH, 3);

    // Breadboard holes
    p.fill(40);
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 5; col++) {
        p.ellipse(breadX + 20 + col * 20, breadY + 25 + row * 12, 5, 5);
      }
    }

    // External LED
    const extLedX = breadX + 60;
    const extLedY = breadY + 50;

    // LED body
    p.stroke(100);
    p.strokeWeight(1);
    if (ledOn) {
      // LED glow
      p.noStroke();
      for (let i = 4; i > 0; i--) {
        p.fill(255, 50, 50, 30 * i);
        p.ellipse(extLedX, extLedY, 20 + i * 10, 20 + i * 10);
      }
      p.fill(255, 80, 80);
    } else {
      p.fill(100, 30, 30);
    }
    p.stroke(80);
    p.ellipse(extLedX, extLedY, 20, 20);

    // LED legs
    p.stroke(150);
    p.strokeWeight(2);
    p.line(extLedX - 5, extLedY + 10, extLedX - 5, extLedY + 30);
    p.line(extLedX + 5, extLedY + 10, extLedX + 5, extLedY + 35);

    // Wires connecting Arduino to LED
    p.stroke(ledOn ? '#ff5722' : '#666');
    p.strokeWeight(2);
    p.noFill();
    p.beginShape();
    p.vertex(boardX + boardW, boardY + 80);
    p.vertex(boardX + boardW + 20, boardY + 80);
    p.vertex(extLedX - 5, extLedY + 30);
    p.endShape();

    p.stroke(50);
    p.beginShape();
    p.vertex(boardX + boardW, boardY + 90);
    p.vertex(boardX + boardW + 30, boardY + 90);
    p.vertex(extLedX + 5, extLedY + 35);
    p.endShape();

    // Sync indicator
    p.noStroke();
    p.fill(ledOn ? '#4CAF50' : '#666');
    p.textSize(14);
    p.text('SYNC', p.width / 2, p.height - 40);

    // Arrow between LEDs
    p.stroke(ledOn ? '#4CAF50' : '#666');
    p.strokeWeight(2);
    p.line(boardX + boardW + 10, 150, breadX - 10, 150);
    // Arrow head
    p.line(breadX - 10, 150, breadX - 20, 145);
    p.line(breadX - 10, 150, breadX - 20, 155);

    // Labels
    p.noStroke();
    p.fill(200);
    p.textSize(11);
    p.text('Onboard LED (L)', boardX + boardW / 2, boardY + boardH + 20);
    p.text('External LED', breadX + breadW / 2, breadY + breadH + 20);

    // Status
    p.fill(ledOn ? '#4CAF50' : '#f44336');
    p.textSize(12);
    p.text(ledOn ? 'Both LEDs ON' : 'Both LEDs OFF', p.width / 2, p.height - 15);
  };
};
