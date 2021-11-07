var canvasWidth = 320,
  canvasHeight = 320;

let pgSource, pgTarget, el, elvis, pen;

function preload() {
  elvis = loadImage('../images/saturated-beach.jpg');
  
}

function setup() {
  frameRate(800);
  createCanvas(canvasWidth, canvasHeight);

  //noStroke();
  pgSource = createGraphics(canvasWidth, canvasHeight);
  pgTarget = createGraphics(canvasWidth, canvasHeight);
  // pgSource.strokeWeight(5);
  // pgSource.stroke(255, 0, 0)
  // pgSource.fill(255, 0, 0);
  // pgSource.rect(25, 150, 100, 100);
  pgSource.background(255);
  pgSource.image(elvis, 10, 10, 300, 300);

  el = new El({size:32});
  pen = new El({velocityLimit:3, accelerationLimit: 1})
  el.render = function() {
    fill(this.color);
    //ellipse(this.location.x, this.location.y, 2, 2);
    line(this.location.x, this.location.y, this.prevLocation.x, this.prevLocation.y);
    let source = pgSource.get(this.location.x, this.location.y);
    //console.log(source);
    if (source[0] < 100) {
      pgTarget.stroke(0, 0, 255);
      pgTarget.line(this.location.x, this.location.y, this.prevLocation.x, this.prevLocation.y);
    }
  }


  pen.render = function() {
    fill(this.color);
    //ellipse(this.location.x, this.location.y, 2, 2);
    line(this.location.x, this.location.y, this.prevLocation.x, this.prevLocation.y);
    let source = pgSource.get(this.location.x, this.location.y);
    //console.log(source);

    pgTarget.stroke(source[0], source[1], source[2]);
      pgTarget.strokeWeight(10);
    pgTarget.line(this.location.x, this.location.y, this.prevLocation.x, this.prevLocation.y);
    
  }



  //noLoop();

  //background(153);
}

function mousePressed() {
  loop();
}
function mouseReleased() {
  noLoop();
}

function draw() {
  background(255);
  //image(pgSource, 0, 0, canvasWidth, canvasHeight);
  image(pgTarget, 0, 0, canvasWidth, canvasHeight);
  el.tick();
  //el.render();

  pen.tick();
  pen.render();
  pen.chase(el);

  // rect(leftDistance, topDistance, width, height)
  // fill(r, g, b); fill(grey); noFill();
  // map(value, in-range-min, in-range-max, out-range-min, out-range-max)
}


function El ({velocityLimit = 5, accelerationLimit = 0.1, size = 8} = {}) {
  this.prevLocation = null;
  this.location = new p5.Vector(canvasWidth/16, canvasHeight/4);
  this.velocity = new p5.Vector(-1, 1);
  this.acceleration = new p5.Vector(0, 0);
  this.variance = 0.15;
  //this.color = color(random(255),random(255),random(255))
  this.color = color(0,random(255),random(255))
  this.tick = () => {
    this.prevLocation = Object.assign({}, this.location);
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
    //pg.noStroke();
    ellipse(this.location.x, this.location.y, size, size);
    console.log(this);
  }
  this.chase = (el) => {
    let diff = p5.Vector.sub(el.location, this.location);
    //this.velocity.rotate((diff.heading()- this.velocity.heading()) *0.1);
    diff.mult(0.001);
    
    this.acceleration.add(diff);
    this.acceleration.limit(accelerationLimit);
  }
}