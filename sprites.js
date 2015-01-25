
var Sprite = function(options) {
    this.x            = options.x;
    this.y            = options.y;
    this.size         = options.size;
    this.speed        = options.speed * gameSpeed;
    this.direction    = options.direction;
    this.fillStyle    = options.fillStyle;
    this.fearOfChange = options.fearOfChange || 0.97;

    this.distanceTo = function (other) {
        return Math.sqrt(Math.pow((this.x - other.x), 2) + Math.pow((this.y - other.y), 2));
    }

    this.maybeChangeDirection = function(randomizer, directions) {
        var rand = randomizer.random();

        if (typeof directions == 'undefined') {
            directions = ['north', 'south', 'east', 'west'];
            directions.splice(directions.indexOf(this.direction), 1);
        }

        var f = this.fearOfChange;

        if (rand > f) {
            this.direction = directions[Math.floor(Math.random() * directions.length)];
        }
    }
};

function Hound(x, y) {
    Sprite.call(this, { x: x,
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
            return this.directionsTowards(amy)
        } else {
            return this.directionsTowards(fox)
        }
    };

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

        var ind = directions.indexOf(this.direction);

        if (ind != -1) {
            directions.splice(ind, 1);
        }

        return directions;
    }
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
