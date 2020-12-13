var canvasWidth = 600,
  canvasHeight = 600;
let el;
let el2;

let sizeX;
let sizeY;
let panels = [];

let config = {
  gridSizeX: 80,
  gridSizeY: 80,
  gridColor: 230,
  freshnessBoost: 20
}

// let config = {
//   gridSizeX: 20,
//   gridSizeY: 20,
//   gridColor: 180,
//   freshnessBoost: 5
// }

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  sizeX = canvasWidth / config.gridSizeX;
  sizeY = canvasHeight / config.gridSizeY;
  //noStroke();
  el = new El({size:8});
  el2 = new El({size:8});
  for (let x = 0; x < config.gridSizeX; x++) {
    for (let y = 0; y < config.gridSizeY; y++) {
      panels.push(new Panel({x: x, y: y, freshness: 0}))
    }
  }
}

function draw() {
  background(255);
  el.tick();
  panels.forEach(p => {
    p.render([el, el2]);
  });
  //el.render();
  el2.tick();
  //el2.render();
  el2.chase(el);
}

function Panel ({x = 0, y = 0, freshness = 10} = {}) {
  this.render = (els) => {
    stroke(config.gridColor);
    els.forEach(el => {
      if (el.location.x < (x * sizeX + sizeX)
      && el.location.x > (x * sizeX) &&
      el.location.y < (y * sizeY + sizeY)
      && el.location.y > (y * sizeY)) {
        freshness += config.freshnessBoost;
      }
    });

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