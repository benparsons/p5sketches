var canvasWidth = 1200,
  canvasHeight = 600;
var palette;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noLoop();
  noStroke();
  var jump = 10;
  for(var i = 0; i < canvasWidth/jump; i++) {
    fill(palette[i][0].split(','));
    rect((i*jump)+jump, 0, jump, canvasHeight)
  }
}

function draw() {
  
  strokeWeight(frameCount);
  point(width/2,height/2);
}


function preload() {
  loadImage('../images/cedar-pine.jpg', img => {
    palette = processImage(img);
  });
}
