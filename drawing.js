function drawNextFrame() {
    canvas = document.getElementById('gameCanvas');
    context = canvas.getContext('2d');

    drawBackground();
    drawFox();
    drawAmy();
    drawHounds();
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
    move(amy);
    draw(amy);
}

function drawHounds() {
    allSprites.hounds.forEach(function(hound) {
        chase(hound);
        move(hound);
        // hound.updateTarget();
        // moveHound(hound);
        draw(hound);
    });
}

function draw(sprite) {
    context.fillStyle = sprite.fillStyle;
    context.fillRect(sprite.x, sprite.y, sprite.size, sprite.size);
}
