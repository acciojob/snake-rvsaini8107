//your code here
var gameContainer = document.getElementById("gameContainer");

// create grid of pixels
for (var i = 0; i < 1600; i++) {
    var pixel = document.createElement("div");
    pixel.classList.add("pixel");
    pixel.setAttribute("id", "pixel" + i);
    gameContainer.appendChild(pixel);
}

// set starting position of snake
var snake = [20, 19, 18];
for (var i = 0; i < snake.length; i++) {
    var snakePixel = document.getElementById("pixel" + snake[i]);
    snakePixel.classList.add("snakeBodyPixel");
}

// generate food
var food = Math.floor(Math.random() * 1600);
var foodPixel = document.getElementById("pixel" + food);
foodPixel.classList.add("food");

// initialize variables
var score = 0;
var direction = "right";
var intervalId = setInterval(moveSnake, 100);

// handle key press events
document.addEventListener("keydown", function(event) {
    if (event.keyCode == 37 && direction != "right") { // left
        direction = "left";
    }
    else if (event.keyCode == 38 && direction != "down") { // up
        direction = "up";
    }
    else if (event.keyCode == 39 && direction != "left") { // right
        direction = "right";
    }
    else if (event.keyCode == 40 && direction != "up") { // down
        direction = "down";
    }
});

// move snake
function moveSnake() {
    // determine new head position
    var head = snake[0];
    if (direction == "left") {
        head -= 1;
    }
    else if (direction == "up") {
        head -= 40;
    }
    else if (direction == "right") {
        head += 1;
    }
    else if (direction == "down") {
        head += 40;
    }

    // check for collision with food
    if (head == food) {
        // add new food and update score
        food = Math.floor(Math.random() * 1600);
        foodPixel = document.getElementById("pixel" + food);
        foodPixel.classList.add("food");
        score += 10;
        document.querySelector(".scoreBoard").innerHTML = "Score: " + score;
    }
    else {
        // remove tail pixel
        var tail = snake.pop();
        var tailPixel = document.getElementById("pixel" + tail);
        tailPixel.classList.remove("snakeBodyPixel");
    }
    
    // check for collision with walls or self
    if (head < 0 || head >= 1600 || snake.includes(head)) {
        clearInterval(intervalId);
        alert("Game over! Your score was " + score);
    }
    else {
        // add new head pixel
        var headPixel = document.getElementById("pixel" + head);
        headPixel.classList.add("snakeBodyPixel");
        snake.unshift(head);
    }
}