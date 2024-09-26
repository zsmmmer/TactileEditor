const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
let ws = new WebSocket("ws://localhost:8000/ws/draw/ ");
let isDrawing = false;
let startX, startY;

ws.onopen = () => {
  console.log("WebSocket 连接已打开");
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.rect(data.startX, data.startY, data.width, data.height);
  ctx.stroke();
};

ws.onclose = () => {
  console.log("WebSocket 连接已关闭");
};

canvas.onmousedown = (e) => {
  isDrawing = true;
  startX = e.offsetX;
  startY = e.offsetY;
};

canvas.onmousemove = (e) => {
  if (!isDrawing) return;

  const rectWidth = e.offsetX - startX;
  const rectHeight = e.offsetY - startY;

  const rectData = {
    startX: startX,
    startY: startY,
    width: rectWidth,
    height: rectHeight,
  };

  // 发送消息之前检查连接状态
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(rectData));
  } else {
    console.warn("WebSocket 连接未打开，无法发送消息");
  }
};

canvas.onmouseup = () => {
  isDrawing = false;
};
