var canvasWidth = 600,
  canvasHeight = 600;
let gridSize = 10;
let blockSize = canvasWidth / gridSize;
let step = 0;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  stroke(0);
  ellipseMode(CENTER)

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      let sinStep = Math.sin(step / (gridSize * gridSize) * 2 * Math.PI);
      console.log(step, sinStep);
      ellipse(
        x * blockSize + blockSize / 2,
        y * blockSize + blockSize / 2,
         blockSize * sinStep, blockSize * sinStep);
      step++;
    }    
  }
}