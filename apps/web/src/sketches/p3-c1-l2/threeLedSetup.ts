import type p5 from 'p5';

/**
 * Shows 3 LEDs setup on breadboard
 */
export const threeLedSetupSketch = (p: p5) => {
  let highlightPin = 0;
  let lastUpdate = 0;

  p.setup = () => {
    p.createCanvas(400, 280);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    p.background(30);

    // Cycle through highlighting pins
    if (p.millis() - lastUpdate > 1000) {
      highlightPin = (highlightPin + 1) % 4; // 0 = none, 1-3 = pin
      lastUpdate = p.millis();
    }

    // Title
    p.fill(255);
    p.textSize(16);
    p.noStroke();
    p.text('Setting Up 3 LEDs! 💡💡💡', p.width / 2, 25);

    // Arduino board (simplified)
    const boardX = 30;
    const boardY = 70;
    const boardW = 100;
    const boardH = 140;

    p.fill(0, 80, 140);
    p.stroke(0, 60, 100);
    p.strokeWeight(2);
    p.rect(boardX, boardY, boardW, boardH, 5);

    // Pin labels on Arduino
    p.fill(200);
    p.textSize(10);
    p.noStroke();
    
    const pins = [9, 10, 11];
    const pinY = [90, 110, 130];
    
    for (let i = 0; i < 3; i++) {
      const isHighlighted = highlightPin === i + 1;
      
      // Pin
      p.fill(isHighlighted ? '#4CAF50' : '#282828');
      p.stroke(isHighlighted ? '#66bb6a' : '#3c3c3c');
      p.strokeWeight(isHighlighted ? 2 : 1);
      p.rect(boardX + boardW - 5, pinY[i], 15, 10, 2);
      
      // Pin label
      p.fill(isHighlighted ? '#4CAF50' : '#969696');
      p.noStroke();
      p.textAlign(p.LEFT, p.CENTER);
      p.text(`Pin ${pins[i]}`, boardX + 10, pinY[i] + 5);
    }

    // Breadboard
    const breadX = 180;
    const breadY = 60;
    const breadW = 190;
    const breadH = 160;

    p.fill(230, 230, 220);
    p.stroke(180);
    p.strokeWeight(1);
    p.rect(breadX, breadY, breadW, breadH, 3);

    // Breadboard holes
    p.fill(40);
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 5; col++) {
        p.ellipse(breadX + 25 + col * 20, breadY + 25 + row * 15, 5, 5);
      }
    }

    // Three LEDs on breadboard
    const ledColors = [
      { on: [255, 50, 50], off: [100, 30, 30], name: 'RED' },
      { on: [255, 200, 50], off: [100, 80, 30], name: 'YELLOW' },
      { on: [50, 255, 50], off: [30, 100, 30], name: 'GREEN' }
    ];

    for (let i = 0; i < 3; i++) {
      const ledX = breadX + 45 + i * 50;
      const ledY = breadY + 70;
      const isHighlighted = highlightPin === i + 1;
      const color = ledColors[i];

      // LED glow when highlighted
      if (isHighlighted) {
        p.noStroke();
        for (let j = 4; j > 0; j--) {
          p.fill(color.on[0], color.on[1], color.on[2], 30 * j);
          p.ellipse(ledX, ledY, 20 + j * 8, 20 + j * 8);
        }
      }

      // LED body
      p.fill(isHighlighted ? p.color(color.on[0], color.on[1], color.on[2]) : p.color(color.off[0], color.off[1], color.off[2]));
      p.stroke(80);
      p.strokeWeight(1);
      p.ellipse(ledX, ledY, 20, 20);

      // LED legs
      p.stroke(150);
      p.strokeWeight(2);
      p.line(ledX - 4, ledY + 10, ledX - 4, ledY + 25);
      p.line(ledX + 4, ledY + 10, ledX + 4, ledY + 30);

      // Label
      p.fill(isHighlighted ? 255 : 150);
      p.noStroke();
      p.textSize(9);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(color.name, ledX, ledY + 45);
      p.text(`Pin ${pins[i]}`, ledX, ledY + 57);
    }

    // Wires from Arduino to LEDs
    for (let i = 0; i < 3; i++) {
      const isHighlighted = highlightPin === i + 1;
      const ledX = breadX + 45 + i * 50 - 4;
      
      p.stroke(isHighlighted ? '#4CAF50' : '#666');
      p.strokeWeight(isHighlighted ? 3 : 2);
      p.noFill();
      p.bezier(
        boardX + boardW + 10, pinY[i] + 5,
        boardX + boardW + 40, pinY[i] + 5,
        ledX - 30, breadY + 95,
        ledX, breadY + 95
      );
    }

    // Code snippet at bottom
    p.fill(40);
    p.noStroke();
    p.rect(30, 235, 340, 35, 5);
    
    p.fill(150);
    p.textSize(10);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('pinMode(9, OUTPUT);', 40, 245);
    p.text('pinMode(10, OUTPUT);', 150, 245);
    p.text('pinMode(11, OUTPUT);', 260, 245);

    // Highlight current pin in code
    if (highlightPin > 0) {
      p.fill(100, 255, 100);
      const xPos = 40 + (highlightPin - 1) * 110;
      p.text(`pinMode(${pins[highlightPin - 1]}, OUTPUT);`, xPos, 245);
    }

    // Instruction
    p.fill(200);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(11);
    p.text('Three LEDs connected to pins 9, 10, and 11!', p.width / 2, 258);
  };
};
