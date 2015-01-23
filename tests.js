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
    assertEquals(3, hound.speed, 'hound default speed is 2');
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
        results: [0.5, 0.4, 0.3, 0.91, 0.93, 0.96, 0.99],

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

    wander(amy, randomizer);
    assertEquals('east', amy.wanderDirection, "amy.wanderDirection changes to east for 0.9 < rand < 0.925");
    wander(amy, randomizer);
    assertEquals('west', amy.wanderDirection, "amy.wanderDirection changes to west for 0.925 < rand < 0.95");
    wander(amy, randomizer);
    assertEquals('north', amy.wanderDirection, "amy.wanderDirection changes to north for 0.95 < rand < 0.975");
    wander(amy, randomizer);
    assertEquals('south', amy.wanderDirection, "amy.wanderDirection changes to south for 0.975 < rand < 1");

    if (noFailures) {
        console.log('success! at time ' + currentTime());
    }
}
