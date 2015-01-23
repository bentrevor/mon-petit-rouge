function drawNextFrame() {
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
    draw(amy);
}

function drawHounds() {
    hounds.forEach(function(hound) {
        chase(hound);
        draw(hound);
    });
}

function draw(sprite) {
    context.fillStyle = sprite.fillStyle;
    context.fillRect(sprite.x, sprite.y, sprite.size, sprite.size);
}
