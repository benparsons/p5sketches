var canvasWidth = 740,
  canvasHeight = 500;

let config = {
  colorIndex: 3,
  lerpSteps: 5
};

function setup() {
  let canvas = createCanvas(canvasWidth, canvasHeight);
  coloring.init();
  canvas.position(0,0);
  image(img, 0, 0);

  renderFresh();

  noLoop();
}

function renderFresh() {
  let basePalette = coloring.colorhunt.colors[config.colorIndex];
  console.log(JSON.stringify(config));
  let colors = coloring.lerp(basePalette.palette, config.lerpSteps);
  for (var x = 0; x < canvasWidth; x++) {
    for (var y = 0; y < canvasHeight; y++) {
      var c = img.get(x, y);
      stroke(coloring.getNearest(c, colors));
      
      point(x, y);
    }
  }
}

function preload() {
  img = loadImage('../images/stanley-cursiter-a-view-of-cassis.jpg');
}