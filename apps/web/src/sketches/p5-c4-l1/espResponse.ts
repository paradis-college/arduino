/**
 * P5-C4-L1 gif2: ESP toggling LED and returning response packet
 * Shows HTTP request/response flow with LED toggling
 */
import type p5 from 'p5';

export const espResponseSketch = (p: p5) => {
  let ledState = false;
  let requestInFlight = false;
  let responseInFlight = false;
  let requestX = 0;
  let responseX = 0;
  let lastResponse = '';
  let responseFlash = 0;
  
  p.setup = () => {
    p.createCanvas(400, 300);
  };
  
  p.draw = () => {
    p.background(40);
    
    // Browser window
    p.fill(50);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(20, 30, 120, 180, 5);
    
    // Browser title bar
    p.fill(70);
    p.noStroke();
    p.rect(22, 32, 116, 20, 3, 3, 0, 0);
    
    // Browser dots
    p.fill(255, 100, 100);
    p.ellipse(35, 42, 8, 8);
    p.fill(255, 200, 100);
    p.ellipse(50, 42, 8, 8);
    p.fill(100, 255, 100);
    p.ellipse(65, 42, 8, 8);
    
    // URL bar
    p.fill(30);
    p.rect(25, 55, 110, 18, 3);
    p.fill(150);
    p.textSize(7);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('192.168.1.100', 30, 64);
    
    // Web page content
    p.fill(200);
    p.textAlign(p.CENTER, p.TOP);
    p.textSize(10);
    p.text('Arduino Control', 80, 80);
    
    // Status text
    p.fill(150);
    p.textSize(9);
    p.text('LED: ' + (ledState ? 'ON' : 'OFF'), 80, 100);
    
    // Buttons
    p.fill(50, 150, 50);
    p.stroke(100);
    p.strokeWeight(1);
    p.rect(30, 120, 45, 25, 3);
    p.fill(255);
    p.noStroke();
    p.textSize(10);
    p.text('ON', 52, 125);
    
    p.fill(150, 50, 50);
    p.stroke(100);
    p.rect(85, 120, 45, 25, 3);
    p.fill(255);
    p.noStroke();
    p.text('OFF', 107, 125);
    
    // Status line
    p.fill(100);
    p.textSize(8);
    p.text('Status: ' + (requestInFlight ? 'Loading...' : 'Ready'), 80, 160);
    
    // ESP8266 board
    p.fill(30, 30, 60);
    p.stroke(100);
    p.strokeWeight(1);
    p.rect(260, 50, 120, 70, 5);
    
    // ESP label
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('ESP8266', 320, 70);
    
    // WiFi antenna symbol
    p.stroke(100, 200, 100);
    p.strokeWeight(1);
    p.noFill();
    p.arc(320, 100, 20, 20, p.PI, 0);
    p.arc(320, 100, 35, 35, p.PI, 0);
    
    // LED on ESP board
    const espLedX = 350;
    const espLedY = 85;
    
    if (ledState) {
      // LED glow
      for (let i = 2; i >= 0; i--) {
        p.fill(100, 255, 100, 50 - i * 15);
        p.noStroke();
        p.ellipse(espLedX, espLedY, 15 + i * 8, 15 + i * 8);
      }
      p.fill(100, 255, 100);
    } else {
      p.fill(50, 100, 50);
    }
    p.stroke(80);
    p.strokeWeight(1);
    p.ellipse(espLedX, espLedY, 12, 12);
    
    // Connection line
    p.stroke(80);
    p.strokeWeight(1);
    p.line(140, 130, 260, 85);
    
    // Request packet animation
    if (requestInFlight) {
      requestX += 5;
      const t = requestX / 120;
      const packetX = p.lerp(140, 260, t);
      const packetY = p.lerp(130, 85, t);
      
      p.fill(100, 200, 255);
      p.noStroke();
      p.rect(packetX - 20, packetY - 8, 40, 16, 3);
      p.fill(255);
      p.textSize(8);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('GET /led/' + (ledState ? 'on' : 'off'), packetX, packetY);
      
      if (t >= 1) {
        requestInFlight = false;
        responseInFlight = true;
        responseX = 0;
        lastResponse = ledState ? 'LED ON' : 'LED OFF';
      }
    }
    
    // Response packet animation
    if (responseInFlight) {
      responseX += 5;
      const t = responseX / 120;
      const packetX = p.lerp(260, 140, t);
      const packetY = p.lerp(85, 130, t);
      
      p.fill(100, 255, 150);
      p.noStroke();
      p.rect(packetX - 20, packetY - 8, 40, 16, 3);
      p.fill(0);
      p.textSize(8);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('200 OK', packetX, packetY);
      
      if (t >= 1) {
        responseInFlight = false;
        responseFlash = p.millis();
      }
    }
    
    // Response log
    p.fill(20);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(20, 220, 360, 65, 5);
    
    p.fill(150);
    p.noStroke();
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(10);
    p.text('HTTP Response:', 30, 228);
    
    if (lastResponse) {
      const flashAlpha = Math.min(255, 255 - (p.millis() - responseFlash) * 0.3);
      p.fill(100, 255, 150, flashAlpha);
      p.textFont('monospace');
      p.textSize(11);
      p.text('HTTP/1.1 200 OK', 30, 245);
      p.text('Content: ' + lastResponse, 30, 260);
    }
    
    // IP address display
    p.fill(100);
    p.textAlign(p.CENTER, p.BOTTOM);
    p.textSize(9);
    p.text('IP: 192.168.1.100 | Port: 80', 320, 145);
    
    // Instruction
    p.fill(150);
    p.textAlign(p.CENTER, p.BOTTOM);
    p.textSize(9);
    p.text('Click ON/OFF buttons to send HTTP requests', p.width / 2, p.height - 3);
  };
  
  p.mousePressed = () => {
    // Check ON button
    if (p.mouseX >= 30 && p.mouseX <= 75 && p.mouseY >= 120 && p.mouseY <= 145) {
      if (!requestInFlight && !responseInFlight) {
        ledState = true;
        requestInFlight = true;
        requestX = 0;
      }
    }
    
    // Check OFF button
    if (p.mouseX >= 85 && p.mouseX <= 130 && p.mouseY >= 120 && p.mouseY <= 145) {
      if (!requestInFlight && !responseInFlight) {
        ledState = false;
        requestInFlight = true;
        requestX = 0;
      }
    }
  };
};
