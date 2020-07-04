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
  for (x = 0; x < elements; x++) {
    for (y = 0; y < elements; y++) {
      let vectorsCopy = vectors.map(v => {return v.copy()});
      let pg = createGridElement(vectorsCopy, x + 1, y + 1, false);
      image(pg, x * pg.width, y * pg.width, pg.width, pg.height);
    }
  }
  noLoop();
}

function createGridElement(vectors, x, y, overlayGrid) {
  let pgWidth = gridWidth * scale;
  let pgHeight = gridWidth * scale;
  pg = createGraphics(pgWidth, pgHeight);

  // background
  pg.noStroke();
  pg.fill(backgroundColor);
  pg.rect(0, 0, pgWidth, pgHeight);

  pg.fill(255)
  stroke(0, 255, 0);
  vectors[0].add(x, 0);
  vectors[1].add(0, y);
  pg.beginShape();
  for (var i = 0; i < vectorCount; i++) {
    pg.vertex(vectors[i].x * scale, vectors[i].y * scale);
  }
  pg.endShape(CLOSE);

  // grid overlay
  if (overlayGrid) {
    drawOverlay(pg);
  }

  return pg;
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