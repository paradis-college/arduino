/**
 * P5-C1-L1 gif2: Serial monitor printing incoming/outgoing messages
 * Displays a serial monitor interface with scrolling messages
 */
import type p5 from 'p5';

export const serialMonitorSketch = (p: p5) => {
  const messages: { text: string; type: 'in' | 'out'; timestamp: number }[] = [];
  let lastMessageTime = 0;

  const incomingMessages = [
    'Arduino Ready!',
    'Received: ON',
    'LED turned ON',
    'Received: OFF',
    'LED turned OFF',
    'Temperature: 24.5C',
    'Humidity: 65%',
    'Sensor reading: 512',
  ];

  const outgoingMessages = [
    'ON',
    'OFF',
    'STATUS',
    'READ',
    'TEMP',
    'HUM',
  ];

  let messageIndex = 0;
  let isOutgoing = false;

  p.setup = () => {
    p.createCanvas(400, 300);
    p.textFont('monospace');
    lastMessageTime = p.millis();

    // Add initial message
    messages.push({ text: '--- Serial Monitor @ 9600 baud ---', type: 'in', timestamp: p.millis() });
  };

  p.draw = () => {
    p.background(30);

    // Header
    p.fill(50);
    p.noStroke();
    p.rect(0, 0, p.width, 30);
    p.fill(200);
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Serial Monitor', 10, 15);

    // Baud rate indicator
    p.fill(100, 255, 100);
    p.textAlign(p.RIGHT, p.CENTER);
    p.text('9600 baud', p.width - 10, 15);

    // Add new messages periodically
    if (p.millis() - lastMessageTime > 800) {
      lastMessageTime = p.millis();

      if (isOutgoing) {
        const msg = outgoingMessages[messageIndex % outgoingMessages.length];
        messages.push({ text: `> ${msg}`, type: 'out', timestamp: p.millis() });
      } else {
        const msg = incomingMessages[messageIndex % incomingMessages.length];
        messages.push({ text: `< ${msg}`, type: 'in', timestamp: p.millis() });
        messageIndex++;
      }
      isOutgoing = !isOutgoing;

      // Keep only last 10 messages
      while (messages.length > 10) {
        messages.shift();
      }
    }

    // Draw messages
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(11);
    let y = 40;

    for (const msg of messages) {
      const age = p.millis() - msg.timestamp;
      const alpha = Math.min(255, 255 - age * 0.02);

      if (msg.type === 'out') {
        p.fill(100, 200, 255, alpha);
      } else {
        p.fill(100, 255, 150, alpha);
      }

      p.text(msg.text, 10, y);
      y += 22;
    }

    // Cursor blink
    if (p.frameCount % 30 < 15) {
      p.fill(200);
      p.rect(10, y + 2, 8, 14);
    }

    // Input field at bottom
    p.fill(40);
    p.rect(0, p.height - 35, p.width, 35);
    p.fill(60);
    p.rect(5, p.height - 30, p.width - 80, 25, 3);

    // Send button
    p.fill(50, 120, 200);
    p.rect(p.width - 70, p.height - 30, 65, 25, 3);
    p.fill(255);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(11);
    p.text('Send', p.width - 37, p.height - 17);

    // Status bar
    p.fill(100);
    p.textAlign(p.LEFT, p.CENTER);
    p.textSize(9);
    p.text('TX: ' + messages.filter(m => m.type === 'out').length + '  RX: ' + messages.filter(m => m.type === 'in').length, 12, p.height - 17);
  };
};
