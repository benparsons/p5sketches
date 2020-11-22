var canvasWidth = 600,
  canvasHeight = 600;
let ellipseSize = 100;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noStroke();
  noLoop();

  let palette = coloring.colorhunt.random();
  colors = coloring.lerpSeparated(palette.palette, 10);
  //console.log(colors);


  let pg = createGraphics(ellipseSize, ellipseSize);
  pg.noStroke();
  pg.fill(colors[1].base)
  pg.ellipse(pg.width/2, pg.height/2, ellipseSize, ellipseSize)
  let top = createGraphics(ellipseSize, ellipseSize);
  for (let i = 0; i < 1000; i++) {
    top.stroke(colors[1].colors[int(random(0, colors[0].colors.length))]);
    top.line(random(-50, 150),random(-50, 150),random(-50, 150), random(-50, 150));
  }
  var imgTop = createImage(top.width,top.height);
  //https://github.com/processing/p5.js/issues/2841
  imgTop.copy(top, 0, 0, top.width, top.height, 0, 0, top.width, top.height);
  imgTop.mask(pg);


  image(pg, 400, 200)

  image(pg, 200, 200)
  image(imgTop, 200, 200)

  //background(153);
}
