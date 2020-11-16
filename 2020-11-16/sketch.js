var canvasWidth = 1200,
  canvasHeight = 600;
let count = 10;
// https://colorhunt.co/palette/206721
let palette = ["e8ffc1", "a5ecd7", "51adcf", "0278ae"];
let rows = palette.length;


function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background("#f8ffd1")
  noLoop();
  noStroke();
  horizon(0);
  horizon(1);
  horizon(2);
  horizon(3);
}

function horizon(n) {
  let points = [];
  let baseY = canvasHeight / (rows - n + 0.5);
  console.log(baseY);
  for (let i = 0; i < count + 1; i++) {
    let x = lerp(0, canvasWidth, i / count);
    let y = randomGaussian() * 25 + baseY;
    let v = createVector(x, y);
    points.push(v);
  }
  fill(color("#" + palette[n]))
  beginShape();
    curveVertex(0, canvasHeight);
    curveVertex(0, canvasHeight * 2);
    curveVertex(points[0].x, points[0].y);
    points.forEach(p => {
      curveVertex(p.x, p.y);
    });
    curveVertex(points[points.length - 1].x, points[points.length - 1].y);
    curveVertex(canvasWidth, canvasHeight);
    curveVertex(canvasWidth, canvasHeight * 2);
  endShape(CLOSE);
}