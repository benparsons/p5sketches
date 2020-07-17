
var canvasWidth = 1000,
  canvasHeight = 300;
let els = [];
let count = 50;
for (let i = 0; i < count; i++) {
  els.push(new El());
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  //noStroke();
  //noLoop();

  //background(153);
}

function draw() {
  //background(100);
  els.forEach(el => {
    el.tick();
    el.render();
  })
  // if (frameCount == 1000) {
  //   fill(50);
  // }
  // if (frameCount == 1001) {
  //   noLoop();
  // }
}

function El () {
  this.location = new p5.Vector(canvasWidth/8, canvasHeight/4);
  this.velocity = new p5.Vector(-1, 1);
  this.variance = 0.15;
  this.tick = () => {
    this.location.add(this.velocity);

    // check bounce
    if (this.location.x < 0  || this.location.x > canvasWidth) {
      this.location.x = Math.min(canvasWidth, this.location.x);
      this.location.x = Math.max(0, this.location.x);
      this.velocity.x *= -1 * random(1-this.variance, 1/(1-this.variance));
    }
    if (this.location.y < 0  || this.location.y > canvasHeight) {
      this.location.y = Math.min(canvasHeight, this.location.y);
      this.location.y = Math.max(0, this.location.y);
      this.velocity.y *= -1 * random(1-this.variance, 1/(1-this.variance));
    }
  }
  this.render = () => {
    ellipse(this.location.x, this.location.y, 16, 16);
  }
}