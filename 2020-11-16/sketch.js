var canvasWidth = 1200,
  canvasHeight = 600;
let count = 10;

// https://colorhunt.co/palette/206721
let palette = ["0278ae", "51adcf", "a5ecd7", "e8ffc1"]; // 201413

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noLoop();
  let points = [];
  for (let i = 0; i < count + 1; i++) {
    let x = lerp(0, canvasWidth, i / count);
    let y = randomGaussian() * 25 + canvasHeight / 2;
    let v = createVector(x, y);
    console.log(i / count, v);
    points.push(v);
  }
  console.log(points);
  fill(color("#" + palette[0]))
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

