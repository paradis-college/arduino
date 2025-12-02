/**
 * P3-C4-L3 gif2: Transistor + diode flow path showing switching and flyback
 * Shows current flow through transistor and flyback diode protection
 */
import type p5 from 'p5';

export const transistorFlowSketch = (p: p5) => {
  let motorOn = false;
  let currentParticles: { x: number; y: number; path: number }[] = [];
  let flybackActive = false;
  let flybackTimer = 0;
  
  p.setup = () => {
    p.createCanvas(400, 300);
    // Initialize particles
    for (let i = 0; i < 15; i++) {
      currentParticles.push({
        x: 0,
        y: 0,
        path: Math.floor(Math.random() * 100)
      });
    }
  };
  
  p.draw = () => {
    p.background(30);
    
    // Title
    p.fill(255);
    p.textSize(14);
    p.textAlign(p.CENTER);
    p.text('Transistor Motor Control with Flyback Diode', p.width / 2, 20);
    
    // Power rail (+V)
    p.stroke(255, 100, 100);
    p.strokeWeight(3);
    p.line(50, 50, 350, 50);
    p.fill(255, 100, 100);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT);
    p.text('+V', 30, 55);
    
    // Ground rail
    p.stroke(100, 100, 255);
    p.strokeWeight(3);
    p.line(50, 250, 350, 250);
    p.fill(100, 100, 255);
    p.text('GND', 25, 255);
    
    // Motor (top)
    const motorX = 150;
    const motorY = 100;
    
    // Motor connection to +V
    p.stroke(150);
    p.strokeWeight(2);
    p.line(motorX, 50, motorX, motorY - 25);
    
    // Motor body
    p.fill(60);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(motorX - 25, motorY - 25, 50, 50, 5);
    p.fill(80);
    p.ellipse(motorX, motorY, 30);
    
    // Motor spinning indicator
    if (motorOn) {
      p.stroke(100, 255, 100);
      p.strokeWeight(2);
      const angle = p.frameCount * 0.3;
      for (let i = 0; i < 3; i++) {
        const a = angle + i * (p.PI * 2 / 3);
        p.line(motorX, motorY, motorX + Math.cos(a) * 10, motorY + Math.sin(a) * 10);
      }
    }
    
    p.fill(255);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER);
    p.text('MOTOR', motorX, motorY + 40);
    
    // Flyback diode (parallel to motor)
    const diodeX = 220;
    
    // Diode connections
    p.stroke(150);
    p.strokeWeight(2);
    p.line(motorX + 25, motorY - 15, diodeX, motorY - 15);
    p.line(motorX + 25, motorY + 15, diodeX, motorY + 15);
    p.line(diodeX, motorY - 15, diodeX, motorY - 5);
    p.line(diodeX, motorY + 15, diodeX, motorY + 5);
    
    // Diode symbol
    p.fill(flybackActive ? [255, 200, 50] : [80, 80, 80]);
    p.stroke(flybackActive ? [255, 200, 50] : [150]);
    p.strokeWeight(2);
    p.triangle(diodeX - 8, motorY + 5, diodeX + 8, motorY + 5, diodeX, motorY - 5);
    p.line(diodeX - 8, motorY - 5, diodeX + 8, motorY - 5);
    
    p.fill(255);
    p.noStroke();
    p.textSize(8);
    p.text('FLYBACK', diodeX, motorY + 30);
    p.text('DIODE', diodeX, motorY + 40);
    
    // Transistor (NPN)
    const transX = 150;
    const transY = 180;
    
    // Motor to transistor collector
    p.stroke(150);
    p.strokeWeight(2);
    p.line(motorX, motorY + 25, motorX, transY - 20);
    
    // Transistor body
    p.fill(60);
    p.stroke(100);
    p.strokeWeight(2);
    p.ellipse(transX, transY, 40);
    
    // Transistor internal symbol
    p.stroke(150);
    p.strokeWeight(2);
    p.line(transX - 10, transY - 10, transX - 10, transY + 10); // Base vertical
    p.line(transX - 10, transY - 5, transX + 5, transY - 12); // Collector
    p.line(transX - 10, transY + 5, transX + 5, transY + 12); // Emitter
    // Arrow on emitter
    p.fill(150);
    p.triangle(transX + 2, transY + 10, transX + 8, transY + 10, transX + 5, transY + 15);
    
    // Transistor to ground
    p.stroke(150);
    p.strokeWeight(2);
    p.line(transX, transY + 20, transX, 250);
    
    // Base resistor and Arduino signal
    p.stroke(150);
    p.strokeWeight(2);
    p.line(transX - 20, transY, transX - 40, transY);
    
    // Resistor
    p.fill(100, 60, 30);
    p.stroke(100);
    p.rect(transX - 70, transY - 5, 30, 10, 2);
    
    // Arduino signal wire
    p.stroke(motorOn ? [100, 255, 100] : [100, 100, 100]);
    p.strokeWeight(2);
    p.line(transX - 70, transY, transX - 100, transY);
    p.line(transX - 100, transY, transX - 100, 220);
    
    // Arduino pin indicator
    p.fill(motorOn ? [100, 255, 100] : [80, 80, 80]);
    p.noStroke();
    p.rect(transX - 115, 220, 30, 25, 3);
    p.fill(255);
    p.textSize(8);
    p.text('PIN', transX - 100, 235);
    p.text(motorOn ? 'HIGH' : 'LOW', transX - 100, 243);
    
    // Labels
    p.fill(255);
    p.textSize(10);
    p.textAlign(p.CENTER);
    p.text('NPN', transX, transY + 35);
    p.text('C', transX + 15, transY - 15);
    p.text('B', transX - 25, transY + 3);
    p.text('E', transX + 15, transY + 18);
    
    // Current flow particles
    if (motorOn) {
      for (const particle of currentParticles) {
        particle.path += 2;
        if (particle.path > 200) particle.path = 0;
        
        let px, py;
        if (particle.path < 50) {
          // From +V to motor
          px = motorX;
          py = 50 + particle.path;
        } else if (particle.path < 100) {
          // Through motor to transistor
          px = motorX;
          py = motorY + 25 + (particle.path - 50);
        } else if (particle.path < 150) {
          // Through transistor to ground
          px = motorX;
          py = transY + 20 + (particle.path - 100) * 0.6;
        } else {
          // Along ground
          px = motorX - (particle.path - 150) * 2;
          py = 250;
        }
        
        p.fill(255, 255, 0);
        p.noStroke();
        p.ellipse(px, py, 6);
      }
    }
    
    // Flyback animation when motor turns off
    if (flybackActive) {
      flybackTimer++;
      
      // Show reverse current through diode
      for (let i = 0; i < 5; i++) {
        const progress = ((flybackTimer * 5 + i * 20) % 100) / 100;
        const fx = diodeX;
        const fy = motorY + 15 - progress * 30;
        p.fill(255, 200, 50);
        p.noStroke();
        p.ellipse(fx, fy, 6);
      }
      
      if (flybackTimer > 30) {
        flybackActive = false;
        flybackTimer = 0;
      }
    }
    
    // Control button
    const btnX = 300;
    const btnY = 200;
    p.fill(motorOn ? [100, 200, 100] : [80, 80, 80]);
    p.stroke(150);
    p.strokeWeight(2);
    p.rect(btnX, btnY, 80, 40, 5);
    p.fill(255);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER);
    p.text(motorOn ? 'MOTOR ON' : 'MOTOR OFF', btnX + 40, btnY + 25);
    
    // Explanation
    p.fill(150);
    p.textSize(9);
    p.text('Click to toggle', btnX + 40, btnY + 55);
    
    // Status text
    p.fill(flybackActive ? [255, 200, 50] : [150]);
    p.textSize(10);
    p.textAlign(p.LEFT);
    if (flybackActive) {
      p.text('Flyback diode absorbing back-EMF!', 250, 130);
    }
  };
  
  p.mousePressed = () => {
    // Check button click
    if (p.mouseX >= 300 && p.mouseX <= 380 && p.mouseY >= 200 && p.mouseY <= 240) {
      if (motorOn) {
        // Turning off - trigger flyback
        flybackActive = true;
        flybackTimer = 0;
      }
      motorOn = !motorOn;
    }
  };
};
