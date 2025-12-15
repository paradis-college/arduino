import type p5 from 'p5';

/**
 * Secondary task frozen during long delay
 * gif2: Secondary task frozen during long delay
 */
export const frozenTaskSketch = (p: p5) => {
  let time = 0;
  let task1Progress = 0;
  let task2Progress = 0;
  let inDelay = false;
  let delayStart = 0;
  const delayDuration = 2000;

  p.setup = () => {
    p.createCanvas(400, 280);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    p.background(30);

    // Title
    p.fill(255);
    p.textSize(16);
    p.noStroke();
    p.text('delay() Freezes Everything', p.width / 2, 25);

    time = p.millis();

    // Check if in delay period
    if (!inDelay) {
      task1Progress += 0.5;
      task2Progress += 0.3;

      if (task1Progress > 100) {
        inDelay = true;
        delayStart = time;
      }
    } else {
      // During delay - both tasks frozen
      if (time - delayStart > delayDuration) {
        inDelay = false;
        task1Progress = 0;
        task2Progress = task2Progress % 100;
      }
    }

    // Task 1: LED Blink
    const task1X = 60;
    const task1Y = 80;
    const taskW = 130;
    const taskH = 100;

    p.fill(inDelay ? 50 : 40, inDelay ? 50 : 60, inDelay ? 60 : 80);
    p.stroke(100);
    p.strokeWeight(1);
    p.rect(task1X, task1Y, taskW, taskH, 5);

    p.noStroke();
    p.fill(255);
    p.textSize(11);
    p.text('Task 1: LED Blink', task1X + taskW / 2, task1Y + 15);

    // LED indicator
    const led1On = !inDelay && Math.sin(task1Progress * 0.1) > 0;
    if (led1On) {
      p.fill(255, 200, 0);
    } else {
      p.fill(80, 50, 30);
    }
    p.ellipse(task1X + taskW / 2, task1Y + 55, 30, 30);

    // Progress bar
    p.fill(60);
    p.rect(task1X + 10, task1Y + 80, taskW - 20, 10, 3);
    p.fill(inDelay ? '#f44336' : '#4CAF50');
    p.rect(task1X + 10, task1Y + 80, ((task1Progress % 100) / 100) * (taskW - 20), 10, 3);

    // Task 2: Sensor Read
    const task2X = 210;
    const task2Y = 80;

    p.fill(inDelay ? 50 : 40, inDelay ? 50 : 60, inDelay ? 60 : 80);
    p.stroke(100);
    p.strokeWeight(1);
    p.rect(task2X, task2Y, taskW, taskH, 5);

    p.noStroke();
    p.fill(255);
    p.textSize(11);
    p.text('Task 2: Sensor', task2X + taskW / 2, task2Y + 15);

    // Sensor value display
    const sensorValue = inDelay ? Math.round(task2Progress) : Math.round(50 + Math.sin(task2Progress * 0.05) * 30);
    p.fill(200);
    p.textSize(20);
    p.text(sensorValue, task2X + taskW / 2, task2Y + 50);

    // Progress bar
    p.fill(60);
    p.rect(task2X + 10, task2Y + 80, taskW - 20, 10, 3);
    p.fill(inDelay ? '#f44336' : '#2196F3');
    p.rect(task2X + 10, task2Y + 80, ((task2Progress % 100) / 100) * (taskW - 20), 10, 3);

    // Delay indicator
    if (inDelay) {
      // Frozen overlay
      p.fill(255, 0, 0, 30);
      p.noStroke();
      p.rect(task1X, task1Y, taskW, taskH, 5);
      p.rect(task2X, task2Y, taskW, taskH, 5);

      // Frozen text
      p.fill(255, 100, 100);
      p.textSize(14);
      p.text('FROZEN!', task1X + taskW / 2, task1Y + taskH + 15);
      p.text('FROZEN!', task2X + taskW / 2, task2Y + taskH + 15);

      // Delay countdown
      const remaining = Math.max(0, delayDuration - (time - delayStart));
      p.fill(255);
      p.textSize(16);
      p.text(`delay(${delayDuration}) - ${Math.round(remaining)}ms remaining`, p.width / 2, 220);
    }

    // CPU status
    p.fill(inDelay ? '#f44336' : '#4CAF50');
    p.textSize(12);
    p.text(inDelay ? 'CPU: BLOCKED' : 'CPU: Running', p.width / 2, 250);

    // Description
    p.fill(150);
    p.textSize(10);
    p.text('delay() blocks ALL code execution', p.width / 2, p.height - 10);
  };
};
