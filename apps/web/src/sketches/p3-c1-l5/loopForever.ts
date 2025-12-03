import type p5 from 'p5';

/**
 * Shows loop() running forever with clear visualization
 */
export const loopForeverSketch = (p: p5) => {
  let loopCount = 0;
  let currentStep = 0;
  let lastUpdate = 0;
  let steps = ['LED ON', 'Wait...', 'LED OFF', 'Wait...'];
  let ledOn = false;

  p.setup = () => {
    p.createCanvas(400, 280);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    p.background(30);

    // Animation
    if (p.millis() - lastUpdate > 500) {
      currentStep = (currentStep + 1) % steps.length;
      if (currentStep === 0) {
        loopCount++;
      }
      ledOn = currentStep === 0 || currentStep === 1;
      lastUpdate = p.millis();
    }

    // Title
    p.fill(255);
    p.textSize(16);
    p.noStroke();
    p.text('loop() Runs FOREVER! 🔄', p.width / 2, 25);

    // loop() box with animation
    const boxX = 50;
    const boxY = 50;
    const boxW = 200;
    const boxH = 140;

    // Animated border
    p.stroke(100, 150, 255);
    p.strokeWeight(3);
    p.noFill();
    
    // Animated dashes around box
    const dashPhase = (p.millis() / 50) % 20;
    p.drawingContext.setLineDash([10, 10]);
    p.drawingContext.lineDashOffset = -dashPhase;
    p.rect(boxX, boxY, boxW, boxH, 8);
    p.drawingContext.setLineDash([]);

    // Box fill
    p.fill(50, 60, 80);
    p.noStroke();
    p.rect(boxX + 3, boxY + 3, boxW - 6, boxH - 6, 6);

    // loop() label
    p.fill(100, 150, 255);
    p.textSize(16);
    p.text('void loop() {', boxX + boxW / 2, boxY + 25);

    // Steps in loop with highlighting
    for (let i = 0; i < steps.length; i++) {
      const stepY = boxY + 50 + i * 22;
      const isActive = i === currentStep;
      
      if (isActive) {
        p.fill(100, 150, 255, 50);
        p.noStroke();
        p.rect(boxX + 10, stepY - 10, boxW - 20, 20, 3);
      }

      p.fill(isActive ? '#4CAF50' : 120);
      p.textSize(11);
      p.textAlign(p.LEFT, p.CENTER);
      p.text((isActive ? '▶ ' : '  ') + steps[i], boxX + 20, stepY);
    }

    p.textAlign(p.CENTER, p.CENTER);

    // Loop counter
    p.fill(255, 200, 0);
    p.textSize(24);
    p.text(`#${loopCount}`, boxX + boxW - 30, boxY + 30);

    // Infinity symbol
    p.fill(100, 150, 255);
    p.textSize(40);
    p.text('∞', boxX + boxW + 40, boxY + boxH / 2);

    // LED visualization
    const ledX = 320;
    const ledY = 100;

    if (ledOn) {
      p.noStroke();
      for (let i = 4; i > 0; i--) {
        p.fill(255, 200, 0, 40 * i);
        p.ellipse(ledX, ledY, 30 + i * 10, 30 + i * 10);
      }
      p.fill(255, 220, 50);
    } else {
      p.fill(80, 60, 30);
    }
    p.stroke(80);
    p.strokeWeight(2);
    p.ellipse(ledX, ledY, 40, 40);

    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.text(ledOn ? 'ON' : 'OFF', ledX, ledY);

    // Analogy at bottom
    p.fill(200);
    p.textSize(12);
    p.text('🔄 Like breathing:', p.width / 2, 210);
    
    p.fill(150);
    p.textSize(11);
    p.text('💨 Breathe in, breathe out', p.width / 2, 230);
    p.text('💓 Heart beats over and over', p.width / 2, 245);
    p.text('🚶 Walk step after step forever!', p.width / 2, 260);

    // Status
    p.fill(100, 150, 255);
    p.textSize(12);
    p.text(`Loop iteration: ${loopCount} (and counting... forever!)`, p.width / 2, p.height - 8);
  };
};
