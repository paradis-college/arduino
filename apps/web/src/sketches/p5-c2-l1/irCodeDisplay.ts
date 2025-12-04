/**
 * P5-C2-L1 gif2: Code display updating with each pressed key
 * Shows hex codes for each IR remote button press
 */
import type p5 from 'p5';

export const irCodeDisplaySketch = (p: p5) => {
  const buttons = [
    { label: 'PWR', code: '0x45', x: 0, y: 0 },
    { label: 'VOL+', code: '0x46', x: 1, y: 0 },
    { label: 'FUNC', code: '0x47', x: 2, y: 0 },
    { label: '|<<', code: '0x44', x: 0, y: 1 },
    { label: '>||', code: '0x40', x: 1, y: 1 },
    { label: '>>|', code: '0x43', x: 2, y: 1 },
    { label: 'DOWN', code: '0x07', x: 0, y: 2 },
    { label: 'VOL-', code: '0x15', x: 1, y: 2 },
    { label: 'UP', code: '0x09', x: 2, y: 2 },
    { label: '0', code: '0x16', x: 0, y: 3 },
    { label: 'EQ', code: '0x19', x: 1, y: 3 },
    { label: 'ST', code: '0x0D', x: 2, y: 3 },
    { label: '1', code: '0x0C', x: 0, y: 4 },
    { label: '2', code: '0x18', x: 1, y: 4 },
    { label: '3', code: '0x5E', x: 2, y: 4 },
    { label: '4', code: '0x08', x: 0, y: 5 },
    { label: '5', code: '0x1C', x: 1, y: 5 },
    { label: '6', code: '0x5A', x: 2, y: 5 },
    { label: '7', code: '0x42', x: 0, y: 6 },
    { label: '8', code: '0x52', x: 1, y: 6 },
    { label: '9', code: '0x4A', x: 2, y: 6 },
  ];
  
  let activeButton: typeof buttons[0] | null = null;
  let lastCode = '----';
  let lastButton = '---';
  let codeHistory: string[] = [];
  let flashTime = 0;
  
  p.setup = () => {
    p.createCanvas(400, 300);
  };
  
  p.draw = () => {
    p.background(40);
    
    // Remote control outline
    p.fill(30);
    p.stroke(60);
    p.strokeWeight(2);
    p.rect(15, 15, 130, 270, 10);
    
    // IR emitter
    p.fill(50);
    p.noStroke();
    p.ellipse(80, 30, 30, 15);
    p.fill(150, 0, 0);
    p.ellipse(80, 30, 10, 6);
    
    // Draw buttons
    const btnSize = 35;
    const startX = 25;
    const startY = 50;
    
    for (const btn of buttons) {
      const x = startX + btn.x * (btnSize + 5);
      const y = startY + btn.y * (btnSize + 2);
      
      const isActive = activeButton === btn && p.millis() - flashTime < 200;
      
      p.fill(isActive ? p.color(80, 150, 255) : p.color(60));
      p.stroke(80);
      p.strokeWeight(1);
      p.rect(x, y, btnSize, btnSize - 5, 5);
      
      p.fill(isActive ? 255 : 180);
      p.noStroke();
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(9);
      p.text(btn.label, x + btnSize / 2, y + (btnSize - 5) / 2);
    }
    
    // Code display panel
    p.fill(20);
    p.stroke(100, 200, 100);
    p.strokeWeight(2);
    p.rect(160, 15, 225, 130, 5);
    
    // Panel title
    p.fill(100, 200, 100);
    p.noStroke();
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(12);
    p.text('IR Code Decoder', 170, 25);
    
    // Last received
    p.fill(150);
    p.textSize(10);
    p.text('Last Button:', 170, 50);
    p.text('Hex Code:', 170, 75);
    p.text('Command:', 170, 100);
    
    // Values
    p.fill(255, 255, 100);
    p.textSize(14);
    p.textAlign(p.RIGHT, p.TOP);
    p.text(lastButton, 375, 48);
    
    p.fill(100, 255, 150);
    p.textFont('monospace');
    p.textSize(16);
    p.text(lastCode, 375, 72);
    
    p.fill(200);
    p.textSize(12);
    const cmd = lastCode !== '----' ? parseInt(lastCode, 16).toString() : '---';
    p.text(cmd, 375, 98);
    
    // Code history
    p.fill(20);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(160, 155, 225, 130, 5);
    
    p.fill(150);
    p.noStroke();
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(10);
    p.text('History:', 170, 165);
    
    p.fill(100, 200, 100);
    p.textFont('monospace');
    p.textSize(11);
    for (let i = 0; i < Math.min(codeHistory.length, 6); i++) {
      p.text(codeHistory[codeHistory.length - 1 - i], 170, 185 + i * 16);
    }
    
    // Instruction
    p.fill(150);
    p.textAlign(p.CENTER, p.BOTTOM);
    p.textSize(10);
    p.text('Click buttons to decode IR codes', p.width / 2, p.height - 5);
  };
  
  p.mousePressed = () => {
    const btnSize = 35;
    const startX = 25;
    const startY = 50;
    
    for (const btn of buttons) {
      const x = startX + btn.x * (btnSize + 5);
      const y = startY + btn.y * (btnSize + 2);
      
      if (p.mouseX >= x && p.mouseX <= x + btnSize &&
          p.mouseY >= y && p.mouseY <= y + btnSize - 5) {
        activeButton = btn;
        lastCode = btn.code;
        lastButton = btn.label;
        flashTime = p.millis();
        
        const timestamp = new Date().toLocaleTimeString();
        codeHistory.push(`${timestamp} ${btn.label}: ${btn.code}`);
        if (codeHistory.length > 20) codeHistory.shift();
        break;
      }
    }
  };
};
