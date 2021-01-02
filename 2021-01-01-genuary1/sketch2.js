var canvasWidth = 1200,
  canvasHeight = 1200;
let gridSize = 15;
let blockSize = canvasWidth / gridSize;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(255);
  stroke(0);
  noFill();
  ellipseMode(CENTER)

  let step = -10;
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      let sinStep = Math.sin(step / (gridSize * gridSize) * 2 * Math.PI) + 1;
      console.log(step, sinStep, x, y);

      for (let s = 0; s < blockSize / 2 * sinStep; s += 1) {
        stroke(s * 5);
        ellipse(
          x * blockSize + blockSize / 2,
          y * blockSize + blockSize / 2,
          s, s);
        //console.log("\t" + s);
      }
      step++;
    }  
  }
}