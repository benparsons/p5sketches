let gridWidth = 8, gridHeight = 8;
let scale = 10;
let vectors = [];
let vectorCount = 3;
let backgroundColor;
let elements = 8;

var canvasWidth = gridWidth * scale * elements,
  canvasHeight = gridHeight * scale * elements;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  backgroundColor = color(0, 0, 0);
  frameRate(1);
  for (var i = 0; i < vectorCount; i++) {
    vectors.push(createVector(0, 0));
  }
  drawElement();
  noLoop();
}

function draw() {
  stroke(0, 255, 0);
  fill(255)
  vectors[0].add(0, 1);
  vectors[1].add(1, 0);
  beginShape();
  for (var i = 0; i < vectorCount; i++) {
    vertex(vectors[i].x * scale, vectors[i].y * scale);
  }
  endShape(CLOSE);
  //drawOverlay();
}

function drawElement() {
  let pgWidth = gridWidth * scale;
  let pgHeight = gridWidth * scale;
  pg = createGraphics(pgWidth, pgHeight);
  pg.noStroke();
  pg.fill(backgroundColor);
  pg.rect(0, 0, pgWidth, pgHeight);
  drawOverlay(pg);
  image(pg, 0, 0, 100, 100);
}

function drawOverlay(pg) {
  for (var x = 0; x <= gridWidth; x++) {
    pg.stroke(255, 0, 0);
    pg.strokeWeight(1);
    pg.line(x * scale, 0, x * scale, canvasHeight);
  }
  for (var y = 0; y <= gridHeight; y++) {
    pg.stroke(255, 0, 0);
    pg.strokeWeight(1);
    pg.line(0, y * scale, canvasWidth, y * scale);
  }
}