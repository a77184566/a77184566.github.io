function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    fill(255);
    noStroke();
}

function draw() {
    if (mouseIsPressed) {
        ellipse(mouseX, mouseY, 80, 80);
    }
}
