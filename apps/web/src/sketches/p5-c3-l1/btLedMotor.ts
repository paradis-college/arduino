/**
 * P5-C3-L1 gif2: Virtual LED/motor responding to wireless commands
 * Shows LED and motor reacting to Bluetooth commands
 */
import type p5 from 'p5';

export const btLedMotorSketch = (p: p5) => {
  let ledState = false;
  let motorSpeed = 0;
  let targetMotorSpeed = 0;
  let motorAngle = 0;
  let lastCommand = '---';
  let commandFlash = 0;
  
  p.setup = () => {
    p.createCanvas(400, 300);
  };
  
  p.draw = () => {
    p.background(40);
    
    // Phone icon
    p.fill(50);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(20, 30, 80, 150, 10);
    
    // Phone screen
    p.fill(30);
    p.noStroke();
    p.rect(25, 45, 70, 110);
    
    // Phone buttons
    const btnLabels = ['LED ON', 'LED OFF', 'SPD+', 'SPD-'];
    const btnColors = [
      p.color(50, 150, 50),
      p.color(150, 50, 50),
      p.color(50, 100, 150),
      p.color(100, 100, 50)
    ];
    
    for (let i = 0; i < 4; i++) {
      const x = 30 + (i % 2) * 35;
      const y = 55 + Math.floor(i / 2) * 50;
      
      p.fill(btnColors[i]);
      p.stroke(150);
      p.strokeWeight(1);
      p.rect(x, y, 30, 35, 3);
      
      p.fill(255);
      p.noStroke();
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(7);
      p.text(btnLabels[i], x + 15, y + 17);
    }
    
    // Bluetooth symbol
    const btX = 130;
    const btY = 105;
    
    // Animate Bluetooth waves
    p.noFill();
    p.stroke(100, 150, 255, 150);
    p.strokeWeight(2);
    for (let i = 0; i < 3; i++) {
      const offset = (p.frameCount * 3 + i * 30) % 90;
      const alpha = p.map(offset, 0, 90, 255, 0);
      p.stroke(100, 150, 255, alpha);
      p.arc(btX + offset / 3, btY, 20 + offset / 2, 30 + offset / 2, -p.PI / 3, p.PI / 3);
    }
    
    // Bluetooth icon
    p.fill(100, 150, 255);
    p.noStroke();
    p.beginShape();
    p.vertex(btX, btY - 15);
    p.vertex(btX + 8, btY - 5);
    p.vertex(btX, btY + 5);
    p.vertex(btX, btY + 15);
    p.vertex(btX + 8, btY + 5);
    p.vertex(btX, btY - 5);
    p.endShape(p.CLOSE);
    
    // Arduino board
    p.fill(0, 100, 100);
    p.stroke(150);
    p.strokeWeight(1);
    p.rect(200, 50, 180, 100, 5);
    
    // USB port
    p.fill(80);
    p.rect(190, 80, 15, 30);
    
    // Arduino label
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Arduino', 290, 70);
    
    // LED
    const ledX = 250;
    const ledY = 110;
    
    p.fill(50);
    p.stroke(100);
    p.strokeWeight(1);
    p.ellipse(ledX, ledY, 30, 30);
    
    if (ledState) {
      // LED glow
      for (let i = 3; i >= 0; i--) {
        p.fill(255, 100, 100, 50 - i * 10);
        p.noStroke();
        p.ellipse(ledX, ledY, 30 + i * 10, 30 + i * 10);
      }
      p.fill(255, 100, 100);
    } else {
      p.fill(100, 50, 50);
    }
    p.stroke(150);
    p.ellipse(ledX, ledY, 25, 25);
    
    p.fill(200);
    p.noStroke();
    p.textSize(9);
    p.text('LED', ledX, ledY + 25);
    
    // Motor
    const motorX = 330;
    const motorY = 110;
    
    // Motor body
    p.fill(70);
    p.stroke(100);
    p.rect(motorX - 25, motorY - 20, 50, 40, 3);
    
    // Motor shaft
    p.fill(150);
    motorAngle += motorSpeed * 0.1;
    p.push();
    p.translate(motorX, motorY);
    p.rotate(motorAngle);
    p.rect(-3, -3, 30, 6, 2);
    p.pop();
    
    p.fill(200);
    p.noStroke();
    p.textSize(9);
    p.text('Motor: ' + Math.round(motorSpeed) + '%', motorX, motorY + 35);
    
    // Smooth motor speed transition
    motorSpeed += (targetMotorSpeed - motorSpeed) * 0.1;
    
    // Command display
    p.fill(20);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(20, 200, 360, 85, 5);
    
    p.fill(150);
    p.noStroke();
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(10);
    p.text('BT Command:', 30, 210);
    
    const flashAlpha = Math.max(0, 255 - (p.millis() - commandFlash) * 0.5);
    p.fill(100, 200, 255, flashAlpha);
    p.textSize(14);
    p.textFont('monospace');
    p.text(lastCommand, 120, 208);
    
    // Status
    p.fill(100);
    p.textSize(10);
    p.text('LED State: ' + (ledState ? 'ON' : 'OFF'), 30, 235);
    p.text('Motor Speed: ' + Math.round(motorSpeed) + '%', 30, 255);
    p.text('Connection: Paired', 200, 235);
    
    // Status indicator
    p.fill(100, 255, 100);
    p.noStroke();
    p.ellipse(185, 240, 8, 8);
    
    // Instruction
    p.fill(150);
    p.textAlign(p.CENTER, p.BOTTOM);
    p.textSize(9);
    p.text('Click phone buttons to send Bluetooth commands', p.width / 2, p.height - 3);
  };
  
  p.mousePressed = () => {
    // Check phone buttons
    const btnLabels = ['LED ON', 'LED OFF', 'SPD+', 'SPD-'];
    const commands = ['1', '0', 'F', 'B'];
    
    for (let i = 0; i < 4; i++) {
      const x = 30 + (i % 2) * 35;
      const y = 55 + Math.floor(i / 2) * 50;
      
      if (p.mouseX >= x && p.mouseX <= x + 30 &&
          p.mouseY >= y && p.mouseY <= y + 35) {
        lastCommand = commands[i];
        commandFlash = p.millis();
        
        if (i === 0) ledState = true;
        if (i === 1) ledState = false;
        if (i === 2) targetMotorSpeed = Math.min(100, targetMotorSpeed + 25);
        if (i === 3) targetMotorSpeed = Math.max(0, targetMotorSpeed - 25);
        break;
      }
    }
  };
};
