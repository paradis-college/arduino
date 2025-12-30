/**
 * P2-C2-L1 Temperature/Humidity Sketch 1
 * Thermometer rising/falling based on slider.
 */
import type p5 from 'p5';

export const temperatureSketch = (p: p5) => {
  let temperature = 25; // Celsius

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);

    drawThermometer();
    drawSlider();
    drawTemperatureValue();
    drawLabels();
  };

  p.mouseDragged = () => {
    // Temperature slider
    if (p.mouseX > 350 && p.mouseX < 550 && p.mouseY > 300 && p.mouseY < 340) {
      temperature = p.map(p.mouseX, 350, 550, -20, 50);
      temperature = p.constrain(temperature, -20, 50);
    }
  };

  const drawThermometer = () => {
    const x = 150;
    const y = 200;
    const tubeHeight = 200;
    const tubeWidth = 30;
    const bulbRadius = 35;

    // Thermometer tube
    p.fill(240);
    p.stroke(200);
    p.strokeWeight(3);
    p.rect(x - tubeWidth / 2, y - tubeHeight / 2, tubeWidth, tubeHeight, tubeWidth / 2);

    // Bulb
    p.fill(240);
    p.ellipse(x, y + tubeHeight / 2 + bulbRadius - 15, bulbRadius * 2, bulbRadius * 2);

    // Mercury/liquid level
    const minY = y + tubeHeight / 2 - 10;
    const maxY = y - tubeHeight / 2 + 20;
    const tempNormalized = (temperature + 20) / 70; // -20 to 50 normalized
    const mercuryTop = p.lerp(minY, maxY, tempNormalized);

    // Mercury color based on temperature
    let mercuryColor;
    if (temperature < 0) {
      mercuryColor = p.color(100, 150, 255); // Cold blue
    } else if (temperature < 20) {
      mercuryColor = p.lerpColor(p.color(100, 150, 255), p.color(255, 100, 100), temperature / 20);
    } else {
      mercuryColor = p.color(255, 80, 80); // Hot red
    }

    // Mercury column
    p.fill(mercuryColor);
    p.noStroke();
    p.rect(x - tubeWidth / 2 + 5, mercuryTop, tubeWidth - 10, minY - mercuryTop + 10);

    // Mercury bulb
    p.ellipse(x, y + tubeHeight / 2 + bulbRadius - 15, bulbRadius * 1.5, bulbRadius * 1.5);

    // Scale marks
    p.stroke(150);
    p.strokeWeight(1);
    p.fill(150);
    p.textSize(10);
    p.textAlign(p.LEFT, p.CENTER);

    for (let t = -20; t <= 50; t += 10) {
      const markY = p.map(t, -20, 50, minY, maxY);
      p.line(x + tubeWidth / 2 + 5, markY, x + tubeWidth / 2 + 15, markY);
      p.text(`${t}°`, x + tubeWidth / 2 + 20, markY);
    }

    // Thermometer cap
    p.fill(200);
    p.stroke(150);
    p.strokeWeight(2);
    p.ellipse(x, y - tubeHeight / 2 - 5, tubeWidth + 10, 15);
  };

  const drawSlider = () => {
    const x = 350;
    const y = 320;
    const w = 200;

    // Gradient background (cold to hot)
    for (let i = 0; i < w; i++) {
      const t = i / w;
      let c;
      if (t < 0.3) {
        c = p.lerpColor(p.color(100, 150, 255), p.color(200, 200, 200), t / 0.3);
      } else {
        c = p.lerpColor(p.color(200, 200, 200), p.color(255, 100, 100), (t - 0.3) / 0.7);
      }
      p.stroke(c);
      p.line(x + i, y - 8, x + i, y + 8);
    }

    // Border
    p.noFill();
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x, y - 8, w, 16, 8);

    // Handle
    const handleX = p.map(temperature, -20, 50, x, x + w);
    p.fill(200);
    p.stroke(255);
    p.strokeWeight(2);
    p.ellipse(handleX, y, 24, 24);

    // Labels
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Temperature Control', x + w / 2, y - 30);
    p.textSize(10);
    p.text('❄ -20°C', x, y + 25);
    p.textAlign(p.RIGHT, p.CENTER);
    p.text('50°C 🔥', x + w, y + 25);
  };

  const drawTemperatureValue = () => {
    const x = 450;
    const y = 150;
    const w = 130;
    const h = 100;

    // Display background
    p.fill(40, 45, 55);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x - w / 2, y - h / 2, w, h, 10);

    // Temperature value
    let valueColor;
    if (temperature < 10) {
      valueColor = p.color(100, 200, 255);
    } else if (temperature < 30) {
      valueColor = p.color(100, 255, 150);
    } else {
      valueColor = p.color(255, 150, 100);
    }

    p.fill(valueColor);
    p.noStroke();
    p.textSize(32);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(`${temperature.toFixed(1)}°`, x, y - 10);

    p.fill(200);
    p.textSize(14);
    p.text('Celsius', x, y + 25);

    // Status icon
    let icon;
    if (temperature < 5) {
      icon = '❄️';
    } else if (temperature < 18) {
      icon = '🌡️';
    } else if (temperature < 28) {
      icon = '☀️';
    } else {
      icon = '🔥';
    }
    p.textSize(24);
    p.text(icon, x, y - h / 2 - 20);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('DHT Temperature Sensor', 50, 50);
    p.text('→ Measures ambient temperature', 60, 70);
    p.text('→ Returns value in Celsius or Fahrenheit', 60, 90);

    p.fill(150);
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Drag slider to simulate temperature changes', 300, 385);
  };
};

export default temperatureSketch;
