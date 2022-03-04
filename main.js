var object_name = "";
var img = "";
var status = "";
var objects = [];
speak_data="We have Found  the object";
var objectDetector = "";

function preload() {
}



function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    image(video, 0, 0, 380, 380);


    if (status != "") {
        objectDetector.detect(video, gotResult);
        r = random(255);
        g = random(255);
        b = random(255);
        for (i = 0; i < objects.length; i++) {
            document.getElementById('status').innerHTML = "Status=>> Object Detected";
            document.getElementById('total_items').innerHTML = "Number Of Objects=>>" + objects.length;
            percentage = Math.floor(objects[i].confidence * 100) + "%";

            fill(r, g, b);
            textSize(17);
            text(objects[i].label + percentage, objects[i].x, objects[i].y);

            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == object_name) {
                video.stop();
                objectDetector.detect(video, gotResult);
                document.getElementById("status").innerHTML = "Status: Object Detected";
                document.getElementById("os").innerHTML = object_name+" Found";
                speak();
            } else {
                document.getElementById("status").innerHTML =  object_name+" Not Found";

            }
        }
    }
}

function modelLoaded() {
    console.log("Cocossd Model Is Loaded");
    status = true;

    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status=>> Object Is Detecting";
    object_name = document.getElementById("input").value;
}
function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}