let range = (v, min, max) => v > min ? (v < max ? v : max) : min
let min = (a, b) => a < b ? a : b;
let max = (a, b) => a > b ? a : b;
let inc = v => v + 1 > 23 ? 0 : v + 1;
let dec = v => v - 1 < 0 ? 23 : v - 1;
Element.prototype.getBoundx = function () {return this.getBoundingClientRect().x ? this.getBoundingClientRect().x : this.getBoundingClientRect().left}
Element.prototype.getBoundy = function () {return this.getBoundingClientRect().y ? this.getBoundingClientRect().y : this.getBoundingClientRect().top}
let getCookie = name => (document.cookie.split("; ").filter(str => str.startsWith(name))[0] || "=").split("=")[1]
let getCookies = start => (document.cookie.split("; ").filter(str => str.startsWith(start)))
let setCookie = (name, value) => {document.cookie = name + "=" + value}

function Notification(type, message, timeout, html) {
  var el = document.createElement("div");
  el.className = "notification " + type;
  console.log(timeout, html, (typeof timeout == "string" ? timeout : (typeof html == "string" ? html : "")))
  el.innerHTML = "<div></div>" + (typeof timeout == "string" ? timeout : typeof html == "string" ? html : "") + "<div class='buttons'><div class='dismiss'>Dismiss</div></div>";
  el.children[0].innerText = message;
  el.querySelectorAll(".dismiss").forEach(dismiss => {
      dismiss.onmouseup = () => {
        setTimeout(() => {el.parentElement.removeChild(el)}, 300);
        el.classList.remove("visible")
      }
  })
  if (timeout !== 0) {
    setTimeout(() => {
      if (el.children) {el.children[1].children[0].click()}
    }, timeout instanceof Number ? timeout : 5000);
  }
  document.getElementById("notifications").appendChild(el);
  el.classList.add("visible");
  return el;
}

function Alert(message, timeout, html) {
  return new Notification("alert", message, timeout, html);
}

let Drag = {
  mouseOffset: {},
  init() {
    getCookies("pos").forEach(c => {
      document.getElementById(c.split("=")[0].substr(3)).style.left = c.split("=")[1].split(",")[0];
      document.getElementById(c.split("=")[0].substr(3)).style.top = c.split("=")[1].split(",")[1];
    })
    document.querySelectorAll(".draggable").forEach(el => {
      el.onmousedown = (e) => Drag.start(e);
      el.onmouseup = (e) => Drag.end(e);
    })
    document.body.onmousemove = (e) => Drag.move(e);
  },
  start(e) {
    if (e.target.classList.contains("draggable")) {
      this.mouseOffset.x = e.layerX;
      this.mouseOffset.y = e.layerY;
      this.isDragging = true;
      this.element = e.target;
      this.width = this.element.getBoundingClientRect().width;
      this.height = this.element.getBoundingClientRect().height;
      this.docWidth = document.body.getBoundingClientRect().width;
      this.docHeight = document.body.getBoundingClientRect().height;
    }
  },
  move(e) {
    if (this.isDragging && e.buttons) {
      this.element.style.left = range(e.clientX - this.mouseOffset.x, 0, this.docWidth - this.width) + "px";
      this.element.style.top = range(e.clientY - this.mouseOffset.y, 0, this.docHeight - this.height) + "px";
    } else if (this.isDragging){
      this.isDragging = false;
    }
  },
  end(e) {
    if (e.target.classList.contains("draggable")) {
      var percentageX = range((this.element.getBoundx() / (this.docWidth - this.width)), 0, 1);
      var percentageY = range((this.element.getBoundy() / (this.docHeight - this.height)), 0, 1);

      this.element.style.left = "calc(" + (percentageX * 100) + "% - " + (percentageX * this.width) + "px)";
      this.element.style.top = "calc(" + (percentageY * 100) + "% - " + (percentageY * this.height) + "px)";
      this.isDragging = false;
      setCookie("pos" + e.target.id, this.element.style.left + "," + this.element.style.top);
    }
  }
}


// canvas

