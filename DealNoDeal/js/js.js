var value = [0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var calcvals = [];
var caseapos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // which case is at position [__]?
var winh = 0; // window height
var winw = 0; // window width
var xsw = 0;  // x separator width
var isl = 0;  // image side length
var ysh = 0;  // y separator height
var off = 0;  // x left offset
var selc = -2; // number of cases to select
var chcse = -1; // chosen case
var stage = 0; // what stage are we in? 0 --> choosing case, 1 --> 6, 2 --> 4, 3 --> 3, 4 --> 1, 5 --> reveal your case.
var startt = 0;


function alert(txt) {
  if (isNaN(txt) == isNaN("Hello")) {
    $("#innerAlert").html(txt);
  } else {
    $("#innerAlert").html("Select " + txt + " donut" + (txt == 1 ? "" : "s") + ".");
  }
}


function resizeCalc() {
  winw = window.innerWidth*0.8;
  winh = window.innerHeight*0.9;
  ysh = winh * 0.05;
  isl = (winh * 0.75)/4;
  xsw = (winw - (4 * isl))/5;
  off = window.innerWidth * 0.1;
}

function resizeView() {
  var obj;
  var casenum;
  var tmp;
  for (var i = 0; i < 16; i++) {
    casenum = caseapos[i];
    obj = document.getElementById("cd" + casenum);
    obj.style.height = isl;
    obj.style.width = isl;
    tmp = i%4;
    obj.style.left = (xsw * ((tmp)+1)) + (isl * (tmp)) + off;
    tmp = Math.floor(i/4);
    obj.style.top  = (ysh * ((tmp)+1)) + (isl * (tmp));
    obj.style.fontSize = isl * 0.75;
    obj.children[0].children[0].style.textShadow = "0px 0px "+ (winh/55) + (chcse == casenum ? "px #00FF00" : "px #FFFFFF");
  }
  obj = document.getElementById("alert").style;
  winw = window.innerWidth;
  var bw = (window.innerHeight*0.2)/10;
  obj.height = window.innerHeight*0.1 - bw;
  obj.width  = winw-2*bw;
  obj.left   = 0;
  obj.top    = winh-bw;
  obj.borderWidth = bw;
  obj.fontSize = bw*4;
  obj = document.getElementById("innerAlert").style;
  obj.top = (window.innerHeight*0.1 - 6*bw)/2;
  obj.width = winw - 2*bw;
  bw /= 2;
  for (var i = 0; i < 16; i++) {
    obj = document.getElementById("l" + (i+1));
    obj.style.width = xsw*1.6;
    obj.style.left = i < 8 ? xsw*0.1 : window.innerWidth-(xsw*1.6)-(xsw*0.1)-(2*bw);
    tmp = winh/17;
    obj.style.top = (((i%8)+1)*2-1)*tmp - tmp/2;
    obj.style.height = tmp*1.5;
    obj.style.borderWidth = bw;
    obj.style.fontSize = bw*10;
    obj.children[0].innerHTML = value[i];
    obj.style.opacity = document.getElementById("cd" + i).style.display == "none" ? "0.2" : "1";
  }
}

function resize() {
  resizeCalc();
  resizeView();
}

function showPosNum() {
  for (var i = 0; i < 16; i++) {
    $("#cd" + (caseapos[i]) + " span").html(i+1);
  }
}

function start() {
  alert("These are the amounts available.");
  for (var i = 0; i < 16; i++) {
    $("#cd" + (caseapos[i]) + " span").html(value[caseapos[i]]);
  }
}




function rtdnt(dntar) { // rotate donuts in array toward 0. (switch places or rotate.) input: donut positions to be rotated.
  var tmp = caseapos[dntar[0]];
    for (var i = 1; i < dntar.length; i++) {
      caseapos[dntar[i-1]] = caseapos[dntar[i]];
    }
    caseapos[dntar[dntar.length-1]] = tmp;
}

// mixing functions ******************************************************

function finished() {
  showPosNum();
  selc = -1;
  alert("Select your donut.");
}


//anim. movements
function anim() {
  for (var i = 0; i < 16; i++) {
    casenum = caseapos[i];
    var left = ((xsw * ((i%4)+1)) + (isl * (i%4))+off) + "px";
    var tmp = Math.floor(i/4);
    var top  = ((ysh * ((tmp)+1)) + (isl * (tmp))) + "px";
    $("#cd" + casenum).animate({
      top: top,
      left: left
    }, {
      duration: 125,
      queue: true
    });
  }
}

//hor. swap
function hswap() {
  rtdnt([0,1]);
  rtdnt([4,5]);
  rtdnt([8,9]);
  rtdnt([12,13]);

  rtdnt([2,3]);
  rtdnt([6,7]);
  rtdnt([10,11]);
  rtdnt([14,15]);
  anim();
}

function vswap() {
  rtdnt([0,4]);
  rtdnt([1,5]);
  rtdnt([2,6]);
  rtdnt([3,7]);

  rtdnt([8,12]);
  rtdnt([9,13]);
  rtdnt([10,14]);
  rtdnt([11,15]);
  anim();
}

function rcl() { // rotate outside clockwise
  rtdnt([4,8,12,13,14,15,11,7,3,2,1,0]);
  rtdnt([10,9,5,6]);
  anim();
}

function rccl() { // rotate outside clockwise
  rtdnt([0,1,2,3,7,11,15,14,13,12,8,4]);
  rtdnt([6,5,9,10]);
  anim();
}

function rspcl() {
  rtdnt([0,4,5,1]);
  rtdnt([2,6,7,3]);
  rtdnt([8,12,13,9]);
  rtdnt([10,14,15,11]);
  anim();
}

function rspccl() {
  rtdnt([1,5,4,0]);
  rtdnt([3,7,6,2]);
  rtdnt([9,13,12,8]);
  rtdnt([11,15,14,10]);
  anim();
}

var moves = [hswap, vswap, rspcl, rspccl, rcl, rccl];

function mix() {
  $(".cd span").html("");
  for (var i = 0; i < 75; i++) {
    moves[Math.floor(Math.random() * 6)]();
  }
  $("#cd1").animate({left: "-=0px"}, {done: finished});
}
// *******************************************************************

function init() {
  calcvals = value.concat([]);
  resize();
  start();
}

var dnp = 0; // now to halt action
var rdnp = 0; // real deal in progress

function deal() {
  var tmppp = (Math.floor(2*((calcvals.reduce(function(a,b) {return a+b;}, 0)/calcvals.length)))/2);
  alert("We will give you " + tmppp + " donut" + (tmppp == 1 ? "" : "s") + ". Deal or No Deal?");
  rdnp = 1;
}

function finish() {
  alert("You won...");
  animdntrev(chcse, 1);
  for (var i = 0; i < 16; i++) {
    if (document.getElementById("cd" + i).style.display == "none") {
      if (i != chcse) {
        document.getElementById("cd" + i).style.display = "none";
        document.getElementById("l" + i).style.opacity = "0.2";
      }
    }
  }
  dntsel = function(a) {return a;};
}

var finishh = 0;

function animdntrev(adnt, test) { // animate donut reveal
  dnp = 1;
  var h = 4 * isl;
  var l = (winw - 4*isl)/2;
  var t = (winh - 4*isl)/2;
  var fs = h * 0.75;
  console.log("!! "+adnt+" !!");
  console.log($("#cd" + adnt));
  console.log($("#cd" + adnt + " span"));
  $("#cd" + adnt + " span").html("");
  $("#cd" + adnt).animate({
    left: l,
    top: t,
    height: h,
    width: h,
    fontSize: fs
  }, {
    duration: 3000,
    done: function() {
      $("#cd" + adnt + " span").html(value[adnt]);
      alert(test == 1 ? "" + value[adnt] + " donut" + (value[adnt] == 1 ? "" : "s") + "!!!!!" : "Value: " + value[adnt] + " donut" + (value[adnt] == 1 ? "" : "s") + ".");

      if (test !== 1) {
      deld(adnt);

      // deopacify
      setTimeout(function() {
        resize();
        document.getElementById("cd" + adnt).style.display = "none";
        for (var i = 0; i < 16; i++) {
          console.log("i: " + i + ", adnt: " + adnt);
          if (caseapos.indexOf(i) == -1 || i == adnt) {
            console.log(caseapos.indexOf(i));
          } else {
            $("#cd" + i).animate({opacity: 100}, 3000);
          }
        }
        var tmpp = adnt == 15 ? 14 : adnt + 1;
        //setTimeout(function() {
          if (selc == 0) {
            selc = (stage == 1 ? 4 : (stage == 2 ? 3 : 1));
            alert(selc);
            deal();
            stage++;
            if (stage == 5) {
              console.log("I know!!!!");
              finishh = 1;
            }
          } else {
            alert(selc);
          }
          resize();
          dnp = rdnp ? 1 : 0;
        //}, 3000);
      }, 3000);
      }
    }
  });

  // opacify the rest
  for (var i = 0; i < 16; i++) {
    console.log("i: " + i + ", adnt: " + adnt);
    if ((caseapos.indexOf(i) == -1) || i == adnt) {
      console.log(caseapos.indexOf(i));
    } else {
      $("#cd" + i).animate({opacity: 0}, {duration: 3000});
    }
  }
}

function deld(rdnt) { // delete donut
  calcvals.splice(calcvals.indexOf(value[rdnt]),1);
  //caseapos[caseapos.indexOf(rdnt)] = undefined;
}

function anr(dnt, test) {// announce and remove
  animdntrev(caseapos[dnt], test);
}


function dntsel(dnt) {
  console.log(caseapos);
  console.log(value);
  console.log(dnt);
  dnt = caseapos.indexOf(dnt);
  console.log(dnt);
  if (caseapos[dnt] == chcse) {
    console.log(caseapos[dnt] + "   " + chcse);
    return 0;
  }
  if (dnp == 1) {
    return 0;
  }
  if (selc === -1){
    alert("Your donut is number " + dnt);
    //document.getElementById("cd" + (caseapos[dnt])).style.backgroundColor = "#00FF00";
    chcse = caseapos[dnt];
    resize();
    deld(dnt);
    //caseapos[dnt] = undefined;
    selc = 6;
    alert("Now select 6 donuts.");
    stage++;
  } else if ((selc >= 1 ) && (dnt != -1)){
    anr(dnt);
    selc--;
  }
}

// Key checker
var keys = [49,50,51,52,81,87,69,82,65,83,68,70,90,88,67,86];


function key(e) {
  var k = keys.indexOf(e.keyCode);
  console.log("" + k + ", " + e.keyCode);
  console.log(e);
  if (k == -1) {
    if (e.keyCode == 78) {
      alert("No Deal.");
      if (!finishh) {
        setTimeout(function() {
          alert(selc);
        }, 2000);
      } else {
        finish();
      }
      dnp = 0;
      rdnp = 0;
    } else if (e.keyCode == 66){
      dnp = 1;
      var tmppp = (Math.floor(2*((calcvals.reduce(function(a,b) {return a+b;}, 0)/calcvals.length)))/2);
      alert("You won " + tmppp + " donut" + (tmppp == 1 ? "" : "s") + "!");
      dntsel = function(a) {return a;};
    } else if (e.keyCode == 32 && startt === 0) {
      startt = 1;
      alert("Follow the donuts...");
      setTimeout(mix, 2000);
    }
  } else {
    if (document.getElementById("cd" + caseapos[k]).style.display != "none") {
      console.log(document.getElementById("cd" + caseapos[k]).style.display);
      dntsel(caseapos[k]);
    }
  }
}
