var canvasWidth = 3264,
  canvasHeight = 2448;
var img, from, to;
let steps = 20;
let colors = [];
let imageWidth = 2560 / 4 / 1;
let imageHeight = 1600 / 4 / 1;
let cc_id = "";
let next_save = {};

function setup() {
  // let canvas = createCanvas(canvasWidth, canvasHeight);
  // canvas.position(0,0);

  noLoop();

  let url = `http://localhost:8090/api/1/project_save/${next_save.save_id}/output`;
  loadJSON(url, data => {
    var scale = 1;//min(1.5, (canvasWidth / 2) / data.width);
    console.log(data);
    let json_desc = JSON.parse(data.save_data);
    json_desc.cc_id = data.cc_id;
    console.log(JSON.stringify(json_desc));
    let url = data.url;
    imageHeight = data.cc_height * scale;
    imageWidth = data.cc_width * scale;
    if (data.filename) {
      url = `http://localhost:8090/images/${data.filename}`;
      imageHeight = data.cc_local_cache_height * scale;
      imageWidth = data.cc_local_cache_width * scale;
    } else {
      console.log("Failed to find local cache. Fetch from: " + data.foreign_landing_url);
    }
    let canvas = createCanvas(imageWidth, imageHeight);
    canvas.position(0,0);
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

function preload() {
  next_save =  loadJSON("http://localhost:8090/api/1/next_project_save/2020-06-20");
}
