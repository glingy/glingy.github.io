/*function player(plyrnum) {
  this.plyrnum = plyrnum;
  this.speed = 1;
  this.x = plyrnum == 1 ? 770 : 10;
  this.y = 250;
  this.dir = 0;
  this.score = 0;
  this.id = "plyr" + this.plyrnum;
  this.me = document.getElementById(this.id);
  this.scoreboard = document.getElementById('p' + plyrnum + 'score');
  this.cy = function(yc) {
    this.y += yc;
    this.me.style.top = this.y;
  };
  this.movee = function() {
    this.cy(this.dir * this.speed);
  };
  this.up = function() {
    this.dir = -1;
  };
  this.dwn = function() {
    this.dir = 1;
  };
  this.released = function(dir) {
    if (this.dir == dir || dir == 0) {
      this.dir = 0;
    }
  };
  this.scored = function() {
    this.score += 1;
    this.scoreboard.innerHTML = this.score;
  }
};

function ballc() {
  this.x = 390;
  this.y = 290;
  this.nx = 390;
  this.ny = 290;
  this.speed = 1;
  this.ang = 0.5; // slope (m) of a line in the direction the ball is moving
  this.dir = 1; // 1 or -1 -- 1 is in the positive x, -1 is negative x
  this.me = document.getElementById('ball');
  this.hitpaddle = function() {
    return (((this.nx <= 30 && this.nx >= 28) && (this.ny > plyr2.y - 10 && this.ny < plyr2.y + 110)) || ((this.nx >= 750 && this.nx >= 752) && (this.ny > plyr1.y - 10 && this.ny < plyr1.y + 110)));
  };
  this.score = function() {
    return (this.nx <= 0 || this.nx >= 780);
  };
  this.hitwall = function() {
    return (this.ny <= 0 || this.ny >= 580);
  };
  this.calculatexy = function() {
      this.nx = this.x + (this.dir * this.speed);
      this.ny = this.y + (this.dir * this.ang * this.speed);
      if (this.score()) {
        if (this.nx < 50) {
          plyr1.scored();
        } else {
          plyr2.scored();
        }
        this.dir *= -1;
        this.ang *= -1;
        this.speed = 1;
        this.nx = 390;
        this.ny = 290;
      } else if (this.hitpaddle()) {
        this.dir *= -1;
        this.ang = (Math.random() * 1.8) - 0.9;
        this.speed += 0.5;
      } else if (this.hitwall()) {
        this.ang *= -1;
      }
  };

  this.moveee = function() {
    //debugtext('got to moveee:' + args[0]);
    this.calculatexy();
    this.x = this.nx;
    this.y = this.ny;
    this.me.style.top = '' + this.y + 'px';
    this.me.style.left = '' + this.x + 'px';
    //debugtext('finished moveee:' + this.x + ", " + x);
  };
}

function AI(plyr) {
  this.plyr = plyr;
  this.plyrnum = plyr.plyrnum;
  this.goal = this.plyrnum == 1 ? 'D' : 'R'; // actively defend or ready for defense
  this.mode = 'M'; // Move or Wait
  this.balley = null; // ball ending y (fact)
  this.ballpy = null; // ball predicted y (probability)
  this.goingy = 250; // where am I going?
  this.ugoal = function() {
    if (ball.dir == 1) { // towards p1
      this.goal = this.plyrnum == 1 ? 'D' : 'R';
    } else {
      this.goal = this.plyrnum == 1 ? 'R' : 'D';
    }
  };
  this.movee = function() {
    document.getElementById('debugt').innerHTML = this.balley;
    if (this.goingy < this.plyr.y) {
      this.plyr.up();
    } else if (this.goingy > this.plyr.y) {
      this.plyr.dwn();
    } else {
      this.plyr.released(0);
    }
  };
  this.update = function() {
    this.ugoal();
    if (this.goal == 'D') {
      this.balley = this.balley === null ? (((this.plyr.plyrnum == 1 ? ball.ang * 760 - ball.x : -ball.ang * ball.x - 30)) + ball.y) : this.balley; // finish bouncing problem
      this.balley = this.balley < 0 ? this.balley * -1 : (this.balley > 580 ? 580 - (this.balley - 580) : this.balley);
      this.goingy = this.balley < 290 ? this.balley : this.balley - 80; // as close to the edge of paddle as possible
    } else {
      this.balley = null;
      // finish later
    }
    this.movee();
  };
}


function runtimeloop() {
  plyr1.movee();
  plyr2.movee();
  ball.moveee();
  p1AI.update();
}

function init() {
  plyr1 = new player(1);
  plyr2 = new player(2);
  ball = new ballc();
  p1AI = new AI(plyr2);
  setInterval(runtimeloop, 0);
  $("body").keydown(function(event) {
    if (event.which == 38) {
      plyr1.up();
    } else if (event.which == 40) {
      plyr1.dwn();
    } /*else if (event.which == 83) {
      plyr2.up();
    } else if (event.which == 88) {
      plyr2.dwn();
    }* /
  });
  $("body").keyup(function(event) {
    if (event.which == 38) {
      plyr1.released(-1);
    } else if (event.which == 40) {
      plyr1.released(1);
    } /*else if (event.which == 83) {
      plyr2.released(-1);
    } else if (event.which == 88) {
      plyr2.released(1);
    }* /
  });
}

$(document).ready(function() {
  document.getElementById('opening').focus();
  init();
});*/

