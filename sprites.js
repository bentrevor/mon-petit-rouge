
var Sprite = function(options) {
    this.id           = options.id || -1;
    this.x            = options.x;
    this.y            = options.y;
    this.size         = options.size;
    this.speed        = options.speed * gameSpeed;
    this.direction    = options.direction;
    this.fillStyle    = options.fillStyle;
    this.fearOfChange = options.fearOfChange || 0.95;

    this.distanceTo = function (other) {
        return Math.sqrt(Math.pow((this.x - other.x), 2) + Math.pow((this.y - other.y), 2));
    }

    this.maybeChangeDirection = function(randomizer, directions) {
        var rand = randomizer.random();

        directions = directions || ['north', 'south', 'east', 'west'];
        maybeRemove(this.direction, directions);

        this.chooseNextDirection(rand, directions);
    }

    this.chooseNextDirection = function(rand, directions) {
        if (rand > this.fearOfChange) {
            randomDirection = directions[Math.floor(Math.random() * directions.length)];
            this.direction = randomDirection;
        }
    }

    this.directionsTowards = function(target) {
        var directions = [];

        if (this.x < target.x) {
            directions.push('east');
        } else if (this.x > target.x) {
            directions.push('west');
        }

        if (this.y < target.y) {
            directions.push('south');
        } else if (this.y > target.y) {
            directions.push('north');
        }

        maybeRemove(this.direction, directions);
        return directions;
    }
};

function Hound(x, y, id) {
    Sprite.call(this, { id: id,
                        x: x,
                        y: y,
                        size: 25,
                        speed: 0.5,
                        direction: '',
                        fillStyle: 'rgb(0,0,180)',
                      });

    this.isChasingAmy = true;

    this.updateTarget = function() {
        if (this.closerToAmy()) {
            this.isChasingAmy = true;
        } else {
            this.isChasingAmy = false;
        }
    };

    this.closerToAmy = function() {
        return this.distanceTo(amy) < this.distanceTo(fox);
    };

    this.directionsTowardsTarget = function() {
        if (this.isChasingAmy) {
            return this.directionsTowards(amy);
        } else {
            return this.directionsTowards(fox);
        }
    };
}

function Amy(x, y) {
    Sprite.call(this, { x: x,
                        y: y,
                        size: 20,
                        speed: 0.5,
                        direction: 'north',
                        fillStyle: 'rgb(0,100,100)'
                      });
}

function Fox(x, y) {
    Sprite.call(this, { x: x,
                        y: y,
                        size: 20,
                        speed: 1,
                        direction: '',
                        fillStyle: 'rgb(200,0,0)'
                      });
}

Hound.prototype = Object.create(Sprite.prototype);
Amy.prototype = Object.create(Sprite.prototype);
Fox.prototype = Object.create(Sprite.prototype);
