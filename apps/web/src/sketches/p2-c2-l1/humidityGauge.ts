/**
 * P2-C2-L1 Temperature/Humidity - GIF 2
 * Humidity droplet gauge filling/emptying smoothly
 */
import type p5 from 'p5';

export const humidityGaugeSketch = (p: p5) => {
  let humidity = 50;
  let displayHumidity = 50;
  let dragging = false;
  
  p.setup = () => {
    p.createCanvas(400, 220);
    p.textFont('monospace');
  };
  
  p.draw = () => {
    p.background(30, 35, 45);
    
    // Smooth transition
    displayHumidity = p.lerp(displayHumidity, humidity, 0.08);
    
    // Draw large droplet outline
    const dropCenterX = 130;
    const dropCenterY = 110;
    const dropScale = 2.5;
    
    // Droplet shape path
    p.push();
    p.translate(dropCenterX, dropCenterY);
    
    // Background droplet
    p.fill(50, 60, 80);
    p.stroke(80, 100, 140);
    p.strokeWeight(3);
    drawDroplet(p, 0, 0, dropScale);
    
    // Water fill level
    const fillLevel = p.map(displayHumidity, 0, 100, 50, -50);
    
    // Clip to droplet shape
    (p.drawingContext as CanvasRenderingContext2D).save();
    (p.drawingContext as CanvasRenderingContext2D).beginPath();
    createDropletPath(p, 0, 0, dropScale);
    (p.drawingContext as CanvasRenderingContext2D).clip();
    
    // Water fill
    const waterColor = p.lerpColor(
      p.color(100, 150, 200),
      p.color(50, 120, 200),
      displayHumidity / 100
    );
    p.fill(waterColor);
    p.noStroke();
    p.rect(-40, fillLevel, 80, 100);
    
    // Water surface wave
    p.fill(p.red(waterColor) + 30, p.green(waterColor) + 30, p.blue(waterColor) + 30);
    p.beginShape();
    for (let x = -40; x <= 40; x += 2) {
      const wave = p.sin((x + p.frameCount * 2) * 0.1) * 3;
      p.vertex(x, fillLevel + wave);
    }
    p.vertex(40, fillLevel + 50);
    p.vertex(-40, fillLevel + 50);
    p.endShape(p.CLOSE);
    
    (p.drawingContext as CanvasRenderingContext2D).restore();
    
    // Redraw droplet outline
    p.noFill();
    p.stroke(100, 150, 200);
    p.strokeWeight(3);
    drawDroplet(p, 0, 0, dropScale);
    
    p.pop();
    
    // Percentage display inside droplet
    p.fill(255);
    p.noStroke();
    p.textSize(28);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(`${displayHumidity.toFixed(0)}%`, dropCenterX, dropCenterY + 10);
    
    // Label
    p.fill(150);
    p.textSize(12);
    p.text('Humidity', dropCenterX, dropCenterY + 50);
    
    // Scale on right side
    p.fill(50, 55, 65);
    p.noStroke();
    p.rect(240, 30, 30, 160, 5);
    
    // Scale markings
    p.stroke(80);
    p.strokeWeight(1);
    for (let i = 0; i <= 10; i++) {
      const y = p.map(i, 0, 10, 35, 185);
      const len = i % 5 === 0 ? 25 : 10;
      p.line(245, y, 245 + len, y);
      
      if (i % 5 === 0) {
        p.fill(150);
        p.noStroke();
        p.textSize(10);
        p.textAlign(p.LEFT, p.CENTER);
        p.text(`${100 - i * 10}%`, 275, y);
        p.stroke(80);
      }
    }
    
    // Indicator on scale
    const indicatorY = p.map(displayHumidity, 100, 0, 35, 185);
    p.fill(100, 200, 255);
    p.noStroke();
    p.triangle(240, indicatorY, 248, indicatorY - 6, 248, indicatorY + 6);
    
    // Comfort zones
    p.textSize(9);
    p.textAlign(p.LEFT, p.CENTER);
    
    // Dry zone
    p.fill(255, 150, 100, 100);
    p.noStroke();
    p.rect(320, 155, 60, 30, 3);
    p.fill(255, 150, 100);
    p.text('Dry', 330, 170);
    
    // Comfortable zone
    p.fill(100, 255, 150, 100);
    p.rect(320, 85, 60, 65, 3);
    p.fill(100, 255, 150);
    p.text('Comfort', 325, 117);
    
    // Humid zone
    p.fill(100, 150, 255, 100);
    p.rect(320, 35, 60, 45, 3);
    p.fill(100, 150, 255);
    p.text('Humid', 328, 57);
    
    // Slider
    p.fill(50, 55, 65);
    p.rect(30, 195, 200, 15, 5);
    
    const sliderX = p.map(humidity, 0, 100, 35, 225);
    p.fill(dragging ? p.color(150, 200, 255) : p.color(100, 150, 200));
    p.ellipse(sliderX, 202, 18, 18);
    
    // Slider label
    p.fill(120);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Drag to adjust humidity', 130, 215);
  };
  
  const drawDroplet = (p: p5, x: number, y: number, scale: number) => {
    p.beginShape();
    p.vertex(x, y - 30 * scale);
    // First cubic bezier (3 calls for order 3)
    p.bezierVertex(x + 20 * scale, y - 10 * scale);
    p.bezierVertex(x + 20 * scale, y + 20 * scale);
    p.bezierVertex(x, y + 25 * scale);
    // Second cubic bezier
    p.bezierVertex(x - 20 * scale, y + 20 * scale);
    p.bezierVertex(x - 20 * scale, y - 10 * scale);
    p.bezierVertex(x, y - 30 * scale);
    p.endShape(p.CLOSE);
  };
  
  const createDropletPath = (p: p5, x: number, y: number, scale: number) => {
    const ctx = p.drawingContext as CanvasRenderingContext2D;
    ctx.moveTo(x, y - 30 * scale);
    ctx.bezierCurveTo(
      x + 20 * scale, y - 10 * scale,
      x + 20 * scale, y + 20 * scale,
      x, y + 25 * scale
    );
    ctx.bezierCurveTo(
      x - 20 * scale, y + 20 * scale,
      x - 20 * scale, y - 10 * scale,
      x, y - 30 * scale
    );
  };
  
  p.mousePressed = () => {
    if (p.mouseY > 190 && p.mouseY < 215 && p.mouseX > 25 && p.mouseX < 235) {
      dragging = true;
      updateHumidity();
    }
  };
  
  p.mouseDragged = () => {
    if (dragging) {
      updateHumidity();
    }
  };
  
  p.mouseReleased = () => {
    dragging = false;
  };
  
  const updateHumidity = () => {
    humidity = p.constrain(p.map(p.mouseX, 35, 225, 0, 100), 0, 100);
  };
};
