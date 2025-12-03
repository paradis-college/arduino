/**
 * P4-C4-L1 Simple Robot Sketch 1
 * Robot following black line path.
 */
import type p5 from 'p5';

export const simpleRobotSketch = (p: p5) => {
  let robotX = 100;
  let robotY = 200;
  let robotAngle = 0;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(240, 235, 220);
    drawTrack();
    updateRobot();
    drawRobot();
    drawLabels();
  };

  const drawTrack = () => {
    p.stroke(30);
    p.strokeWeight(25);
    p.noFill();
    p.beginShape();
    p.vertex(100, 200);
    p.vertex(200, 200);
    p.vertex(250, 150);
    p.vertex(350, 150);
    p.vertex(400, 200);
    p.vertex(500, 200);
    p.vertex(500, 280);
    p.vertex(400, 280);
    p.vertex(300, 250);
    p.vertex(200, 280);
    p.vertex(100, 280);
    p.vertex(100, 200);
    p.endShape();
  };

  const updateRobot = () => {
    // Simple path following
    const targets = [
      {x: 200, y: 200}, {x: 250, y: 150}, {x: 350, y: 150},
      {x: 400, y: 200}, {x: 500, y: 200}, {x: 500, y: 280},
      {x: 400, y: 280}, {x: 300, y: 250}, {x: 200, y: 280},
      {x: 100, y: 280}, {x: 100, y: 200}
    ];
    
    const targetIndex = Math.floor((p.frameCount / 30) % targets.length);
    const target = targets[targetIndex];
    
    const dx = target.x - robotX;
    const dy = target.y - robotY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist > 5) {
      robotX += (dx / dist) * 2;
      robotY += (dy / dist) * 2;
      robotAngle = p.atan2(dy, dx);
    }
  };

  const drawRobot = () => {
    p.push();
    p.translate(robotX, robotY);
    p.rotate(robotAngle);
    
    // Body
    p.fill(100, 150, 200);
    p.stroke(80, 130, 180);
    p.strokeWeight(2);
    p.rect(-20, -15, 40, 30, 5);
    
    // Wheels
    p.fill(50);
    p.rect(-22, -18, 6, 10);
    p.rect(-22, 8, 6, 10);
    p.rect(16, -18, 6, 10);
    p.rect(16, 8, 6, 10);
    
    // Line sensors
    p.fill(255, 100, 100);
    p.ellipse(20, -8, 6, 6);
    p.ellipse(20, 8, 6, 6);
    
    // Eyes
    p.fill(255);
    p.ellipse(-5, -5, 8, 8);
    p.ellipse(-5, 5, 8, 8);
    p.fill(0);
    p.ellipse(-3, -5, 3, 3);
    p.ellipse(-3, 5, 3, 3);
    
    p.pop();
  };

  const drawLabels = () => {
    p.fill(50);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Line Following Robot', 50, 50);
    p.text('→ IR sensors detect black line', 60, 70);
    
    p.fill(100);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Robot follows the black track using line sensors', 300, 360);
  };
};

export default simpleRobotSketch;
