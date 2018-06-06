 class World {
  constructor(background, foreground, tileIndex) {
    this.width = background.width;
    this.height = background.height;
    this.rows = Math.floor(this.height/tileIndex.tileHeight);
    this.cols = Math.floor(this.width/tileIndex.tileWidth);
    this.sprites = [];

    this.tileIndex = tileIndex;
    this.background = background.getContext("2d");
    this.foreground = foreground.getContext("2d");
    this.i = 10;
    this.d = 0;
    this.tileMap = new Array(this.rows).fill(1).map(a => new Array(this.cols).fill(1));
    this.tileMap.forEach((row, x) => {row.forEach((tile, y) => {
      this.tileIndex.drawTile(x, y, tile, this.background)
    })})
    this._animationLoop();
  }
  setTile(x, y, tileID) {
    this.tileMap[y][x] = tileID;
  }
  getTile(x, y) {
    return this.tileMap[y][x];
  }
  addSprite(sprite) {
    this.sprites.push(sprite);
    return this.sprites.length - 1;
  }
  getSprite(id) {
    return this.sprites[id];
  }
  beginAnimation() {
    this.animating = true;
    this._animationLoop();
  }
  stopAnimation() {
    this.animating = false;
  }
  _animationLoop() {

    if (this.i-- <= 0) {
      this.foreground.clearRect(0, 0, this.width, this.height);
      this.sprites.forEach(s => {
        s.update()
        this.tileIndex.drawSprite(s.x, s.y, s.tileID, this.foreground);
      });
      this.i = this.d;
    }
    if (this.animating) {
      requestAnimationFrame(() => {this._animationLoop()})
    }
  }
}


class TileIndex extends Array {
  constructor(tileWidth, tileHeight, rows, cols, tileSheet) {
    super();
    for (var y = 0; y < rows; y++) {
      for (var x = 0; x < cols; x++) {
        this.push({x: x * tileWidth, y: y * tileHeight, id: this.length})
      }
    }
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.tileSheet = document.createElement("img");
    this.tileSheet.src = tileSheet;
  }
  drawSprite(x, y, id, canvas) {
    canvas.drawImage(this.tileSheet, this[id].x, this[id].y, this.tileWidth, this.tileHeight, x, y, this.tileWidth, this.tileHeight);
  }
  drawTile(x, y, id, canvas) {
    this.drawSprite(x * 24, y * 24, id, canvas);
  }
}

class Sprite {
  constructor(x = 0, y = 0, width = 24, height = 24, tileID = 0, updateHandler = (() => {})) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.tileID = tileID;
    this.update = updateHandler;
  }
}

let world = new World(document.getElementsByTagName("canvas")[0], document.getElementsByTagName("canvas")[1],
  new TileIndex(24, 24, 2, 2,"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAlxJREFUaAXtmIGN2zAMRXNF1uliXcAdoR6qU3Sgq16iV3wTDqK0Z+MKSIBC8pMS/6eDS3Jvl8G1LMt7lq7r+pbxQ//bZXPu8rVV/irVFduLPeLZXvNFfMSuP9YL++VFM7Yr44pbgzUHaYlnvvkvCShnx0ObQ6iSqbE1ae3kPcTdP0eADZMAmBPWr2LAWbXujt7wcwRAQBL6khUPUro3q+ha14uum+IjA4nQQx9S+lrylWzm0m+l5zyBPVJJMn0Iuuu5rOv+eU8AMrnKJDdTJwfBPSEpouXPFyA5xSRJsbQKAaM2V8ud8xaqjY21OdXqWwPxzBG33PECbCqRjKtvrM0z+grpNUMC+BqRn8D49asF9+4uGktor8AcdUly71zNtyNPBVTycnhJBIckmn4S8mLsI9w7zLf4qYC89699GtpUKxkvNTYvnpYcde4WHy/AZhBJkhLVkmdZgzWnJY8f8fECbIplSVA/41tBf4Fk5vS1XcRTAXzvX74vefXNBxv+TeBpJ5ckxLTWUgOG1TcXduxHSTtQ/+oMk/cHTZLQrxZie1gQ3ritdviTeJjwpkMQqvij2CehpQ5RLJ9I5J6+he4n/+E1mv25ZQ8jKdFqySV58w07XgDNWZK2eWLmwMhnDOYS17ba4wVAyC2RtORcEGOLSTQxc90eL0BSkoGsJPBzVbzG1Cqm33u8AEgkEQVBRlwLxkqxd2SL1Xz7x80729r/yV4h/rMzxm8fDMOfDZ9B6PFvoTNUMnn2Gb1mjzmBOYE5gTmBOYE5gTmBOYE5gTmBOYE5gTmBOYGPmcBva+mqB3usYyUAAAAASUVORK5CYII=")
);

for (var i = 0; i < 10; i++) {
world.addSprite(new Sprite((i % 30) * 5, Math.floor(i / 30)*5, 24, 24, 0, function() {
  if (this.dx === undefined) {
    this.dx = 4;
  }

  this.x += this.dx;

  if (this.x > world.width || this.x < 0) {
    this.dx = -this.dx;
  }
}));
}
world.beginAnimation();
