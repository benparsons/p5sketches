var canvasWidth = 600,
  canvasHeight = 600;
var img;
const scaleDown = 4;
let polygons = [];
let index = 0;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noStroke();
  image(img, 0, 0, img.width / scaleDown, img.height / scaleDown);
  //noLoop();
  addPolygon(30, 20);
  addPolygon(100, 20);
  addPolygon(200, 20);
  addPolygon(300, 20);
  addPolygon(30, 80);
  addPolygon(100, 80);
  addPolygon(200, 80);
  addPolygon(300, 80);

  //background(153);
}

function draw() {
  // rect(leftDistance, topDistance, width, height)
  // fill(r, g, b); fill(grey); noFill();
  // map(value, in-range-min, in-range-max, out-range-min, out-range-max)
  background(100)
  stroke(1)
  drawPolygons();
  adjustPolygon();
}

function adjustPolygon() {
  console.log(index);
  let v = int(random(0,6));
  polygons[index][v].x += int(random(-2,2));
  polygons[index][v].y += int(random(-2,2));

  index > polygons.length - 2 ? index = 0 : index++;
}

function drawPolygons() {
  for (polygon of polygons) {
    beginShape();
    for (v of polygon) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
  }
}

function addPolygon(x, y) {
  let poly = [];
  poly.push(new p5.Vector(x, y));
  poly.push(new p5.Vector(x + 20, y));
  poly.push(new p5.Vector(x + 30, y + 20));
  poly.push(new p5.Vector(x + 20, y + 40));
  poly.push(new p5.Vector(x, y + 40));
  poly.push(new p5.Vector(x - 10, y + 20));
  polygons.push(poly);
}

function preload() {
  img = loadImage('../images/saturated-beach.jpg');
}

// https://stackoverflow.com/questions/22521982/check-if-point-is-inside-a-polygon
function inside(point, vs) {
  // ray-casting algorithm based on
  // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html
  
  var x = point[0], y = point[1];
  
  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0], yi = vs[i][1];
      var xj = vs[j][0], yj = vs[j][1];
      
      var intersect = ((yi > y) != (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
  }
  
  return inside;
};