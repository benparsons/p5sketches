var canvasWidth = 1280,
  canvasHeight = 400;
var img, from, to;
let steps = 20;
let colors = [];
let imageWidth = 2560 / 4 / 1;
let imageHeight = 1600 / 4 / 1;

function setup() {
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position(0,0);

  let buttonYes = createButton('YES');
  buttonYes.position(canvasWidth + 10, canvasHeight / 2);
  buttonYes.mousePressed(() => clickYes(from, to));

  let buttonNo = createButton('NO');
  buttonNo.position(canvasWidth + 10, canvasHeight / 2 + 20);
  buttonNo.mousePressed(() => renderFresh());

  img.resize(imageWidth, imageHeight);
  image(img, 0, 0, imageWidth, imageHeight);

  renderFresh();

  noLoop();
}

function renderFresh() {
  from = color(
    int(random(256)),
    int(random(256)),
    int(random(256)));
  to = color(
    int(random(256)),
    int(random(256)),
    int(random(256)));

  colors = [];
  for (var s = 0; s < steps; s++) {
    let lerpVal = (1 / steps) * (steps - s);
    colors.push(lerpColor(from, to, lerpVal));
  }
  
  for (var x = 0; x < imageWidth; x++) {
    for (var y = 0; y < imageHeight; y++) {
      var c = img.get(x, y);
      stroke(getNearest(c));
      
      point(x + 640, y);
    }
  }
}

function getNearest(c) {
  var dist = Infinity;
  var result;
  for (test of colors) {
    var testDist = 
      Math.abs(test.levels[0]-c[0]) +
      Math.abs(test.levels[1]-c[1]) +
      Math.abs(test.levels[2]-c[2]);
    if (testDist < dist) {
      dist = testDist;
      result = test;
    }
  }
  return result;
}

function clickYes(from, to) {
  console.log(from.levels, to.levels);
  renderFresh();
}

function preload() {
  img = loadImage('../images/saturated-beach.jpg');
  //img = loadImage('https://live.staticflickr.com/4309/35596559130_43d0542002_b.jpg');
  //img = loadImage('https://live.staticflickr.com/574/31776310961_3375a42d12_b.jpg');
  //img = loadImage('https://live.staticflickr.com/2/3624041_7c482691d2.jpg');
  //img = loadImage('https://upload.wikimedia.org/wikipedia/commons/d/d5/Summer_Mornings.jpg');
  //img = loadImage('https://live.staticflickr.com/8106/8660580696_2a99f5d9df_b.jpg');
  //img = loadImage('https://live.staticflickr.com/7294/9580949783_a809b354ba_b.jpg');
  //img = loadImage('https://live.staticflickr.com/5081/13974027615_0edbe3dcfa_b.jpg');
  //img = loadImage('https://live.staticflickr.com/5304/5646546879_5de79dffcd_b.jpg');
}