var Canvas = {
  init() {
    this.eraseContext = document.getElementById("eraseLayer").getContext("2d");
    this.element = document.getElementById("draw");
    this.wrapper = document.getElementById("drawWrapper")
    this.wrapper.onmousedown = e => this.mouseDown(e);
    this.wrapper.onmousemove = e => this.mouseMove(e);
    this.wrapper.onmouseup = e => this.mouseUp(e);
    this.wrapper.onmouseleave = e => this.mouseLeave(e);
    document.getElementById("scrollWrapper").onwheel = e => this.zoom(e);
    document.body.onresize = e => this.zoom();
    this.overlayContext = document.getElementById("overlay").getContext("2d");
    this.overlayContext.globalAlpha = 0.6;
    this.z = isNaN(Number(getCookie("zoom"))) ? 1 : Number(getCookie("zoom"));
    this.zoom({deltaY: 0});
    this.context = this.element.getContext("2d");
    this.previewContext = document.getElementById("preview").getContext("2d");
    this.foregroundColor = "#000000";
    this.undoBuffer = [];
  },
  set foregroundColor(color) {
    Colors.color = color;
  },
  get foregroundColor() {
    return Colors.color;
  },
  clearOverlay() {
    this.overlayContext.clearRect(0, 0, 72, 72);
  },
  setCursor(cursor) {
    this.wrapper.style.cursor = cursor;
  },
  setOverlayPixel(x, y, color) {
    if (color == Color.CLEAR) {color = "#FFF"}
      if (color === undefined) {color = this.foregroundColor}
      this.overlayContext.fillStyle = color;
      this.overlayContext.fillRect(x,      y, 1, 1);
      this.overlayContext.fillRect(x + 24, y, 1, 1);
      this.overlayContext.fillRect(x + 48, y, 1, 1);
      this.overlayContext.fillRect(x,      y + 24, 1, 1);
      this.overlayContext.fillRect(x + 24, y + 24, 1, 1);
      this.overlayContext.fillRect(x + 48, y + 24, 1, 1);
      this.overlayContext.fillRect(x,      y + 48, 1, 1);
      this.overlayContext.fillRect(x + 24, y + 48, 1, 1);
      this.overlayContext.fillRect(x + 48, y + 48, 1, 1);
  },
  setPixel(x, y, color) {
    if (this.context.getImageData(x, y, 1, 1).data[3] !== 0) {
      this.eraseContext.fillStyle = this.context.getImageData(x, y, 1, 1).data;
      this.eraseContext.fillRect(x, y, 1, 1);
    } else {
      this.eraseContext.clearRect(x, y, 1, 1);
    }
    if (color === Color.CLEAR) {
      this.context.clearRect(x,      y, 1, 1);
      this.context.clearRect(x + 24, y, 1, 1);
      this.context.clearRect(x + 48, y, 1, 1);
      this.context.clearRect(x,      y + 24, 1, 1);
      this.context.clearRect(x + 24, y + 24, 1, 1);
      this.context.clearRect(x + 48, y + 24, 1, 1);
      this.context.clearRect(x,      y + 48, 1, 1);
      this.context.clearRect(x + 24, y + 48, 1, 1);
      this.context.clearRect(x + 48, y + 48, 1, 1);
      this.previewContext.clearRect(x, y, 1, 1);
    } else {
      if (color === undefined) {color = this.foregroundColor}
      this.context.fillStyle = color;
      this.context.fillRect(x,      y, 1, 1);
      this.context.fillRect(x + 24, y, 1, 1);
      this.context.fillRect(x + 48, y, 1, 1);
      this.context.fillRect(x,      y + 24, 1, 1);
      this.context.fillRect(x + 24, y + 24, 1, 1);
      this.context.fillRect(x + 48, y + 24, 1, 1);
      this.context.fillRect(x,      y + 48, 1, 1);
      this.context.fillRect(x + 24, y + 48, 1, 1);
      this.context.fillRect(x + 48, y + 48, 1, 1);
      this.previewContext.fillStyle = color;
      this.previewContext.fillRect(x, y, 1, 1);
    }
  },
  mouseDown(e) {
    if (e.metaKey || e.ctrlKey) {
      this.foregroundColor = this.context.getImageData(Math.floor(e.layerX / this.widthRatio) % 24, Math.floor(e.layerY / this.heightRatio) % 24, 1, 1).data;
    } else {

      ((selectedTool.tool || {}).mouseDown || (() => {})).bind(this)(e)
    }

  },
  mouseMove(e) {
    if (e.metaKey || e.ctrlKey) {
      this.wrapper.setAttribute("colorPicking", true);
    } else {
      this.wrapper.setAttribute("colorPicking", false);
      ((selectedTool.tool || {}).mouseMove || (() => {})).bind(this)(e)
    }

  },
  mouseUp(e) {
    ((selectedTool.tool || {}).mouseUp || (() => {})).bind(this)(e)
  },
  mouseLeave(e) {
    this.clearOverlay();
  },
  zoom(e) {
    this.z = range(this.z + ((e || {}).deltaY || 0)/100, 0.3, 3);
    this.wrapper.style.width = this.z * 100 + "vmin";
    this.wrapper.style.height = this.z * 100 + "vmin";
    setCookie("zoom", Math.round(this.z * 100)/100);
    this.widthRatio = this.element.getBoundingClientRect().width / 72;
    this.heightRatio = this.element.getBoundingClientRect().height / 72;
  },
  saveUndo() {
    var buffer = this.previewContext.canvas.toDataURL();
    if (this.undoBuffer[this.undoBuffer.length - 1] == buffer) {return;}
    this.undoBuffer.push(buffer);
    if (this.undoBuffer > 30) {
      this.undoBuffer.shift();
    }
  },
  undo() {
    if (!this.undoBuffer || this.undoBuffer.length == 0) {return}
    // save redo state
    this.redoBuffer = this.redoBuffer || [];
    var buffer = this.previewContext.canvas.toDataURL();
    if (this.redoBuffer[this.redoBuffer.length - 1] != buffer) {
      this.redoBuffer.push(buffer);
      if (this.redoBuffer > 30) {
        this.redoBuffer.shift();
      }
    }
    //restore last undo buffer image
    buffer = new Image();
    buffer.onload = () => {
      console.log("load", buffer)
      this.context.clearRect(0, 0, 72, 72);
      this.previewContext.clearRect(0, 0, 24, 24);
      this.context.drawImage(buffer,  0,  0);
      this.context.drawImage(buffer,  0, 24);
      this.context.drawImage(buffer,  0, 48);
      this.context.drawImage(buffer, 24,  0);
      this.context.drawImage(buffer, 24, 24);
      this.context.drawImage(buffer, 24, 48);
      this.context.drawImage(buffer, 48,  0);
      this.context.drawImage(buffer, 48, 24);
      this.context.drawImage(buffer, 48, 48);
      this.previewContext.drawImage(buffer, 0, 0);
    }
    buffer.src = this.undoBuffer.pop();
    console.log(buffer);
  },
  redo() {
    if (!this.redoBuffer || this.redoBuffer.length == 0) {return}
    // save redo state
    this.undoBuffer = this.undoBuffer || [];
    var buffer = this.previewContext.canvas.toDataURL();
    if (this.undoBuffer[this.undoBuffer.length - 1] != buffer) {
      this.undoBuffer.push(buffer);
      if (this.undoBuffer > 30) {
        this.undoBuffer.shift();
      }
    }
    //restore last undo buffer image
    buffer = new Image();
    buffer.onload = () => {
      console.log("load", buffer)
      this.context.clearRect(0, 0, 72, 72);
      this.previewContext.clearRect(0, 0, 24, 24);
      this.context.drawImage(buffer,  0,  0);
      this.context.drawImage(buffer,  0, 24);
      this.context.drawImage(buffer,  0, 48);
      this.context.drawImage(buffer, 24,  0);
      this.context.drawImage(buffer, 24, 24);
      this.context.drawImage(buffer, 24, 48);
      this.context.drawImage(buffer, 48,  0);
      this.context.drawImage(buffer, 48, 24);
      this.context.drawImage(buffer, 48, 48);
      this.previewContext.drawImage(buffer, 0, 0);
    }
    buffer.src = this.redoBuffer.pop();
  }
}


document.body.onkeydown = (e) => {
  if (e.which == 90 && (e.metaKey || e.ctrlKey) && !e.shiftKey) {
    Canvas.undo();
    e.preventDefault();
  } else if ((e.which == 89 && (e.metaKey || e.ctrlKey)) || (e.which == 90 && (e.metaKey || e.ctrlKey) && e.shiftKey)) {
    Canvas.redo();
    e.preventDefault();
  }
}
