var canvasWidth = 1200,
  canvasHeight = 600;
let spreadFactor = 3;

// https://colorhunt.co/
let colorsWarm = ["511845", "900c3f", "c70039", "ff5733"]; // 179350
let colorsCold = ["e7dfd5", "84a9ac", "3b6978", "204051"]; // 192310

function setup() {
  let pgBackground = createLayer(10, 20000, colorsCold);
  let pgForeground = createLayer(100, 160, colorsWarm);
  createCanvas(canvasWidth, canvasHeight);
  image(pgBackground, 0, 0);
  image(pgForeground, 0, 0);
  
  noLoop();
}

function createLayer(elementSize, elementCount, palette) {
  let pg = createGraphics(canvasWidth, canvasHeight);
  pg.blendMode(HARD_LIGHT);
  pg.strokeWeight(elementSize);
  for (let i = 0; i < elementCount; i++) {
    pg.stroke(color("#" + palette[int(random(0, palette.length))]))
    let x = canvasWidth / 2;
    x += randomGaussian() * canvasWidth / spreadFactor;
    let y = canvasHeight / 2;
    y += randomGaussian() * canvasHeight / spreadFactor;
    pg.point(x, y)
  }
  pg.filter(BLUR, 1)
  return pg;
}
