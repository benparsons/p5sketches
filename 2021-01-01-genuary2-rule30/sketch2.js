// genuray 2 / https://genuary2021.github.io/prompts / Rule 30

// Rule 30: [left_cell XOR (central_cell OR right_cell)]
// 0 ^ (0 || 0)

var canvasWidth = 1200,
  canvasHeight = canvasWidth / 8;
let arr;
let line = 0;
let passes = 0;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(255);
  stroke(0);
  arr = Array.apply(null, Array(canvasWidth)).map(function () { return 0; })
  arr[canvasWidth/2] = 1;
}

function draw() {
  drawLine();
  calculateNext();
  line++;
  if (line > canvasHeight) {
    //noLoop();
    line = 0;
    passes++;
  }
  if (passes >= 4) {
    noLoop();
  }
}

function drawLine() {
  for (let x = 0; x < arr.length; x++) {
    if (arr[x]) {
      point(x, line);
    }
  }
}

function calculateNext() {
  let nextArr = [];
  for (let i in arr) {
    i = parseInt(i, 10);
    let l = arr[i - 1] || 0;
    let c = arr[i];
    let r = arr[i + 1] || 0;
    nextArr[i] = l ^ (c || r);
    //if (nextArr[i]) debugger;
  }
  arr = nextArr;
}