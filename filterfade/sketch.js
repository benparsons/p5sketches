var photos = [];

function preload() {
  for (var i = 0; i < 100; i++) {
	// https://maxpull-tlu7l6lqiu.stackpathdns.com/wp-content/uploads/2015/05/cedar-pine-1024x678.jpg  	
    photos[i] = loadImage('cedar-pine-1024x678.jpg');
  }
}

function setup() {
  
  createCanvas(1000, 700);
  for (var i = 0; i < 100; i++) {
    photos[i].filter(POSTERIZE, i+2);
    image(photos[i], i * 10, 0, 10, 700, i * 10, 0, 10, 700)
  }
  
  // Top-left corner of destination rectangle is at (50, 0)
  // Destination rectangle width and height are 40 x 20
  // The next parameters are relative to the source image:
  // - Starting at position (50, 50) on the source image, capture a 50 x 50
  // subsection
  // - Draw this subsection to fill the dimensions of the destination rectangle
  //image(img, 50, 0, 40, 20, 50, 50, 50, 50);
}