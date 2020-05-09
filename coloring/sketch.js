var canvasWidth = 600,
  canvasHeight = 600;
let photo, pg
var palette = {};
var entries, result;
let input;
let img;

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '', (img) => {
      processImage(img)
      image(img, 0, 0, 256,192)
    });
    
    // setTimeout(() => {
    //   processImage(img)
    //   image(img, 0, 0, 128,96)
    // }, 1000);
    img.hide();
    
    console.log("ok")
  } else {
    img = null;
  }
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
  for (var i = 0; i < 30; i++) {
    //console.log(result[i][0]);
    fill(result[i][0].split(","));
    rect(256, i*10, 100, 10);
  }
  console.log("done processing")
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  input = createFileInput(handleFile);
  input.position(0, 0);
  noStroke();
  //noLoop();

  processImage(photo);

  
  
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

function preload() {
  photo = loadImage('../images/cedar-pine.jpg');
  //photo = loadImage('IMG_3422.jpg');
}

function draw() {
  // rect(leftDistance, topDistance, width, height)
  // fill(r, g, b); fill(grey); noFill();
  // map(value, in-range-min, in-range-max, out-range-min, out-range-max)
}
