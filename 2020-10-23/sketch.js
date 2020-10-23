var canvasWidth = 600,
  canvasHeight = 600;
let spreadFactor = 3;
let colorsWarm = ["511845", "900c3f", "c70039", "ff5733"]; // 179350
let colorsCold = ["e7dfd5", "84a9ac", "3b6978", "204051"]; // 192310

function setup() {
  let pgBackground = createGraphics(canvasWidth, canvasHeight);
  let pgForeground = createGraphics(canvasWidth, canvasHeight);
  createCanvas(canvasWidth, canvasHeight);
  pgBackground.blendMode(HARD_LIGHT);
  pgBackground.strokeWeight(10);
  for (let i = 0; i < 20000; i++) {
    pgBackground.stroke(color("#" + colorsCold[int(random(0, colorsWarm.length))]))
    let x = canvasWidth / 2;
    x += randomGaussian() * canvasWidth / spreadFactor;
    let y = canvasHeight / 2;
    y += randomGaussian() * canvasHeight / spreadFactor;
    pgBackground.point(x, y)
  }
  image(pgBackground, 0, 0);

  //pgForeground.background(255, 255, 255);
  pgForeground.blendMode(HARD_LIGHT);
  pgForeground.strokeWeight(100);
  for (let i = 0; i < 80; i++) {
    pgForeground.stroke(color("#" + colorsWarm[int(random(0, colorsWarm.length))]))
    let x = canvasWidth / 2;
    x += randomGaussian() * canvasWidth / spreadFactor;
    let y = canvasHeight / 2;
    y += randomGaussian() * canvasHeight / spreadFactor;
    pgForeground.point(x, y)
  }
  image(pgForeground, 0, 0);
  
  noLoop();
}

function draw() {
  // rect(leftDistance, topDistance, width, height)
  // fill(r, g, b); fill(grey); noFill();
  // map(value, in-range-min, in-range-max, out-range-min, out-range-max)
}
