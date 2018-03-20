function include(path) {
  var scr = document.createElement("script");
  scr.src = "js/" + path;
  document.body.appendChild(scr);
}

function gel(eln) {
  return document.getElementById(eln);
}

function gels(eln) {
  return document.getElementById(eln).style;
}
