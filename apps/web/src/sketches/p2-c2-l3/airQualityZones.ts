/**
 * P2-C2-L3 Gas Sensors - GIF 2
 * Air quality color zone transitions (green/yellow/red)
 */
import type p5 from 'p5';

export const airQualityZonesSketch = (p: p5) => {
  let gasLevel = 150;
  let displayLevel = 150;
  let dragging = false;
  
  // Thresholds
  const goodMax = 200;
  const moderateMax = 400;
  
  p.setup = () => {
    p.createCanvas(400, 200);
    p.textFont('monospace');
  };
  
  p.draw = () => {
    p.background(30, 35, 45);
    
    // Smooth transition
    displayLevel = p.lerp(displayLevel, gasLevel, 0.1);
    
    // Determine zone
    let zone: string;
    let zoneColor: p5.Color;
    let emoji: string;
    
    if (displayLevel < goodMax) {
      zone = 'GOOD';
      zoneColor = p.color(100, 255, 100);
      emoji = '😊';
    } else if (displayLevel < moderateMax) {
      zone = 'MODERATE';
      zoneColor = p.color(255, 220, 100);
      emoji = '😐';
    } else {
      zone = 'POOR';
      zoneColor = p.color(255, 100, 100);
      emoji = '😷';
    }
    
    // Main display panel
    p.fill(zoneColor.levels[0] * 0.2, zoneColor.levels[1] * 0.2, zoneColor.levels[2] * 0.2);
    p.stroke(zoneColor);
    p.strokeWeight(3);
    p.rect(20, 20, 180, 100, 15);
    
    // Zone label
    p.fill(zoneColor);
    p.noStroke();
    p.textSize(24);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(zone, 110, 50);
    
    // Emoji and value
    p.textSize(30);
    p.text(emoji, 60, 90);
    p.textSize(18);
    p.fill(255);
    p.text(`${displayLevel.toFixed(0)} ppm`, 130, 90);
    
    // Zone bar
    p.noStroke();
    
    // Green zone
    p.fill(100, 255, 100);
    p.rect(220, 30, 50, 90, 5, 0, 0, 5);
    
    // Yellow zone
    p.fill(255, 220, 100);
    p.rect(270, 30, 50, 90);
    
    // Red zone
    p.fill(255, 100, 100);
    p.rect(320, 30, 60, 90, 0, 5, 5, 0);
    
    // Zone labels
    p.fill(30);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Good', 245, 75);
    p.text('Mod', 295, 75);
    p.text('Poor', 350, 75);
    
    // Threshold values
    p.fill(200);
    p.textSize(9);
    p.text('0', 220, 130);
    p.text(goodMax.toString(), 270, 130);
    p.text(moderateMax.toString(), 320, 130);
    p.text('600+', 370, 130);
    
    // Indicator arrow
    let indicatorX: number;
    if (displayLevel < goodMax) {
      indicatorX = p.map(displayLevel, 0, goodMax, 220, 270);
    } else if (displayLevel < moderateMax) {
      indicatorX = p.map(displayLevel, goodMax, moderateMax, 270, 320);
    } else {
      indicatorX = p.map(displayLevel, moderateMax, 600, 320, 380);
    }
    indicatorX = p.constrain(indicatorX, 225, 375);
    
    p.fill(255);
    p.noStroke();
    p.triangle(indicatorX - 8, 25, indicatorX + 8, 25, indicatorX, 35);
    p.triangle(indicatorX - 8, 125, indicatorX + 8, 125, indicatorX, 115);
    
    // Sensor icon
    p.fill(80, 80, 90);
    p.stroke(100);
    p.strokeWeight(1);
    p.rect(30, 140, 50, 40, 5);
    
    // Sensor mesh
    p.stroke(60);
    for (let i = 0; i < 4; i++) {
      p.line(38 + i * 10, 148, 38 + i * 10, 172);
      p.line(35, 152 + i * 6, 75, 152 + i * 6);
    }
    
    // Gas particles near sensor based on level
    const particleCount = p.floor(displayLevel / 50);
    p.noStroke();
    for (let i = 0; i < particleCount; i++) {
      const px = 85 + p.noise(i, p.frameCount * 0.02) * 80;
      const py = 140 + p.noise(i + 100, p.frameCount * 0.02) * 40;
      const particleAlpha = p.map(displayLevel, 0, 600, 50, 200);
      p.fill(150, 100, 50, particleAlpha);
      p.ellipse(px, py, 8 + p.noise(i * 2) * 6, 8 + p.noise(i * 2) * 6);
    }
    
    // Slider
    p.fill(50, 55, 65);
    p.rect(180, 155, 200, 20, 5);
    
    const sliderX = p.map(gasLevel, 0, 600, 185, 375);
    
    // Slider gradient
    for (let x = 185; x < 375; x++) {
      const t = p.map(x, 185, 375, 0, 600);
      let c: p5.Color;
      if (t < goodMax) {
        c = p.color(100, 255, 100);
      } else if (t < moderateMax) {
        c = p.color(255, 220, 100);
      } else {
        c = p.color(255, 100, 100);
      }
      p.stroke(c);
      p.line(x, 158, x, 172);
    }
    
    // Slider handle
    p.fill(dragging ? 255 : 220);
    p.stroke(100);
    p.strokeWeight(2);
    p.ellipse(sliderX, 165, 20, 20);
    
    // Instructions
    p.fill(120);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Drag slider to change gas concentration', 280, 190);
  };
  
  p.mousePressed = () => {
    if (p.mouseY > 150 && p.mouseY < 180 && p.mouseX > 175 && p.mouseX < 385) {
      dragging = true;
      updateGasLevel();
    }
  };
  
  p.mouseDragged = () => {
    if (dragging) {
      updateGasLevel();
    }
  };
  
  p.mouseReleased = () => {
    dragging = false;
  };
  
  const updateGasLevel = () => {
    gasLevel = p.constrain(p.map(p.mouseX, 185, 375, 0, 600), 0, 600);
  };
};
