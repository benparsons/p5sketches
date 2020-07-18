var canvasWidth = 2000,
  canvasHeight = 1200;
  let el1;
  let chasers = [];

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  el1 = new El({size:32});
  chasers.push(new El({velocityLimit:0.5, accelerationLimit: 1})); // too slow
  chasers.push(new El({velocityLimit:1, accelerationLimit: 1})); // good laggy
  chasers.push(new El({velocityLimit:2, accelerationLimit: 1})); // good, very keen
  chasers.push(new El({velocityLimit:3, accelerationLimit: 1})); // good, keen
  chasers.push(new El({velocityLimit:5, accelerationLimit: 1})); // good, very wild
  chasers.push(new El({velocityLimit:6, accelerationLimit: 1})); // erratic
  // chasers.push(new El({velocityLimit:7, accelerationLimit: 1, size: 16})); // very erratic
  // chasers.push(new El({velocityLimit:8, accelerationLimit: 1, size: 16})); // very erratic
  // chasers.push(new El({velocityLimit:9, accelerationLimit: 2, size: 16})); // too erratic
  chasers.push(new El({velocityLimit:5, accelerationLimit: 0.1})); // good, wild
  chasers.push(new El({velocityLimit:5, accelerationLimit: 0.01})); // good, calm
  noStroke();
  //frameRate(10);
  //noLoop();

  //background(153);
}

function mouseClicked() {
  draw();
}

function draw() {
  background(100);
  el1.tick();
  //el1.render();
  chasers.forEach(el => {
    el.tick();
    el.render();
    el.chase(el1);
  })
}

function El ({velocityLimit = 5, accelerationLimit = 0.1, size = 8} = {}) {
  this.location = new p5.Vector(canvasWidth/16, canvasHeight/4);
  this.velocity = new p5.Vector(-1, 1);
  this.acceleration = new p5.Vector(0, 0);
  this.variance = 0.15;
  this.color = color(random(255),random(255),random(255))
  this.tick = () => {
    this.velocity.add(this.acceleration);
    this.velocity.limit(velocityLimit);
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
    fill(this.color);
    ellipse(this.location.x, this.location.y, size, size);
  }
  this.chase = (el) => {
    let diff = p5.Vector.sub(el.location, this.location);
    //this.velocity.rotate((diff.heading()- this.velocity.heading()) *0.1);
    diff.mult(0.001);
    
    this.acceleration.add(diff);
    this.acceleration.limit(accelerationLimit);
  }
}