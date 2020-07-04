let gridWidth = 8, gridHeight = 8;
let scale = 100;
let vectors = [];
let vectorCount = 3;

var canvasWidth = gridWidth * scale,
  canvasHeight = gridHeight * scale;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  frameRate(1);
  for (var i = 0; i < vectorCount; i++) {
    vectors.push(createVector(0, 0));
  }
}

function draw() {
  background(0);
  stroke(0, 255, 0);
  beginShape();
  for (var i = 0; i < vectorCount; i++) {
    vertex(vectors[i].x * scale, vectors[i].y * scale);
  }
  endShape(CLOSE);
  vectors[0].add(0, 1);
  vectors[1].add(1, 0);
  drawOverlay();
  //noLoop();
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