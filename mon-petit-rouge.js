var canvas = null;
var context = null;

var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 400;

var gameLoopIntervalId = -1;
// TODO: these should only be accessed through allSprites
var gameSpeed = 3;
var hounds = [];
var fox = createFox(100, 100);
var amy = createAmy(400, 200);
var directions = {
    37: 'west',
    38: 'north',
    39: 'east',
    40: 'south',
}
var allSprites = {hounds: hounds, fox: fox, amy: amy};

function init() {
    window.addEventListener('keydown', function(e) {
        switch(e.keyCode) {
            // q to quit
        case 81:
            window.clearInterval(gameLoopIntervalId);
            break;
        default:
            // arrow keys to move
            fox.direction = directions[e.keyCode];
        }
    }, false);

    // TODO: this is causing the fox to stutter when changing directions
    window.addEventListener('keyup', function(e) {
        fox.direction = '';
    }, false);

    for (i = 1; i < 6; i++) {
        allSprites.hounds[i - 1] = createHound(i * 30, i * 40);
    }

    startGameLoop();
}

function startGameLoop() {
    gameLoopIntervalId = window.setInterval(drawNextFrame, 10);
}


function distance(spriteA, spriteB) {
    return Math.sqrt(Math.pow((spriteA.x - spriteB.x), 2) + Math.pow((spriteA.y - spriteB.y), 2));
}
