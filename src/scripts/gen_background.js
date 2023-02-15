import fs from 'fs'

let width = 9
let height = 10

let svg = `
<svg width="${20 * (width - 1)}" height="${15 * (height - 1)}" viewBox="0 0 ${20 * (width - 1)} ${15 * (height - 1)}" xmlns="http://www.w3.org/2000/svg"
  style="stroke-linecap:round;stroke-width:0.5px;stroke-linejoin:round;stroke-miterlimit:1.5;" fill="none" stroke="#000">

  <defs>
    <path id="A" d="M0,0h5a5,5,0,0,1,0,10h-5zm0,2h-5m5,6h-5v9m15,-12h5z" />
    <path id="N" d="M0,0h5a5,5,0,0,1,0,10h-5zm-.5,2a1,1,0,1,1,-2,0a1,1,0,1,1,2,0m-2,0h-2.5zm2,6a1,1,0,1,1,-2,0a1,1,0,1,1,2,0m-2,0h-2.5v9m20,-12h-2.5a1,1,0,1,1,-2,0a1,1,0,1,1,2,0z" />
    <path id="O" d="M0,0c3,0,9,3,10,5c-1,2,-7,5,-10,5c1.5,-2,1.5,-8,0,-10zm0.7,2h-5.7m5.7,6h-5.7v9m15,-12h5" />
    <path id="X" d="M0,0c3,0,9,3,10,5c-1,2,-7,5,-10,5c1.5,-2,1.5,-8,0,-10zm-1,10c1.5,-2,1.5,-8,0,-10m0.7,2h-4.7m4.7,6h-4.7v9m15,-12h5" />
  </defs>
`

let gates = ['A', 'N', 'O', 'X']

function randomGate() {
  return gates[Math.floor(Math.random() * 4)]
}

let random = (new Array(width)).fill(0).map(() => (new Array(height)).fill(0).map(() => randomGate()))
for (let i = 0; i < width; i++) {
  random[i][height-1] = random[i][0]
}
for (let i = 0; i < height; i++) {
  random[width-1][i] = random[0][i]
}

console.log(random)

for (let i = 0; i < width; i++) {
  for (let j = 0; j < height; j++) {
    svg += `<use href="#${random[i][j]}" x="${i * 20}" y="${(i % 2 == 0 ? 0 : -7.5) + (j * 15)}"/>\n`
  }
  if (i % 2 == 0)
    svg += `<use href="#${random[i][height-2]}" x="${i * 20}" y="-15"/>\n`
}

svg += `</svg>`

fs.writeFileSync('../../public/background.svg', svg.replace(/\n/g,'').replace(/ +/g,' '))