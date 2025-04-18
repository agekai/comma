let dotCommaLines = [
  " 	點點點",
  " 點點點點點",
  " 點點點點點",
  "    點點點逗",
  "            逗",
  "          逗",
  "        逗"
];

// 跳舞的「點」位置：[row, col]
let dancingDots = [
  [0, 2],[0, 4],[2, 1],[2, 5],[3, 4],[3, 5],[3, 6],	
];

function setup() {
  createCanvas(600, 600);
  noFill();
  textAlign(CENTER, CENTER);
  textFont("Noto Serif TC");
}

function draw() {
  background(0, 40);

  drawDotArt();

  push();
  translate(100, height * 0.75);
  drawAxesText();
  drawFireText();
  pop();
}

function drawAxesText() {
  let flicker = map(sin(frameCount * 0.05), -1, 1, 80, 200);
  let glowColor = color(0, 255, 255, flicker);

  textSize(14);
  fill(glowColor);
  noStroke();

  let exclusionRadius = 50;

  for (let i = -width; i < width; i += 20) {
    if (dist(i, 0, 0, 0) > exclusionRadius - 20 && i !== 0) {
      text("線", i, 0);
    }
  }

  for (let j = -height; j < height; j += 20) {
    if (dist(0, j, 0, 0) > exclusionRadius && j !== 0 && j !== -20) {
      text("線", 0, j);
    }
  }
}

function drawFireText() {
  let flicker = map(sin(frameCount * 0.03), -1, 1, 100, 255);
  fill(255, 100 + random(20), 0, flicker);
  noStroke();

  let layers = [
    { count: 2, y: 45, size: 16 },
    { count: 3, y: 30, size: 18 },
    { count: 4, y: 15, size: 22 },
    { count: 3, y: 0, size: 24 },
    { count: 2, y: -15, size: 26 },
    { count: 1, y: -35, size: 28 },
  ];

  for (let layer of layers) {
    let spacing = 18;
    let offsetX = -(layer.count - 1) * spacing / 2;
    let windEffect = sin(frameCount * 0.1 + layer.y * 0.1) * 3;

    textSize(layer.size);
    for (let i = 0; i < layer.count; i++) {
      let wobble = sin(frameCount * 0.1 + i) * 1.5 + windEffect;
      text("火", offsetX + i * spacing + wobble, layer.y);
    }
  }
}

function drawDotArt() {
  let startX = width * 0.45;
  let startY = height * 0.15;
  let lineHeight = 40;

  textSize(32);
  textAlign(LEFT, TOP);
  noStroke();

  for (let i = 0; i < dotCommaLines.length; i++) {
    let y = startY + i * lineHeight;
    let x = startX;

    for (let j = 0; j < dotCommaLines[i].length; j++) {
      let char = dotCommaLines[i][j];

      let isDancing = dancingDots.some(([row, col]) => row === i && col === j);

      if (char === "點") {
        if (isDancing) {
          // 閃爍 & 跳舞 & 彩色
          let flicker = map(sin(frameCount * 0.2 + i + j), -1, 1, 150, 255);
          fill(color(random(150,255), random(100,255), 0, flicker));
          let bounce = sin(frameCount * 0.3 + i + j) * 1;
          text(char, x, y + bounce);
        } else {
          fill(255);
          text(char, x, y);
        }
      } else if (char === "逗") {
        fill(255);
        let dx = random(-1.5, 1.5);
        let dy = random(-1.5, 1.5);
        text(char, x + dx, y + dy);
      }

      if (char !== "\t") {
        x += textWidth(char);
      } else {
        x += textWidth("　");
      }
    }
  }
}
