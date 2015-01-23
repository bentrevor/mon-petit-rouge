function chase(hound) {
    hound.updateTarget();
    hound.moveTowardsTarget();
    move(hound);
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
    sprite.x = Math.min(sprite.x, CANVAS_WIDTH - sprite.size);
    sprite.x = Math.max(sprite.x, 0);
    sprite.y = Math.min(sprite.y, CANVAS_HEIGHT - sprite.size);
    sprite.y = Math.max(sprite.y, 0);
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

    move(sprite);
}
