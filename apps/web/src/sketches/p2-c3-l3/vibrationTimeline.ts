/**
 * P2-C3-L3 Vibration Sensors - GIF 2
 * Timeline showing pulse spikes for each vibration
 */
import type p5 from 'p5';

export const vibrationTimelineSketch = (p: p5) => {
  const vibrationEvents: { time: number; intensity: number }[] = [];
  let shakeIntensity = 0;
  const timeWindow = 5000; // 5 seconds of history
  
  p.setup = () => {
    p.createCanvas(400, 200);
    p.textFont('monospace');
  };
  
  p.draw = () => {
    p.background(30, 35, 45);
    
    const currentTime = p.millis();
    
    // Decay shake intensity
    shakeIntensity *= 0.9;
    
    // Apply shake to canvas
    if (shakeIntensity > 0.5) {
      p.push();
      p.translate(
        p.random(-shakeIntensity, shakeIntensity),
        p.random(-shakeIntensity, shakeIntensity)
      );
    }
    
    // Vibration sensor box
    const boxX = 50;
    const boxY = 40;
    const boxShake = shakeIntensity * 0.5;
    
    p.fill(80, 80, 90);
    p.stroke(100, 100, 110);
    p.strokeWeight(2);
    p.rect(
      boxX + p.random(-boxShake, boxShake),
      boxY + p.random(-boxShake, boxShake),
      70, 50, 5
    );
    
    // Sensor element inside
    p.fill(150, 100, 50);
    p.noStroke();
    p.ellipse(
      boxX + 35 + p.random(-boxShake * 2, boxShake * 2),
      boxY + 25 + p.random(-boxShake * 2, boxShake * 2),
      20, 20
    );
    
    // Piezo disc
    p.fill(200, 180, 100);
    p.ellipse(boxX + 35, boxY + 25, 12, 12);
    
    // Trigger button
    const btnHover = p.mouseX > 140 && p.mouseX < 200 && p.mouseY > 40 && p.mouseY < 90;
    p.fill(btnHover ? p.color(255, 120, 100) : p.color(200, 80, 80));
    p.stroke(btnHover ? p.color(255, 150, 130) : p.color(150, 60, 60));
    p.strokeWeight(2);
    p.rect(140, 40, 60, 50, 10);
    
    p.fill(255);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('SHAKE', 170, 55);
    p.text('Click!', 170, 75);
    
    // Digital output display
    const isActive = shakeIntensity > 1;
    p.fill(20, 25, 35);
    p.stroke(isActive ? p.color(255, 150, 100) : p.color(80));
    p.strokeWeight(2);
    p.rect(220, 40, 160, 50, 10);
    
    p.fill(isActive ? p.color(255, 150, 100) : p.color(100));
    p.noStroke();
    p.textSize(14);
    p.text('VIBRATION', 300, 55);
    
    p.fill(isActive ? p.color(255, 200, 100) : p.color(80));
    p.textSize(18);
    p.text(isActive ? 'DETECTED!' : 'Waiting...', 300, 77);
    
    // Timeline panel
    p.fill(40, 45, 55);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(30, 105, 340, 80, 5);
    
    // Timeline title
    p.fill(150);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.LEFT, p.TOP);
    p.text('Vibration Events Timeline (5s window)', 40, 110);
    
    // Baseline
    p.stroke(60);
    p.strokeWeight(1);
    p.line(50, 165, 350, 165);
    
    // Time markers
    p.fill(100);
    p.textSize(8);
    p.textAlign(p.CENTER, p.TOP);
    for (let i = 0; i <= 5; i++) {
      const x = p.map(i, 0, 5, 50, 350);
      p.line(x, 165, x, 170);
      p.noStroke();
      p.text(`-${5 - i}s`, x, 172);
      p.stroke(60);
    }
    
    // Draw vibration spikes
    vibrationEvents.forEach((event) => {
      const age = currentTime - event.time;
      if (age < timeWindow) {
        const x = p.map(age, 0, timeWindow, 350, 50);
        const spikeHeight = event.intensity * 40;
        const alpha = p.map(age, 0, timeWindow, 255, 50);
        
        // Spike
        p.stroke(255, 150, 100, alpha);
        p.strokeWeight(3);
        p.line(x, 165, x, 165 - spikeHeight);
        
        // Spike tip
        p.fill(255, 200, 100, alpha);
        p.noStroke();
        p.ellipse(x, 165 - spikeHeight, 6, 6);
      }
    });
    
    // Clean up old events
    while (vibrationEvents.length > 0 && currentTime - vibrationEvents[0].time > timeWindow) {
      vibrationEvents.shift();
    }
    
    // Event counter
    p.fill(150);
    p.textSize(10);
    p.textAlign(p.RIGHT, p.TOP);
    p.text(`Events: ${vibrationEvents.length}`, 360, 110);
    
    if (shakeIntensity > 0.5) {
      p.pop();
    }
    
    // Instructions
    p.fill(120);
    p.textSize(9);
    p.textAlign(p.CENTER, p.BOTTOM);
    p.text('Click SHAKE button to trigger vibration events', 200, 198);
  };
  
  p.mousePressed = () => {
    // Check if clicking shake button
    if (p.mouseX > 140 && p.mouseX < 200 && p.mouseY > 40 && p.mouseY < 90) {
      triggerVibration();
    }
  };
  
  const triggerVibration = () => {
    const intensity = p.random(0.5, 1);
    shakeIntensity = intensity * 10;
    vibrationEvents.push({
      time: p.millis(),
      intensity: intensity
    });
  };
};
