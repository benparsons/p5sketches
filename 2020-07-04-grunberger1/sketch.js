let gridWidth = 8, gridHeight = 8;
let scale = 100;

var canvasWidth = gridWidth * scale,
  canvasHeight = gridHeight * scale;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noStroke();
  //noLoop();
  drawOverlay();
}

function draw() {
}

function drawOverlay() {
  for (var x = 0; x <= gridWidth; x++) {
    stroke(255, 0, 0);
    strokeWeight(1);
    line(x * scale, 0, x * scale, canvasHeight);
  }
  for (var y = 0; y <= gridHeight; y++) {
    stroke(255, 0, 0);
    strokeWeight(1);
    line(0, y * scale, canvasWidth, y * scale);
  }
}