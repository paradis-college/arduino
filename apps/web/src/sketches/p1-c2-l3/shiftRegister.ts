/**
 * P1-C2-L3 GIF2: 74HC595 Shift Register
 * "74HC595 bit shifting along 8 outputs lighting LEDs sequentially."
 */
import type p5 from 'p5';

export const shiftRegisterSketch = (p: p5): void => {
  let shiftData = 0b00000001;
  let clockPulse = 0;
  let lastShift = 0;
  let shiftSpeed = 300; // ms between shifts
  let direction = 1; // 1 = right, -1 = left
  let pattern: 'chase' | 'fill' | 'bounce' | 'random' = 'chase';

  p.setup = () => {
    p.createCanvas(400, 300);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    p.background(30, 30, 40);

    // Auto-shift
    if (p.millis() - lastShift > shiftSpeed) {
      updatePattern();
      lastShift = p.millis();
      clockPulse = 1;
    } else {
      clockPulse = Math.max(0, clockPulse - 0.1);
    }

    // Title
    p.fill(200);
    p.textSize(14);
    p.text('74HC595 Shift Register', p.width/2, 20);

    // Draw IC chip
    const chipX = 80;
    const chipY = 80;
    const chipW = 100;
    const chipH = 140;

    p.fill(40);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(chipX, chipY, chipW, chipH, 3);

    // IC notch
    p.fill(30);
    p.noStroke();
    p.arc(chipX + chipW/2, chipY, 20, 20, 0, p.PI);

    // IC label
    p.fill(200);
    p.textSize(10);
    p.text('74HC595', chipX + chipW/2, chipY + 20);

    // Pin labels (left side)
    const leftPins = ['QB', 'QC', 'QD', 'QE', 'QF', 'QG', 'QH', 'GND'];
    const rightPins = ['Vcc', 'QA', 'SER', 'OE', 'RCLK', 'SRCLK', 'SRCLR', 'QH\''];

    p.textSize(7);
    leftPins.forEach((pin, i) => {
      const y = chipY + 30 + i * 14;
      p.fill(150);
      p.text(pin, chipX + 15, y);
      p.stroke(100);
      p.strokeWeight(1);
      p.line(chipX - 10, y, chipX, y);
    });

    rightPins.forEach((pin, i) => {
      const y = chipY + 30 + i * 14;
      p.fill(150);
      p.noStroke();
      p.text(pin, chipX + chipW - 15, y);
      p.stroke(100);
      p.strokeWeight(1);
      p.line(chipX + chipW, y, chipX + chipW + 10, y);
    });

    // Clock signal animation
    p.fill(clockPulse > 0.5 ? p.color(0, 255, 255) : p.color(80));
    p.noStroke();
    p.ellipse(chipX + chipW + 25, chipY + 30 + 4 * 14, 8, 8);

    // Draw output LEDs
    const ledStartX = 230;
    const ledY = 100;
    const ledSpacing = 20;

    p.fill(150);
    p.textSize(10);
    p.text('Outputs Q0-Q7', ledStartX + 70, ledY - 25);

    for (let i = 0; i < 8; i++) {
      const x = ledStartX + i * ledSpacing;
      const isOn = (shiftData >> i) & 1;

      // LED
      p.fill(isOn ? p.color(255, 50, 50) : p.color(50));
      p.stroke(isOn ? p.color(255, 100, 100) : p.color(80));
      p.strokeWeight(1);
      p.ellipse(x, ledY, 15, 15);

      // LED glow
      if (isOn) {
        p.noStroke();
        p.fill(255, 50, 50, 100);
        p.ellipse(x, ledY, 25, 25);
      }

      // Bit label
      p.fill(150);
      p.noStroke();
      p.textSize(8);
      p.text(`Q${i}`, x, ledY + 20);
    }

    // Binary display
    p.fill(50);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(220, 140, 160, 40, 5);

    p.fill(0, 255, 100);
    p.noStroke();
    p.textSize(16);
    let binary = shiftData.toString(2).padStart(8, '0');
    p.textAlign(p.LEFT, p.CENTER);
    p.text('0b' + binary, 235, 160);

    p.textAlign(p.CENTER, p.CENTER);

    // Hex and decimal
    p.fill(150);
    p.textSize(10);
    p.text(`Hex: 0x${shiftData.toString(16).toUpperCase().padStart(2, '0')}  Dec: ${shiftData}`, 300, 175);

    // Pattern selector buttons
    const patterns: ('chase' | 'fill' | 'bounce' | 'random')[] = ['chase', 'fill', 'bounce', 'random'];
    p.textSize(9);

    patterns.forEach((pat, i) => {
      const bx = 230 + i * 45;
      const by = 200;
      const isSelected = pat === pattern;

      p.fill(isSelected ? p.color(0, 100, 200) : p.color(60));
      p.stroke(isSelected ? p.color(0, 150, 255) : p.color(80));
      p.strokeWeight(1);
      p.rect(bx - 18, by - 10, 36, 20, 3);

      p.fill(isSelected ? 255 : 150);
      p.noStroke();
      p.text(pat, bx, by);
    });

    // Speed slider
    p.fill(150);
    p.textSize(10);
    p.text('Speed:', 245, 240);

    p.fill(60);
    p.noStroke();
    p.rect(280, 235, 100, 10, 3);

    const sliderPos = p.map(shiftSpeed, 500, 50, 0, 100);
    p.fill(0, 200, 255);
    p.rect(280, 235, sliderPos, 10, 3);

    // Timing diagram
    const diagramY = 260;
    p.fill(150);
    p.textSize(9);
    p.text('Clock', 60, diagramY);
    p.text('Data', 60, diagramY + 20);

    // Clock wave
    p.stroke(0, 255, 255);
    p.strokeWeight(1);
    p.noFill();
    p.beginShape();
    for (let x = 0; x < 100; x++) {
      const t = (x + p.frameCount * 2) % 20;
      const high = t < 5;
      p.vertex(90 + x * 1.5, diagramY + (high ? -5 : 5));
    }
    p.endShape();

    // Data wave
    p.stroke(255, 200, 0);
    p.beginShape();
    for (let x = 0; x < 100; x++) {
      const bit = (shiftData >> (Math.floor(x / 12) % 8)) & 1;
      p.vertex(90 + x * 1.5, diagramY + 20 + (bit ? -5 : 5));
    }
    p.endShape();

    // Instructions
    p.fill(100);
    p.textSize(9);
    p.text('Click patterns to change • Drag speed slider', p.width/2, p.height - 8);
  };

  function updatePattern() {
    switch (pattern) {
      case 'chase':
        shiftData = shiftData << 1;
        if (shiftData > 0b10000000) shiftData = 0b00000001;
        break;
      case 'fill':
        if (shiftData === 0b11111111) {
          shiftData = 0b00000000;
        } else {
          shiftData = (shiftData << 1) | 1;
        }
        break;
      case 'bounce':
        if (direction === 1) {
          shiftData = shiftData << 1;
          if (shiftData >= 0b10000000) direction = -1;
        } else {
          shiftData = shiftData >> 1;
          if (shiftData <= 0b00000001) direction = 1;
        }
        if (shiftData === 0) shiftData = 1;
        break;
      case 'random':
        shiftData = Math.floor(Math.random() * 256);
        break;
    }
  }

  p.mousePressed = () => {
    // Pattern buttons
    const patterns: ('chase' | 'fill' | 'bounce' | 'random')[] = ['chase', 'fill', 'bounce', 'random'];
    patterns.forEach((pat, i) => {
      const bx = 230 + i * 45;
      const by = 200;
      if (p.mouseX > bx - 18 && p.mouseX < bx + 18 && p.mouseY > by - 10 && p.mouseY < by + 10) {
        pattern = pat;
        if (pat === 'chase') shiftData = 0b00000001;
        else if (pat === 'fill') shiftData = 0b00000001;
        else if (pat === 'bounce') { shiftData = 0b00000001; direction = 1; }
      }
    });

    // Speed slider
    if (p.mouseX > 280 && p.mouseX < 380 && p.mouseY > 230 && p.mouseY < 250) {
      shiftSpeed = p.map(p.mouseX - 280, 0, 100, 500, 50);
    }
  };

  p.mouseDragged = () => {
    if (p.mouseX > 280 && p.mouseX < 380 && p.mouseY > 220 && p.mouseY < 260) {
      shiftSpeed = p.constrain(p.map(p.mouseX - 280, 0, 100, 500, 50), 50, 500);
    }
  };
};
