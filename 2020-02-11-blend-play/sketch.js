var images = [];
var index = 0;

function preload() {
  for (var i = 1; i <= 9; i++) {
    images.push(loadImage(`../images/bright-run/${i}.jpg`));
  }
}


function setup() {
  createCanvas(640, 480);
  blendMode(SUBTRACT);
  //frameRate(2)
}

function draw() {
  if (index>8) {
    blendMode(LIGHTEST);
    index = 0;
    background(255);
    blendMode(SUBTRACT);
  }
  image(images[index], 0, 0);
  index++;
}