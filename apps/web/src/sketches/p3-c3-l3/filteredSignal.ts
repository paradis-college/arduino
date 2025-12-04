/**
 * P3-C3-L3 gif2: Filtered debounced signal smooth single transition
 * Shows how debouncing filters out noise to produce clean transitions
 */
import type p5 from 'p5';

export const filteredSignalSketch = (p: p5) => {
  const rawSignal: number[] = [];
  const filteredSignal: number[] = [];
  let time = 0;
  let buttonState = false;
  
  p.setup = () => {
    p.createCanvas(400, 300);
    // Initialize signal arrays
    for (let i = 0; i < 300; i++) {
      rawSignal.push(0);
      filteredSignal.push(0);
    }
  };
  
  p.draw = () => {
    p.background(30);
    time++;
    
    // Title
    p.fill(255);
    p.textSize(16);
    p.textAlign(p.CENTER);
    p.text('Raw vs Debounced Signal', p.width / 2, 25);
    
    // Simulate button bouncing
    if (time % 60 === 0) {
      buttonState = !buttonState;
    }
    
    // Generate raw signal with bounce
    let rawValue = buttonState ? 1 : 0;
    if (time % 60 < 8) {
      // Add bounce noise during transition
      rawValue = Math.random() > 0.5 ? 1 : 0;
    }
    
    rawSignal.shift();
    rawSignal.push(rawValue);
    
    // Generate filtered signal (smooth transition)
    let lastFiltered = filteredSignal[filteredSignal.length - 1];
    let newFiltered = lastFiltered;
    
    // Simple debounce: only change after consistent raw signal
    let consistent = true;
    for (let i = 0; i < 5; i++) {
      if (rawSignal[rawSignal.length - 1 - i] !== rawSignal[rawSignal.length - 1]) {
        consistent = false;
        break;
      }
    }
    if (consistent) {
      newFiltered = rawSignal[rawSignal.length - 1];
    }
    
    filteredSignal.shift();
    filteredSignal.push(newFiltered);
    
    // Draw raw signal graph
    const graphY1 = 80;
    const graphHeight = 60;
    
    p.fill(50);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(50, graphY1, 300, graphHeight);
    
    p.stroke(255, 100, 100);
    p.strokeWeight(2);
    p.noFill();
    p.beginShape();
    for (let i = 0; i < rawSignal.length; i++) {
      const x = 50 + i;
      const y = graphY1 + graphHeight - rawSignal[i] * (graphHeight - 10) - 5;
      p.vertex(x, y);
    }
    p.endShape();
    
    // Label
    p.fill(255, 100, 100);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT);
    p.text('Raw Signal (Bouncy)', 55, graphY1 - 5);
    
    // Draw filtered signal graph
    const graphY2 = 170;
    
    p.fill(50);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(50, graphY2, 300, graphHeight);
    
    p.stroke(100, 255, 100);
    p.strokeWeight(2);
    p.noFill();
    p.beginShape();
    for (let i = 0; i < filteredSignal.length; i++) {
      const x = 50 + i;
      const y = graphY2 + graphHeight - filteredSignal[i] * (graphHeight - 10) - 5;
      p.vertex(x, y);
    }
    p.endShape();
    
    // Label
    p.fill(100, 255, 100);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT);
    p.text('Debounced Signal (Clean)', 55, graphY2 - 5);
    
    // Draw comparison indicators
    p.fill(255);
    p.textSize(11);
    p.textAlign(p.CENTER);
    
    // HIGH/LOW labels
    p.fill(150);
    p.textAlign(p.RIGHT);
    p.text('HIGH', 45, graphY1 + 15);
    p.text('LOW', 45, graphY1 + graphHeight - 5);
    p.text('HIGH', 45, graphY2 + 15);
    p.text('LOW', 45, graphY2 + graphHeight - 5);
    
    // Legend
    p.fill(150);
    p.textSize(11);
    p.textAlign(p.CENTER);
    p.text('Debouncing removes noise and produces clean state transitions', p.width / 2, p.height - 15);
    
    // Status indicators
    p.textAlign(p.LEFT);
    p.fill(255, 100, 100);
    p.text(`Raw: ${rawSignal[rawSignal.length - 1] ? 'HIGH' : 'LOW'}`, 55, p.height - 40);
    p.fill(100, 255, 100);
    p.text(`Filtered: ${filteredSignal[filteredSignal.length - 1] ? 'HIGH' : 'LOW'}`, 200, p.height - 40);
  };
};
