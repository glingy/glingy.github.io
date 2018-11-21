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
    this.tileMap = new Array(this.rows).fill(0).map(a => new Array(this.cols).fill(0));
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
      for (var i = 0; i < this.sprites.length; i++) {
        if (this.sprites[i].update() == "REMOVE") {
          this.sprites.splice(i, 1);
          i--;
          continue;
        }
        this.tileIndex.drawSprite(this.sprites[i].x, this.sprites[i].y, this.sprites[i].width, this.sprites[i].height, this.sprites[i].tileID, this.foreground);
      }
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
  drawSprite(x, y, width, height, id, canvas) {
    canvas.drawImage(this.tileSheet, this[id].x, this[id].y, width, height , x, y, width, height);
    canvas.fillStyle = "#" + ((Math.floor(Math.random()*4095)).toString(16) + "000").slice(0, 3);
    //canvas.fillRect(x, y, width, height);
  }
  drawTile(x, y, id, canvas) {
    this.drawSprite(x * 24, y * 24, 24, 24, id, canvas);
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
  new TileIndex(24, 24, 2, 3,"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAwCAYAAACynDzrAAAAAXNSR0IArs4c6QAABElJREFUaAXtmW2SmzwQhNkt/81R3nulcgH7COsL5DbvKXIgh4Y80AxCEmBSJmVVkfnqaWkGCbzko/nRPBof/7XGL3e0evSlbFLIBfOz+SCUk9frdbKO+/1elSfONrHLbROqc3Jr8dhnZ6gYXQy3ox+MJDE1hcZ4fKV+/7o3utYMNef/NkEXjVqTX8L2DaI4FRyLjTYYl8wCj2zXiZ9QXoY1pwqiCQK5PiT9UTwW9Yh9sq1jxc75O0dMBVKkmibdR7RpbPR7zsG6GnNEc7Ts9A7yotGRyorN8Jjrwp589M8gFRGLdtt1NYAr5jnOdeFOOvodlLrr0ecFKyY71aiIO2ljWHbfIIqiYGyh8JERJY0C63Hncf+J9OlrnoWrKRpILzTqYIT3mOdLP+n4HIqiUIqUHXVspOegqxGKg5F94vHZ7ZJcMcTUAG+CdGI0IMbxF6T+zPBf0NLjnx4FisPC6bcYhXvBvoQlf8zD9tygx+YQfpUmjc8gikbG4rCJU4lLxYTjymE974X1/hlE8UgVRnFIigAjSQwpjHS35TvxGHcQRdAA2dLdBiOpJngMHfmPNGl8BlG0pBdJoUjFNYShSehdYN0/+u5zvV1nSfKt+SY0I3iS4zIcB4qkaE2AD5maNDbObeVVjK5JzfYPZhVTbIZchibUUtAApPJohHy5ZmbmeIXdklpe/zsoRrx4j9GIKIXx5hBf4nHOF9fHZxDFUBxFu5SuOFjZPvAjnctxJ9LH1/xSMe5X4brw0Qj3EUOeqBmppfZHjMJBLBUX/dFWPs2KnHCfTI47iIV7YTQA6Rh0pPIYruM7qbw037v/Ujpu+d9ux07w9XXc2lvm/iF9u/WT1MgajNjASaeIGlmDcU7pGsxXkiux41usm+X9z7wDj8ej/fjSX+g5mYuJh7jr8uEvyZi3ZDvPUfwtb/9Nmm09b982T+Rj229jm2dFvmjPM9Z54Ovq4E7oTi3dLfe7Tm6UKS5hIi5lp3xxzsiFXZsb+aLtfJNFP3OCOKnslC/OuQUDx5bcVA4+8U4aRCAnczEWukduyV2TsxLbv8XiM2PdiU2jnZMznUZu8zqn69vY5lkDJx2t3RngSzLylfDEY96SDV6SawnrftedI/rhfB+xtsGxOdhtk94/FOeHa+J5N2jSjrnxbtC8J8HDg4pzV5LgSzLylPDEY96SDV6SawnrftedI/rhHMhzYE92PZfDBMJz5fDw1mDgIwe7JrcGY3z9ERve+WF37TGd038T7eH0XOd03TF79IHTO+q63x33u74Ws4R3v+tLc0UMuOhP2Skf+UgwsoffQXISyMlczCeIOMWI52QuBmfkwq7NhWdJOt/kGXTEBFqEX6U5lhbt/hQfvmfyt1z99yCeF8O523N429zIBy/+nfTDJ1z4juLv1lnqeIz7nYyxZ9hbONbkrMS+fygWdvNH9wwqgHaFOQa7SDLJHK8MZE/oNyZYUT210JW8AAAAAElFTkSuQmCC")
);

for (var i = 0; i < 10; i++) {
  world.addSprite(new Sprite(i * 24, 216, 24, 24, 1, function() {
    if (this.z == undefined) {this.z = 0;}
    if (this.z++ == 30) {
      this.z = 0;
      world.addSprite(new Sprite(this.x + 10, this.y + 10, 4, 4, 2, function() {
        if (this.y-- < -2) {
          return "REMOVE";
        }
      }))
    }
  }));
}

world.addSprite(new Sprite(24, 24, 24, 24, 3, function() {
  if (this.d === undefined) {
    this.d = 0;
  }
  if (this.d++ == 20) {
    this.tileID = this.tileID == 3 ? 5 : 3;
    this.d = 0;
  }
}))
world.beginAnimation();
