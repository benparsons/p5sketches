var canvasWidth = 1280,
  canvasHeight = 800;
var img, from, to;
let steps = 20;
let colors = [];
let imageWidth = 2560 / 4 / 1;
let imageHeight = 1600 / 4 / 1;
let cc_id = "";
let textStatus;

function setup() {
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position(0,0);

  let buttonYes = createButton('YES');
  buttonYes.position(canvasWidth + 10, canvasHeight / 2);
  buttonYes.mousePressed(() => clickYes(from, to));

  let buttonNo = createButton('NO');
  buttonNo.position(canvasWidth + 10, canvasHeight / 2 + 20);
  buttonNo.mousePressed(() => renderFresh());

  textStatus = createP("");
  textStatus.position(canvasWidth + 10, canvasHeight / 2 + 40)

  noLoop();

  loadNewImage();
}

function loadSourceImage() {
  img.resize(imageWidth, imageHeight);
  image(img, 0, 0, imageWidth, imageHeight);

  renderFresh();
}

function renderFresh() {
  textStatus.html("Picking new colours")
  from = color(
    int(random(256)),
    int(random(256)),
    int(random(256)));
  to = color(
    int(random(256)),
    int(random(256)),
    int(random(256)));

  textStatus.html("Lerping")
  colors = [];
  for (var s = 0; s < steps; s++) {
    let lerpVal = (1 / steps) * (steps - s);
    colors.push(lerpColor(from, to, lerpVal));
  }
  
  textStatus.html("Updating render")
  for (var x = 0; x < imageWidth; x++) {
    for (var y = 0; y < imageHeight; y++) {
      var c = img.get(x, y);
      stroke(getNearest(c));
      
      point(x + 640, y);
    }
  }
  textStatus.html("Render done")
}

function clickYes(from, to) {
  textStatus.html("Sending data");
  //console.log(from.levels, to.levels);
  let url = `http://localhost:8090/api/1/save/2020-06-20/${cc_id}/${encodeURI(JSON.stringify({from: from.levels, to: to.levels}))}`;
  loadJSON(url, data => {
  });
  renderFresh();
}

function loadNewImage() {
  textStatus.html("Selecting new image")
  let url = "http://localhost:8090/api/1/get/scene";
  loadJSON(url, data => {
    var scale = min(1.5, (canvasWidth / 2) / data.width);
    imageHeight = data.height * scale;
    imageWidth = data.width * scale;
    console.log(data);
    textStatus.html("Downloading new image")
    img =loadImage(data.url, loadSourceImage);
    cc_id = data.cc_id;
  });
}
