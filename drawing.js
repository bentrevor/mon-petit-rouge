function drawNextFrame() {
    TICKS++;
    drawBackground();
    drawHounds();
    drawFox();
    drawAmy();
    drawFollowerBars();
}

function drawBackground() {
    context.fillStyle = 'rgb(30,30,30)';
    context.fillRect(0, 0, 600, 400);
}

function drawFox() {
    move(fox);
    draw(fox);
}

function drawAmy() {
    wander(amy, Math);
    draw(amy);
}

function drawHounds() {
    hounds.forEach(function(hound) {
        hound.updateSpeed();
        chase(hound, Math);
        drawLine(hound);
        draw(hound);
    });
}

function drawLine(hound) {
    if (hound.isChasingAmy) {
        drawLineBetween(hound, amy);
    } else {
        drawLineBetween(hound, fox);
    }
}

function drawLineBetween(spriteA, spriteB) {
    // context.fillStyle = spriteA.fillStyle;
    var centerAX = spriteA.x + (spriteA.size/2);
    var centerAY = spriteA.y + (spriteA.size/2);
    var centerBX = spriteB.x + (spriteB.size/2);
    var centerBY = spriteB.y + (spriteB.size/2);

    context.strokeStyle = 'rgb(150,150,150)';

    context.beginPath();
    context.moveTo(centerAX, centerAY);
    context.lineTo(centerBX, centerBY);
    context.stroke();
}

function drawFollowerBars() {
    var amyFollowers = 0;
    var foxFollowers = 0;

    hounds.forEach(function(hound) {
        if (hound.isChasingAmy) {
            amyFollowers++;
        } else {
            foxFollowers++;
        }
    });

    var foxBarWidth = (foxFollowers / hounds.length) * 400;
    var amyBarWidth = 400 - foxBarWidth;

    context.fillStyle = fox.fillStyle;
    context.fillRect(100, 20, foxBarWidth, 20);

    context.fillStyle = amy.fillStyle;
    context.fillRect(100 + foxBarWidth, 20, amyBarWidth, 20);
}

function drawFollowerCount() {
    context.fillText('amy: ' + amyFollowers, 20, 40);
    context.fillText('fox: ' + foxFollowers, 20, 60);
}

function draw(sprite) {
    context.fillStyle = sprite.fillStyle;
    context.fillRect(sprite.x, sprite.y, sprite.size, sprite.size);
}
