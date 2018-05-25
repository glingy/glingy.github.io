class Color {
  constructor(r, g, b, a) {
    if (r instanceof ImageData) {r = r.data}

    if (r == Color.CLEAR) {
      this.r = 0;
      this.g = 0;
      this.b = 0;
      this.a = 0;
    } else if (typeof r == "string") {
      if (r[0] == "#") {
        if (r.length == 7) {
          this.r = parseInt(r.substr(1, 2), 16)
          this.g = parseInt(r.substr(3, 2), 16)
          this.b = parseInt(r.substr(5, 2), 16)
          this.a = 255;
        } else if (r.length == 4) {
          this.r = parseInt(r.substr(1, 1), 16) * 17 // (0x11)
          this.g = parseInt(r.substr(2, 1), 16) * 17
          this.b = parseInt(r.substr(3, 1), 16) * 17
          this.a = 255;
        }
      } else if (r[3] == "(") {
        r = r.slice(4, -1).split(", ");
        this.r = Number(r[0]);
        this.g = Number(r[1]);
        this.b = Number(r[2]);
        this.a = 255;
      } else if (r[3] == "a"){
        r = r.slice(5, -1).split(", ");
        this.r = Number(r[0]);
        this.g = Number(r[1]);
        this.b = Number(r[2]);
        this.a = Number(r[3]);
      }
    } else if (typeof r[0] == "number") {
      this.r = r[0];
      this.g = r[1];
      this.b = r[2];
      this.a = r[3];
    } else {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
    }

    if ((isNaN(this.r) || isNaN(this.g) || isNaN(this.b) || isNaN(this.a)) && g instanceof Color) {
       this.r = g.r;
       this.g = g.g;
       this.b = g.b;
       this.a = g.a;
    }
  }
  toHex() {
    if (this.isClear()) {
      return Color.CLEAR;
    }
    return "#" + ("00" + this.r.toString(16)).slice(-2) + ("00" + this.g.toString(16)).slice(-2) + ("00" + this.b.toString(16)).slice(-2);
  }
  toRGB() {
    return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
  }
  toRGBA() {
    return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")";
  }
  toPreview() {
    return this.isClear() ? "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAIVJREFUSA211UsOwCAIBFDs/e/capsabP0AMxIXRhOezMZ0iuT1VBLJi1uHbqcxfY7sG6A0YiN3JL2mrLhq5ruQCoziQSdpgB3ID2AjXYCJDAEWMgUYyBJAEROAIGYgiriACOIGvEgI8CBhwIpAgAWBgRVCAWYIDZgg5YpX35+ROsH7TI1c4UkwEfvBRgEAAAAASUVORK5CYII=)" :
      "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")";
  }
  toArray() {
    return [this.r, this.g, this.b, this.a];
  }
  isClear() {
    return (this.a == 0);
  }
  static get CLEAR() {
    return "CLEAR";
  }
}

const DefaultPalette = [
  "#F00",
  "#0F0",
  "#00F",
  "#FF0",
  "#0FF",
  "#F0F",
  "#FFF",
  "#000",
  Color.CLEAR,
  "#777"
]


var Colors = {
  activeColor: undefined,
  init() {
    this.inputs = [document.getElementById("redInput"), document.getElementById("greenInput"), document.getElementById("blueInput"), document.getElementById("colorInput")]
    this.element = document.getElementById("colors");
    this.palette = document.getElementById("palette");

    (new Array(40).fill(0).forEach((_, i) => {
      var color = document.createElement("div");
      color.className = "paletteColor";
      color.color = new Color(DefaultPalette[39 - i] || "#0F0")
      color.style.background = color.color.toPreview();
      this.palette.appendChild(color);
      color.onclick = ((e) => this.select(e));
    }))
    this.setActiveColor(this.palette.children[0]);

  },
  input(e) {
    if (e.target.id == "redInput") {
      this.activeColor.color.r = Number(e.target.value);
    } else if (e.target.id == "greenInput") {
      this.activeColor.color.g = Number(e.target.value);
    } else if (e.target.id == "blueInput") {
      this.activeColor.color.b = Number(e.target.value);
    } else if (e.target.id == "colorInput") {
      this.activeColor.color = new Color(e.target.value, this.activeColor.color);
      this.update(false);
      return;
    }

    this.update();
  },
  select(e) {
    this.setActiveColor(e.target);
  },
  setActiveColor(el) {
    if (this.activeColor) {this.activeColor.classList.remove("active")}
    this.activeColor = el
    this.activeColor.classList.add("active");
    this.update()
  },
  get color() {
    return this.activeColor.color.toHex();
  },
  set color(val) {
    this.activeColor.color = new Color(val);
    this.update();
  },
  update(text) {
    this.inputs[0].value = this.activeColor.color.r;
    this.inputs[1].value = this.activeColor.color.g;
    this.inputs[2].value = this.activeColor.color.b;
    this.activeColor.style.background = this.activeColor.color.toPreview();
    if (text === undefined || text) {
      this.inputs[3].value = this.color;
    }
  }
}
