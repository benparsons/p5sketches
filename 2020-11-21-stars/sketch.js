let canvasWidth = 500,
  canvasHeight = 500;
let img, pg;
let colors;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noStroke();


  // https://colorhunt.co/palette/206721
  let palette = [color("#e8ffc1"), color("#a5ecd7"), color("#51adcf"), color("#0278ae")];
  colors = coloring.lerp(palette, 10);


  pg = createGraphics(200, 200);
  pg.image(img, 0, 0)

  for (var x = 0; x < pg.width; x++) {
    for (var y = 0; y < pg.height; y++) {
      var c = pg.get(x, y);
      pg.stroke(getNearest(c));
      
      pg.point(x, y);
    }
  }

  image(pg, 0, 0);
  
  //noLoop();

  //background(153);
}

function draw() {
  // rect(leftDistance, topDistance, width, height)
  // fill(r, g, b); fill(grey); noFill();
  // map(value, in-range-min, in-range-max, out-range-min, out-range-max)
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