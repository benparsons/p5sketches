var canvasWidth = 1200,
  canvasHeight = 600;

let palette = ["4e89ae", "43658b", "ed6663", "ffa372"]; // 201413
let avgColor, bgColor;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
    loadPalette();
  for (let i = 0; i < 20; i++) {
    //let c = color("#4e89ae");
    let result = roughEllipse(250, 250, palette[int(random(0, palette.length))], 0.09, 0.2);
    image(result, 
      canvasWidth / 2 + randomGaussian() * canvasWidth / 3,
      canvasHeight / 2 + randomGaussian() * canvasHeight / 3)
  }
}

function loadPalette() {
  let r = 0, b = 0, g = 0;
  for (let p in palette) {
    let c = color("#" + palette[p]);
    palette[p] = c;
    r += c.levels[0];
    g += c.levels[1];
    b += c.levels[2];
  }
  avgColor = color(r/palette.length, g/palette.length, b/palette.length, 255);
  bgColor = lerpColor(color(255, 255, 255, 255), avgColor, 0.25)
  background(bgColor);

}

function roughEllipse(w, h, c, lr, quality) {
  let pgMask = createGraphics(w, h);
  let pgTop = createGraphics(w, h);
  let upper = lerpColor(color(255, 255, 255, 255), c, 1 - lr);
  let lower = lerpColor(color(0, 0, 0, 255), c, 1 - lr);
  let lines = w * h * quality / 4;
  pgMask.noStroke();
  pgMask.fill(c);
  pgMask.ellipse(w / 2, h / 2, w, h);

  pgTop.fill(c);
  //pgTop.ellipse(w / 2, h / 2, w, h);
  for (let i = 0; i < lines; i++) {
    let tempColor = lerpColor(upper, lower, random(0, 1));
    pgTop.stroke(tempColor);
    pgTop.line(random(0, w) - 10, random(0, h) - 10, random(0, w) + 10, random(0, h) + 10)
  }
  var imgTop = createImage(pgTop.width,pgTop.height);
  //https://github.com/processing/p5.js/issues/2841
  imgTop.copy(pgTop, 0, 0, pgTop.width, pgTop.height, 0, 0, pgTop.width, pgTop.height);
  imgTop.mask(pgMask);
  return imgTop;
}