let gridWidth = 8, gridHeight = 8;
let scale = 10;
let vectors = [];
let vectorCount = 3;
let backgroundColor;
let elements = 8;
let x = 0, y = 0;

var canvasWidth = gridWidth * scale * elements,
  canvasHeight = gridHeight * scale * elements;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  backgroundColor = color(0, 0, 0);
  //frameRate(4);
  for (var i = 0; i < vectorCount; i++) {
    vectors.push(createVector(
      gridWidth / 2 + int(random(-2,2)),
      gridHeight / 2 + int(random(-2,2))));
  }
}

function draw() {
  let pg = createGridElement(vectors, x + 1, y + 1, false);
  image(pg, x * pg.width, y * pg.width, pg.width, pg.height);
  if (y === elements) {
    y = 0;
  } else if (x < elements) {
    x++;
  } else if (y < elements) {
    x = 0;
    y++;
  } else {
    y = 0;
    x = 0;
    console.log("CONDITION 4")
  }
  delete pg;
  console.log(JSON.stringify(vectors.map(v => { return {x: v.x, y: v.y}})))
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
  for (var i = 0; i < vectors.length; i++) {
    vectors[i].add(int(random(-2,2)), int(random(-2,2)));
    if (vectors[i].x < (0 - gridWidth /2))  vectors[i].x++;
    if (vectors[i].x > (gridWidth * 1.5))  vectors[i].x--;
    if (vectors[i].y < (0 - gridHeight /2))  vectors[i].y++;
    if (vectors[i].y > (gridHeight * 1.5))  vectors[i].y--;
  } 
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