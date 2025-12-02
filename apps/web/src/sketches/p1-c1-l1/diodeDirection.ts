/**
 * P1-C1-L1 GIF2: Diode Direction Animation
 * "Diode direction animation: forward = pass, reverse = block, LED icon lights only in forward."
 */
import type p5 from 'p5';

export const diodeDirectionSketch = (p: p5): void => {
  let isForward = true;
  let dotPos = 0;
  let ledGlow = 0;
  let lastToggle = 0;
  
  p.setup = () => {
    p.createCanvas(400, 250);
    p.textAlign(p.CENTER, p.CENTER);
  };
  
  p.draw = () => {
    p.background(30, 30, 40);
    
    // Auto-toggle direction every 3 seconds
    if (p.millis() - lastToggle > 3000) {
      isForward = !isForward;
      lastToggle = p.millis();
      dotPos = 0;
    }
    
    // Draw title
    p.fill(200);
    p.textSize(14);
    p.text(isForward ? 'FORWARD BIAS - Current Flows' : 'REVERSE BIAS - Current Blocked', p.width / 2, 20);
    
    // Draw circuit wire
    p.stroke(100);
    p.strokeWeight(3);
    p.line(50, 125, 150, 125);
    p.line(250, 125, 350, 125);
    
    // Draw diode symbol
    p.strokeWeight(2);
    p.stroke(150);
    
    // Triangle (anode side)
    p.fill(60);
    if (isForward) {
      // Forward: triangle points right
      p.triangle(150, 100, 150, 150, 200, 125);
      // Cathode bar
      p.line(200, 100, 200, 150);
      // LED housing
      p.noFill();
      p.arc(200, 125, 60, 60, -p.HALF_PI, p.HALF_PI);
    } else {
      // Reverse: triangle points left (current tries to flow wrong way)
      p.triangle(250, 100, 250, 150, 200, 125);
      // Cathode bar
      p.line(200, 100, 200, 150);
      // LED housing
      p.noFill();
      p.arc(200, 125, 60, 60, p.HALF_PI, -p.HALF_PI);
    }
    
    // Draw LED light rays when forward
    if (isForward) {
      ledGlow = p.min(ledGlow + 5, 255);
      p.stroke(255, ledGlow, 0, ledGlow);
      p.strokeWeight(2);
      for (let i = 0; i < 5; i++) {
        const angle = p.map(i, 0, 4, -p.PI/4, p.PI/4);
        const x1 = 220 + p.cos(angle) * 20;
        const y1 = 125 + p.sin(angle) * 20;
        const x2 = 220 + p.cos(angle) * 35;
        const y2 = 125 + p.sin(angle) * 35;
        p.line(x1, y1, x2, y2);
      }
      
      // LED glow effect
      p.noStroke();
      p.fill(255, 200, 0, ledGlow * 0.3);
      p.ellipse(210, 125, 50, 50);
    } else {
      ledGlow = p.max(ledGlow - 10, 0);
    }
    
    // Draw moving current dots
    p.noStroke();
    if (isForward) {
      // Current flows through
      dotPos = (dotPos + 3) % 300;
      for (let i = 0; i < 5; i++) {
        const x = 50 + ((dotPos + i * 60) % 300);
        p.fill(0, 255, 255);
        p.ellipse(x, 125, 8, 8);
      }
    } else {
      // Current bounces back
      dotPos = (dotPos + 3) % 100;
      const bounceX = 50 + dotPos;
      if (bounceX > 140) {
        // Bounce back
        p.fill(255, 100, 100);
        p.ellipse(140 - (bounceX - 140), 125, 8, 8);
      } else {
        p.fill(0, 255, 255);
        p.ellipse(bounceX, 125, 8, 8);
      }
      
      // Show blocked symbol
      p.fill(255, 50, 50);
      p.textSize(20);
      p.text('✕', 200, 170);
      p.textSize(12);
      p.text('BLOCKED', 200, 190);
    }
    
    // Labels
    p.fill(150);
    p.textSize(11);
    p.text('Anode (+)', isForward ? 150 : 250, 170);
    p.text('Cathode (-)', isForward ? 250 : 150, 170);
    
    // Click instruction
    p.fill(100);
    p.textSize(10);
    p.text('Click to toggle direction', p.width / 2, p.height - 15);
  };
  
  p.mousePressed = () => {
    if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
      isForward = !isForward;
      lastToggle = p.millis();
      dotPos = 0;
    }
  };
};
