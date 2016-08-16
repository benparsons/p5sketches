var canvasWidth = 600,
  canvasHeight = 600;

var x = 0;
function setup() {
  createCanvas(canvasWidth, canvasHeight);


  //background(153);
}

function draw() {

  var sinX = Math.sin(x/10);
  var y = map(sinX, -1, 1, 300-(x/5), 300+(x/5));
  point(x, y);
  x++;

  if (x > 500) {
    noLoop();
    filter(BLUR, 3);
  }
  // rect(leftDistance, topDistance, width, height)
  // fill(r, g, b); fill(grey); noFill();
  // map(value, in-range-min, in-range-max, out-range-min, out-range-max)
}
