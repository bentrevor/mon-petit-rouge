(function(mpr) {

    mpr.chase = function(hound, randomizer) {
        hound.updateTarget();
        var dirs = hound.directionsTowardsTarget();
        hound.maybeChangeDirection(randomizer, dirs);
        mpr.move(hound);
    }

    // aka updateCoordinates
    mpr.move = function(sprite) {
        if (typeof sprite == 'undefined') {
            debugger;
        }

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

    mpr.wander = function(sprite, randomizer) {
        sprite.maybeChangeDirection(randomizer);
        mpr.move(sprite);
    }

    function keepOnCanvas(sprite) {
        sprite.x = Math.min(sprite.x, mpr.CANVAS_WIDTH - sprite.size);
        sprite.x = Math.max(sprite.x, 0);
        sprite.y = Math.min(sprite.y, mpr.CANVAS_HEIGHT - sprite.size);
        sprite.y = Math.max(sprite.y, 0);
    }

    mpr.maybeRemove = function(x, xs) {
        var ind = xs.indexOf(x);

        if (ind != -1) {
            xs.splice(ind, 1);
        }
    }

})(window.mpr);
