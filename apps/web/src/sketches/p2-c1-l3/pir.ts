/**
 * P2-C1-L3 PIR Motion Sketch 1
 * Person walking into PIR cone triggers 'Motion' indicator.
 */
import type p5 from 'p5';

export const pirSketch = (p: p5) => {
  let personX = 50;
  let personY = 200;
  let personDirection = 1;
  let motionDetected = false;
  let detectionTimer = 0;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);
    
    // Move person
    personX += 1.5 * personDirection;
    if (personX > 550) {
      personDirection = -1;
      personX = 550;
    }
    if (personX < 50) {
      personDirection = 1;
      personX = 50;
    }
    
    // Check if person is in detection zone
    const inZone = isInDetectionZone(personX, personY);
    if (inZone && !motionDetected) {
      motionDetected = true;
      detectionTimer = 60; // 1 second at 60fps
    }
    
    if (detectionTimer > 0) {
      detectionTimer--;
    } else {
      motionDetected = false;
    }
    
    drawDetectionZone();
    drawPIRSensor();
    drawPerson();
    drawIndicator();
    drawLabels();
  };

  const isInDetectionZone = (px: number, py: number): boolean => {
    const sensorX = 300;
    const sensorY = 80;
    const coneAngle = p.radians(60);
    const coneLength = 280;
    
    // Check if point is within cone
    const dx = px - sensorX;
    const dy = py - sensorY;
    const distance = p.sqrt(dx * dx + dy * dy);
    
    if (distance > coneLength) return false;
    
    const angle = p.atan2(dy, dx);
    const downAngle = p.HALF_PI;
    const angleDiff = p.abs(angle - downAngle);
    
    return angleDiff < coneAngle / 2;
  };

  const drawDetectionZone = () => {
    const sensorX = 300;
    const sensorY = 80;
    const coneAngle = p.radians(60);
    const coneLength = 280;
    
    // Detection cone
    p.noStroke();
    
    // Gradient fill for cone
    for (let i = 20; i > 0; i--) {
      const alpha = motionDetected ? 60 + i * 5 : 20 + i * 2;
      const color = motionDetected 
        ? p.color(255, 100, 100, alpha)
        : p.color(100, 200, 100, alpha);
      p.fill(color);
      
      const radius = coneLength * (i / 20);
      p.arc(sensorX, sensorY, radius * 2, radius * 2, 
            p.HALF_PI - coneAngle / 2, 
            p.HALF_PI + coneAngle / 2);
    }
    
    // Cone outline
    p.stroke(motionDetected ? p.color(255, 100, 100) : p.color(100, 200, 100));
    p.strokeWeight(2);
    p.noFill();
    p.arc(sensorX, sensorY, coneLength * 2, coneLength * 2,
          p.HALF_PI - coneAngle / 2,
          p.HALF_PI + coneAngle / 2);
    
    // Side lines
    const leftX = sensorX + p.cos(p.HALF_PI - coneAngle / 2) * coneLength;
    const leftY = sensorY + p.sin(p.HALF_PI - coneAngle / 2) * coneLength;
    const rightX = sensorX + p.cos(p.HALF_PI + coneAngle / 2) * coneLength;
    const rightY = sensorY + p.sin(p.HALF_PI + coneAngle / 2) * coneLength;
    
    p.line(sensorX, sensorY, leftX, leftY);
    p.line(sensorX, sensorY, rightX, rightY);
  };

  const drawPIRSensor = () => {
    const x = 300;
    const y = 60;
    
    // Sensor housing
    p.fill(50, 50, 60);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x - 30, y - 25, 60, 45, 8);
    
    // Fresnel lens dome
    p.fill(motionDetected ? p.color(200, 100, 80) : p.color(80, 80, 90));
    p.stroke(100);
    p.arc(x, y + 20, 40, 30, 0, p.PI);
    
    // Lens pattern
    p.stroke(60);
    p.strokeWeight(1);
    for (let i = -15; i <= 15; i += 10) {
      p.arc(x, y + 20, 40 + i * 0.5, 28, 0.2, p.PI - 0.2);
    }
    
    // LED indicator
    p.fill(motionDetected ? p.color(255, 50, 50) : p.color(100, 50, 50));
    p.noStroke();
    p.ellipse(x + 15, y - 10, 8, 8);
    
    // Label
    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('PIR', x, y - 5);
  };

  const drawPerson = () => {
    const x = personX;
    const y = personY;
    const walkPhase = p.sin(p.frameCount * 0.2) * 10;
    
    // Head
    p.fill(200, 180, 160);
    p.stroke(150, 130, 110);
    p.strokeWeight(2);
    p.ellipse(x, y - 45, 25, 25);
    
    // Body
    p.stroke(100, 100, 150);
    p.strokeWeight(4);
    p.line(x, y - 32, x, y + 10);
    
    // Arms (swinging)
    p.line(x, y - 25, x - 15 + walkPhase * 0.5, y - 5);
    p.line(x, y - 25, x + 15 - walkPhase * 0.5, y - 5);
    
    // Legs (walking)
    p.line(x, y + 10, x - 10 - walkPhase * personDirection * 0.3, y + 40);
    p.line(x, y + 10, x + 10 + walkPhase * personDirection * 0.3, y + 40);
    
    // Walking direction indicator
    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(personDirection > 0 ? '→' : '←', x, y - 65);
  };

  const drawIndicator = () => {
    const x = 500;
    const y = 100;
    const w = 80;
    const h = 60;
    
    // Indicator box
    p.fill(40, 45, 55);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x - w / 2, y - h / 2, w, h, 8);
    
    // Status LED
    if (motionDetected) {
      // Glow effect
      p.noStroke();
      for (let r = 30; r > 0; r -= 6) {
        p.fill(255, 100, 100, (1 - r / 30) * 100);
        p.ellipse(x, y - 5, r, r);
      }
    }
    
    p.fill(motionDetected ? p.color(255, 80, 80) : p.color(80, 80, 80));
    p.stroke(100);
    p.strokeWeight(2);
    p.ellipse(x, y - 5, 20, 20);
    
    // Text
    p.fill(motionDetected ? p.color(255, 100, 100) : p.color(150));
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(motionDetected ? 'MOTION!' : 'No Motion', x, y + 20);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('PIR: Passive Infrared Sensor', 50, 50);
    p.text('→ Detects infrared radiation from moving warm bodies', 60, 70);
    
    p.fill(150);
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Watch the person walk through the detection zone', 300, 375);
    
    const inZone = isInDetectionZone(personX, personY);
    p.fill(inZone ? p.color(255, 150, 150) : p.color(150, 200, 150));
    p.text(inZone ? 'Person IN detection zone' : 'Person OUTSIDE detection zone', 300, 390);
  };
};

export default pirSketch;
