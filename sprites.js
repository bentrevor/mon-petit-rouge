
var Sprite = function(options) {
    this.x = options.x;
    this.y = options.y;
    this.size = options.size;
    this.speed = options.speed * gameSpeed;
    this.direction = options.direction;
    this.fillStyle = options.fillStyle;

    this.distanceTo = function (other) {
        return Math.sqrt(Math.pow((this.x - other.x), 2) + Math.pow((this.y - other.y), 2));
    }
};

function Hound(x, y) {
    Sprite.call(this, { x: x,
                        y: y,
                        size: 25,
                        speed: 0.2,
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

    this.moveTowardsTarget = function() {
        if (this.isChasingAmy) {
            moveTowards(this, allSprites.amy)
        } else {
            moveTowards(this, allSprites.fox)
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
