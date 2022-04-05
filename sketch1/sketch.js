function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    fill(255);
    noStroke();
}

function draw() {
    if (mouseIsPressed) {
        circle(mouseX, mouseY, 32);
    }
}
