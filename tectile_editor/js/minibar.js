let minibarTool = document.querySelectorAll(".minibar .toolPanel .tool");
for (i = 0; i < minibarTool.length; i++) {
  let element = minibarTool[i];
  element.addEventListener("click", () => {
    for (j = 0; j < minibarTool.length; j++) {
      minibarTool[j].setAttribute("is-selected", "false");
    }
    element.setAttribute("is-selected", "true");
    selectTool();
  });
}

function selectTool() {
  for (i = 0; i < minibarTool.length; i++) {
    let element = minibarTool[i];
    let isSelected = element.getAttribute("is-selected");
    if (isSelected == "true") {
      element.style.background =
        "linear-gradient(90deg, rgba(12, 235, 235, 0.80) 0%, rgba(32, 227, 178, 0.80) 49.5%, rgba(41, 255, 198, 0.80) 100%)";
      element.style.boxShadow =
        "inset 0px 0px 10px 0px rgba(15, 163, 155, 0.60)";
    } else {
      element.style.background = "transparent";
      element.style.boxShadow = "none";
    }
  }
}

/****XY切换按钮和颜色改变功能*******/
let lineColor = ["#0CEBEB", "#29FFC6"];
let ConnectorColor = ["#0CEBEB", "#29FFC6"];
let colors = ["#0CEBEB", "#29FFC6", "#f4d35e", "#ffa69e", "#8980f5", "#000"];

let colorPanel = document.querySelector(".minibar .colorPanel");
let colorButtons = document.querySelectorAll(".minibar .toolPanel .color");
let colorBoxes = document.querySelectorAll(".minibar .colorPanel .colorbox");

for (i = 0; i < colorButtons.length; i++) {
  let colorButton = colorButtons[i];
  let isPanelOpen = colorButton.getAttribute("is-colorPanel");
  colorButton.addEventListener("click", () => {
    if (isPanelOpen == "false") {
      colorPanel.style.display = "flex";
      colorButton.setAttribute("is-colorPanel", "true");
    }
  });
}

for (let j = 0; j < colorBoxes.length; j++) {
  let colorbox = colorBoxes[j];
  let color = colors[j];
  colorbox.addEventListener("click", () => {
    for (i = 0; i < colorButtons.length; i++) {
      let colorButton = colorButtons[i];
      let isPanelOpen = colorButton.getAttribute("is-colorPanel");
      if (isPanelOpen == "true") {
        colorButton.style.background = color;
        colorPanel.style.display = "none";
        colorButton.setAttribute("is-colorPanel", "false");
        if (i > 0 && i < 3) {
          let tx = document.querySelectorAll(".minibar .toolPanel .switch .tx")[
            i - 1
          ];

          let ty = document.querySelectorAll(".minibar .toolPanel .switch .ty")[
            i - 1
          ];
          let slider = document.querySelectorAll(
            ".minibar .toolPanel .switch .slider"
          )[i - 1];

          if (tx.getAttribute("is-xy") == "ture") {
            slider.style.background = color;
            tx.setAttribute("color", color);
          } else {
            slider.style.background = color;
            ty.setAttribute("color", color);
          }
        }
      }
    }
  });
}

let switchButtons = document.querySelectorAll(".minibar .toolPanel .switch");
for (i = 0; i < switchButtons.length; i++) {
  let switchButton = switchButtons[i];
  let switchChecker = switchButton.querySelector("input");
  let tx = switchButton.querySelector(".tx");
  let ty = switchButton.querySelector(".ty");
  let slider = switchButton.querySelector(".slider");
  let colorButton = colorButtons[i + 1];
  switchChecker.addEventListener("change", () => {
    if (switchChecker.checked) {
      let color = ty.getAttribute("color");
      console.log(color);
      slider.style.background = color;
      colorButton.style.background = color;
      ty.setAttribute("is-xy", "ture");
      tx.setAttribute("is-xy", "false");
    } else {
      let color = tx.getAttribute("color");
      slider.style.background = color;
      colorButton.style.background = color;
      tx.setAttribute("is-xy", "ture");
      ty.setAttribute("is-xy", "false");
    }
  });
}
