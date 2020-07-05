var size = 600;

function setup() {
  createCanvas(size, size);
  stroke(0);
  strokeWeight(10);
}

function draw() {
  let pg = createGraphics(size, size);
  pg.rect(size/4, size/4, size/2, size/2);
  image(pg, 0, 0, 600, 600);
}
