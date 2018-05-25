function include(path) {
  var scr = document.createElement("script");
  scr.src = path;
  document.body.appendChild(scr);
}

void((() => {
  info = (Array.from(document.getElementsByTagName("meta")).filter((el) => el.attributes.info !== undefined)[0] || {attributes: null}).attributes;
  var menu = document.createElement("ul");
  menu.classList.add("nav");
  menu.innerHTML = " \
    <li><a href='../index.html'>Home</a></li> \
    <li class='dropdown'> \
      <a href='#' class='dropbtn'>Games</a> \
      <div class='dropdown-content'> \
        <a href='https://glingy.github.io/GNibbles/index.html'>Nibbles</a> \
        <a href='../donut/index.html'>Donut or No Donut</a> \
        <a href='../pong/index.html'>Pong</a> \
        <a href='../wheelFortune/index.html'>Wheel of Fortune</a> \
        <a href='https://github.com/glingy/Ionic-Gin'>Ionic Gin</a> \
      </div> \
    </li> \
    <li class='dropdown'> \
      <a href='#' class='dropbtn'>Tools</a> \
      <div class='dropdown-content'> \
        <a href='../memorizer/index.html'>Memorizer</a> \
        <a href='../acids/index.html'>Acid Names</a> \
        <a href='../shortCode/index.html'>Short Code</a> \
        <a href='../schwdgt/index.html'>Schedule Widget</a> \
        <a href='../pixel/index.html'>Pixel Draw</a> \
      </div> \
    </li> \
    <li class='dropdown'> \
      <a href='#' class='dropbtn'>Projects</a> \
      <div class='dropdown-content'> \
        <a href='../news/index.html'>News</a> \
        <a href='../satire/index.html'>Computational Satire</a> \
      </div> \
    </li> \
    <li class='dropdown'> \
      <a href='#' class='dropbtn'>Other</a> \
      <div class='dropdown-content'> \
        <a href='#'>Nothing Here...</a> \
      </div> \
    </li>";
  if (info && info.type && info.type.value == "Home") {
    menu.innerHTML = menu.innerHTML.replace(/\.\.\//g, "./");
    document.head.innerHTML += '<link href="./main.css" rel="stylesheet" type="text/css"/>';
  } else {
    document.head.innerHTML += '<link href="../main.css" rel="stylesheet" type="text/css"/>';
  }
  try {
    Array.from(menu.children).map((el) => el.children[0]).filter((el) => el.innerText == (info && info.type ? info.type.value : "Home"))[0].classList.add("active");
  } catch (e) {
    console.log("Error: " + e.message);
  }

  var content = document.createElement("div");
  content.classList.add("content");
  content.innerHTML = document.body.innerHTML.replace(/<script src=".*?lib\.js"><\/script>/, "").replace(/<info .*?\/>/g, "");
  document.body.innerHTML = "";


  if (info && info.center) {
    var outerContent = document.createElement("div");
    outerContent.classList.add("outerContent");
    outerContent.appendChild(content);
    document.body.appendChild(outerContent);
  } else {
    document.body.appendChild(content);
  }


  document.body.prepend(menu);
})());
