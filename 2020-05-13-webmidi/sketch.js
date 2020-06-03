// https://github.com/djipco/webmidi

var x = 200, y = 200;

function setup() {
  createCanvas(400, 400);

  WebMidi.enable(function (err) {

    if (err) {
      console.log("WebMidi could not be enabled.", err);
    } else {
      console.log("WebMidi enabled!");
    }

    console.log("---");
    console.log("Inputs Ports: ");
    for (i = 0; i < WebMidi.inputs.length; i++) {
      console.log(i + ": " + WebMidi.inputs[i].name);
    }
    console.log("---");
    console.log("Output Ports: ");
    for (i = 0; i < WebMidi.outputs.length; i++) {
      console.log(i + ": " + WebMidi.outputs[i].name);
    }
    input = WebMidi.inputs[0];
    // Listen for a 'note on' message on all channels


    // Listen to pitch bend message on channel 3
    input.addListener('pitchbend', "all",
      function (e) {
        //console.log("Received 'pitchbend' message.", e.value);
        x = x + e.value
      }
    );

    // Listen to control change message on all channels
    input.addListener('controlchange', "all",
      function (e) {
        console.log("Received 'controlchange' message.", e.value);


      }
    );

    // Listen to NRPN message on all channels
    input.addListener('nrpn', "all",
      function (e) {
        if (e.controller.type === 'entry') {
          console.log("Received 'nrpn' 'entry' message.", e);
        }
        if (e.controller.type === 'decrement') {
          console.log("Received 'nrpn' 'decrement' message.", e);
        }
        if (e.controller.type === 'increment') {
          console.log("Received 'nrpn' 'increment' message.", e);
        }
        console.log("message value: " + e.controller.value + ".", e);
      }
    );
    //
  });
  ///


}

function draw() {
  background(220);
  strokeWeight(5);
  point(x, y)

  //console.log(x)

  //console.log(WebMidi.inputs);
  //console.log(WebMidi.outputs);
}