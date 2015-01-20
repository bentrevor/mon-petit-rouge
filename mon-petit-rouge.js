var canvas = null;
var context = null;

var currentDirection = "north";
var gameLoopIntervalId = -1;
var hounds = [];
var fox = {x: 100, y: 200};
var amy = {x: 400, y: 20};

function init() {
    window.addEventListener('keydown', function(e) {
        console.log("key down: " + e.keyCode);

        switch(e.keyCode) {
            // arrow keys to move
        case 38:
            currentDirection = "north";
            break;
        case 37:
            currentDirection = "west";
            break;
        case 40:
            currentDirection = "south";
            break;
        case 39:
            currentDirection = "east";
            break;

            // q to quit
        case 81:
            window.clearInterval(gameLoopIntervalId);
            break;
        }
    }, false);

    for (i = 1; i < 6; i++) {
        hounds[i - 1] = {x: i * 30, y: i * 40, isMovingTowardsAmy: true};
    }

    startGameLoop(context);
}

function startGameLoop(context) {
    gameLoopIntervalId = window.setInterval(drawNextFrame, 10);
}

function drawNextFrame() {
    canvas = document.getElementById('gameCanvas');
    context = canvas.getContext('2d');

    drawBackground(context);
    drawFox(context);
    drawHounds(context);
    drawAmy(context);
}

function drawBackground(context) {
    context.fillStyle = "rgb(200,200,100)";
    context.fillRect(0, 0, 600, 400);
}

function drawHounds(context) {
    context.fillStyle = "rgb(0,0,180)";

    hounds.forEach(function(hound) {
        updateCoords(hound);
        context.fillRect(hound.x, hound.y, 25, 25);
    });
}

function updateCoords(hound) {
    if (hound.isMovingTowardsAmy) {
        console.log('vvvvvvvvv old hound.x: ' + hound.x);
        hound.x = (hound.x + amy.x) / 3;
        console.log('^^^^^^^^^ new hound.x: ' + hound.x);
        hound.y = (hound.y + amy.y) / 3;
    } else {
        hound.x = (hound.x + fox.x) / 3;
        hound.y = (hound.y + fox.y) / 3;
    }
}

function drawFox(context) {
    updateCurrentCoordinates();

    context.fillStyle = "rgb(200,0,0)";
    context.fillRect(fox.x, fox.y, 20, 20);
}

function drawAmy(context) {
    context.fillStyle = "rgb(0,100,100)";
    context.fillRect(amy.x, amy.y, 20, 20);
}

function updateCurrentCoordinates() {
    speed = 1;
    switch(currentDirection) {
    case "north":
        fox.y -= speed;
        break;
    case "south":
        fox.y += speed;
        break;
    case "east":
        fox.x += speed;
        break;
    case "west":
        fox.x -= speed;
        break;
    }
}
