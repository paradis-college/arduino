import type p5 from 'p5';

/**
 * Shows setup() running once with clear visualization
 */
export const setupOnceSketch = (p: p5) => {
  let setupCompleted = false;
  let setupProgress = 0;
  let checkmarks: { text: string; done: boolean }[] = [
    { text: 'pinMode(13, OUTPUT)', done: false },
    { text: 'Serial.begin(9600)', done: false },
    { text: 'Ready to go!', done: false }
  ];
  let currentItem = 0;
  let lastUpdate = 0;

  p.setup = () => {
    p.createCanvas(400, 280);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    p.background(30);

    // Animation
    if (!setupCompleted && p.millis() - lastUpdate > 800) {
      if (currentItem < checkmarks.length) {
        checkmarks[currentItem].done = true;
        currentItem++;
        if (currentItem >= checkmarks.length) {
          setupCompleted = true;
        }
      }
      lastUpdate = p.millis();
    }

    // Title
    p.fill(255);
    p.textSize(16);
    p.noStroke();
    p.text('setup() Runs ONCE! 1️⃣', p.width / 2, 25);

    // setup() box
    const boxX = 50;
    const boxY = 55;
    const boxW = 300;
    const boxH = 130;

    // Box glow when active
    if (!setupCompleted) {
      p.noStroke();
      p.fill(255, 150, 50, 20);
      p.rect(boxX - 5, boxY - 5, boxW + 10, boxH + 10, 12);
    }

    // Box
    p.fill(setupCompleted ? 40 : 50, setupCompleted ? 60 : 80, setupCompleted ? 40 : 60);
    p.stroke(setupCompleted ? '#4CAF50' : '#ff9800');
    p.strokeWeight(3);
    p.rect(boxX, boxY, boxW, boxH, 8);

    // setup() label
    p.fill(setupCompleted ? '#4CAF50' : '#ff9800');
    p.textSize(18);
    p.noStroke();
    p.text('void setup() {', boxX + 80, boxY + 25);

    // Checklist items
    for (let i = 0; i < checkmarks.length; i++) {
      const itemY = boxY + 55 + i * 25;
      
      // Checkbox
      p.fill(checkmarks[i].done ? '#4CAF50' : 60);
      p.stroke(checkmarks[i].done ? '#4CAF50' : 100);
      p.strokeWeight(2);
      p.rect(boxX + 30, itemY - 8, 16, 16, 3);
      
      if (checkmarks[i].done) {
        p.fill(255);
        p.noStroke();
        p.textSize(12);
        p.text('✓', boxX + 38, itemY);
      }

      // Item text
      p.fill(checkmarks[i].done ? 255 : 100);
      p.textSize(12);
      p.textAlign(p.LEFT, p.CENTER);
      p.text(checkmarks[i].text, boxX + 55, itemY);
    }

    p.textAlign(p.CENTER, p.CENTER);

    // "ONCE" indicator
    p.fill(setupCompleted ? '#4CAF50' : '#ff9800');
    p.textSize(30);
    p.text('1️⃣', boxX + boxW - 30, boxY + 30);

    // Analogy at bottom
    p.fill(200);
    p.textSize(12);
    p.text('📦 Like getting ready in the morning:', p.width / 2, 210);
    
    p.fill(150);
    p.textSize(11);
    p.text('👟 Put on shoes ONCE', p.width / 2, 230);
    p.text('🎒 Pack backpack ONCE', p.width / 2, 245);
    p.text('🍳 Eat breakfast ONCE', p.width / 2, 260);

    // Status
    if (setupCompleted) {
      p.fill('#4CAF50');
      p.textSize(12);
      p.text('✅ setup() is DONE! Only ran ONCE!', p.width / 2, p.height - 10);
    } else {
      p.fill('#ff9800');
      p.textSize(12);
      p.text('⏳ Running setup()...', p.width / 2, p.height - 10);
    }
  };

  // Reset on click
  p.mousePressed = () => {
    setupCompleted = false;
    currentItem = 0;
    checkmarks.forEach(item => item.done = false);
    lastUpdate = p.millis();
  };
};
