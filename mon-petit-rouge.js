var canvas = null;
var context = null;

var gameLoopIntervalId = -1;
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

function createHound(x, y) {
    return {x: x, y: y, isChasingAmy: true, speed: 0.2}
}

function createAmy(x, y) {
    return {x: x, y: y, speed: 0.3, direction: 'north', eccentricity: 0.95}
}

function createFox(x, y) {
    return {x: x, y: y, speed: 1}
}

function startGameLoop() {
    gameLoopIntervalId = window.setInterval(drawNextFrame, 10);
}

function drawNextFrame() {
    canvas = document.getElementById('gameCanvas');
    context = canvas.getContext('2d');

    drawBackground(context);
    drawFox(context);
    drawAmy(context);
    drawHounds(context);
}

function drawBackground(context) {
    context.fillStyle = 'rgb(200,200,100)';
    context.fillRect(0, 0, 600, 400);
}

function drawHounds(context) {
    context.fillStyle = 'rgb(0,0,180)';

    allSprites.hounds.forEach(function(hound) {
        moveHound(hound);
        context.fillRect(hound.x, hound.y, 25, 25);
    });
}

function moveHound(hound) {
    if (hound.isChasingAmy) {
        chase(hound, allSprites.amy)
    } else {
        chase(hound, allSprites.fox)
    }
}

function chase(hound, chasee) {
    if (hound.x < chasee.x) {
        hound.direction = 'east';
    } else if (hound.x > chasee.x) {
        hound.direction = 'west';
    }

    move(hound);

    if (hound.y < chasee.y) {
        hound.direction = 'south';
    } else if (hound.y > chasee.y) {
        hound.direction = 'north';
    }

    move(hound);
}

function move(sprite) {
    switch (sprite.direction) {
    case 'north':
        sprite.y -= sprite.speed;
        break;
    case 'south':
        sprite.y += sprite.speed;
        break;
    case 'east':
        sprite.x += sprite.speed;
        break;
    case 'west':
        sprite.x -= sprite.speed;
        break;
    }
}

function wander(sprite, randomizer) {
    rand = randomizer.random();

    var e = sprite.eccentricity;
    var delta = (1 - e) / 4;

    if (rand > e) {
        if (rand < e + delta) {
            sprite.direction = 'east';
        } else if (rand < e + (2 * delta)) {
            sprite.direction = 'west';
        } else if (rand < e + (3 * delta)) {
            sprite.direction = 'north';
        } else {
            sprite.direction = 'south';
        }
    }
}

function drawFox(context) {
    updateFoxCoordinates();

    context.fillStyle = 'rgb(200,0,0)';
    context.fillRect(fox.x, fox.y, 20, 20);
}

function drawAmy(context) {
    wander(amy, Math);

    context.fillStyle = 'rgb(0,100,100)';
    move(amy);
    context.fillRect(amy.x, amy.y, 20, 20);
}

function updateFoxCoordinates() {
    move(fox);
}
