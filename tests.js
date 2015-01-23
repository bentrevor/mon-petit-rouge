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
    var hound = createHound(100, 100);
    var amy = createAmy(200, 200);
    var sprites = {hounds: [hound], amy: amy};

    header('building a hound');

    assertEquals(100, hound.x);
    assertEquals(100, hound.y);
    assertEquals(2, hound.speed, 'hound default speed is 2');
    assertEquals(true, hound.isChasingAmy, 'hound moves towards Amy by default');

    header('building a amy');

    assertEquals(amy.wanderDirection, 'north', 'amy starts wandering north');

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
    assertEquals('north', amy.wanderDirection, "amy.wanderDirection doesn't change for rand == 0.5");
    wander(amy, randomizer);
    assertEquals('north', amy.wanderDirection, "amy.wanderDirection doesn't change for rand == 0.4");
    wander(amy, randomizer);
    assertEquals('north', amy.wanderDirection, "amy.wanderDirection doesn't change for rand == 0.3");

    // the randomizer is at 0.9999, which will never be 'north'
    wander(amy, randomizer);
    assert(amy.wanderDirection != 'north', "amy.wanderDirection changes to east for (amy.e < rand < (amy.e + delta))");

    if (noFailures) {
        console.log('success! at time ' + currentTime());
    } else {
        console.log('failure! at time ' + currentTime());
    }
}
