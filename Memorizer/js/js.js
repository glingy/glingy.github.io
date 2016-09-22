var testinput = "";
var testArray = [];
var testHTML = "";
var blankcount = 0;
var numbers = [];
var number = 0;
var wordcount = 0;
var answerArray = [];
var testmade = 0;
var positionArray = [];
var textboxinputtedtext = "";
var textinputboxshown = true;
function addblanks() {
  blankcount = parseInt(document.getElementById('blanks').value);
  wordcount = Math.floor(testArray.length/2);
  answerArray = [];
  positionArray = [];
  if (isNaN(blankcount)) {
    blankcount = wordcount;
  }
  if (wordcount < blankcount) {
    blankcount = wordcount;
  }
  document.getElementById('blanks').value = "" + blankcount;
  if (wordcount === 0) {
    alert("Please enter something in to make a test of.")
  }
  initializenumbers(wordcount);
  for (var i = 0; i < blankcount; i++){
    number = findnewnumber();
    console.log('blank: ' + number);
    answerArray.push(testArray[((number+1)*2)-1]);
    positionArray.push(((number+1)*2)-1);
    testArray[((number+1)*2)-1] = '<input type="text" id="blank' +i+'"></input>';
  }
  document.getElementById('fitbt').innerHTML = testArray.join("");
  testmade = 1;
}

function initializenumbers(words) {
  numbers = [];
   for (var i = 0; i < words; i++) {
     numbers.push(i);
   }
}

function findnewnumber() {
  var tmp = Math.floor(Math.random() * numbers.length);
  var tmp2 = numbers.splice(tmp, 1)[0];
  return tmp2;
}


function createtest() {
  visinputbox(true);
  numberstring = "";
  testinput = document.getElementById('input').value;
  testArray = testinput.split(/\b/);
  if (/[a-z]|[A-Z]|[0-9]/.test(testArray[0].split('')[0]) && testArray[0] != "") {
    testArray.unshift("");
  }
  addblanks();
  console.log(testArray);
  setTimeout(function() {
    visinputbox(false);
  }, 100);
}

function submit(showw) {
  var show = document.getElementById('answers').checked;
  if (showw) {
    show = 0;
  }
  var tmptext = "";
  var wo;
  var wrongcount = 0;
  var entered = [];
  var testwans = testArray.map(function (obj) {return obj;});
  if (!testmade) {
    alert('Make a test first.');
    return 0;
  }
  for (var i = 0; i < blankcount; i++) {
    wo = document.getElementById('blank'+i);
    entered[i] = wo.value;
    if (wo.value == answerArray[i]) {
      wo.style.backgroundColor = '#00FF00';
    } else {
      wo.style.backgroundColor = '#FF0000';
      wrongcount++;
      if (show) {
        testwans[positionArray[i]+1] = "<span class='correct'><mark>" + answerArray[i] + "</mark></span>" + (testwans[positionArray[i]+1] ? testwans[positionArray[i]+1] : "");
      }
    }
  }
  if (!showw) {
    if (wrongcount === 0) {
      alert('Correct!');
    } else {
      alert(wrongcount + "answers incorrect.\n%" + (Math.round((blankcount - wrongcount) / blankcount * 10000) / 100) + ".");
    }
  }
  console.log(testwans);
  if (!showw) {
    document.getElementById('fitbt').innerHTML = testwans.join("");
    for (var i = 0; i < blankcount; i++) {
      wo = document.getElementById('blank'+i);
      wo.value = entered[i];
    }
    submit(1);
  }
}

function visinputbox(show) {
  if (!textinputboxshown && show) { // want it shown
    document.getElementById('input').value = textboxinputtedtext;
    document.getElementById('input').readOnly = false;
    textinputboxshown = true;
  } else if (textinputboxshown && !show){ // want it hidden
    textboxinputtedtext = document.getElementById('input').value;
    document.getElementById('input').value = " ";
    document.getElementById('input').readOnly = true;
    textinputboxshown = false;
  }
}
