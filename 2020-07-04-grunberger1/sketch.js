let gridWidth = 8, gridHeight = 8;
let scale = 100;
let v1, v2, v3;

var canvasWidth = gridWidth * scale,
  canvasHeight = gridHeight * scale;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  frameRate(1);
  v1 = createVector(0, 0);
  v2 = createVector(1, 0);
  v3 = createVector(0, 1);
}

function draw() {
  background(0);
  stroke(0, 255, 0);
  beginShape();
    vertex(v1.x * scale, v1.y * scale);
    vertex(v2.x * scale, v2.y * scale);
    vertex(v3.x * scale, v3.y * scale);
  endShape(CLOSE);
  v3.add(0, 1)
  v2.add(1, 0)
  drawOverlay();
  console.log(frameCount, v1.x, v1.y);
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