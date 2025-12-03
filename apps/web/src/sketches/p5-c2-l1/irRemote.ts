/**
 * P5-C2-L1 IR Remote Control Sketch 1
 * Remote beam to IR receiver toggling LED.
 */
import type p5 from 'p5';

export const irRemoteSketch = (p: p5) => {
  let ledOn = false;
  let irBeam = false;
  let beamX = 0;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);
    
    if (irBeam) {
      beamX += 10;
      if (beamX > 350) {
        ledOn = !ledOn;
        irBeam = false;
        beamX = 0;
      }
    }
    
    drawRemote();
    drawReceiver();
    drawLED();
    drawBeam();
    drawLabels();
  };

  p.mousePressed = () => {
    if (p.mouseX > 80 && p.mouseX < 160 && p.mouseY > 170 && p.mouseY < 230) {
      irBeam = true;
      beamX = 0;
    }
  };

  const drawRemote = () => {
    p.fill(40, 40, 50);
    p.stroke(80);
    p.strokeWeight(2);
    p.rect(60, 100, 100, 200, 10);
    
    // Button
    p.fill(200, 80, 80);
    p.stroke(180, 60, 60);
    p.ellipse(110, 200, 50, 40);
    
    p.fill(255);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('POWER', 110, 200);
    
    // IR LED
    p.fill(irBeam ? p.color(255, 100, 150) : p.color(100, 50, 70));
    p.stroke(100);
    p.strokeWeight(1);
    p.ellipse(160, 150, 10, 10);
    
    p.fill(200);
    p.textSize(11);
    p.text('IR Remote', 110, 320);
  };

  const drawReceiver = () => {
    p.fill(30, 30, 40);
    p.stroke(80);
    p.strokeWeight(2);
    p.rect(380, 130, 50, 80, 5);
    
    // Dome
    p.fill(60, 50, 60);
    p.arc(405, 175, 35, 30, p.PI, 0);
    
    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('IR', 405, 155);
    
    p.textSize(11);
    p.text('Receiver', 405, 230);
  };

  const drawLED = () => {
    const x = 500;
    const y = 170;
    
    if (ledOn) {
      p.noStroke();
      for (let r = 40; r > 0; r -= 8) {
        p.fill(100, 255, 100, (1 - r / 40) * 180);
        p.ellipse(x, y, r * 2, r * 2);
      }
    }
    
    p.fill(ledOn ? p.color(100, 255, 100) : p.color(50, 80, 50));
    p.stroke(80);
    p.strokeWeight(2);
    p.ellipse(x, y, 40, 40);
    
    p.fill(200);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(ledOn ? 'ON' : 'OFF', x, y);
    p.text('LED', x, y + 40);
  };

  const drawBeam = () => {
    if (!irBeam) return;
    
    p.stroke(255, 100, 150, 200);
    p.strokeWeight(3);
    
    for (let i = 0; i < 5; i++) {
      const x = 170 + beamX - i * 30;
      if (x > 160 && x < 380) {
        p.line(x, 150, x + 20, 150);
      }
    }
    
    // Beam head
    p.fill(255, 100, 150);
    p.noStroke();
    p.triangle(170 + beamX, 145, 170 + beamX, 155, 180 + beamX, 150);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('IR Remote Control', 50, 50);
    p.text('→ Press button to send IR signal', 60, 70);
    
    p.fill(150);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Click the POWER button to toggle the LED', 300, 380);
  };
};

export default irRemoteSketch;
