/**
 * P2-C2-L1 DHT Library Installation
 * Animation showing DHT library installation in Arduino IDE
 */
import type p5 from 'p5';

export const dhtLibraryInstallSketch = (p: p5) => {
  let animationStep = 0;
  let stepProgress = 0;
  const animationSpeed = 0.015;

  p.setup = () => {
    p.createCanvas(600, 400);
    p.textFont('monospace');
  };

  p.draw = () => {
    p.background(40, 44, 52);

    drawIDEWindow();
    drawLibraryManager();
    drawLabels();

    stepProgress += animationSpeed;
    if (stepProgress > 1) {
      stepProgress = 0;
      animationStep = (animationStep + 1) % 4;
    }
  };

  const drawIDEWindow = () => {
    // IDE Window frame
    p.fill(50, 54, 62);
    p.stroke(70, 74, 82);
    p.strokeWeight(2);
    p.rect(100, 40, 400, 310, 8);

    // Title bar
    p.fill(60, 64, 72);
    p.noStroke();
    p.rect(100, 40, 400, 30, 8, 8, 0, 0);

    // Window controls
    p.fill(255, 95, 86);
    p.ellipse(120, 55, 12, 12);
    p.fill(255, 189, 46);
    p.ellipse(140, 55, 12, 12);
    p.fill(39, 201, 63);
    p.ellipse(160, 55, 12, 12);

    // Title
    p.fill(180);
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Library Manager', 300, 55);
  };

  const drawLibraryManager = () => {
    // Search box
    p.fill(35, 39, 47);
    p.stroke(animationStep >= 1 ? p.color(80, 150, 255) : p.color(70, 74, 82));
    p.strokeWeight(animationStep >= 1 ? 2 : 1);
    p.rect(120, 85, 280, 30, 4);

    // Search text
    p.fill(animationStep >= 1 ? 200 : 100);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.LEFT, p.CENTER);

    if (animationStep >= 1) {
      const textToShow = 'DHT sensor';
      const charsToShow = Math.min(Math.floor(stepProgress * 15), textToShow.length);
      p.text(textToShow.substring(0, charsToShow) + (animationStep === 1 ? '|' : ''), 130, 100);
    } else {
      p.fill(80);
      p.text('Filter your search...', 130, 100);
    }

    // Search icon
    p.stroke(150);
    p.strokeWeight(1);
    p.noFill();
    p.ellipse(380, 100, 14, 14);
    p.line(387, 107, 393, 113);

    // Results area
    if (animationStep >= 2) {
      // DHT Library result
      p.fill(55, 59, 67);
      p.noStroke();
      p.rect(120, 130, 360, 70, 4);

      p.fill(100, 200, 100);
      p.textSize(13);
      p.textAlign(p.LEFT, p.CENTER);
      p.text('DHT sensor library', 135, 150);

      p.fill(150);
      p.textSize(9);
      p.text('by Adafruit', 135, 168);
      p.text('Arduino library for DHT11, DHT22, etc.', 135, 185);

      // Install button
      const buttonPulse = animationStep >= 3 ? (200 + 55 * p.sin(p.frameCount * 0.1)) : 180;
      p.fill(animationStep >= 3 ? p.color(80, 150, 255, buttonPulse) : p.color(60, 64, 72));
      p.stroke(animationStep >= 3 ? p.color(80, 150, 255) : p.color(80, 84, 92));
      p.strokeWeight(1);
      p.rect(410, 145, 55, 28, 4);

      p.fill(255);
      p.noStroke();
      p.textSize(10);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('Install', 437, 159);

      // Adafruit Unified Sensor (dependency)
      p.fill(45, 49, 57);
      p.rect(120, 210, 360, 60, 4);

      p.fill(100, 180, 255);
      p.textSize(12);
      p.textAlign(p.LEFT, p.CENTER);
      p.text('Adafruit Unified Sensor', 135, 228);

      p.fill(120);
      p.textSize(9);
      p.text('by Adafruit (Required dependency)', 135, 245);
      p.text('Also install this for DHT library to work', 135, 260);
    }

    // Installing progress (step 3)
    if (animationStep >= 3 && stepProgress > 0.5) {
      p.fill(0, 0, 0, 150);
      p.rect(100, 40, 400, 310, 8);

      // Progress dialog
      p.fill(50, 54, 62);
      p.stroke(80, 150, 255);
      p.strokeWeight(2);
      p.rect(200, 150, 200, 80, 8);

      p.fill(200);
      p.noStroke();
      p.textSize(11);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('Installing...', 300, 175);

      // Progress bar
      p.fill(35, 39, 47);
      p.rect(220, 195, 160, 10, 5);

      const barProgress = (stepProgress - 0.5) * 2;
      p.fill(80, 150, 255);
      p.rect(220, 195, 160 * barProgress, 10, 5);
    }
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.LEFT, p.TOP);
    p.text('Install DHT Library', 20, 20);

    p.textSize(10);
    const steps = [
      '1. Search "DHT sensor"',
      '2. Find Adafruit DHT library',
      '3. Click Install',
      '4. Also install Unified Sensor'
    ];

    for (let i = 0; i < steps.length; i++) {
      const done = animationStep > i;
      const active = animationStep === i;

      if (done) {
        p.fill(100, 255, 100);
      } else if (active) {
        p.fill(80, 150, 255);
      } else {
        p.fill(100);
      }
      p.text((done ? '✓ ' : (active ? '→ ' : '○ ')) + steps[i], 20, 360 + i * 13);
    }
  };

  p.mousePressed = () => {
    if (p.mouseX > 0 && p.mouseX < 600 && p.mouseY > 0 && p.mouseY < 400) {
      animationStep = 0;
      stepProgress = 0;
    }
  };
};

export default dhtLibraryInstallSketch;
