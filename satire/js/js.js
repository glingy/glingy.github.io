var i = -1;
var cycle = [
  "We make them faster...",
  "We make them able to use logic...",
  "We make them know more...",
  "We make them able to learn...",
  "We make them able to make their own decisions...",
  "We make them able to move themselves...",
  "We make them out of more sturdy materials...",
  "We realize that we made Terminators...",
  "We fight the Terminators...",
  "We have made our world into a barren wasteland...",
  "We find that the robots need energy...",
  "We are that source of energy...",
  "We, the creators of the robots are now prisoners...",
  "We are now inside the Matrix...",
  "We are brainwashed and have to restart civilization...",
  "We, brainwashed and unknowing, make computers..."
];

function next() {
  i++;
  if (i == cycle.length) {
    i = 0;
    document.getElementById("hint").style.opacity = "100";
  }
  document.getElementById("comedy").innerHTML = cycle[i];
}
