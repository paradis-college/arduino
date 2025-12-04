/**
 * P6-C3-L1 gif2: Log panel capturing each GPIO event
 * Shows event logging for GPIO activities
 */
import type p5 from 'p5';

export const eventLogSketch = (p: p5) => {
  let buttonState = false;
  let ledState = false;
  const eventLog: { time: string; event: string; type: 'in' | 'out' | 'sys' }[] = [];
  let eventCounter = 0;
  
  p.setup = () => {
    p.createCanvas(400, 300);
    addEvent('Application started', 'sys');
    addEvent('GPIO initialized', 'sys');
  };
  
  const addEvent = (event: string, type: 'in' | 'out' | 'sys') => {
    const now = new Date();
    const time = now.toLocaleTimeString() + '.' + String(now.getMilliseconds()).padStart(3, '0');
    eventLog.push({ time, event, type });
    eventCounter++;
    
    // Keep only last 10 events
    while (eventLog.length > 10) {
      eventLog.shift();
    }
  };
  
  p.draw = () => {
    p.background(40);
    
    // GPIO Control Panel
    p.fill(30);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(15, 20, 170, 120, 5);
    
    // Panel title
    p.fill(150);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.LEFT, p.TOP);
    p.text('GPIO Control Panel', 25, 28);
    
    // Button input
    p.fill(50);
    p.stroke(buttonState ? p.color(100, 255, 100) : p.color(80));
    p.strokeWeight(2);
    p.rect(25, 55, 70, 35, 5);
    
    p.fill(buttonState ? 255 : 150);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('BUTTON', 60, 65);
    p.textSize(8);
    p.text(buttonState ? 'PRESSED' : 'Release', 60, 80);
    
    // LED output
    const ledX = 145;
    const ledY = 72;
    
    if (ledState) {
      // Glow
      for (let i = 2; i >= 0; i--) {
        p.fill(100, 255, 100, 40 - i * 12);
        p.noStroke();
        p.ellipse(ledX, ledY, 35 + i * 10, 35 + i * 10);
      }
    }
    
    p.fill(ledState ? p.color(100, 255, 100) : p.color(50, 80, 50));
    p.stroke(100);
    p.strokeWeight(1);
    p.ellipse(ledX, ledY, 30, 30);
    
    p.fill(150);
    p.noStroke();
    p.textSize(9);
    p.text('LED', ledX, ledY + 25);
    
    // Toggle LED button
    p.fill(60);
    p.stroke(100);
    p.strokeWeight(1);
    p.rect(110, 100, 65, 22, 3);
    
    p.fill(200);
    p.noStroke();
    p.textSize(9);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Toggle LED', 142, 111);
    
    // Event Log Panel
    p.fill(20);
    p.stroke(100, 200, 100);
    p.strokeWeight(2);
    p.rect(15, 150, 370, 135, 5);
    
    // Log title
    p.fill(100, 200, 100);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.LEFT, p.TOP);
    p.text('Event Log', 25, 158);
    
    // Event counter
    p.fill(150);
    p.textAlign(p.RIGHT, p.TOP);
    p.textSize(9);
    p.text('Total events: ' + eventCounter, 375, 158);
    
    // Log entries
    p.textAlign(p.LEFT, p.TOP);
    p.textFont('monospace');
    p.textSize(10);
    
    let y = 178;
    for (let i = eventLog.length - 1; i >= 0 && y < 280; i--) {
      const entry = eventLog[i];
      
      // Time
      p.fill(100);
      p.text(entry.time, 25, y);
      
      // Type indicator
      if (entry.type === 'in') {
        p.fill(100, 200, 255);
        p.text('[IN]', 120, y);
      } else if (entry.type === 'out') {
        p.fill(255, 200, 100);
        p.text('[OUT]', 120, y);
      } else {
        p.fill(150);
        p.text('[SYS]', 120, y);
      }
      
      // Event text
      p.fill(200);
      p.text(entry.event, 165, y);
      
      y += 15;
    }
    
    // Status indicator
    p.fill(30);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(195, 20, 190, 120, 5);
    
    p.fill(150);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.LEFT, p.TOP);
    p.text('System Status', 205, 28);
    
    // Status items
    p.textSize(10);
    p.fill(100, 255, 100);
    p.ellipse(215, 55, 8, 8);
    p.fill(200);
    p.text('GPIO: Active', 225, 50);
    
    p.fill(100, 255, 100);
    p.ellipse(215, 75, 8, 8);
    p.fill(200);
    p.text('Python: Running', 225, 70);
    
    p.fill(buttonState ? p.color(100, 255, 100) : p.color(100));
    p.ellipse(215, 95, 8, 8);
    p.fill(200);
    p.text('Button: ' + (buttonState ? 'Pressed' : 'Released'), 225, 90);
    
    p.fill(ledState ? p.color(100, 255, 100) : p.color(100));
    p.ellipse(215, 115, 8, 8);
    p.fill(200);
    p.text('LED: ' + (ledState ? 'ON' : 'OFF'), 225, 110);
    
    // Instructions
    p.fill(100);
    p.textAlign(p.CENTER, p.BOTTOM);
    p.textSize(9);
    p.text('Click button to simulate press, Toggle LED to change output', p.width / 2, p.height - 3);
  };
  
  p.mousePressed = () => {
    // Button press simulation
    if (p.mouseX >= 25 && p.mouseX <= 95 && p.mouseY >= 55 && p.mouseY <= 90) {
      buttonState = true;
      addEvent('Button pressed (GPIO17)', 'in');
      addEvent('Callback: on_press()', 'sys');
    }
    
    // Toggle LED button
    if (p.mouseX >= 110 && p.mouseX <= 175 && p.mouseY >= 100 && p.mouseY <= 122) {
      ledState = !ledState;
      addEvent('LED ' + (ledState ? 'turned ON' : 'turned OFF') + ' (GPIO27)', 'out');
    }
  };
  
  p.mouseReleased = () => {
    if (buttonState) {
      buttonState = false;
      addEvent('Button released (GPIO17)', 'in');
      addEvent('Callback: on_release()', 'sys');
    }
  };
};
