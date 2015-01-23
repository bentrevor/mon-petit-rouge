function amyIsCloser(hound) {
    return distance(hound, amy) < distance(hound, fox);
}

function chase(hound) {
    hound.updateTarget();
    hound.moveTowardsTarget();
}

function moveTowards(chaser, chasee) {
    if (chaser.x < chasee.x) {
        chaser.direction = 'east';
    } else if (chaser.x > chasee.x) {
        chaser.direction = 'west';
    }

    move(chaser);

    if (chaser.y < chasee.y) {
        chaser.direction = 'south';
    } else if (chaser.y > chasee.y) {
        chaser.direction = 'north';
    }
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

function keepOnCanvas(sprite) {
    if (sprite.x + sprite.size > CANVAS_WIDTH) {
        sprite.x = CANVAS_WIDTH - sprite.size;
    }

    if (sprite.x < 0) {
        sprite.x = 0
    }

    if (sprite.y + sprite.size > CANVAS_HEIGHT) {
        sprite.y = CANVAS_HEIGHT - sprite.size;
    }

    if (sprite.y < 0) {
        sprite.y = 0
    }
}

function wander(sprite, randomizer) {
    rand = randomizer.random();

    // eccentricity: correllated to how likely amy is to change directions.
    var eccentricity = 0.05;
    // conformity: the opposite of eccentricity?
    var c = 1 - eccentricity;

    var delta = eccentricity / 4;

    if (rand > c) {
        if (rand < c + delta) {
            sprite.direction = 'east';
        } else if (rand < c + (2 * delta)) {
            sprite.direction = 'west';
        } else if (rand < c + (3 * delta)) {
            sprite.direction = 'north';
        } else {
            sprite.direction = 'south';
        }
    }
}
