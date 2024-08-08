function toggleSidebar() {
  var sidebar = document.getElementById("sidebar");
  if (sidebar.style.width === "50px") {
    sidebar.style.width = "200px";
  } else {
    sidebar.style.width = "50px";
  }
}

let isChatOpen = false;

function toggleChat() {
  var chatbox = document.getElementById("chatbox");
  if (isChatOpen) {
    chatbox.style.display = "none";
    isChatOpen = false;
  } else {
    chatbox.style.display = "flex";
    isChatOpen = true;
  }
}

function showInput() {
  var title = document.getElementById("title");
  var input = document.getElementById("title-input");
  input.value = title.textContent; // 将当前标题内容设置为输入框的值
  title.style.display = "none";
  input.style.display = "block";
  input.focus();
}

function hideInput() {
  var input = document.getElementById("title-input");
  var title = document.getElementById("title");
  if (input.value.trim() !== "") {
    title.textContent = input.value;
  }
  input.style.display = "none";
  title.style.display = "block";
}

function switchPage(pageId) {
  console.log("Switching to page:", pageId);
  var contents = document.querySelectorAll(".tool-content");
  contents.forEach(function (content) {
    content.classList.remove("active");
  });
  document.getElementById(pageId).classList.add("active");

  var toolPanel = document.querySelector(".tool-panel");
  console.log(
    "Removing 'collapsed' class and adding 'expanded' class to toolPanel."
  );
  toolPanel.classList.remove("collapsed");
  toolPanel.classList.add("expanded");
  toolPanel.style.display = "flex"; // 确保面板显示
}

function toggleToolPanel() {
  var toolPanel = document.querySelector(".tool-panel");
  toolPanel.classList.toggle("collapsed");
  toolPanel.classList.toggle("expanded");
  console.log("Toggling 'collapsed' and 'expanded' classes.");
}

function handleFileSelect(event) {
  var file = event.target.files[0];
  if (file && file.type === "image/svg+xml") {
    var reader = new FileReader();
    reader.onload = function (e) {
      var svgContent = e.target.result;
      displaySVG(svgContent);
    };
    reader.readAsText(file);
  }
}

function handleDrop(event) {
  event.preventDefault();
  var file = event.dataTransfer.files[0];
  if (file && file.type === "image/svg+xml") {
    var reader = new FileReader();
    reader.onload = function (e) {
      var svgContent = e.target.result;
      displaySVG(svgContent);
    };
    reader.readAsText(file);
  }
}

function handleDragOver(event) {
  event.preventDefault();
}

function displaySVG(svgContent) {
  var canvas = document.getElementById("canvas");
  canvas.innerHTML = svgContent;
}
