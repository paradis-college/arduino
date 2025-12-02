/**
 * P1-C1-L2 GIF4: Live Truth Table
 * "Live truth table highlighting based on button states."
 */
import type p5 from 'p5';

export const truthTableSketch = (p: p5): void => {
  let inputA = false;
  let inputB = false;
  let gateType: 'AND' | 'OR' | 'XOR' | 'NAND' = 'AND';
  
  p.setup = () => {
    p.createCanvas(400, 300);
    p.textAlign(p.CENTER, p.CENTER);
  };
  
  p.draw = () => {
    p.background(30, 30, 40);
    
    // Calculate output based on gate type
    let output: boolean;
    switch (gateType) {
      case 'AND':
        output = inputA && inputB;
        break;
      case 'OR':
        output = inputA || inputB;
        break;
      case 'XOR':
        output = inputA !== inputB;
        break;
      case 'NAND':
        output = !(inputA && inputB);
        break;
    }
    
    // Title
    p.fill(200);
    p.textSize(16);
    p.text(`${gateType} Gate Truth Table`, p.width/2, 25);
    
    // Gate type buttons
    const gates: ('AND' | 'OR' | 'XOR' | 'NAND')[] = ['AND', 'OR', 'XOR', 'NAND'];
    gates.forEach((gate, i) => {
      const bx = 60 + i * 80;
      const by = 50;
      const isSelected = gate === gateType;
      
      p.fill(isSelected ? p.color(0, 100, 200) : 60);
      p.stroke(isSelected ? p.color(0, 150, 255) : 100);
      p.strokeWeight(isSelected ? 2 : 1);
      p.rect(bx - 30, by - 12, 60, 24, 5);
      
      p.fill(isSelected ? 255 : 150);
      p.noStroke();
      p.textSize(11);
      p.text(gate, bx, by);
    });
    
    // Input buttons
    p.textSize(12);
    
    // Input A
    p.fill(inputA ? p.color(100, 255, 100) : p.color(80, 80, 80));
    p.stroke(inputA ? p.color(150, 255, 150) : p.color(100));
    p.strokeWeight(2);
    p.rect(40, 100, 80, 40, 8);
    p.fill(inputA ? 0 : 200);
    p.noStroke();
    p.text(`Input A: ${inputA ? '1' : '0'}`, 80, 120);
    
    // Input B
    p.fill(inputB ? p.color(100, 255, 100) : p.color(80, 80, 80));
    p.stroke(inputB ? p.color(150, 255, 150) : p.color(100));
    p.strokeWeight(2);
    p.rect(40, 150, 80, 40, 8);
    p.fill(inputB ? 0 : 200);
    p.noStroke();
    p.text(`Input B: ${inputB ? '1' : '0'}`, 80, 170);
    
    // Output indicator
    p.fill(output ? p.color(255, 200, 0) : p.color(60));
    p.stroke(output ? p.color(255, 230, 100) : p.color(100));
    p.strokeWeight(2);
    p.rect(40, 210, 80, 50, 8);
    p.fill(output ? 0 : 150);
    p.noStroke();
    p.textSize(11);
    p.text('Output', 80, 225);
    p.textSize(20);
    p.text(output ? '1' : '0', 80, 245);
    
    // Logic gate symbol
    drawGateSymbol(p, 180, 150, gateType, inputA, inputB, output);
    
    // Truth table
    const tableX = 270;
    const tableY = 90;
    const cellW = 35;
    const cellH = 25;
    
    // Table header
    p.fill(70);
    p.noStroke();
    p.rect(tableX, tableY, cellW * 3, cellH);
    
    p.fill(200);
    p.textSize(11);
    p.text('A', tableX + cellW/2, tableY + cellH/2);
    p.text('B', tableX + cellW + cellW/2, tableY + cellH/2);
    p.text('Out', tableX + cellW * 2 + cellW/2, tableY + cellH/2);
    
    // Table rows
    const truthTable = [
      {a: false, b: false},
      {a: true, b: false},
      {a: false, b: true},
      {a: true, b: true}
    ];
    
    truthTable.forEach((row, i) => {
      const ry = tableY + cellH * (i + 1);
      const rowOutput = calculateOutput(gateType, row.a, row.b);
      const isCurrentRow = row.a === inputA && row.b === inputB;
      
      // Row background
      if (isCurrentRow) {
        p.fill(0, 100, 200, 100);
      } else {
        p.fill(i % 2 === 0 ? 50 : 40);
      }
      p.noStroke();
      p.rect(tableX, ry, cellW * 3, cellH);
      
      // Row border if active
      if (isCurrentRow) {
        p.noFill();
        p.stroke(0, 200, 255);
        p.strokeWeight(2);
        p.rect(tableX, ry, cellW * 3, cellH);
      }
      
      // Cell values
      p.fill(isCurrentRow ? 255 : 150);
      p.noStroke();
      p.text(row.a ? '1' : '0', tableX + cellW/2, ry + cellH/2);
      p.text(row.b ? '1' : '0', tableX + cellW + cellW/2, ry + cellH/2);
      
      p.fill(rowOutput ? (isCurrentRow ? p.color(255, 255, 0) : p.color(100, 255, 100)) : (isCurrentRow ? 255 : 150));
      p.text(rowOutput ? '1' : '0', tableX + cellW * 2 + cellW/2, ry + cellH/2);
    });
    
    // Table border
    p.noFill();
    p.stroke(100);
    p.strokeWeight(1);
    p.rect(tableX, tableY, cellW * 3, cellH * 5);
    
    // Instructions
    p.fill(100);
    p.textSize(10);
    p.text('Click inputs to toggle • Click gate names to switch', p.width/2, p.height - 10);
  };
  
  function calculateOutput(gate: string, a: boolean, b: boolean): boolean {
    switch (gate) {
      case 'AND': return a && b;
      case 'OR': return a || b;
      case 'XOR': return a !== b;
      case 'NAND': return !(a && b);
      default: return false;
    }
  }
  
  function drawGateSymbol(p: p5, x: number, y: number, gate: string, a: boolean, b: boolean, out: boolean) {
    // Input lines
    p.stroke(a ? p.color(100, 255, 100) : 100);
    p.strokeWeight(2);
    p.line(x - 40, y - 15, x - 20, y - 15);
    
    p.stroke(b ? p.color(100, 255, 100) : 100);
    p.line(x - 40, y + 15, x - 20, y + 15);
    
    // Gate shape
    p.stroke(150);
    p.strokeWeight(2);
    p.fill(60);
    
    if (gate === 'AND' || gate === 'NAND') {
      // AND shape
      p.beginShape();
      p.vertex(x - 20, y - 25);
      p.vertex(x - 20, y + 25);
      p.vertex(x + 5, y + 25);
      p.bezierVertex(x + 30, y + 25, x + 30, y - 25, x + 5, y - 25);
      p.endShape(p.CLOSE);
    } else {
      // OR/XOR shape
      p.beginShape();
      p.vertex(x - 20, y - 25);
      p.bezierVertex(x - 5, y - 25, x + 20, y - 15, x + 30, y);
      p.bezierVertex(x + 20, y + 15, x - 5, y + 25, x - 20, y + 25);
      p.bezierVertex(x - 10, y, x - 10, y, x - 20, y - 25);
      p.endShape(p.CLOSE);
      
      if (gate === 'XOR') {
        // Extra curve for XOR
        p.noFill();
        p.beginShape();
        p.vertex(x - 28, y - 25);
        p.bezierVertex(x - 18, y, x - 18, y, x - 28, y + 25);
        p.endShape();
      }
    }
    
    // NAND bubble
    if (gate === 'NAND') {
      p.fill(60);
      p.stroke(150);
      p.ellipse(x + 35, y, 10, 10);
    }
    
    // Output line
    p.stroke(out ? p.color(255, 200, 0) : 100);
    p.strokeWeight(2);
    const outX = gate === 'NAND' ? x + 40 : x + 30;
    p.line(outX, y, outX + 30, y);
    
    // Output indicator
    p.fill(out ? p.color(255, 200, 0) : 60);
    p.noStroke();
    p.ellipse(outX + 35, y, 12, 12);
  }
  
  p.mousePressed = () => {
    // Check gate type buttons
    const gates: ('AND' | 'OR' | 'XOR' | 'NAND')[] = ['AND', 'OR', 'XOR', 'NAND'];
    gates.forEach((gate, i) => {
      const bx = 60 + i * 80;
      const by = 50;
      if (p.mouseX > bx - 30 && p.mouseX < bx + 30 && p.mouseY > by - 12 && p.mouseY < by + 12) {
        gateType = gate;
      }
    });
    
    // Check input A
    if (p.mouseX > 40 && p.mouseX < 120 && p.mouseY > 100 && p.mouseY < 140) {
      inputA = !inputA;
    }
    
    // Check input B
    if (p.mouseX > 40 && p.mouseX < 120 && p.mouseY > 150 && p.mouseY < 190) {
      inputB = !inputB;
    }
  };
};
