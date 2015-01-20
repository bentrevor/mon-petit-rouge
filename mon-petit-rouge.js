var canvas = null;
var context = null;

function init() {
    canvas = document.getElementById('gameCanvas');
    context = canvas.getContext('2d');

    startGame();
}

function startGame() {
    console.log('starting game...');
}
