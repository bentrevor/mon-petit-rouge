var canvas = null;
var context = null;

var currentCoords = [100,200];
var currentDirection = "north";
var intervalId = 0;

function init() {
    window.addEventListener('keydown', function(e) {
        console.log("key down: " + e.keyCode);

        switch(e.keyCode) {
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
        case 32:
            window.clearInterval(intervalId);
            console.log("cleared interval: " + intervalId);
            break;
        }
    }, false);

    startGameLoop(context);
}

function startGameLoop(context) {
    intervalId = window.setInterval(drawNextFrame, 100);
}

function drawNextFrame() {
    canvas = document.getElementById('gameCanvas');
    context = canvas.getContext('2d');

    drawFox(context);

    console.log('current coords: ' + currentCoords);
}

function drawFox(context) {
    updateCurrentCoordinates();

    context.fillStyle = "rgb(200,0,0)";
    context.fillRect(currentCoords[0], currentCoords[1], 50, 50);
}

function updateCurrentCoordinates() {
    switch(currentDirection) {
    case "north":
        currentCoords[1] -= 10;
        break;
    case "south":
        currentCoords[1] += 10;
        break;
    case "east":
        currentCoords[0] += 10;
        break;
    case "west":
        currentCoords[0] -= 10;
        break;
    }
}
