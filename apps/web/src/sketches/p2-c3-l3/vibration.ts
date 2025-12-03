/**
 * P2-C3-L3 Vibration Sensors Sketch 1
 * Box shaking violently when vibration event triggers.
 */
import type p5 from 'p5';

export const vibrationSketch = (p: p5) => {
  let vibrationLevel = 0;
  let shakeOffset = { x: 0, y: 0 };
  let isVibrating = false;
  let vibrationTimer = 0;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);
    
    // Update shake animation
    if (isVibrating || vibrationTimer > 0) {
      const intensity = vibrationLevel / 100;
      shakeOffset.x = p.random(-10, 10) * intensity;
      shakeOffset.y = p.random(-10, 10) * intensity;
      vibrationTimer--;
    } else {
      shakeOffset.x = p.lerp(shakeOffset.x, 0, 0.3);
      shakeOffset.y = p.lerp(shakeOffset.y, 0, 0.3);
    }
    
    drawBox();
    drawSensor();
    drawButton();
    drawIndicator();
    drawLabels();
  };

  p.mousePressed = () => {
    // Vibrate button
    if (p.mouseX > 50 && p.mouseX < 180 && p.mouseY > 320 && p.mouseY < 370) {
      triggerVibration(100);
    }
    // Light tap
    if (p.mouseX > 200 && p.mouseX < 280 && p.mouseY > 320 && p.mouseY < 370) {
      triggerVibration(30);
    }
  };

  const triggerVibration = (level: number) => {
    vibrationLevel = level;
    isVibrating = true;
    vibrationTimer = 30; // 0.5 seconds
    setTimeout(() => {
      isVibrating = false;
    }, 200);
  };

  const drawBox = () => {
    const cx = 200 + shakeOffset.x;
    const cy = 180 + shakeOffset.y;
    const size = 120;
    
    // Shadow
    p.fill(0, 0, 0, 30);
    p.noStroke();
    p.rect(cx - size / 2 + 8, cy - size / 2 + 8, size, size, 10);
    
    // Box body
    p.fill(80, 70, 60);
    p.stroke(100, 90, 80);
    p.strokeWeight(3);
    p.rect(cx - size / 2, cy - size / 2, size, size, 10);
    
    // Front face detail
    p.fill(90, 80, 70);
    p.noStroke();
    p.rect(cx - size / 2 + 10, cy - size / 2 + 10, size - 20, size - 20, 5);
    
    // "FRAGILE" label
    p.fill(255, 200, 200);
    p.stroke(200, 100, 100);
    p.strokeWeight(1);
    p.rect(cx - 35, cy - 15, 70, 30, 3);
    
    p.fill(200, 50, 50);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('FRAGILE', cx, cy);
    
    // Motion blur lines when shaking
    if (vibrationTimer > 0 && vibrationLevel > 50) {
      p.stroke(200, 200, 200, 100);
      p.strokeWeight(2);
      for (let i = 0; i < 5; i++) {
        const offsetX = p.random(-30, 30);
        const y = cy - size / 2 + p.random(size);
        p.line(cx - size / 2 + offsetX - 20, y, cx - size / 2 + offsetX - 40, y);
        p.line(cx + size / 2 + offsetX + 20, y, cx + size / 2 + offsetX + 40, y);
      }
    }
    
    // Label
    p.fill(200);
    p.noStroke();
    p.textSize(11);
    p.text('Monitored Package', cx, cy + size / 2 + 25);
  };

  const drawSensor = () => {
    const x = 200 + shakeOffset.x;
    const y = 180 + shakeOffset.y;
    
    // Sensor attached to box
    p.fill(50, 50, 60);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x + 40, y - 15, 30, 30, 4);
    
    // Sensor element
    p.fill(isVibrating ? p.color(255, 200, 100) : p.color(100, 100, 110));
    p.noStroke();
    p.rect(x + 47, y - 8, 16, 16, 2);
    
    // Wire
    p.stroke(100, 100, 150);
    p.strokeWeight(2);
    p.noFill();
    p.bezier(x + 70, y, x + 90, y - 20, x + 110, y - 30, x + 130, y - 50);
    
    // Sensor label
    p.fill(150);
    p.noStroke();
    p.textSize(8);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('SW-420', x + 55, y + 25);
  };

  const drawButton = () => {
    // Strong vibration button
    const x1 = 115;
    const y = 345;
    
    p.fill(200, 80, 80);
    p.stroke(150, 60, 60);
    p.strokeWeight(2);
    p.rect(x1 - 65, y - 25, 130, 50, 8);
    
    p.fill(255);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('🔨 SHAKE!', x1, y);
    
    // Light tap button
    const x2 = 240;
    
    p.fill(100, 150, 200);
    p.stroke(80, 120, 160);
    p.strokeWeight(2);
    p.rect(x2 - 40, y - 25, 80, 50, 8);
    
    p.fill(255);
    p.noStroke();
    p.text('👆 Tap', x2, y);
  };

  const drawIndicator = () => {
    const x = 450;
    const y = 180;
    const w = 130;
    const h = 180;
    
    // Display background
    p.fill(40, 45, 55);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x - w / 2, y - h / 2, w, h, 10);
    
    // Status
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Vibration Sensor', x, y - 75);
    
    // Digital output
    const isDetected = vibrationTimer > 0;
    p.fill(isDetected ? p.color(255, 100, 100) : p.color(100, 100, 100));
    p.stroke(isDetected ? p.color(255, 150, 150) : p.color(80));
    p.strokeWeight(2);
    p.ellipse(x, y - 35, 35, 35);
    
    p.fill(isDetected ? 255 : 150);
    p.noStroke();
    p.textSize(10);
    p.text(isDetected ? 'ALERT!' : 'OK', x, y - 35);
    
    // Level meter
    p.fill(60);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(x - 30, y + 10, 60, 15, 4);
    
    const levelWidth = (vibrationTimer / 30) * 60;
    const levelColor = vibrationLevel > 50 ? p.color(255, 100, 100) : p.color(255, 200, 100);
    p.fill(levelColor);
    p.noStroke();
    p.rect(x - 30, y + 10, levelWidth, 15, 4);
    
    // Level label
    p.fill(200);
    p.textSize(10);
    p.text('Intensity', x, y + 40);
    
    // Digital value
    p.textSize(11);
    p.text(`digitalRead: ${isDetected ? 'HIGH' : 'LOW'}`, x, y + 65);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Vibration Sensor (SW-420)', 50, 50);
    p.text('→ Detects shocks and vibrations', 60, 70);
    p.text('→ Outputs digital HIGH when triggered', 60, 90);
    
    p.fill(150);
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Click buttons to simulate vibration events', 300, 390);
  };
};

export default vibrationSketch;
