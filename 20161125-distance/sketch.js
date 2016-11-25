var canvasWidth = 600,
  canvasHeight = 600;

var obj = 1;
var direction = 1;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noStroke();
  //noLoop();

  //background(153);
}

function draw() {
  // rect(leftDistance, topDistance, width, height)
  // fill(r, g, b); fill(grey); noFill();
  // map(value, in-range-min, in-range-max, out-range-min, out-range-max)

  background(255);
  fill(255 - (2*obj));
  if (obj == 0 || obj == 100) {
    direction = -direction;
  }
  obj += direction;

  ellipse(100, 100, obj, obj);
}
