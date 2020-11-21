// test the new coloring.lerp function

var canvasWidth = 1200,
  canvasHeight = 600;

let palette = [];

function setup() {
  // https://colorhunt.co/palette/206721
  //palette = [color("#e8ffc1"), color("#a5ecd7"), color("#51adcf"), color("#0278ae")];

  // https://colorhunt.co/palette/201413
  //palette = [color("#4e89ae"), color("#43658b"), color("#ed6663"), color("#ffa372")];

  //https://colorhunt.co/palette/161263
  //palette = [color("#dcffcc"), color("#9fdfcd"), color("#baabda"), color("#d79abc")];

  //https://colorhunt.co/palette/7642
  //palette = [color("#f38181"), color("#fce38a"), color("#eaffd0"), color("#95e1d3")];

  //https://colorhunt.co/palette/207237
  palette = [color("#d789d7"), color("#9d65c9"), color("#5d54a4"), color("#2a3d66")];


  //https://colorhunt.co/palette/207309
  //palette = [color("#edcfa9"), color("#e89f71"), color("#d57149"), color("#aa4a30")];

  //https://colorhunt.co/palette/161263
  //palette = [color("#8ef6e4"), color("#9896f1"), color("#d59bf6"), color("#edb1f1")];

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
