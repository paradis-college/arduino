/**
 * P1-C1-L2 Buttons & Switches Sketch 1
 * Open button gap blocks current until pressed; LED turns on only when gap closes.
 */
import type p5 from 'p5';

export const buttonGapSketch = (p: p5) => {
  let buttonPressed = false;
  let ledBrightness = 0;
  let particles: { x: number; y: number; speed: number }[] = [];
  const numParticles = 12;

  // Circuit positions
  const batteryX = 80;
  const buttonX = 280;
  const ledX = 480;
  const wireY1 = 150;
  const wireY2 = 280;

  p.setup = () => {
    p.createCanvas(600, 400);

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: p.random(0, 1),
        y: 0,
        speed: p.random(0.004, 0.007)
      });
    }
  };

  p.draw = () => {
    p.background(30, 35, 45);

    drawBattery();
    drawWires();
    drawButton();
    drawLED();

    if (buttonPressed) {
      updateParticles();
    } else {
      drawBlockedParticles();
    }

    drawLabels();
    drawInstructions();
  };

  p.mousePressed = () => {
    // Check if mouse is over button
    if (p.mouseX > buttonX - 30 && p.mouseX < buttonX + 30 &&
        p.mouseY > wireY1 - 40 && p.mouseY < wireY1 + 40) {
      buttonPressed = true;
    }
  };

  p.mouseReleased = () => {
    buttonPressed = false;
  };

  const drawBattery = () => {
    p.fill(60, 60, 70);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(batteryX - 25, wireY1 + 20, 35, 90, 5);

    p.fill(180, 50, 50);
    p.rect(batteryX - 17, wireY1 + 5, 20, 15);
    p.fill(50, 50, 180);
    p.rect(batteryX - 17, wireY1 + 110, 20, 15);

    p.fill(255);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('+', batteryX - 7, wireY1 + 12);
    p.text('−', batteryX - 7, wireY1 + 117);
    p.text('5V', batteryX - 7, wireY1 + 65);
  };

  const drawWires = () => {
    p.stroke(100, 150, 200);
    p.strokeWeight(3);
    p.noFill();

    // Top wire from battery to button
    p.line(batteryX - 7, wireY1 + 5, batteryX - 7, wireY1);
    p.line(batteryX - 7, wireY1, buttonX - 35, wireY1);

    // Button to LED
    p.line(buttonX + 35, wireY1, ledX, wireY1);

    // LED down and back
    p.line(ledX, wireY1 + 70, ledX, wireY2);
    p.line(ledX, wireY2, batteryX - 7, wireY2);
    p.line(batteryX - 7, wireY2, batteryX - 7, wireY1 + 125);
  };

  const drawButton = () => {
    const y = wireY1;
    const gapSize = buttonPressed ? 0 : 20;

    // Button housing
    p.fill(50, 50, 60);
    p.stroke(80);
    p.strokeWeight(2);
    p.rect(buttonX - 30, y - 35, 60, 70, 8);

    // Button contact points
    p.fill(180, 150, 50);
    p.noStroke();
    p.rect(buttonX - 35, y - 5, 12, 10);
    p.rect(buttonX + 23, y - 5, 12, 10);

    // Gap visualization
    if (!buttonPressed) {
      // Draw gap
      p.stroke(255, 100, 100);
      p.strokeWeight(2);
      p.line(buttonX - 18, y, buttonX - 5, y - gapSize);
      p.line(buttonX + 5, y - gapSize, buttonX + 18, y);

      // Gap indicator
      p.fill(255, 100, 100);
      p.noStroke();
      p.textSize(10);
      p.text('OPEN', buttonX, y - 25);
    } else {
      // Draw closed connection
      p.stroke(100, 255, 100);
      p.strokeWeight(3);
      p.line(buttonX - 18, y, buttonX + 18, y);

      p.fill(100, 255, 100);
      p.noStroke();
      p.textSize(10);
      p.text('CLOSED', buttonX, y - 25);
    }

    // Push button cap
    const capY = buttonPressed ? y - 20 : y - 30;
    p.fill(buttonPressed ? p.color(100, 180, 100) : p.color(200, 80, 80));
    p.stroke(80);
    p.strokeWeight(2);
    p.ellipse(buttonX, capY, 35, 20);

    // Button label
    p.fill(255);
    p.noStroke();
    p.textSize(10);
    p.text('PUSH', buttonX, capY);
  };

  const drawLED = () => {
    const x = ledX;
    const y = wireY1 + 35;

    // LED glow
    if (ledBrightness > 0) {
      p.noStroke();
      for (let r = 50; r > 0; r -= 8) {
        p.fill(100, 255, 100, ledBrightness * (1 - r / 50) * 0.6);
        p.ellipse(x, y, r * 2, r * 2);
      }
    }

    // LED body
    p.fill(ledBrightness > 50 ? p.color(100, 255, 100) : p.color(60, 120, 60));
    p.stroke(100);
    p.strokeWeight(2);
    p.arc(x, y - 8, 36, 36, p.PI, 0);
    p.rect(x - 18, y - 8, 36, 25, 0, 0, 4, 4);

    // LED legs
    p.stroke(150);
    p.strokeWeight(2);
    p.line(x - 6, y + 17, x - 6, wireY1);
    p.line(x + 6, y + 17, x + 6, wireY1 + 70);

    // Update brightness
    const targetBrightness = buttonPressed ? 200 : 0;
    ledBrightness = p.lerp(ledBrightness, targetBrightness, 0.15);
  };

  const updateParticles = () => {
    for (const particle of particles) {
      particle.x += particle.speed;
      if (particle.x > 1) {
        particle.x = 0;
        particle.speed = p.random(0.004, 0.007);
      }

      const pos = getCircuitPosition(particle.x);

      p.noStroke();
      p.fill(100, 200, 255);
      p.ellipse(pos.x, pos.y, 8, 8);
    }
  };

  const drawBlockedParticles = () => {
    // Draw particles stuck at the open button gap
    for (let i = 0; i < 5; i++) {
      const x = buttonX - 35 - i * 15;
      const offset = p.sin(p.frameCount * 0.1 + i) * 3;

      p.noStroke();
      p.fill(100, 200, 255);
      p.ellipse(x + offset, wireY1, 8, 8);
    }

    // Draw blocked indicator
    p.fill(255, 100, 100);
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Current blocked!', buttonX - 60, wireY1 - 55);
  };

  const getCircuitPosition = (t: number): { x: number; y: number } => {
    if (t < 0.15) {
      const localT = t / 0.15;
      return { x: batteryX - 7, y: p.lerp(wireY1 + 5, wireY1, localT) };
    } else if (t < 0.35) {
      const localT = (t - 0.15) / 0.2;
      return { x: p.lerp(batteryX - 7, buttonX + 35, localT), y: wireY1 };
    } else if (t < 0.5) {
      const localT = (t - 0.35) / 0.15;
      return { x: p.lerp(buttonX + 35, ledX - 6, localT), y: wireY1 };
    } else if (t < 0.6) {
      const localT = (t - 0.5) / 0.1;
      return { x: ledX, y: p.lerp(wireY1, wireY1 + 70, localT) };
    } else if (t < 0.7) {
      const localT = (t - 0.6) / 0.1;
      return { x: ledX, y: p.lerp(wireY1 + 70, wireY2, localT) };
    } else if (t < 0.9) {
      const localT = (t - 0.7) / 0.2;
      return { x: p.lerp(ledX, batteryX - 7, localT), y: wireY2 };
    } else {
      const localT = (t - 0.9) / 0.1;
      return { x: batteryX - 7, y: p.lerp(wireY2, wireY1 + 125, localT) };
    }
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(13);
    p.textAlign(p.CENTER, p.CENTER);

    p.text('Battery', batteryX - 7, wireY2 + 30);
    p.text('Push Button', buttonX, wireY1 + 55);
    p.text('LED', ledX, wireY1 + 90);
  };

  const drawInstructions = () => {
    p.fill(150);
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);

    const status = buttonPressed ? 'Release to open circuit' : 'Click & hold button to close circuit';
    p.text(status, 300, 370);

    p.fill(100, 150, 200);
    p.textSize(11);
    p.text('When the button is open, current cannot flow → LED stays OFF', 300, 385);
  };
};

export default buttonGapSketch;
