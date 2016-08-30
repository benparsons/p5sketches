// unhappy :(

var canvasWidth = 2000,
  canvasHeight = 1000;

var x = 0;

var oranges = ["#ffa500", "#ff6600", "#ffb347"];
var blues = ["#0000FF", "#0892D0"];
var prevPoints = new Array();
var xLag = new Array();

// orange: #ffa500 #FF6600 #ffb347
// blue: #0000FF #007FFF #0F52BA #0892D0

function setup() {
  for (var i = 0.5; i < 1; i+=.01) {
    var obj = lerpColor(color(blues[0]), color(blues[1]), i);
    blues.push(obj);
  }

  for (var i = 0.5; i < 1; i+=.01) {
    var obj = lerpColor(color(oranges[0]), color(oranges[1]), i);
    oranges.push(obj);
  }

  createCanvas(canvasWidth, canvasHeight);
  noStroke();
  //noLoop();

  background("#0F52BA");
  for (var i = 0; i < 1000; i++) {
    var start = floor(random(0, canvasHeight));
    var finish = floor(random(start-50, start+50));
    strokeWeight(8);
    stroke(blues[floor(random(blues.length))]);
    line(0, start, canvasWidth, finish);
  }
  filter(BLUR, 2);
}

function draw() {

  if (x % 40 == 0){
    if (x < 100) {
      noStroke();
    } else {
      strokeWeight(1);
      stroke("#fff")
    }

    fill(oranges[floor(random(oranges.length))]);
    var y = canvasHeight/2;
    y += (random(2) - 1) * x / 20;
    ellipse(x, y, x / 10, x / 10);
  }
  // rect(leftDistance, topDistance, width, height)
  // fill(r, g, b); fill(grey); noFill();
  // map(value, in-range-min, in-range-max, out-range-min, out-range-max)

  x++;


  if (x > canvasWidth) {
    noLoop();

    filter(BLUR, 1);
    filter(ERODE);
  }
}
