
var canvasWidth = 1280,
    canvasHeight = 800;
var img1, img2, from1, to1, from2, to2;
let steps = 20;
let colors = [];
let imageWidth = 2560 / 4 / 1;
let imageHeight = 1600 / 4 / 1;
let cc_id = "";
let textStatus;
function loadSourceImage() {
}
function setup() {
    let url = "http://localhost:8090/api/1/compare/2020-06-20";
    loadJSON(url, data => {
        console.log(data);
        var scale = min(1.5, (canvasWidth / 2) / data[0].width);
        imageHeight = data[0].height * scale;
        imageWidth = data[0].width * scale;
        pg = createGraphics(imageHeight, imageWidth);
        img = loadImage(data[0].url, () => {
            img.resize(imageWidth, imageHeight);
            image(img, 0, 0, imageWidth, imageHeight);

            colors = [];
            let save_data = JSON.parse(data[0].save_data);
            for (var s = 0; s < steps; s++) {
                let lerpVal = (1 / steps) * (steps - s);
                colors.push(lerpColor(color(save_data.from), color(save_data.to), lerpVal));
            }
            console.log(colors)
            for (var x = 0; x < imageWidth; x++) {
                for (var y = 0; y < imageHeight; y++) {
                    var c = img.get(x, y);
                    stroke(getNearest(c));

                    point(x, y);
                }
            }
            image(pg, 0, 0)
        });
        
    });


    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.position(0, 0);

    let buttonYes = createButton('YES');
    buttonYes.position(canvasWidth + 10, canvasHeight / 2);
    buttonYes.mousePressed(() => clickYes(from, to));

    let buttonNo = createButton('NO');
    buttonNo.position(canvasWidth + 10, canvasHeight / 2 + 20);
    buttonNo.mousePressed(() => renderFresh());

    textStatus = createP("");
    textStatus.position(canvasWidth + 10, canvasHeight / 2 + 40)

    noLoop();
}


