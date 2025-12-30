/**
 * P5-C3-L1 Bluetooth Communication Sketch 1
 * Phone sending commands to Arduino over BT symbol.
 */
import type p5 from 'p5';

export const bluetoothSketch = (p: p5) => {
  let ledOn = false;
  let sending = false;
  let signalX = 0;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);

    if (sending) {
      signalX += 5;
      if (signalX > 250) {
        ledOn = !ledOn;
        sending = false;
        signalX = 0;
      }
    }

    drawPhone();
    drawArduino();
    drawSignal();
    drawLED();
    drawLabels();
  };

  p.mousePressed = () => {
    if (p.mouseX > 80 && p.mouseX < 160 && p.mouseY > 200 && p.mouseY < 260) {
      sending = true;
      signalX = 0;
    }
  };

  const drawPhone = () => {
    // Phone body
    p.fill(40, 40, 50);
    p.stroke(80);
    p.strokeWeight(3);
    p.rect(60, 100, 100, 180, 15);

    // Screen
    p.fill(50, 60, 70);
    p.noStroke();
    p.rect(70, 115, 80, 140, 5);

    // App interface
    p.fill(100, 150, 200);
    p.rect(80, 130, 60, 30, 5);
    p.fill(255);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('BT App', 110, 145);

    // Toggle button
    p.fill(ledOn ? p.color(100, 200, 100) : p.color(200, 100, 100));
    p.stroke(ledOn ? p.color(80, 180, 80) : p.color(180, 80, 80));
    p.strokeWeight(2);
    p.rect(80, 200, 60, 40, 8);

    p.fill(255);
    p.noStroke();
    p.textSize(11);
    p.text(ledOn ? 'OFF' : 'ON', 110, 220);

    // Bluetooth symbol
    p.fill(100, 150, 255);
    p.textSize(16);
    p.text('🔵', 110, 175);

    // Label
    p.fill(200);
    p.textSize(11);
    p.text('Smartphone', 110, 300);
  };

  const drawArduino = () => {
    p.fill(30, 60, 100);
    p.stroke(50, 80, 120);
    p.strokeWeight(2);
    p.rect(400, 130, 100, 80, 5);

    // HC-05 module
    p.fill(40, 40, 50);
    p.rect(380, 150, 25, 40, 3);
    p.fill(100, 150, 255);
    p.textSize(8);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('HC', 392, 163);
    p.text('05', 392, 175);

    // Chip
    p.fill(30, 30, 40);
    p.rect(420, 145, 40, 35, 2);

    p.fill(200);
    p.textSize(11);
    p.text('Arduino + BT', 450, 240);
  };

  const drawSignal = () => {
    if (!sending) return;

    const baseX = 160;
    const y = 170;

    // Bluetooth waves
    p.noFill();
    p.stroke(100, 150, 255, 200);
    p.strokeWeight(2);

    for (let i = 0; i < 3; i++) {
      const x = baseX + signalX + i * 30;
      if (x < 380) {
        p.arc(x, y, 20, 30, -p.QUARTER_PI, p.QUARTER_PI);
        p.arc(x, y, 20, 30, p.PI - p.QUARTER_PI, p.PI + p.QUARTER_PI);
      }
    }
  };

  const drawLED = () => {
    const x = 520;
    const y = 170;

    if (ledOn) {
      p.noStroke();
      for (let r = 35; r > 0; r -= 7) {
        p.fill(100, 255, 100, (1 - r / 35) * 150);
        p.ellipse(x, y, r * 2, r * 2);
      }
    }

    p.fill(ledOn ? p.color(100, 255, 100) : p.color(50, 80, 50));
    p.stroke(80);
    p.strokeWeight(2);
    p.ellipse(x, y, 35, 35);

    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.text(ledOn ? 'ON' : 'OFF', x, y);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Bluetooth Communication', 50, 340);
    p.text('→ Phone sends commands wirelessly', 60, 360);

    p.fill(150);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Click the ON/OFF button to control LED via Bluetooth', 300, 385);
  };
};

export default bluetoothSketch;
