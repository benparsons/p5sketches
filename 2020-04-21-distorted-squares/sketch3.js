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
  noStroke();
  var randMag = 15;
  var x1rand = int(random(0,randMag))
  var y1rand = int(random(0,randMag))
  var x2rand = int(random(-randMag,0))
  var y2rand = int(random(-randMag,0))
  var x1 = padding + marginX + x1rand;
  var y1 = padding + marginY + y1rand;
  var x2 = padding + x2rand - x1rand;
  var y2 = padding + y2rand - y1rand;
  rect(x1, y1, x2, y2);
  noFill()
  stroke(255);
  //rect(padding + marginX,padding + marginY, padding, padding)
}
