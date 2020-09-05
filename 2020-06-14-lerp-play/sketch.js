var canvasWidth = 1600,
  canvasHeight = 1200;
let colors = [];
let count = 8;
let steps = 20;
let stepWidth = canvasWidth / steps;
let blockHeight = canvasHeight  / count;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  colorMode(RGB);
  noStroke();
  render();
  noLoop();
}

function mousePressed(e) {
  if (e.buttons !== 1) return;
  render();
}


function render() {
  colors = [];
  for (var i = 0; i < count + 1; i++) {
    colors.push(
      color(
        int(random(256)),
        int(random(256)),
        int(random(256)))
    );
  }

  console.log(JSON.stringify(colors.map(c => c.levels)));

  for (var c = 0; c < count; c++) {
    let from = colors[c];
    let to = colors[c+1];
    for (var s = 0; s < steps; s++) {
      let lerpVal = (1 / steps) * (steps - s);
      fill(lerpColor(from, to, lerpVal));
      rect(steps*stepWidth - stepWidth*(s+1), c * blockHeight, stepWidth, blockHeight);
    }
  }
}
