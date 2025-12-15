import type p5 from 'p5';

/**
 * Code highlight jumping through loop repeatedly
 * gif2: Code highlight jumping through loop repeatedly
 */
export const codeHighlightSketch = (p: p5) => {
  let currentLine = 0;
  let lastUpdate = 0;
  const updateInterval = 800;
  let loopCount = 0;

  const codeLines = [
    'void setup() {',
    '  pinMode(13, OUTPUT);',
    '}',
    '',
    'void loop() {',
    '  digitalWrite(13, HIGH);',
    '  delay(500);',
    '  digitalWrite(13, LOW);',
    '  delay(500);',
    '}',
  ];

  const lineHighlights = [0, 1, 2, 4, 5, 6, 7, 8, 9, 4]; // Execution order
  let highlightIndex = 0;
  let setupDone = false;

  p.setup = () => {
    p.createCanvas(400, 300);
    p.textFont('monospace');
  };

  p.draw = () => {
    p.background(40, 44, 52); // VS Code dark theme

    // Title
    p.fill(255);
    p.textSize(14);
    p.textAlign(p.CENTER, p.CENTER);
    p.noStroke();
    p.text('Code Execution Flow', p.width / 2, 18);

    // Update highlight position
    if (p.millis() - lastUpdate > updateInterval) {
      highlightIndex++;

      if (!setupDone && highlightIndex >= 3) {
        setupDone = true;
      }

      if (highlightIndex >= lineHighlights.length) {
        highlightIndex = 4; // Jump back to loop start
        loopCount++;
      }

      currentLine = lineHighlights[highlightIndex];
      lastUpdate = p.millis();
    }

    // Code display area
    const codeX = 50;
    const codeY = 50;
    const lineHeight = 22;

    // Draw line numbers and code
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(13);

    codeLines.forEach((line, index) => {
      const y = codeY + index * lineHeight;

      // Highlight current line
      if (index === currentLine) {
        p.fill(255, 255, 0, 40);
        p.noStroke();
        p.rect(codeX - 5, y - 2, 320, lineHeight - 2);

        // Arrow indicator
        p.fill(255, 200, 0);
        p.triangle(codeX - 25, y + 7, codeX - 10, y + 7, codeX - 17, y + 2);
        p.triangle(codeX - 25, y + 7, codeX - 10, y + 7, codeX - 17, y + 12);
      }

      // Line number
      p.fill(100);
      p.text(`${index + 1}`, codeX - 35, y);

      // Code text
      if (line.includes('void setup') || line.includes('void loop')) {
        p.fill(198, 120, 221); // Purple for keywords
      } else if (line.includes('pinMode') || line.includes('digitalWrite') || line.includes('delay')) {
        p.fill(97, 175, 239); // Blue for functions
      } else if (line.includes('HIGH') || line.includes('LOW') || line.includes('OUTPUT')) {
        p.fill(209, 154, 102); // Orange for constants
      } else if (line.includes('{') || line.includes('}')) {
        p.fill(255);
      } else {
        p.fill(171, 178, 191);
      }
      p.text(line, codeX, y);
    });

    // Status panel
    p.fill(30);
    p.rect(codeX - 5, 275, 320, 20, 3);

    p.textAlign(p.CENTER, p.CENTER);
    p.fill(setupDone ? '#4CAF50' : '#ff9800');
    p.textSize(11);
    const status = setupDone
      ? `loop() iteration #${loopCount + 1}`
      : 'Running setup()...';
    p.text(status, p.width / 2, 285);
  };
};
