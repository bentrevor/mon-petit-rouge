
function createHound(x, y) {
    return {
        x: x,
        y: y,
        size: 25,
        isChasingAmy: true,
        speed: 0.2 * gameSpeed,
        fillStyle: 'rgb(0,0,180)',

        updateTarget: function() {
            if (amyIsCloser(this)) {
                this.isChasingAmy = true;
            } else {
                this.isChasingAmy = false;
            }
        },

        moveTowardsTarget: function() {
            if (this.isChasingAmy) {
                moveTowards(this, allSprites.amy)
            } else {
                moveTowards(this, allSprites.fox)
            }
        },
    }
}

function createAmy(x, y) {
    return {
        x: x,
        y: y,
        size: 20,
        speed: gameSpeed,
        direction: 'north',
        fillStyle: 'rgb(0,100,100)'
    }
}

function createFox(x, y) {
    return {
        x: x,
        y: y,
        size: 20,
        speed: gameSpeed,
        direction: '',
        fillStyle: 'rgb(200,0,0)'
    }
}
