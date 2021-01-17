var canvasWidth = 3264,
  canvasHeight = 2448;
var img, from, to;
let steps = 20;
let colors = [];
let imageWidth = 2560 / 4 / 1;
let imageHeight = 1600 / 4 / 1;
let next_save = {};

function setup() {
  // let canvas = createCanvas(canvasWidth, canvasHeight);
  // canvas.position(0,0);

  noLoop();

  let params = new URLSearchParams(location.search);
  let url = params.get("url");
  let cc_height = params.get("cc_height");
  let cc_width = params.get("cc_width");
  let save_data = params.get("save_data");
  console.log(save_data);
  
  var scale = 1;//min(1.5, (canvasWidth / 2) / data.width);
  imageHeight = cc_height * scale;
  imageWidth = cc_width * scale;
  let canvas = createCanvas(imageWidth, imageHeight);
  canvas.position(0,0);
  img =loadImage(url, loadSourceImage);
  from = color(JSON.parse(save_data).from);
  to = color(JSON.parse(save_data).to);
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

function preload() {
  next_save =  loadJSON("http://localhost:8090/api/1/next_project_save/2020-06-20");
}
