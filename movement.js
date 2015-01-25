function chase(hound, randomizer) {
    hound.updateTarget();
    var dirs = hound.directionsTowardsTarget();
    hound.maybeChangeDirection(randomizer, dirs);
    move(hound);
}

// aka updateCoordinates
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

    keepOnCanvas(sprite);
}

function wander(sprite, randomizer) {
    sprite.maybeChangeDirection(randomizer);
    move(sprite);
}

function keepOnCanvas(sprite) {
    sprite.x = Math.min(sprite.x, CANVAS_WIDTH - sprite.size);
    sprite.x = Math.max(sprite.x, 0);
    sprite.y = Math.min(sprite.y, CANVAS_HEIGHT - sprite.size);
    sprite.y = Math.max(sprite.y, 0);
}

function maybeRemove(x, xs) {
    var ind = xs.indexOf(x);

    if (ind != -1) {
        xs.splice(ind, 1);
    }
}
