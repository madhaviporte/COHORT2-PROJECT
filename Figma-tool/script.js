// main canvas
var canvas = document.getElementById("canvas");

// inputs
var widthInput = document.getElementById("widthInput");
var heightInput = document.getElementById("heightInput");
var bgInput = document.getElementById("bgInput");
var textInput = document.getElementById("textInput");

// data
var elements = [];
var selected = null;
var id = 0;

/* ---------------- ADD ELEMENT ---------------- */

document.getElementById("addRect").onclick = function () {
  create("rect");
};

document.getElementById("addText").onclick = function () {
  create("text");
};

function create(type) {
  var el = document.createElement("div");
  el.className = "element";

  el.style.width = "100px";
  el.style.height = "60px";
  el.style.left = "40px";
  el.style.top = "40px";
  el.style.position = "absolute";

  if (type === "rect") {
    el.style.background = "skyblue";
  }

  if (type === "text") {
    el.contentEditable = true;
    el.innerText = "Text";
    el.style.color = "white";
  }

  el.setAttribute("data-type", type);
  el.setAttribute("data-id", ++id);

  canvas.appendChild(el);
  elements.push(el);

  select(el);
  drag(el);
  save();
}

/* ---------------- SELECT ---------------- */

function select(el) {
  if (selected) {
    selected.classList.remove("selected");
  }

  selected = el;
  el.classList.add("selected");

  widthInput.value = el.offsetWidth;
  heightInput.value = el.offsetHeight;
  bgInput.value = toHex(el.style.backgroundColor);
  textInput.value = el.innerText || "";
}

canvas.onclick = function () {
  if (selected) {
    selected.classList.remove("selected");
    selected = null;
  }
};

/* ---------------- DRAG ---------------- */

function drag(el) {
  var isDown = false;
  var startX = 0;
  var startY = 0;

  el.onmousedown = function (e) {
    isDown = true;
    startX = e.offsetX;
    startY = e.offsetY;
    select(el);
  };

  document.onmousemove = function (e) {
    if (!isDown || selected !== el) return;

    el.style.left = e.clientX - canvas.offsetLeft - startX + "px";
    el.style.top = e.clientY - canvas.offsetTop - startY + "px";
  };

  document.onmouseup = function () {
    if (isDown) save();
    isDown = false;
  };
}

/* ---------------- PROPERTIES ---------------- */

widthInput.oninput = function () {
  if (selected) selected.style.width = this.value + "px";
  save();
};

heightInput.oninput = function () {
  if (selected) selected.style.height = this.value + "px";
  save();
};

bgInput.oninput = function () {
  if (selected) selected.style.background = this.value;
  save();
};

textInput.oninput = function () {
  if (selected && selected.getAttribute("data-type") === "text") {
    selected.innerText = this.value;
  }
  save();
};

/* ---------------- DELETE ---------------- */

document.onkeydown = function (e) {
  if (!selected) return;

  if (e.key === "Delete") {
    selected.remove();

    elements = elements.filter(function (el) {
      return el !== selected;
    });

    selected = null;
    save();
  }
};

/* ---------------- SAVE / LOAD ---------------- */

function save() {
  var data = [];

  elements.forEach(function (el) {
    data.push({
      type: el.getAttribute("data-type"),
      left: el.style.left,
      top: el.style.top,
      width: el.style.width,
      height: el.style.height,
      bg: el.style.background,
      text: el.innerText
    });
  });

  localStorage.setItem("figmaData", JSON.stringify(data));
}

function load() {
  var data = JSON.parse(localStorage.getItem("figmaData") || "[]");

  data.forEach(function (item) {
    create(item.type);

    var el = elements[elements.length - 1];
    el.style.left = item.left;
    el.style.top = item.top;
    el.style.width = item.width;
    el.style.height = item.height;
    el.style.background = item.bg;
    el.innerText = item.text;
  });
}

load();

/* ---------------- EXPORT ---------------- */

document.getElementById("exportJSON").onclick = function () {
  download(
    new Blob([localStorage.getItem("figmaData")]),
    "design.json"
  );
};

document.getElementById("exportHTML").onclick = function () {
  var html = '<div style="position:relative;width:800px;height:600px">';

  elements.forEach(function (el) {
    html +=
      '<div style="position:absolute;left:' +
      el.style.left +
      ";top:" +
      el.style.top +
      ";width:" +
      el.style.width +
      ";height:" +
      el.style.height +
      ";background:" +
      el.style.background +
      ';">' +
      el.innerText +
      "</div>";
  });

  html += "</div>";
  download(new Blob([html]), "design.html");
};

/* ---------------- HELPERS ---------------- */

function download(blob, name) {
  var a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
}

function toHex(rgb) {
  if (!rgb) return "#000000";
  var c = rgb.match(/\d+/g);
  return (
    "#" +
    ((1 << 24) + (c[0] << 16) + (c[1] << 8) + Number(c[2]))
      .toString(16)
      .slice(1)
  );
}
