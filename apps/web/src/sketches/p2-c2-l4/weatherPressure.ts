/**
 * P2-C2-L4 Pressure Sensors - GIF 2
 * Weather icon changing with pressure trend graph
 */
import type p5 from 'p5';

export const weatherPressureSketch = (p: p5) => {
  let pressure = 1013;
  let displayPressure = 1013;
  let dragging = false;
  const pressureHistory: number[] = [];
  const maxHistory = 50;

  p.setup = () => {
    p.createCanvas(400, 220);
    p.textFont('monospace');
    // Initialize history
    for (let i = 0; i < maxHistory; i++) {
      pressureHistory.push(1013);
    }
  };

  p.draw = () => {
    p.background(30, 35, 45);

    // Smooth transition
    displayPressure = p.lerp(displayPressure, pressure, 0.05);

    // Update history
    if (p.frameCount % 3 === 0) {
      pressureHistory.shift();
      pressureHistory.push(displayPressure);
    }

    // Determine weather based on pressure
    let weather: string;
    let icon: string;
    let iconColor: p5.Color;

    if (displayPressure < 1000) {
      weather = 'Stormy';
      icon = 'Storm';
      iconColor = p.color(100, 100, 150);
    } else if (displayPressure < 1010) {
      weather = 'Rainy';
      icon = 'Rain';
      iconColor = p.color(100, 150, 200);
    } else if (displayPressure < 1020) {
      weather = 'Cloudy';
      icon = 'Cloud';
      iconColor = p.color(180, 180, 190);
    } else if (displayPressure < 1030) {
      weather = 'Fair';
      icon = 'Partly';
      iconColor = p.color(200, 200, 100);
    } else {
      weather = 'Sunny';
      icon = 'Sun';
      iconColor = p.color(255, 220, 100);
    }

    // Calculate trend
    const oldPressure = pressureHistory[0];
    const trend = displayPressure - oldPressure;
    let trendText: string;
    let trendArrow: string;

    if (trend > 2) {
      trendText = 'Rising';
      trendArrow = '^';
    } else if (trend < -2) {
      trendText = 'Falling';
      trendArrow = 'v';
    } else {
      trendText = 'Steady';
      trendArrow = '-';
    }

    // Weather display panel
    p.fill(40, 45, 55);
    p.stroke(iconColor);
    p.strokeWeight(3);
    p.rect(20, 20, 140, 100, 15);

    // Draw weather icon
    drawWeatherIcon(p, 90, 55, icon, iconColor);

    // Weather label
    p.fill(iconColor);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(weather, 90, 100);

    // Pressure value
    p.fill(50, 55, 65);
    p.stroke(100);
    p.strokeWeight(1);
    p.rect(20, 130, 140, 35, 5);

    p.fill(255);
    p.noStroke();
    p.textSize(16);
    p.text(`${displayPressure.toFixed(1)} hPa`, 90, 148);

    // Trend indicator
    p.fill(trend > 0 ? p.color(100, 255, 100) : (trend < 0 ? p.color(255, 100, 100) : p.color(200)));
    p.textSize(12);
    p.text(`${trendArrow} ${trendText}`, 90, 162);

    // Trend graph
    p.fill(40, 45, 55);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(180, 20, 200, 100, 5);

    // Graph title
    p.fill(150);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.LEFT, p.TOP);
    p.text('Pressure Trend', 190, 25);

    // Graph grid
    p.stroke(50);
    p.strokeWeight(1);
    for (let i = 0; i < 5; i++) {
      const y = 40 + i * 18;
      p.line(185, y, 375, y);
    }

    // Graph axis labels
    p.fill(100);
    p.noStroke();
    p.textSize(8);
    p.textAlign(p.RIGHT, p.CENTER);
    p.text('1040', 183, 40);
    p.text('1020', 183, 58);
    p.text('1000', 183, 76);
    p.text('980', 183, 94);

    // Draw trend line
    p.stroke(100, 200, 255);
    p.strokeWeight(2);
    p.noFill();
    p.beginShape();
    for (let i = 0; i < pressureHistory.length; i++) {
      const x = p.map(i, 0, maxHistory - 1, 190, 370);
      const y = p.map(pressureHistory[i], 970, 1050, 110, 35);
      p.vertex(x, p.constrain(y, 40, 110));
    }
    p.endShape();

    // Current point
    const currentY = p.map(displayPressure, 970, 1050, 110, 35);
    p.fill(255, 200, 100);
    p.noStroke();
    p.ellipse(370, p.constrain(currentY, 40, 110), 8, 8);

    // Pressure zone legend
    p.fill(150);
    p.textSize(9);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Low <1010 | Med 1010-1020 | High >1020', 280, 135);

    // Slider
    p.fill(50, 55, 65);
    p.rect(20, 180, 360, 20, 5);

    const sliderX = p.map(pressure, 970, 1050, 25, 375);
    p.fill(dragging ? 255 : 220);
    p.stroke(100);
    p.strokeWeight(2);
    p.ellipse(sliderX, 190, 18, 18);

    // Slider labels
    p.fill(120);
    p.noStroke();
    p.textSize(9);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('970 hPa', 40, 210);
    p.text('1050 hPa', 360, 210);
  };

  const drawWeatherIcon = (p: p5, x: number, y: number, type: string, color: p5.Color) => {
    p.push();
    p.translate(x, y);

    if (type === 'Sun') {
      // Sun
      p.fill(color);
      p.noStroke();
      p.ellipse(0, 0, 30, 30);
      p.stroke(color);
      p.strokeWeight(2);
      for (let i = 0; i < 8; i++) {
        const angle = i * p.PI / 4;
        p.line(p.cos(angle) * 18, p.sin(angle) * 18, p.cos(angle) * 25, p.sin(angle) * 25);
      }
    } else if (type === 'Cloud') {
      // Cloud
      p.fill(color);
      p.noStroke();
      p.ellipse(-10, 5, 25, 20);
      p.ellipse(5, 0, 30, 25);
      p.ellipse(15, 5, 20, 18);
    } else if (type === 'Rain') {
      // Cloud with rain
      p.fill(150, 150, 160);
      p.noStroke();
      p.ellipse(-10, -5, 25, 20);
      p.ellipse(5, -10, 30, 25);
      p.ellipse(15, -5, 20, 18);
      // Rain drops
      p.stroke(color);
      p.strokeWeight(2);
      p.line(-8, 10, -12, 20);
      p.line(2, 12, -2, 22);
      p.line(12, 10, 8, 20);
    } else if (type === 'Storm') {
      // Cloud with lightning
      p.fill(100, 100, 120);
      p.noStroke();
      p.ellipse(-10, -5, 25, 20);
      p.ellipse(5, -10, 30, 25);
      p.ellipse(15, -5, 20, 18);
      // Lightning
      p.fill(255, 255, 100);
      p.beginShape();
      p.vertex(5, 5);
      p.vertex(-2, 12);
      p.vertex(3, 12);
      p.vertex(-5, 25);
      p.vertex(8, 15);
      p.vertex(3, 15);
      p.vertex(10, 5);
      p.endShape(p.CLOSE);
    } else if (type === 'Partly') {
      // Sun behind cloud
      p.fill(255, 220, 100);
      p.noStroke();
      p.ellipse(-8, -8, 25, 25);
      p.stroke(255, 220, 100);
      p.strokeWeight(2);
      p.line(-8, -25, -8, -18);
      p.line(-25, -8, -18, -8);

      p.fill(color);
      p.noStroke();
      p.ellipse(0, 8, 25, 20);
      p.ellipse(12, 3, 25, 22);
      p.ellipse(20, 8, 18, 16);
    }

    p.pop();
  };

  p.mousePressed = () => {
    if (p.mouseY > 175 && p.mouseY < 205 && p.mouseX > 15 && p.mouseX < 385) {
      dragging = true;
      updatePressure();
    }
  };

  p.mouseDragged = () => {
    if (dragging) {
      updatePressure();
    }
  };

  p.mouseReleased = () => {
    dragging = false;
  };

  const updatePressure = () => {
    pressure = p.constrain(p.map(p.mouseX, 25, 375, 970, 1050), 970, 1050);
  };
};
