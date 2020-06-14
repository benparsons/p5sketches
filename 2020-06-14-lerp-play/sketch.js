var canvasWidth = 600,
  canvasHeight = 600;
let colors = [];
let count = 10;
let steps = 10;
let stepWidth = canvasWidth / steps;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  colorMode(RGB);
  noStroke();
  

  for (var i = 0; i < count; i++) {
    colors.push(
      color(
        int(random(256)),
        int(random(256)),
        int(random(256)))
    );
  }


  //for (var c = 0; c < count-1; c++) {
    let from = colors[0];
    let to = colors[1];
    for (var s = 0; s < steps; s++) {
      let lerpVal = (1 / steps) * (steps - s);
      console.log(lerpVal);
      fill(lerpColor(from, to, lerpVal));
      rect(stepWidth*s, 0, stepWidth, 100);
    }
  //}
  
  noLoop();

  //background(153);
}

function draw() {
  // rect(leftDistance, topDistance, width, height)
  // fill(r, g, b); fill(grey); noFill();
  // map(value, in-range-min, in-range-max, out-range-min, out-range-max)
}
