
var canvasWidth = 1000,
  canvasHeight = 800;
var columns = 10;
var elementScale = 100;
var elements = [];
var randomMag = 4;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  noStroke();
  fill(200, 0, 100 );
  stroke(0);
  strokeWeight(2);
  elements.push({
    v1: {x:30, y:20},
    v2: {x:85, y:20},
    v3: {x:85, y:75},
    v4: {x:30, y:75}
  });
  for (var i = 0; i < 80; i++) {
    elements.push({
      v1: {x:elements[i].v1.x+int(random(-randomMag,randomMag)), y:elements[i].v1.y+int(random(-randomMag,randomMag))},
      v2: {x:elements[i].v2.x+int(random(-randomMag,randomMag)), y:elements[i].v2.y+int(random(-randomMag,randomMag))},
      v3: {x:elements[i].v3.x+int(random(-randomMag,randomMag)), y:elements[i].v3.y+int(random(-randomMag,randomMag))},
      v4: {x:elements[i].v4.x+int(random(-randomMag,randomMag)), y:elements[i].v4.y+int(random(-randomMag,randomMag))},
    });
  }

  
  for ([i, element] of elements.entries()) {
    drawElement(element.v1,element.v2,element.v3,element.v4,i)
  }
  
  noLoop();
}

function drawElement(v1, v2, v3, v4, index) {
  var row = Math.floor(index/columns);
  var column = index % columns;
  //console.log(`drawing ${row}, ${column}`)
  beginShape();
    vertex(v1.x + (column*elementScale), v1.y + (row*elementScale));
    vertex(v2.x + (column*elementScale), v2.y + (row*elementScale));
    vertex(v3.x + (column*elementScale), v3.y + (row*elementScale));
    vertex(v4.x + (column*elementScale), v4.y + (row*elementScale));
  endShape(CLOSE);
}
