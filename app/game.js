class Game {
  constructor() {
    this.levels = levels.map((level, index) => {
      return new Level(level.color, level.shapes, this.nextLevel, index);
    });
    this.level = 0;
  }

  display() {
    this.levels[this.level].display();
  }

  onclick() {
    this.levels[this.level].onclick(mouseX, mouseY);
  }

  onrelease() {
    this.levels[this.level].onrelease();
  }
  ondrag() {
    this.levels[this.level].ondrag(mouseX, mouseY);
  }
  nextLevel() {
    this.level++;
  }
}
