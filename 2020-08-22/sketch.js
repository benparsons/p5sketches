var canvasWidth = 600,
  canvasHeight = 600;
var img;
const scaleDown = 4;
let polygons = [];
let index = 0;
let adjustScale = 3;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noStroke();
  image(img, 0, 0, img.width / scaleDown, img.height / scaleDown);
  //noLoop();
  addPolygon(30, 20);
  addPolygon(100, 20);
  addPolygon(200, 20);
  addPolygon(300, 20);
  addPolygon(400, 20);
  addPolygon(30, 80);
  addPolygon(100, 80);
  addPolygon(200, 80);
  addPolygon(300, 80);
  addPolygon(400, 80);
  addPolygon(30, 140);
  addPolygon(100, 140);
  addPolygon(200, 140);
  addPolygon(300, 140);
  addPolygon(400, 140);
  addPolygon(30, 200);
  addPolygon(100, 200);
  addPolygon(200, 200);
  addPolygon(300, 200);
  addPolygon(400, 200);

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
  let v = int(random(0,6));
  polygons[index][v].x += int(random(-1-adjustScale,1+adjustScale));
  polygons[index][v].y += int(random(-1-adjustScale,1+adjustScale));
  
  let otherPolygons = [].concat(polygons)
  otherPolygons.splice(index, 1)
  
  for (polygon of otherPolygons) {
    // let ins = collidePointPoly([polygons[index][v].x, polygons[index][v].y],
    //   polygon.map(v => [v.x, v.y]));
    let ins = collidePointPoly(polygons[index][v].x, polygons[index][v].y, polygon);
    if (ins) {
      console.log(ins)
    }
  }
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
