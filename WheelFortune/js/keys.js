var spaceaction = incrementP;

function key(e) {
  if (String.fromCharCode(e.which).match(/[a-z]/)) {
    var ltr = String.fromCharCode(e.which);
    rvlltr(ltr.toUpperCase());
  } else if (e.which == 32) {
    if (spaceaction) spaceaction();
  } else if (String.fromCharCode(e.which).match(/[1-3]/)) {
    console.log(cpl);
    var pl = String.fromCharCode(e.which);
    console.log(pl);
    document.getElementById("p"+cpl).style.boxShadow = "5px 5px 15px black";
    document.getElementById("p"+pl).style.boxShadow = "-5px -5px 15px white";
    cpl = pl;
  } else if (e.which == 13) {
    console.log("start/stop");
    if (spinning) {
      stopSpin();
    } else {
      startSpin();
    }
  } else if (String.fromCharCode(e.which) == "0") {
    solve();
  } else if (String.fromCharCode(e.which) == "9") {
    cpz++;
    puzzle = puzzles[cpz].pz;
    categ = puzzles[cpz].ct;
    initltrs();
    rvltoc(0);
  } else if (String.fromCharCode(e.which) == "8") {
    showSpinner();
  }
}
