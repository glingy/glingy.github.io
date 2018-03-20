var ltrs = ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];

function findAllChar(str, ch) {
  var indices = [];
  for(var i=0; i<str.length;i++) {
    if (str[i] === ch) indices.push(i);
  }
  return indices;
}

function getEmptyLetters() {
  var indices = [];
  for(var i=0; i<ltrs.length;i++) {
    if (ltrs[i] == 1) {
      indices.push(i);
      ltrs[i] = 2;
    }
  }
  return indices;
}

function initltrs() {
  gel("category").children[1].innerHTML = categ;
  ltrs = ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];
  var tmp = puzzle.split("");
  console.log(tmp);
  for (var i = 0; i < tmp.length; i++) {
    console.log(i);
    ltrs[i] = (tmp[i] == " " ? 0 : (tmp[i].match(/[A-Z]/) ? 1 : 2));
    if (ltrs[i] == 2) {
      document.getElementById("l" + (i+1)).style.visibility = "visible";
      document.getElementById("l" + (i+1)).children[0].innerHTML = tmp[i];
    } else if (ltrs[i] == 0) {
      document.getElementById("l" + (i+1)).style.visibility = "hidden";
    } else if (ltrs[i] == 1) {
      document.getElementById("l" + (i+1)).style.visibility = "visible";
      document.getElementById("l" + (i+1)).children[0].innerHTML = " ";
    }
  }
}

function rvl(tmpp) {
  tmp = tmpp[0];
  console.log(tmpp);
  tmpp.shift();
  ltrs[tmp] = 2;
  cplva[cpl] += (!puzzle.charAt(tmp).match(/[AEIOU]/) ? cmoney : 0);
  play("ltrvl");
  document.getElementById("l" + (tmp+1)).style.backgroundColor = "#6666FF";
  setTimeout(function(tmppp, tmpppp) {

    document.getElementById("l" + (tmppp+1)).style.backgroundColor = "#FFFFFF";
    document.getElementById("l" + (tmppp+1)).children[0].innerHTML = puzzle.charAt(tmppp);
    updateM(0);
    if (tmpppp[0]) {
      setTimeout(rvl.bind(null, tmpppp), 1200);
    }
  }.bind(null, tmp, tmpp), 500);
}

function rvlltr(ltr) {
  console.log(ltr);
  var tmp = findAllChar(puzzle, ltr);
  console.log(tmp);
  if (tmp[0] && ltrs[tmp[0]] != 2) {
    if (ltr.match(/[AEIOU]/)) {
      cplva[cpl] -= 250;
    }
    rvl(tmp);
  } else {
    play("beep");
    incrementP();
  }
}

function rvls(tmpp) {
  tmp = tmpp[0];
  console.log(tmpp);
  tmpp.shift();
  ltrs[tmp] = 2;
  document.getElementById("l" + (tmp+1)).style.backgroundColor = "#6666FF";
  setTimeout(function(tmppp, tmpppp) {

    document.getElementById("l" + (tmppp+1)).style.backgroundColor = "#FFFFFF";
    document.getElementById("l" + (tmppp+1)).children[0].innerHTML = puzzle.charAt(tmppp);
    updateM(0);
    if (tmpppp[0]) {
      setTimeout(rvls.bind(null, tmpppp), 0);
    } else {
      cpl = ocpl;
      setTimeout(rvltoc.bind(null, 1), 1000);
    }
  }.bind(null, tmp, tmpp), 500);
}

function solve() {
  tplva[cpl] += cplva[cpl];
  ocpl = cpl;
  cpl = 0;
  rvls(getEmptyLetters());//remake
}

(initltrs())
