function assertEquals(exp, act, msg) {
    if (exp !== act) {
        console.error('Fail');
    } else {
        passMsg = 'pass';

        if (typeof msg != 'undefined') {
            passMsg += ': ' + msg
        }

        console.log(passMsg);
    }
}

function header(msg) {
    console.log('===================' + msg + '===================');
}

function currentTime() {
    var date = new Date();

    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

function runTests() {
    var hound = createHound(100, 100);
    var amy = createAmy(200, 200);
    var sprites = {hounds: [hound], amy: amy};

    header('building a hound');

    assertEquals(100, hound.x);
    assertEquals(100, hound.y);
    assertEquals(3, hound.speed, 'hound default speed is 3');
    assertEquals(true, hound.isMovingTowardsAmy, 'hound moves towards Amy by default');

    header('moving a hound');

    hound.speed = 10;
    move(hound, 'north');
    assertEquals(100, hound.x);
    assertEquals(90, hound.y);

    move(hound, 'east');
    assertEquals(110, hound.x);
    assertEquals(90, hound.y);

    move(hound, 'south');
    assertEquals(110, hound.x);
    assertEquals(100, hound.y);

    move(hound, 'west');
    assertEquals(100, hound.x);
    assertEquals(100, hound.y);

    header('chasing');

    chase(hound, amy);

    assertEquals(100 + hound.speed, hound.x, 'hound chased amy x');
    assertEquals(100 + hound.speed, hound.y, 'hound chased amy y');

    console.log('success! at time ' + currentTime());
}
