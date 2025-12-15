/**
 * P1-C1-L1 LED & Resistors Sketch 1
 * Current-loop animation: battery→resistor→LED with moving dots slowing at resistor and LED glowing.
 */
import type p5 from 'p5';

export const currentLoopSketch = (p: p5) => {
  // Animation variables
  let particles: { x: number; y: number; speed: number; inResistor: boolean }[] = [];
  let ledBrightness = 0;
  const numParticles = 15;

  // Circuit path points
  const batteryX = 80;
  const batteryY = 200;
  const resistorStartX = 200;
  const resistorEndX = 300;
  const ledX = 450;
  const wireY1 = 120; // Top wire
  const wireY2 = 280; // Bottom wire

  p.setup = () => {
    p.createCanvas(600, 400);

    // Initialize particles along the circuit
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: p.random(0, 1),
        y: 0,
        speed: p.random(0.003, 0.005),
        inResistor: false
      });
    }
  };

  p.draw = () => {
    p.background(30, 35, 45);

    // Draw circuit elements
    drawBattery();
    drawWires();
    drawResistor();
    drawLED();

    // Update and draw particles
    updateParticles();

    // Draw labels
    drawLabels();
  };

  const drawBattery = () => {
    // Battery body
    p.fill(60, 60, 70);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(batteryX - 30, batteryY - 60, 40, 120, 5);

    // Battery terminals
    p.fill(180, 50, 50);
    p.rect(batteryX - 20, batteryY - 75, 20, 15); // + terminal
    p.fill(50, 50, 180);
    p.rect(batteryX - 20, batteryY + 60, 20, 15); // - terminal

    // Labels
    p.fill(255);
    p.noStroke();
    p.textSize(16);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('+', batteryX - 10, batteryY - 67);
    p.text('−', batteryX - 10, batteryY + 67);
    p.text('5V', batteryX - 10, batteryY);
  };

  const drawWires = () => {
    p.stroke(100, 150, 200);
    p.strokeWeight(3);
    p.noFill();

    // Top wire: battery+ to resistor to LED anode
    p.line(batteryX - 10, batteryY - 75, batteryX - 10, wireY1);
    p.line(batteryX - 10, wireY1, resistorStartX, wireY1);
    p.line(resistorEndX, wireY1, ledX, wireY1);

    // LED to bottom wire
    p.line(ledX, wireY1 + 80, ledX, wireY2);

    // Bottom wire: LED cathode back to battery-
    p.line(ledX, wireY2, batteryX - 10, wireY2);
    p.line(batteryX - 10, wireY2, batteryX - 10, batteryY + 75);
  };

  const drawResistor = () => {
    const x = resistorStartX;
    const y = wireY1;
    const width = resistorEndX - resistorStartX;

    // Resistor body (with color bands)
    p.fill(210, 180, 140);
    p.stroke(100);
    p.strokeWeight(1);
    p.rect(x, y - 15, width, 30, 3);

    // Color bands (220Ω = Red, Red, Brown, Gold)
    const bandWidth = 10;
    const bandGap = 18;
    const bandX = x + 20;

    // Red band
    p.fill(220, 50, 50);
    p.noStroke();
    p.rect(bandX, y - 12, bandWidth, 24);

    // Red band
    p.fill(220, 50, 50);
    p.rect(bandX + bandGap, y - 12, bandWidth, 24);

    // Brown band
    p.fill(139, 90, 43);
    p.rect(bandX + bandGap * 2, y - 12, bandWidth, 24);

    // Gold tolerance band
    p.fill(212, 175, 55);
    p.rect(bandX + bandGap * 3, y - 12, bandWidth, 24);
  };

  const drawLED = () => {
    const x = ledX;
    const y = wireY1 + 40;

    // LED glow effect when bright
    if (ledBrightness > 0) {
      p.noStroke();
      for (let r = 60; r > 0; r -= 10) {
        p.fill(255, 100, 100, ledBrightness * (1 - r / 60) * 0.5);
        p.ellipse(x, y, r * 2, r * 2);
      }
    }

    // LED body (triangle/lens shape)
    p.fill(ledBrightness > 50 ? p.color(255, 100 + ledBrightness * 0.6, 100) : p.color(180, 60, 60));
    p.stroke(100);
    p.strokeWeight(2);

    // Draw LED as a semi-circle with flat bottom
    p.arc(x, y - 10, 40, 40, p.PI, 0);
    p.rect(x - 20, y - 10, 40, 30, 0, 0, 5, 5);

    // LED legs
    p.stroke(150);
    p.strokeWeight(2);
    p.line(x - 8, y + 20, x - 8, wireY1); // Anode (longer on real LED)
    p.line(x + 8, y + 20, x + 8, wireY1 + 80); // Cathode

    // Anode/Cathode labels
    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.text('+', x - 8, y + 35);
    p.text('−', x + 8, y + 35);
  };

  const updateParticles = () => {
    let activeLedParticles = 0;

    for (const particle of particles) {
      // Move particle along circuit path (0 to 1 represents full circuit)
      const baseSpeed = particle.speed;

      // Determine if in resistor zone (slows down)
      const resistorZone = particle.x > 0.2 && particle.x < 0.35;
      const ledZone = particle.x > 0.5 && particle.x < 0.65;

      if (resistorZone) {
        particle.speed = baseSpeed * 0.4; // Slow down in resistor
        particle.inResistor = true;
      } else if (ledZone) {
        particle.speed = baseSpeed * 0.6;
        activeLedParticles++;
      } else {
        particle.speed = baseSpeed;
        particle.inResistor = false;
      }

      particle.x += particle.speed;
      if (particle.x > 1) {
        particle.x = 0;
        particle.speed = p.random(0.003, 0.005);
      }

      // Calculate screen position based on circuit path
      const pos = getCircuitPosition(particle.x);

      // Draw particle (electron)
      p.noStroke();
      p.fill(particle.inResistor ? p.color(255, 200, 100) : p.color(100, 200, 255));
      p.ellipse(pos.x, pos.y, 8, 8);
    }

    // Update LED brightness based on particles passing through
    ledBrightness = p.lerp(ledBrightness, activeLedParticles * 30, 0.1);
    ledBrightness = p.constrain(ledBrightness, 0, 200);
  };

  const getCircuitPosition = (t: number): { x: number; y: number } => {
    // Map t (0-1) to circuit path positions
    if (t < 0.15) {
      // Battery+ to top-left corner
      const localT = t / 0.15;
      return {
        x: batteryX - 10,
        y: p.lerp(batteryY - 75, wireY1, localT)
      };
    } else if (t < 0.25) {
      // Top wire to resistor
      const localT = (t - 0.15) / 0.1;
      return {
        x: p.lerp(batteryX - 10, resistorStartX, localT),
        y: wireY1
      };
    } else if (t < 0.4) {
      // Through resistor
      const localT = (t - 0.25) / 0.15;
      return {
        x: p.lerp(resistorStartX, resistorEndX, localT),
        y: wireY1
      };
    } else if (t < 0.5) {
      // Resistor to LED
      const localT = (t - 0.4) / 0.1;
      return {
        x: p.lerp(resistorEndX, ledX - 8, localT),
        y: wireY1
      };
    } else if (t < 0.6) {
      // Through LED
      const localT = (t - 0.5) / 0.1;
      return {
        x: ledX,
        y: p.lerp(wireY1, wireY1 + 80, localT)
      };
    } else if (t < 0.7) {
      // LED to bottom wire
      const localT = (t - 0.6) / 0.1;
      return {
        x: ledX,
        y: p.lerp(wireY1 + 80, wireY2, localT)
      };
    } else if (t < 0.9) {
      // Bottom wire back to battery
      const localT = (t - 0.7) / 0.2;
      return {
        x: p.lerp(ledX, batteryX - 10, localT),
        y: wireY2
      };
    } else {
      // Battery- back to battery+
      const localT = (t - 0.9) / 0.1;
      return {
        x: batteryX - 10,
        y: p.lerp(wireY2, batteryY + 75, localT)
      };
    }
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.CENTER, p.CENTER);

    p.text('Battery', batteryX - 10, batteryY + 100);
    p.text('220Ω Resistor', (resistorStartX + resistorEndX) / 2, wireY1 - 30);
    p.text('LED', ledX, wireY1 + 100);

    // Current direction arrows
    p.fill(100, 200, 255);
    p.textSize(12);
    p.text('→ Current Flow →', 350, wireY1 - 50);

    // Info text
    p.fill(150);
    p.textSize(11);
    p.text('Electrons (blue dots) slow down at the resistor', 300, 360);
    p.text('limiting current and protecting the LED', 300, 375);
  };
};

export default currentLoopSketch;
