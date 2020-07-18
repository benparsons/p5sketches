var canvasWidth = 2000,
  canvasHeight = 1200;
  let el1;
  let chasers = [];
let pg;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  pg = createGraphics(canvasWidth, canvasHeight);
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
  //frameRate(10);
  //noLoop();

  //background(153);
}


function mousePressed() {
  loop();
}
function mouseReleased() {
  noLoop();
}

let camera = {
  x: 0, y: 0,
  width: canvasWidth / 2,
  height: canvasHeight / 2
}
function draw() {
  //pg.background(100);
  background(100);
  //drawOverlay(pg);
  el1.tick();
  //el1.render();
  chasers.forEach(el => {
    el.tick();
    el.render();
    el.chase(el1);
  })
  //image(pg, 0, 0, canvasWidth, canvasHeight);
  //image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight])
  adjustCamera();
  image(pg, 0, 0, canvasWidth, canvasHeight, 
    camera.x,
    camera.y,
    camera.width,
    camera.height);
}

function drawOverlay(pg) {
  let scale = 50;
  let gridWidth = 80, gridHeight = 80;
  for (var x = 0; x <= gridWidth; x++) {
    pg.stroke(255, 0, 0);
    pg.strokeWeight(1);
    pg.line(x * scale, 0, x * scale, canvasHeight);
  }
  for (var y = 0; y <= gridHeight; y++) {
    pg.stroke(255, 0, 0);
    pg.strokeWeight(1);
    pg.line(0, y * scale, canvasWidth, y * scale);
  }
  pg.stroke(0, 0, 0);
}

function adjustCamera() {
  let minX = Math.min(...chasers.map(c => {return c.location.x}));
  let maxX = Math.max(...chasers.map(c => {return c.location.x}));
  let minY = Math.min(...chasers.map(c => {return c.location.y}));
  let maxY = Math.max(...chasers.map(c => {return c.location.y}));
  let aveX = chasers
    .map(c => { return c.location.x })
    .reduce((a, b) => a + b, 0)
  / chasers.length;
  let aveY = chasers
    .map(c => { return c.location.y })
    .reduce((a, b) => a + b, 0)
  / chasers.length;

  if (aveX < camera.x + (camera.width / 2) ) {
    camera.x--;
  } else {
    camera.x++;
  }
  camera.x = Math.max(camera.x, 0);
  camera.x = Math.min(camera.x, canvasWidth - camera.width);

  if (aveY < camera.y + (camera.height / 2) ) {
    camera.y--;
  } else {
    camera.y++;
  }
  camera.y = Math.max(camera.y, 0);
  camera.y = Math.min(camera.y, canvasHeight - camera.height);

  if ((maxX - minX) * 1.5 > camera.width &&
    (maxY - minY) * 1.5 > camera.height) {
    camera.width++;
    camera.width++;
  } else {
    camera.width--;
  }
  camera.height = camera.width / canvasWidth * canvasHeight;

  return;
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
    pg.fill(this.color);
    pg.ellipse(this.location.x, this.location.y, size, size);
  }
  this.chase = (el) => {
    let diff = p5.Vector.sub(el.location, this.location);
    //this.velocity.rotate((diff.heading()- this.velocity.heading()) *0.1);
    diff.mult(0.001);
    
    this.acceleration.add(diff);
    this.acceleration.limit(accelerationLimit);
  }
}