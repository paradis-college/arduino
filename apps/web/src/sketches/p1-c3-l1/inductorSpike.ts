/**
 * P1-C3-L1 GIF2: Inductor Voltage Spike
 * "Sudden switch-off creates voltage spike spark across coil terminals."
 */
import type p5 from 'p5';

export const inductorSpikeSketch = (p: p5): void => {
  let switchClosed = true;
  let current = 0;
  let spikeActive = false;
  let spikeIntensity = 0;
  let sparkParticles: {x: number, y: number, vx: number, vy: number, life: number}[] = [];

  p.setup = () => {
    p.createCanvas(400, 280);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    p.background(30, 30, 40);

    // Update current
    if (switchClosed) {
      current = p.min(current + 0.05, 1);
      spikeActive = false;
    } else {
      if (current > 0.1 && !spikeActive) {
        spikeActive = true;
        spikeIntensity = current * 255;
        // Create spark particles
        for (let i = 0; i < 20; i++) {
          sparkParticles.push({
            x: 200,
            y: 120,
            vx: p.random(-5, 5),
            vy: p.random(-8, 2),
            life: p.random(20, 40)
          });
        }
      }
      current = p.max(current - 0.02, 0);
    }

    // Decay spike
    spikeIntensity = p.max(spikeIntensity - 8, 0);

    // Title
    p.fill(200);
    p.textSize(14);
    p.text('Inductor Back-EMF Voltage Spike', p.width/2, 20);

    // Draw circuit
    const cx = 100;
    const cy = 140;

    // Power supply
    p.stroke(150);
    p.strokeWeight(2);
    p.line(cx - 30, cy - 60, cx - 30, cy + 60);
    p.line(cx - 40, cy - 60, cx - 20, cy - 60);
    p.line(cx - 35, cy - 50, cx - 25, cy - 50);

    p.fill(150);
    p.noStroke();
    p.textSize(9);
    p.text('+12V', cx - 30, cy - 75);

    // Top wire to switch
    p.stroke(150);
    p.strokeWeight(2);
    p.line(cx - 30, cy - 60, cx + 20, cy - 60);

    // Switch
    p.strokeWeight(3);
    p.point(cx + 20, cy - 60);
    p.point(cx + 60, cy - 60);

    if (switchClosed) {
      p.stroke(100, 255, 100);
      p.strokeWeight(2);
      p.line(cx + 20, cy - 60, cx + 60, cy - 60);
    } else {
      p.stroke(255, 100, 100);
      p.strokeWeight(2);
      p.line(cx + 20, cy - 60, cx + 50, cy - 80);
    }

    // Wire to inductor
    p.stroke(150);
    p.strokeWeight(2);
    p.line(cx + 60, cy - 60, cx + 100, cy - 60);
    p.line(cx + 100, cy - 60, cx + 100, cy - 30);

    // Inductor coil
    p.noFill();
    p.stroke(current > 0.5 ? p.color(100, 200, 255) : p.color(150));
    p.strokeWeight(2);
    for (let i = 0; i < 5; i++) {
      p.arc(cx + 100, cy - 30 + i * 12, 20, 12, p.PI, 0);
    }

    // Magnetic field lines (when current flows)
    if (current > 0.2) {
      p.stroke(100, 150, 255, current * 150);
      p.strokeWeight(1);
      p.noFill();
      for (let i = 0; i < 3; i++) {
        const r = 25 + i * 10;
        p.ellipse(cx + 100, cy, r, r * 1.5);
      }
    }

    // Wire from inductor
    p.stroke(150);
    p.strokeWeight(2);
    p.line(cx + 100, cy + 30, cx + 100, cy + 60);
    p.line(cx + 100, cy + 60, cx - 30, cy + 60);

    // Voltage spike visualization
    if (spikeIntensity > 10) {
      // Spark at switch contacts
      p.stroke(255, 255, 100, spikeIntensity);
      p.strokeWeight(3);

      // Main arc
      p.noFill();
      p.beginShape();
      for (let i = 0; i <= 10; i++) {
        const t = i / 10;
        const x = p.lerp(cx + 20, cx + 50, t);
        const y = cy - 60 + p.sin(t * p.PI * 3) * 15 * p.random(0.5, 1.5);
        p.vertex(x, y);
      }
      p.endShape();

      // Glow effect
      p.noStroke();
      p.fill(255, 255, 100, spikeIntensity * 0.3);
      p.ellipse(cx + 35, cy - 60, 60, 40);

      // Spike warning
      p.fill(255, 100, 100);
      p.textSize(12);
      p.text('⚠ VOLTAGE SPIKE!', cx + 35, cy - 100);
    }

    // Update and draw spark particles
    p.noStroke();
    sparkParticles = sparkParticles.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.3; // gravity
      particle.life--;

      if (particle.life > 0) {
        p.fill(255, 255, 100, particle.life * 6);
        p.ellipse(particle.x + cx - 65, particle.y, 4, 4);
        return true;
      }
      return false;
    });

    // Voltage graph
    const graphX = 220;
    const graphY = 60;
    const graphW = 160;
    const graphH = 100;

    p.fill(40);
    p.noStroke();
    p.rect(graphX, graphY, graphW, graphH);

    // Grid
    p.stroke(60);
    p.strokeWeight(1);
    const midY = graphY + graphH/2;
    p.line(graphX, midY, graphX + graphW, midY);

    // Labels
    p.fill(150);
    p.noStroke();
    p.textSize(8);
    p.text('+V', graphX - 10, graphY + 10);
    p.text('0V', graphX - 10, midY);
    p.text('-V', graphX - 10, graphY + graphH - 10);

    // Voltage trace
    p.stroke(0, 255, 100);
    p.strokeWeight(2);
    p.noFill();

    const normalV = current * 30;
    const spikeV = spikeIntensity / 255 * 40;

    p.beginShape();
    // Normal operation
    p.vertex(graphX, midY - normalV);
    p.vertex(graphX + graphW * 0.6, midY - normalV);
    // Spike (negative due to back-EMF)
    if (spikeIntensity > 10) {
      p.stroke(255, 100, 100);
      p.vertex(graphX + graphW * 0.65, midY + spikeV);
    }
    p.vertex(graphX + graphW * 0.7, midY - normalV * 0.5);
    p.vertex(graphX + graphW, midY - normalV * 0.2);
    p.endShape();

    // Back-EMF label
    if (spikeIntensity > 10) {
      p.fill(255, 100, 100);
      p.textSize(9);
      p.text('Back-EMF', graphX + graphW * 0.75, midY + spikeV + 15);
    }

    // Info panel
    p.fill(50);
    p.stroke(80);
    p.strokeWeight(1);
    p.rect(220, 170, 160, 70, 5);

    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.LEFT, p.CENTER);
    p.text(`Switch: ${switchClosed ? 'CLOSED' : 'OPEN'}`, 230, 185);
    p.text(`Current: ${(current * 100).toFixed(0)}%`, 230, 200);
    p.text(`Back-EMF: ${spikeIntensity > 10 ? 'ACTIVE!' : 'None'}`, 230, 215);
    p.text(`V = -L × dI/dt`, 230, 230);

    p.textAlign(p.CENTER, p.CENTER);

    // Switch button
    p.fill(switchClosed ? p.color(100, 200, 100) : p.color(200, 100, 100));
    p.stroke(150);
    p.strokeWeight(2);
    p.rect(40, 220, 100, 40, 8);

    p.fill(255);
    p.noStroke();
    p.textSize(12);
    p.text(switchClosed ? 'OPEN SWITCH' : 'CLOSE SWITCH', 90, 240);

    // Explanation
    p.fill(100);
    p.textSize(9);
    p.text('Inductors resist sudden current changes', p.width/2, p.height - 20);
    p.text('Opening switch creates dangerous voltage spike!', p.width/2, p.height - 8);
  };

  p.mousePressed = () => {
    // Toggle switch
    if (p.mouseX > 40 && p.mouseX < 140 && p.mouseY > 220 && p.mouseY < 260) {
      switchClosed = !switchClosed;
    }
  };
};
