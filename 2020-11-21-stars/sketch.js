let canvasWidth = 500,
  canvasHeight = 500;
let img, pg;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noStroke();
  pg = createGraphics(100, 100);
  pg.image(img, 0, 0)
  image(pg, 0, 0);
  
  //noLoop();

  //background(153);
}

function draw() {
  // rect(leftDistance, topDistance, width, height)
  // fill(r, g, b); fill(grey); noFill();
  // map(value, in-range-min, in-range-max, out-range-min, out-range-max)
}


function preload() {
  img = loadImage('../images/potw2022a.jpg');
}