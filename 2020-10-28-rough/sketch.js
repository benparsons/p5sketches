var canvasWidth = 600,
  canvasHeight = 600;



function setup() {
  createCanvas(canvasWidth, canvasHeight);
  let pg = createGraphics(canvasWidth, canvasHeight);
  let top = createGraphics(canvasWidth, canvasHeight);
  let c = color("#4e89ae");
  let upper = lerpColor(color(255, 255, 255, 255), c, 0.9);
  let lower = lerpColor(color(0, 0, 0, 255), c, 0.9);
  pg.noStroke();
  pg.fill(c);
  pg.ellipse(canvasWidth / 2, canvasHeight / 2, 100, 100);
  // pg.fill(upper);
  // pg.ellipse(canvasWidth / 3 * 2, canvasHeight / 2, 100, 100);
  // pg.fill(lower);
  // pg.ellipse(canvasWidth / 3, canvasHeight / 2, 100, 100);
  noLoop();
  top.fill(c);
  top.ellipse(canvasWidth / 2, canvasHeight / 2, 100, 100);
  for (let i = 0; i < 1000; i++) {
    top.stroke(lerpColor(upper, lower, random(0, 1)));
    top.line(random(240, 360), random(240, 360), random(240, 360), random(240, 360))
  }
  var imgTop = createImage(top.width,top.height);
  //https://github.com/processing/p5.js/issues/2841
  imgTop.copy(top, 0, 0, top.width, top.height, 0, 0, top.width, top.height);
  imgTop.mask(pg);
  image(imgTop, 0, 0);
}
