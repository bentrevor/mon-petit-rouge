function drawNextFrame() {
    TICKS++;
    drawBackground();
    drawFox();
    drawAmy();
    drawHounds();
    drawFollowerCount();
    drawScores();
}

function drawBackground() {
    context.fillStyle = 'rgb(200,200,100)';
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
        draw(hound);
        drawLine(hound);
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

    context.beginPath();
    context.moveTo(centerAX, centerAY);
    context.lineTo(centerBX, centerBY);
    context.stroke();
}

function drawFollowerCount() {
    var amyFollowers = 0;
    var foxFollowers = 0;

    hounds.forEach(function(hound) {
        if (hound.isChasingAmy) {
            amyFollowers++;
        } else {
            foxFollowers++;
        }
    });

    amy.score += amyFollowers;
    fox.score += foxFollowers;
    context.fillText('amy: ' + amyFollowers, 20, 40);
    context.fillText('fox: ' + foxFollowers, 20, 60);
}

function drawScores() {
    context.fillText('amy score: ' + Math.floor(amy.score / 100), 500, 40);
    context.fillText('fox score: ' + Math.floor(fox.score / 100), 500, 60);
}

function draw(sprite) {
    context.fillStyle = sprite.fillStyle;
    context.fillRect(sprite.x, sprite.y, sprite.size, sprite.size);
}
