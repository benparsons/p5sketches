var canvasWidth = 600,
  canvasHeight = 600;
var img;
const scaleDown = 4;
let polygons = [];
let index = 0;
let adjustScale = 1;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noStroke();
  image(img, 0, 0, img.width / scaleDown, img.height / scaleDown);
  //noLoop();
  [50,100,150,200].forEach(y => {
    [50,100,150,200,250].forEach(x => {
      addPolygon(x,y);
    })
  });

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
  index > polygons.length - 2 ? index = 0 : index++;
  let v = int(random(0,6));
  let newX = polygons[index][v].x + int(random(-1-adjustScale,1+adjustScale));
  let newY = polygons[index][v].y + int(random(-1-adjustScale,1+adjustScale));
  
  let otherPolygons = [].concat(polygons);
  otherPolygons.splice(index, 1);

  for (polygon of otherPolygons) {
    if (collidePointPoly(polygons[index][v].x, polygons[index][v].y, polygon)) {
      console.log("HIT");
      return;
    }
    for (let v of polygon) {
      if (collidePointPoly(v.x, v.y, polygons[index])) {
        console.log("HIT2");
        return;
      }
    }
  }

  polygons[index][v].x = newX;
  polygons[index][v].y = newY;

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
  poly.push(new p5.Vector(x + 30, y + 40));
  poly.push(new p5.Vector(x + 20, y + 40));
  poly.push(new p5.Vector(x + 10, y + 40));
  poly.push(new p5.Vector(x, y + 40));
  poly.push(new p5.Vector(x - 10, y + 20));
  polygons.push(poly);
}

function preload() {
  img = loadImage('../images/saturated-beach.jpg');
}
