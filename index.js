//global variables
let context;
let canvasBody;
let birdImage;
let topPipeImage;
let bottomPipeImage;
//physics
let velocityX = -4;
let velocityY = 0;
let gravity = .2;

//board
let board = {
    height: 500,
    width: 1350
}
//specials
let birdY = board.height / 2;
let gameOver = false;
let score = 0;
//bird
let bird = {
    height: 34,
    width: 24,
    x: board.width / 8,
    y: birdY
}
//pipes
let pipe = {
    Array: [],
    width: 52,
    height: 320,
    x: board.width,
    y: 0,
    passed: false
}

//frame generation
window.onload = function () {
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
    requestAnimationFrame(update);

    if (gameOver) {
        context.fillText("GAME OVER", 5, 100);
        return;
    }

    velocityY += gravity;
    bird.y = Math.max(bird.y + velocityY, 0);

    context.clearRect(0, 0, canvasBody.width, canvasBody.height);
    context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);

    if (bird.height > canvasBody.height) { gameOver = true; }

    for (let i = 0; i < pipe.Array.length; i++) {
        let pipes = pipe.Array[i];

        pipes.x += velocityX

        context.drawImage(pipes.img, pipes.x, pipes.y, pipes.width, pipes.height);

        if ((!pipes.passed) && bird.x < pipes.x + pipes.width) {
            score += 0.5;
            pipes.passed = true;
        }

        if (detectCollision(bird, pipes)) {
            return gameOver = true;
        }

        if (bird.y > board.height)
            return gameOver = true;

        while (pipe.Array.length > 0 && pipe.Array[0].x < -100) {
            pipe.Array.shift();
        }
    }

    context.fillStyle = "White";
    context.font = "45px sans-serif";
    context.fillText(score, 5, 45)
}

function placePipes() {
    if (gameOver) {
        return;
    }

    let randomPipeY = pipe.y - pipe.height / 4 - Math.random() * (pipe.height / 2);
    let openingSpace = board.height / 4;

    let topPipe = {
        img: topPipeImage,
        x: pipe.x,
        y: randomPipeY,
        width: pipe.width,
        height: pipe.height,
        passed: false
    }

    pipe.Array.push(topPipe);

    let bottomPipe = {
        img: bottomPipeImage,
        x: pipe.x,
        y: randomPipeY + pipe.height + openingSpace,
        width: pipe.width,
        height: pipe.height,
        passed: false
    }

    pipe.Array.push(bottomPipe);
}

function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyW") {
        velocityY = -4;

        if (gameOver) {
            bird.y = birdY;
            pipe.Array = [];
            score = 0;
            gameOver = false;
        }
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}