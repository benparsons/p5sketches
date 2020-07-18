var canvasWidth = 1600,
  canvasHeight = 900;


var photo1;

function preload() {
  photo1 = loadImage('mana1.jpg');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noStroke();
  photo1.filter('posterize', 3);
  //photo1.filter('blur', 2);
  image(photo1, 0, 0);
}


function draw() {
  // rect(leftDistance, topDistance, width, height)
  // fill(r, g, b); fill(grey); noFill();
  // map(value, in-range-min, in-range-max, out-range-min, out-range-max)
}

