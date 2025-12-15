import type p5 from 'p5';

/**
 * Visualizes the setup() and loop() boxes concept
 */
export const setupLoopBoxesSketch = (p: p5) => {
  let phase: 'setup' | 'loop' = 'setup';
  let setupProgress = 0;
  let loopProgress = 0;
  let lastUpdate = 0;

  p.setup = () => {
    p.createCanvas(400, 280);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    p.background(30);

    // Update animation
    if (p.millis() - lastUpdate > 50) {
      if (phase === 'setup') {
        setupProgress += 3;
        if (setupProgress >= 100) {
          phase = 'loop';
          setupProgress = 100;
        }
      } else {
        loopProgress += 2;
        if (loopProgress >= 100) {
          loopProgress = 0;
        }
      }
      lastUpdate = p.millis();
    }

    // Title
    p.fill(255);
    p.textSize(16);
    p.noStroke();
    p.text('The Two Magic Boxes 📦📦', p.width / 2, 25);

    // Setup box
    const setupX = 50;
    const setupY = 60;
    const boxW = 140;
    const boxH = 100;

    // Box background
    p.fill(phase === 'setup' ? 60 : 40, phase === 'setup' ? 100 : 60, phase === 'setup' ? 180 : 100);
    p.stroke(phase === 'setup' ? '#4CAF50' : '#666');
    p.strokeWeight(phase === 'setup' ? 3 : 1);
    p.rect(setupX, setupY, boxW, boxH, 10);

    // Setup label
    p.fill(255);
    p.textSize(14);
    p.noStroke();
    p.text('setup()', setupX + boxW / 2, setupY + 25);

    // Runs ONCE badge
    p.fill(255, 200, 0);
    p.textSize(10);
    p.text('Runs ONCE!', setupX + boxW / 2, setupY + 45);

    // Progress bar for setup
    p.fill(60);
    p.rect(setupX + 15, setupY + 65, boxW - 30, 15, 5);
    p.fill(100, 200, 100);
    p.rect(setupX + 15, setupY + 65, (setupProgress / 100) * (boxW - 30), 15, 5);

    // Checkmark if done
    if (setupProgress >= 100) {
      p.fill('#4CAF50');
      p.textSize(18);
      p.text('✓', setupX + boxW - 20, setupY + 72);
    }

    // Loop box
    const loopX = 210;
    const loopY = 60;

    // Box background
    p.fill(phase === 'loop' ? 100 : 60, phase === 'loop' ? 60 : 40, phase === 'loop' ? 180 : 100);
    p.stroke(phase === 'loop' ? '#9c27b0' : '#666');
    p.strokeWeight(phase === 'loop' ? 3 : 1);
    p.rect(loopX, loopY, boxW, boxH, 10);

    // Loop label
    p.fill(255);
    p.textSize(14);
    p.noStroke();
    p.text('loop()', loopX + boxW / 2, loopY + 25);

    // Runs FOREVER badge
    p.fill(200, 150, 255);
    p.textSize(10);
    p.text('Runs FOREVER! 🔄', loopX + boxW / 2, loopY + 45);

    // Progress bar for loop (circular)
    p.fill(60);
    p.rect(loopX + 15, loopY + 65, boxW - 30, 15, 5);
    if (phase === 'loop') {
      p.fill(150, 100, 200);
      p.rect(loopX + 15, loopY + 65, (loopProgress / 100) * (boxW - 30), 15, 5);
    }

    // Arrow from setup to loop
    if (setupProgress >= 100) {
      p.stroke(100, 255, 100);
      p.strokeWeight(3);
      p.line(setupX + boxW + 5, setupY + boxH / 2, loopX - 5, loopY + boxH / 2);
      p.fill(100, 255, 100);
      p.noStroke();
      p.triangle(loopX - 5, loopY + boxH / 2, loopX - 15, loopY + boxH / 2 - 8, loopX - 15, loopY + boxH / 2 + 8);
    }

    // Loop back arrow for loop()
    if (phase === 'loop') {
      p.stroke(150, 100, 200);
      p.strokeWeight(2);
      p.noFill();
      p.arc(loopX + boxW / 2, loopY + boxH + 15, boxW - 20, 30, 0, p.PI);

      // Arrow head
      p.fill(150, 100, 200);
      p.noStroke();
      p.triangle(loopX + 15, loopY + boxH + 15, loopX + 25, loopY + boxH + 8, loopX + 25, loopY + boxH + 22);
    }

    // Explanations at bottom
    p.fill(200);
    p.textSize(11);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('📦 setup() = Get ready once (like putting on shoes)', 30, 200);
    p.text('🔄 loop() = Do it again and again (like breathing)', 30, 225);

    // Current status
    p.textAlign(p.CENTER, p.CENTER);
    p.fill(phase === 'setup' ? '#4CAF50' : '#9c27b0');
    p.textSize(12);
    p.text(phase === 'setup' ? '▶ Running setup()...' : '🔄 Running loop() - again and again!', p.width / 2, p.height - 15);
  };
};
