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

function createRandomizer(results) {
    return {
        results: results,

        random: function() {
            if (this.results.length == 1) {
                return this.results[0];
            } else {
                return this.results.shift();
            }
        },
    }
}

function currentTime() {
    var date = new Date();

    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

function runTests() {
    runDirectionRandomizerTests();
    runSpriteTests();

    hound = new Hound(100, 100);
    amy = new Amy(200, 200);

    header('building a hound');

    assertEquals(100, hound.x);
    assertEquals(100, hound.y);
    assertEquals(true, hound.isChasingAmy, 'hound moves towards Amy by default');

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

    fox = new Fox(500, 500);

    chase(hound, createRandomizer([0.99]));

    assert(hound.x > 100 || hound.y > 100, 'hound chased amy x or y');

    header('changing targets');

    hound = new Hound(100, 100);
    amy = new Amy(110, 100);

    assertEquals(10, hound.distanceTo(amy), "distance in a straight line");

    amy = new Amy(130, 140);

    assertEquals(50, hound.distanceTo(amy), "distance at an angle");

    assert(hound.isChasingAmy, 'hound starts off chasing amy');

    fox = new Fox(100, 160);
    hound.updateTarget();
    assert(hound.isChasingAmy, "hound chases amy when she's closer");

    fox = new Fox(100, 120);
    hound.updateTarget();
    assert(!hound.isChasingAmy, "hound chases fox when he's closer");

    if (noFailures) {
        console.log('\n\nsuccess! at time ' + currentTime());
    } else {
        console.log('\n\nfailure! at time ' + currentTime());
    }
}

function runSpriteTests() {
    header('sprites');

    var hound = new Hound(100, 100);
    var amy = new Amy(200, 200);

    directions = hound.directionsTowards(amy);
    assert(directions.indexOf('north') == -1);
    assert(directions.indexOf('south') != -1);
    assert(directions.indexOf('east')  != -1);
    assert(directions.indexOf('west')  == -1);

    directions = amy.directionsTowards(hound);
    assert(directions.indexOf('north') != -1);
    assert(directions.indexOf('south') == -1);
    assert(directions.indexOf('east')  == -1);
    assert(directions.indexOf('west')  != -1);

    amy = new Amy(20, 200);

    directions = hound.directionsTowards(amy);
    assert(directions.indexOf('north') == -1);
    assert(directions.indexOf('south') != -1);
    assert(directions.indexOf('east')  == -1);
    assert(directions.indexOf('west')  != -1);

    directions = amy.directionsTowards(hound);
    assert(directions.indexOf('north') != -1);
    assert(directions.indexOf('south') == -1);
    assert(directions.indexOf('east')  != -1);
    assert(directions.indexOf('west')  == -1);
}

function runDirectionRandomizerTests() {
    header('#maybeChangeDirection');

    amy = new Amy(200, 200);
    amy.direction = 'north';

    assert(amy.fearOfChange <= 1, 'fearOfChange is the probability that the sprite continues in the same direction (per frame)');

    var randomizer = createRandomizer([0.5, 0.99]);

    amy.maybeChangeDirection(randomizer);
    assertEquals('north', amy.direction, "0.5 doesn't change direction");

    amy.maybeChangeDirection(randomizer);
    assert(amy.direction != 'north', "0.99 changes direction");
}
