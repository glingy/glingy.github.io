var cpz = 0;
var cpl = 1;
var cmoney = 600;
var cplva = [0, 0, 0, 0];
var tplva = [0, 0, 0, 0];
var turnlost = 0;
include("keys.js");
include("puzzles.js")
include("spinner.js");
include("letter.js");

function rvltoc(t) {
  cplva = [0, 0, 0, 0];
  gel("p1").className = "p";
  gel("p2").className = "p";
  gel("p3").className = "p";
  setTimeout(function() {
    gel("p1").className = "p anim";
    gel("p2").className = "p anim";
    gel("p3").className = "p anim";
    setTimeout(function() {
      gel("p1").children[1].innerHTML = t?tplva[1]:cplva[1];
      gel("p2").children[1].innerHTML = t?tplva[2]:cplva[2];
      gel("p3").children[1].innerHTML = t?tplva[3]:cplva[3];
    }, 500);
  }, 10);
}


function incrementP() {
  document.getElementById("p"+cpl).style.boxShadow = "5px 5px 15px black";
  if (((cpl + 1) > 3 ? 1 : (cpl+1)) == turnlost) {
    cpl = ((cpl + 1) > 3 ? 1 : (cpl+1));
    gel("p" + cpl).className = "p";
    setTimeout(function(c) {
      gel("p" + c).className = "p anim";
    }.bind(null, cpl), 10);
    turnlost = 0;
  }
  cpl = (cpl + 1) > 3 ? 1 : (cpl+1);
  document.getElementById("p"+cpl).style.boxShadow = "-5px -5px 15px white";
};

function updateM(t) {// t current(0) or total(1)
  var marray = t ? tplva : cplva;
  document.getElementById("p1").children[1].innerHTML = marray[1];
  document.getElementById("p2").children[1].innerHTML = marray[2];
  document.getElementById("p3").children[1].innerHTML = marray[3];
}

function stop(whichh) {
  var audio = document.getElementById(whichh);
    audio.pause();
    audio.currentTime = 0;
}

function play(whichh) {
  var audio = document.getElementById(whichh);
    if (audio.paused) {
        audio.play();
    }else{
        audio.currentTime = 0;
    }
}
