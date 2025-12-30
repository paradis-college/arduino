/**
 * P1-C2-L2 Capacitors Sketch 1
 * Capacitor filling/emptying with smooth RC curve graph beside it.
 */
import type p5 from 'p5';

export const capacitorChargeSketch = (p: p5) => {
  let charging = true;
  let chargeLevel = 0;
  let timeElapsed = 0;
  const RC = 2; // Time constant in seconds
  let graphData: number[] = [];
  const maxDataPoints = 200;

  p.setup = () => {
    p.createCanvas(600, 400);
    p.frameRate(60);
  };

  p.draw = () => {
    p.background(30, 35, 45);

    // Update charge
    updateCharge();

    // Draw components
    drawCapacitor();
    drawGraph();
    drawControls();
    drawLabels();
  };

  p.mousePressed = () => {
    // Toggle charge/discharge button
    if (p.mouseX > 50 && p.mouseX < 200 && p.mouseY > 340 && p.mouseY < 380) {
      charging = !charging;
      graphData = [];
      timeElapsed = 0;
    }
  };

  const updateCharge = () => {
    const dt = 1 / 60; // Assuming 60fps
    timeElapsed += dt;

    if (charging) {
      // Charging: V = Vmax * (1 - e^(-t/RC))
      chargeLevel = 1 - Math.exp(-timeElapsed / RC);
    } else {
      // Discharging: V = V0 * e^(-t/RC)
      chargeLevel = Math.exp(-timeElapsed / RC);
    }

    // Record data for graph
    if (graphData.length < maxDataPoints) {
      graphData.push(chargeLevel);
    }
  };

  const drawCapacitor = () => {
    const cx = 150;
    const cy = 180;

    // Capacitor body/housing
    p.fill(50, 50, 60);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(cx - 60, cy - 80, 120, 160, 8);

    // Capacitor plates
    p.fill(150, 130, 60);
    p.noStroke();
    p.rect(cx - 40, cy - 60, 20, 120); // Left plate
    p.rect(cx + 20, cy - 60, 20, 120); // Right plate

    // Electric field lines (animated when charging)
    if (chargeLevel > 0.05) {
      p.stroke(100, 150, 255, chargeLevel * 200);
      p.strokeWeight(1);
      for (let i = 0; i < 5; i++) {
        const y = cy - 40 + i * 20;
        const offset = p.sin(p.frameCount * 0.05 + i) * 3;
        p.line(cx - 15 + offset, y, cx + 15 + offset, y);

        // Arrow head
        p.fill(100, 150, 255, chargeLevel * 200);
        p.noStroke();
        p.triangle(cx + 10 + offset, y - 3, cx + 10 + offset, y + 3, cx + 17 + offset, y);
        p.stroke(100, 150, 255, chargeLevel * 200);
        p.strokeWeight(1);
      }
    }

    // Charge indicators on plates
    const numCharges = Math.floor(chargeLevel * 8);
    p.textSize(12);
    p.noStroke();

    // Positive charges on left plate
    p.fill(255, 100, 100);
    for (let i = 0; i < numCharges; i++) {
      const y = cy - 50 + i * 15;
      p.text('+', cx - 32, y);
    }

    // Negative charges on right plate
    p.fill(100, 150, 255);
    for (let i = 0; i < numCharges; i++) {
      const y = cy - 50 + i * 15;
      p.text('−', cx + 28, y);
    }

    // Connection wires
    p.stroke(100, 150, 200);
    p.strokeWeight(3);
    p.line(cx - 30, cy - 80, cx - 30, cy - 100);
    p.line(cx + 30, cy - 80, cx + 30, cy - 100);
    p.line(cx - 30, cy + 80, cx - 30, cy + 100);
    p.line(cx + 30, cy + 80, cx + 30, cy + 100);

    // Voltage display
    p.fill(200);
    p.noStroke();
    p.textSize(16);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(`${(chargeLevel * 5).toFixed(2)}V`, cx, cy + 130);

    // Charge percentage
    p.fill(100, 200, 255);
    p.textSize(14);
    p.text(`${(chargeLevel * 100).toFixed(0)}% charged`, cx, cy + 150);
  };

  const drawGraph = () => {
    const graphX = 320;
    const graphY = 50;
    const graphW = 250;
    const graphH = 200;

    // Graph background
    p.fill(40, 45, 55);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(graphX, graphY, graphW, graphH);

    // Grid lines
    p.stroke(60);
    p.strokeWeight(0.5);
    for (let i = 1; i < 5; i++) {
      const y = graphY + (graphH / 5) * i;
      p.line(graphX, y, graphX + graphW, y);
    }
    for (let i = 1; i < 5; i++) {
      const x = graphX + (graphW / 5) * i;
      p.line(x, graphY, x, graphY + graphH);
    }

    // Draw RC curve
    p.stroke(100, 200, 100);
    p.strokeWeight(2);
    p.noFill();
    p.beginShape();
    for (let i = 0; i < graphData.length; i++) {
      const x = graphX + (i / maxDataPoints) * graphW;
      const y = graphY + graphH - graphData[i] * graphH;
      p.vertex(x, y);
    }
    p.endShape();

    // Current point
    if (graphData.length > 0) {
      const lastIndex = graphData.length - 1;
      const x = graphX + (lastIndex / maxDataPoints) * graphW;
      const y = graphY + graphH - graphData[lastIndex] * graphH;

      p.fill(255, 200, 100);
      p.noStroke();
      p.ellipse(x, y, 10, 10);
    }

    // Axis labels
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Time →', graphX + graphW / 2, graphY + graphH + 20);

    p.push();
    p.translate(graphX - 25, graphY + graphH / 2);
    p.rotate(-p.PI / 2);
    p.text('Voltage', 0, 0);
    p.pop();

    // Graph title
    p.fill(150);
    p.textSize(14);
    p.text(charging ? 'Charging Curve (RC)' : 'Discharge Curve (RC)', graphX + graphW / 2, graphY - 20);

    // Time constant marker
    if (graphData.length > maxDataPoints * 0.3) {
      p.stroke(255, 200, 100, 150);
      p.strokeWeight(1);
      const tcX = graphX + graphW * 0.3;
      p.line(tcX, graphY, tcX, graphY + graphH);

      p.fill(255, 200, 100);
      p.noStroke();
      p.textSize(10);
      p.text('τ = RC', tcX, graphY + graphH + 35);
    }
  };

  const drawControls = () => {
    // Toggle button
    const btnX = 50;
    const btnY = 340;
    const btnW = 150;
    const btnH = 40;

    p.fill(charging ? p.color(60, 120, 60) : p.color(120, 60, 60));
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(btnX, btnY, btnW, btnH, 8);

    p.fill(255);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(charging ? '⚡ Charging...' : '📉 Discharging...', btnX + btnW / 2, btnY + btnH / 2);

    p.fill(150);
    p.textSize(11);
    p.text('Click to toggle', btnX + btnW / 2, btnY + btnH + 15);
  };

  const drawLabels = () => {
    p.fill(150);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);

    p.text('Capacitor stores energy in an electric field', 300, 380);
    p.text('Charge/discharge follows exponential RC curve', 300, 395);
  };
};

export default capacitorChargeSketch;
