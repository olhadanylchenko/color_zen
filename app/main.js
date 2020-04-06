let ball;
let game;

function setup() {
  createCanvas(384, 216);
  game = new Game();
  // ball = new Ball(
  //   {
  //     r: random(0, 255),
  //     g: random(0, 255),
  //     b: random(0, 255),
  //   },
  //   random(10, 25),
  //   0,
  //   0
  // );
  // ball.randomPosition(0, width, 0, height);
}

function draw() {
  clear();
  game.display();
}

function mousePressed() {
  game.onclick(mouseX, mouseY);
}

function mouseReleased() {
  game.onrelease();
}

function mouseDragged() {
  game.ondrag(mouseX, mouseY);
}
