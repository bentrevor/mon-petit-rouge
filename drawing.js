(function(mpr) {
    mpr.drawNextFrame = function() {
        mpr.TICKS++;
        drawBackground();
        drawHounds();
        drawFox();
        drawAmy();
        drawFollowerBars();
    }

    function drawBackground() {
        mpr.context.fillStyle = 'rgb(30,30,30)';
        mpr.context.fillRect(0, 0, 600, 400);
    }

    function drawFox() {
        mpr.move(mpr.sprites.fox);
        draw(mpr.sprites.fox);
    }

    function drawAmy() {
        mpr.wander(mpr.sprites.amy, Math);
        draw(mpr.sprites.amy);
    }

    function drawHounds() {
        mpr.sprites.hounds.forEach(function(hound, i) {
            hound.updateSpeed();
            mpr.chase(hound, Math);
            drawLine(hound, i);
            draw(hound);
        });
    }

    function drawLine(hound, i) {
        var r = g = b = i % 255;
        var strokeStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
        var target;

        if (hound.isChasingAmy) {
            target = mpr.sprites.amy;
        } else {
            target = mpr.sprites.fox;
        }

        drawLineBetween(hound, target, strokeStyle);
    }

    function drawLineBetween(spriteA, spriteB, strokeStyle) {
        mpr.context.strokeStyle = strokeStyle;

        var centerAX = spriteA.x + (spriteA.size/2);
        var centerAY = spriteA.y + (spriteA.size/2);
        var centerBX = spriteB.x + (spriteB.size/2);
        var centerBY = spriteB.y + (spriteB.size/2);

        mpr.context.beginPath();
        mpr.context.moveTo(centerAX, centerAY);
        mpr.context.lineTo(centerBX, centerBY);
        mpr.context.stroke();
    }

    function drawFollowerBars() {
        var amyFollowers = 0;
        var foxFollowers = 0;

        mpr.sprites.hounds.forEach(function(hound) {
            if (hound.isChasingAmy) {
                amyFollowers++;
            } else {
                foxFollowers++;
            }
        });

        var foxBarWidth = (foxFollowers / mpr.sprites.hounds.length) * 400;
        var amyBarWidth = 400 - foxBarWidth;

        mpr.context.fillStyle = mpr.sprites.fox.fillStyle;
        mpr.context.fillRect(100, 20, foxBarWidth, 20);

        mpr.context.fillStyle = mpr.sprites.amy.fillStyle;
        mpr.context.fillRect(100 + foxBarWidth, 20, amyBarWidth, 20);
    }

    function drawFollowerCount() {
        mpr.context.fillText('amy: ' + amyFollowers, 20, 40);
        mpr.context.fillText('fox: ' + foxFollowers, 20, 60);
    }

    function draw(sprite) {
        mpr.context.fillStyle = sprite.fillStyle;
        mpr.context.fillRect(sprite.x, sprite.y, sprite.size, sprite.size);
    }
})(window.mpr);
