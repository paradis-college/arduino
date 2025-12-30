/**
 * P2-C1-L3 PIR - GIF 2
 * Digital HIGH/LOW timeline showing motion pulses
 */
import type p5 from 'p5';

export const pirTimelineSketch = (p: p5) => {
  const timelineData: boolean[] = [];
  const maxPoints = 100;
  let motionDetected = false;
  let motionTimer = 0;
  let frameCounter = 0;

  p.setup = () => {
    p.createCanvas(400, 200);
    p.textFont('monospace');
    // Initialize timeline with LOW
    for (let i = 0; i < maxPoints; i++) {
      timelineData.push(false);
    }
  };

  p.draw = () => {
    p.background(30, 35, 45);
    frameCounter++;

    // Auto motion timer countdown
    if (motionTimer > 0) {
      motionTimer--;
      motionDetected = true;
    } else {
      motionDetected = false;
    }

    // Update timeline every few frames
    if (frameCounter % 3 === 0) {
      timelineData.shift();
      timelineData.push(motionDetected);
    }

    // Draw PIR sensor
    p.fill(80, 80, 80);
    p.stroke(60, 60, 60);
    p.strokeWeight(2);
    p.rect(30, 30, 60, 40, 20, 20, 5, 5);

    // Fresnel lens dome
    const domeColor = motionDetected ? p.color(255, 100, 100) : p.color(200, 200, 200);
    p.fill(domeColor);
    p.noStroke();
    p.arc(60, 35, 40, 30, p.PI, 0, p.CHORD);

    // Status LED on sensor
    p.fill(motionDetected ? p.color(255, 50, 50) : p.color(50, 50, 50));
    p.ellipse(60, 55, 8, 8);

    // Digital output indicator
    p.fill(50, 55, 65);
    p.stroke(100);
    p.strokeWeight(1);
    p.rect(110, 30, 80, 40, 5);

    p.noStroke();
    p.fill(motionDetected ? p.color(100, 255, 100) : p.color(100, 100, 100));
    p.textSize(14);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(motionDetected ? 'HIGH' : 'LOW', 150, 42);
    p.fill(motionDetected ? 255 : 150);
    p.textSize(18);
    p.text(motionDetected ? '1' : '0', 150, 58);

    // Click area
    p.fill(motionDetected ? p.color(255, 100, 100, 50) : p.color(100, 200, 100, 50));
    p.stroke(motionDetected ? p.color(255, 100, 100) : p.color(100, 200, 100));
    p.strokeWeight(2);
    p.rect(220, 25, 150, 50, 10);

    p.noStroke();
    p.fill(255);
    p.textSize(12);
    p.text('Click to Trigger Motion', 295, 50);

    // Timeline
    p.fill(40, 45, 55);
    p.noStroke();
    p.rect(20, 95, 360, 85, 5);

    // Timeline labels
    p.fill(150);
    p.textSize(10);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('HIGH', 25, 115);
    p.text('LOW', 25, 160);

    // Timeline grid
    p.stroke(60, 65, 75);
    p.strokeWeight(1);
    p.line(60, 115, 370, 115);
    p.line(60, 160, 370, 160);

    // Draw timeline signal
    p.stroke(100, 255, 100);
    p.strokeWeight(2);
    p.noFill();
    p.beginShape();

    for (let i = 0; i < timelineData.length; i++) {
      const x = p.map(i, 0, maxPoints - 1, 60, 370);
      const y = timelineData[i] ? 115 : 160;

      // Add vertical transition line
      if (i > 0 && timelineData[i] !== timelineData[i - 1]) {
        const prevX = p.map(i - 1, 0, maxPoints - 1, 60, 370);
        p.vertex(prevX, timelineData[i - 1] ? 115 : 160);
        p.vertex(x, y);
      }
      p.vertex(x, y);
    }
    p.endShape();

    // Current position marker
    p.fill(255, 200, 100);
    p.noStroke();
    p.ellipse(370, motionDetected ? 115 : 160, 8, 8);

    // Time axis
    p.fill(150);
    p.textSize(9);
    p.textAlign(p.CENTER, p.TOP);
    p.text('Time →', 215, 182);
  };

  p.mousePressed = () => {
    // Check if click is in trigger area
    if (p.mouseX > 220 && p.mouseX < 370 && p.mouseY > 25 && p.mouseY < 75) {
      motionTimer = 30; // Motion stays HIGH for ~30 frames
    }
  };
};
