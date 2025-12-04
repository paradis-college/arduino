import type p5 from 'p5';

/**
 * Shows the 0-255 brightness scale
 */
export const brightnessScaleSketch = (p: p5) => {
  let selectedValue = 127;
  let dragging = false;

  p.setup = () => {
    p.createCanvas(400, 260);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    p.background(30);

    // Title
    p.fill(255);
    p.textSize(16);
    p.noStroke();
    p.text('256 Brightness Levels! 🌟', p.width / 2, 25);

    // Big LED display
    const ledX = p.width / 2;
    const ledY = 90;
    const ledR = 70;
    const brightness = selectedValue / 255;

    // LED glow
    if (brightness > 0.05) {
      p.noStroke();
      for (let i = 6; i > 0; i--) {
        p.fill(255, 200, 50, brightness * 40 * i);
        p.ellipse(ledX, ledY, ledR + i * 15 * brightness, ledR + i * 15 * brightness);
      }
    }

    // LED body
    const ledColor = p.lerpColor(p.color(60, 50, 30), p.color(255, 220, 50), brightness);
    p.fill(ledColor);
    p.stroke(100);
    p.strokeWeight(2);
    p.ellipse(ledX, ledY, ledR, ledR);

    // Brightness bar
    const barX = 50;
    const barY = 170;
    const barW = 300;
    const barH = 30;

    // Gradient background
    for (let i = 0; i <= barW; i++) {
      const c = p.lerpColor(p.color(50, 40, 30), p.color(255, 220, 100), i / barW);
      p.stroke(c);
      p.line(barX + i, barY, barX + i, barY + barH);
    }

    // Border
    p.noFill();
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(barX, barY, barW, barH, 5);

    // Handle
    const handleX = barX + (selectedValue / 255) * barW;
    p.fill(255);
    p.stroke(dragging ? '#4CAF50' : '#969696');
    p.strokeWeight(dragging ? 3 : 2);
    p.ellipse(handleX, barY + barH / 2, 25, 35);

    // Value display on handle
    p.fill(30);
    p.noStroke();
    p.textSize(10);
    p.text(Math.round(selectedValue), handleX, barY + barH / 2);

    // Scale labels
    p.fill(200);
    p.textSize(11);
    p.noStroke();
    
    p.textAlign(p.LEFT, p.CENTER);
    p.text('0', barX, barY + barH + 20);
    p.text('OFF', barX, barY + barH + 35);
    
    p.textAlign(p.CENTER, p.CENTER);
    p.text('127', barX + barW / 2, barY + barH + 20);
    p.text('HALF', barX + barW / 2, barY + barH + 35);
    
    p.textAlign(p.RIGHT, p.CENTER);
    p.text('255', barX + barW, barY + barH + 20);
    p.text('MAX!', barX + barW, barY + barH + 35);

    // Current value display
    p.textAlign(p.CENTER, p.CENTER);
    p.fill(255, 200, 0);
    p.textSize(20);
    p.text(`analogWrite(9, ${Math.round(selectedValue)})`, p.width / 2, 145);

    // Percentage
    p.fill(150);
    p.textSize(12);
    p.text(`${Math.round(brightness * 100)}% brightness`, p.width / 2, 240);

    // Instruction
    p.textSize(11);
    p.fill(100);
    p.text('Drag the slider to change brightness!', p.width / 2, p.height - 10);
  };

  p.mousePressed = () => {
    const barX = 50;
    const barY = 170;
    const barW = 300;
    const barH = 30;

    if (p.mouseX >= barX && p.mouseX <= barX + barW && p.mouseY >= barY - 10 && p.mouseY <= barY + barH + 10) {
      dragging = true;
      selectedValue = p.map(p.mouseX, barX, barX + barW, 0, 255);
      selectedValue = p.constrain(selectedValue, 0, 255);
    }
  };

  p.mouseDragged = () => {
    if (dragging) {
      const barX = 50;
      const barW = 300;
      selectedValue = p.map(p.mouseX, barX, barX + barW, 0, 255);
      selectedValue = p.constrain(selectedValue, 0, 255);
    }
  };

  p.mouseReleased = () => {
    dragging = false;
  };
};
