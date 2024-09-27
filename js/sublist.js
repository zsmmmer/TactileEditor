let childList = document.querySelectorAll(
  ".toolbar .dynamicbar .funPanel .subList ul li"
);

function unfoldList(elm) {
  let listItem = elm;
  let element = elm.querySelector(".main");
  let button = element.querySelector("button");
  let button_info = element.getAttribute("data-expanded");
  let subElement = elm.querySelector(".sub");
  if (button_info == "false") {
    element.setAttribute("data-expanded", "true");
    console.log(element.getAttribute("data-expanded"));
    button.style.backgroundImage = "url('assets/toolbar/unfold.png')";
    subElement.style.display = "flex";
    listItem.style.height = "72px";
  } else {
    element.setAttribute("data-expanded", "false");
    button.style.backgroundImage = "url('assets/toolbar/fold.png')";
    subElement.style.display = "none";
    listItem.style.height = "24px";
  }
}

function changeSelectedBg(elm) {
  let element = elm.querySelector(".main");
  let selected = element.querySelector(".rightpart");
  let selected_info = element.getAttribute("is-selected");
  if (selected_info == "false") {
    element.setAttribute("is-selected", "true");
    selected.style.backgroundImage = "url('assets/toolbar/selecton.png')";
    element.style.background =
      "linear-gradient(90deg, #259597 0%, #2F917C 49.5%, #339F85 100%)";
  } else {
    element.setAttribute("is-selected", "false");
    selected.style.backgroundImage = "url('assets/toolbar/selectoff.png')";
    element.style.background = "transparent";
  }
}

let newbutton = document.querySelectorAll(
  ".toolbar .dynamicbar .funPanel .List .title button"
);
let addLoc = document.querySelectorAll(
  ".toolbar .dynamicbar .funPanel .List .subList"
);
const addCont = ["area", "connector"];

console.log(addLoc);
for (i = 0; i < 2; i++) {
  let element = addLoc[i];
  let loc = element.querySelector("ul");
  let childNum = element.getAttribute("child-num");
  let Cont = addCont[i];
  newbutton[i].addEventListener("click", () => {
    childNum++;
    let addContent = `<li>
                        <div
                          class="main"
                          data-expanded="false"
                          is-selected="false"
                        >
                          <button></button>
                          <div class="leftpart">
                            <p>${childNum}</p>
                            <div class="markColor"></div>
                            <button id="eye"></button>
                          </div>
                          <div class="name">${Cont}${childNum}</div>
                          <div class="rightpart"></div>
                        </div>
                        <div class="sub">
                          <div class="line"></div>
                          <div class="info">
                            <div class="infoxy">
                              <button id="eye"></button>
                              <div class="name">line_x</div>
                            </div>
                            <div class="infoxy">
                              <button id="eye"></button>
                              <div class="name">line_y</div>
                            </div>
                          </div>
                        </div>
                      </li>`;
    element.setAttribute("child-num", childNum);
    loc.insertAdjacentHTML("beforeend", addContent);
    let mainElement = element.querySelectorAll("ul li")[childNum - 1];
    let button = mainElement.querySelector("button");
    let selected = mainElement.querySelector(".main .rightpart");
    button.addEventListener("click", () => unfoldList(mainElement));
    selected.addEventListener("click", () => changeSelectedBg(mainElement));
  });
}
