/**
 * P6-C1-L1 Linux Basics Sketch 1
 * Terminal typing commands; file tree updating visually.
 */
import type p5 from 'p5';

export const linuxBasicsSketch = (p: p5) => {
  let currentCommand = '';
  let commandHistory: string[] = [];
  let files: string[] = ['file1.txt', 'data.csv'];
  let typingIndex = 0;
  let commandToType = '';
  const commands = ['ls', 'mkdir projects', 'touch hello.py', 'ls'];

  p.setup = () => {
    p.createCanvas(600, 400);
    scheduleNextCommand();
  };

  const scheduleNextCommand = () => {
    const cmdIndex = commandHistory.length % commands.length;
    commandToType = commands[cmdIndex];
    typingIndex = 0;
  };

  p.draw = () => {
    p.background(30, 35, 45);
    
    // Typing animation
    if (typingIndex < commandToType.length) {
      if (p.frameCount % 5 === 0) {
        currentCommand = commandToType.substring(0, typingIndex + 1);
        typingIndex++;
      }
    } else if (typingIndex === commandToType.length && p.frameCount % 60 === 0) {
      executeCommand(commandToType);
      commandHistory.push(commandToType);
      currentCommand = '';
      scheduleNextCommand();
    }
    
    drawTerminal();
    drawFileTree();
    drawLabels();
  };

  const executeCommand = (cmd: string) => {
    if (cmd === 'mkdir projects') {
      if (!files.includes('projects/')) files.push('projects/');
    } else if (cmd === 'touch hello.py') {
      if (!files.includes('hello.py')) files.push('hello.py');
    }
  };

  const drawTerminal = () => {
    // Terminal window
    p.fill(20, 25, 30);
    p.stroke(60);
    p.strokeWeight(2);
    p.rect(50, 80, 320, 240, 8);
    
    // Title bar
    p.fill(40, 45, 55);
    p.rect(50, 80, 320, 25, 8, 8, 0, 0);
    
    // Window buttons
    p.fill(255, 100, 100);
    p.noStroke();
    p.ellipse(65, 92, 10, 10);
    p.fill(255, 200, 100);
    p.ellipse(80, 92, 10, 10);
    p.fill(100, 255, 100);
    p.ellipse(95, 92, 10, 10);
    
    p.fill(200);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Terminal', 210, 92);
    
    // Terminal content
    p.textFont('monospace');
    p.textSize(11);
    p.textAlign(p.LEFT, p.TOP);
    
    let y = 115;
    
    // Command history
    for (let i = Math.max(0, commandHistory.length - 5); i < commandHistory.length; i++) {
      p.fill(100, 200, 100);
      p.text(`pi@raspberrypi:~$ ${commandHistory[i]}`, 60, y);
      y += 15;
      
      // Output
      if (commandHistory[i] === 'ls') {
        p.fill(200);
        p.text(files.join('  '), 60, y);
        y += 15;
      }
    }
    
    // Current line
    p.fill(100, 200, 100);
    p.text(`pi@raspberrypi:~$ ${currentCommand}`, 60, y);
    
    // Cursor
    if (p.frameCount % 30 < 15) {
      const cursorX = 60 + p.textWidth(`pi@raspberrypi:~$ ${currentCommand}`);
      p.fill(100, 200, 100);
      p.rect(cursorX, y, 8, 12);
    }
  };

  const drawFileTree = () => {
    const x = 420;
    const y = 100;
    
    // File tree panel
    p.fill(40, 45, 55);
    p.stroke(80);
    p.strokeWeight(2);
    p.rect(x, y, 140, 200, 8);
    
    p.fill(200);
    p.textSize(11);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('File Browser', x + 70, y - 15);
    
    // Files
    p.textFont('monospace');
    p.textSize(10);
    p.textAlign(p.LEFT, p.CENTER);
    
    let fileY = y + 25;
    p.fill(100, 200, 255);
    p.text('📁 ~/', x + 15, fileY);
    
    for (const file of files) {
      fileY += 20;
      const icon = file.endsWith('/') ? '📁' : '📄';
      p.fill(200);
      p.text(`  ${icon} ${file}`, x + 15, fileY);
    }
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Linux Command Line Basics', 50, 50);
    
    p.fill(150);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Watch commands being typed and files appearing', 300, 365);
  };
};

export default linuxBasicsSketch;
