/**
 * P3-C3-L4 Combined Input/Output Sketch 1
 * Control panel: buttons + knob feeding LED states.
 */
import type p5 from 'p5';

export const controlPanelSketch = (p: p5) => {
  let button1 = false;
  let button2 = false;
  let knobValue = 128;
  let isDraggingKnob = false;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);
    drawControlPanel();
    drawOutputPanel();
    drawLabels();
  };

  p.mousePressed = () => {
    if (p.dist(p.mouseX, p.mouseY, 100, 180) < 25) button1 = true;
    if (p.dist(p.mouseX, p.mouseY, 100, 260) < 25) button2 = true;
    if (p.dist(p.mouseX, p.mouseY, 220, 220) < 40) isDraggingKnob = true;
  };

  p.mouseReleased = () => {
    button1 = false;
    button2 = false;
    isDraggingKnob = false;
  };

  p.mouseDragged = () => {
    if (isDraggingKnob) {
      knobValue = p.constrain(p.map(p.mouseY, 280, 160, 0, 255), 0, 255);
    }
  };

  const drawControlPanel = () => {
    p.fill(50, 55, 65);
    p.stroke(80);
    p.strokeWeight(2);
    p.rect(50, 100, 220, 200, 10);

    p.fill(200);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('INPUTS', 160, 85);

    // Button 1
    p.fill(button1 ? p.color(100, 200, 100) : p.color(200, 80, 80));
    p.stroke(100);
    p.strokeWeight(2);
    p.ellipse(100, 180, 50, 50);
    p.fill(255);
    p.noStroke();
    p.textSize(10);
    p.text('BTN 1', 100, 180);

    // Button 2
    p.fill(button2 ? p.color(100, 200, 100) : p.color(200, 80, 80));
    p.stroke(100);
    p.strokeWeight(2);
    p.ellipse(100, 260, 50, 50);
    p.fill(255);
    p.noStroke();
    p.text('BTN 2', 100, 260);

    // Knob
    p.fill(60, 60, 70);
    p.stroke(100);
    p.ellipse(220, 220, 80, 80);
    p.fill(80, 80, 90);
    p.ellipse(220, 220, 60, 60);

    const knobAngle = p.map(knobValue, 0, 255, -135, 135);
    p.push();
    p.translate(220, 220);
    p.rotate(p.radians(knobAngle));
    p.stroke(200);
    p.strokeWeight(3);
    p.line(0, 0, 0, -25);
    p.pop();

    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.text('KNOB', 220, 275);
    p.text(Math.round(knobValue), 220, 220);
  };

  const drawOutputPanel = () => {
    p.fill(50, 55, 65);
    p.stroke(80);
    p.strokeWeight(2);
    p.rect(330, 100, 220, 200, 10);

    p.fill(200);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('OUTPUTS', 440, 85);

    // LED 1 (controlled by button 1)
    const led1On = button1;
    if (led1On) {
      p.noStroke();
      for (let r = 35; r > 0; r -= 7) {
        p.fill(255, 100, 100, (1 - r / 35) * 150);
        p.ellipse(380, 180, r * 2, r * 2);
      }
    }
    p.fill(led1On ? p.color(255, 80, 80) : p.color(80, 40, 40));
    p.stroke(100);
    p.strokeWeight(2);
    p.ellipse(380, 180, 40, 40);
    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.text('LED 1', 380, 215);

    // LED 2 (controlled by button 2)
    const led2On = button2;
    if (led2On) {
      p.noStroke();
      for (let r = 35; r > 0; r -= 7) {
        p.fill(100, 255, 100, (1 - r / 35) * 150);
        p.ellipse(380, 260, r * 2, r * 2);
      }
    }
    p.fill(led2On ? p.color(80, 255, 80) : p.color(40, 80, 40));
    p.stroke(100);
    p.strokeWeight(2);
    p.ellipse(380, 260, 40, 40);
    p.fill(200);
    p.noStroke();
    p.text('LED 2', 380, 295);

    // PWM LED (controlled by knob)
    const brightness = knobValue / 255;
    if (brightness > 0.1) {
      p.noStroke();
      for (let r = 35 * brightness; r > 0; r -= 7) {
        p.fill(255, 200, 100, brightness * (1 - r / (35 * brightness)) * 200);
        p.ellipse(500, 220, r * 2, r * 2);
      }
    }
    p.fill(p.lerpColor(p.color(60, 50, 40), p.color(255, 200, 100), brightness));
    p.stroke(100);
    p.strokeWeight(2);
    p.ellipse(500, 220, 50, 50);
    p.fill(200);
    p.noStroke();
    p.text('PWM LED', 500, 260);
    p.text(`${Math.round(brightness * 100)}%`, 500, 220);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Combined Inputs & Outputs', 50, 50);

    p.fill(150);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Click buttons and drag knob to control LEDs', 300, 370);
  };
};

export default controlPanelSketch;
