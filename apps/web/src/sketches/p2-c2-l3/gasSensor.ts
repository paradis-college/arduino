/**
 * P2-C2-L3 Gas Sensors Sketch 1
 * Gas clouds thickening near sensor; concentration bar rising.
 */
import type p5 from 'p5';

export const gasSensorSketch = (p: p5) => {
  let gasLevel = 200; // PPM
  let particles: { x: number; y: number; size: number; alpha: number }[] = [];

  p.setup = () => {
    p.createCanvas(600, 400);
    // Initialize gas particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: p.random(50, 550),
        y: p.random(80, 300),
        size: p.random(10, 30),
        alpha: p.random(50, 150)
      });
    }
  };

  p.draw = () => {
    p.background(30, 35, 45);
    
    updateParticles();
    drawGasParticles();
    drawSensor();
    drawSlider();
    drawConcentrationDisplay();
    drawLabels();
  };

  p.mouseDragged = () => {
    if (p.mouseX > 50 && p.mouseX < 250 && p.mouseY > 330 && p.mouseY < 370) {
      gasLevel = p.map(p.mouseX, 50, 250, 0, 1000);
      gasLevel = p.constrain(gasLevel, 0, 1000);
    }
  };

  const updateParticles = () => {
    const density = gasLevel / 1000;
    
    for (const particle of particles) {
      // Drift particles
      particle.x += p.random(-1, 1);
      particle.y += p.random(-0.5, 0.5);
      
      // Wrap around
      if (particle.x < 50) particle.x = 550;
      if (particle.x > 550) particle.x = 50;
      if (particle.y < 80) particle.y = 300;
      if (particle.y > 300) particle.y = 80;
      
      // Adjust size based on gas level
      particle.size = p.lerp(particle.size, 10 + density * 30, 0.05);
      particle.alpha = p.lerp(particle.alpha, 30 + density * 150, 0.05);
    }
  };

  const drawGasParticles = () => {
    p.noStroke();
    for (const particle of particles) {
      // Yellow-green gas color
      p.fill(180, 200, 100, particle.alpha);
      p.ellipse(particle.x, particle.y, particle.size, particle.size);
    }
  };

  const drawSensor = () => {
    const x = 300;
    const y = 200;
    
    // Sensor body
    p.fill(50, 50, 60);
    p.stroke(100);
    p.strokeWeight(3);
    p.rect(x - 35, y - 45, 70, 90, 8);
    
    // Mesh (sensing element)
    p.fill(100, 90, 80);
    p.stroke(80);
    p.strokeWeight(1);
    p.ellipse(x, y - 15, 40, 40);
    
    // Mesh pattern
    p.stroke(60);
    for (let i = -15; i <= 15; i += 6) {
      p.line(x + i, y - 30, x + i, y);
      p.line(x - 15, y - 15 + i * 0.5, x + 15, y - 15 + i * 0.5);
    }
    
    // Heater coil indicator
    const heaterColor = p.color(255, 100 + gasLevel * 0.1, 50);
    p.fill(heaterColor);
    p.noStroke();
    p.ellipse(x, y + 20, 15, 15);
    
    // Pins
    p.stroke(150);
    p.strokeWeight(2);
    p.line(x - 15, y + 45, x - 15, y + 60);
    p.line(x, y + 45, x, y + 60);
    p.line(x + 15, y + 45, x + 15, y + 60);
    
    // Label
    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('MQ-x', x, y - 55);
    p.text('Gas Sensor', x, y + 75);
  };

  const drawSlider = () => {
    const x = 50;
    const y = 350;
    const w = 200;
    
    // Track with gradient
    for (let i = 0; i < w; i++) {
      const t = i / w;
      const c = p.lerpColor(
        p.color(100, 200, 100), // Low - green
        p.color(255, 100, 100), // High - red
        t
      );
      p.stroke(c);
      p.line(x + i, y - 8, x + i, y + 8);
    }
    
    p.noFill();
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x, y - 8, w, 16, 8);
    
    const handleX = p.map(gasLevel, 0, 1000, x, x + w);
    p.fill(200);
    p.stroke(255);
    p.strokeWeight(2);
    p.ellipse(handleX, y, 24, 24);
    
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Gas Concentration', x + w / 2, y - 30);
    p.textSize(9);
    p.text('Clean', x, y + 25);
    p.textAlign(p.RIGHT, p.CENTER);
    p.text('Polluted', x + w, y + 25);
  };

  const drawConcentrationDisplay = () => {
    const x = 480;
    const y = 200;
    const w = 100;
    const h = 200;
    
    // Display background
    p.fill(40, 45, 55);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x - w / 2, y - h / 2, w, h, 8);
    
    // Value
    p.fill(200);
    p.noStroke();
    p.textSize(20);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(`${Math.round(gasLevel)}`, x, y - 70);
    p.textSize(12);
    p.text('PPM', x, y - 50);
    
    // Bar graph
    const barX = x - 20;
    const barY = y + 70;
    const barW = 40;
    const barH = 100;
    
    // Background
    p.fill(60);
    p.noStroke();
    p.rect(barX, barY - barH, barW, barH, 4);
    
    // Level zones
    const zoneH = barH / 3;
    p.fill(100, 200, 100, 100);
    p.rect(barX, barY - zoneH, barW, zoneH, 0, 0, 4, 4);
    p.fill(255, 200, 100, 100);
    p.rect(barX, barY - zoneH * 2, barW, zoneH);
    p.fill(255, 100, 100, 100);
    p.rect(barX, barY - barH, barW, zoneH, 4, 4, 0, 0);
    
    // Fill based on level
    const fillH = (gasLevel / 1000) * barH;
    let fillColor;
    if (gasLevel < 300) {
      fillColor = p.color(100, 255, 100);
    } else if (gasLevel < 600) {
      fillColor = p.color(255, 200, 100);
    } else {
      fillColor = p.color(255, 100, 100);
    }
    p.fill(fillColor);
    p.rect(barX, barY - fillH, barW, fillH, 4);
    
    // Zone labels
    p.fill(200);
    p.textSize(8);
    p.textAlign(p.RIGHT, p.CENTER);
    p.text('Safe', barX - 5, barY - zoneH / 2);
    p.text('Warning', barX - 5, barY - zoneH * 1.5);
    p.text('Danger', barX - 5, barY - zoneH * 2.5);
    
    // Air quality label
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    let quality;
    if (gasLevel < 300) {
      quality = 'GOOD';
      p.fill(100, 255, 100);
    } else if (gasLevel < 600) {
      quality = 'MODERATE';
      p.fill(255, 200, 100);
    } else {
      quality = 'POOR';
      p.fill(255, 100, 100);
    }
    p.text(quality, x, y - 30);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Gas Sensor (MQ Series)', 50, 50);
    p.text('→ Detects various gases (CO, methane, smoke)', 60, 70);
    
    p.fill(150);
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Drag slider to simulate gas concentration', 150, 390);
  };
};

export default gasSensorSketch;
