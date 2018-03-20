var spinInt;
var spindeg = 10;
var cdeg = 0;
var cdec = 10; //current decrease
var slow = 0;
var spinning = 0;
var whlvals = [1, 300, 400, 600, 0, 900, 700, 500, 900, 300, 400, 550, 800, 500, 300, 600, 300, 0, 600, 300, 700, 450, 350, 800];

function showSpinner() {
  gels("othercontainer").visibility = "visible";
}

function hideSpinner() {
  gels("othercontainer").visibility = "hidden";
  gel("othercontainer").children[0].style.transform = "translateX(-50%) rotateZ(" + cdeg + "deg)";
}

function setVal() {
  var wrk = cdeg%360;
  cdeg = 0;
  var wrkk = Math.floor((wrk+7)/15);
  console.log(wrkk + " " + whlvals[wrkk]);
  if (whlvals[wrkk] == 0) {
    play("bkrpt");
    tplva[cpl] = 0;
    incrementP();
  } else if (whlvals[wrkk] == 1){
    play("bkrpt");
    turnlost = cpl;
    incrementP();
  } else {
    cmoney = whlvals[wrkk];
    setTimeout(hideSpinner, 2000);
  }
}

function spin() {
  if (slow) {
    if (cdec === 10) {cdeg += 5}
    if (cdec <= 0) {console.log(cdeg); cdec = 10; slow = 0; clearInterval(spinInt); setTimeout(setVal, 0); return;}
    cdec -= 0.05;
    cdeg += cdec;
  } else {
    cdeg += spindeg;
  }
  gel("othercontainer").children[0].style.transform = "translateX(-50%) rotateZ(" + cdeg + "deg)";
}

function startSpin() {
  play("spnr");
  setTimeout(function() {
    spinning = 1;
    spinInt = setInterval(spin, 20);
    console.log(spinInt);
  }, 500);
}

function stopSpin() {
  setTimeout(stop.bind(null, "spnr"), 500);
  play("sdwn");
  spinning = 0;
  console.log(cdeg);
  slow = 1;
  console.log(cdeg);
}
