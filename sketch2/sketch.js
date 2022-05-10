let speech;

let number = 0;
let correct = 0;
let wrong = 0;

function is_prime(n) {
    if (n < 2) {
        return false;
    }
    for (let i = 2; i < n; i++) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
}

let primes = [];
let composites = [];
for (let i = 2; i < 1000; i++) {
    if (is_prime(i)) {
        primes.push(i);
    } else {
        composites.push(i);
    }
}

function next_number() {
    if (random() < 0.5) {
        number = random(primes);
    } else {
        number = random(composites);
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    speech = new p5.Speech();
    speech.interrupt = true;
    speech.setLang("en-US");

    button = createButton("Speech");
    button.position(windowWidth / 2 - 50, 0);
    button.size(100, 100);
    button.mousePressed(function () {
        speech = new p5.Speech();
        speech.interrupt = true;
        speech.setLang("en-US");
    });

    next_number();
}

function draw() {
    noStroke();
    fill(0);
    rect(0, 0, windowWidth / 2, windowHeight / 2);
    fill(32);
    rect(windowWidth / 2, 0, windowWidth / 2, windowHeight / 2);
    fill(64);
    if (is_prime(number)) {
        fill(0, 128, 0);
    }
    rect(0, windowHeight / 2, windowWidth / 2, windowHeight / 2);
    fill(128);
    if (!is_prime(number)) {
        fill(0, 128, 0);
    }
    rect(windowWidth / 2, windowHeight / 2, windowWidth / 2, windowHeight / 2);

    textAlign(CENTER, CENTER);
    fill(255);
    noStroke();
    textSize(24);
    text(`is\n${number}\nprime?`, windowWidth / 4, windowHeight / 4);
    text(`${correct} correct\n${wrong} wrong`, windowWidth * 3 / 4, windowHeight / 4);
    text("yes", windowWidth / 4, windowHeight * 3 / 4);
    text("no", windowWidth * 3 / 4, windowHeight * 3 / 4);
}

function mousePressed() {
    if (mouseY < windowHeight / 2) {
        if (mouseX < windowWidth / 2) {
            speech.speak(`is\n${number}\nprime?`);
        } else {
            speech.speak(`${correct} correct\n${wrong} wrong`);
        }
    } else {
        if (mouseX < windowWidth / 2) {
            if (is_prime(number)) {
                correct += 1;
                speech.speak(`correct, ${number} is prime`);
            } else {
                wrong += 1;
                speech.speak(`wrong, ${number} is composite`);
            }
            next_number();
        } else {
            if (!is_prime(number)) {
                correct += 1;
                speech.speak(`correct, ${number} is composite`);
            } else {
                wrong += 1;
                speech.speak(`wrong, ${number} is prime`);
            }
            next_number();
        }
    }
}
