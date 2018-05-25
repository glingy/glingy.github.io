var Tools = [
  {
    name: "Pencil",
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAMhJREFUSA3tlUEOg0AMA2n//+dCWllyllG9C1eQUBInng0cYNue6/cGPkeo+3S9Tsq6MIIb873Oa46CN+BRtwPHZnOHwkHF8bqsX/bVJ9DmWlB12Gmu7Zsqr+j5HAmmBKmWco/KwZolNytX9AMzCSYIRBpYs0Qg0jIJJghEGlizRCDSMgkmCEQaWLNEINIyCSYIRBpYs0Qg0jIJJgok2BhrXBpY5yQdIJDibbh/DX0V15V7fzqX2Td2s/quLeX//ge34UubXB3eAXgLQ9KLx54eAAAAAElFTkSuQmCC",
    help: {description: "draws stuff", alt: "draw lines", cmd: "pick a color"},
    cursor: "",
    mouseDown(e) {
      this.saveUndo();
      if (e.shiftKey && this.lastPixel) {
        var currentPixel = [Math.floor(e.layerX / this.widthRatio), Math.floor(e.layerY / this.heightRatio)]
        var dx = currentPixel[0] - this.lastPixel[0];
        var dy = currentPixel[1] - this.lastPixel[1];
        var maxD = max(Math.abs(dx), Math.abs(dy));
        dx /= maxD;
        dy /= maxD;
        var x = this.lastPixel[0];
        var y = this.lastPixel[1];
        for (var i = 0; i <= maxD; i++) {
          this.setPixel(Math.round(x) % 24, Math.round(y) % 24, this.foregroundColor);
          x += dx;
          y += dy;
        }
        this.lastPixel = currentPixel;
      } else {
        this.lastPixel = [Math.floor(e.layerX / this.widthRatio), Math.floor(e.layerY / this.heightRatio)]
        this.setPixel(Math.floor(e.layerX / this.widthRatio) % 24, Math.floor(e.layerY / this.heightRatio) % 24, e.altKey ? Color.CLEAR : this.foregroundColor)
      }
      this.isDrawing = true;

    },
    mouseMove(e) {
      if (e.shiftKey && this.lastPixel){
        this.clearOverlay();
        this.overlayUsed = true;
        var currentPixel = [Math.floor(e.layerX / this.widthRatio), Math.floor(e.layerY / this.heightRatio)]
        var dx = currentPixel[0] - this.lastPixel[0];
        var dy = currentPixel[1] - this.lastPixel[1];
        var maxD = max(Math.abs(dx), Math.abs(dy));
        dx /= maxD;
        dy /= maxD;
        var x = this.lastPixel[0];
        var y = this.lastPixel[1];
        for (var i = 0; i <= maxD; i++) {
          this.setOverlayPixel(Math.round(x) % 24, Math.round(y) % 24, this.foregroundColor);
          x += dx;
          y += dy;
        }
      } else {
        if (e.buttons && this.isDrawing) {
          this.setPixel(Math.floor(e.layerX / this.widthRatio) % 24, Math.floor(e.layerY / this.heightRatio) % 24, e.altKey ? Color.CLEAR : this.foregroundColor)
          this.lastPixel = [Math.floor(e.layerX / this.widthRatio), Math.floor(e.layerY / this.heightRatio)]
        } else if (this.isDrawing) {
          this.isDrawing = false;
        }
        if (this.overlayUsed) {
          this.clearOverlay();
          this.overlayUsed = false;
        }
      }
    },
    mouseUp(e) {
      this.isDrawing = false;

    }
  },
  {
    name: "Fill",
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAIlJREFUSA3tUkEKgDAMq+L/v6wUXCntskVhglAv69YkzTJF6qsEKoHlCWzEhJPAKITRSlJRPO49YdTzOKsRAZ0rMfV2k1tU/H/AQSaTsiV5wkT0WlxNjP5dJIw4ik89NiKfCBrsMVaniXcHiSC8CcaCeYPIebTvOULum3CP03pp/fwGM/fNIX2LC3XeDxHyKe6BAAAAAElFTkSuQmCC",
    help: {description: "fills adjacent pixels", alt: "fill adjacent and diagonal pixels", cmd: "pick a color"},
    mouseDown(e) {
      this.clearOverlay();
      this.saveUndo();
      var currentPixel = [Math.floor(e.layerX / this.widthRatio) % 24, Math.floor(e.layerY / this.heightRatio) % 24];
      var buffer = new Array(24).fill().map(a => new Array(24).fill(false));
      if (new Color(this.context.getImageData(currentPixel[0], currentPixel[1], 1, 1)).toHex() === this.foregroundColor) {return;}
      (function fill(x, y, color, diagonal, filled) {
        this.setPixel(x, y, color);
        buffer[y][x] = true;
        if (this.context.getImageData(dec(x), y, 1, 1).data.toString() === filled && !buffer[y][dec(x)]) {

          fill.bind(this)(dec(x), y, color, diagonal, filled);
        }

        if (this.context.getImageData(x, dec(y), 1, 1).data.toString() === filled && !buffer[dec(y)][x]) {
          fill.bind(this)(x, dec(y), color, diagonal, filled);
        }

        if (this.context.getImageData(inc(x), y, 1, 1).data.toString() === filled && !buffer[y][inc(x)]) {
          fill.bind(this)(inc(x), y, color, diagonal, filled);
        }

        if (this.context.getImageData(x, inc(y), 1, 1).data.toString() === filled && !buffer[inc(y)][x]) {
          fill.bind(this)(x, inc(y), color, diagonal, filled);
        }

        if (diagonal) {
          if (this.context.getImageData(dec(x), dec(y), 1, 1).data.toString() === filled && !buffer[dec(y)][dec(x)]) {
            fill.bind(this)(dec(x), dec(y), color, diagonal, filled);
          }

          if (this.context.getImageData(inc(x), dec(y), 1, 1).data.toString() === filled && !buffer[dec(y)][inc(x)]) {
            fill.bind(this)(inc(x), dec(y), color, diagonal, filled);
          }

          if (this.context.getImageData(inc(x), inc(y), 1, 1).data.toString() === filled && !buffer[inc(y)][inc(x)]) {
            fill.bind(this)(inc(x), inc(y), color, diagonal, filled);
          }

          if (this.context.getImageData(dec(x), inc(y), 1, 1).data.toString() === filled && !buffer[inc(y)][dec(x)]) {
            fill.bind(this)(dec(x), inc(y), color, diagonal, filled);
          }
        }
      }).bind(this)(currentPixel[0], currentPixel[1], this.foregroundColor, e.altKey, this.context.getImageData(currentPixel[0], currentPixel[1], 1, 1).data.toString())
    },
    mouseMove(e) {
      this.clearOverlay();
      var currentPixel = [Math.floor(e.layerX / this.widthRatio) % 24, Math.floor(e.layerY / this.heightRatio) % 24];
      var buffer = new Array(24).fill().map(a => new Array(24).fill(false));
      if (new Color(this.context.getImageData(currentPixel[0], currentPixel[1], 1, 1)).toHex() === this.foregroundColor) {return;}
      (function fill(x, y, color, diagonal, filled) {
        this.setOverlayPixel(x, y, color);
        buffer[y][x] = true;
        if (this.context.getImageData(dec(x), y, 1, 1).data.toString() === filled && !buffer[y][dec(x)]) {

          fill.bind(this)(dec(x), y, color, diagonal, filled);
        }

        if (this.context.getImageData(x, dec(y), 1, 1).data.toString() === filled && !buffer[dec(y)][x]) {
          fill.bind(this)(x, dec(y), color, diagonal, filled);
        }

        if (this.context.getImageData(inc(x), y, 1, 1).data.toString() === filled && !buffer[y][inc(x)]) {
          fill.bind(this)(inc(x), y, color, diagonal, filled);
        }

        if (this.context.getImageData(x, inc(y), 1, 1).data.toString() === filled && !buffer[inc(y)][x]) {
          fill.bind(this)(x, inc(y), color, diagonal, filled);
        }

        if (diagonal) {
          if (this.context.getImageData(dec(x), dec(y), 1, 1).data.toString() === filled && !buffer[dec(y)][dec(x)]) {
            fill.bind(this)(dec(x), dec(y), color, diagonal, filled);
          }

          if (this.context.getImageData(inc(x), dec(y), 1, 1).data.toString() === filled && !buffer[dec(y)][inc(x)]) {
            fill.bind(this)(inc(x), dec(y), color, diagonal, filled);
          }

          if (this.context.getImageData(inc(x), inc(y), 1, 1).data.toString() === filled && !buffer[inc(y)][inc(x)]) {
            fill.bind(this)(inc(x), inc(y), color, diagonal, filled);
          }

          if (this.context.getImageData(dec(x), inc(y), 1, 1).data.toString() === filled && !buffer[inc(y)][dec(x)]) {
            fill.bind(this)(dec(x), inc(y), color, diagonal, filled);
          }
        }
      }).bind(this)(currentPixel[0], currentPixel[1], this.foregroundColor, e.altKey, this.context.getImageData(currentPixel[0], currentPixel[1], 1, 1).data.toString())
    }
  },
  {
    name: "Random",
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAItJREFUSA3tUtEKwCAIbGP//8sbGYW4vI5IxsZ6qTzvzrSU/vX5DmzkC08nj+U79BL2xDOKMChaQUYA5uxV6ckdVYgwqZkdkifE8qkGaRN9huTwGYQbwOcpsNeSXkxR+CMSQpg46F8wTOZrumlLYKVB0wof8vsNDjO41jsTn77qX5RFVhlY3ekCh8QLsQkTBjlG5y0AAAAASUVORK5CYII=",
    help: {description: "fills the screen with a colorful mess"},
    activate() {
      var a = [];
      for (var i = 0; i < 24; i++) {
        for (var j = 0; j < 24; j++) {
          a.push(Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.random()*256), 255);
        }
      }
      this.saveUndo();
      this.context.putImageData(new ImageData(new Uint8ClampedArray(a), 24, 24), 0, 0);
      this.context.putImageData(new ImageData(new Uint8ClampedArray(a), 24, 24), 0, 24);
      this.context.putImageData(new ImageData(new Uint8ClampedArray(a), 24, 24), 0, 48);
      this.context.putImageData(new ImageData(new Uint8ClampedArray(a), 24, 24), 24, 0);
      this.context.putImageData(new ImageData(new Uint8ClampedArray(a), 24, 24), 24, 24);
      this.context.putImageData(new ImageData(new Uint8ClampedArray(a), 24, 24), 24, 48);
      this.context.putImageData(new ImageData(new Uint8ClampedArray(a), 24, 24), 48, 0);
      this.context.putImageData(new ImageData(new Uint8ClampedArray(a), 24, 24), 48, 24);
      this.context.putImageData(new ImageData(new Uint8ClampedArray(a), 24, 24), 48, 48);
      this.previewContext.putImageData(new ImageData(new Uint8ClampedArray(a), 24, 24), 0, 0);




      return false;
    }
  },
  {
    name: "Reset Zoom",
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAONJREFUSA3tUlsSgzAIJL3/na3QbIQ1gTjTT51pCbAPiIq8T3EDjfoH5dyntshxPq3dYKPwuTGuwgBdpXhSca30EJs9ywx4myAAcS1ONhjYmYGfPDWZiHuumbABAIgKWprQ5OAgTg2saKq/60UeTPR6FuLAP4oqjp99NS4PxjPVsM4M0GsroZJfApwpm2xx+SU7vf8ct6Y4rXh6uJf8EkDiwHtD1GAaYtpciENgyyQz2BEoMfySQUDUabMhfA8cRNvUA7QQmoW4CfS/JY838CQ29z0+L7GZAU/Foj5/gvW89yzyBTckNg2AxZ7+AAAAAElFTkSuQmCC",
    help: {description: "resets zoom to fit-to-screen"},
    activate() {
      this.z = 1;
      this.zoom({deltaY: 0});
      return false;
    }
  },
  {
    name: "Clear",
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAKtJREFUSA3tkOEKgDAIhKv3f+fFDW4cotPWjyA2CFPP++aOY5+vX+AsXqA5utJsJvKMLWvqcVm15MO8tf4LI/0oHToWNEZ0O1TRuZrZBnoRC2TPNWUT0RPQjD3mkR51ajiDWj+VDXSIRpxPYwUAk2VIFbAMeQJYgujqMODhW2d96hFdbbYBQWoUmlkR8gigt4kg6qd6rftrieKVOXxCskDw64Gqs8Zqp797gRtxeRcYqTNCOQAAAABJRU5ErkJggg==",
    help: {description: "erases everything"},
    activate() {
      this.saveUndo();
      this.context.clearRect(0, 0, 72, 72);
      this.previewContext.clearRect(0, 0, 24, 24);
      this.zoom({deltaY: 0});
      return false;
    }
  },
  [{
    name: "Undo",
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJZJREFUSA3tU9ESgCAIs/7/n+s04XYI6ryeyl4UxjbETOlv38Ue+CQItHjWPiYNIvEhf1hQG4gMpL9QJwSECauYIEdyuQzzSmPuwBPAHJqpwVubLE4Z0IRq0JgwI1o67TZYGpuQmIsOa2fuoPkzpIO6dnF8KIZXQiR7tSPcf97GCUUMpKFnXsAQUOqz6ZnMahjJHX5mAjeEWhcIdRd1ogAAAABJRU5ErkJggg==",
    help: {description: "undoes your mistakes"},
    activate(e) {
      this.undo();
      return false;
    }
  },
  {
    name: "Redo",
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAJRJREFUSA3tU1sOgCAMU+P9r6xiXNIsbZl8Kvzguj5whGX56zqqP75ViYRXClmJUEHK0Hrsyg1wZQwU/WnTLxmaIzdwxGiKu4MwaUJmxDAaosAWgCGKN4SPmFONG9HQybJoBuSJvKrppQkHya3cQRO7Zfu9x4Jixu316QvNp0WT3Iuahd892Qjls7uQqkeynOVnJnACFqsXCmtRgFIAAAAASUVORK5CYII=",
    help: {description: "redoes your undone mistakes"},
    activate(e) {
      this.redo();
      return false
    }
  }],
  [{
    name: "File",
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALRJREFUSA3tkusOgCAIhbH1/q9c1qLhFwk/arMtt6bCuQApMthaaj3bl14ljbwKp7gpUC3iruqQHwI64tp8V6ObTIiHJj2Du7GoKHdXayLquFPcIzNGzi7lGRBIIVsTc+QKDQiggBXXMzGNhjVoEpVNogp6O7GnFhMeWWMn6QikuLYDFXp0/w3CcX5/RPrU+ATD1pOAMhugmplQc2QRKfzr/8B20JTrXKKKHYqINeAIXMJwwRU0fRQohBLnUwAAAABJRU5ErkJggg==",
  }, {
    name: "Export",
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALRJREFUSA3tkusOgCAIhbH1/q9c1qLhFwk/arMtt6bCuQApMthaaj3bl14ljbwKp7gpUC3iruqQHwI64tp8V6ObTIiHJj2Du7GoKHdXayLquFPcIzNGzi7lGRBIIVsTc+QKDQiggBXXMzGNhjVoEpVNogp6O7GnFhMeWWMn6QikuLYDFXp0/w3CcX5/RPrU+ATD1pOAMhugmplQc2QRKfzr/8B20JTrXKKKHYqINeAIXMJwwRU0fRQohBLnUwAAAABJRU5ErkJggg==",
    help: {description: "exports your beautiful creation"},
    activate() {
      new Alert(this.previewContext.canvas.toDataURL(), 0, "<a class='dismiss' href='" + this.previewContext.canvas.toDataURL() + "' download='TileMaker.png'>Download PNG</a>");
      return false;
    }
  }, {
    name: "Import",
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALRJREFUSA3tkusOgCAIhbH1/q9c1qLhFwk/arMtt6bCuQApMthaaj3bl14ljbwKp7gpUC3iruqQHwI64tp8V6ObTIiHJj2Du7GoKHdXayLquFPcIzNGzi7lGRBIIVsTc+QKDQiggBXXMzGNhjVoEpVNogp6O7GnFhMeWWMn6QikuLYDFXp0/w3CcX5/RPrU+ATD1pOAMhugmplQc2QRKfzr/8B20JTrXKKKHYqINeAIXMJwwRU0fRQohBLnUwAAAABJRU5ErkJggg==",
    help: {description: "imports a beautiful creation", note: "You must click 'Use this!' to use the image."},
    activate() {
      this.pasteImage = new Image();
      new Alert("Import File:", 0, "<input type='text' placeholder='Data URL'></input><input type='file' accept='image/*'></input><a onclick='try {if (this.previousElementSibling.files[0]) {var f = new FileReader(); f.onload = e => {console.log(e);Canvas.pasteImage.src = f.result};f.readAsDataURL(this.previousElementSibling.files[0])} else if (this.previousElementSibling.previousElementSibling.value){Canvas.pasteImage.src = this.previousElementSibling.previousElementSibling.value};this.parentElement.children[this.parentElement.children.length - 1].children[0].click()} catch (e) {console.log(e)}' class='dismiss'>Use this!</a>")
      this.isMoving = false;
      this.offsetPixel = {x: 0, y: 0, width: 24, height: 24};
      this.cropPixel = {x: 0, y: 0, width: 24, height: 24};
      return true;
    },
    mouseDown(e) {
      var currentPixel = [Math.floor(e.layerX / this.widthRatio), Math.floor(e.layerY / this.heightRatio)];
      if (currentPixel[0] % 24 == this.offsetPixel.x % 24 && currentPixel[1] % 24 == this.offsetPixel.y % 24) {
        this.isMoving = 1;
        this.setCursor("nwse-resize");

      } else if (currentPixel[0] % 24 == (this.offsetPixel.x + this.offsetPixel.width - 1) % 24 && currentPixel[1] % 24 == (this.offsetPixel.y + this.offsetPixel.height - 1) % 24) {
        this.isMoving = 2;
        this.setCursor("nwse-resize");
        this.offsetPixel.x = currentPixel[0] - this.offsetPixel.width + 1;
        this.offsetPixel.y = currentPixel[1] - this.offsetPixel.height + 1;
        console.log(currentPixel, this.offsetPixel, this);
      } else if (currentPixel[0] % 24 == (this.offsetPixel.x + this.offsetPixel.width - 1) % 24 && currentPixel[1] % 24 == this.offsetPixel.y % 24) {
        this.isMoving = 3;
        this.setCursor("nesw-resize");
        this.cropPixel.x = currentPixel[0] - this.cropPixel.width + 1;
        this.cropPixel.y = currentPixel[1];
      } else if (currentPixel[0] % 24 == this.offsetPixel.x && currentPixel[1] % 24 == (this.offsetPixel.y + this.offsetPixel.height - 1) % 24) {
        this.isMoving = 4;
        this.setCursor("nesw-resize");

      } else if (this.firstClick) {
        this.clearOverlay();
        this.saveUndo();
        this.context.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24) - 24, (this.offsetPixel.y % 24) - 24, this.offsetPixel.width, this.offsetPixel.height);
        this.context.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24), (this.offsetPixel.y % 24) - 24, this.offsetPixel.width, this.offsetPixel.height);
        this.context.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24) + 24, (this.offsetPixel.y % 24) - 24, this.offsetPixel.width, this.offsetPixel.height);
        this.context.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24) + 48, (this.offsetPixel.y % 24) - 24, this.offsetPixel.width, this.offsetPixel.height);
        this.context.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24) - 24, (this.offsetPixel.y % 24), this.offsetPixel.width, this.offsetPixel.height);
        this.context.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24), (this.offsetPixel.y % 24), this.offsetPixel.width, this.offsetPixel.height);
        this.context.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24) + 24, (this.offsetPixel.y % 24), this.offsetPixel.width, this.offsetPixel.height);
        this.context.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24) + 48, (this.offsetPixel.y % 24), this.offsetPixel.width, this.offsetPixel.height);
        this.context.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24) - 24, (this.offsetPixel.y % 24) + 24, this.offsetPixel.width, this.offsetPixel.height);
        this.context.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24), (this.offsetPixel.y % 24) + 24, this.offsetPixel.width, this.offsetPixel.height);
        this.context.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24) + 24, (this.offsetPixel.y % 24) + 24, this.offsetPixel.width, this.offsetPixel.height);
        this.context.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24) + 48, (this.offsetPixel.y % 24) + 24, this.offsetPixel.width, this.offsetPixel.height);
        this.context.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24) - 24, (this.offsetPixel.y % 24) + 48, this.offsetPixel.width, this.offsetPixel.height);
        this.context.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24), (this.offsetPixel.y % 24) + 48, this.offsetPixel.width, this.offsetPixel.height);
        this.context.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24) + 24, (this.offsetPixel.y % 24) + 48, this.offsetPixel.width, this.offsetPixel.height);
        this.context.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24) + 48, (this.offsetPixel.y % 24) + 48, this.offsetPixel.width, this.offsetPixel.height);
        this.previewContext.putImageData(this.context.getImageData(24, 24, 24, 24), 0, 0);

      } else {
        this.isMoving = 0;
        this.firstClick = true;
        setTimeout(() => {this.firstClick = false;}, 500);
        this.setCursor("auto");
      }
    },
    mouseMove(e) {
      var currentPixel = [Math.floor(e.layerX / this.widthRatio), Math.floor(e.layerY / this.heightRatio)];
      this.clearOverlay();
      if (e.buttons) {
        switch (this.isMoving) {
          case 1:
            this.offsetPixel.x = currentPixel[0];
            this.offsetPixel.y = currentPixel[1];
            break;
          case 2:
            this.offsetPixel.width = currentPixel[0] - this.offsetPixel.x + 1;
            this.offsetPixel.height = currentPixel[1] - this.offsetPixel.y + 1;
            break;
          case 3:
            this.cropPixel.width = currentPixel[0] - this.cropPixel.x;
            this.cropPixel.y = currentPixel[1];
            break;
          case 3:
            this.cropPixel.width = currentPixel[0] - this.cropPixel.x;
            this.cropPixel.y = currentPixel[1];
            break;
          case 44:
            this.cropPixel.x = currentPixel[0];
            this.cropPixel.height = currentPixel[1] - this.cropPixel.y;
            break;
          case 0:
            break;
          default:
            break;
        }
      }

      if (currentPixel[0] % 24 == this.offsetPixel.x % 24 && currentPixel[1] % 24 == this.offsetPixel.y % 24) {
        this.setCursor("move");
      } else if (currentPixel[0] % 24 == (this.offsetPixel.x + this.offsetPixel.width - 1) % 24 && currentPixel[1] % 24 == (this.offsetPixel.y + this.offsetPixel.height - 1) % 24) {
        this.setCursor("nwse-resize");
      } else if (currentPixel[0] % 24 == (this.offsetPixel.x + this.offsetPixel.width - 1) % 24 && currentPixel[1] % 24 == this.offsetPixel.y % 24) {
        this.setCursor("sw-resize");
      } else if (currentPixel[0] % 24 == this.offsetPixel.x % 24 && currentPixel[1] % 24 == (this.offsetPixel.y + this.offsetPixel.height - 1) % 24) {
        this.setCursor("ne-resize");
      } else {
        this.setCursor("auto");
      }
      this.setOverlayPixel(this.offsetPixel.x % 24, this.offsetPixel.y % 24, "#000");
      this.setOverlayPixel((this.offsetPixel.x + this.offsetPixel.width - 1) % 24, (this.offsetPixel.y + this.offsetPixel.height - 1) % 24, "#000");
      this.setOverlayPixel(this.offsetPixel.x % 24, (this.offsetPixel.y + this.offsetPixel.height - 1) % 24, "#555");
      this.setOverlayPixel((this.offsetPixel.x + this.offsetPixel.width - 1) % 24, this.offsetPixel.y % 24, "#555");
      this.overlayContext.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24) - 24, (this.offsetPixel.y % 24) - 24, this.offsetPixel.width, this.offsetPixel.height);
      this.overlayContext.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24), (this.offsetPixel.y % 24) - 24, this.offsetPixel.width, this.offsetPixel.height);
      this.overlayContext.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24) + 24, (this.offsetPixel.y % 24) - 24, this.offsetPixel.width, this.offsetPixel.height);
      this.overlayContext.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24) + 48, (this.offsetPixel.y % 24) - 24, this.offsetPixel.width, this.offsetPixel.height);
      this.overlayContext.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24) - 24, (this.offsetPixel.y % 24), this.offsetPixel.width, this.offsetPixel.height);
      this.overlayContext.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24), (this.offsetPixel.y % 24), this.offsetPixel.width, this.offsetPixel.height);
      this.overlayContext.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24) + 24, (this.offsetPixel.y % 24), this.offsetPixel.width, this.offsetPixel.height);
      this.overlayContext.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24) + 48, (this.offsetPixel.y % 24), this.offsetPixel.width, this.offsetPixel.height);
      this.overlayContext.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24) - 24, (this.offsetPixel.y % 24) + 24, this.offsetPixel.width, this.offsetPixel.height);
      this.overlayContext.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24), (this.offsetPixel.y % 24) + 24, this.offsetPixel.width, this.offsetPixel.height);
      this.overlayContext.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24) + 24, (this.offsetPixel.y % 24) + 24, this.offsetPixel.width, this.offsetPixel.height);
      this.overlayContext.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24) + 48, (this.offsetPixel.y % 24) + 24, this.offsetPixel.width, this.offsetPixel.height);
      this.overlayContext.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24) - 24, (this.offsetPixel.y % 24) + 48, this.offsetPixel.width, this.offsetPixel.height);
      this.overlayContext.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24), (this.offsetPixel.y % 24) + 48, this.offsetPixel.width, this.offsetPixel.height);
      this.overlayContext.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24) + 24, (this.offsetPixel.y % 24) + 48, this.offsetPixel.width, this.offsetPixel.height);
      this.overlayContext.drawImage(this.pasteImage, (this.cropPixel.x % 24), (this.cropPixel.y % 24), this.cropPixel.width, this.cropPixel.height, (this.offsetPixel.x % 24) + 48, (this.offsetPixel.y % 24) + 48, this.offsetPixel.width, this.offsetPixel.height);
    }
  }], {
    name: "Help!",
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAK5JREFUSA3VkVEOgCAMQ9V4/yurMzYhY6UD8UN/FqHtK7AsH39rMv8gOulXAhbseTSHblwJPtxr1f5dwpvQrDQzTUq7QUWmCjdbUxMByvaES5crbwSAu9kMomdS7e6E9kvFgVYutU4gzRnBLEB194DPAiCvut4ZANreqBURVRLTB4dZ4eKscMsZAZTNpf/NG8hwO0EvoGxvfvn1AhCYam/iUQBA/5v2Bl3v8P8rOgGHvxAlq6ZCxQAAAABJRU5ErkJggg==",
    help: {description: "shows you this helpful information window"},
    activate() {
      this.help = this.help || Tools.reduce((str, tool) => {
        console.log(str, tool)
        if (!tool[0]) {tool = [tool]}
        return str + tool.reduce((str2, option) => {
          console.log(str2, option);
          if (option.help) {
            return str2 + "<br>The <span class='name'>" + option.name + "</span> tool <span class='desc'>" + option.help.description + ".</span><ul>" +
            (option.help.alt ? "<li>Hold Alt to " + option.help.alt + "</li>" : "") +
            (option.help.cmd ? "<li>Hold Cmd/Ctrl to " + option.help.cmd + "</li>" : "") +
            (option.help.note ? "<li class='note'>Note: " + option.help.note + "</li>" : "") +
            "</ul>";
          }
          return str2;
        }, "")
      }, "<br>Drag the three dots to move windows around.<br><br>Scroll to zoom.<br><br>Click on the color palette to select a color.<br>");
      var el = document.getElementById("help");
      el.parentElement.classList.add("visible");
      el.innerHTML = this.help;
      return false;
    }
  }
]
