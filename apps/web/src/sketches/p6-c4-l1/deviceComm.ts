/**
 * P6-C4-L1 Device Communication Sketch 1
 * Data packets traveling Pi↔Arduino via UART/I2C/SPI lines.
 */
import type p5 from 'p5';

export const deviceCommSketch = (p: p5) => {
  let packets: { x: number; y: number; direction: number; protocol: string }[] = [];
  let sentCount = 0;
  let receivedCount = 0;

  p.setup = () => {
    p.createCanvas(600, 400);
  };

  p.draw = () => {
    p.background(30, 35, 45);

    // Periodically send packets
    if (p.frameCount % 60 === 0) {
      sendPacket('UART', 160);
    }
    if (p.frameCount % 90 === 0) {
      sendPacket('I2C', 200);
    }
    if (p.frameCount % 120 === 0) {
      sendPacket('SPI', 240);
    }

    updatePackets();
    drawRaspberryPi();
    drawArduino();
    drawConnections();
    drawPackets();
    drawStats();
    drawLabels();
  };

  const sendPacket = (protocol: string, y: number) => {
    const direction = Math.random() > 0.5 ? 1 : -1;
    const startX = direction > 0 ? 180 : 420;
    packets.push({ x: startX, y, direction, protocol });
    sentCount++;
  };

  const updatePackets = () => {
    for (let i = packets.length - 1; i >= 0; i--) {
      packets[i].x += 4 * packets[i].direction;

      if ((packets[i].direction > 0 && packets[i].x > 420) ||
          (packets[i].direction < 0 && packets[i].x < 180)) {
        receivedCount++;
        packets.splice(i, 1);
      }
    }
  };

  const drawRaspberryPi = () => {
    p.fill(50, 120, 70);
    p.stroke(40, 100, 60);
    p.strokeWeight(2);
    p.rect(50, 130, 130, 140, 8);

    // CPU
    p.fill(50, 50, 60);
    p.stroke(70);
    p.rect(90, 170, 50, 50, 3);

    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Raspberry', 115, 300);
    p.text('Pi', 115, 315);

    // GPIO pins
    p.fill(60, 60, 70);
    p.rect(175, 150, 10, 100, 2);
  };

  const drawArduino = () => {
    p.fill(30, 60, 100);
    p.stroke(50, 80, 120);
    p.strokeWeight(2);
    p.rect(420, 130, 130, 140, 8);

    // Chip
    p.fill(30, 30, 40);
    p.stroke(50);
    p.rect(450, 170, 60, 50, 2);

    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Arduino', 485, 300);
    p.text('Uno', 485, 315);

    // Pins
    p.fill(60, 60, 70);
    p.rect(415, 150, 10, 100, 2);
  };

  const drawConnections = () => {
    const protocols = [
      { name: 'UART', y: 160, color: p.color(255, 150, 100) },
      { name: 'I2C', y: 200, color: p.color(100, 200, 255) },
      { name: 'SPI', y: 240, color: p.color(200, 150, 255) }
    ];

    for (const proto of protocols) {
      // Connection line
      p.stroke(proto.color);
      p.strokeWeight(3);
      p.line(185, proto.y, 415, proto.y);

      // Protocol label
      p.fill(proto.color);
      p.noStroke();
      p.textSize(9);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(proto.name, 300, proto.y - 12);
    }
  };

  const drawPackets = () => {
    for (const packet of packets) {
      let color;
      if (packet.protocol === 'UART') color = p.color(255, 150, 100);
      else if (packet.protocol === 'I2C') color = p.color(100, 200, 255);
      else color = p.color(200, 150, 255);

      // Packet
      p.fill(color);
      p.stroke(255);
      p.strokeWeight(1);
      p.rect(packet.x - 15, packet.y - 8, 30, 16, 4);

      // Arrow
      p.fill(color);
      p.noStroke();
      const arrowX = packet.x + packet.direction * 20;
      p.triangle(arrowX, packet.y - 5, arrowX, packet.y + 5, arrowX + packet.direction * 8, packet.y);
    }
  };

  const drawStats = () => {
    p.fill(40, 45, 55);
    p.stroke(80);
    p.strokeWeight(2);
    p.rect(250, 280, 100, 70, 8);

    p.fill(200);
    p.noStroke();
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Statistics', 300, 275);

    p.fill(100, 255, 150);
    p.textSize(11);
    p.text(`Sent: ${sentCount}`, 300, 305);
    p.text(`Received: ${receivedCount}`, 300, 325);
  };

  const drawLabels = () => {
    p.fill(200);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('Pi ↔ Arduino Communication', 50, 50);
    p.text('→ UART, I2C, SPI protocols', 60, 70);

    p.fill(150);
    p.textSize(10);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('Watch data packets travel between devices', 300, 380);
  };
};

export default deviceCommSketch;
