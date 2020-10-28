var canvasWidth = 1200,
  canvasHeight = 600;
let spreadFactor = 4;

// https://colorhunt.co/
let palette = ["4e89ae", "43658b", "ed6663", "ffa372"]; // 201413
let points = [];
let avgColor, bgColor;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  let r = 0, b = 0, g = 0;
  for (let p in palette) {
    let c = color("#" + palette[p]);
    palette[p] = c;
    r += c.levels[0];
    g += c.levels[1];
    b += c.levels[2];
  }
  avgColor = color(r/palette.length, g/palette.length, b/palette.length, 255);
  bgColor = lerpColor(color(255, 255, 255, 255), avgColor, 0.5)
  background(bgColor);

  let pgCircles = createGraphics(canvasWidth, canvasHeight);
  let pgTriangles = createGraphics(canvasWidth, canvasHeight);
  for (let i = 0; i < 20; i++) {
    let x = (canvasWidth / 2) + (int(randomGaussian() * canvasWidth / spreadFactor));
    let y = (canvasHeight / 2) + (int(randomGaussian() * canvasHeight / spreadFactor));
    let doubled = random(0, 1) > 0.5 ? true : false;
    let connectable = random(0, 1) > 0.5 ? true : false;
    points.push({
      vector: createVector(x, y), 
      options: {doubled: doubled, connectable: connectable, connected: false},
      id: i
    });
  }
  pgCircles.noStroke();

  for (let i = 0; i < points.length; i++) {
    let p = points[i];

    // base circle
    pgCircles.fill(palette[int(random(0, palette.length))]);
    pgCircles.ellipse(p.vector.x, p.vector.y, 100, 100);

    // doubled
    if (p.options && p.options.doubled) {
      pgCircles.fill(palette[int(random(0, palette.length))]);
      pgCircles.ellipse(p.vector.x, p.vector.y, 50, 50);
    }

    // connectable
    if (p.options && p.options.connectable) {
      let connectables = points.filter(p => p.options.connectable && ! p.options.connected);
      if (connectables.length < 3) continue;
      let distances = [];
      connectables.forEach(pd => {
        if (pd.id == p.id) return;
        let distance = Math.sqrt( Math.pow(pd.vector.x - p.vector.x, 2) + Math.pow(pd.vector.y - p.vector.y, 2));
        distances.push({id: pd.id, distance: distance});
      });
      console.log(p.id);
      distances = distances.sort((a, b) => {return b.distance - a.distance});
      distances = distances.slice(0, 2)
      console.log(distances);
      pgTriangles.fill(avgColor);
      pgTriangles.noStroke();
      pgTriangles.beginShape();
        pgTriangles.vertex(p.vector.x, p.vector.y);
        p.options.connected = true;

        let neighbour0 = points.find(p => {return p.id == distances[0].id});
        neighbour0.options.connected = true;
        pgTriangles.vertex(neighbour0.vector.x, neighbour0.vector.y);

        let neighbour1 = points.find(p => {return p.id == distances[1].id});
        neighbour1.options.connected = true;
        pgTriangles.vertex(neighbour1.vector.x, neighbour1.vector.y);
        pgTriangles.endShape(CLOSE);
    }


  }

  image(pgTriangles, 0, 0);
  image(pgCircles, 0, 0);
  noLoop();
}

function draw() {
  // rect(leftDistance, topDistance, width, height)
  // fill(r, g, b); fill(grey); noFill();
  // map(value, in-range-min, in-range-max, out-range-min, out-range-max)
}
