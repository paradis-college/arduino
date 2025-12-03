import type p5 from 'p5';

/**
 * Shows the program flow: setup -> loop -> loop -> loop...
 */
export const programFlowSketch = (p: p5) => {
  let phase: 'power' | 'setup' | 'loop' = 'power';
  let phaseTimer = 0;
  let loopCount = 0;
  let ballPosition = 0;

  p.setup = () => {
    p.createCanvas(400, 260);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    p.background(30);

    // Phase transitions
    phaseTimer += p.deltaTime;
    
    if (phase === 'power' && phaseTimer > 1500) {
      phase = 'setup';
      phaseTimer = 0;
      ballPosition = 0;
    } else if (phase === 'setup' && phaseTimer > 2000) {
      phase = 'loop';
      phaseTimer = 0;
      ballPosition = 0;
    } else if (phase === 'loop' && phaseTimer > 1500) {
      loopCount++;
      phaseTimer = 0;
      ballPosition = 0;
    }

    // Update ball position
    if (phase === 'power') {
      ballPosition = phaseTimer / 1500;
    } else if (phase === 'setup') {
      ballPosition = phaseTimer / 2000;
    } else {
      ballPosition = phaseTimer / 1500;
    }

    // Title
    p.fill(255);
    p.textSize(16);
    p.noStroke();
    p.text('Watch the Flow! 🎯', p.width / 2, 20);

    // Flow diagram
    const startX = 50;
    const y = 100;
    const boxW = 80;
    const boxH = 50;
    const spacing = 30;

    // Power On box
    const powerX = startX;
    drawBox(powerX, y, boxW, boxH, '⚡ Power', phase === 'power', p.color(100, 150, 200));

    // Arrow from power to setup
    drawArrow(powerX + boxW, y + boxH / 2, powerX + boxW + spacing, y + boxH / 2, phase === 'power');

    // setup() box
    const setupX = powerX + boxW + spacing;
    drawBox(setupX, y, boxW, boxH, 'setup()', phase === 'setup', p.color(255, 150, 50));
    p.fill(150);
    p.textSize(8);
    p.text('ONCE', setupX + boxW / 2, y + boxH + 12);

    // Arrow from setup to loop
    drawArrow(setupX + boxW, y + boxH / 2, setupX + boxW + spacing, y + boxH / 2, phase === 'setup');

    // loop() box
    const loopX = setupX + boxW + spacing;
    drawBox(loopX, y, boxW, boxH, 'loop()', phase === 'loop', p.color(100, 200, 150));
    p.fill(150);
    p.textSize(8);
    p.text('FOREVER', loopX + boxW / 2, y + boxH + 12);

    // Loop back arrow
    const loopBackY = y + boxH + 25;
    p.stroke(phase === 'loop' ? p.color(100, 255, 150) : p.color(80));
    p.strokeWeight(phase === 'loop' ? 3 : 2);
    p.noFill();
    
    // Curved arrow going back
    p.line(loopX + boxW / 2, y + boxH, loopX + boxW / 2, loopBackY);
    p.line(loopX + boxW / 2, loopBackY, loopX - 20, loopBackY);
    p.line(loopX - 20, loopBackY, loopX - 20, y + boxH / 2);
    p.line(loopX - 20, y + boxH / 2, loopX, y + boxH / 2);

    // Arrow head
    p.fill(phase === 'loop' ? p.color(100, 255, 150) : p.color(80));
    p.noStroke();
    p.triangle(loopX, y + boxH / 2, loopX - 10, y + boxH / 2 - 6, loopX - 10, y + boxH / 2 + 6);

    // Moving ball indicator
    let ballX, ballY;
    if (phase === 'power') {
      ballX = powerX + ballPosition * (boxW + spacing);
      ballY = y + boxH / 2;
    } else if (phase === 'setup') {
      ballX = setupX + ballPosition * (boxW + spacing);
      ballY = y + boxH / 2;
    } else {
      // Loop phase - ball goes around
      if (ballPosition < 0.3) {
        // Going down from loop box
        ballX = loopX + boxW / 2;
        ballY = y + boxH + (ballPosition / 0.3) * 25;
      } else if (ballPosition < 0.6) {
        // Going left
        const prog = (ballPosition - 0.3) / 0.3;
        ballX = loopX + boxW / 2 - prog * (boxW / 2 + 20);
        ballY = loopBackY;
      } else if (ballPosition < 0.8) {
        // Going up
        const prog = (ballPosition - 0.6) / 0.2;
        ballX = loopX - 20;
        ballY = loopBackY - prog * (loopBackY - y - boxH / 2);
      } else {
        // Going right back into loop
        const prog = (ballPosition - 0.8) / 0.2;
        ballX = loopX - 20 + prog * 20;
        ballY = y + boxH / 2;
      }
    }

    p.fill(255, 200, 0);
    p.noStroke();
    p.ellipse(ballX, ballY, 15, 15);

    // Counter display
    p.fill(40);
    p.stroke(60);
    p.strokeWeight(1);
    p.rect(280, 170, 100, 60, 5);

    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.text('loop() count:', 330, 185);
    
    p.fill(100, 255, 150);
    p.textSize(24);
    p.text(loopCount.toString(), 330, 210);

    // Instruction
    p.fill(150);
    p.textSize(11);
    p.text('Power → setup() once → loop() forever!', p.width / 2, p.height - 10);
  };

  function drawBox(x: number, y: number, w: number, h: number, text: string, active: boolean, color: p5.Color) {
    // Glow when active
    if (active) {
      p.noStroke();
      p.fill(p.red(color), p.green(color), p.blue(color), 30);
      p.rect(x - 5, y - 5, w + 10, h + 10, 10);
    }

    p.fill(active ? color : p.color(50, 55, 65));
    p.stroke(active ? p.color(255) : p.color(80));
    p.strokeWeight(active ? 3 : 2);
    p.rect(x, y, w, h, 8);

    p.fill(active ? 255 : 150);
    p.noStroke();
    p.textSize(12);
    p.text(text, x + w / 2, y + h / 2);
  }

  function drawArrow(x1: number, y1: number, x2: number, y2: number, active: boolean) {
    p.stroke(active ? 200 : 80);
    p.strokeWeight(active ? 3 : 2);
    p.line(x1, y1, x2, y2);

    p.fill(active ? 200 : 80);
    p.noStroke();
    p.triangle(x2, y1, x2 - 8, y1 - 5, x2 - 8, y1 + 5);
  }
};
