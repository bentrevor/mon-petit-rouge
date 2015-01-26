(function() {
    window.init = function(ns) {
        canvas = document.getElementById('gameCanvas');
        ns.context = canvas.getContext('2d');

        ns.CANVAS_WIDTH = 600;
        ns.CANVAS_HEIGHT = 400;

        ns.SYNCHRONIZED_HOUNDS = true;
        ns.FRAME_INTERVAL = 15;
        ns.TICKS = 0;
        ns.SPRITES = {};

        ns.gameLoopIntervalId = -1;
        ns.gameSpeed = 1;
        ns.hounds = [];

        ns.directions = {
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

                // arrow keys to move
            default:
                SPRITES.fox.direction = directions[e.keyCode];
            }
        }, false);

        // TODO: this is causing the fox to stutter when changing directions
        window.addEventListener('keyup', function(e) {
            window.mpr.SPRITES.fox.direction = '';
        }, false);

        placeSprites();

        startGameLoop(ns);
    }

    function pauseOrUnpause() {
        if (gameLoopIntervalId == -1) {
            startGameLoop();
        } else {
            pauseGame();
        }
    }

    function pauseGame() {
        window.clearInterval(gameLoopIntervalId);
        gameLoopIntervalId = -1;
    }

    function placeSprites() {
        var fox = new Fox(100, 100);
        var amy = new Amy(400, 200);

        window.mpr.SPRITES.fox = fox;
        window.mpr.SPRITES.amy = amy;

        for (i = 1; i < 2000; i++) {
            if (window.mpr.SYNCHRONIZED_HOUNDS) {
                window.mpr.hounds[i - 1] = new Hound(i * 50 % window.mpr.CANVAS_WIDTH, i * 50 % window.mpr.CANVAS_HEIGHT);
            } else {
                window.mpr.hounds[i - 1] = new Hound(i * 50 % window.mpr.CANVAS_WIDTH, i * 50 % window.mpr.CANVAS_HEIGHT, i);
            }
        }
    }

    function startGameLoop(ns) {
        ns.drawNextFrame();
        if (gameLoopIntervalId == -1) {
            gameLoopIntervalId = window.setInterval(ns.drawNextFrame, FRAME_INTERVAL);
        }
    }
})();
