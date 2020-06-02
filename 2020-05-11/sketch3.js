/// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />

// from 2020-02-11-blend-play

var images = [];
var index = 0;

function preload() {
  for (var i = 1; i <= 9; i++) {
    images.push(loadImage(`../images/bright-run/${i}.jpg`));
  }
}


function setup() {

  createCanvas(1280, 480);
  image(images[0], 640, 0)
  frameRate(5)
  //noLoop();
}

function draw() {

  if (index+1 >= images.length) {
      blendMode(BLEND);
      image(images[0], 0, 0);
      image(images[0], 640, 0)
      index = 1;
      return;
  }
  blendMode(DIFFERENCE);

  image(images[index], 0, 0);
  index++;
  image(images[index], 0, 0);
  index++;
}