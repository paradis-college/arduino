/**
 * P2-C1-L5 IR Communication - GIF 2
 * Hex code display updating per virtual button pressed
 */
import type p5 from 'p5';

export const irHexDisplaySketch = (p: p5) => {
  const buttons = [
    { label: '1', code: '0xFF30CF', x: 0, y: 0 },
    { label: '2', code: '0xFF18E7', x: 1, y: 0 },
    { label: '3', code: '0xFF7A85', x: 2, y: 0 },
    { label: '4', code: '0xFF10EF', x: 0, y: 1 },
    { label: '5', code: '0xFF38C7', x: 1, y: 1 },
    { label: '6', code: '0xFF5AA5', x: 2, y: 1 },
    { label: '7', code: '0xFF42BD', x: 0, y: 2 },
    { label: '8', code: '0xFF4AB5', x: 1, y: 2 },
    { label: '9', code: '0xFF52AD', x: 2, y: 2 },
    { label: '*', code: '0xFF22DD', x: 0, y: 3 },
    { label: '0', code: '0xFF6897', x: 1, y: 3 },
    { label: '#', code: '0xFFB04F', x: 2, y: 3 },
  ];

  let currentCode = '--------';
  let currentLabel = '-';
  let flashTimer = 0;
  let pressedButton = -1;
  const history: string[] = [];

  p.setup = () => {
    p.createCanvas(400, 250);
    p.textFont('monospace');
  };

  p.draw = () => {
    p.background(30, 35, 45);

    if (flashTimer > 0) flashTimer--;

    // Remote control body
    p.fill(50, 50, 60);
    p.stroke(70, 70, 80);
    p.strokeWeight(2);
    p.rect(20, 20, 130, 210, 15);

    // IR LED
    p.fill(flashTimer > 0 ? p.color(150, 50, 150) : p.color(80, 30, 80));
    p.noStroke();
    p.ellipse(85, 35, 12, 12);

    // Draw buttons
    const btnSize = 32;
    const startX = 35;
    const startY = 55;
    const gap = 38;

    buttons.forEach((btn, i) => {
      const bx = startX + btn.x * gap;
      const by = startY + btn.y * gap;

      const isPressed = pressedButton === i;
      p.fill(isPressed ? p.color(100, 150, 200) : p.color(80, 80, 90));
      p.stroke(isPressed ? p.color(150, 200, 255) : p.color(100, 100, 110));
      p.strokeWeight(1);
      p.rect(bx, by, btnSize, btnSize, 5);

      p.fill(255);
      p.noStroke();
      p.textSize(14);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(btn.label, bx + btnSize / 2, by + btnSize / 2);
    });

    // Hex display panel
    p.fill(20, 25, 35);
    p.stroke(100, 150, 200);
    p.strokeWeight(2);
    p.rect(170, 20, 210, 80, 10);

    // Display label
    p.fill(100, 150, 200);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.LEFT, p.TOP);
    p.text('IR Receiver Output:', 180, 28);

    // Hex code display
    p.fill(flashTimer > 0 ? p.color(100, 255, 150) : p.color(150, 200, 150));
    p.textSize(22);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(currentCode, 275, 55);

    // Button label
    p.fill(255, 200, 100);
    p.textSize(14);
    p.text(`Button: ${currentLabel}`, 275, 85);

    // History panel
    p.fill(40, 45, 55);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(170, 110, 210, 120, 5);

    p.fill(150);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.LEFT, p.TOP);
    p.text('Recent Codes:', 180, 118);

    // Show history
    p.textSize(11);
    p.textAlign(p.LEFT, p.CENTER);
    for (let i = 0; i < Math.min(history.length, 5); i++) {
      const entry = history[history.length - 1 - i];
      p.fill(200 - i * 30);
      p.text(entry, 180, 140 + i * 18);
    }

    // Instructions
    p.fill(120);
    p.textSize(10);
    p.textAlign(p.CENTER, p.BOTTOM);
    p.text('Click remote buttons to send IR codes', 200, 248);
  };

  p.mousePressed = () => {
    const btnSize = 32;
    const startX = 35;
    const startY = 55;
    const gap = 38;

    buttons.forEach((btn, i) => {
      const bx = startX + btn.x * gap;
      const by = startY + btn.y * gap;

      if (p.mouseX > bx && p.mouseX < bx + btnSize &&
          p.mouseY > by && p.mouseY < by + btnSize) {
        currentCode = btn.code;
        currentLabel = btn.label;
        flashTimer = 15;
        pressedButton = i;
        history.push(`[${btn.label}] ${btn.code}`);
        if (history.length > 10) history.shift();

        setTimeout(() => {
          pressedButton = -1;
        }, 150);
      }
    });
  };
};
