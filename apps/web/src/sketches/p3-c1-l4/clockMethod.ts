import type p5 from 'p5';

/**
 * Shows the millis() clock method concept
 */
export const clockMethodSketch = (p: p5) => {
  let lastCheckTime = 0;
  let ledOn = false;
  let currentMillis = 0;

  p.setup = () => {
    p.createCanvas(400, 280);
    p.textAlign(p.CENTER, p.CENTER);
    lastCheckTime = p.millis();
  };

  p.draw = () => {
    p.background(30);

    currentMillis = p.millis();

    // Check if 1 second has passed
    if (currentMillis - lastCheckTime >= 1000) {
      ledOn = !ledOn;
      lastCheckTime = currentMillis;
    }

    // Title
    p.fill(255);
    p.textSize(16);
    p.noStroke();
    p.text('The Clock Method! ⏰', p.width / 2, 25);

    // Big clock display
    const clockX = p.width / 2;
    const clockY = 100;
    const clockR = 70;

    // Clock face
    p.fill(40);
    p.stroke(100, 200, 255);
    p.strokeWeight(3);
    p.ellipse(clockX, clockY, clockR * 2, clockR * 2);

    // Clock ticks
    p.stroke(150);
    p.strokeWeight(2);
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * p.TWO_PI - p.HALF_PI;
      const x1 = clockX + p.cos(angle) * (clockR - 10);
      const y1 = clockY + p.sin(angle) * (clockR - 10);
      const x2 = clockX + p.cos(angle) * (clockR - 20);
      const y2 = clockY + p.sin(angle) * (clockR - 20);
      p.line(x1, y1, x2, y2);
    }

    // Second hand (based on millis)
    const secondAngle = ((currentMillis % 60000) / 60000) * p.TWO_PI - p.HALF_PI;
    p.stroke(255, 100, 100);
    p.strokeWeight(2);
    p.line(clockX, clockY, clockX + p.cos(secondAngle) * (clockR - 25), clockY + p.sin(secondAngle) * (clockR - 25));

    // Center dot
    p.fill(255);
    p.noStroke();
    p.ellipse(clockX, clockY, 10, 10);

    // millis() display
    p.fill(100, 200, 255);
    p.textSize(14);
    p.text(`millis() = ${Math.round(currentMillis)}`, clockX, clockY + clockR + 20);

    // LED indicator
    const ledX = 80;
    const ledY = 100;

    if (ledOn) {
      p.noStroke();
      for (let i = 3; i > 0; i--) {
        p.fill(255, 200, 0, 40 * i);
        p.ellipse(ledX, ledY, 25 + i * 8, 25 + i * 8);
      }
      p.fill(255, 220, 50);
    } else {
      p.fill(80, 60, 30);
    }
    p.stroke(80);
    p.strokeWeight(2);
    p.ellipse(ledX, ledY, 30, 30);

    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.text('LED', ledX, ledY + 28);

    // Button (always responsive)
    const btnX = 320;
    const btnY = 100;
    const btnHover = p.dist(p.mouseX, p.mouseY, btnX, btnY) < 25;

    p.fill(btnHover ? '#4CAF50' : '#646464');
    p.stroke('#4CAF50');
    p.strokeWeight(2);
    p.ellipse(btnX, btnY, 50, 50);

    p.fill(255);
    p.noStroke();
    p.textSize(10);
    p.text('READY!', btnX, btnY);
    p.text('Button', btnX, btnY + 40);

    // Explanation panel
    p.fill(40);
    p.stroke(60);
    p.strokeWeight(1);
    p.rect(40, 185, 320, 55, 5);

    p.fill('#4CAF50');
    p.textSize(11);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('✓ Arduino checks the clock constantly', 50, 200);
    p.text('✓ Never goes to sleep!', 50, 215);
    p.text('✓ Button always works!', 50, 230);

    p.textAlign(p.CENTER, p.CENTER);

    // Status
    p.fill(150);
    p.textSize(10);
    p.text('millis() = keep checking the clock instead of sleeping!', p.width / 2, p.height - 15);
  };
};
