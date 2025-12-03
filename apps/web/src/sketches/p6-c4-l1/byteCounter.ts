/**
 * P6-C4-L1 gif2: Live labels updating 'sent/received' byte counts
 * Shows Pi-Arduino communication with byte counters
 */
import type p5 from 'p5';

export const byteCounterSketch = (p: p5) => {
  let bytesSent = 0;
  let bytesReceived = 0;
  let packetsInFlight: { x: number; direction: 'send' | 'receive'; size: number }[] = [];
  let lastPacketTime = 0;
  
  p.setup = () => {
    p.createCanvas(400, 300);
  };
  
  p.draw = () => {
    p.background(40);
    
    // Raspberry Pi
    p.fill(50, 120, 70);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(30, 80, 100, 80, 5);
    
    // Pi label
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Raspberry Pi', 80, 100);
    
    // Pi ports
    p.fill(80);
    p.rect(35, 135, 20, 15, 2);
    p.rect(60, 135, 20, 15, 2);
    
    p.fill(150);
    p.textSize(7);
    p.text('TX', 45, 142);
    p.text('RX', 70, 142);
    
    // Arduino
    p.fill(0, 100, 120);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(270, 80, 100, 80, 5);
    
    // Arduino label
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Arduino', 320, 100);
    
    // Arduino ports
    p.fill(80);
    p.rect(275, 135, 20, 15, 2);
    p.rect(300, 135, 20, 15, 2);
    
    p.fill(150);
    p.textSize(7);
    p.text('RX', 285, 142);
    p.text('TX', 310, 142);
    
    // Communication lines
    p.stroke(80);
    p.strokeWeight(2);
    // TX line (Pi to Arduino)
    p.line(55, 150, 55, 170);
    p.line(55, 170, 285, 170);
    p.line(285, 170, 285, 150);
    
    // RX line (Arduino to Pi)
    p.line(70, 150, 70, 190);
    p.line(70, 190, 310, 190);
    p.line(310, 190, 310, 150);
    
    // Line labels
    p.fill(100, 200, 100);
    p.noStroke();
    p.textSize(8);
    p.text('TX (GPIO14)', 100, 165);
    p.fill(100, 150, 255);
    p.text('RX (GPIO15)', 100, 195);
    
    // Auto-generate packets
    if (p.millis() - lastPacketTime > 600 && packetsInFlight.length < 4) {
      const direction = Math.random() > 0.5 ? 'send' : 'receive';
      const size = Math.floor(Math.random() * 20) + 5;
      packetsInFlight.push({
        x: direction === 'send' ? 55 : 310,
        direction,
        size
      });
      lastPacketTime = p.millis();
      
      if (direction === 'send') {
        bytesSent += size;
      } else {
        bytesReceived += size;
      }
    }
    
    // Animate packets
    for (let i = packetsInFlight.length - 1; i >= 0; i--) {
      const packet = packetsInFlight[i];
      
      if (packet.direction === 'send') {
        packet.x += 4;
        if (packet.x > 285) {
          packetsInFlight.splice(i, 1);
          continue;
        }
        
        // Draw send packet
        p.fill(100, 200, 100);
        p.noStroke();
        p.rect(packet.x - 15, 165, 30, 12, 3);
        p.fill(0);
        p.textSize(7);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(packet.size + 'B', packet.x, 171);
      } else {
        packet.x -= 4;
        if (packet.x < 70) {
          packetsInFlight.splice(i, 1);
          continue;
        }
        
        // Draw receive packet
        p.fill(100, 150, 255);
        p.noStroke();
        p.rect(packet.x - 15, 185, 30, 12, 3);
        p.fill(0);
        p.textSize(7);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(packet.size + 'B', packet.x, 191);
      }
    }
    
    // Byte counters panel
    p.fill(20);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(30, 220, 340, 65, 5);
    
    // Panel title
    p.fill(150);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.LEFT, p.TOP);
    p.text('Communication Statistics', 40, 228);
    
    // Bytes sent counter
    p.fill(100, 200, 100);
    p.textSize(10);
    p.text('Bytes Sent (TX):', 40, 250);
    p.textFont('monospace');
    p.textSize(14);
    p.textAlign(p.RIGHT, p.TOP);
    p.text(bytesSent.toString().padStart(6, '0'), 180, 248);
    
    // Bytes received counter
    p.fill(100, 150, 255);
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(10);
    p.text('Bytes Received (RX):', 200, 250);
    p.textFont('monospace');
    p.textSize(14);
    p.textAlign(p.RIGHT, p.TOP);
    p.text(bytesReceived.toString().padStart(6, '0'), 350, 248);
    
    // Total
    p.fill(150);
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(9);
    p.text('Total: ' + (bytesSent + bytesReceived) + ' bytes', 40, 268);
    
    // Baud rate indicator
    p.textAlign(p.RIGHT, p.TOP);
    p.text('9600 baud | UART', 350, 268);
    
    // Protocol info
    p.fill(25);
    p.stroke(60);
    p.rect(150, 30, 100, 35, 3);
    
    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('UART Serial', 200, 40);
    p.fill(100);
    p.textSize(8);
    p.text('TX/RX Communication', 200, 55);
    
    // Instruction
    p.fill(100);
    p.textAlign(p.CENTER, p.BOTTOM);
    p.textSize(9);
    p.text('Watch live byte counters as data flows between devices', p.width / 2, p.height - 3);
  };
  
  p.mousePressed = () => {
    // Manual send
    if (p.mouseX >= 30 && p.mouseX <= 130 && p.mouseY >= 80 && p.mouseY <= 160) {
      const size = Math.floor(Math.random() * 30) + 10;
      packetsInFlight.push({ x: 55, direction: 'send', size });
      bytesSent += size;
    }
    
    // Manual receive
    if (p.mouseX >= 270 && p.mouseX <= 370 && p.mouseY >= 80 && p.mouseY <= 160) {
      const size = Math.floor(Math.random() * 30) + 10;
      packetsInFlight.push({ x: 310, direction: 'receive', size });
      bytesReceived += size;
    }
  };
};
