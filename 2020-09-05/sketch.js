// from https://github.com/benparsons/processing-sketches/tree/master/170601goddard/sketch_170601a

var canvasWidth = 2000,
  canvasHeight = 1000;


  let r, g, b;
  let  y;
  let buffer = 10;
  let delta = 10;
  let roughness = 7;


  function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background(0);
    start();
  }

  function start() {
    y = 0;
    r = 100;
    g = 100;
    b = 100;
    let seed = int(random(0, 9999999))
    randomSeed(seed);
    console.log(JSON.stringify({buffer, delta, roughness, seed}));
  }
  
  function draw() {
    stroke(0);
    if (y > height + roughness) {
      noLoop();
    }
    
    r = letRandInRange(r, buffer, 255 - buffer, delta);
    g = letRandInRange(g, buffer, 255 - buffer, delta);
    b = letRandInRange(b, buffer, 255 - buffer, delta);
    drawLine(y, color(r, g, b));
    y+=2;
    
  }
  
  function drawLine( y,  c) {
    stroke(c);
    let w = roughness;
    for (let i = -20; i < width; i++) {
      strokeWeight(w);
      point(i, y);
      w = letRandInRange(w, int(roughness/3), roughness + int(roughness / 3 * 2), 1);
    }
  }
  
  function letRandInRange( start,  min,  max,  delta) {
    start += random(-delta, delta + 1);
    if (start < min) return min;
    if (start > max) return max;
    return start;
  }

  function mousePressed(e) {
    if (e.buttons !== 1) return;
    start();
    loop();
  }
