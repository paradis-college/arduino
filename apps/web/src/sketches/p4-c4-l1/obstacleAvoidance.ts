import type p5 from "p5";

/**
 * P4-C4-L1 Simple Robot - gif2
 * Ultrasonic-based obstacle avoidance turning robot away
 */
export const obstacleAvoidanceSketch = (p: p5) => {
  let robotX = 200;
  let robotY = 280;
  let robotAngle = -p.PI / 2; // Facing up
  let robotSpeed = 1.5;

  let obstacles: { x: number; y: number; width: number; height: number }[] = [];
  let sensorDistance = 100;
  let detectedObstacle = false;
  let turningDirection = 0; // -1 left, 0 straight, 1 right
  let turnTimer = 0;

  p.setup = () => {
    p.createCanvas(400, 350);
    p.textAlign(p.CENTER, p.CENTER);

    // Create some obstacles
    obstacles = [
      { x: 150, y: 100, width: 60, height: 40 },
      { x: 280, y: 150, width: 50, height: 50 },
      { x: 100, y: 200, width: 40, height: 60 },
      { x: 250, y: 60, width: 70, height: 30 },
    ];
  };

  p.draw = () => {
    p.background(240, 235, 220);

    // Title
    p.fill(50);
    p.textSize(14);
    p.noStroke();
    p.text("Ultrasonic Obstacle Avoidance Robot", p.width / 2, 20);

    // Draw floor grid
    drawFloorGrid();

    // Draw obstacles
    drawObstacles();

    // Draw ultrasonic sensor cone
    drawSensorCone();

    // Draw robot
    drawRobot();

    // Update robot position and behavior
    updateRobot();

    // Status display
    drawStatus();

    // Instructions
    p.fill(100);
    p.textSize(9);
    p.text("Watch the robot navigate around obstacles", p.width / 2, 335);
  };

  const drawFloorGrid = () => {
    p.stroke(220, 215, 200);
    p.strokeWeight(1);
    for (let x = 0; x < p.width; x += 30) {
      p.line(x, 40, x, 320);
    }
    for (let y = 40; y < 320; y += 30) {
      p.line(0, y, p.width, y);
    }
  };

  const drawObstacles = () => {
    p.fill(139, 90, 43);
    p.stroke(100, 60, 30);
    p.strokeWeight(2);

    for (const obs of obstacles) {
      p.rect(obs.x, obs.y, obs.width, obs.height, 5);

      // Add some detail
      p.fill(120, 75, 35);
      p.noStroke();
      p.rect(obs.x + 5, obs.y + 5, obs.width - 10, obs.height - 10, 3);
    }
  };

  const drawSensorCone = () => {
    // Calculate sensor direction
    const sensorX = robotX + Math.cos(robotAngle) * 20;
    const sensorY = robotY + Math.sin(robotAngle) * 20;

    // Detection cone
    const coneAngle = p.PI / 6; // 30 degree spread

    p.push();
    p.translate(sensorX, sensorY);
    p.rotate(robotAngle);

    // Cone color based on detection
    if (detectedObstacle) {
      p.fill(255, 100, 100, 60);
    } else {
      p.fill(100, 200, 100, 40);
    }
    p.noStroke();

    // Draw cone
    p.beginShape();
    p.vertex(0, 0);
    const displayDistance = Math.min(sensorDistance, 80);
    p.vertex(displayDistance, -displayDistance * Math.tan(coneAngle));
    p.vertex(displayDistance, displayDistance * Math.tan(coneAngle));
    p.endShape(p.CLOSE);

    // Ultrasonic wave rings
    p.noFill();
    p.stroke(detectedObstacle ? p.color(255, 100, 100, 150) : p.color(100, 150, 255, 100));
    p.strokeWeight(1);

    const numRings = 3;
    const animOffset = (p.frameCount % 30) / 30;
    for (let i = 0; i < numRings; i++) {
      const ringDist = ((i + animOffset) / numRings) * displayDistance;
      p.arc(0, 0, ringDist * 2, ringDist * 1.5, -coneAngle, coneAngle);
    }

    p.pop();

    // Distance reading
    p.fill(50);
    p.noStroke();
    p.textSize(10);
    p.text(`${Math.round(sensorDistance)} cm`, sensorX + Math.cos(robotAngle) * 50, sensorY + Math.sin(robotAngle) * 50);
  };

  const drawRobot = () => {
    p.push();
    p.translate(robotX, robotY);
    p.rotate(robotAngle);

    // Robot body
    p.fill(50, 100, 150);
    p.stroke(30, 70, 120);
    p.strokeWeight(2);
    p.rect(-20, -15, 40, 30, 5);

    // Wheels
    p.fill(40);
    p.noStroke();
    p.rect(-22, -18, 8, 8, 2); // Left front
    p.rect(-22, 10, 8, 8, 2);  // Left back
    p.rect(14, -18, 8, 8, 2);  // Right front
    p.rect(14, 10, 8, 8, 2);   // Right back

    // Wheel rotation indicator
    const wheelSpin = p.frameCount * 0.3 * robotSpeed;
    p.stroke(80);
    p.strokeWeight(1);
    for (const wx of [-18, 18]) {
      for (const wy of [-14, 14]) {
        p.push();
        p.translate(wx, wy);
        p.rotate(wheelSpin);
        p.line(-3, 0, 3, 0);
        p.pop();
      }
    }

    // Ultrasonic sensor
    p.fill(100, 100, 120);
    p.noStroke();
    p.rect(15, -8, 10, 16, 2);

    // Sensor eyes
    p.fill(detectedObstacle ? p.color(255, 100, 100) : p.color(200));
    p.circle(18, -4, 6);
    p.circle(18, 4, 6);

    // Direction arrow
    p.fill(255, 200, 50);
    p.noStroke();
    p.triangle(25, 0, 18, -5, 18, 5);

    p.pop();

    // Turning indicator
    if (turningDirection !== 0) {
      p.fill(255, 200, 50);
      p.textSize(16);
      const arrowX = robotX + (turningDirection > 0 ? 40 : -40);
      p.text(turningDirection > 0 ? "↻" : "↺", arrowX, robotY);
    }
  };

  const drawStatus = () => {
    // Status panel
    p.fill(255, 250, 245);
    p.stroke(200);
    p.strokeWeight(1);
    p.rect(10, 40, 80, 50, 5);

    p.fill(50);
    p.noStroke();
    p.textSize(9);
    p.textAlign(p.LEFT, p.CENTER);
    p.text("Status:", 15, 52);

    if (detectedObstacle) {
      p.fill(200, 50, 50);
      p.text("OBSTACLE!", 15, 65);
      p.text("Turning...", 15, 78);
    } else {
      p.fill(50, 150, 50);
      p.text("Clear path", 15, 65);
      p.text("Moving...", 15, 78);
    }

    p.textAlign(p.CENTER, p.CENTER);
  };

  const updateRobot = () => {
    // Check for obstacles
    sensorDistance = checkObstacleDistance();
    detectedObstacle = sensorDistance < 60;

    // Turning logic
    if (turnTimer > 0) {
      turnTimer--;
      robotAngle += turningDirection * 0.05;
    } else if (detectedObstacle) {
      // Start turning
      turningDirection = Math.random() > 0.5 ? 1 : -1;
      turnTimer = 30;
    } else {
      turningDirection = 0;
      // Move forward
      robotX += Math.cos(robotAngle) * robotSpeed;
      robotY += Math.sin(robotAngle) * robotSpeed;
    }

    // Keep robot in bounds
    if (robotX < 30) { robotX = 30; robotAngle = 0; }
    if (robotX > 370) { robotX = 370; robotAngle = p.PI; }
    if (robotY < 60) { robotY = 60; robotAngle = p.PI / 2; }
    if (robotY > 300) { robotY = 300; robotAngle = -p.PI / 2; }
  };

  const checkObstacleDistance = () => {
    let minDistance = 150;

    for (const obs of obstacles) {
      // Simple ray-box intersection
      const dirX = Math.cos(robotAngle);
      const dirY = Math.sin(robotAngle);

      // Check distance to obstacle center
      const obsCenterX = obs.x + obs.width / 2;
      const obsCenterY = obs.y + obs.height / 2;

      // Vector from robot to obstacle
      const dx = obsCenterX - robotX;
      const dy = obsCenterY - robotY;

      // Check if obstacle is in front of robot
      const dot = dx * dirX + dy * dirY;
      if (dot > 0) {
        // Check perpendicular distance
        const perpDist = Math.abs(dx * dirY - dy * dirX);
        const maxExtent = Math.max(obs.width, obs.height) / 2 + 20;

        if (perpDist < maxExtent) {
          const dist = Math.sqrt(dx * dx + dy * dy) - maxExtent;
          minDistance = Math.min(minDistance, dist);
        }
      }
    }

    return Math.max(10, minDistance);
  };
};
