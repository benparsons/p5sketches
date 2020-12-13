let coloring = {};
coloring.init = function () {

  console.log("coloring init");
  this.pg = createGraphics(128, 96);
  this.palette = {};

  this.colorhunt.colors = [
    {
      url: "https://colorhunt.co/palette/206721",
      palette: [color("#e8ffc1"), color("#a5ecd7"), color("#51adcf"), color("#0278ae")]
    },
    {
      url: "https://colorhunt.co/palette/201413",
      palette: [color("#4e89ae"), color("#43658b"), color("#ed6663"), color("#ffa372")]
    },
    {
      url: "https://colorhunt.co/palette/161263",
      palette: [color("#dcffcc"), color("#9fdfcd"), color("#baabda"), color("#d79abc")]
    },
    {
      url: "https://colorhunt.co/palette/7642",
      palette: palette = [color("#f38181"), color("#fce38a"), color("#eaffd0"), color("#95e1d3")]
    },
    {
      url: "https://colorhunt.co/palette/207237",
      palette: [color("#d789d7"), color("#9d65c9"), color("#5d54a4"), color("#2a3d66")]
    },
    {
      url: "https://colorhunt.co/palette/207309",
      palette: [color("#edcfa9"), color("#e89f71"), color("#d57149"), color("#aa4a30")]
    },
    {
      url: "https://colorhunt.co/palette/161263",
      palette: [color("#8ef6e4"), color("#9896f1"), color("#d59bf6"), color("#edb1f1")]
    },
    {
      url: "https://colorhunt.co/palette/179350",
      palette: [color("#511845"), color("#900c3f"), color("#c70039"), color("#ff5733")],
      tags: ["warm"]
    },
    {
      url: "https://colorhunt.co/palette/192310",
      palette: [color("#e7dfd5"), color("#84a9ac"), color("#3b6978"), color("#204051")],
      tags: ["cold"]
    }
  ];
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

coloring.lerpSeparated = function (colorsArr, steps) {
  let result = [];
  for (i in colorsArr) {
    let base = { 
      base: colorsArr[i],
      colors: []
    };
    for (j in colorsArr) {
      if (i === j) continue;
      for (var s = 0; s < steps; s++) {
        let lerpVal = 1 - ((1 / steps) * (steps - s));
        base.colors.push(lerpColor(colorsArr[i], colorsArr[j], lerpVal));
      }
    }
    result.push(base);
  }

  return result;
}

coloring.colorhunt = {}

coloring.colorhunt.random = function () {
  if (! coloring.colorhunt.colors) coloring.init();
  return coloring.colorhunt.colors[int(random(0, coloring.colorhunt.colors.length))]
}