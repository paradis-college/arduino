/**
 * P6-C2-L1 gif2: Breadboard LEDs reflecting selected pin state
 * Shows breadboard with LEDs controlled by GPIO pins
 */
import type p5 from 'p5';

export const breadboardLedsSketch = (p: p5) => {
  const gpios = [
    { pin: 17, name: 'GPIO17', state: false, color: [255, 100, 100] },
    { pin: 27, name: 'GPIO27', state: false, color: [100, 255, 100] },
    { pin: 22, name: 'GPIO22', state: false, color: [100, 100, 255] },
    { pin: 5, name: 'GPIO5', state: false, color: [255, 255, 100] },
  ];

  p.setup = () => {
    p.createCanvas(400, 300);
  };

  p.draw = () => {
    p.background(40);

    // Pi GPIO header representation
    p.fill(30);
    p.stroke(80);
    p.strokeWeight(2);
    p.rect(20, 30, 130, 180, 5);

    // Pi label
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.TOP);
    p.text('Raspberry Pi', 85, 35);
    p.textSize(9);
    p.text('GPIO Header', 85, 50);

    // GPIO buttons
    for (let i = 0; i < gpios.length; i++) {
      const gpio = gpios[i];
      const y = 75 + i * 32;

      // Button
      p.fill(gpio.state ? p.color(gpio.color[0], gpio.color[1], gpio.color[2]) : p.color(60));
      p.stroke(100);
      p.strokeWeight(1);
      p.rect(30, y, 100, 25, 3);

      // Label
      p.fill(gpio.state ? 0 : 200);
      p.noStroke();
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(10);
      p.text(gpio.name + ': ' + (gpio.state ? 'HIGH' : 'LOW'), 80, y + 12);
    }

    // Wires from Pi to breadboard
    for (let i = 0; i < gpios.length; i++) {
      const gpio = gpios[i];
      const startY = 87 + i * 32;
      const endY = 60 + i * 50;

      p.stroke(gpio.color[0], gpio.color[1], gpio.color[2], gpio.state ? 255 : 100);
      p.strokeWeight(2);
      p.noFill();
      p.beginShape();
      p.vertex(130, startY);
      p.vertex(160, startY);
      p.vertex(180, endY);
      p.vertex(220, endY);
      p.endShape();
    }

    // Breadboard
    p.fill(240, 240, 230);
    p.stroke(150);
    p.strokeWeight(1);
    p.rect(220, 30, 160, 220, 3);

    // Breadboard holes pattern
    p.fill(80);
    p.noStroke();
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 10; col++) {
        const x = 235 + col * 14;
        const y = 45 + row * 10;
        p.ellipse(x, y, 4, 4);
      }
    }

    // Power rails
    p.fill(255, 0, 0, 50);
    p.rect(222, 35, 8, 210);
    p.fill(0, 0, 255, 50);
    p.rect(370, 35, 8, 210);

    // LEDs on breadboard
    for (let i = 0; i < gpios.length; i++) {
      const gpio = gpios[i];
      const ledX = 280;
      const ledY = 60 + i * 50;

      // LED body
      if (gpio.state) {
        // Glow effect
        for (let g = 3; g >= 0; g--) {
          p.fill(gpio.color[0], gpio.color[1], gpio.color[2], 30 - g * 7);
          p.noStroke();
          p.ellipse(ledX, ledY, 30 + g * 10, 30 + g * 10);
        }
      }

      // LED dome
      p.fill(gpio.state ?
        p.color(gpio.color[0], gpio.color[1], gpio.color[2]) :
        p.color(gpio.color[0] / 4, gpio.color[1] / 4, gpio.color[2] / 4));
      p.stroke(100);
      p.strokeWeight(1);
      p.ellipse(ledX, ledY, 20, 20);

      // LED highlight
      p.fill(255, 255, 255, gpio.state ? 100 : 30);
      p.noStroke();
      p.ellipse(ledX - 4, ledY - 4, 6, 6);

      // Resistor
      p.fill(200, 150, 100);
      p.stroke(80);
      p.rect(ledX + 20, ledY - 4, 25, 8, 2);

      // Resistor bands
      p.fill(255, 0, 0);
      p.noStroke();
      p.rect(ledX + 25, ledY - 4, 3, 8);
      p.fill(255, 0, 0);
      p.rect(ledX + 30, ledY - 4, 3, 8);
      p.fill(139, 69, 19);
      p.rect(ledX + 35, ledY - 4, 3, 8);
    }

    // Legend
    p.fill(150);
    p.noStroke();
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(9);
    p.text('Click GPIO buttons to toggle pins', 25, 220);
    p.text('Watch LEDs respond on breadboard', 25, 235);

    // Status
    const onCount = gpios.filter(g => g.state).length;
    p.fill(100);
    p.textAlign(p.RIGHT, p.TOP);
    p.text('Active: ' + onCount + '/4', 370, 260);
  };

  p.mousePressed = () => {
    // Check GPIO button clicks
    for (let i = 0; i < gpios.length; i++) {
      const y = 75 + i * 32;
      if (p.mouseX >= 30 && p.mouseX <= 130 && p.mouseY >= y && p.mouseY <= y + 25) {
        gpios[i].state = !gpios[i].state;
        break;
      }
    }
  };
};
