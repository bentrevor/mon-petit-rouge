var canvas = null;
var context = null;

var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 400;

var FRAME_INTERVAL = 20;

var gameLoopIntervalId = -1;
var gameSpeed = 3;
var hounds = [];
var fox;
var amy;

var directions = {
    37: 'west',
    38: 'north',
    39: 'east',
    40: 'south',
}

function init() {
    window.addEventListener('keydown', function(e) {
        switch(e.keyCode) {

            // r to reset sprites
        case 82:
            placeSprites();
            break;

            // space to pause/unpause
        case 32:
            pauseOrUnpause();
            break;

            // arrow keys to move
        default:
            fox.direction = directions[e.keyCode];
        }
    }, false);

    // TODO: this is causing the fox to stutter when changing directions
    window.addEventListener('keyup', function(e) {
        fox.direction = '';
    }, false);

    placeSprites();

    canvas = document.getElementById('gameCanvas');
    context = canvas.getContext('2d');

    startGameLoop();
}

function pauseOrUnpause() {
    if (gameLoopIntervalId == -1) {
        startGameLoop();
    } else {
        pauseGame();
    }
}

function pauseGame() {
    window.clearInterval(gameLoopIntervalId);
    gameLoopIntervalId = -1;
}

function placeSprites() {
    fox = new Fox(100, 100);
    amy = new Amy(400, 200);

    for (i = 1; i < 8; i++) {
        hounds[i - 1] = new Hound(i * 50, i * 50, i);
    }
}

function startGameLoop() {
    drawNextFrame();
    if (gameLoopIntervalId == -1) {
        gameLoopIntervalId = window.setInterval(drawNextFrame, FRAME_INTERVAL);
    }
}
