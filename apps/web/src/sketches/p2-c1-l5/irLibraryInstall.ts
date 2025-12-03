/**
 * P2-C1-L5 IRremote Library Installation
 * Animation showing library installation in Arduino IDE
 */
import type p5 from 'p5';

export const irLibraryInstallSketch = (p: p5) => {
  let animationStep = 0;
  let stepProgress = 0;
  const animationSpeed = 0.015;

  p.setup = () => {
    p.createCanvas(600, 400);
    p.textFont('monospace');
  };

  p.draw = () => {
    p.background(40, 44, 52);
    
    drawIDEWindow();
    drawAnimatedSteps();
    drawLabels();
    
    stepProgress += animationSpeed;
    if (stepProgress > 1) {
      stepProgress = 0;
      animationStep = (animationStep + 1) % 5;
    }
  };

  const drawIDEWindow = () => {
    // IDE Window frame
    p.fill(50, 54, 62);
    p.stroke(70, 74, 82);
    p.strokeWeight(2);
    p.rect(100, 50, 400, 300, 8);
    
    // Title bar
    p.fill(60, 64, 72);
    p.noStroke();
    p.rect(100, 50, 400, 30, 8, 8, 0, 0);
    
    // Window controls
    p.fill(255, 95, 86);
    p.ellipse(120, 65, 12, 12);
    p.fill(255, 189, 46);
    p.ellipse(140, 65, 12, 12);
    p.fill(39, 201, 63);
    p.ellipse(160, 65, 12, 12);
    
    // Title
    p.fill(180);
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Arduino IDE - Library Manager', 300, 65);
    
    // Menu bar
    p.fill(45, 49, 57);
    p.rect(100, 80, 400, 25);
    
    p.fill(150);
    p.textSize(10);
    p.textAlign(p.LEFT, p.CENTER);
    const menus = ['File', 'Edit', 'Sketch', 'Tools', 'Help'];
    for (let i = 0; i < menus.length; i++) {
      p.text(menus[i], 115 + i * 60, 92);
    }
    
    // Highlight "Sketch" menu when step 1
    if (animationStep === 1) {
      p.fill(80, 150, 255, 100);
      p.rect(215, 80, 50, 25);
    }
  };

  const drawAnimatedSteps = () => {
    // Step 1: Sketch menu open
    if (animationStep >= 1 && animationStep < 3) {
      p.fill(50, 54, 62);
      p.stroke(70, 74, 82);
      p.strokeWeight(1);
      p.rect(215, 105, 150, 120, 4);
      
      p.fill(180);
      p.noStroke();
      p.textSize(10);
      p.textAlign(p.LEFT, p.CENTER);
      const items = ['Verify/Compile', 'Upload', 'Include Library ▶', 'Add File...', 'Show Sketch'];
      for (let i = 0; i < items.length; i++) {
        if (i === 2 && animationStep >= 2) {
          p.fill(80, 150, 255);
          p.rect(220, 112 + i * 22, 140, 20, 2);
          p.fill(255);
        } else {
          p.fill(180);
        }
        p.text(items[i], 225, 122 + i * 22);
      }
    }
    
    // Step 2: Sub-menu
    if (animationStep >= 2 && animationStep < 4) {
      p.fill(50, 54, 62);
      p.stroke(70, 74, 82);
      p.strokeWeight(1);
      p.rect(365, 127, 130, 80, 4);
      
      p.fill(180);
      p.noStroke();
      p.textSize(10);
      p.textAlign(p.LEFT, p.CENTER);
      const subItems = ['Manage Libraries...', 'Add .ZIP Library...', 'Arduino Libraries'];
      for (let i = 0; i < subItems.length; i++) {
        if (i === 0 && animationStep >= 3) {
          p.fill(80, 150, 255);
          p.rect(370, 132 + i * 22, 120, 20, 2);
          p.fill(255);
        } else {
          p.fill(180);
        }
        p.text(subItems[i], 375, 142 + i * 22);
      }
    }
    
    // Step 4: Library Manager window
    if (animationStep >= 4) {
      // Library Manager popup
      p.fill(45, 49, 57);
      p.stroke(80, 150, 255);
      p.strokeWeight(2);
      p.rect(130, 110, 340, 200, 6);
      
      // Title
      p.fill(60, 64, 72);
      p.noStroke();
      p.rect(130, 110, 340, 28, 6, 6, 0, 0);
      p.fill(200);
      p.textSize(11);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('Library Manager', 300, 124);
      
      // Search box
      p.fill(35, 39, 47);
      p.stroke(70, 74, 82);
      p.strokeWeight(1);
      p.rect(145, 150, 200, 25, 4);
      
      p.fill(150);
      p.noStroke();
      p.textSize(10);
      p.textAlign(p.LEFT, p.CENTER);
      p.text('IRremote', 155, 162);
      
      // Search icon
      p.stroke(150);
      p.strokeWeight(1);
      p.noFill();
      p.ellipse(330, 162, 12, 12);
      p.line(336, 168, 342, 174);
      
      // Search result
      p.fill(55, 59, 67);
      p.noStroke();
      p.rect(145, 185, 310, 60, 4);
      
      p.fill(100, 200, 100);
      p.textSize(12);
      p.textAlign(p.LEFT, p.CENTER);
      p.text('IRremote', 155, 200);
      
      p.fill(150);
      p.textSize(9);
      p.text('by shirriff, z3t0', 155, 218);
      p.text('Infrared remote library for Arduino', 155, 233);
      
      // Install button (pulsing)
      const pulseAlpha = 200 + 55 * p.sin(p.frameCount * 0.1);
      p.fill(80, 150, 255, pulseAlpha);
      p.rect(380, 195, 60, 25, 4);
      p.fill(255);
      p.textSize(10);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('Install', 410, 207);
    }
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.LEFT, p.TOP);
    p.text('Install IRremote Library', 20, 20);
    
    p.textSize(10);
    const steps = [
      '1. Open Sketch menu',
      '2. Include Library → Manage Libraries',
      '3. Search "IRremote"',
      '4. Click Install'
    ];
    
    for (let i = 0; i < steps.length; i++) {
      const done = animationStep > i;
      const active = animationStep === i;
      
      if (done) {
        p.fill(100, 255, 100);
      } else if (active) {
        p.fill(80, 150, 255);
      } else {
        p.fill(100);
      }
      p.text((done ? '✓ ' : (active ? '→ ' : '○ ')) + steps[i], 20, 360 + i * 14);
    }
  };

  p.mousePressed = () => {
    if (p.mouseX > 0 && p.mouseX < 600 && p.mouseY > 0 && p.mouseY < 400) {
      animationStep = 0;
      stepProgress = 0;
    }
  };
};

export default irLibraryInstallSketch;
