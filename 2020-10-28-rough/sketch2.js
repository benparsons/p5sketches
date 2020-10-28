var canvasWidth = 600,
  canvasHeight = 600;



function setup() {
  createCanvas(canvasWidth, canvasHeight);
  let c = color("#4e89ae");
  let result = roughEllipse(100, 100, c);
  image(result, 0, 0)
}

function roughEllipse(w, h, c) {
  let pgMask = createGraphics(w, h);
  let pgTop = createGraphics(w, h);
  let upper = lerpColor(color(255, 255, 255, 255), c, 0.9);
  let lower = lerpColor(color(0, 0, 0, 255), c, 0.9);
  pgMask.noStroke();
  pgMask.fill(c);
  pgMask.ellipse(w / 2, h / 2, w, h);

  noLoop();
  pgTop.fill(c);
  pgTop.ellipse(w / 2, h / 2, w, h);
  for (let i = 0; i < 1000; i++) {
    pgTop.stroke(lerpColor(upper, lower, random(0, 1)));
    pgTop.line(random(0, w), random(0, h), random(0, w), random(0, h))
  }
  var imgTop = createImage(pgTop.width,pgTop.height);
  //https://github.com/processing/p5.js/issues/2841
  imgTop.copy(pgTop, 0, 0, pgTop.width, pgTop.height, 0, 0, pgTop.width, pgTop.height);
  imgTop.mask(pgMask);
  return imgTop;
}