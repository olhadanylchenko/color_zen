class Game {
  constructor() {
    this.levels = levels.map((level, index) => {
      return new Level(
        level.color,
        level.shapes,
        this.nextLevel,
        this.restart,
        index
      );
    });
    this.firstScreen = true;
    setTimeout(() => {
      this.firstScreen = false;
      this.startingLevel = true;
      setTimeout(() => {
        this.startingLevel = false;
      }, 3000);
    }, 3000);
    this.level = 0;
    this.startingLevel = false;
    this.failedAndRestart = false;
  }

  display() {
    if (this.firstScreen) {
      this.showFirstScreen();
    } else if (this.startingLevel) {
      this.youAreStartingLevelNumber();
    } else if (this.failedAndRestart) {
      this.showRestartBoard();
    } else {
      this.levels[this.level].display();
    }
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
  nextLevel = () => {
    this.startingLevel = true;
    this.level++;
    setTimeout(() => {
      this.startingLevel = false;
    }, 3000);
  };

  restart = () => {
    this.failedAndRestart = true;
    this.level = this.levels[this.level];
    setTimeout(() => {
      this.failedAndRestart = false;
      this.startingLevel = true;
      setTimeout(() => {
        this.startingLevel = false;
      }, 3000);
    }, 3000);
  };

  showRestartBoard = () => {
    push();
    fill(28, 28, 30);
    rect(0, 0, width, height);
    rectMode(CENTER);
    fill(51, 150);
    noStroke();
    rect(width / 2, height / 2, 150, 70);
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(190);
    text(`You Loser. Try again`, width / 2, height / 2);
    pop();
  };

  youAreStartingLevelNumber() {
    push();
    fill(28, 28, 30);
    rect(0, 0, width, height);
    rectMode(CENTER);
    fill(51, 150);
    noStroke();
    rect(width / 2, height / 2, 150, 70);
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(190);
    text(`Level ${this.level + 1}`, width / 2, height / 2);
    pop();
  }

  showFirstScreen() {
    push();
    fill(28, 28, 30);
    rect(0, 0, width, height);
    // rectMode(CENTER);
    // fill(51, 150);
    // noStroke();
    // rect(width / 2, height / 2, 150, 70);
    textAlign(CENTER, 20);
    textSize(10);
    fill(137, 230, 254);
    text(`FILL SCREEN WITH BORDER COLOR`, width / 2, height / 2);
    pop();
  }
}
