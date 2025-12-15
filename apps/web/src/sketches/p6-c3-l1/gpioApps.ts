/**
 * P6-C3-L1 GPIO + Local Apps Sketch 1
 * GPIO event triggering UI change in small desktop window.
 */
import type p5 from 'p5';

export const gpioAppsSketch = (p: p5) => {
  let buttonPressed = false;
  let eventLog: string[] = [];

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);
    drawButton();
    drawDesktopApp();
    drawEventLog();
    drawLabels();
  };

  p.mousePressed = () => {
    if (p.dist(p.mouseX, p.mouseY, 120, 200) < 30) {
      buttonPressed = true;
      addEvent('Button PRESSED');
    }
  };

  p.mouseReleased = () => {
    if (buttonPressed) {
      buttonPressed = false;
      addEvent('Button RELEASED');
    }
  };

  const addEvent = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    eventLog.unshift(`[${time}] ${msg}`);
    if (eventLog.length > 6) eventLog.pop();
  };

  const drawButton = () => {
    // GPIO Button
    p.fill(50, 55, 65);
    p.stroke(80);
    p.strokeWeight(2);
    p.rect(70, 130, 100, 140, 10);

    // Physical button
    p.fill(buttonPressed ? p.color(100, 200, 100) : p.color(200, 80, 80));
    p.stroke(buttonPressed ? p.color(80, 180, 80) : p.color(180, 60, 60));
    p.strokeWeight(3);
    p.ellipse(120, 200, 60, 60);

    p.fill(255);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('GPIO', 120, 195);
    p.text('Button', 120, 210);

    // Connection wire
    p.stroke(100, 150, 200);
    p.strokeWeight(3);
    p.line(170, 200, 250, 200);

    // Label
    p.fill(200);
    p.textSize(11);
    p.text('Hardware', 120, 290);
  };

  const drawDesktopApp = () => {
    // Desktop window
    p.fill(50, 55, 65);
    p.stroke(80);
    p.strokeWeight(2);
    p.rect(260, 100, 200, 180, 8);

    // Title bar
    p.fill(60, 65, 75);
    p.rect(260, 100, 200, 25, 8, 8, 0, 0);

    // Window buttons
    p.fill(255, 100, 100);
    p.noStroke();
    p.ellipse(275, 112, 10, 10);
    p.fill(255, 200, 100);
    p.ellipse(290, 112, 10, 10);
    p.fill(100, 255, 100);
    p.ellipse(305, 112, 10, 10);

    p.fill(200);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('GPIO Monitor App', 360, 112);

    // App content
    p.fill(40, 45, 55);
    p.rect(270, 135, 180, 135, 5);

    // Status indicator
    const statusColor = buttonPressed ? p.color(100, 255, 100) : p.color(255, 100, 100);

    if (buttonPressed) {
      p.noStroke();
      for (let r = 40; r > 0; r -= 8) {
        p.fill(100, 255, 100, (1 - r / 40) * 100);
        p.ellipse(360, 180, r * 2, r * 2);
      }
    }

    p.fill(statusColor);
    p.stroke(80);
    p.strokeWeight(2);
    p.ellipse(360, 180, 50, 50);

    p.fill(255);
    p.noStroke();
    p.textSize(12);
    p.text(buttonPressed ? 'PRESSED' : 'IDLE', 360, 180);

    // Status text
    p.fill(statusColor);
    p.textSize(14);
    p.text(`GPIO State: ${buttonPressed ? 'HIGH' : 'LOW'}`, 360, 235);

    // Label
    p.fill(200);
    p.textSize(11);
    p.text('Desktop App', 360, 300);
  };

  const drawEventLog = () => {
    // Log panel
    p.fill(40, 45, 55);
    p.stroke(80);
    p.strokeWeight(2);
    p.rect(480, 100, 100, 180, 8);

    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Event Log', 530, 88);

    // Log entries
    p.textSize(8);
    p.textAlign(p.LEFT, p.CENTER);
    for (let i = 0; i < eventLog.length; i++) {
      p.fill(150);
      p.text(eventLog[i], 485, 120 + i * 25);
    }
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('GPIO + Desktop Application', 50, 50);
    p.text('→ Hardware events trigger software UI updates', 60, 70);

    p.fill(150);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Click the GPIO button to trigger app event', 300, 365);
  };
};

export default gpioAppsSketch;
