let ball;
let game;
let sound;
let popSound;

function preload() {
  popSound = loadSound("./assets/popSound.mp3");
}
function loaded() {
  sound.play();
  sound.loop();
  sound.setVolume(0.5);
}
function setup() {
  createCanvas(800, 450);
  sound = loadSound("./assets/background_music.mp3", loaded);
  game = new Game();
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
