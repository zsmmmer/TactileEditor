let corefun = document.querySelectorAll(".toolbar li");
let isFunClick = [0, 0, 0];
let toolbar = document.querySelector(".main .toolbar");
let dynamicbar = document.querySelector(".toolbar .dynamicbar");
let funpanel = document.querySelectorAll(".toolbar .dynamicbar .funPanel");
let funName = ["shape", "sensor", "connector"];
let isFunPanel = 0;
let minibar = document.querySelector(".main .toolbar .minibar");
let toolPanel = document.querySelectorAll(".toolbar .minibar .toolPanel");
let isMiniBar = 0;
let isToolPanel = [0, 0, 0, 0, 0];

for (let i = 0; i < 3; i++) {
  corefun[i].addEventListener("click", () => {
    isFunClick = [0, 0, 0];
    isMiniFunClick = [0, 0, 0];
    isFunClick[i] = 1;
    isFunPanel = 1;
    isMiniBar = 1;
    isToolPanel = [0, 0, 0, 0, 0];
    isToolPanel[i] = 1;

    changeCorefunImg();
    changeMinifunImg();
    presentFunPanel();
    changeMiniBar();
  });
}

let minifun = corefun[3].querySelectorAll("img");
let isMiniFunClick = [0, 0, 0];

for (let i = 0; i < 3; i++) {
  minifun[i].addEventListener("click", () => {
    isMiniFunClick = [0, 0, 0];
    isFunPanel = 0;
    isMiniFunClick[i] = 1;
    isFunClick = [0, 0, 0];
    if (i < 1) {
      isMiniBar = 1;
      isToolPanel = [0, 0, 0, 0, 0];
      isToolPanel[i + 3] = 1;
    } else {
      isMiniBar = 0;
      isToolPanel = [0, 0, 0, 0, 0];
    }
    changeMinifunImg();
    changeCorefunImg();
    presentFunPanel();
    changeMiniBar();
  });
}

function changeCorefunImg() {
  for (let j = 0; j < 3; j++) {
    let imgElement = corefun[j].querySelector("img");
    if (imgElement) {
      if (isFunClick[j]) {
        imgElement.src = "assets/toolbar/" + funName[j] + "1" + ".png";
        corefun[j].style.background = "#3D3F44";
      } else {
        imgElement.src = "assets/toolbar/" + funName[j] + ".png";
        corefun[j].style.background = "#28292C";
      }
    }
  }
}

function changeMinifunImg() {
  for (let j = 0; j < 3; j++) {
    let imgElement = minifun[j];
    if (imgElement) {
      if (isMiniFunClick[j]) {
        imgElement.style.opacity = "1";
      } else {
        imgElement.style.opacity = "0.6";
      }
    }
  }
}

function presentFunPanel() {
  if (isFunPanel) {
    dynamicbar.style.display = "flex";
    toolbar.style.width = "331px";
    for (let j = 0; j < 3; j++) {
      let panelElement = funpanel[j];
      if (panelElement) {
        if (isFunClick[j]) {
          panelElement.style.display = "flex";
        } else {
          panelElement.style.display = "none";
        }
      }
    }
  } else {
    dynamicbar.style.display = "none";
    toolbar.style.width = "75px";
  }
}

function closeFunPanel() {
  isFunPanel = 0;
  changeMinifunImg();
  changeCorefunImg();
  presentFunPanel();
}

function changeMiniBar() {
  if (isMiniBar) {
    minibar.style.display = "flex";
    for (j = 0; j < 5; j++) {
      let toolPanelElement = toolPanel[j];
      if (toolPanelElement) {
        if (isToolPanel[j]) {
          toolPanelElement.style.display = "flex";
        } else {
          toolPanelElement.style.display = "none";
        }
      }
    }
  } else {
    minibar.style.display = "none";
  }
}

/***parameters相关 */
let sliderBlocks = document.querySelectorAll(
  ".funPanel .paraArea .parameter .sliderblock"
);
for (let i = 0; i < sliderBlocks.length; i++) {
  let sliderBlock = sliderBlocks[i];
  let inputPara = sliderBlock.querySelector(".parabox .inputPara");
  let rangebar = sliderBlock.querySelector("input");
  rangebar.addEventListener("input", () => {
    let value = rangebar.value;
    inputPara.innerHTML = value;
  });
}
