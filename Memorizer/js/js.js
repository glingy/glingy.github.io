var testinput = "";
var testArray = [];
var words = [];
var blankcount = 0;
var numbers = [];
var number = 0;
var wordcount = 0;
var answerArray = [];
var testmade = 0;
var positionArray = [];
var textboxinputtedtext = "";
var textinputboxshown = true;

function random() {
  return Math.floor(1-Math.abs(Math.rand()-Math.rand()) * wordcount);
}

function cbas() {
  answerArray = [];
  var randnum = 0;
  for (var i = 0; i < blankcount;i++) {
    randnum = words[i][1];
    answerArray.push(words[i][0]);
    positionArray.push(words[i][1]);
    testArray[randnum] = "<input id='blank" + i + "' type='text'></input>";
  }
}

function makewordarray() {
  words = [];
  for (var i = 0; i < Math.floor(testArray.length/2);i++) {
    words.push([testArray[(i*2)+1], (i*2)+1]);
  }
}

function addblanks() {
  if (testArray.length < 2) {
    alert("Please enter text to make a test from.");
    return 0;
  }
  makewordarray();
  words.sort(function(a,b) {return b[0].length - a[0].length || a[0].localeCompare(b[0]);});
  //set num of words
  wordcount = words.length;
  //set num of blanks
  blankcount = parseInt(document.getElementById('blanks').value);
  blankcount = isNaN(blankcount) || wordcount < blankcount ? wordcount : blankcount;
  //reset blank input box with current value
  document.getElementById('blanks').value = "" + blankcount +"";
  //choose blanks and substitute
  cbas();
  //join testArray
  var testHTML = testArray.join("");
  //set testbox
  document.getElementById('fitbt').innerHTML = testHTML;
}

function createtest() {
  visinputbox(true);
  testinput = document.getElementById('input').value;
  testArray = testinput.split(/([^a-zA-Z0-9\u00C0-\u02B8\u0388-\u0556']+(?=[a-zA-Z0-9\u00C0-\u02B8\u0388-\u0556']|$))/);
  // cut end if blank -------******
  if (testArray[testArray.length - 1] === "") {
    testArray.pop();
  }
  if (/[a-z]|[A-Z]|[0-9]/.test(testArray[0].split('')[0]) && testArray[0] != "") {
    testArray.unshift("");
  }
  addblanks();
  console.log(testArray);
  setTimeout(function() {
    visinputbox(false);
  }, 100);
  testmade = true;
}

//// continue modifying later

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
      alert(wrongcount + " answers incorrect.\n" + (Math.round((blankcount - wrongcount) / blankcount * 10000) / 100) + "%.");
    }
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

// restrict blank input to positive numbers
function restrict() {
  var wo = document.getElementById("blanks").value
  if (parseInt(wo) < 0) {
    document.getElementById("blanks").value = "0";
  }
}

function isGrammarly() {
  if (document.getElementsByTagName("grammarly-card").length > 0) {
    alert('Please disable grammarly extension for this domain.');
  }
}

//init preset array
var presets = [""];

//get cookies with presets
function getcookie() {
  if (document.cookie) {
    var cookie = document.cookie;
    var cookieArray = cookie.split(";");
    var curcookie;
    for (var i = 0; i < cookieArray.length; i++) {
      curcookie = cookieArray[i].split("=");
      var wo = document.createElement("option");
      wo.value = "" + presets.length;
      wo.innerHTML = curcookie[0];
      //decypher preset
      cookie = curcookie[1];
      cookie = decodeURIComponent(cookie);
      console.log(cookie);
      //push cookie
      presets.push(cookie);
      document.getElementById("preset").appendChild(wo);
    }
  }
}

function setcookie(name) {
  var name = name ? name : "CookiePreset";
  visinputbox(true);
  var pres = document.getElementById('input').value;
  document.cookie = name + "=" + encodeURIComponent(pres);
}

function delcookiep() {
  delcookie(prompt("What is the name of the preset?"));
}

function delcookie(name) {
  var name = name? name: "CookiePreset";
  visinputbox(true);
  var pres = document.getElementById('input').value;
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT";
}

//load presets
function loadpresets(arr) {
  var wo;
  for (var i = 1; i < arr.length; i++) {
    wo = document.createElement("option");
    wo.value = "" + i;
    wo.innerHTML = arr[i].name;
    presets.push(arr[i].preset);
    document.getElementById("preset").appendChild(wo);
  }
  getcookie();

}

// load chosen preset
function presetc() {
  var pnum = parseInt(document.getElementById("preset").value);
  visinputbox(true);
  document.getElementById("input").value = presets[pnum];
}

//validate cookiename form
function cookieval() {
  if (document.getElementById('cookiename').value.match('[^a-zA-Z]')) {
    document.getElementById('cookiename').value = document.getElementById('cookiename').value.replace(/[^a-zA-Z]/g, "");
  }
}

//submit cookie request
function submitcookiename(sod) {
  if (sod == 1) {
    setcookie(document.getElementById('cookiename').value);
  } else if (sod == 2) {
    delcookie(document.getElementById('cookiename').value);
  }
}

//toggle vis of cookieedit
var viscook = false;

function toggleviscook() {
  if (viscook) {
    document.getElementById('nameofcookie').style.display = "none";
  } else {
    document.getElementById('nameofcookie').style.display = "block";
  }
}
