window.mpr = {};

(function(mpr) {

    window.init = function() {
        var canvas = document.getElementById('gameCanvas');
        mpr.context = canvas.getContext('2d');

        mpr.CANVAS_WIDTH = 600;
        mpr.CANVAS_HEIGHT = 400;

        mpr.SYNCHRONIZED_HOUNDS = false;
        mpr.FROZEN_HOUNDS = false;
        mpr.FRAME_INTERVAL = 15;
        mpr.TICKS = 0;
        mpr.sprites = {};

        mpr.gameLoopIntervalId = -1;
        mpr.gameSpeed = 1;

        mpr.directions = {
            37: 'west',
            38: 'north',
            39: 'east',
            40: 'south',
        }

        window.addEventListener('keydown', function(e) {
            switch(e.keyCode) {

                // r to reset sprites
            case 82:
                placeSprites();
                break;

                // space to pause/unpause
            case 32:
                pauseOrUnpause();
                break;

                // h to freeze/unfreeze hounds
            case 72:
                freezeOrUnfreezeHounds();
                break;

                // arrow keys to move
            default:
                mpr.sprites.fox.direction = mpr.directions[e.keyCode];
            }
        }, false);

        // TODO: this is causing the fox to stutter when changing directions
        window.addEventListener('keyup', function(e) {
            mpr.sprites.fox.direction = '';
        }, false);

        placeSprites();

        startGameLoop();
    }

    function freezeOrUnfreezeHounds() {
        if (mpr.FROZEN_HOUNDS) {
            mpr.FROZEN_HOUNDS = false;
        } else {
            mpr.FROZEN_HOUNDS = true;
        }
    }

    function pauseOrUnpause() {
        if (mpr.gameLoopIntervalId == -1) {
            startGameLoop();
        } else {
            pauseGame();
        }
    }

    function pauseGame() {
        window.clearInterval(mpr.gameLoopIntervalId);
        mpr.gameLoopIntervalId = -1;
    }

    function placeSprites() {
        var fox = mpr.createFox(100, 100);
        var amy = mpr.createAmy(400, 200);

        mpr.sprites.fox = fox;
        mpr.sprites.amy = amy;
        createHounds();
    }

    function createHounds() {
        mpr.sprites.hounds = [];

        for (i = 1; i < 2000; i++) {
            if (mpr.SYNCHRONIZED_HOUNDS) {
                mpr.sprites.hounds[i - 1] = mpr.createHound(i * 50 % mpr.CANVAS_WIDTH, i * 50 % mpr.CANVAS_HEIGHT);
            } else {
                mpr.sprites.hounds[i - 1] = mpr.createHound(i * 50 % mpr.CANVAS_WIDTH, i * 50 % mpr.CANVAS_HEIGHT, i);
            }
        }
    }

    function startGameLoop() {
        mpr.drawNextFrame();

        if (mpr.gameLoopIntervalId == -1) {
            mpr.gameLoopIntervalId = window.setInterval(mpr.drawNextFrame, mpr.FRAME_INTERVAL);
        }
    }
})(window.mpr);
