var canvasWidth = 600,
  canvasHeight = 600;

function Obj(x, y) {
  this.size = 1;
  this.direction = 1;
  this.x = x;
  this.y = y;

  this.render = function () {
    fill(255 - (2*this.size));
    ellipse(x, y, this.size, this.size);
  }
  this.step = function() {
    if (this.size == 0 || this.size == 100) {
      this.direction = -this.direction;
    }
    this.size += this.direction;
  }
}
var things = [];
things.push(new Obj(100, 150));


function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noStroke();
  //noLoop();

  //background(153);
}

function draw() {
  // rect(leftDistance, topDistance, width, height)
  // fill(r, g, b); fill(grey); noFill();
  // map(value, in-range-min, in-range-max, out-range-min, out-range-max)
  things.sort(function(a, b) {
    return a.size - b.size;
  })

  background(255);
  things.forEach(function(thing) {
    thing.step();
    thing.render();
  });
}

function mouseClicked() {
  console.log(mouseX, mouseY);
  things.push(new Obj(mouseX, mouseY));
}
