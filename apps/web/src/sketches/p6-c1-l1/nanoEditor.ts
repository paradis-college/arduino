/**
 * P6-C1-L1 gif2: nano editor opening, file appearing in tree
 * Shows nano text editor with file tree update
 */
import type p5 from 'p5';

export const nanoEditorSketch = (p: p5) => {
  let editorOpen = false;
  let fileContent = '';
  let cursorVisible = true;
  let cursorTimer = 0;
  let files = ['Desktop/', 'Documents/', 'Downloads/'];
  let savedFile = '';

  p.setup = () => {
    p.createCanvas(400, 300);
    p.textFont('monospace');
  };

  p.draw = () => {
    p.background(30);

    if (!editorOpen) {
      // Terminal view
      drawTerminal();
    } else {
      // Nano editor view
      drawNano();
    }

    // File tree on the right
    drawFileTree();

    // Cursor blink
    cursorTimer++;
    if (cursorTimer > 30) {
      cursorVisible = !cursorVisible;
      cursorTimer = 0;
    }

    // Instruction
    p.fill(150);
    p.textAlign(p.CENTER, p.BOTTOM);
    p.textSize(9);
    p.text(editorOpen ? 'Press keys to type, click Save to save' : 'Click "nano" to open editor', p.width / 2, p.height - 3);
  };

  const drawTerminal = () => {
    // Terminal window
    p.fill(20);
    p.stroke(60);
    p.strokeWeight(1);
    p.rect(10, 20, 230, 200, 5);

    // Title bar
    p.fill(50);
    p.noStroke();
    p.rect(12, 22, 226, 20, 3, 3, 0, 0);

    p.fill(150);
    p.textSize(10);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('pi@raspberrypi:~', 20, 32);

    // Terminal content
    p.fill(100, 255, 100);
    p.textSize(11);
    p.text('pi@raspberrypi:~ $ ls', 20, 60);
    p.text('Desktop  Documents  Downloads', 20, 80);
    p.text('pi@raspberrypi:~ $ ', 20, 110);

    // Nano command button
    p.fill(60);
    p.stroke(100);
    p.rect(145, 103, 85, 18, 3);
    p.fill(100, 200, 255);
    p.noStroke();
    p.textSize(11);
    p.text('nano hello.txt', 148, 115);

    // Cursor
    if (cursorVisible) {
      p.fill(100, 255, 100);
      p.rect(230, 105, 8, 14);
    }
  };

  const drawNano = () => {
    // Nano editor window
    p.fill(0, 0, 40);
    p.stroke(100);
    p.strokeWeight(1);
    p.rect(10, 20, 230, 200, 5);

    // Title bar
    p.fill(200);
    p.noStroke();
    p.rect(12, 22, 226, 20);

    p.fill(0);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('GNU nano 5.4 - hello.txt', 125, 32);

    // Editor content area
    p.fill(255);
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(11);
    p.text(fileContent, 20, 55);

    // Cursor in editor
    if (cursorVisible) {
      const textWidth = p.textWidth(fileContent);
      p.fill(255);
      p.rect(20 + textWidth, 55, 2, 14);
    }

    // Bottom menu
    p.fill(200);
    p.rect(12, 190, 226, 28);

    p.fill(0);
    p.textSize(9);
    p.textAlign(p.LEFT, p.TOP);
    p.text('^G Help', 20, 195);
    p.text('^X Exit', 80, 195);

    // Save button (^O)
    p.fill(50, 100, 50);
    p.stroke(100);
    p.rect(130, 193, 50, 18, 3);
    p.fill(255);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.text('^O Save', 155, 202);

    // Exit button
    p.fill(100, 50, 50);
    p.stroke(100);
    p.rect(185, 193, 45, 18, 3);
    p.fill(255);
    p.noStroke();
    p.text('Exit', 207, 202);
  };

  const drawFileTree = () => {
    // File tree panel
    p.fill(25);
    p.stroke(60);
    p.strokeWeight(1);
    p.rect(250, 20, 140, 200, 5);

    // Title
    p.fill(150);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.LEFT, p.TOP);
    p.text('File Tree', 260, 28);

    // Tree structure
    p.fill(100, 200, 255);
    p.textSize(11);
    p.text('~ (home)', 260, 50);

    p.fill(255, 200, 100);
    let y = 70;
    for (const file of files) {
      p.text('├── ' + file, 265, y);
      y += 18;
    }

    // Show new file if saved
    if (savedFile) {
      p.fill(100, 255, 100);
      p.text('├── ' + savedFile + ' ✓', 265, y);

      // Highlight animation
      const flashAlpha = Math.sin(p.frameCount * 0.1) * 30 + 30;
      p.fill(100, 255, 100, flashAlpha);
      p.noStroke();
      p.rect(263, y - 2, 120, 16, 2);
    }

    // Stats
    p.fill(100);
    p.textSize(9);
    p.text('Files: ' + (files.length + (savedFile ? 1 : 0)), 260, 190);
  };

  p.mousePressed = () => {
    if (!editorOpen) {
      // Check nano button click
      if (p.mouseX >= 145 && p.mouseX <= 230 && p.mouseY >= 103 && p.mouseY <= 121) {
        editorOpen = true;
        fileContent = '';
      }
    } else {
      // Check save button
      if (p.mouseX >= 130 && p.mouseX <= 180 && p.mouseY >= 193 && p.mouseY <= 211) {
        savedFile = 'hello.txt';
      }

      // Check exit button
      if (p.mouseX >= 185 && p.mouseX <= 230 && p.mouseY >= 193 && p.mouseY <= 211) {
        editorOpen = false;
      }
    }
  };

  p.keyPressed = () => {
    if (editorOpen && fileContent.length < 50) {
      if (p.keyCode === p.BACKSPACE as unknown as number) {
        fileContent = fileContent.slice(0, -1);
      } else if (p.key.length === 1) {
        fileContent += p.key;
      }
    }
    return false;
  };
};
