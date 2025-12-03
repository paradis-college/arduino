/**
 * P2-C3-L2 Touch Sensor Toggle Mode
 * Animation showing toggle mode configuration
 */
import type p5 from 'p5';

export const touchToggleModeSketch = (p: p5) => {
  let touchState = false;
  let lastTouchTime = 0;
  let outputState = false;
  let mode: 'momentary' | 'toggle' = 'momentary';

  p.setup = () => {
    p.createCanvas(600, 400);
    p.textFont('monospace');
  };

  p.draw = () => {
    p.background(30, 35, 45);
    
    drawModuleView();
    drawModeSelector();
    drawOutputDisplay();
    drawLabels();
  };

  const drawModuleView = () => {
    const x = 300;
    const y = 100;
    
    // Module background
    p.fill(20, 60, 120);
    p.stroke(40, 90, 160);
    p.strokeWeight(2);
    p.rect(x - 100, y, 200, 140, 8);
    
    // Touch pad
    p.fill(touchState ? p.color(255, 200, 100) : p.color(180, 140, 60));
    p.stroke(touchState ? p.color(255, 220, 150) : p.color(200, 160, 80));
    p.strokeWeight(3);
    p.ellipse(x - 30, y + 50, 70, 70);
    
    // Touch ripple
    if (touchState) {
      p.noFill();
      p.stroke(255, 200, 100, 100);
      const ripple = (p.frameCount % 20) / 20;
      p.ellipse(x - 30, y + 50, 70 + ripple * 40, 70 + ripple * 40);
    }
    
    // Touch instruction
    p.fill(255);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Click to', x - 30, y + 45);
    p.text('touch', x - 30, y + 57);
    
    // Jumper area
    p.fill(30);
    p.stroke(60);
    p.strokeWeight(1);
    p.rect(x + 30, y + 30, 50, 60, 4);
    
    // Jumper pins
    p.fill(180);
    p.ellipse(x + 42, y + 45, 8, 8);
    p.ellipse(x + 55, y + 45, 8, 8);
    p.ellipse(x + 68, y + 45, 8, 8);
    
    // Jumper labels
    p.fill(150);
    p.textSize(8);
    p.text('A', x + 42, y + 58);
    p.text('B', x + 55, y + 58);
    
    // Jumper position indicator
    p.fill(255, 200, 100);
    if (mode === 'momentary') {
      p.rect(x + 38, y + 41, 20, 8, 2);
    } else {
      p.rect(x + 51, y + 41, 20, 8, 2);
    }
    
    // Mode labels
    p.textSize(7);
    p.fill(150);
    p.text('Momentary', x + 45, y + 75);
    p.text('Toggle', x + 65, y + 75);
    
    // Module label
    p.fill(255);
    p.textSize(10);
    p.text('TTP223', x, y + 120);
  };

  const drawModeSelector = () => {
    const x = 100;
    const y = 280;
    
    p.fill(40, 50, 60);
    p.rect(x - 80, y, 160, 100, 6);
    
    p.fill(200);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.LEFT, p.TOP);
    p.text('Select Mode:', x - 70, y + 10);
    
    // Momentary button
    p.fill(mode === 'momentary' ? p.color(80, 150, 255) : p.color(60, 70, 80));
    p.stroke(mode === 'momentary' ? p.color(100, 180, 255) : p.color(80, 90, 100));
    p.strokeWeight(2);
    p.rect(x - 70, y + 35, 70, 30, 4);
    
    p.fill(255);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Momentary', x - 35, y + 50);
    
    // Toggle button
    p.fill(mode === 'toggle' ? p.color(80, 150, 255) : p.color(60, 70, 80));
    p.stroke(mode === 'toggle' ? p.color(100, 180, 255) : p.color(80, 90, 100));
    p.strokeWeight(2);
    p.rect(x, y + 35, 70, 30, 4);
    
    p.fill(255);
    p.noStroke();
    p.text('Toggle', x + 35, y + 50);
    
    // Description
    p.fill(150);
    p.textSize(8);
    p.textAlign(p.LEFT, p.TOP);
    if (mode === 'momentary') {
      p.text('HIGH while touched', x - 70, y + 75);
    } else {
      p.text('Switches state on touch', x - 70, y + 75);
    }
  };

  const drawOutputDisplay = () => {
    const x = 450;
    const y = 280;
    
    p.fill(40, 50, 60);
    p.rect(x - 70, y, 140, 100, 6);
    
    p.fill(200);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.CENTER, p.TOP);
    p.text('Output Signal', x, y + 10);
    
    // LED indicator
    const ledOn = outputState;
    p.fill(ledOn ? p.color(100, 255, 100) : p.color(40, 80, 40));
    p.stroke(ledOn ? p.color(150, 255, 150) : p.color(60, 100, 60));
    p.strokeWeight(2);
    p.ellipse(x, y + 50, 35, 35);
    
    // Glow
    if (ledOn) {
      p.noFill();
      p.stroke(100, 255, 100, 50);
      p.strokeWeight(8);
      p.ellipse(x, y + 50, 45, 45);
    }
    
    // HIGH/LOW label
    p.fill(ledOn ? p.color(100, 255, 100) : p.color(150));
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(ledOn ? 'HIGH' : 'LOW', x, y + 85);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(16);
    p.textAlign(p.LEFT, p.TOP);
    p.text('Touch Sensor Modes', 20, 20);
    
    p.textSize(10);
    p.fill(150);
    p.text('Click the touch pad to test', 20, 45);
    p.text('Click mode buttons to switch', 20, 60);
  };

  p.mousePressed = () => {
    // Check touch pad click
    const padX = 270;
    const padY = 150;
    if (p.dist(p.mouseX, p.mouseY, padX, padY) < 35) {
      touchState = true;
      
      if (mode === 'toggle') {
        outputState = !outputState;
      } else {
        outputState = true;
      }
    }
    
    // Check mode buttons
    if (p.mouseX >= 30 && p.mouseX <= 100 && p.mouseY >= 315 && p.mouseY <= 345) {
      mode = 'momentary';
      outputState = false;
    }
    if (p.mouseX >= 100 && p.mouseX <= 170 && p.mouseY >= 315 && p.mouseY <= 345) {
      mode = 'toggle';
    }
  };

  p.mouseReleased = () => {
    touchState = false;
    if (mode === 'momentary') {
      outputState = false;
    }
  };
};

export default touchToggleModeSketch;
