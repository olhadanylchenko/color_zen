let ball;
let game;

function setup() {
  createCanvas(384, 216);
  game = new Game();
  console.log(levels[0].shapes);
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
