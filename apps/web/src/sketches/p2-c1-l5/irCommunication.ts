/**
 * P2-C1-L5 IR Communication Sketch 1
 * Remote sending dashed IR beams; receiver decodes button code.
 */
import type p5 from 'p5';

export const irCommunicationSketch = (p: p5) => {
  let activeButton = -1;
  let irBeams: { x: number; code: string }[] = [];
  let receivedCode = '';
  let displayTimer = 0;

  const buttonCodes = [
    { label: '1', code: '0xFF30CF' },
    { label: '2', code: '0xFF18E7' },
    { label: '3', code: '0xFF7A85' },
    { label: 'PWR', code: '0xFFA25D' },
    { label: 'VOL+', code: '0xFF629D' },
    { label: 'VOL-', code: '0xFFA857' },
  ];

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);
    
    updateBeams();
    drawRemote();
    drawReceiver();
    drawBeams();
    drawCodeDisplay();
    drawLabels();
    
    if (displayTimer > 0) displayTimer--;
  };

  p.mousePressed = () => {
    // Check button presses
    for (let i = 0; i < 6; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      const bx = 100 + col * 50;
      const by = 160 + row * 60;
      
      if (p.mouseX > bx - 18 && p.mouseX < bx + 18 &&
          p.mouseY > by - 18 && p.mouseY < by + 18) {
        activeButton = i;
        sendIRSignal(buttonCodes[i].code);
      }
    }
  };

  p.mouseReleased = () => {
    activeButton = -1;
  };

  const sendIRSignal = (code: string) => {
    irBeams.push({ x: 200, code });
  };

  const updateBeams = () => {
    for (let i = irBeams.length - 1; i >= 0; i--) {
      irBeams[i].x += 8;
      
      // Check if beam reached receiver
      if (irBeams[i].x >= 420) {
        receivedCode = irBeams[i].code;
        displayTimer = 120; // 2 seconds
        irBeams.splice(i, 1);
      }
    }
  };

  const drawRemote = () => {
    const x = 120;
    const y = 200;
    
    // Remote body
    p.fill(40, 40, 50);
    p.stroke(80);
    p.strokeWeight(3);
    p.rect(x - 60, y - 120, 120, 240, 15);
    
    // Screen area
    p.fill(60, 80, 60);
    p.stroke(50);
    p.strokeWeight(1);
    p.rect(x - 45, y - 100, 90, 30, 5);
    
    // Brand label
    p.fill(150);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('IR REMOTE', x, y - 85);
    
    // Buttons
    for (let i = 0; i < 6; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      const bx = x - 40 + col * 40;
      const by = y - 40 + row * 60;
      
      // Button
      const isActive = activeButton === i;
      p.fill(isActive ? p.color(100, 150, 200) : p.color(60, 60, 70));
      p.stroke(isActive ? p.color(150, 200, 255) : p.color(100));
      p.strokeWeight(2);
      p.rect(bx - 15, by - 15, 30, 30, 8);
      
      // Label
      p.fill(isActive ? 255 : 200);
      p.noStroke();
      p.textSize(10);
      p.text(buttonCodes[i].label, bx, by);
    }
    
    // IR LED
    p.fill(activeButton >= 0 ? p.color(255, 100, 150) : p.color(100, 50, 70));
    p.stroke(100);
    p.strokeWeight(1);
    p.ellipse(x + 50, y, 12, 12);
    
    // IR glow when active
    if (activeButton >= 0) {
      p.noStroke();
      for (let r = 20; r > 0; r -= 4) {
        p.fill(255, 100, 150, (1 - r / 20) * 100);
        p.ellipse(x + 50, y, r * 2, r * 2);
      }
    }
  };

  const drawReceiver = () => {
    const x = 450;
    const y = 200;
    
    // Receiver module
    p.fill(30, 30, 40);
    p.stroke(80);
    p.strokeWeight(2);
    p.rect(x - 30, y - 40, 60, 80, 8);
    
    // Dome
    p.fill(displayTimer > 0 ? p.color(150, 100, 120) : p.color(60, 50, 60));
    p.stroke(100);
    p.arc(x, y - 10, 35, 35, p.PI, 0);
    
    // Pins
    p.stroke(150);
    p.strokeWeight(2);
    p.line(x - 15, y + 40, x - 15, y + 55);
    p.line(x, y + 40, x, y + 55);
    p.line(x + 15, y + 40, x + 15, y + 55);
    
    // Pin labels
    p.fill(150);
    p.noStroke();
    p.textSize(8);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('S', x - 15, y + 62);
    p.text('+', x, y + 62);
    p.text('−', x + 15, y + 62);
    
    // Label
    p.fill(200);
    p.textSize(10);
    p.text('IR Receiver', x, y + 80);
    
    // Detection indicator
    if (displayTimer > 0) {
      p.fill(100, 255, 100);
      p.ellipse(x + 20, y - 30, 8, 8);
    }
  };

  const drawBeams = () => {
    for (const beam of irBeams) {
      // Dashed IR beam
      p.stroke(255, 100, 150, 200);
      p.strokeWeight(3);
      
      const dashLength = 15;
      const gapLength = 10;
      const y = 200;
      
      for (let x = beam.x; x < beam.x + 80; x += dashLength + gapLength) {
        const endX = p.min(x + dashLength, 420);
        if (x < 420) {
          p.line(x, y, endX, y);
        }
      }
      
      // Beam head
      p.fill(255, 100, 150);
      p.noStroke();
      p.triangle(beam.x + 80, y - 5, beam.x + 80, y + 5, beam.x + 90, y);
    }
  };

  const drawCodeDisplay = () => {
    const x = 350;
    const y = 80;
    const w = 200;
    const h = 60;
    
    // Display background
    p.fill(20, 30, 20);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x - w / 2, y - h / 2, w, h, 8);
    
    // Code display
    if (displayTimer > 0 && receivedCode) {
      p.fill(100, 255, 150);
      p.noStroke();
      p.textSize(18);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(receivedCode, x, y - 5);
      
      // Find button label
      const button = buttonCodes.find(b => b.code === receivedCode);
      if (button) {
        p.fill(200);
        p.textSize(12);
        p.text(`Button: ${button.label}`, x, y + 20);
      }
    } else {
      p.fill(80, 100, 80);
      p.textSize(14);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('Waiting for signal...', x, y);
    }
    
    // Label
    p.fill(150);
    p.textSize(10);
    p.text('Received Code', x, y - h / 2 - 12);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('IR Communication: Infrared light data transfer', 50, 50);
    p.text('→ Remote sends coded pulses of IR light', 60, 70);
    
    p.fill(150);
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Click buttons on remote to send IR codes', 300, 375);
  };
};

export default irCommunicationSketch;
