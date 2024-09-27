const svgcanvas = document.getElementById("canvas");
const drawRectBtn = document.getElementById("newshape1");
const splitRectBtn = document.getElementById("split-rect-btn");
const exportBtn = document.getElementById("export-btn");

let isDrawing = false;
let stX, stY, rect;

drawRectBtn.addEventListener("click", () => {
  isDrawing = !isDrawing;
  //   drawRectBtn.textContent = isDrawing ? "停止绘制矩形" : "开始绘制矩形";
});

canvas.addEventListener("mousedown", (event) => {
  if (isDrawing) {
    stX = event.offsetX;
    stY = event.offsetY;
    let color = colorButtons[0].style.backgroundColor;
    rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", stX);
    rect.setAttribute("y", stY);
    rect.setAttribute("width", 0);
    rect.setAttribute("height", 0);
    rect.setAttribute("stroke", "black");
    rect.setAttribute("fill", "none");
    document.getElementById("shapeCanvas").appendChild(rect);

    svgcanvas.addEventListener("mousemove", drawRectangle);
    svgcanvas.addEventListener("mouseup", stopDrawing);
  }
});

function drawRectangle(event) {
  const width = event.offsetX - stX;
  const height = event.offsetY - stY;
  rect.setAttribute("width", width);
  rect.setAttribute("height", height);
}

function stopDrawing() {
  svgcanvas.removeEventListener("mousemove", drawRectangle);
  svgcanvas.removeEventListener("mouseup", stopDrawing);
}

splitRectBtn.addEventListener("click", () => {
  const rects = document
    .getElementById("shapeCanvas")
    .getElementsByTagName("rect");
  if (rects.length === 0) return;

  const rect = rects[0];
  const x = parseFloat(rect.getAttribute("x"));
  const y = parseFloat(rect.getAttribute("y"));
  const width = parseFloat(rect.getAttribute("width"));
  const height = parseFloat(rect.getAttribute("height"));

  const lineLayer = document.getElementById("sensorCanvas");
  lineLayer.innerHTML = "";

  for (let i = 1; i < 24; i++) {
    const xLine = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    xLine.setAttribute("x1", x + (width / 24) * i);
    xLine.setAttribute("y1", y);
    xLine.setAttribute("x2", x + (width / 24) * i);
    xLine.setAttribute("y2", y + height);
    xLine.setAttribute("stroke", "#f4d35e");
    lineLayer.appendChild(xLine);

    const yLine = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    yLine.setAttribute("x1", x);
    yLine.setAttribute("y1", y + (height / 24) * i);
    yLine.setAttribute("x2", x + width);
    yLine.setAttribute("y2", y + (height / 24) * i);
    yLine.setAttribute("stroke", "#8980f5");
    lineLayer.appendChild(yLine);
  }
});

exportBtn.addEventListener("click", () => {
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(canvas);
  const blob = new Blob([svgString], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "drawing.svg";
  a.click();
  URL.revokeObjectURL(url);
});
