export function generateAsciiArt(): string {
  const patterns = [
    createFlowerPattern(),
    createGeometricPattern(),
    createWavePattern(),
  ];
  
  // Pick a random pattern each time
  const pattern = patterns[Math.floor(Math.random() * patterns.length)];
  return pattern;
}

function createFlowerPattern(): string {
  const width = 60;
  const height = 50;
  const chars = ['/', '*', '-', '+', '|', '\\', '.', '~'];
  const lines: string[] = [];

  for (let y = 0; y < height; y++) {
    let line = '';
    for (let x = 0; x < width; x++) {
      // Create a diamond/floral pattern
      const cx = width / 2;
      const cy = height / 2;
      const dx = Math.abs(x - cx);
      const dy = Math.abs(y - cy);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(y - cy, x - cx);
      
      // Create petal shapes
      const petalFreq = 6;
      const petalRadius = 15 + 8 * Math.cos(angle * petalFreq);
      
      if (dist < petalRadius && dist > petalRadius - 3) {
        line += chars[Math.floor(dist) % chars.length];
      } else if (dist < 4) {
        line += '*';
      } else if (Math.abs(dist - petalRadius + 6) < 1.5) {
        line += '.';
      } else {
        line += ' ';
      }
    }
    lines.push(line);
  }
  return lines.join('\n');
}

function createGeometricPattern(): string {
  const width = 65;
  const height = 55;
  const lines: string[] = [];

  for (let y = 0; y < height; y++) {
    let line = '';
    for (let x = 0; x < width; x++) {
      // Concentric diamonds with slashes
      const cx = width / 2;
      const cy = height / 2;
      const d = Math.abs(x - cx) + Math.abs(y - cy);
      
      if (d % 8 === 0) {
        if (x < cx && y < cy) line += '/';
        else if (x > cx && y < cy) line += '\\';
        else if (x < cx && y > cy) line += '\\';
        else line += '/';
      } else if (d % 8 === 4) {
        line += '+';
      } else if (d % 4 === 2) {
        line += '-';
      } else {
        line += ' ';
      }
    }
    lines.push(line);
  }
  return lines.join('\n');
}

function createWavePattern(): string {
  const width = 60;
  const height = 50;
  const lines: string[] = [];

  for (let y = 0; y < height; y++) {
    let line = '';
    for (let x = 0; x < width; x++) {
      const wave1 = Math.sin(x * 0.15 + y * 0.1) * 3;
      const wave2 = Math.cos(x * 0.1 - y * 0.15) * 2;
      const combined = wave1 + wave2;
      
      if (combined > 3.5) line += '/';
      else if (combined > 2.5) line += '*';
      else if (combined > 1.5) line += '+';
      else if (combined > 0.5) line += '-';
      else if (combined > -0.5) line += ' ';
      else if (combined > -1.5) line += '.';
      else if (combined > -2.5) line += '-';
      else if (combined > -3.5) line += '+';
      else line += '\\';
    }
    lines.push(line);
  }
  return lines.join('\n');
}
