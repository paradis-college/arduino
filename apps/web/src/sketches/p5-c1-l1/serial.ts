/**
 * P5-C1-L1 Serial Communication Sketch 1
 * Text packets moving PC→Arduino and back.
 */
import type p5 from 'p5';

export const serialSketch = (p: p5) => {
  let packets: { x: number; direction: number; text: string }[] = [];
  let lastSend = 0;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);

    if (p.millis() - lastSend > 2000) {
      packets.push({ x: 100, direction: 1, text: 'Hello!' });
      lastSend = p.millis();
    }

    updatePackets();
    drawPC();
    drawArduino();
    drawCable();
    drawPackets();
    drawLabels();
  };

  const updatePackets = () => {
    for (let i = packets.length - 1; i >= 0; i--) {
      packets[i].x += 3 * packets[i].direction;

      // Packet reaches Arduino, send response
      if (packets[i].x > 450 && packets[i].direction === 1) {
        packets.push({ x: 450, direction: -1, text: 'OK!' });
        packets.splice(i, 1);
      }
      // Packet reaches PC
      else if (packets[i].x < 150 && packets[i].direction === -1) {
        packets.splice(i, 1);
      }
    }
  };

  const drawPC = () => {
    // Monitor
    p.fill(50, 50, 60);
    p.stroke(80);
    p.strokeWeight(2);
    p.rect(30, 100, 120, 90, 5);

    // Screen
    p.fill(30, 40, 50);
    p.rect(40, 110, 100, 65, 3);

    // Serial monitor text
    p.fill(100, 255, 100);
    p.textSize(8);
    p.textAlign(p.LEFT, p.TOP);
    p.text('> Serial Monitor', 45, 115);
    p.text('TX: Hello!', 45, 130);
    p.text('RX: OK!', 45, 145);

    // Stand
    p.fill(60);
    p.rect(75, 190, 30, 20);
    p.rect(60, 205, 60, 10, 3);

    // Label
    p.fill(200);
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Computer', 90, 240);
  };

  const drawArduino = () => {
    p.fill(30, 60, 100);
    p.stroke(50, 80, 120);
    p.strokeWeight(2);
    p.rect(450, 120, 100, 80, 5);

    // USB port
    p.fill(80, 80, 90);
    p.rect(440, 145, 15, 20, 2);

    // Chip
    p.fill(30, 30, 40);
    p.rect(470, 140, 40, 30, 2);

    // TX/RX LEDs
    p.fill(packets.some(p => p.direction === 1 && p.x > 300) ? p.color(255, 100, 100) : p.color(50, 30, 30));
    p.ellipse(520, 135, 8, 8);
    p.fill(packets.some(p => p.direction === -1) ? p.color(100, 255, 100) : p.color(30, 50, 30));
    p.ellipse(535, 135, 8, 8);

    // Labels
    p.fill(150);
    p.textSize(7);
    p.text('TX', 520, 145);
    p.text('RX', 535, 145);

    p.fill(200);
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Arduino', 500, 240);
  };

  const drawCable = () => {
    p.stroke(100, 100, 120);
    p.strokeWeight(4);
    p.noFill();
    p.line(150, 160, 440, 160);
  };

  const drawPackets = () => {
    for (const packet of packets) {
      const color = packet.direction === 1 ? p.color(100, 200, 255) : p.color(255, 200, 100);

      // Packet body
      p.fill(color);
      p.stroke(255);
      p.strokeWeight(1);
      p.rect(packet.x - 25, 145, 50, 25, 5);

      // Text
      p.fill(30);
      p.noStroke();
      p.textSize(10);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(packet.text, packet.x, 157);

      // Direction arrow
      p.fill(color);
      p.text(packet.direction === 1 ? '→' : '←', packet.x + (packet.direction * 30), 157);
    }
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Serial Communication (UART)', 50, 300);
    p.text('→ TX (transmit) sends data', 60, 320);
    p.text('→ RX (receive) gets data', 60, 340);

    p.fill(150);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Watch data packets travel between PC and Arduino', 300, 380);
  };
};

export default serialSketch;
