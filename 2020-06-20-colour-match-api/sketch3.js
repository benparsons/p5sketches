var canvasWidth = 3264,
  canvasHeight = 2448;
var img, from, to;
let steps = 20;
let colors = [];
let imageWidth = 2560 / 4 / 1;
let imageHeight = 1600 / 4 / 1;
let cc_id = "";

function setup() {
  // let canvas = createCanvas(canvasWidth, canvasHeight);
  // canvas.position(0,0);

  noLoop();

  let url = "http://localhost:8090/api/1/project_save/21/output";
  loadJSON(url, data => {
    var scale = 1;//min(1.5, (canvasWidth / 2) / data.width);
    imageHeight = data.height * scale;
    imageWidth = data.width * scale;
    let canvas = createCanvas(imageWidth, imageHeight);
    canvas.position(0,0);
    console.log(data);
    let url = data.url;
    if (data.filename) {
      url = `http://localhost:8090/images/${data.filename}`;
    }
    img =loadImage(url, loadSourceImage);
    cc_id = data.cc_id;
    from = color(JSON.parse(data.save_data).from);
    to = color(JSON.parse(data.save_data).to);
  });
}

function loadSourceImage() {
  img.resize(imageWidth, imageHeight);
  image(img, 0, 0, imageWidth, imageHeight);

  renderFresh();
}

function renderFresh() {
  colors = [];
  for (var s = 0; s < steps; s++) {
    let lerpVal = (1 / steps) * (steps - s);
    colors.push(lerpColor(from, to, lerpVal));
  }
  
  for (var x = 0; x < imageWidth; x++) {
    for (var y = 0; y < imageHeight; y++) {
      var c = img.get(x, y);
      stroke(getNearest(c));
      
      point(x, y);
    }
  }
}
