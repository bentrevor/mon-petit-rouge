var canvas = null;
var context = null;

var currentDirection = '';
var gameLoopIntervalId = -1;
var hounds = [];
var fox = createFox(100, 100);
var amy = createAmy(400, 200);
var allSprites = {hounds: hounds, fox: fox, amy: amy};

function init() {
    window.addEventListener('keydown', function(e) {
        switch(e.keyCode) {
            // arrow keys to move
        case 38:
            currentDirection = 'north';
            break;
        case 37:
            currentDirection = 'west';
            break;
        case 40:
            currentDirection = 'south';
            break;
        case 39:
            currentDirection = 'east';
            break;

            // q to quit
        case 81:
            window.clearInterval(gameLoopIntervalId);
            break;
        }
    }, false);

    window.addEventListener('keyup', function(e) {
        currentDirection = '';
    }, false);

    for (i = 1; i < 6; i++) {
        allSprites.hounds[i - 1] = createHound(i * 30, i * 40);
    }

    startGameLoop();
}

function createHound(x, y) {
    return {x: x, y: y, isMovingTowardsAmy: true, speed: 3}
}

function createAmy(x, y) {
    return {x: x, y: y}
}

function createFox(x, y) {
    return {x: x, y: y, speed: 2}
}

function startGameLoop() {
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
    context.fillStyle = 'rgb(200,200,100)';
    context.fillRect(0, 0, 600, 400);
}

function drawHounds(context) {
    context.fillStyle = 'rgb(0,0,180)';

    allSprites.hounds.forEach(function(hound) {
        updateCoords(hound);
        context.fillRect(hound.x, hound.y, 25, 25);
    });
}

function updateCoords(hound) {
    if (hound.isMovingTowardsAmy) {
        chase(hound, allSprites.amy)
    } else {
        chase(hound, allSprites.fox)
    }
}

function chase(hound, chasee) {
    if (hound.x < amy.x) {

        hound.x += hound.speed;
    } else if (hound.x > amy.x) {
        hound.x -= hound.speed;
    }

    if (hound.y < amy.y) {
        hound.y += hound.speed;
    } else if (hound.y > amy.y) {
        hound.y -= hound.speed;
    }
}

function move(hound, direction) {
    switch (direction) {
    case 'north':
        hound.y -= hound.speed;
        break;
    case 'south':
        hound.y += hound.speed;
        break;
    case 'east':
        hound.x += hound.speed;
        break;
    case 'west':
        hound.x -= hound.speed;
        break;
    }
}

function drawFox(context) {
    updateCurrentCoordinates();

    context.fillStyle = 'rgb(200,0,0)';
    context.fillRect(fox.x, fox.y, 20, 20);
}

function drawAmy(context) {
    context.fillStyle = 'rgb(0,100,100)';
    context.fillRect(amy.x, amy.y, 20, 20);
}

function updateCurrentCoordinates() {
    move(fox, currentDirection);
}

// test suite

function assertEquals(exp, act, msg) {
    if (exp !== act) {
        console.error('Fail');
    } else {
        passMsg = 'pass';

        if (typeof msg != 'undefined') {
            passMsg += ': ' + msg
        }

        console.log(passMsg);
    }
}

function header(msg) {
    console.log('===================' + msg + '===================');
}

function runTests() {
    var hound = createHound(100, 100);
    var amy = createAmy(200, 200);
    var sprites = {hounds: [hound], amy: amy};

    header('building a hound');

    assertEquals(100, hound.x);
    assertEquals(100, hound.y);
    assertEquals(3, hound.speed, 'hound default speed is 3');
    assertEquals(true, hound.isMovingTowardsAmy, 'hound moves towards Amy by default');

    header('moving a hound');

    hound.speed = 10;
    move(hound, 'north');
    assertEquals(100, hound.x);
    assertEquals(90, hound.y);

    move(hound, 'east');
    assertEquals(110, hound.x);
    assertEquals(90, hound.y);

    move(hound, 'south');
    assertEquals(110, hound.x);
    assertEquals(100, hound.y);

    move(hound, 'west');
    assertEquals(100, hound.x);
    assertEquals(100, hound.y);

    header('chasing');

    chase(hound, amy);

    assertEquals(100 + hound.speed, hound.x, 'hound chased amy x');
    assertEquals(100 + hound.speed, hound.y, 'hound chased amy y');
}
