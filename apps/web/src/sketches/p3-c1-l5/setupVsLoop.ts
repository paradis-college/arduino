/**
 * P3-C1-L5 setup() vs loop() Sketch 1
 * Flow diagram showing setup() once then loop() cycling.
 */
import type p5 from 'p5';

export const setupVsLoopSketch = (p: p5) => {
  let loopCount = 0;
  let currentPhase: 'power' | 'setup' | 'loop' = 'power';
  let phaseTimer = 0;
  let loopHighlight = 0;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);

    // Animation logic
    phaseTimer++;

    if (currentPhase === 'power' && phaseTimer > 60) {
      currentPhase = 'setup';
      phaseTimer = 0;
    } else if (currentPhase === 'setup' && phaseTimer > 90) {
      currentPhase = 'loop';
      phaseTimer = 0;
    } else if (currentPhase === 'loop') {
      if (phaseTimer > 40) {
        loopCount++;
        loopHighlight = (loopHighlight + 1) % 3;
        phaseTimer = 0;
      }
    }

    drawFlowDiagram();
    drawCodeBox();
    drawCounters();
    drawLabels();
  };

  const drawFlowDiagram = () => {
    const cx = 300;
    const startY = 60;

    // Power On box
    drawFlowBox(cx, startY, 'POWER ON', p.color(100, 150, 200), currentPhase === 'power');

    // Arrow down to setup
    drawArrow(cx, startY + 30, cx, startY + 60, currentPhase === 'power');

    // setup() box
    drawFlowBox(cx, startY + 90, 'setup()', p.color(200, 150, 100), currentPhase === 'setup');
    p.fill(150);
    p.textSize(9);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Runs ONCE', cx, startY + 115);

    // Arrow down to loop
    drawArrow(cx, startY + 120, cx, startY + 155, currentPhase === 'setup');

    // loop() box
    drawFlowBox(cx, startY + 185, 'loop()', p.color(100, 200, 150), currentPhase === 'loop');
    p.fill(150);
    p.textSize(9);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Runs FOREVER', cx, startY + 210);

    // Loop back arrow
    const loopX = cx + 80;
    const loopBottomY = startY + 240;

    p.stroke(currentPhase === 'loop' ? p.color(100, 255, 150) : p.color(80));
    p.strokeWeight(currentPhase === 'loop' ? 3 : 2);
    p.noFill();

    // Right side of loop
    p.line(cx + 60, startY + 185, loopX, startY + 185);
    p.line(loopX, startY + 185, loopX, loopBottomY);
    p.line(loopX, loopBottomY, cx, loopBottomY);
    p.line(cx, loopBottomY, cx, startY + 215);

    // Arrow head pointing up
    p.fill(currentPhase === 'loop' ? p.color(100, 255, 150) : p.color(80));
    p.noStroke();
    p.triangle(cx - 6, startY + 220, cx + 6, startY + 220, cx, startY + 210);

    // Loop indicator
    if (currentPhase === 'loop') {
      const indicatorPhase = (phaseTimer / 40) * 4;
      let indicatorX, indicatorY;

      if (indicatorPhase < 1) {
        indicatorX = cx + 60 * indicatorPhase;
        indicatorY = startY + 185;
      } else if (indicatorPhase < 2) {
        indicatorX = loopX;
        indicatorY = startY + 185 + (loopBottomY - startY - 185) * (indicatorPhase - 1);
      } else if (indicatorPhase < 3) {
        indicatorX = loopX - (loopX - cx) * (indicatorPhase - 2);
        indicatorY = loopBottomY;
      } else {
        indicatorX = cx;
        indicatorY = loopBottomY - (loopBottomY - startY - 215) * (indicatorPhase - 3);
      }

      p.fill(255, 200, 100);
      p.noStroke();
      p.ellipse(indicatorX, indicatorY, 12, 12);
    }
  };

  const drawFlowBox = (x: number, y: number, text: string, color: p5.Color, active: boolean) => {
    // Shadow
    p.fill(0, 0, 0, 30);
    p.noStroke();
    p.rect(x - 55 + 3, y - 22 + 3, 110, 44, 8);

    // Box
    p.fill(active ? color : p.color(p.red(color) * 0.5, p.green(color) * 0.5, p.blue(color) * 0.5));
    p.stroke(active ? p.color(255) : p.color(100));
    p.strokeWeight(active ? 3 : 2);
    p.rect(x - 55, y - 22, 110, 44, 8);

    // Text
    p.fill(active ? 255 : 180);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(text, x, y);

    // Glow effect when active
    if (active) {
      p.noFill();
      p.stroke(color);
      p.strokeWeight(2);
      for (let i = 0; i < 3; i++) {
        p.stroke(p.red(color), p.green(color), p.blue(color), 100 - i * 30);
        p.rect(x - 55 - i * 3, y - 22 - i * 3, 110 + i * 6, 44 + i * 6, 10);
      }
    }
  };

  const drawArrow = (x1: number, y1: number, x2: number, y2: number, active: boolean) => {
    p.stroke(active ? p.color(200) : p.color(80));
    p.strokeWeight(active ? 3 : 2);
    p.line(x1, y1, x2, y2);

    p.fill(active ? p.color(200) : p.color(80));
    p.noStroke();
    p.triangle(x2 - 6, y2 - 8, x2 + 6, y2 - 8, x2, y2);
  };

  const drawCodeBox = () => {
    const x = 430;
    const y = 100;

    // Code box
    p.fill(30, 35, 40);
    p.stroke(60);
    p.strokeWeight(1);
    p.rect(x, y, 150, 180, 5);

    p.textFont('monospace');
    p.textSize(10);
    p.textAlign(p.LEFT, p.CENTER);

    // setup() function
    const setupActive = currentPhase === 'setup';
    if (setupActive) {
      p.fill(100, 75, 50);
      p.noStroke();
      p.rect(x + 5, y + 10, 140, 55);
    }
    p.fill(setupActive ? p.color(255, 200, 150) : p.color(200, 150, 100));
    p.text('void setup() {', x + 10, y + 25);
    p.fill(150);
    p.text('  // runs once', x + 10, y + 40);
    p.fill(setupActive ? p.color(255, 200, 150) : p.color(200, 150, 100));
    p.text('}', x + 10, y + 55);

    // loop() function
    const loopActive = currentPhase === 'loop';
    if (loopActive) {
      p.fill(50, 100, 75);
      p.noStroke();
      p.rect(x + 5, y + 80, 140, 70);
    }
    p.fill(loopActive ? p.color(150, 255, 200) : p.color(100, 200, 150));
    p.text('void loop() {', x + 10, y + 95);
    p.fill(150);
    p.text('  // runs forever', x + 10, y + 110);

    // Highlight current line in loop
    if (loopActive) {
      p.fill(255, 200, 100);
      const lines = ['  blink();', '  read();', '  update();'];
      p.text(lines[loopHighlight], x + 10, y + 125);
      p.fill(100);
      for (let i = 0; i < 3; i++) {
        if (i !== loopHighlight) {
          p.text(lines[i].substring(0, 3) + '...', x + 10 + (i === loopHighlight ? 0 : 30), y + 125);
        }
      }
    }

    p.fill(loopActive ? p.color(150, 255, 200) : p.color(100, 200, 150));
    p.text('}', x + 10, y + 160);
  };

  const drawCounters = () => {
    const x = 450;
    const y = 310;

    // Counter display
    p.fill(40, 45, 55);
    p.stroke(100);
    p.strokeWeight(2);
    p.rect(x - 40, y - 25, 100, 70, 8);

    // setup() count (always 1 after setup)
    p.fill(200, 150, 100);
    p.noStroke();
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('setup() calls:', x + 10, y - 10);
    p.textSize(16);
    p.text(currentPhase !== 'power' ? '1' : '0', x + 10, y + 10);

    // loop() count
    p.fill(100, 200, 150);
    p.textSize(11);
    p.text('loop() calls:', x + 10, y + 30);
    p.textSize(16);
    p.text(`${loopCount}`, x + 10, y + 50);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Arduino Program Structure', 50, 330);
    p.text('→ setup(): Initialize pins, serial, variables (once)', 60, 350);
    p.text('→ loop(): Main code that repeats forever', 60, 370);
  };
};

export default setupVsLoopSketch;
