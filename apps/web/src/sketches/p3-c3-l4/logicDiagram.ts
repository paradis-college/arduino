/**
 * P3-C3-L4 gif2: Logic diagram updating based on inputs
 * Shows logic flow from inputs to outputs updating in real-time
 */
import type p5 from 'p5';

export const logicDiagramSketch = (p: p5) => {
  let button1 = false;
  let button2 = false;
  let potValue = 512;
  let draggingPot = false;
  
  p.setup = () => {
    p.createCanvas(400, 300);
  };
  
  p.draw = () => {
    p.background(30);
    
    // Title
    p.fill(255);
    p.textSize(16);
    p.textAlign(p.CENTER);
    p.text('Logic Diagram', p.width / 2, 25);
    
    // Input section
    p.fill(255);
    p.textSize(12);
    p.textAlign(p.LEFT);
    p.text('INPUTS', 30, 55);
    
    // Button 1
    const btn1X = 50;
    const btn1Y = 80;
    p.fill(button1 ? [100, 255, 100] : [80, 80, 80]);
    p.stroke(150);
    p.strokeWeight(2);
    p.rect(btn1X, btn1Y, 60, 30, 5);
    p.fill(255);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER);
    p.text('BTN 1', btn1X + 30, btn1Y + 20);
    
    // Button 2
    const btn2X = 50;
    const btn2Y = 130;
    p.fill(button2 ? [100, 255, 100] : [80, 80, 80]);
    p.stroke(150);
    p.strokeWeight(2);
    p.rect(btn2X, btn2Y, 60, 30, 5);
    p.fill(255);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER);
    p.text('BTN 2', btn2X + 30, btn2Y + 20);
    
    // Potentiometer
    const potX = 50;
    const potY = 190;
    p.fill(60);
    p.stroke(150);
    p.strokeWeight(2);
    p.rect(potX, potY, 60, 50, 5);
    p.fill(100);
    p.ellipse(potX + 30, potY + 25, 30);
    
    // Pot indicator
    const potAngle = p.map(potValue, 0, 1023, -p.PI * 0.75, p.PI * 0.75);
    p.stroke(255, 200, 50);
    p.strokeWeight(3);
    p.line(
      potX + 30, potY + 25,
      potX + 30 + Math.cos(potAngle - p.PI / 2) * 12,
      potY + 25 + Math.sin(potAngle - p.PI / 2) * 12
    );
    
    p.noStroke();
    p.fill(255);
    p.textSize(8);
    p.text('POT', potX + 30, potY + 60);
    p.text(potValue.toString(), potX + 30, potY + 70);
    
    // Logic processing box
    const logicX = 160;
    const logicY = 100;
    p.fill(50, 50, 80);
    p.stroke(100, 100, 200);
    p.strokeWeight(2);
    p.rect(logicX, logicY, 80, 100, 5);
    p.fill(255);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER);
    p.text('LOGIC', logicX + 40, logicY + 20);
    p.textSize(8);
    p.text('if (btn1 && btn2)', logicX + 40, logicY + 40);
    p.text('LED1 = ON', logicX + 40, logicY + 55);
    p.text('LED2 = pot/4', logicX + 40, logicY + 75);
    p.text('Buzzer = pot', logicX + 40, logicY + 90);
    
    // Connection lines from inputs to logic
    p.stroke(button1 ? [100, 255, 100] : [80, 80, 80]);
    p.strokeWeight(2);
    p.line(btn1X + 60, btn1Y + 15, logicX, logicY + 30);
    
    p.stroke(button2 ? [100, 255, 100] : [80, 80, 80]);
    p.line(btn2X + 60, btn2Y + 15, logicX, logicY + 50);
    
    p.stroke(100, 100, 200);
    p.line(potX + 60, potY + 25, logicX, logicY + 70);
    
    // Output section
    p.fill(255);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT);
    p.text('OUTPUTS', 290, 55);
    
    // LED 1 (AND logic)
    const led1X = 320;
    const led1Y = 85;
    const led1On = button1 && button2;
    
    if (led1On) {
      p.noStroke();
      for (let i = 3; i > 0; i--) {
        p.fill(255, 100, 100, 50 * (4 - i));
        p.ellipse(led1X, led1Y, 20 + i * 10);
      }
    }
    p.fill(led1On ? [255, 100, 100] : [80, 30, 30]);
    p.stroke(150);
    p.strokeWeight(1);
    p.ellipse(led1X, led1Y, 20);
    p.noStroke();
    p.fill(255);
    p.textSize(8);
    p.textAlign(p.CENTER);
    p.text('LED1', led1X, led1Y + 25);
    
    // LED 2 (Pot brightness)
    const led2X = 320;
    const led2Y = 150;
    const led2Brightness = potValue / 4;
    
    if (led2Brightness > 10) {
      p.noStroke();
      for (let i = 3; i > 0; i--) {
        p.fill(100, 255, 100, (led2Brightness / 255) * 50 * (4 - i));
        p.ellipse(led2X, led2Y, 20 + i * 10);
      }
    }
    p.fill(30 + led2Brightness * 0.8, 80 + led2Brightness * 0.7, 30);
    p.stroke(150);
    p.strokeWeight(1);
    p.ellipse(led2X, led2Y, 20);
    p.noStroke();
    p.fill(255);
    p.textSize(8);
    p.text('LED2', led2X, led2Y + 25);
    
    // Buzzer
    const buzzerX = 320;
    const buzzerY = 215;
    const buzzerFreq = p.map(potValue, 0, 1023, 100, 1000);
    
    p.fill(50);
    p.stroke(150);
    p.strokeWeight(1);
    p.ellipse(buzzerX, buzzerY, 25);
    p.fill(80);
    p.ellipse(buzzerX, buzzerY, 15);
    p.noStroke();
    p.fill(255);
    p.textSize(8);
    p.text('BUZZ', buzzerX, buzzerY + 25);
    p.text(`${Math.round(buzzerFreq)}Hz`, buzzerX, buzzerY + 35);
    
    // Connection lines from logic to outputs
    p.stroke(led1On ? [255, 100, 100] : [80, 80, 80]);
    p.strokeWeight(2);
    p.line(logicX + 80, logicY + 30, led1X - 15, led1Y);
    
    p.stroke(100, Math.min(255, 100 + led2Brightness), 100);
    p.line(logicX + 80, logicY + 50, led2X - 15, led2Y);
    
    p.stroke(100, 100, 200);
    p.line(logicX + 80, logicY + 70, buzzerX - 15, buzzerY);
    
    // Instructions
    p.fill(150);
    p.textSize(10);
    p.textAlign(p.CENTER);
    p.text('Click buttons to toggle | Drag pot knob to adjust', p.width / 2, p.height - 10);
  };
  
  p.mousePressed = () => {
    // Check button 1
    if (p.mouseX >= 50 && p.mouseX <= 110 && p.mouseY >= 80 && p.mouseY <= 110) {
      button1 = !button1;
    }
    // Check button 2
    if (p.mouseX >= 50 && p.mouseX <= 110 && p.mouseY >= 130 && p.mouseY <= 160) {
      button2 = !button2;
    }
    // Check pot
    if (p.dist(p.mouseX, p.mouseY, 80, 215) < 20) {
      draggingPot = true;
    }
  };
  
  p.mouseDragged = () => {
    if (draggingPot) {
      const angle = Math.atan2(p.mouseY - 215, p.mouseX - 80) + p.PI / 2;
      const constrainedAngle = p.constrain(angle, -p.PI * 0.75, p.PI * 0.75);
      potValue = Math.round(p.map(constrainedAngle, -p.PI * 0.75, p.PI * 0.75, 0, 1023));
    }
  };
  
  p.mouseReleased = () => {
    draggingPot = false;
  };
};