function player(plyrnum) {
  this.plyrnum = plyrnum;
  this.speed = 1;
  this.x = plyrnum == 1 ? 770 : 10;
  this.y = 250;
  this.dir = 0;
  this.score = 0;
  this.id = "plyr" + this.plyrnum;
  this.me = document.getElementById(this.id);
  this.scoreboard = document.getElementById('p' + plyrnum + 'score');
  this.cy = function(yc) {
    this.y += yc;
    this.me.style.top = this.y;
  };
  this.movee = function() {
    this.cy(this.dir * this.speed);
  };
  this.up = function() {
    this.dir = -1;
  };
  this.dwn = function() {
    this.dir = 1;
  };
  this.released = function(dir) {
    if (this.dir == dir || dir == 0) {
      this.dir = 0;
    }
  };
  this.scored = function() {
    this.score += 1;
    this.scoreboard.innerHTML = this.score;
  }
};

function ballc() {
  this.x = 390;
  this.y = 290;
  this.nx = 390;
  this.ny = 290;
  this.speed = 1;
  this.ang = 0.5; // slope (m) of a line in the direction the ball is moving
  this.dir = 1; // 1 or -1 -- 1 is in the positive x, -1 is negative x
  this.me = document.getElementById('ball');
  this.hitpaddle = function() {
    return (((this.nx <= 30 && this.nx >= 28) && (this.ny > plyr2.y - 10 && this.ny < plyr2.y + 110)) || ((this.nx >= 750 && this.nx >= 752) && (this.ny > plyr1.y - 10 && this.ny < plyr1.y + 110)));
  };
  this.score = function() {
    return (this.nx <= 0 || this.nx >= 780);
  };
  this.hitwall = function() {
    return (this.ny <= 0 || this.ny >= 580);
  };
  this.calculatexy = function() {
      this.nx = this.x + (this.dir * this.speed);
      this.ny = this.y + (this.dir * this.ang * this.speed);
      if (this.score()) {
        if (this.nx < 50) {
          plyr1.scored();
        } else {
          plyr2.scored();
        }
        this.dir *= -1;
        this.ang *= -1;
        this.speed = 1;
        this.nx = 390;
        this.ny = 290;
      } else if (this.hitpaddle()) {
        this.dir *= -1;
        this.ang = (Math.random() * 1.8) - 0.9;
        this.speed += 0.5;
      } else if (this.hitwall()) {
        this.ang *= -1;
      }
  };

  this.moveee = function() {
    //debugtext('got to moveee:' + args[0]);
    this.calculatexy();
    this.x = this.nx;
    this.y = this.ny;
    this.me.style.top = '' + this.y + 'px';
    this.me.style.left = '' + this.x + 'px';
    //debugtext('finished moveee:' + this.x + ", " + x);
  };
}

function AI(plyr) {
  this.plyr = plyr;
  this.plyrnum = plyr.plyrnum;
  this.goal = null; // actively defend or ready for defense
  this.mode = 'M'; // Move or Wait
  this.balley = null; // ball ending y (fact)
  this.ballpy = null; // ball predicted y (probability)
  this.goingy = 250; // where am I going?
  this.ugoal = function() {
    if (ball.dir == 1) { // towards p1
      document.getElementById('debugt').innerHTML = this.balley;
      this.goal = this.plyrnum == 1 ? 'D' : 'R';
    } else {
      this.goal = this.plyrnum == 1 ? 'R' : 'D';
    }
  };
  this.movee = function() {
    if (this.goingy < this.plyr.y) {
      this.plyr.up();
    } else if (this.goingy > this.plyr.y) {
      this.plyr.dwn();
    } else {
      this.plyr.released(0);
    }
  };
  this.update = function() {
    this.ugoal();
    if (this.goal == 'D') {
        if (this.goingy == 250) {
          this.balley = this.balley === null ? (((this.plyr.plyrnum == 1 ? ball.ang * (760 - ball.x) : -ball.ang * (ball.x - 30))) + ball.y) : this.balley; // finish bouncing problem
          this.balley = this.balley < 0 ? this.balley * -1 : (this.balley > 580 ? 580 - (this.balley - 580) : this.balley);
          this.goingy = this.balley < 290 ? this.balley : this.balley - 80; // as close to the edge of paddle as possible
        }
    } else {
      this.balley = null;
      this.goingy = 250;
      // finish later
    }
    this.movee();
  };
}


function runtimeloop() {
  plyr1.movee();
  plyr2.movee();
  ball.moveee();
  //if (p1AI) {p1AI.update();}
  p2AI.update();
}

function init() {
  plyr1 = new player(1);
  plyr2 = new player(2);
  ball = new ballc();
  //p1AI = new AI(plyr1);
  p2AI = new AI(plyr2);
  setInterval(runtimeloop, 0);
  $("body").keydown(function(event) {
    if (event.which == 38) {
      plyr1.up();
    } else if (event.which == 40) {
      plyr1.dwn();
    } else if (event.which == 83) {
      plyr2.up();
    } else if (event.which == 88) {
      plyr2.dwn();
    }
  });
  $("body").keyup(function(event) {
      if (event.which == 38) {
        plyr1.released(-1);
      } else if (event.which == 40) {
        plyr1.released(1);
      }
      if (event.which == 83) {
        plyr2.released(-1);
      } else if (event.which == 88) {
        plyr2.released(1);
      }
  });
}

$(document).ready(function() {
  document.getElementById('opening').focus();
  init();
});
