var canvasWidth = 1000,
  canvasHeight = 1000;
let ellipseSize = 200;
let jointWidth = 20;
let jointLength = 200;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noStroke();
  noLoop();

  let palette = coloring.colorhunt.random();
  let p = palette.palette;
  
  let colors = coloring.lerpSeparated(palette.palette, 10);
  // average backgound color, lightened
  background(
    (p[0].levels[0] + p[1].levels[0] + p[2].levels[0] + p[3].levels[0]) / 2.5,
    (p[0].levels[1] + p[1].levels[1] + p[2].levels[1] + p[3].levels[1]) / 2.5,
    (p[0].levels[2] + p[1].levels[2] + p[2].levels[2] + p[3].levels[2]) / 2.5
    );
  //console.log(colors);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 5; j++) {
      joint((200 * (i+1)) - jointWidth/2, 200*j, colors[0]);
    }
  }

  let temp = jointWidth;
  jointWidth = jointLength;
  jointLength = temp;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 4; j++) {
      joint((200 * i), 200*(j+1) - jointLength/2, colors[0]);
    }
  }

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      let ran = int(random(1, colors.length));
      ellipseBlock(200 * i, 200 * j, colors[ran]);
    }
  }
}

function joint(x, y, color) {
  if (random() > 0.7) return;
  let pg = createGraphics(jointWidth, jointLength);
  pg.noStroke();
  pg.fill(color.base);
  pg.rect(0,0,pg.width, pg.height);
  let top = createGraphics(jointWidth, jointLength);
  for (let i = 0; i < 1000; i++) {
    top.stroke(color.colors[int(random(0, color.colors.length))]);
    top.line(
      random(-50, pg.width+50),
      random(-50, pg.height+50),
      random(-50, pg.width+50),
      random(-50, pg.height+50))
  }
  var imgTop = createImage(top.width,top.height);
  imgTop.copy(top, 0, 0, top.width, top.height, 0, 0, top.width, top.height);
  imgTop.mask(pg);
  image(imgTop, x, y);
}

function ellipseBlock(x, y, color) {
  if (random() > 0.5) return;
  let pg = createGraphics(ellipseSize, ellipseSize);
  pg.noStroke();
  pg.fill(color.base)
  pg.ellipse(pg.width/2, pg.height/2, ellipseSize, ellipseSize)
  let top = createGraphics(ellipseSize, ellipseSize);
  for (let i = 0; i < 1000; i++) {
    top.stroke(color.colors[int(random(0, color.colors.length))]);
    top.line(
      random(-50, pg.width+50),
      random(-50, pg.height+50),
      random(-50, pg.width+50),
      random(-50, pg.height+50));
  }
  var imgTop = createImage(top.width,top.height);
  //https://github.com/processing/p5.js/issues/2841
  imgTop.copy(top, 0, 0, top.width, top.height, 0, 0, top.width, top.height);
  imgTop.mask(pg);

  image(pg, x, y)
  image(imgTop, x, y)
}
