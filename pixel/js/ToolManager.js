var selectedTool = {};

var ToolManager = {};
ToolManager.init = (() => {
  Tools.forEach((tool, ti) => {
    var t = document.createElement("div");
    var o = document.createElement("div");
    o.className = "options";
    (tool instanceof Array ? tool : [tool]).forEach((option, i, tool) => {
      var h = document.createElement("div");
      h.appendChild(a = document.createElement("img"));
      a.src = option.icon || "";
      a.draggable = false;
      h.tool = option;
      option.element = h;
      h.parentTool = tool[0];
      option.parentTool = tool[0];

      if (tool[1] && i > 0) {

        h.id = "tool" + tool[0].name + option.name;
        h.className = "tool option";
        h.onclick = e => {
          if (((option || {}).activate || (() => true)).bind(Canvas)(e)) {
            if (selectedTool.parentTool) {selectedTool.parentTool.element.classList.remove("active")}
            selectedTool = option.element;
            selectedTool.parentTool.element.classList.add("active")
            Canvas.clearOverlay();
            Canvas.wrapper.style.cursor = option.cursor ? "url(" + option.cursor + "), auto" : "auto";
          }
        }
        o.appendChild(h);
      } else if (tool[1]) {
        h.id = "tool" + option.name;
        h.className = "tool main multi";
        h.tabindex = ti;
        if (option.activate) {
          h.onclick = e => {
            if (((option || {}).activate || (() => true)).bind(Canvas)(e)) {
              if (selectedTool.parentTool) {selectedTool.parentTool.element.classList.remove("active")}
              selectedTool = option.element;
              selectedTool.parentTool.element.classList.add("active")
              Canvas.clearOverlay();
              Canvas.wrapper.style.cursor = option.cursor ? "url(" + option.cursor + "), auto" : "auto";
            }
          }
        }
        t.appendChild(h);
      } else {
        h.id = "tool" + option.name;
        h.className = "tool main";
        h.tabindex = ti;
        h.onclick = e => {
          if (((option || {}).activate || (() => true)).bind(Canvas)(e)) {
            if (selectedTool.parentTool) {selectedTool.parentTool.element.classList.remove("active")}
            selectedTool = option.element;
            selectedTool.parentTool.element.classList.add("active")
            Canvas.clearOverlay();
            Canvas.setCursor(option.cursor ? "url(" + option.cursor + "), auto" : "auto");
          }
        }
        t.appendChild(h);
      }

      var tt = document.createElement("span");
      tt.className = "tooltip";
      tt.innerText = option.tip || option.name;
      h.appendChild(tt);

    })
    t.appendChild(o);
    document.getElementById("toolbar").appendChild(t);
  })
  Tools[0].element.click();
})
