// this sketch was inspired by the pillars in this comic:
// http://www.earthexplodes.com/comics/134/


var frame = 0;
var maxFrames = 10;

function setup() {
  createCanvas(600, 600);
  //background(153);

}

function draw() {
  // map(frame,0,maxFrames,start2,stop2)

  // pillarWidth 10 -> 70
  // topDistance 200-> 100 
  // pillarColor 240 -> 0 

  var leftDistance = round(random(550));
  var pillarWidth = map((frame),0,(maxFrames),10,70);
  var topDistance = map(frame,0,maxFrames,250,100);
  var pillarColor = map(exp(frame),0,exp(maxFrames),180,0);
  noStroke();
  fill(pillarColor);
  var x1 = leftDistance;
  var y1 = topDistance;
  var x2 = pillarWidth;
  var y2 = height - topDistance;
  console.log(x1, y1, x2, y2);
  rect(x1, y1, x2, y2);
  frame++;

  if (frame > maxFrames) noLoop();
  console.log(frame);
}