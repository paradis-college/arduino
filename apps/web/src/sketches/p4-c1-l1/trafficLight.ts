/**
 * P4-C1-L1 Traffic Light Sketch 1
 * Intersection with animated phases cycling R→Y→G.
 */
import type p5 from 'p5';

export const trafficLightSketch = (p: p5) => {
  let phase: 'red' | 'yellow' | 'green' = 'red';
  let timer = 0;
  const phaseDurations = { red: 3000, yellow: 1500, green: 3000 };

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(60, 70, 80);
    
    timer += p.deltaTime;
    if (timer >= phaseDurations[phase]) {
      timer = 0;
      phase = phase === 'red' ? 'green' : phase === 'green' ? 'yellow' : 'red';
    }
    
    drawRoad();
    drawTrafficLight(150, 100);
    drawTrafficLight(450, 100);
    drawCars();
    drawLabels();
  };

  const drawRoad = () => {
    // Vertical road
    p.fill(50);
    p.noStroke();
    p.rect(250, 0, 100, 400);
    
    // Horizontal road
    p.rect(0, 150, 600, 100);
    
    // Center lines
    p.stroke(255, 200, 0);
    p.strokeWeight(3);
    for (let i = 0; i < 600; i += 40) {
      p.line(i, 200, i + 20, 200);
    }
    for (let i = 0; i < 400; i += 40) {
      p.line(300, i, 300, i + 20);
    }
  };

  const drawTrafficLight = (x: number, y: number) => {
    // Post
    p.fill(80);
    p.stroke(60);
    p.strokeWeight(2);
    p.rect(x - 10, y, 20, 150);
    
    // Light housing
    p.fill(40);
    p.rect(x - 25, y - 90, 50, 100, 10);
    
    // Red
    const redOn = phase === 'red';
    if (redOn) {
      p.noStroke();
      for (let r = 25; r > 0; r -= 5) {
        p.fill(255, 0, 0, (1 - r / 25) * 150);
        p.ellipse(x, y - 65, r * 2, r * 2);
      }
    }
    p.fill(redOn ? p.color(255, 0, 0) : p.color(60, 0, 0));
    p.stroke(50);
    p.strokeWeight(2);
    p.ellipse(x, y - 65, 25, 25);
    
    // Yellow
    const yellowOn = phase === 'yellow';
    if (yellowOn) {
      p.noStroke();
      for (let r = 25; r > 0; r -= 5) {
        p.fill(255, 200, 0, (1 - r / 25) * 150);
        p.ellipse(x, y - 40, r * 2, r * 2);
      }
    }
    p.fill(yellowOn ? p.color(255, 200, 0) : p.color(60, 50, 0));
    p.stroke(50);
    p.strokeWeight(2);
    p.ellipse(x, y - 40, 25, 25);
    
    // Green
    const greenOn = phase === 'green';
    if (greenOn) {
      p.noStroke();
      for (let r = 25; r > 0; r -= 5) {
        p.fill(0, 255, 0, (1 - r / 25) * 150);
        p.ellipse(x, y - 15, r * 2, r * 2);
      }
    }
    p.fill(greenOn ? p.color(0, 255, 0) : p.color(0, 60, 0));
    p.stroke(50);
    p.strokeWeight(2);
    p.ellipse(x, y - 15, 25, 25);
  };

  const drawCars = () => {
    const speed = phase === 'green' ? 3 : phase === 'yellow' ? 1 : 0;
    const carX = (p.frameCount * speed) % 700 - 50;
    
    // Car body
    p.fill(100, 150, 200);
    p.stroke(80, 130, 180);
    p.strokeWeight(2);
    p.rect(carX, 175, 50, 20, 5);
    p.rect(carX + 8, 165, 30, 15, 3);
    
    // Wheels
    p.fill(40);
    p.ellipse(carX + 12, 197, 12, 12);
    p.ellipse(carX + 38, 197, 12, 12);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.CENTER, p.CENTER);
    
    const phaseText = phase.toUpperCase();
    const phaseColor = phase === 'red' ? p.color(255, 100, 100) : phase === 'yellow' ? p.color(255, 200, 100) : p.color(100, 255, 100);
    p.fill(phaseColor);
    p.text(`Phase: ${phaseText}`, 300, 350);
    
    p.fill(150);
    p.textSize(11);
    p.text('Traffic light cycles: RED → GREEN → YELLOW → RED...', 300, 380);
  };
};

export default trafficLightSketch;
