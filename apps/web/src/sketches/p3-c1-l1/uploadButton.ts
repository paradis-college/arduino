import type p5 from 'p5';

/**
 * Shows the upload button and upload process animation
 */
export const uploadButtonSketch = (p: p5) => {
  let uploadState: 'ready' | 'uploading' | 'done' = 'ready';
  let progress = 0;
  let ledBlinking = false;
  let ledOn = false;
  let lastToggle = 0;

  p.setup = () => {
    p.createCanvas(400, 280);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    p.background(30);

    // Title
    p.fill(255);
    p.textSize(16);
    p.noStroke();
    p.text('Click to Upload Your Code! 🚀', p.width / 2, 25);

    // Arduino IDE mockup
    const ideX = 30;
    const ideY = 50;
    const ideW = 200;
    const ideH = 160;

    // IDE window
    p.fill(40, 44, 52);
    p.stroke(60);
    p.strokeWeight(2);
    p.rect(ideX, ideY, ideW, ideH, 5);

    // IDE toolbar
    p.fill(35, 38, 45);
    p.noStroke();
    p.rect(ideX, ideY, ideW, 30, 5, 5, 0, 0);

    // Upload button (arrow)
    const btnX = ideX + 60;
    const btnY = ideY + 15;
    const btnHover = p.mouseX > btnX - 15 && p.mouseX < btnX + 15 && p.mouseY > btnY - 12 && p.mouseY < btnY + 12;

    p.fill(btnHover ? '#4CAF50' : '#2e7d32');
    p.stroke(btnHover ? '#66bb6a' : '#4CAF50');
    p.strokeWeight(2);
    p.ellipse(btnX, btnY, 28, 24);

    // Arrow icon
    p.fill(255);
    p.noStroke();
    p.triangle(btnX - 5, btnY, btnX + 8, btnY, btnX + 1, btnY - 8);
    p.rect(btnX - 3, btnY, 8, 8);

    // "Upload" tooltip
    if (btnHover && uploadState === 'ready') {
      p.fill(255);
      p.textSize(10);
      p.text('Click here!', btnX, btnY + 25);
    }

    // Code preview in IDE
    p.fill(150);
    p.textSize(9);
    p.textAlign(p.LEFT, p.TOP);
    const codeY = ideY + 40;
    p.text('void setup() {', ideX + 10, codeY);
    p.text('  pinMode(13, OUTPUT);', ideX + 10, codeY + 12);
    p.text('}', ideX + 10, codeY + 24);
    p.text('void loop() {', ideX + 10, codeY + 40);
    p.text('  digitalWrite(13, HIGH);', ideX + 10, codeY + 52);
    p.text('  delay(1000);', ideX + 10, codeY + 64);
    p.text('  ...', ideX + 10, codeY + 76);
    p.text('}', ideX + 10, codeY + 88);
    p.textAlign(p.CENTER, p.CENTER);

    // Arduino board
    const boardX = 260;
    const boardY = 60;
    const boardW = 110;
    const boardH = 140;

    // Board body
    p.fill(0, 80, 140);
    p.stroke(0, 60, 100);
    p.strokeWeight(2);
    p.rect(boardX, boardY, boardW, boardH, 5);

    // USB connection visualization
    if (uploadState === 'uploading') {
      // Data transfer dots
      const numDots = 5;
      for (let i = 0; i < numDots; i++) {
        const dotProgress = ((progress * 3 + i * 20) % 100) / 100;
        const dotX = ideX + ideW + (boardX - ideX - ideW) * dotProgress;
        const dotY = ideY + ideH / 2;
        p.fill(0, 255, 0, 200);
        p.noStroke();
        p.ellipse(dotX, dotY, 8, 8);
      }
    }

    // Built-in LED on board
    const ledX = boardX + boardW - 25;
    const ledY = boardY + 40;

    // Toggle LED if blinking
    if (ledBlinking && p.millis() - lastToggle > 500) {
      ledOn = !ledOn;
      lastToggle = p.millis();
    }

    // LED glow
    if (ledOn) {
      p.noStroke();
      for (let i = 4; i > 0; i--) {
        p.fill(255, 180, 0, 30 * i);
        p.ellipse(ledX, ledY, 8 + i * 5, 8 + i * 5);
      }
    }

    // LED
    p.fill(ledOn ? p.color(255, 200, 50) : p.color(80, 60, 30));
    p.stroke(60);
    p.strokeWeight(1);
    p.ellipse(ledX, ledY, 12, 12);

    // Board label
    p.fill(200);
    p.textSize(10);
    p.noStroke();
    p.text('Arduino', boardX + boardW / 2, boardY + boardH - 15);

    // Progress bar during upload
    if (uploadState === 'uploading') {
      p.fill(40);
      p.rect(50, 230, 300, 20, 5);
      p.fill(0, 200, 100);
      p.rect(50, 230, progress * 3, 20, 5);
      p.fill(255);
      p.textSize(11);
      p.text(`Uploading... ${Math.round(progress)}%`, 200, 240);

      progress += 1;
      if (progress >= 100) {
        uploadState = 'done';
        ledBlinking = true;
        ledOn = true;
      }
    }

    // Status message
    p.textSize(12);
    if (uploadState === 'ready') {
      p.fill(150);
      p.text('Click the green arrow to upload!', p.width / 2, p.height - 20);
    } else if (uploadState === 'done') {
      p.fill('#4CAF50');
      p.text('🎉 Upload complete! Your LED is blinking!', p.width / 2, p.height - 20);
    }
  };

  p.mousePressed = () => {
    const btnX = 30 + 60;
    const btnY = 50 + 15;
    
    if (p.mouseX > btnX - 15 && p.mouseX < btnX + 15 && p.mouseY > btnY - 12 && p.mouseY < btnY + 12) {
      if (uploadState === 'ready') {
        uploadState = 'uploading';
        progress = 0;
      } else if (uploadState === 'done') {
        // Reset
        uploadState = 'ready';
        progress = 0;
        ledBlinking = false;
        ledOn = false;
      }
    }
  };
};
