var canvas = null;
var context = null;

function init() {
    canvas = document.getElementById('gameCanvas');
    context = canvas.getContext('2d');

    window.addEventListener('keydown', function(e) {
        console.log("key down: " + e.keyCode);
    }, false);

    startGame();
}

function startGame() {
    console.log('starting game...');
}
