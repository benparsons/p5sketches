

function getNearest(c) {
    var dist = Infinity;
    var result;
    for (test of colors) {
      var testDist = 
        Math.abs(test.levels[0]-c[0]) +
        Math.abs(test.levels[1]-c[1]) +
        Math.abs(test.levels[2]-c[2]);
      if (testDist < dist) {
        dist = testDist;
        result = test;
      }
    }
    return result;
  }