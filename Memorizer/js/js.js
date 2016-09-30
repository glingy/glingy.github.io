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
  if (testArray[0] === "") {
    testArray.shift();
  }
  if (/[a-zA-Z0-9\u00C0-\u02B8\u0388-\u0556']/.test(testArray[0].split('')[0]) && testArray[0] != "") {
    testArray.unshift("");
  }
  addblanks();
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
    //make divider
    var wo = document.createElement("option");
    wo.innerHTML = "─────────";
    wo.disabled = true;
    document.getElementById("preset").appendChild(wo);


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
  getgetpreset();
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
    viscook = false;
  } else {
    document.getElementById('nameofcookie').style.display = "block";
    viscook = true;
  }
}

//"get" preset
function getgetpreset() {
  var query = window.location.search.substring(1);
  if (query == "") {return 0;}


  var wo = document.createElement("option");
  wo.innerHTML = "─────────";
  wo.disabled = true;


  document.getElementById("preset").appendChild(wo);
  console.log(query);
  var preset = query.split("&")[0];
  console.log(preset);
  preset = preset.split("=");
  console.log(preset);
  preset[1] = decodeURIComponent(preset[1]);

  //add and select
  wo = document.createElement("option");
  wo.value = "" + presets.length;
  wo.innerHTML = preset[0];
  wo.selected = true;
  presets.push(preset[1]);
  document.getElementById("preset").appendChild(wo);
  presetc();
}

function setgetpreset() {
  visinputbox(true);
  var rootpath = "" + window.location.origin + window.location.pathname + "";
  var getpresetname = document.getElementById("cookiename").value;
  var getpresetcont = document.getElementById("input").value;
  var preurl = rootpath + "?" + getpresetname + "=" + encodeURIComponent(getpresetcont);
  document.getElementById('url').value = preurl;
  document.getElementById('urldiv').style.display = "block";
  document.getElementById('url').select();
  if (preurl.length > 255) {
    alert("The link exceeded the maximim guaranteed length. It should still work with most major browsers, but some older browsers may cut off some of the preset. Generally, this is nothing to worry about.");
  }
}

var help = 0;

function togglehelp() {
  if (help) {
    document.getElementById("help").style.display = "none";
    document.getElementById("helpb").innerHTML = "Show Help";
    help = 0;
  } else {
    document.getElementById("help").style.display = "block";
    document.getElementById("helpb").innerHTML = "Hide Help";
    help = 1;
  }
}
