import type p5 from "p5";

/**
 * P4-C3-L1 Burglar Alarm - gif2
 * Armed/disarmed state indicator switching
 */
export const armedStateSketch = (p: p5) => {
  let isArmed = false;
  let alarmTriggered = false;
  let countdown = 0;
  let countdownActive = false;
  let sirenPhase = 0;
  let motionDetected = false;

  p.setup = () => {
    p.createCanvas(400, 350);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    // Background based on state
    if (alarmTriggered) {
      // Flashing red background
      const flash = p.sin(p.frameCount * 0.3) > 0;
      p.background(flash ? p.color(150, 30, 30) : p.color(80, 20, 20));
    } else if (isArmed) {
      p.background(40, 50, 60);
    } else {
      p.background(50, 60, 70);
    }

    // Title
    p.fill(255);
    p.textSize(14);
    p.noStroke();
    p.text("Security Alarm System", p.width / 2, 20);

    // Draw main panel
    drawControlPanel(200, 100);

    // Draw status indicators
    drawStatusIndicators(200, 220);

    // Draw arm/disarm buttons
    drawArmButtons(200, 290);

    // Draw PIR sensor representation
    drawPIRSensor(50, 150);

    // Countdown display
    if (countdownActive) {
      drawCountdown(200, 160);
    }

    // Update animations
    updateState();
  };

  const drawControlPanel = (x: number, y: number) => {
    // Panel housing
    p.fill(30, 35, 40);
    p.stroke(50);
    p.strokeWeight(3);
    p.rect(x - 80, y - 40, 160, 100, 10);

    // Display screen
    p.fill(isArmed ? (alarmTriggered ? p.color(100, 0, 0) : p.color(0, 50, 0)) : p.color(0, 0, 50));
    p.noStroke();
    p.rect(x - 65, y - 30, 130, 50, 5);

    // Status text on screen
    p.fill(isArmed ? (alarmTriggered ? p.color(255, 50, 50) : p.color(50, 255, 50)) : p.color(100, 150, 255));
    p.textSize(18);

    let statusText = "";
    if (alarmTriggered) {
      statusText = "!!! ALARM !!!";
    } else if (countdownActive) {
      statusText = `Arming: ${countdown}`;
    } else if (isArmed) {
      statusText = "ARMED";
    } else {
      statusText = "DISARMED";
    }
    p.text(statusText, x, y - 5);

    // LED indicators
    const ledY = y + 35;

    // Power LED (always on)
    p.fill(50, 255, 50);
    p.circle(x - 40, ledY, 10);
    p.fill(200);
    p.textSize(8);
    p.text("PWR", x - 40, ledY + 12);

    // Armed LED
    p.fill(isArmed ? p.color(255, 50, 50) : p.color(50, 20, 20));
    p.circle(x, ledY, 10);
    p.fill(200);
    p.text("ARM", x, ledY + 12);

    // Alarm LED
    const alarmLedOn = alarmTriggered && p.frameCount % 10 < 5;
    p.fill(alarmLedOn ? p.color(255, 255, 50) : p.color(50, 50, 20));
    p.circle(x + 40, ledY, 10);
    p.fill(200);
    p.text("ALM", x + 40, ledY + 12);
  };

  const drawStatusIndicators = (x: number, y: number) => {
    // Armed status icon
    p.fill(255);
    p.textSize(40);
    if (alarmTriggered) {
      // Siren icon (bell)
      const wobble = p.sin(p.frameCount * 0.5) * 5;
      p.push();
      p.translate(x, y);
      p.rotate(wobble * 0.05);
      p.text("🔔", 0, 0);
      p.pop();
    } else if (isArmed) {
      p.text("🔒", x, y);
    } else {
      p.text("🔓", x, y);
    }

    // Status description
    p.fill(200);
    p.textSize(11);
    if (alarmTriggered) {
      p.fill(255, 100, 100);
      p.text("INTRUDER DETECTED!", x, y + 35);
    } else if (isArmed) {
      p.fill(100, 255, 100);
      p.text("System monitoring for motion", x, y + 35);
    } else {
      p.fill(150, 150, 200);
      p.text("System inactive - Click ARM to enable", x, y + 35);
    }
  };

  const drawArmButtons = (x: number, y: number) => {
    // ARM button
    const armHovered = p.dist(p.mouseX, p.mouseY, x - 50, y) < 25;
    p.fill(isArmed ? p.color(100, 50, 50) : (armHovered ? p.color(255, 80, 80) : p.color(200, 50, 50)));
    p.stroke(150, 30, 30);
    p.strokeWeight(2);
    p.rect(x - 80, y - 20, 60, 40, 8);

    p.fill(255);
    p.noStroke();
    p.textSize(12);
    p.text("ARM", x - 50, y);

    // DISARM button
    const disarmHovered = p.dist(p.mouseX, p.mouseY, x + 50, y) < 25;
    p.fill(!isArmed ? p.color(50, 100, 50) : (disarmHovered ? p.color(80, 255, 80) : p.color(50, 200, 50)));
    p.stroke(30, 150, 30);
    p.strokeWeight(2);
    p.rect(x + 20, y - 20, 60, 40, 8);

    p.fill(255);
    p.noStroke();
    p.text("DISARM", x + 50, y);

    // Instructions
    p.fill(150);
    p.textSize(9);
    p.text("Click buttons to change state", x, y + 35);
  };

  const drawPIRSensor = (x: number, y: number) => {
    // Sensor body
    p.fill(200);
    p.stroke(150);
    p.strokeWeight(2);
    p.ellipse(x, y, 40, 50);

    // Lens
    p.fill(motionDetected ? p.color(255, 100, 100) : p.color(100, 100, 120));
    p.noStroke();
    p.ellipse(x, y - 5, 25, 30);

    // Detection cone (when armed)
    if (isArmed) {
      p.fill(motionDetected ? p.color(255, 100, 100, 80) : p.color(100, 200, 100, 50));
      p.noStroke();
      p.triangle(x, y, x + 80, y - 60, x + 80, y + 60);
    }

    // Label
    p.fill(200);
    p.textSize(10);
    p.text("PIR", x, y + 40);
    p.text("Sensor", x, y + 52);

    // Click hint when armed
    if (isArmed && !alarmTriggered) {
      p.fill(150);
      p.textSize(8);
      p.text("Click to", x + 60, y - 10);
      p.text("simulate", x + 60, y);
      p.text("motion", x + 60, y + 10);
    }
  };

  const drawCountdown = (x: number, y: number) => {
    p.fill(255, 255, 100);
    p.textSize(48);
    p.text(countdown, x, y);

    p.textSize(12);
    p.text("Arming in...", x, y - 40);
  };

  const updateState = () => {
    // Countdown timer
    if (countdownActive && p.frameCount % 60 === 0) {
      countdown--;
      if (countdown <= 0) {
        countdownActive = false;
        isArmed = true;
      }
    }

    // Siren animation
    if (alarmTriggered) {
      sirenPhase += 0.1;
    }
  };

  p.mousePressed = () => {
    // ARM button
    if (p.mouseX > 120 && p.mouseX < 180 && p.mouseY > 270 && p.mouseY < 310) {
      if (!isArmed && !countdownActive) {
        countdownActive = true;
        countdown = 5;
        alarmTriggered = false;
      }
    }

    // DISARM button
    if (p.mouseX > 220 && p.mouseX < 280 && p.mouseY > 270 && p.mouseY < 310) {
      isArmed = false;
      countdownActive = false;
      alarmTriggered = false;
      motionDetected = false;
    }

    // PIR sensor click (simulate motion)
    if (isArmed && !alarmTriggered && p.mouseX < 130 && p.mouseY > 90 && p.mouseY < 210) {
      motionDetected = true;
      alarmTriggered = true;
    }
  };
};
