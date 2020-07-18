var canvasWidth = 1500,
  canvasHeight = 1000;
  let el1, el2;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  el1 = new El();
  el2 = new El();
  noStroke();
  //noLoop();

  //background(153);
}

function draw() {
  background(100);
  el1.tick();
  el1.render(32);
  el2.tick();
  el2.render(16);
  el2.chase(el1);
}

function El () {
  this.location = new p5.Vector(canvasWidth/8, canvasHeight/4);
  this.velocity = new p5.Vector(-1, 1);
  this.variance = 0.15;
  this.color = color(random(255),random(255),random(255))
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
  this.render = (size) => {
    fill(this.color);
    ellipse(this.location.x, this.location.y, size, size);
  }
  this.chase = (el) => {
    let diff = p5.Vector.sub(el.location, this.location);
    //console.log(diff.heading()- this.velocity.heading());
    this.velocity.rotate((diff.heading()- this.velocity.heading()) *0.1);
    // this.velocity.x *= random(1-this.variance/10, 1/(1-this.variance/10));
    // this.velocity.y *= random(1-this.variance/10, 1/(1-this.variance/10));
  }
}