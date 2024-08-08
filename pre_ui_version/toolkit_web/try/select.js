const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let lines = [
  { x1: 50, y1: 50, x2: 200, y2: 200 },
  { x1: 100, y1: 300, x2: 300, y2: 100 },
];

let selectedLine = null;
let isDragging = false;
let dragStart = {};

function drawLines() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  lines.forEach((line, index) => {
    ctx.beginPath();
    ctx.moveTo(line.x1, line.y1);
    ctx.lineTo(line.x2, line.y2);
    ctx.strokeStyle = selectedLine === index ? "red" : "black";
    ctx.lineWidth = selectedLine === index ? 2 : 1;
    ctx.stroke();
  });
}

canvas.addEventListener("mousedown", (event) => {
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;
  selectedLine = null;

  lines.forEach((line, index) => {
    if (isNearLine(line, mouseX, mouseY)) {
      selectedLine = index;
    }
  });

  if (selectedLine !== null) {
    isDragging = true;
    dragStart = { x: mouseX, y: mouseY };
  }

  drawLines();
});

canvas.addEventListener("mousemove", (event) => {
  if (isDragging && selectedLine !== null) {
    const dx = event.offsetX - dragStart.x;
    const dy = event.offsetY - dragStart.y;

    const line = lines[selectedLine];
    line.x1 += dx;
    line.y1 += dy;
    line.x2 += dx;
    line.y2 += dy;

    dragStart = { x: event.offsetX, y: event.offsetY };
    drawLines();
  }
});

canvas.addEventListener("mouseup", () => {
  isDragging = false;
});

function isNearLine(line, x, y) {
  const distance = pointLineDistance(line.x1, line.y1, line.x2, line.y2, x, y);
  return distance < 5;
}

function pointLineDistance(x1, y1, x2, y2, px, py) {
  const A = px - x1;
  const B = py - y1;
  const C = x2 - x1;
  const D = y2 - y1;

  const dot = A * C + B * D;
  const len_sq = C * C + D * D;
  const param = dot / len_sq;

  let xx, yy;

  if (param < 0 || (x1 === x2 && y1 === y2)) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  const dx = px - xx;
  const dy = py - yy;
  return Math.sqrt(dx * dx + dy * dy);
}

drawLines();
