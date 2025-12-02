/**
 * P2-C2-L4 Pressure Sensors Sketch 1
 * Pressure gauge needle swinging with slider input.
 */
import type p5 from 'p5';

export const pressureSketch = (p: p5) => {
  let pressure = 1013; // hPa (standard atmospheric pressure)
  let needleAngle = 0;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);
    
    // Animate needle
    const targetAngle = p.map(pressure, 900, 1100, -120, 120);
    needleAngle = p.lerp(needleAngle, targetAngle, 0.1);
    
    drawGauge();
    drawSlider();
    drawWeatherIndicator();
    drawLabels();
  };

  p.mouseDragged = () => {
    if (p.mouseX > 350 && p.mouseX < 550 && p.mouseY > 330 && p.mouseY < 370) {
      pressure = p.map(p.mouseX, 350, 550, 900, 1100);
      pressure = p.constrain(pressure, 900, 1100);
    }
  };

  const drawGauge = () => {
    const cx = 200;
    const cy = 220;
    const radius = 130;
    
    // Gauge background
    p.fill(50, 55, 65);
    p.stroke(100);
    p.strokeWeight(4);
    p.ellipse(cx, cy, radius * 2, radius * 2);
    
    // Inner ring
    p.fill(30, 35, 45);
    p.stroke(80);
    p.strokeWeight(2);
    p.ellipse(cx, cy, radius * 1.7, radius * 1.7);
    
    // Color zones
    const arcStart = -120;
    const arcEnd = 120;
    const zoneWidth = (arcEnd - arcStart) / 5;
    
    // Low pressure (stormy)
    p.noFill();
    p.stroke(150, 100, 200);
    p.strokeWeight(15);
    p.arc(cx, cy, radius * 1.4, radius * 1.4, 
          p.radians(arcStart - 90), p.radians(arcStart - 90 + zoneWidth));
    
    // Changing
    p.stroke(100, 150, 200);
    p.arc(cx, cy, radius * 1.4, radius * 1.4,
          p.radians(arcStart - 90 + zoneWidth), p.radians(arcStart - 90 + zoneWidth * 2));
    
    // Fair
    p.stroke(100, 200, 150);
    p.arc(cx, cy, radius * 1.4, radius * 1.4,
          p.radians(arcStart - 90 + zoneWidth * 2), p.radians(arcStart - 90 + zoneWidth * 3));
    
    // Clear
    p.stroke(200, 200, 100);
    p.arc(cx, cy, radius * 1.4, radius * 1.4,
          p.radians(arcStart - 90 + zoneWidth * 3), p.radians(arcStart - 90 + zoneWidth * 4));
    
    // Very high
    p.stroke(200, 150, 100);
    p.arc(cx, cy, radius * 1.4, radius * 1.4,
          p.radians(arcStart - 90 + zoneWidth * 4), p.radians(arcEnd - 90));
    
    // Scale marks and numbers
    p.stroke(200);
    p.strokeWeight(2);
    p.fill(200);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    
    for (let i = 900; i <= 1100; i += 20) {
      const angle = p.map(i, 900, 1100, arcStart, arcEnd);
      const rad = p.radians(angle - 90);
      const innerR = radius - 25;
      const outerR = radius - 10;
      
      p.line(
        cx + p.cos(rad) * innerR,
        cy + p.sin(rad) * innerR,
        cx + p.cos(rad) * outerR,
        cy + p.sin(rad) * outerR
      );
      
      if (i % 50 === 0) {
        const textR = radius - 40;
        p.noStroke();
        p.text(i, cx + p.cos(rad) * textR, cy + p.sin(rad) * textR);
        p.stroke(200);
      }
    }
    
    // Needle
    p.push();
    p.translate(cx, cy);
    p.rotate(p.radians(needleAngle - 90));
    
    // Needle shadow
    p.fill(0, 0, 0, 50);
    p.noStroke();
    p.triangle(-5, 8, 5, 8, 0, -(radius - 45));
    
    // Needle body
    p.fill(220, 80, 80);
    p.stroke(180, 60, 60);
    p.strokeWeight(1);
    p.triangle(-4, 5, 4, 5, 0, -(radius - 50));
    
    p.pop();
    
    // Center cap
    p.fill(80);
    p.stroke(100);
    p.strokeWeight(2);
    p.ellipse(cx, cy, 25, 25);
    p.fill(60);
    p.ellipse(cx, cy, 15, 15);
    
    // Value display
    p.fill(20, 25, 35);
    p.stroke(60);
    p.strokeWeight(2);
    p.rect(cx - 40, cy + 40, 80, 30, 5);
    
    p.fill(100, 255, 150);
    p.noStroke();
    p.textSize(16);
    p.text(`${Math.round(pressure)}`, cx, cy + 55);
    
    // Unit label
    p.fill(150);
    p.textSize(10);
    p.text('hPa', cx, cy + 80);
    p.text('BAROMETER', cx, cy - radius - 15);
  };

  const drawSlider = () => {
    const x = 350;
    const y = 350;
    const w = 200;
    
    // Track
    p.fill(60);
    p.stroke(80);
    p.strokeWeight(2);
    p.rect(x, y - 8, w, 16, 8);
    
    const handleX = p.map(pressure, 900, 1100, x, x + w);
    p.fill(200);
    p.stroke(255);
    p.strokeWeight(2);
    p.ellipse(handleX, y, 24, 24);
    
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Pressure Control', x + w / 2, y - 30);
    p.textSize(9);
    p.text('Low', x, y + 25);
    p.textAlign(p.RIGHT, p.CENTER);
    p.text('High', x + w, y + 25);
  };

  const drawWeatherIndicator = () => {
    const x = 480;
    const y = 180;
    
    // Weather icon and text based on pressure
    let icon: string;
    let weather: string;
    let color: p5.Color;
    
    if (pressure < 980) {
      icon = '⛈️';
      weather = 'Stormy';
      color = p.color(150, 100, 200);
    } else if (pressure < 1000) {
      icon = '🌧️';
      weather = 'Rainy';
      color = p.color(100, 150, 200);
    } else if (pressure < 1020) {
      icon = '⛅';
      weather = 'Changing';
      color = p.color(150, 200, 150);
    } else if (pressure < 1040) {
      icon = '☀️';
      weather = 'Fair';
      color = p.color(200, 200, 100);
    } else {
      icon = '🌤️';
      weather = 'Very Dry';
      color = p.color(200, 150, 100);
    }
    
    // Display box
    p.fill(40, 45, 55);
    p.stroke(color);
    p.strokeWeight(3);
    p.rect(x - 50, y - 60, 100, 120, 10);
    
    p.noStroke();
    p.textSize(40);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(icon, x, y - 20);
    
    p.fill(color);
    p.textSize(14);
    p.text(weather, x, y + 30);
    
    p.fill(150);
    p.textSize(10);
    p.text('Forecast', x, y - 70);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Atmospheric Pressure Sensor', 50, 50);
    p.text('→ Measures air pressure (barometric)', 60, 70);
    p.text('→ Used for weather prediction', 60, 90);
    
    p.fill(150);
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Drag slider to simulate pressure changes', 450, 390);
  };
};

export default pressureSketch;
