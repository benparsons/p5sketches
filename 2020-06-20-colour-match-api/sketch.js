var canvasWidth = 1280,
  canvasHeight = 800;
var img, from, to;
let steps = 20;
let colors = [];
let imageWidth = 2560 / 4 / 1;
let imageHeight = 1600 / 4 / 1;
let cc_id = "";

function setup() {
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position(0,0);

  let buttonYes = createButton('YES');
  buttonYes.position(canvasWidth + 10, canvasHeight / 2);
  buttonYes.mousePressed(() => clickYes(from, to));

  let buttonNo = createButton('NO');
  buttonNo.position(canvasWidth + 10, canvasHeight / 2 + 20);
  buttonNo.mousePressed(() => renderFresh());

  noLoop();

  loadNewImage();
}

function loadSourceImage() {
  img.resize(imageWidth, imageHeight);
  image(img, 0, 0, imageWidth, imageHeight);

  renderFresh();
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
  //console.log(from.levels, to.levels);
  let url = `http://localhost:8090/api/1/save/2020-06-20/${cc_id}/${encodeURI(JSON.stringify({from: from.levels, to: to.levels}))}`;
  loadJSON(url, data => {
  });
  renderFresh();
}

function loadNewImage() {
  let url = "http://localhost:8090/api/1/get/scene";
  loadJSON(url, data => {
    var scale = min(1.5, (canvasWidth / 2) / data.width);
    imageHeight = data.height * scale;
    imageWidth = data.width * scale;
    console.log(data);
    img =loadImage(data.url, loadSourceImage);
    cc_id = data.cc_id;
  });
}
