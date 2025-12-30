/**
 * P3-C4-L2 gif2: Virtual piano keys lighting and sounding tones
 * Piano keyboard with visual feedback for buzzer frequencies
 */
import type p5 from 'p5';

export const pianoKeysSketch = (p: p5) => {
  const notes = [
    { name: 'C', freq: 262, white: true },
    { name: 'C#', freq: 277, white: false },
    { name: 'D', freq: 294, white: true },
    { name: 'D#', freq: 311, white: false },
    { name: 'E', freq: 330, white: true },
    { name: 'F', freq: 349, white: true },
    { name: 'F#', freq: 370, white: false },
    { name: 'G', freq: 392, white: true },
    { name: 'G#', freq: 415, white: false },
    { name: 'A', freq: 440, white: true },
    { name: 'A#', freq: 466, white: false },
    { name: 'B', freq: 494, white: true },
    { name: 'C5', freq: 523, white: true },
  ];

  let activeNote: number | null = null;
  let wavePhase = 0;

  p.setup = () => {
    p.createCanvas(400, 300);
  };

  p.draw = () => {
    p.background(30);
    wavePhase += 0.1;

    // Title
    p.fill(255);
    p.textSize(16);
    p.textAlign(p.CENTER);
    p.text('Virtual Piano - Buzzer Tones', p.width / 2, 25);

    // Draw piano keys
    const keyStartX = 30;
    const keyY = 80;
    const whiteKeyWidth = 30;
    const whiteKeyHeight = 120;
    const blackKeyWidth = 20;
    const blackKeyHeight = 75;

    let whiteKeyIndex = 0;

    // Draw white keys first
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].white) {
        const x = keyStartX + whiteKeyIndex * whiteKeyWidth;
        const isActive = activeNote === i;

        p.fill(isActive ? [200, 200, 255] : [240, 240, 240]);
        p.stroke(100);
        p.strokeWeight(1);
        p.rect(x, keyY, whiteKeyWidth - 2, whiteKeyHeight, 0, 0, 3, 3);

        // Note label
        p.fill(80);
        p.noStroke();
        p.textSize(10);
        p.text(notes[i].name, x + whiteKeyWidth / 2 - 1, keyY + whiteKeyHeight - 10);

        whiteKeyIndex++;
      }
    }

    // Draw black keys on top
    whiteKeyIndex = 0;
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].white) {
        whiteKeyIndex++;
      } else {
        const x = keyStartX + (whiteKeyIndex - 1) * whiteKeyWidth + whiteKeyWidth - blackKeyWidth / 2;
        const isActive = activeNote === i;

        p.fill(isActive ? [100, 100, 200] : [30, 30, 30]);
        p.stroke(20);
        p.strokeWeight(1);
        p.rect(x, keyY, blackKeyWidth, blackKeyHeight, 0, 0, 3, 3);
      }
    }

    // Buzzer visualization
    const buzzerX = 330;
    const buzzerY = 140;

    // Buzzer body
    p.fill(50);
    p.stroke(100);
    p.strokeWeight(2);
    p.ellipse(buzzerX, buzzerY, 50);
    p.fill(70);
    p.ellipse(buzzerX, buzzerY, 35);

    // Sound waves if note is active
    if (activeNote !== null) {
      const freq = notes[activeNote].freq;
      p.noFill();
      p.stroke(100, 200, 255, 150);
      p.strokeWeight(2);

      for (let i = 0; i < 3; i++) {
        const radius = 30 + i * 15 + (p.sin(wavePhase * (freq / 200) + i) + 1) * 5;
        const alpha = 150 - i * 40;
        p.stroke(100, 200, 255, alpha);
        p.arc(buzzerX, buzzerY, radius, radius, -p.PI / 4, p.PI / 4);
        p.arc(buzzerX, buzzerY, radius, radius, p.PI * 3 / 4, p.PI * 5 / 4);
      }
    }

    // Frequency display
    p.fill(255);
    p.noStroke();
    p.textSize(14);
    p.textAlign(p.CENTER);
    if (activeNote !== null) {
      p.fill(100, 255, 100);
      p.text(`Note: ${notes[activeNote].name}`, p.width / 2, 230);
      p.text(`Frequency: ${notes[activeNote].freq} Hz`, p.width / 2, 250);

      // Waveform preview
      p.stroke(100, 255, 100);
      p.strokeWeight(2);
      p.noFill();
      p.beginShape();
      const waveY = 270;
      for (let x = 100; x < 300; x++) {
        const freq = notes[activeNote].freq;
        const y = waveY + p.sin((x - 100) * freq / 1000 + wavePhase * 5) * 10;
        p.vertex(x, y);
      }
      p.endShape();
    } else {
      p.fill(150);
      p.text('Click a key to play', p.width / 2, 240);
    }

    // Instructions
    p.fill(150);
    p.textSize(10);
    p.text('Click piano keys to hear tones', p.width / 2, p.height - 10);
  };

  p.mousePressed = () => {
    const keyStartX = 30;
    const keyY = 80;
    const whiteKeyWidth = 30;
    const whiteKeyHeight = 120;
    const blackKeyWidth = 20;
    const blackKeyHeight = 75;

    // Check black keys first (they're on top)
    let whiteKeyIndex = 0;
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].white) {
        whiteKeyIndex++;
      } else {
        const x = keyStartX + (whiteKeyIndex - 1) * whiteKeyWidth + whiteKeyWidth - blackKeyWidth / 2;
        if (
          p.mouseX >= x && p.mouseX <= x + blackKeyWidth &&
          p.mouseY >= keyY && p.mouseY <= keyY + blackKeyHeight
        ) {
          activeNote = i;
          return;
        }
      }
    }

    // Check white keys
    whiteKeyIndex = 0;
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].white) {
        const x = keyStartX + whiteKeyIndex * whiteKeyWidth;
        if (
          p.mouseX >= x && p.mouseX <= x + whiteKeyWidth - 2 &&
          p.mouseY >= keyY && p.mouseY <= keyY + whiteKeyHeight
        ) {
          activeNote = i;
          return;
        }
        whiteKeyIndex++;
      }
    }
  };

  p.mouseReleased = () => {
    activeNote = null;
  };
};
