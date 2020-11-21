let coloring = {};
coloring.init = function () {
  this.pg = createGraphics(128, 96);
  this.palette = {};
}

coloring.processImage = function (_img) {
  console.log("start processing")
  this.palette = {};
  this.pg.image(_img, 0, 0, 128, 96);
  for (var x = 0; x < this.pg.width; x++) {
    for (var y = 0; y < this.pg.height; y++) {
      var get = this.pg.get(x,y);
      if (! this.palette[get]) {
        this.palette[get] = 1;
      }
      else {
        this.palette[get]++;
      }
    }
  }
  let entries = Object.entries(this.palette)
  entries.sort(function(a,b) {
    return b[1] - a[1]
  })
  let result = [];
  result.push(entries.shift());

  for (var i = 0; i< entries.length; i++) {
    for (var j = 0; j < result.length; j++) {
      var difference = this.comparer(entries[0][0], result[j][0])
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

coloring.comparer = function (a, b) {
  var acc = 0;
  a = a.split(",");
  b = b.split(",");
  for (var i = 0; i < a.length; i++) {
    acc += Math.abs(parseInt(a[i], 10) - parseInt(b[i], 10));
  }
  return acc;
}

coloring.lerp = function (colorsArr, steps) {
  let result = [];
  for (i in colorsArr) {
    for (j in colorsArr) {
      if (i === j) continue;
      for (var s = 0; s < steps; s++) {
        let lerpVal = 1 - ((1 / steps) * (steps - s));
        result.push(lerpColor(colorsArr[i], colorsArr[j], lerpVal));
      }

    }
  }

  return result;
}