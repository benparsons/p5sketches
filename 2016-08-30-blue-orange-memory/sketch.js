// unhappy :(

var canvasWidth = 600,
  canvasHeight = 600;

var x = 0;

var orange = ["#ffa500", "#ff6600", "#ffb347"];
var prevPoints = new Array();
var xLag = new Array();
var pass = 1;

// orange: #ffa500 #FF6600 #ffb347
// blue: #0000FF #007FFF #0F52BA #0892D0

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noStroke();
  //noLoop();

  background("#0F52BA");
}

function draw() {
  if (pass === 1) {
    drawLine(50, 10);
    drawLine(100, 10);
    drawLine(150, 10);
    drawLine(200, 10);
    drawLine(250, 10);
    drawLine(300, 10);
    drawLine(350, 10);
    drawLine(400, 10);
    drawLine(450, 10);
    drawLine(500, 10);
    drawLine(550, 10);
  }

  if (pass === 2 && x % 20 == 0) {
    noStroke();
    fill(orange[floor(random(3))]);
    var y = canvasHeight/2;
    y += (random(2) - 1) * x / 20;
    ellipse(x, y, x / 10, x / 10);

  }
  // rect(leftDistance, topDistance, width, height)
  // fill(r, g, b); fill(grey); noFill();
  // map(value, in-range-min, in-range-max, out-range-min, out-range-max)

  x++;

  if (pass === 1 && x > canvasWidth) {
    x = 0;
    pass = 2;
    //noLoop();
    filter(BLUR, 5);
  }

  if (pass === 2 && x > canvasWidth) {
    noLoop();
    filter(BLUR, 3);
  }
}

// taken from horizontal-line-study, could be made into a library function
function drawLine(yBase, suppressor) {
  if (! xLag[yBase]) xLag[yBase] = 0;
  var localX = x - xLag[yBase];
  var sinX = Math.sin((localX+random(-2,2))/10);
  var suppression = (localX/suppressor)/1.5;
  var y = map(sinX, -1, 1, yBase-suppression, yBase+suppression);
  //point(x, y);
  var prevX = prevPoints[yBase] ? prevPoints[yBase][0] : 0;
  var prevY = prevPoints[yBase] ? prevPoints[yBase][1] : yBase;

  stroke("#0000FF");
  strokeWeight(15);
  line(prevX, prevY, x, y);

  strokeWeight(8);
  stroke("#007FFF");
  line(prevX-20, prevY+4, x-20, y+4);
  stroke("#0892D0");
  line(prevX-20, prevY-3, x-20, y-3);

  prevPoints[yBase] = [x, y];
  xLag[yBase] += random(yBase/1000);
}
