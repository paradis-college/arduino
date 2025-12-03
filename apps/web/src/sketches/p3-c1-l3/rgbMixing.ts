import type p5 from 'p5';

/**
 * RGB LED mixing colors from 3 independent PWM sliders
 * gif3: RGB LED mixing colors from 3 independent PWM sliders
 */
export const rgbMixingSketch = (p: p5) => {
  let redValue = 255;
  let greenValue = 100;
  let blueValue = 50;
  let dragging: string | null = null;

  p.setup = () => {
    p.createCanvas(400, 300);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    p.background(30);

    // Title
    p.fill(255);
    p.textSize(16);
    p.noStroke();
    p.text('RGB LED Color Mixing', p.width / 2, 20);

    // RGB LED
    const ledX = p.width / 2;
    const ledY = 90;
    const ledR = 70;

    // LED glow
    p.noStroke();
    for (let i = 5; i > 0; i--) {
      p.fill(redValue, greenValue, blueValue, 30 * i);
      p.ellipse(ledX, ledY, ledR + i * 15, ledR + i * 15);
    }

    // LED body
    p.stroke(100);
    p.strokeWeight(2);
    p.fill(redValue, greenValue, blueValue);
    p.ellipse(ledX, ledY, ledR, ledR);

    // Sliders
    const sliderX = 60;
    const sliderW = 280;
    const sliderH = 15;

    const sliders = [
      { y: 170, value: redValue, color: [255, 50, 50], label: 'Red' },
      { y: 205, value: greenValue, color: [50, 255, 50], label: 'Green' },
      { y: 240, value: blueValue, color: [50, 50, 255], label: 'Blue' },
    ];

    sliders.forEach((slider, index) => {
      // Slider track
      p.fill(60);
      p.noStroke();
      p.rect(sliderX, slider.y, sliderW, sliderH, 5);

      // Slider fill
      p.fill(slider.color[0], slider.color[1], slider.color[2]);
      p.rect(sliderX, slider.y, (slider.value / 255) * sliderW, sliderH, 5);

      // Slider handle
      const handleX = sliderX + (slider.value / 255) * sliderW - 8;
      p.fill(255);
      p.stroke(slider.color[0], slider.color[1], slider.color[2]);
      p.strokeWeight(2);
      p.rect(handleX, slider.y - 3, 16, sliderH + 6, 3);

      // Label
      p.noStroke();
      p.fill(200);
      p.textSize(10);
      p.textAlign(p.LEFT, p.CENTER);
      p.text(slider.label, 10, slider.y + sliderH / 2);
      p.textAlign(p.RIGHT, p.CENTER);
      p.text(Math.round(slider.value), p.width - 10, slider.y + sliderH / 2);
    });

    // Hex color code
    p.textAlign(p.CENTER, p.CENTER);
    const hexColor = '#' + 
      Math.round(redValue).toString(16).padStart(2, '0') +
      Math.round(greenValue).toString(16).padStart(2, '0') +
      Math.round(blueValue).toString(16).padStart(2, '0');
    p.fill(255);
    p.textSize(12);
    p.text(`Color: ${hexColor.toUpperCase()}`, p.width / 2, p.height - 15);

    // Instructions
    p.fill(150);
    p.textSize(10);
    p.text('Drag sliders to mix RGB colors', p.width / 2, p.height - 35);
  };

  p.mousePressed = () => {
    const sliderX = 60;
    const sliderW = 280;

    if (p.mouseY >= 167 && p.mouseY <= 188) dragging = 'red';
    else if (p.mouseY >= 202 && p.mouseY <= 223) dragging = 'green';
    else if (p.mouseY >= 237 && p.mouseY <= 258) dragging = 'blue';
  };

  p.mouseDragged = () => {
    if (dragging) {
      const sliderX = 60;
      const sliderW = 280;
      const newValue = p.constrain(p.map(p.mouseX, sliderX, sliderX + sliderW, 0, 255), 0, 255);

      if (dragging === 'red') redValue = newValue;
      else if (dragging === 'green') greenValue = newValue;
      else if (dragging === 'blue') blueValue = newValue;
    }
  };

  p.mouseReleased = () => {
    dragging = null;
  };
};
