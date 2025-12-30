/**
 * P2-C3-L2 Touch Sensors Sketch 1
 * Touch pad glowing with ripple when finger icon touches.
 */
import type p5 from 'p5';

export const touchSensorSketch = (p: p5) => {
  let isTouching = false;
  let ripples: { x: number; y: number; radius: number; alpha: number }[] = [];
  let touchX = 200;
  let touchY = 200;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);

    updateRipples();
    drawTouchPad();
    drawRipples();
    drawFinger();
    drawIndicator();
    drawLabels();
  };

  p.mousePressed = () => {
    const padCx = 200;
    const padCy = 200;
    const padSize = 150;

    // Check if touching the pad
    if (p.mouseX > padCx - padSize / 2 && p.mouseX < padCx + padSize / 2 &&
        p.mouseY > padCy - padSize / 2 && p.mouseY < padCy + padSize / 2) {
      isTouching = true;
      touchX = p.mouseX;
      touchY = p.mouseY;

      // Create ripple
      ripples.push({
        x: touchX,
        y: touchY,
        radius: 10,
        alpha: 255
      });
    }
  };

  p.mouseReleased = () => {
    isTouching = false;
  };

  p.mouseDragged = () => {
    const padCx = 200;
    const padCy = 200;
    const padSize = 150;

    if (p.mouseX > padCx - padSize / 2 && p.mouseX < padCx + padSize / 2 &&
        p.mouseY > padCy - padSize / 2 && p.mouseY < padCy + padSize / 2) {
      isTouching = true;
      touchX = p.mouseX;
      touchY = p.mouseY;

      // Occasional ripples while dragging
      if (p.frameCount % 10 === 0) {
        ripples.push({
          x: touchX,
          y: touchY,
          radius: 10,
          alpha: 200
        });
      }
    } else {
      isTouching = false;
    }
  };

  const updateRipples = () => {
    for (let i = ripples.length - 1; i >= 0; i--) {
      ripples[i].radius += 3;
      ripples[i].alpha -= 5;

      if (ripples[i].alpha <= 0) {
        ripples.splice(i, 1);
      }
    }
  };

  const drawTouchPad = () => {
    const cx = 200;
    const cy = 200;
    const size = 150;

    // Glow effect when touching
    if (isTouching) {
      p.noStroke();
      for (let r = size + 40; r > size; r -= 8) {
        p.fill(100, 200, 255, (1 - (r - size) / 40) * 80);
        p.rect(cx - r / 2, cy - r / 2, r, r, 15);
      }
    }

    // Pad background
    const padColor = isTouching ? p.color(60, 80, 100) : p.color(50, 55, 65);
    p.fill(padColor);
    p.stroke(isTouching ? p.color(100, 200, 255) : p.color(100));
    p.strokeWeight(3);
    p.rect(cx - size / 2, cy - size / 2, size, size, 12);

    // Capacitive grid pattern
    p.stroke(isTouching ? p.color(80, 120, 150) : p.color(70, 75, 85));
    p.strokeWeight(1);
    for (let x = cx - size / 2 + 15; x < cx + size / 2; x += 20) {
      p.line(x, cy - size / 2 + 10, x, cy + size / 2 - 10);
    }
    for (let y = cy - size / 2 + 15; y < cy + size / 2; y += 20) {
      p.line(cx - size / 2 + 10, y, cx + size / 2 - 10, y);
    }

    // Touch point indicator
    if (isTouching) {
      p.fill(100, 200, 255, 150);
      p.noStroke();
      p.ellipse(touchX, touchY, 30, 30);
    }

    // Label
    p.fill(200);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Capacitive Touch Pad', cx, cy + size / 2 + 25);
    p.textSize(10);
    p.text('(Click or drag)', cx, cy + size / 2 + 40);
  };

  const drawRipples = () => {
    for (const ripple of ripples) {
      p.noFill();
      p.stroke(100, 200, 255, ripple.alpha);
      p.strokeWeight(2);
      p.ellipse(ripple.x, ripple.y, ripple.radius * 2, ripple.radius * 2);
    }
  };

  const drawFinger = () => {
    if (!isTouching) return;

    // Finger shadow
    p.fill(0, 0, 0, 50);
    p.noStroke();
    p.ellipse(touchX + 3, touchY + 3, 25, 20);

    // Finger tip
    p.fill(220, 180, 160);
    p.stroke(180, 150, 130);
    p.strokeWeight(2);
    p.ellipse(touchX, touchY - 5, 25, 35);

    // Fingernail
    p.fill(240, 220, 210);
    p.noStroke();
    p.arc(touchX, touchY - 18, 18, 12, p.PI, 0);
  };

  const drawIndicator = () => {
    const x = 450;
    const y = 200;
    const w = 120;
    const h = 100;

    // Indicator box
    p.fill(40, 45, 55);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x - w / 2, y - h / 2, w, h, 10);

    // Status LED
    if (isTouching) {
      // Glow
      p.noStroke();
      for (let r = 40; r > 0; r -= 8) {
        p.fill(100, 255, 100, (1 - r / 40) * 100);
        p.ellipse(x, y - 15, r, r);
      }
    }

    p.fill(isTouching ? p.color(100, 255, 100) : p.color(100, 100, 100));
    p.stroke(isTouching ? p.color(150, 255, 150) : p.color(80));
    p.strokeWeight(2);
    p.ellipse(x, y - 15, 30, 30);

    // Text
    p.fill(isTouching ? p.color(100, 255, 100) : p.color(150));
    p.noStroke();
    p.textSize(16);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(isTouching ? 'TOUCHED' : 'Ready', x, y + 25);

    // Digital value
    p.fill(200);
    p.textSize(12);
    p.text(`digitalRead: ${isTouching ? 'HIGH' : 'LOW'}`, x, y + 45);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Capacitive Touch Sensor', 50, 50);
    p.text('→ Detects touch via capacitance change', 60, 70);
    p.text('→ No pressure needed, just touch!', 60, 90);

    p.fill(150);
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Click and drag on the touch pad to interact', 300, 375);
  };
};

export default touchSensorSketch;
