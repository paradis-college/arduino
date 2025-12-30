import type p5 from "p5";

/**
 * P4-C1-L1 Traffic Light - gif2
 * Pedestrian button triggering walk phase
 */
export const pedestrianButtonSketch = (p: p5) => {
  let phase: "normal" | "walk-request" | "walk" = "normal";
  let timer = 0;
  let buttonPressed = false;
  let walkCountdown = 0;

  // Traffic light states
  let northSouthLight = "green"; // green, yellow, red
  let eastWestLight = "red";
  let walkSignal = "dont-walk"; // walk, dont-walk, flashing

  p.setup = () => {
    p.createCanvas(400, 350);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    p.background(50, 60, 70);

    // Title
    p.fill(255);
    p.textSize(14);
    p.noStroke();
    p.text("Pedestrian Crossing System", p.width / 2, 20);

    // Draw intersection
    drawIntersection();

    // Draw traffic lights
    drawTrafficLight(60, 80, northSouthLight, "N-S");
    drawTrafficLight(280, 80, eastWestLight, "E-W");

    // Draw pedestrian signal
    drawPedestrianSignal(170, 140);

    // Draw pedestrian button
    drawPedestrianButton(170, 260);

    // Status display
    p.fill(255);
    p.textSize(12);
    p.text(getStatusText(), p.width / 2, 320);

    // Update timer and phase logic
    timer++;
    updatePhases();
  };

  const drawIntersection = () => {
    // Roads
    p.fill(70, 70, 80);
    p.noStroke();
    p.rect(150, 0, 100, 350); // Vertical road
    p.rect(0, 100, 400, 100); // Horizontal road

    // Crosswalk stripes
    p.fill(255);
    for (let i = 0; i < 5; i++) {
      p.rect(155 + i * 18, 100, 10, 100);
    }

    // Road markings
    p.stroke(255, 200, 50);
    p.strokeWeight(2);
    (p.drawingContext as CanvasRenderingContext2D).setLineDash([10, 10]);
    p.line(200, 0, 200, 100);
    p.line(200, 200, 200, 350);
    p.line(0, 150, 150, 150);
    p.line(250, 150, 400, 150);
    (p.drawingContext as CanvasRenderingContext2D).setLineDash([]);
  };

  const drawTrafficLight = (x: number, y: number, state: string, label: string) => {
    // Housing
    p.fill(30);
    p.stroke(50);
    p.strokeWeight(2);
    p.rect(x, y, 40, 80, 5);

    // Red light
    p.fill(state === "red" ? p.color(255, 50, 50) : p.color(80, 30, 30));
    p.noStroke();
    p.circle(x + 20, y + 15, 20);

    // Yellow light
    p.fill(state === "yellow" ? p.color(255, 220, 50) : p.color(80, 70, 30));
    p.circle(x + 20, y + 40, 20);

    // Green light
    p.fill(state === "green" ? p.color(50, 255, 50) : p.color(30, 80, 30));
    p.circle(x + 20, y + 65, 20);

    // Label
    p.fill(200);
    p.textSize(10);
    p.text(label, x + 20, y - 10);
  };

  const drawPedestrianSignal = (x: number, y: number) => {
    // Housing
    p.fill(30);
    p.stroke(50);
    p.strokeWeight(2);
    p.rect(x - 25, y, 50, 60, 5);

    // Walk figure
    const walkColor = walkSignal === "walk" || (walkSignal === "flashing" && p.frameCount % 30 < 15)
      ? p.color(255, 255, 255)
      : p.color(50, 50, 50);
    p.fill(walkColor);
    p.noStroke();
    // Head
    p.circle(x, y + 15, 12);
    // Body (walking pose)
    p.strokeWeight(3);
    p.stroke(walkColor);
    p.line(x, y + 21, x, y + 35);
    p.line(x, y + 35, x - 8, y + 50);
    p.line(x, y + 35, x + 8, y + 50);
    p.line(x, y + 26, x - 6, y + 32);
    p.line(x, y + 26, x + 6, y + 32);

    // Don't walk (hand) indicator
    if (walkSignal === "dont-walk") {
      p.fill(255, 100, 100);
      p.noStroke();
      // Hand shape
      p.rect(x - 8, y + 10, 16, 20, 3);
      p.circle(x - 5, y + 8, 6);
      p.circle(x, y + 6, 6);
      p.circle(x + 5, y + 8, 6);
    }

    // Countdown
    if (walkSignal === "walk" || walkSignal === "flashing") {
      p.fill(255);
      p.noStroke();
      p.textSize(16);
      p.text(walkCountdown, x, y + 75);
    }
  };

  const drawPedestrianButton = (x: number, y: number) => {
    // Button post
    p.fill(60);
    p.noStroke();
    p.rect(x - 5, y, 10, 40);

    // Button box
    p.fill(buttonPressed ? 100 : 70);
    p.stroke(90);
    p.strokeWeight(2);
    p.rect(x - 20, y - 30, 40, 35, 5);

    // Button
    const isHovered = p.dist(p.mouseX, p.mouseY, x, y - 12) < 12;
    p.fill(buttonPressed ? p.color(50, 200, 50) : (isHovered ? p.color(220, 100, 100) : p.color(180, 50, 50)));
    p.noStroke();
    p.circle(x, y - 12, 24);

    // Button label
    p.fill(255);
    p.textSize(8);
    p.text("PUSH", x, y - 12);

    // Instructions
    p.fill(200);
    p.textSize(9);
    p.text("Click to request", x, y + 55);
    p.text("crossing", x, y + 65);
  };

  const getStatusText = () => {
    if (phase === "normal") {
      return "Normal traffic flow - Press button to cross";
    } else if (phase === "walk-request") {
      return "Walk request received - Please wait...";
    } else {
      return `WALK - ${walkCountdown} seconds remaining`;
    }
  };

  const updatePhases = () => {
    if (phase === "walk-request" && timer > 90) {
      // Transition to walk phase
      phase = "walk";
      northSouthLight = "red";
      eastWestLight = "red";
      walkSignal = "walk";
      walkCountdown = 10;
      timer = 0;
    } else if (phase === "walk") {
      if (timer % 60 === 0 && walkCountdown > 0) {
        walkCountdown--;
      }
      if (walkCountdown <= 3) {
        walkSignal = "flashing";
      }
      if (walkCountdown <= 0) {
        // Return to normal
        phase = "normal";
        walkSignal = "dont-walk";
        northSouthLight = "green";
        buttonPressed = false;
        timer = 0;
      }
    }
  };

  p.mousePressed = () => {
    const x = 170;
    const y = 248;
    if (p.dist(p.mouseX, p.mouseY, x, y) < 15 && phase === "normal") {
      buttonPressed = true;
      phase = "walk-request";
      northSouthLight = "yellow";
      timer = 0;
    }
  };

  // Remove unused polyfill - we now use drawingContext directly
};
