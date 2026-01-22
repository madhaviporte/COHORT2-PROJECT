/* ---------- SELECTORS ---------- */
const canvas = document.querySelector("#canvas");
const layersList = document.querySelector("#layersList");

const widthInput  = document.querySelector("#widthInput");
const heightInput = document.querySelector("#heightInput");
const bgInput     = document.querySelector("#bgInput");
const textInput   = document.querySelector("#textInput");
const rotateInput = document.querySelector("#rotateInput");

const addRectBtn = document.querySelector("#addRect");
const addTextBtn = document.querySelector("#addText");

const undoBtn = document.querySelector("#undoBtn");
const redoBtn = document.querySelector("#redoBtn");


/* ---------- VARIABLES ---------- */
let elements = [];
let selected = [];
let history = [];
let redoStack = [];
let id = 0;

/* ---------- BUTTON FEEDBACK ---------- */
function press(btn) {
  btn.classList.add("active");
  setTimeout(() => btn.classList.remove("active"), 150);
}

/* ---------- HISTORY ---------- */
function saveState() {
  history.push(canvas.innerHTML);
  if (history.length > 50) history.shift();
  redoStack = [];
}

/* ---------- CREATE ---------- */
function create(type) {
  saveState();

  const el = document.createElement("div");
  el.className = "element";
  el.style.left = "50px";
  el.style.top = "50px";
  el.style.width = "120px";
  el.style.height = "60px";
  el.style.background = type === "text" ? "#000" : "darkblue";
  el.style.transform = "rotate(0deg)";

  el.dataset.id = ++id;
  el.dataset.rotate = 0;

  if (type === "text") {
    el.classList.add("text");
    el.contentEditable = true;
    el.innerText = "Text";
  }

  canvas.appendChild(el);
  elements.push(el);

  addEvents(el);
  refreshLayers();
}

// -------------------Export------------------

document.querySelector("#exportJSON").onclick = () => {
  download(
    new Blob([localStorage.getItem("figmaData")], { type: "application/json" }),
    "design.json"
  );
};

document.querySelector("#exportHTML").onclick = () => {
  let html = `<div style="position:relative;width:800px;height:600px;">`;

  elements.forEach(el => {
    html += `<div style="
      position:absolute;
      left:${el.style.left};
      top:${el.style.top};
      width:${el.style.width};
      height:${el.style.height};
      background:${el.style.background};
    ">${el.innerText}</div>`;
  });

  html += `</div>`;

  download(new Blob([html], { type: "text/html" }), "design.html");
};

function download(blob, name) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
}

/* ---------- EVENTS ---------- */
function addEvents(el) {
  el.addEventListener("mousedown", e => {
    if (!e.shiftKey) deselectAll();
    select(el);
    e.stopPropagation();
  });

  enableDrag(el);
  addResize(el);
}

canvas.addEventListener("mousedown", deselectAll);

/* ---------- SELECT ---------- */
function select(el) {
  if (!selected.includes(el)) {
    selected.push(el);
    el.classList.add("selected");
  }
  updatePanel();
}

function deselectAll() {
  selected.forEach(el => el.classList.remove("selected"));
  selected = [];
}

/* ---------- DRAG ---------- */
function enableDrag(el) {
  let ox, oy, drag = false;

  el.addEventListener("mousedown", e => {
    ox = e.offsetX;
    oy = e.offsetY;
    drag = true;
  });

  document.addEventListener("mousemove", e => {
    if (!drag || !selected.includes(el)) return;

    selected.forEach(s => {
      let x = e.clientX - canvas.offsetLeft - ox;
      let y = e.clientY - canvas.offsetTop - oy;

      s.style.left = Math.round(x / 10) * 10 + "px";
      s.style.top  = Math.round(y / 10) * 10 + "px";
    });
  });

  document.addEventListener("mouseup", () => drag = false);
}

/* ---------- RESIZE ---------- */
function addResize(el) {
  const handle = document.createElement("div");
  handle.className = "handle br";
  el.appendChild(handle);

  handle.addEventListener("mousedown", e => {
    e.stopPropagation();
    saveState();

    const sw = el.offsetWidth;
    const sh = el.offsetHeight;
    const sx = e.clientX;
    const sy = e.clientY;

    function resize(ev) {
      let w = sw + (ev.clientX - sx);
      let h = sh + (ev.clientY - sy);

      el.style.width  = Math.max(30, w) + "px";
      el.style.height = Math.max(30, h) + "px";
      updatePanel();
    }

    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", resize);
    }, { once: true });
  });
}

/* ---------- PROPERTIES ---------- */
function updatePanel() {
  if (selected.length !== 1) return;
  const el = selected[0];

  widthInput.value  = el.offsetWidth;
  heightInput.value = el.offsetHeight;
  textInput.value   = el.innerText || "";
  rotateInput.value = el.dataset.rotate;
}

widthInput.oninput = () => {
  if (selected.length) selected[0].style.width = widthInput.value + "px";
};

heightInput.oninput = () => {
  if (selected.length) selected[0].style.height = heightInput.value + "px";
};

bgInput.oninput = () => {
  if (selected.length) selected[0].style.background = bgInput.value;
};

textInput.oninput = () => {
  if (selected.length) selected[0].innerText = textInput.value;
};

rotateInput.oninput = () => {
  if (!selected.length) return;
  selected[0].dataset.rotate = rotateInput.value;
  selected[0].style.transform = `rotate(${rotateInput.value}deg)`;
};

/* ---------- LAYERS ---------- */
function refreshLayers() {
  layersList.innerHTML = "";
  elements.forEach(el => {
    const li = document.createElement("li");
    li.innerText = "Layer " + el.dataset.id;
    li.onclick = () => {
      deselectAll();
      select(el);
    };
    layersList.appendChild(li);
  });
}

//  UNDO / REDO 

 //undo ak kam
function undoAction() {
  if (history.length === 0) return;

  redoStack.push(canvas.innerHTML);
  canvas.innerHTML = history.pop();
}

// redo ka  kaam
function redoAction() {
  if (redoStack.length === 0) return;

  history.push(canvas.innerHTML);
  canvas.innerHTML = redoStack.pop();
}

// ---------- BUTTONS ---------- 
addRectBtn.addEventListener("click", () => {
  press(addRectBtn);
  create("rect");
});

addTextBtn.addEventListener("click", () => {
  press(addTextBtn);
  create("text");
});

document.querySelector("#undoBtn").onclick = () => {
  undoAction();
};

document.querySelector("#redoBtn").onclick = () => {
  redoAction();
};

