// inspired by inconvergent

var canvasWidth = 1000,
  canvasHeight = 680;
var prevPoints = new Array();
var xLag = new Array();

var x = 0;
function setup() {
  createCanvas(canvasWidth, canvasHeight);

  background(255);
}

function draw() {

  if (x > 1060) {
    noLoop();
  } else if (x === 1051) {
    filter(BLUR, 3);
    filter(ERODE);
    filter(INVERT);
  } else if (x > 1051) {
    filter(ERODE);
  } else {
    strokeWeight(5);
    drawLine(100, 60);
    drawLine(150, 50);
    drawLine(200, 40);
    drawLine(250, 30);
    drawLine(300, 20);
    drawLine(350, 15);
    drawLine(400, 12);
    drawLine(450, 10);
    drawLine(500, 5);
  }


  x++;

}

function drawLine(yBase, suppressor) {
  if (! xLag[yBase]) xLag[yBase] = 0;
  var localX = x - xLag[yBase];
  var sinX = Math.sin((localX+random(-2,2))/10);
  var suppression = (localX/suppressor)/1.5;
  var y = map(sinX, -1, 1, yBase-suppression, yBase+suppression);
  //point(x, y);
  var prevX = prevPoints[yBase] ? prevPoints[yBase][0] : 0;
  var prevY = prevPoints[yBase] ? prevPoints[yBase][1] : yBase;

  stroke(200, 200, 255);
  strokeWeight(15);
  line(prevX, prevY, x, y);

  strokeWeight(8);
  stroke(0, 0, 255);
  line(prevX-20, prevY+4, x-20, y+4);
  stroke(0, 0, 0);
  line(prevX-20, prevY-3, x-20, y-3);

  prevPoints[yBase] = [x, y];
  xLag[yBase] += random(yBase/1000);
}
