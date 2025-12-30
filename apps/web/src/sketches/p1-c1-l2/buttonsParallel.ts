/**
 * P1-C1-L2 GIF3: Buttons in Parallel (OR Logic)
 * "Two buttons in parallel; LED lights when any pressed (OR logic)."
 */
import type p5 from 'p5';

export const buttonsParallelSketch = (p: p5): void => {
  let button1Pressed = false;
  let button2Pressed = false;
  let dotPos = 0;

  p.setup = () => {
    p.createCanvas(400, 280);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    p.background(30, 30, 40);

    const ledOn = button1Pressed || button2Pressed;

    // Title
    p.fill(200);
    p.textSize(14);
    p.text('Buttons in PARALLEL (OR Logic)', p.width/2, 20);

    // Circuit
    const startX = 40;
    const y = 130;

    // Battery
    p.stroke(150);
    p.strokeWeight(2);
    p.line(startX, y - 60, startX, y + 60);
    p.line(startX - 10, y - 60, startX + 10, y - 60);
    p.line(startX - 5, y - 50, startX + 5, y - 50);
    p.fill(150);
    p.noStroke();
    p.textSize(10);
    p.text('+', startX, y - 75);
    p.text('−', startX, y + 75);

    // Top wire to junction
    p.stroke(150);
    p.strokeWeight(2);
    p.line(startX, y - 60, 100, y - 60);

    // Junction point
    p.fill(150);
    p.noStroke();
    p.ellipse(100, y - 60, 6, 6);

    // Branch to button 1 (top path)
    p.stroke(150);
    p.strokeWeight(2);
    p.line(100, y - 60, 100, y - 40);
    drawButton(p, 100, y - 40, button1Pressed, 'SW1');
    p.line(160, y - 40, 200, y - 40);
    p.line(200, y - 40, 200, y - 60);

    // Branch to button 2 (bottom path)
    p.stroke(150);
    p.line(100, y - 60, 100, y + 20);
    drawButton(p, 100, y + 20, button2Pressed, 'SW2');
    p.line(160, y + 20, 200, y + 20);
    p.line(200, y + 20, 200, y - 60);

    // Junction after buttons
    p.fill(150);
    p.noStroke();
    p.ellipse(200, y - 60, 6, 6);

    // Wire to LED
    p.stroke(150);
    p.strokeWeight(2);
    p.line(200, y - 60, 280, y - 60);
    p.line(280, y - 60, 280, y - 20);

    // LED
    drawLED(p, 280, y - 20, ledOn);

    // Return wire
    p.stroke(150);
    p.strokeWeight(2);
    p.line(280, y + 10, 280, y + 60);
    p.line(280, y + 60, startX, y + 60);

    // Current dots
    if (ledOn) {
      dotPos = (dotPos + 3) % 300;
      p.fill(0, 255, 255);
      p.noStroke();

      for (let i = 0; i < 3; i++) {
        const dp = (dotPos + i * 100) % 300;
        let px: number, py: number;

        if (dp < 60) {
          px = startX + dp;
          py = y - 60;
        } else if (dp < 100) {
          px = 100 + (dp - 60) * 2;
          py = y - 60;
        } else if (dp < 140) {
          px = 280;
          py = y - 60 + (dp - 100);
        } else if (dp < 220) {
          px = 280 - (dp - 140) * 3;
          py = y + 60;
        } else {
          px = startX;
          py = y + 60 - (dp - 220) * 1.5;
        }

        p.ellipse(px, py, 6, 6);
      }
    }

    // OR gate truth table
    p.fill(50);
    p.stroke(100);
    p.strokeWeight(1);
    p.rect(240, 160, 150, 90, 5);

    p.fill(200);
    p.noStroke();
    p.textSize(11);
    p.text('OR Truth Table', 315, 175);

    p.textSize(9);
    p.text('SW1  SW2  LED', 315, 192);

    const rows = [
      {s1: false, s2: false, led: false},
      {s1: true, s2: false, led: true},
      {s1: false, s2: true, led: true},
      {s1: true, s2: true, led: true}
    ];

    rows.forEach((row, i) => {
      const ry = 208 + i * 12;
      const isActive = row.s1 === button1Pressed && row.s2 === button2Pressed;

      if (isActive) {
        p.fill(0, 100, 255, 50);
        p.noStroke();
        p.rect(245, ry - 6, 140, 12);
      }

      p.fill(isActive ? 255 : 150);
      p.text(`${row.s1 ? '1' : '0'}     ${row.s2 ? '1' : '0'}     ${row.led ? '1' : '0'}`, 315, ry);
    });

    // Status display
    p.fill(ledOn ? p.color(100, 255, 100) : p.color(255, 100, 100));
    p.textSize(14);
    p.text(ledOn ? 'LED ON' : 'LED OFF', 80, 200);

    p.fill(150);
    p.textSize(10);
    p.text('Either switch can', 80, 220);
    p.text('complete the circuit', 80, 232);

    // Instructions
    p.fill(100);
    p.textSize(10);
    p.text('Click on buttons to toggle', p.width/2, p.height - 10);
  };

  function drawButton(p: p5, x: number, y: number, pressed: boolean, label: string) {
    p.stroke(150);
    p.strokeWeight(3);
    p.point(x, y);
    p.point(x + 60, y);

    p.strokeWeight(2);
    if (pressed) {
      p.stroke(100, 255, 100);
      p.line(x, y, x + 60, y);
    } else {
      p.stroke(255, 100, 100);
      p.line(x, y, x + 50, y - 15);
    }

    p.noFill();
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(x - 5, y - 20, 70, 30, 3);

    p.fill(150);
    p.noStroke();
    p.textSize(9);
    p.text(label, x + 30, y + 18);
  }

  function drawLED(p: p5, x: number, y: number, on: boolean) {
    p.strokeWeight(2);
    p.stroke(150);
    p.fill(on ? p.color(255, 220, 0) : p.color(80));
    p.triangle(x - 10, y - 10, x + 10, y - 10, x, y + 10);
    p.line(x - 10, y + 10, x + 10, y + 10);

    if (on) {
      p.noStroke();
      p.fill(255, 220, 0, 100);
      p.ellipse(x, y, 40, 40);
    }
  }

  p.mousePressed = () => {
    // Check button 1 click (top)
    if (p.mouseX > 95 && p.mouseX < 165 && p.mouseY > 70 && p.mouseY < 110) {
      button1Pressed = !button1Pressed;
    }
    // Check button 2 click (bottom)
    if (p.mouseX > 95 && p.mouseX < 165 && p.mouseY > 130 && p.mouseY < 170) {
      button2Pressed = !button2Pressed;
    }
  };
};
