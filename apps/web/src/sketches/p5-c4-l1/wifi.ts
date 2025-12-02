/**
 * P5-C4-L1 WiFi Communication Sketch 1
 * Browser button → HTTP request arrow → ESP board.
 */
import type p5 from 'p5';

export const wifiSketch = (p: p5) => {
  let ledOn = false;
  let requestInFlight = false;
  let requestX = 0;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);
    
    if (requestInFlight) {
      requestX += 6;
      if (requestX > 280) {
        ledOn = !ledOn;
        requestInFlight = false;
        requestX = 0;
      }
    }
    
    drawBrowser();
    drawESP();
    drawRequest();
    drawWiFiSymbol();
    drawLabels();
  };

  p.mousePressed = () => {
    if (p.mouseX > 70 && p.mouseX < 170 && p.mouseY > 200 && p.mouseY < 250) {
      requestInFlight = true;
      requestX = 0;
    }
  };

  const drawBrowser = () => {
    // Browser window
    p.fill(50, 55, 65);
    p.stroke(80);
    p.strokeWeight(2);
    p.rect(40, 100, 160, 180, 8);
    
    // Title bar
    p.fill(60, 65, 75);
    p.rect(40, 100, 160, 25, 8, 8, 0, 0);
    
    // Window buttons
    p.fill(255, 100, 100);
    p.noStroke();
    p.ellipse(55, 112, 10, 10);
    p.fill(255, 200, 100);
    p.ellipse(70, 112, 10, 10);
    p.fill(100, 255, 100);
    p.ellipse(85, 112, 10, 10);
    
    // URL bar
    p.fill(40, 45, 55);
    p.stroke(60);
    p.strokeWeight(1);
    p.rect(50, 135, 140, 20, 3);
    
    p.fill(150);
    p.textSize(8);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('192.168.1.100/led', 55, 145);
    
    // Button
    p.fill(ledOn ? p.color(100, 200, 100) : p.color(200, 100, 100));
    p.stroke(ledOn ? p.color(80, 180, 80) : p.color(180, 80, 80));
    p.strokeWeight(2);
    p.rect(70, 200, 100, 50, 8);
    
    p.fill(255);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(ledOn ? 'Turn OFF' : 'Turn ON', 120, 225);
    
    // Label
    p.fill(200);
    p.textSize(11);
    p.text('Web Browser', 120, 300);
  };

  const drawESP = () => {
    // ESP board
    p.fill(30, 50, 80);
    p.stroke(50, 70, 100);
    p.strokeWeight(2);
    p.rect(400, 130, 120, 90, 5);
    
    // Antenna
    p.fill(200);
    p.rect(405, 115, 30, 20, 3);
    p.stroke(150);
    p.strokeWeight(1);
    for (let i = 0; i < 4; i++) {
      p.line(410 + i * 6, 120, 410 + i * 6, 130);
    }
    
    // Chip
    p.fill(30, 30, 40);
    p.stroke(50);
    p.rect(430, 150, 50, 40, 2);
    
    // WiFi indicator
    p.fill(100, 200, 100);
    p.noStroke();
    p.ellipse(410, 190, 8, 8);
    
    // LED
    const ledX = 540;
    const ledY = 175;
    
    if (ledOn) {
      p.noStroke();
      for (let r = 30; r > 0; r -= 6) {
        p.fill(100, 255, 100, (1 - r / 30) * 150);
        p.ellipse(ledX, ledY, r * 2, r * 2);
      }
    }
    
    p.fill(ledOn ? p.color(100, 255, 100) : p.color(50, 80, 50));
    p.stroke(80);
    p.strokeWeight(2);
    p.ellipse(ledX, ledY, 30, 30);
    
    p.fill(200);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('ESP8266/32', 460, 240);
  };

  const drawRequest = () => {
    if (!requestInFlight) return;
    
    const baseX = 200;
    const y = 180;
    
    // HTTP request packet
    p.fill(100, 200, 255);
    p.stroke(150, 220, 255);
    p.strokeWeight(2);
    p.rect(baseX + requestX - 30, y - 15, 60, 30, 5);
    
    p.fill(30);
    p.noStroke();
    p.textSize(9);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('HTTP GET', baseX + requestX, y);
    
    // Arrow
    p.fill(100, 200, 255);
    p.triangle(baseX + requestX + 35, y - 8, baseX + requestX + 35, y + 8, baseX + requestX + 50, y);
  };

  const drawWiFiSymbol = () => {
    const x = 300;
    const y = 100;
    
    p.noFill();
    p.stroke(100, 200, 255, 150);
    p.strokeWeight(3);
    
    for (let i = 1; i <= 3; i++) {
      p.arc(x, y + 20, i * 25, i * 20, p.PI + 0.3, -0.3);
    }
    
    p.fill(100, 200, 255);
    p.noStroke();
    p.ellipse(x, y + 20, 8, 8);
    
    p.fill(200);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('WiFi', x, y + 45);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('WiFi IoT Control', 50, 340);
    p.text('→ Web browser sends HTTP request', 60, 360);
    
    p.fill(150);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Click button to send HTTP request to ESP', 300, 385);
  };
};

export default wifiSketch;
