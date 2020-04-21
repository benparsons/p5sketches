// inspired by https://twitter.com/sasj_nl/status/1252279773834985475

var canvasWidth = 500,
  canvasHeight = 600;
var palette = [];

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noStroke();
  noLoop();
  palette = [
    color('#CFF09E'),
    color('#A8DBA8'),
    color('#79BD9A'),
    color('#3B8686'),
    color('#0B486B')
  ]

  background(0);
  //stroke(0);
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 10; j++) {
      drawSquare(50, i * 50, j * 50);
    }
  }
}

function draw() {
  
  
  // rect(leftDistance, topDistance, width, height)
  // fill(r, g, b); fill(grey); noFill();
  // map(value, in-range-min, in-range-max, out-range-min, out-range-max)
}

function drawSquare(padding, marginX, marginY) {
  fill(palette[int(random(0,5))])
  var randMag = 0;
  var x1 = padding + marginX + int(random(-randMag,randMag));
  var y1 = padding + marginY + int(random(-randMag,randMag));
  var x2 = padding + int(random(-randMag,randMag));
  var y2 = padding + int(random(-randMag,randMag));
  rect(x1, y1, x2, y2);
}
