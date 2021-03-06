
var canvasWidth = 1280,
    canvasHeight = 800;
let saveId1, saveId2;
let steps = 20;
let colors = [];
let imageWidth = 2560 / 4 / 1;
let imageHeight = 1600 / 4 / 1;
let cc_id = "";
let textStatus;

function setup() {
    let url = "http://localhost:8090/api/1/compare/2020-06-20";
    loadJSON(url, data => {
        console.log(data);
        saveId1 = data[0].save_id;
        saveId2 = data[1].save_id;
        renderExisting(data[0], 0)
        setTimeout(()=> { renderExisting(data[1], canvasWidth/2) }, 2000);
    });

    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.position(0, 0);

    let buttonYes = createButton('1');
    buttonYes.position(canvasWidth + 10, canvasHeight / 2);
    buttonYes.mousePressed(() => vote(saveId1, saveId2));

    let buttonNo = createButton('2');
    buttonNo.position(canvasWidth + 10, canvasHeight / 2 + 20);
    buttonNo.mousePressed(() => vote(saveId2, saveId1));

    textStatus = createP("");
    textStatus.position(canvasWidth + 10, canvasHeight / 2 + 40)

    noLoop();
}

function vote(win, lose) {
    textStatus.html("sending vote");
    //console.log(from.levels, to.levels);
    let url = `http://localhost:8090/api/1/vote/${win}/${lose}`;
    loadJSON(url, data => {
        console.log(data);
        location.reload(true);
    });
}

function renderExisting(data, offset) {
    img = loadImage(data.url, () => {
        var scale = min(1.5, (canvasWidth / 2) / data.width);
        imageHeight = data.height * scale;
        imageWidth = data.width * scale;
        img.resize(imageWidth, imageHeight);
        image(img,  offset + 0, 0, imageWidth, imageHeight);

        colors = [];
        let save_data = JSON.parse(data.save_data);
        for (var s = 0; s < steps; s++) {
            let lerpVal = (1 / steps) * (steps - s);
            colors.push(lerpColor(color(save_data.from), color(save_data.to), lerpVal));
        }
        console.log(colors)
        for (var x = offset + 0; x < offset + imageWidth; x++) {
            for (var y = 0; y < imageHeight; y++) {
                var c = img.get(x - offset, y);
                stroke(getNearest(c));

                point(x, y);
            }
        }
    });

}
