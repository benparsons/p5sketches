
var canvasWidth = 1000,
  canvasHeight = 800;
var columns = 10;
var elementScale = 100;
var elements = [];
var randomMag = 4;
var palette;
var bgR, bgG, bgB;

function preload() {
  photo = loadImage('../images/cedar-pine.jpg', 
  //photo = loadImage('../posterplay/3873186-scenery-images.jpg', 
  img => {
    palette = processImage(img);//.map(s => s[0].split(','));
    console.log("load")
    console.log(palette.length)
    palette = palette.splice(0, 81);
    palette = palette.map(s => s[0].split(','));
    bgR = palette.reduce(function (avg, value, _, { length }) {
      return avg + value[0] / length;
    }, 0);
    bgG = palette.reduce(function (avg, value, _, { length }) {
      return avg + value[1] / length;
    }, 0);
    bgB = palette.reduce(function (avg, value, _, { length }) {
      return avg + value[2] / length;
    }, 0);
  });
  
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(bgR/2, bgG/2, bgB/2)
  noStroke();
  //stroke(0);
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
  //fill(palette[int(random(10))][0].split(","));
  fill(palette[index]);
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


function processImage(_img) {
  console.log("start processing")
  palette = {};
  pg = createGraphics(128, 96);
  //img.loadPixels();
  pg.image(_img, 0, 0, 128, 96);
  //background(153);
  //image(img, 0, 0, 128, 96);
  //image(photo, 0, 0, 128, 96)
  for (var x = 0; x < pg.width; x++) {
    for (var y = 0; y < pg.height; y++) {
      //console.log(photo.get(x,y))
      //console.log(color(photo.get(x,y)).toString());
      //console.log(photo.get(x,y));
      var get = pg.get(x,y);
      if (! palette[get]) {
        palette[get] = 1;
      }
      else {
        palette[get]++;
      }
    }
  }
  entries = Object.entries(palette)
  entries.sort(function(a,b) {
    return b[1] - a[1]
  })
  result = [];
  result.push(entries.shift());

  for (var i = 0; i< entries.length; i++) {
    for (var j = 0; j < result.length; j++) {
      var difference = comparer(entries[0][0], result[j][0])
      if (difference < 50) {
        result[j][1] += entries[0][1];
        entries.shift()
        break;
      }
    }
    result.push(entries.shift());
  }
  result.sort(function(a,b) {
    return b[1] - a[1]
  })
  console.log(result);
  console.log("done processing")
  return result;
}

function comparer(a, b) {
  var acc = 0;
  a = a.split(",");
  b = b.split(",");
  for (var i = 0; i < a.length; i++) {
    acc += Math.abs(parseInt(a[i], 10) - parseInt(b[i], 10));
  }
  return acc;
}