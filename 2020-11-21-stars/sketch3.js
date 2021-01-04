let canvasWidth = 1000,
  canvasHeight = 1000;
let img, pg;
let colors;
let pgs = [];

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noStroke();


  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      let palette = coloring.colorhunt.random();
      console.log(palette)
      colors = coloring.lerp(palette.palette, 10);

      pg = createGraphics(200, 200);
      pg.image(img, random(-1000, 0), random(-1000, 0))

      for (var x = 0; x < pg.width; x++) {
        for (var y = 0; y < pg.height; y++) {
          var c = pg.get(x, y);
          pg.stroke(getNearest(c));
          
          pg.point(x, y);
        }
      }

      image(pg, i * 200, j * 200);
      if (! pgs[i]) pgs[i] = [];
      pgs[i][j] = pg;
    }
  }
  noLoop();
}



function preload() {
  img = loadImage('../images/potw2022a.jpg');
}

// from 2020-06-15-colour-match
function getNearest(c) {
  var dist = Infinity;
  var result;
  for (test of colors) {
    var testDist = 
      Math.abs(test.levels[0]-c[0]) +
      Math.abs(test.levels[1]-c[1]) +
      Math.abs(test.levels[2]-c[2]);
    if (testDist < dist) {
      dist = testDist;
      result = test;
    }
  }
  return result;
}

function mouseClicked() {
  let x = Math.floor(mouseX / 200);
  let y = Math.floor(mouseY / 200);
  
  
  push();
  translate(width,0);
  scale(-1.0,1.0);
  image(pgs[x][y], (3 - x) * 200, y * 200);
  pop();
}