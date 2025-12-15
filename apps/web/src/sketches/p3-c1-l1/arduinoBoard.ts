import type p5 from 'p5';

/**
 * Arduino board visualization showing the built-in LED location
 */
export const arduinoBoardSketch = (p: p5) => {
  let ledOn = false;
  let lastToggle = 0;

  p.setup = () => {
    p.createCanvas(400, 300);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    p.background(30);

    // Toggle LED
    if (p.millis() - lastToggle > 800) {
      ledOn = !ledOn;
      lastToggle = p.millis();
    }

    // Arduino board
    const boardX = 100;
    const boardY = 50;
    const boardW = 200;
    const boardH = 200;

    // Board body (blue)
    p.fill(0, 80, 140);
    p.stroke(0, 60, 100);
    p.strokeWeight(3);
    p.rect(boardX, boardY, boardW, boardH, 8);

    // USB port
    p.fill(180);
    p.stroke(120);
    p.strokeWeight(1);
    p.rect(boardX + boardW / 2 - 25, boardY - 15, 50, 20, 3);
    p.fill(50);
    p.rect(boardX + boardW / 2 - 18, boardY - 12, 36, 14);

    // Power barrel
    p.fill(30);
    p.stroke(20);
    p.ellipse(boardX + 30, boardY - 8, 25, 15);

    // Microcontroller chip
    p.fill(30, 30, 35);
    p.stroke(50);
    p.strokeWeight(1);
    p.rect(boardX + boardW / 2 - 40, boardY + 70, 80, 60, 3);

    // Chip pins
    p.fill(180);
    for (let i = 0; i < 8; i++) {
      p.rect(boardX + boardW / 2 - 45, boardY + 78 + i * 6, 8, 3);
      p.rect(boardX + boardW / 2 + 37, boardY + 78 + i * 6, 8, 3);
    }

    // Digital pins header
    p.fill(40);
    p.rect(boardX + 15, boardY + 20, boardW - 30, 15, 2);

    // Pin holes
    p.fill(20);
    for (let i = 0; i < 14; i++) {
      p.ellipse(boardX + 25 + i * 11, boardY + 27, 6, 6);
    }

    // Pin 13 highlight
    const pin13X = boardX + 25 + 13 * 11;
    const pin13Y = boardY + 27;

    // Highlight circle around pin 13
    p.noFill();
    p.stroke(255, 200, 0);
    p.strokeWeight(3);
    p.ellipse(pin13X, pin13Y, 18, 18);

    // Built-in LED (the "L" LED near pin 13)
    const ledX = boardX + boardW - 40;
    const ledY = boardY + 55;

    // LED glow when on
    if (ledOn) {
      p.noStroke();
      for (let i = 5; i > 0; i--) {
        p.fill(255, 180, 0, 30 * i);
        p.ellipse(ledX, ledY, 10 + i * 6, 10 + i * 6);
      }
    }

    // LED itself
    p.fill(ledOn ? p.color(255, 200, 50) : p.color(100, 80, 40));
    p.stroke(80);
    p.strokeWeight(1);
    p.ellipse(ledX, ledY, 10, 10);

    // LED label
    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.text('L', ledX, ledY + 15);

    // Arrow pointing to LED
    p.stroke(255, 200, 0);
    p.strokeWeight(2);
    const arrowStartX = ledX + 50;
    const arrowStartY = ledY;
    p.line(arrowStartX, arrowStartY, ledX + 15, ledY);
    p.line(ledX + 20, ledY - 5, ledX + 15, ledY);
    p.line(ledX + 20, ledY + 5, ledX + 15, ledY);

    // Text label for LED
    p.noStroke();
    p.fill(255, 200, 0);
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Built-in LED!', arrowStartX + 5, arrowStartY);
    p.text('(Pin 13)', arrowStartX + 5, arrowStartY + 15);

    // Board labels
    p.fill(200);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(14);
    p.text('Arduino UNO', boardX + boardW / 2, boardY + boardH - 20);

    // Pin labels
    p.textSize(8);
    p.fill(150);
    p.text('0  1  2  3  4  5  6  7  8  9  10 11 12 13', boardX + boardW / 2, boardY + 45);

    // Status indicator
    p.textSize(12);
    p.fill(ledOn ? '#4CAF50' : '#666');
    p.text(ledOn ? '💡 LED is ON!' : '⚫ LED is OFF', p.width / 2, p.height - 20);
  };
};
