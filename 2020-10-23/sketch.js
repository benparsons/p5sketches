var canvasWidth = 600,
  canvasHeight = 600;
let spreadFactor = 3;
let colorsWarm = ["511845", "900c3f", "c70039", "ff5733"]; // 179350
let colorsCold = ["e7dfd5", "84a9ac", "3b6978", "204051"]; // 192310

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  blendMode(HARD_LIGHT);
  strokeWeight(10);
  for (let i = 0; i < 20000; i++) {
    stroke(color("#" + colorsCold[int(random(0, colorsWarm.length))]))
    let x = canvasWidth / 2;
    x += randomGaussian() * canvasWidth / 4;
    let y = canvasHeight / 2;
    y += randomGaussian() * canvasHeight / 4;
    point(x, y)
  }
  strokeWeight(100);
  for (let i = 0; i < 80; i++) {
    stroke(color("#" + colorsWarm[int(random(0, colorsWarm.length))]))
    let x = canvasWidth / 2;
    x += randomGaussian() * canvasWidth / spreadFactor;
    let y = canvasHeight / 2;
    y += randomGaussian() * canvasHeight / spreadFactor;
    point(x, y)
  }
  noLoop();
}

function draw() {
  // rect(leftDistance, topDistance, width, height)
  // fill(r, g, b); fill(grey); noFill();
  // map(value, in-range-min, in-range-max, out-range-min, out-range-max)
}
