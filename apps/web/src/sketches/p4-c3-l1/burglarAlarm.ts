/**
 * P4-C3-L1 Burglar Alarm Sketch 1
 * PIR zone detecting intruder causing flashing siren.
 */
import type p5 from 'p5';

export const burglarAlarmSketch = (p: p5) => {
  let intruderX = 50;
  let alarmTriggered = false;
  let sirenFlash = false;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);
    
    intruderX += 1.5;
    if (intruderX > 550) intruderX = 50;
    
    alarmTriggered = intruderX > 200 && intruderX < 400;
    if (alarmTriggered) sirenFlash = p.frameCount % 10 < 5;
    
    drawDetectionZone();
    drawPIR();
    drawIntruder();
    drawAlarm();
    drawLabels();
  };

  const drawDetectionZone = () => {
    const cx = 300;
    const y = 80;
    
    p.noStroke();
    for (let r = 200; r > 0; r -= 20) {
      const alpha = alarmTriggered ? 60 + (200 - r) * 0.3 : 20 + (200 - r) * 0.1;
      p.fill(alarmTriggered ? 255 : 100, alarmTriggered ? 100 : 200, 100, alpha);
      p.arc(cx, y, r * 2, r * 2, 0.3, p.PI - 0.3);
    }
  };

  const drawPIR = () => {
    p.fill(50, 50, 60);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(275, 50, 50, 35, 5);
    
    p.fill(alarmTriggered ? p.color(200, 100, 80) : p.color(80, 80, 90));
    p.arc(300, 85, 35, 25, 0, p.PI);
    
    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('PIR', 300, 65);
  };

  const drawIntruder = () => {
    const y = 250;
    
    // Person
    p.fill(200, 180, 160);
    p.stroke(150, 130, 110);
    p.strokeWeight(2);
    p.ellipse(intruderX, y - 40, 25, 25);
    
    p.stroke(100, 100, 150);
    p.strokeWeight(4);
    p.line(intruderX, y - 27, intruderX, y + 15);
    p.line(intruderX, y - 15, intruderX - 15, y);
    p.line(intruderX, y - 15, intruderX + 15, y);
    p.line(intruderX, y + 15, intruderX - 10, y + 40);
    p.line(intruderX, y + 15, intruderX + 10, y + 40);
    
    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Intruder', intruderX, y + 55);
  };

  const drawAlarm = () => {
    const x = 500;
    const y = 150;
    
    // Alarm box
    p.fill(alarmTriggered && sirenFlash ? p.color(255, 100, 100) : p.color(60, 60, 70));
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x - 40, y - 40, 80, 80, 10);
    
    // Speaker grille
    p.fill(40);
    p.ellipse(x, y, 40, 40);
    p.stroke(60);
    p.strokeWeight(1);
    for (let r = 10; r <= 30; r += 8) {
      p.noFill();
      p.ellipse(x, y, r, r);
    }
    
    // Sound waves when active
    if (alarmTriggered) {
      p.noFill();
      p.stroke(255, 100, 100, 150);
      p.strokeWeight(2);
      for (let i = 0; i < 3; i++) {
        const offset = (p.frameCount * 3 + i * 15) % 40;
        p.arc(x + 40, y, 30 + offset, 60 + offset, -p.QUARTER_PI, p.QUARTER_PI);
      }
    }
    
    // Status
    p.fill(alarmTriggered ? p.color(255, 100, 100) : p.color(100, 200, 100));
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(alarmTriggered ? 'ALARM!' : 'Armed', x, y + 55);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('PIR-Based Burglar Alarm', 50, 330);
    p.text('→ Detects motion in zone, triggers alarm', 60, 350);
    
    p.fill(150);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Watch intruder trigger the alarm!', 300, 380);
  };
};

export default burglarAlarmSketch;
