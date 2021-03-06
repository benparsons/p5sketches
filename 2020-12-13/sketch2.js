var canvasWidth = 600,
  canvasHeight = 600;
let el;
let gridSizeX = 8;
let gridSizeY = 8;

let sizeX = canvasWidth / gridSizeX;
let sizeY = canvasHeight / gridSizeY;
let panels = [];


function setup() {
  createCanvas(canvasWidth, canvasHeight);
  //noStroke();
  el = new El({size:0});
  for (let x = 0; x < gridSizeX; x++) {
    for (let y = 0; y < gridSizeY; y++) {
      panels.push(new Panel({x: x, y: y, freshness: 0}))
    }
  }
}

function draw() {
  background(255);
  el.render();
  el.tick();
  panels.forEach(p => {
    p.render(el);
  });
}

function Panel ({x = 0, y = 0, freshness = 10} = {}) {
  this.render = (el) => {
    stroke(100);
    if (el.location.x < (x * sizeX + sizeX)
    && el.location.x > (x * sizeX) &&
    el.location.y < (y * sizeY + sizeY)
    && el.location.y > (y * sizeY)) {
      freshness = 255;
    }

    if (freshness == 0) {
      noFill();
    } else {
      fill(255 - freshness);
    }
    rect(x * sizeX, y * sizeY, sizeX, sizeY)
    //console.log(freshness);
    if (freshness > 0) freshness--;
  }
}