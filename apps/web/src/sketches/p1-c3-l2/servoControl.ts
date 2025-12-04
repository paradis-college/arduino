/**
 * P1-C3-L2 GIF2: Servo Motor Control
 * "Servo arm rotating to target angle with smooth interpolation."
 */
import type p5 from 'p5';

export const servoControlSketch = (p: p5): void => {
  let targetAngle = 90;
  let currentAngle = 90;
  let pulseWidth = 1500; // microseconds
  let dragging = false;
  
  p.setup = () => {
    p.createCanvas(400, 280);
    p.textAlign(p.CENTER, p.CENTER);
  };
  
  p.draw = () => {
    p.background(30, 30, 40);
    
    // Smooth interpolation towards target
    currentAngle = p.lerp(currentAngle, targetAngle, 0.08);
    
    // Calculate pulse width (typically 1000-2000µs for 0-180°)
    pulseWidth = p.map(targetAngle, 0, 180, 1000, 2000);
    
    // Title
    p.fill(200);
    p.textSize(14);
    p.text('Servo Motor Control', p.width/2, 20);
    
    // Draw servo motor body
    const servoX = 120;
    const servoY = 140;
    
    // Servo body
    p.fill(60);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(servoX - 40, servoY - 25, 80, 50, 5);
    
    // Mounting tabs
    p.fill(80);
    p.rect(servoX - 50, servoY - 5, 15, 10, 2);
    p.rect(servoX + 35, servoY - 5, 15, 10, 2);
    
    // Servo horn/arm
    p.push();
    p.translate(servoX, servoY);
    p.rotate(p.radians(currentAngle - 90)); // -90 to make 90° point up
    
    // Arm
    p.fill(200);
    p.stroke(150);
    p.strokeWeight(2);
    p.rect(-8, -60, 16, 60, 3);
    
    // Arm holes
    p.fill(60);
    p.noStroke();
    for (let i = 1; i < 4; i++) {
      p.ellipse(0, -15 * i, 6, 6);
    }
    
    // Center hub
    p.fill(100);
    p.stroke(80);
    p.strokeWeight(2);
    p.ellipse(0, 0, 20, 20);
    
    p.pop();
    
    // Angle arc indicator
    p.noFill();
    p.stroke(100);
    p.strokeWeight(1);
    p.arc(servoX, servoY, 100, 100, p.radians(-90), p.radians(90));
    
    // Target angle indicator
    p.stroke(255, 200, 0);
    p.strokeWeight(2);
    const targetRad = p.radians(targetAngle - 90);
    p.line(
      servoX + p.cos(targetRad) * 40,
      servoY + p.sin(targetRad) * 40,
      servoX + p.cos(targetRad) * 55,
      servoY + p.sin(targetRad) * 55
    );
    
    // Angle labels
    p.fill(150);
    p.noStroke();
    p.textSize(9);
    p.text('0°', servoX - 60, servoY);
    p.text('90°', servoX, servoY - 60);
    p.text('180°', servoX + 60, servoY);
    
    // Angle slider
    const sliderX = 220;
    const sliderY = 70;
    const sliderW = 160;
    
    p.fill(150);
    p.textSize(11);
    p.text('Target Angle', sliderX + sliderW/2, sliderY - 15);
    
    // Slider track
    p.fill(60);
    p.noStroke();
    p.rect(sliderX, sliderY, sliderW, 20, 5);
    
    // Slider fill
    const fillWidth = p.map(targetAngle, 0, 180, 0, sliderW);
    p.fill(0, 150, 255);
    p.rect(sliderX, sliderY, fillWidth, 20, 5);
    
    // Slider handle
    const handleX = sliderX + fillWidth;
    p.fill(dragging ? 255 : 200);
    p.stroke(100);
    p.strokeWeight(2);
    p.ellipse(handleX, sliderY + 10, 24, 24);
    
    p.fill(0);
    p.noStroke();
    p.textSize(9);
    p.text(Math.round(targetAngle) + '°', handleX, sliderY + 10);
    
    // PWM signal visualization
    const pwmY = 130;
    p.fill(150);
    p.textSize(10);
    p.text('PWM Signal (20ms period)', sliderX + sliderW/2, pwmY - 10);
    
    // PWM waveform
    p.stroke(0, 255, 100);
    p.strokeWeight(2);
    p.noFill();
    
    const pwmScale = sliderW / 20000; // 20ms period
    const highTime = pulseWidth * pwmScale;
    
    p.beginShape();
    // Low
    p.vertex(sliderX, pwmY + 20);
    // Rising edge
    p.vertex(sliderX, pwmY);
    // High (pulse)
    p.vertex(sliderX + highTime, pwmY);
    // Falling edge
    p.vertex(sliderX + highTime, pwmY + 20);
    // Low for rest of period
    p.vertex(sliderX + sliderW, pwmY + 20);
    p.endShape();
    
    // Pulse width annotation
    p.stroke(255, 200, 0);
    p.strokeWeight(1);
    p.line(sliderX, pwmY - 5, sliderX + highTime, pwmY - 5);
    p.line(sliderX, pwmY - 8, sliderX, pwmY - 2);
    p.line(sliderX + highTime, pwmY - 8, sliderX + highTime, pwmY - 2);
    
    p.fill(255, 200, 0);
    p.noStroke();
    p.textSize(9);
    p.text(`${Math.round(pulseWidth)}µs`, sliderX + highTime/2, pwmY - 15);
    
    // Info panel
    p.fill(50);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(sliderX, 170, sliderW, 80, 5);
    
    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.LEFT, p.CENTER);
    p.text(`Target: ${Math.round(targetAngle)}°`, sliderX + 10, 190);
    p.text(`Current: ${Math.round(currentAngle)}°`, sliderX + 10, 210);
    p.text(`Pulse: ${Math.round(pulseWidth)}µs`, sliderX + 10, 230);
    
    // Pulse range reference
    p.fill(100);
    p.textSize(8);
    p.text('0° = 1000µs | 90° = 1500µs | 180° = 2000µs', sliderX + 10, 245);
    
    p.textAlign(p.CENTER, p.CENTER);
    
    // Preset buttons
    const presets = [0, 45, 90, 135, 180];
    presets.forEach((angle, i) => {
      const bx = 40 + i * 35;
      const by = 250;
      const isSelected = Math.abs(targetAngle - angle) < 5;
      
      p.fill(isSelected ? p.color(0, 150, 255) : p.color(60));
      p.stroke(isSelected ? p.color(0, 200, 255) : p.color(80));
      p.strokeWeight(1);
      p.rect(bx - 15, by - 12, 30, 24, 4);
      
      p.fill(isSelected ? 255 : 150);
      p.noStroke();
      p.textSize(10);
      p.text(angle + '°', bx, by);
    });
    
    // Drag slider
    if (dragging) {
      targetAngle = p.constrain(p.map(p.mouseX, sliderX, sliderX + sliderW, 0, 180), 0, 180);
    }
  };
  
  p.mousePressed = () => {
    const sliderX = 220;
    const sliderY = 70;
    const sliderW = 160;
    
    // Check slider
    if (p.mouseX > sliderX - 15 && p.mouseX < sliderX + sliderW + 15 &&
        p.mouseY > sliderY - 5 && p.mouseY < sliderY + 30) {
      dragging = true;
    }
    
    // Check preset buttons
    const presets = [0, 45, 90, 135, 180];
    presets.forEach((angle, i) => {
      const bx = 40 + i * 35;
      const by = 250;
      if (p.mouseX > bx - 15 && p.mouseX < bx + 15 && p.mouseY > by - 12 && p.mouseY < by + 12) {
        targetAngle = angle;
      }
    });
  };
  
  p.mouseReleased = () => {
    dragging = false;
  };
};
