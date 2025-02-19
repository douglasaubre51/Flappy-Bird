//board
let board = {
    height: 512,
    width: 288
}

//bird
let bird = {
    height: 34,
    width: 24,
    x: board.width / 8,
    y: board.height / 2
}

//pipes
let pipe = {
    Array: [],
    width: 52,
    height: 320,
    x: board.width,
    y: 0
}

//global variables
let context;
let canvasBody;
let birdImage;
let topPipeImage;
let bottomPipeImage;

//frame generation
window.onload = function () {
    console.log("window.onload()")

    canvasBody = document.getElementById("canvas-body");
    canvasBody.height = board.height;
    canvasBody.width = board.width;

    context = canvasBody.getContext("2d");

    birdImage = new Image();

    birdImage.src = "./flappybird.png";
    birdImage.onload = function () {
        console.log("birdImage.onload()")


        context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);
    }

    topPipeImage = new Image();
    topPipeImage.src = "./pipeup.png";

    bottomPipeImage = new Image();
    bottomPipeImage.src = "./pipedown.png";

    requestAnimationFrame(update);

    setInterval(placePipes, 1500);

    document.addEventListener("keydown", moveBird);
}

function update() {
    console.log("update.onload()")

    requestAnimationFrame(update);

    if (gameOver) {
        return;
    }

    context.clearRect(0, 0, canvasBody.width, canvasBody.height);
}