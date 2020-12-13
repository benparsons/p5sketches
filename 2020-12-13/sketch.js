var canvasWidth = 600,
  canvasHeight = 600;
let el;
let gridSizeX = 8;
let gridSizeY = 8;

let sizeX = canvasWidth / gridSizeX;
let sizeY = canvasHeight / gridSizeY;


function setup() {
  createCanvas(canvasWidth, canvasHeight);
  //noStroke();
  el = new El({size:0});
}

function draw() {
  background(255);
  console.log(el.location);
  el.render();
  el.tick();
  for (let x = 0; x < gridSizeX; x++) {
    for (let y = 0; y < gridSizeY; y++) {
      renderPanel(x, y);
    }
  }
}

function renderPanel(x, y) {
  stroke(100);
  if (el.location.x < (x * sizeX + sizeX)
  && el.location.x > (x * sizeX) &&
  el.location.y < (y * sizeY + sizeY)
  && el.location.y > (y * sizeY)) {
    fill(0);
  } else {
    noFill();

  }
  rect(x * sizeX, y * sizeY, sizeX, sizeY)
}