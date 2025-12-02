import type p5 from 'p5';

/**
 * LED lights based on button state
 * gif2: LED lights based on button state
 */
export const ledButtonStateSketch = (p: p5) => {
  let buttonPressed = false;

  p.setup = () => {
    p.createCanvas(400, 250);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    p.background(30);

    // Title
    p.fill(255);
    p.textSize(16);
    p.noStroke();
    p.text('Button Controls LED', p.width / 2, 25);

    // Button
    const btnX = 120;
    const btnY = 90;
    const btnW = 60;
    const btnH = 50;

    // Check if mouse is over button
    const overButton = 
      p.mouseX >= btnX - btnW / 2 && 
      p.mouseX <= btnX + btnW / 2 && 
      p.mouseY >= btnY - btnH / 2 && 
      p.mouseY <= btnY + btnH / 2;

    // Button base
    p.fill(60);
    p.stroke(80);
    p.strokeWeight(2);
    p.rect(btnX - btnW / 2, btnY - btnH / 2 + (buttonPressed ? 5 : 0), btnW, btnH - 5, 5);

    // Button cap
    p.fill(buttonPressed ? '#666' : (overButton ? '#999' : '#888'));
    p.rect(btnX - btnW / 2, btnY - btnH / 2, btnW, btnH - 10, 5);

    // Button label
    p.noStroke();
    p.fill(255);
    p.textSize(10);
    p.text('PRESS', btnX, btnY - 5);

    // LED
    const ledX = 280;
    const ledY = 90;
    const ledR = 50;

    // LED glow
    if (buttonPressed) {
      p.noStroke();
      for (let i = 4; i > 0; i--) {
        p.fill(255, 50, 50, 30 * i);
        p.ellipse(ledX, ledY, ledR + i * 12, ledR + i * 12);
      }
      p.fill(255, 80, 80);
    } else {
      p.fill(100, 30, 30);
    }
    p.stroke(80);
    p.strokeWeight(2);
    p.ellipse(ledX, ledY, ledR, ledR);

    // Connection wire
    p.stroke(buttonPressed ? '#ff5722' : '#666');
    p.strokeWeight(3);
    p.line(btnX + btnW / 2 + 10, btnY, ledX - ledR / 2 - 10, ledY);

    // State displays
    p.noStroke();
    
    // Button state
    p.fill(buttonPressed ? '#4CAF50' : '#f44336');
    p.textSize(12);
    p.text(buttonPressed ? 'PRESSED' : 'RELEASED', btnX, btnY + 50);
    
    // LED state
    p.fill(buttonPressed ? '#4CAF50' : '#f44336');
    p.text(buttonPressed ? 'ON' : 'OFF', ledX, ledY + 45);

    // Digital values
    p.fill(200);
    p.textSize(11);
    p.text(`digitalRead: ${buttonPressed ? 'HIGH' : 'LOW'}`, btnX, btnY + 70);
    p.text(`LED: ${buttonPressed ? 'HIGH' : 'LOW'}`, ledX, ledY + 65);

    // Code snippet
    p.fill(40);
    p.rect(30, 180, 340, 50, 5);
    p.fill(200);
    p.textSize(11);
    p.textFont('monospace');
    p.textAlign(p.LEFT, p.CENTER);
    p.text('if (digitalRead(buttonPin) == HIGH) {', 40, 195);
    p.text('  digitalWrite(ledPin, HIGH);', 40, 210);
    p.textAlign(p.CENTER, p.CENTER);
    p.textFont('sans-serif');

    // Instructions
    p.fill(150);
    p.textSize(10);
    p.text('Click and hold button to turn on LED', p.width / 2, p.height - 10);
  };

  p.mousePressed = () => {
    const btnX = 120;
    const btnY = 90;
    const btnW = 60;
    const btnH = 50;

    if (
      p.mouseX >= btnX - btnW / 2 && 
      p.mouseX <= btnX + btnW / 2 && 
      p.mouseY >= btnY - btnH / 2 && 
      p.mouseY <= btnY + btnH / 2
    ) {
      buttonPressed = true;
    }
  };

  p.mouseReleased = () => {
    buttonPressed = false;
  };
};
