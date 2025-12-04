/**
 * P1-C1-L2 GIF2: Buttons in Series (AND Logic)
 * "Two buttons in series; LED lights only when both pressed (AND logic)."
 */
import type p5 from 'p5';

export const buttonsSeriesSketch = (p: p5): void => {
  let button1Pressed = false;
  let button2Pressed = false;
  let dotPos = 0;
  
  p.setup = () => {
    p.createCanvas(400, 280);
    p.textAlign(p.CENTER, p.CENTER);
  };
  
  p.draw = () => {
    p.background(30, 30, 40);
    
    const ledOn = button1Pressed && button2Pressed;
    
    // Title
    p.fill(200);
    p.textSize(14);
    p.text('Buttons in SERIES (AND Logic)', p.width/2, 20);
    
    // Circuit
    const startX = 40;
    const y = 120;
    
    // Battery
    p.stroke(150);
    p.strokeWeight(2);
    p.line(startX, y - 40, startX, y + 40);
    p.line(startX - 10, y - 40, startX + 10, y - 40);
    p.line(startX - 5, y - 30, startX + 5, y - 30);
    p.fill(150);
    p.noStroke();
    p.textSize(10);
    p.text('+', startX, y - 55);
    p.text('−', startX, y + 55);
    
    // Top wire to button 1
    p.stroke(150);
    p.strokeWeight(2);
    p.line(startX, y - 40, 100, y - 40);
    
    // Button 1
    drawButton(p, 100, y - 40, button1Pressed, 'SW1');
    
    // Wire between buttons
    p.stroke(150);
    p.strokeWeight(2);
    p.line(150, y - 40, 200, y - 40);
    
    // Button 2
    drawButton(p, 200, y - 40, button2Pressed, 'SW2');
    
    // Wire to LED
    p.stroke(150);
    p.strokeWeight(2);
    p.line(250, y - 40, 320, y - 40);
    p.line(320, y - 40, 320, y);
    
    // LED
    drawLED(p, 320, y, ledOn);
    
    // Return wire
    p.stroke(150);
    p.strokeWeight(2);
    p.line(320, y + 30, 320, y + 40);
    p.line(320, y + 40, startX, y + 40);
    
    // Current dots (only if both buttons pressed)
    if (ledOn) {
      dotPos = (dotPos + 3) % 350;
      p.fill(0, 255, 255);
      p.noStroke();
      
      for (let i = 0; i < 4; i++) {
        const dp = (dotPos + i * 90) % 350;
        let px: number, py: number;
        
        if (dp < 100) {
          px = startX + dp * 2.8;
          py = y - 40;
        } else if (dp < 150) {
          px = 320;
          py = y - 40 + (dp - 100);
        } else if (dp < 200) {
          px = 320 - (dp - 150) * 5.6;
          py = y + 40;
        } else {
          px = startX;
          py = y + 40 - (dp - 200) * 0.5;
        }
        
        p.ellipse(px, py, 6, 6);
      }
    }
    
    // AND gate truth table
    p.fill(50);
    p.stroke(100);
    p.strokeWeight(1);
    p.rect(50, 180, 150, 90, 5);
    
    p.fill(200);
    p.noStroke();
    p.textSize(11);
    p.text('AND Truth Table', 125, 195);
    
    p.textSize(9);
    p.text('SW1  SW2  LED', 125, 212);
    
    const rows = [
      {s1: false, s2: false, led: false},
      {s1: true, s2: false, led: false},
      {s1: false, s2: true, led: false},
      {s1: true, s2: true, led: true}
    ];
    
    rows.forEach((row, i) => {
      const ry = 228 + i * 12;
      const isActive = row.s1 === button1Pressed && row.s2 === button2Pressed;
      
      if (isActive) {
        p.fill(0, 100, 255, 50);
        p.noStroke();
        p.rect(55, ry - 6, 140, 12);
      }
      
      p.fill(isActive ? 255 : 150);
      p.text(`${row.s1 ? '1' : '0'}     ${row.s2 ? '1' : '0'}     ${row.led ? '1' : '0'}`, 125, ry);
    });
    
    // Status display
    p.fill(ledOn ? p.color(100, 255, 100) : p.color(255, 100, 100));
    p.textSize(14);
    p.text(ledOn ? 'LED ON' : 'LED OFF', 300, 220);
    
    p.fill(150);
    p.textSize(10);
    p.text('Both switches must be', 300, 240);
    p.text('closed for current to flow', 300, 252);
    
    // Instructions
    p.fill(100);
    p.textSize(10);
    p.text('Click on buttons to toggle', p.width/2, p.height - 10);
  };
  
  function drawButton(p: p5, x: number, y: number, pressed: boolean, label: string) {
    // Button terminals
    p.stroke(150);
    p.strokeWeight(3);
    p.point(x, y);
    p.point(x + 50, y);
    
    // Button lever
    p.strokeWeight(2);
    if (pressed) {
      p.stroke(100, 255, 100);
      p.line(x, y, x + 50, y);
    } else {
      p.stroke(255, 100, 100);
      p.line(x, y, x + 40, y - 20);
    }
    
    // Touch area indicator
    p.noFill();
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(x - 5, y - 25, 60, 35, 3);
    
    // Label
    p.fill(150);
    p.noStroke();
    p.textSize(9);
    p.text(label, x + 25, y + 15);
  }
  
  function drawLED(p: p5, x: number, y: number, on: boolean) {
    p.strokeWeight(2);
    p.stroke(150);
    p.fill(on ? p.color(255, 220, 0) : p.color(80));
    p.triangle(x - 10, y - 10, x + 10, y - 10, x, y + 10);
    p.line(x - 10, y + 10, x + 10, y + 10);
    
    if (on) {
      p.noStroke();
      p.fill(255, 220, 0, 100);
      p.ellipse(x, y, 40, 40);
    }
  }
  
  p.mousePressed = () => {
    // Check button 1 click
    if (p.mouseX > 95 && p.mouseX < 155 && p.mouseY > 55 && p.mouseY < 105) {
      button1Pressed = !button1Pressed;
    }
    // Check button 2 click  
    if (p.mouseX > 195 && p.mouseX < 255 && p.mouseY > 55 && p.mouseY < 105) {
      button2Pressed = !button2Pressed;
    }
  };
};
