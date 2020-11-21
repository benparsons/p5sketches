// test the new coloring.lerp function

var canvasWidth = 1200,
  canvasHeight = 600;

// https://colorhunt.co/palette/206721
let palette = [];

function setup() {
  palette = [color("#e8ffc1"), color("#a5ecd7"), color("#51adcf"), color("#0278ae")];
  createCanvas(canvasWidth, canvasHeight);
  noLoop();
  noStroke();
  
  // draw the source colours
  let w = canvasWidth / palette.length;
  for (i in palette) {
    fill(palette[i]);
    rect(i * w, 0, w, 300);
  }

  let result = coloring.lerp(palette, 10);
  w = canvasWidth / result.length;
  console.log(result.length)
  for (i in result) {
    fill(result[i]);
    rect(i * w, 300, w, 300);
  }
}
