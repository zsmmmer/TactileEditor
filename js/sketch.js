const sketch = document.getElementsByClassName("sketch")[0];
const canvas = sketch.getElementsByClassName("canvas")[0];

sketch.addEventListener("mousemove", showCoords);

function showCoords(evt) {
  let locationinfo = document.getElementById("locationinfo");
  let x = evt.clientX - evt.target.offsetLeft;
  let y = evt.clientY - evt.target.offsetTop;
  locationinfo.innerText = "( " + x + " , " + y + " )";
}

let isDragging = false;
let isCanvas = true;
let startX, startY;

sketch.addEventListener("mousedown", (e) => {
  isDragging = true;
  // 记录鼠标按下时的初始位置
  startX = e.clientX - canvas.offsetLeft;
  startY = e.clientY - canvas.offsetTop;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging && isCanvas) {
    // 计算新的位置
    let x = e.clientX - startX;
    let y = e.clientY - startY;
    canvas.style.top = y + "px";
    canvas.style.left = x + "px";
    sketch.style.cursor = "grab";
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false; // 当鼠标松开时停止拖动
  isCanvas = true;
  sketch.style.cursor = "default";
});

canvas.addEventListener("mousedown", () => {
  isCanvas = false; // 当鼠标松开时停止拖动
});

isLayerOn = [1, 1, 1];
let layerButton = document.querySelectorAll(
  ".rightpanel .sketch .layer button"
);
let layers = document.querySelectorAll(".rightpanel .sketch .canvas g");

for (let i = 0; i < 3; i++) {
  layerButton[i].addEventListener("click", () => {
    if (isLayerOn[i]) {
      isLayerOn[i] = 0;
    } else {
      isLayerOn[i] = 1;
    }
    presentLayer();
  });
}

function presentLayer() {
  for (let i = 0; i < 3; i++) {
    if (isLayerOn[i]) {
      layers[i].style.display = "block";
      layerButton[i].style.backgroundImage =
        "url('assets/rightpanel/layeron.png')";
      layerButton[i].style.color = "#19e7c8";
    } else {
      layers[i].style.display = "none";
      layerButton[i].style.backgroundImage =
        "url('assets/rightpanel/layeroff.png')";
      layerButton[i].style.color = "#D9D9D9";
    }
  }
}

/********打开关闭chatbot********/
let chatPanel = document.querySelector(
  ".rightpanel .sketch .chatbot .chatPanel"
);
function presentChatbot() {
  if (chatPanel.style.display == "flex") {
    chatPanel.style.display = "none";
  } else {
    chatPanel.style.display = "flex";
  }
}
