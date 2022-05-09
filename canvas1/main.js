function speak(text) {
    let utterance = new SpeechSynthesisUtterance();
    utterance.lang = "en-US";
    utterance.text = text;
    let synth = window.speechSynthesis;
    synth.cancel();
    synth.speak(utterance);
}

////////////////////////////////////////////////////////////////

let number = 0;
let correct = 0;
let wrong = 0;
let primes = [];
let composites = [];
for (let i = 2; i < 1000; i++) {
    if (is_prime(i)) {
        primes.push(i);
    } else {
        composites.push(i);
    }
}

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

function next_number() {
    if (Math.random() < 0.5) {
        number = primes[Math.floor(Math.random() * primes.length)];
    } else {
        number = composites[Math.floor(Math.random() * composites.length)];
    }
}

////////////////////////////////////////////////////////////////

let canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
let ctx = canvas.getContext("2d");
next_number();
draw();
canvas.addEventListener("pointerdown", mouse_pressed);

function draw() {
    let windowWidth = canvas.width;
    let windowHeight = canvas.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, windowWidth / 2, windowHeight / 2);
    ctx.fillStyle = "rgb(32, 32, 32)";
    ctx.fillRect(windowWidth / 2, 0, windowWidth / 2, windowHeight / 2);
    ctx.fillStyle = "rgb(64, 64, 64)";
    if (is_prime(number)) {
        ctx.fillStyle = "rgb(0, 128, 0)";
    }
    ctx.fillRect(0, windowHeight / 2, windowWidth / 2, windowHeight / 2);
    ctx.fillStyle = "rgb(128, 128, 128)";
    if (!is_prime(number)) {
        ctx.fillStyle = "rgb(0, 128, 0)";
    }
    ctx.fillRect(windowWidth / 2, windowHeight / 2, windowWidth / 2, windowHeight / 2);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.font = "24px sans-serif";
    ctx.fillText(`is\n${number}\nprime?`, windowWidth / 4, windowHeight / 4);
    ctx.fillText(`${correct} correct\n${wrong} wrong`, windowWidth * 3 / 4, windowHeight / 4);
    ctx.fillText("yes", windowWidth / 4, windowHeight * 3 / 4);
    ctx.fillText("no", windowWidth * 3 / 4, windowHeight * 3 / 4);
}

function mouse_pressed(event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    let mouseX = x;
    let mouseY = y;
    let windowWidth = canvas.width;
    let windowHeight = canvas.height;

    if (mouseY < windowHeight / 2) {
        if (mouseX < windowWidth / 2) {
            speak(`is\n${number}\nprime?`);
        } else {
            speak(`${correct} correct\n${wrong} wrong`);
        }
    } else {
        if (mouseX < windowWidth / 2) {
            if (is_prime(number)) {
                correct += 1;
                speak(`correct, ${number} is prime`);
            } else {
                wrong += 1;
                speak(`wrong, ${number} is composite`);
            }
            next_number();
            draw();
        } else {
            if (!is_prime(number)) {
                correct += 1;
                speak(`correct, ${number} is composite`);
            } else {
                wrong += 1;
                speak(`wrong, ${number} is prime`);
            }
            next_number();
            draw();
        }
    }
}
