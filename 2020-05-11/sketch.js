var canvasWidth = 600,
  canvasHeight = 600;
var palette;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  
  strokeWeight(frameCount);
  stroke(palette[frameCount][0].split(','));
  point(width/2,height/2);
}


function preload() {
  loadImage('../images/cedar-pine.jpg', img => {
    palette = processImage(img);
    console.log("din")
  });
}
