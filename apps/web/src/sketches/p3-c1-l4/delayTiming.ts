/**
 * P3-C1-L4 Understanding delay() Sketch 1
 * CPU timeline with 'blocked' segments during delay.
 */
import type p5 from 'p5';

export const delayTimingSketch = (p: p5) => {
  let programCounter = 0;
  let isBlocked = false;
  let blockTimer = 0;
  const totalSteps = 100;
  const delayDuration = 30; // frames

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);
    
    // Simulate program execution
    if (!isBlocked) {
      programCounter++;
      if (programCounter % 20 === 0) {
        // Hit a delay() call
        isBlocked = true;
        blockTimer = delayDuration;
      }
    } else {
      blockTimer--;
      if (blockTimer <= 0) {
        isBlocked = false;
      }
    }
    
    if (programCounter > totalSteps) {
      programCounter = 0;
    }
    
    drawTimeline();
    drawCPUIndicator();
    drawCodeVisualization();
    drawLabels();
  };

  const drawTimeline = () => {
    const x = 50;
    const y = 200;
    const w = 500;
    const h = 60;
    
    // Timeline background
    p.fill(40, 45, 55);
    p.stroke(80);
    p.strokeWeight(2);
    p.rect(x, y - h / 2, w, h, 5);
    
    // Draw execution blocks
    const blockWidth = w / 5;
    for (let i = 0; i < 5; i++) {
      const blockX = x + i * blockWidth;
      
      // Running segment
      p.fill(100, 200, 100);
      p.noStroke();
      p.rect(blockX + 2, y - h / 2 + 5, blockWidth * 0.3, h - 10, 3);
      
      // Blocked (delay) segment
      p.fill(255, 100, 100, 150);
      p.rect(blockX + blockWidth * 0.3 + 4, y - h / 2 + 5, blockWidth * 0.6, h - 10, 3);
      
      // Pattern for blocked segment
      p.stroke(255, 100, 100);
      p.strokeWeight(1);
      for (let j = 0; j < 5; j++) {
        const lineX = blockX + blockWidth * 0.3 + 10 + j * 12;
        p.line(lineX, y - h / 2 + 10, lineX + 5, y + h / 2 - 10);
      }
    }
    
    // Current position marker
    const markerX = x + (programCounter / totalSteps) * w;
    p.fill(255, 200, 100);
    p.noStroke();
    p.triangle(markerX - 8, y - h / 2 - 5, markerX + 8, y - h / 2 - 5, markerX, y - h / 2 + 10);
    
    // Timeline labels
    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Program Execution Timeline', x + w / 2, y - h / 2 - 25);
    p.text('Time →', x + w / 2, y + h / 2 + 15);
    
    // Legend
    const legendY = y + h / 2 + 35;
    p.fill(100, 200, 100);
    p.rect(x + 100, legendY - 6, 20, 12, 2);
    p.fill(200);
    p.textSize(10);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Running', x + 125, legendY);
    
    p.fill(255, 100, 100, 150);
    p.rect(x + 220, legendY - 6, 20, 12, 2);
    p.fill(200);
    p.text('Blocked (delay)', x + 245, legendY);
  };

  const drawCPUIndicator = () => {
    const x = 500;
    const y = 100;
    
    // CPU status box
    p.fill(40, 45, 55);
    p.stroke(isBlocked ? p.color(255, 100, 100) : p.color(100, 200, 100));
    p.strokeWeight(3);
    p.rect(x - 50, y - 40, 100, 80, 10);
    
    // CPU icon
    p.fill(60, 60, 70);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(x - 25, y - 20, 50, 40, 5);
    
    // CPU pins
    for (let i = 0; i < 5; i++) {
      p.rect(x - 30, y - 15 + i * 8, 8, 4);
      p.rect(x + 22, y - 15 + i * 8, 8, 4);
    }
    
    // Status indicator
    p.fill(isBlocked ? p.color(255, 100, 100) : p.color(100, 255, 100));
    p.noStroke();
    p.ellipse(x, y + 50, 15, 15);
    
    // Status text
    p.fill(isBlocked ? p.color(255, 150, 150) : p.color(150, 255, 150));
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(isBlocked ? 'BLOCKED' : 'RUNNING', x, y + 70);
    
    // Block timer
    if (isBlocked) {
      p.fill(255, 200, 100);
      p.textSize(10);
      p.text(`${blockTimer} frames left`, x, y + 85);
    }
  };

  const drawCodeVisualization = () => {
    const x = 70;
    const y = 80;
    
    // Code box
    p.fill(30, 35, 40);
    p.stroke(60);
    p.strokeWeight(1);
    p.rect(x, y, 200, 90, 5);
    
    // Code lines
    const currentLine = isBlocked ? 2 : (programCounter % 4);
    
    p.textFont('monospace');
    p.textSize(11);
    p.textAlign(p.LEFT, p.CENTER);
    
    const lines = [
      'digitalWrite(LED, HIGH);',
      'delay(1000);',
      'digitalWrite(LED, LOW);',
      'delay(1000);'
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const lineY = y + 18 + i * 18;
      
      // Highlight current line
      if (i === currentLine) {
        p.fill(isBlocked ? p.color(100, 50, 50) : p.color(50, 100, 50));
        p.noStroke();
        p.rect(x + 5, lineY - 8, 190, 16);
      }
      
      // Line number
      p.fill(100);
      p.text(`${i + 1}`, x + 10, lineY);
      
      // Code
      p.fill(lines[i].includes('delay') ? p.color(255, 150, 100) : p.color(150, 200, 255));
      p.text(lines[i], x + 30, lineY);
    }
    
    // Arrow pointing to current line
    const arrowY = y + 18 + currentLine * 18;
    p.fill(255, 200, 100);
    p.noStroke();
    p.triangle(x - 15, arrowY - 5, x - 15, arrowY + 5, x - 5, arrowY);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('delay() blocks ALL code execution', 50, 50);
    p.text('→ CPU cannot do anything else during delay', 60, 70);
    
    p.fill(255, 150, 100);
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Problem: Cannot read buttons or update display during delay()!', 300, 365);
    
    p.fill(150);
    p.textSize(10);
    p.text('Use millis() for non-blocking timing', 300, 385);
  };
};

export default delayTimingSketch;
