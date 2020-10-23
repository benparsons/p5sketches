var canvasWidth = 1200,
  canvasHeight = 600;
let spreadFactor = 5;

// https://colorhunt.co/
let colorsWarm = ["511845", "900c3f", "c70039", "ff5733"]; // 179350

function setup() {
  let pg = createLayer(100, 20, colorsWarm);
  createCanvas(canvasWidth, canvasHeight);
  background(180);
  image(pg, 0, 0);
  
  noLoop();
}

function createLayer(elementSize, elementCount, palette) {
  let pg = createGraphics(canvasWidth, canvasHeight);
  pg.blendMode(HARD_LIGHT);
  let prevX, prevY;
  for (let i = 0; i < elementCount; i++) {
    pg.strokeWeight(elementSize);
    pg.stroke(color("#" + palette[int(random(0, palette.length))]))
    let x = canvasWidth / 2;
    x += randomGaussian() * canvasWidth / spreadFactor;
    let y = canvasHeight / 2;
    y += randomGaussian() * canvasHeight / spreadFactor;
    pg.point(x, y)
    if (prevX && prevY) {
      pg.strokeWeight(10);
      pg.line(prevX, prevY, x, y);
    }
    prevX = x;
    prevY = y;
  }
  pg.filter(BLUR, 1)
  return pg;
}
