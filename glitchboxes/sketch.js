var xBoxCount = 30;
var yBoxCount = 30;

var canvasWidth = 600,
  canvasHeight = 600;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noStroke();
  //noLoop();
}

function draw() {

  var boxWidth = canvasWidth / xBoxCount;
  var boxHeight = canvasHeight / yBoxCount;

  for (var i = 0; i < xBoxCount; i++) {
    for (var j = 0; j < xBoxCount; j++) {
      var r = map(i, 0, xBoxCount, 0, 255);
      var g = map(j, 0, yBoxCount, 0, 255);
      fill(r, g, 255);
      // leftDistance, topDistance, width, height
      rect(i * boxWidth, j * boxHeight, boxWidth, boxHeight);
    }
  }

  xBoxCount = round(random(100));
  yBoxCount = round(random(100));
  //if (xBoxCount < 1 || yBoxCount < 1) noLoop();
}
