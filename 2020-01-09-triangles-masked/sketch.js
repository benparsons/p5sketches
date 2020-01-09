// https://twitter.com/inconvergent/status/1215360259889541126/photo/1

var a = { x: 240, y: 50 };
var b = { x: 123, y: 200 };
var c = { x: 300, y: 250 };

var d = { x: 50, y: 100 };
var e = { x: 123, y: 200 };
var f = { x: 240, y: 50 };

function setup() {
  createCanvas(480, 480);
  background(0);
  noStroke();
  fill('rgba(0,255,0, 0.5)');
  rect(20, 20, 50, 50);
  rect(70, 20, 50, 50);
  let black = color(noise(10, 10) * 255);
  for (var x = 20; x < 70; x++) {
    for (var y = 20; y < 70; y++) {
      let c = get(x, y);
      set(x, y, color(`rgba(${c[0]},${c[1]},${c[2]}, ${noise(x, y)})`));
    }
  }
  updatePixels();
  fill('rgba(0,255,0, 0.5)');
  triangle(a.x, a.y, b.x, b.y, c.x, c.y);
  fill('rgba(0,255,255, 0.5)');
  triangle(d.x, d.y, e.x, e.y, f.x, f.y);
//return;
loadPixels();
  for (var x = Math.min(d.x, e.x, f.x); x < Math.max(d.x, e.x, f.x); x++) {
    for (var y = Math.min(d.y, e.y, f.y); y < Math.max(d.y, e.y, f.y); y++) {
      if (ptInTriangle({x:x,y:y}, d,e,f)) {
        let c = get(x, y);
        set(x, y, color(`rgba(${c[0]},${c[1]},${c[2]}, ${noise(x, y)})`));
      }
    }
  }
  updatePixels();
}

function mouseClicked(event) {
  console.log(event);
  console.log(ptInTriangle({x: event.clientX, y: event.clientY}, d, e, f));
}


// https://en.wikipedia.org/wiki/Barycentric_coordinate_system#Barycentric_coordinates_on_triangles
// https://stackoverflow.com/a/34093754/384316
function ptInTriangle(p, p0, p1, p2) {
  var A = 1 / 2 * (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y);
  var sign = A < 0 ? -1 : 1;
  var s = (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * p.x + (p0.x - p2.x) * p.y) * sign;
  var t = (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * p.x + (p1.x - p0.x) * p.y) * sign;

  return s > 0 && t > 0 && (s + t) < 2 * A * sign;
}


function draw() {
  // put drawing code here
}