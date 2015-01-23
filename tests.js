var noFailures = true;

function assertEquals(exp, act, msg) {
    if (exp !== act) {
        noFailures = false;
        console.error(maybeConcat('Failure', msg) + "\nexpected: " + exp + "\nactual: " + act);
    } else {
        console.log(maybeConcat('pass', msg));
    }
}

function assert(cond, msg) {
    if (!cond) {
        noFailures = false;
        console.error(maybeConcat('Failure', msg));
    } else {
        console.log(maybeConcat('pass', msg));
    }
}

function maybeConcat(str, maybeStr) {
        if (typeof maybeStr != 'undefined') {
            return str += ': ' + maybeStr;
        }

        return str;
}

function header(msg) {
    console.log('===================' + msg + '===================');
}

function currentTime() {
    var date = new Date();

    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

function runTests() {
    hound = createHound(100, 100);
    amy = createAmy(200, 200);

    header('building a hound');

    assertEquals(100, hound.x);
    assertEquals(100, hound.y);
    assertEquals(true, hound.isChasingAmy, 'hound moves towards Amy by default');

    header('building a amy');

    assertEquals(amy.direction, 'north', 'amy starts wandering north');

    header('moving a hound');

    hound.speed = 10;
    hound.direction = 'north';
    move(hound);
    assertEquals(100, hound.x);
    assertEquals(90, hound.y);

    hound.direction = 'east';
    move(hound);
    assertEquals(110, hound.x);
    assertEquals(90, hound.y);

    hound.direction = 'south';
    move(hound);
    assertEquals(110, hound.x);
    assertEquals(100, hound.y);

    hound.direction = 'west';
    move(hound);
    assertEquals(100, hound.x);
    assertEquals(100, hound.y);

    header('chasing');

    fox = createFox(500, 500);
    chase(hound);

    assertEquals(100 + hound.speed, hound.x, 'hound chased amy x');
    assertEquals(100 + hound.speed, hound.y, 'hound chased amy y');

    header('wandering');

    var randomizer = {
        results: [0.5, 0.4, 0.3, 0.9999],

        random: function() {
            if (this.results.length == 1) {
                return this.results[0];
            } else {
                return this.results.shift();
            }
        },
    }

    wander(amy, randomizer);
    assertEquals('north', amy.direction, "amy.direction doesn't change for rand == 0.5");
    wander(amy, randomizer);
    assertEquals('north', amy.direction, "amy.direction doesn't change for rand == 0.4");
    wander(amy, randomizer);
    assertEquals('north', amy.direction, "amy.direction doesn't change for rand == 0.3");

    // the randomizer is at 0.9999, which will never be 'north'
    wander(amy, randomizer);
    assert(amy.direction != 'north', "amy.direction changes to east for (amy.e < rand < (amy.e + delta))");

    header('changing targets');

    hound = createHound(100, 100);
    amy = createAmy(110, 100);

    assertEquals(10, distance(hound, amy), "distance in a straight line");

    amy = createAmy(130, 140);

    assertEquals(50, distance(hound, amy), "distance at an angle");

    assert(hound.isChasingAmy, 'hound starts off chasing amy');

    fox = createFox(100, 160);
    hound.updateTarget();
    assert(hound.isChasingAmy, "hound chases amy when she's closer");

    fox = createFox(100, 120);
    hound.updateTarget();
    assert(!hound.isChasingAmy, "hound chases fox when he's closer");

    if (noFailures) {
        console.log('success! at time ' + currentTime());
    } else {
        console.log('failure! at time ' + currentTime());
    }
}
