let ball;

function setup() {
  createCanvas(384, 216);
  ball = new Ball(
    {
      r: random(0, 255),
      g: random(0, 255),
      b: random(0, 255),
    },
    random(10, 25),
    0,
    0
  );
  ball.randomPosition(0, width, 0, height);
}

function draw() {
  clear();
  ball.draw();
}

function mousePressed() {
  ball.onclick(mouseX, mouseY);
}

function mouseReleased() {
  ball.onrelease();
}

function mouseDragged() {
  ball.ondrag(mouseX, mouseY);
}

const buttonRandom = document.getElementById("randomButt");
buttonRandom.onclick = () => ball.randomPosition(0, width, 0, height);
