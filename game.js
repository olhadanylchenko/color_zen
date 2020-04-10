class Game {
  constructor() {
    this.levels = levels.map((level) => {
      return new Level(level.color, level.shapes, this.nextLevel, this.restart);
    });
    this.firstScreen = true;
    setTimeout(() => {
      this.firstScreen = false;
      this.startingLevel = true;
      setTimeout(() => {
        this.startingLevel = false;
      });
    });
    this.level = 0;
    this.startingLevel = false;
    this.failedAndRestart = false;
  }

  display() {
    if (this.level < this.levels.length) {
      if (this.firstScreen) {
        this.showFirstScreen();
      } else if (this.startingLevel) {
        this.youAreStartingLevelNumber();
      } else if (this.failedAndRestart) {
        this.showRestartBoard();
      } else {
        this.levels[this.level].display();
      }
    } else {
      this.youWon();
    }
  }

  onclick() {
    if (this.level < this.levels.length) {
      this.levels[this.level].onclick(mouseX, mouseY);
    }
  }

  onrelease() {
    if (this.level < this.levels.length) {
      this.levels[this.level].onrelease();
    }
  }
  ondrag() {
    if (this.level < this.levels.length) {
      this.levels[this.level].ondrag(mouseX, mouseY);
    }
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
    const restartLevel = new Level(
      levels[this.level].color,
      levels[this.level].shapes,
      this.nextLevel,
      this.restart
    );
    this.levels[this.level] = restartLevel;
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
    rect(width / 2, height / 2, 200, 70);
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(190);
    text(`Try again`, width / 2, height / 2);
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
    textAlign(CENTER, CENTER);
    textSize(25);
    fill(137, 230, 254);
    text(`FILL SCREEN WITH BORDER COLOR`, width / 2, height / 2);
    pop();
  }
  youWon() {
    push();
    fill(28, 28, 30);
    rect(0, 0, width, height);
    rectMode(CENTER);
    fill(51, 150);
    noStroke();
    rect(width / 2, height / 2, 150, 70);
    textAlign(CENTER, CENTER);
    textSize(25);
    fill(255, 255, 255);
    text(`YOU WON`, width / 2, height / 2);
    pop();
  }
}
