class Level {
  constructor(endcolor, shapes, nextLevel, restart) {
    this.background = "rgb(28, 28, 30)";
    this.endcolor = endcolor;
    this.shapes = shapes.map((shape) => {
      if (shape.shape === "circle") {
        return new Circle(
          shape.color,
          shape.size,
          shape.position.x,
          shape.position.y,
          shape.type
        );
      } else if (shape.shape === "square") {
        return new Square(
          shape.color,
          shape.size,
          shape.position.x,
          shape.position.y,
          shape.type
        );
      }
    });
    this.colliding = false;
    this.nextLevel = nextLevel;
    this.restart = restart;
  }

  displayBackground() {
    fill(this.background);
    rect(0, 0, width, height);
  }
  displayBorder() {
    strokeWeight(borderWidth);
    stroke(this.endcolor);
    noFill();
    rect(0, 0, width, height);
  }

  loseGame(shapes) {
    const colors = shapes.map((shape) => shape.color);
    const uniqueColors = uniquifyArray(colors);
    // const staticTypes = shapes.map((shape) => shape.type === "static");
    const types = shapes.map((shape) => shape.type);
    if (colors.length === 0 && this.background != this.endcolor) {
      return true;
    }
    if (
      colors.length > 0 &&
      !colors.includes(this.endcolor) &&
      uniqueColors.length == colors.length
    ) {
      return true;
    }
    if (
      colors.length > 0 &&
      !types.includes("movable")
      // this.background != this.endcolor
    ) {
      return true;
    }
  }

  winLevel(shapes) {
    const colors = shapes.map((shape) => shape.color);
    return colors.length === 0 && this.background === this.endcolor;
  }

  display() {
    this.displayBackground();

    if (this.loseGame(this.shapes)) {
      return this.restart();
    }

    if (this.winLevel(this.shapes)) {
      return this.nextLevel();
    }

    // two forEach so that the shapes are drawn in the correct order and when shapes expand they don't overlap other shapes
    this.shapes
      .filter((shape) => shape.expanding)
      .forEach((shape) => {
        shape.display();
      });
    this.shapes
      .filter((shape) => !shape.expanding)
      .forEach((shape) => {
        shape.display();
      });

    this.shapes.forEach((shape1) => {
      this.shapes.forEach((shape2) => {
        if (shape1 !== shape2 && !this.colliding && shape1.intersects(shape2)) {
          if (shape1.color === shape2.color) {
            this.colliding = true;
            shape1.expand();
            shape2.expand();
            popSound.playMode("restart");
            popSound.play();
            setTimeout(() => {
              this.background = shape1.color;
              this.colliding = false;
              this.shapes = this.shapes.filter(
                (shape) => !shape.expanding && shape.color !== shape1.color
              );
            }, 1000);
          } else {
            shape1.bounceAway(shape2);
          }
        }
      });
    });

    this.displayBorder();
  }
  onclick() {
    if (!this.colliding) {
      this.shapes.forEach((shape) => shape.onclick(mouseX, mouseY));
    }
  }

  onrelease() {
    this.shapes.forEach((shape) => shape.onrelease());
  }
  ondrag() {
    if (!this.colliding) {
      this.shapes.forEach((shape) => shape.ondrag(mouseX, mouseY));
    }
  }
}
