class Level {
  constructor(endcolor, shapes) {
    this.background = "rgb(172, 179, 200)";
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
      this.colliding = false;
    });
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

  display() {
    this.displayBackground();
    // two forEach so that the shapes are drawn in the correct order
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
        if (!this.colliding && shape1 !== shape2 && shape1.intersects(shape2)) {
          if (shape1.shape === "circle") {
            console.log("square INTERSECTS YO");
          }
          if (shape1.color === shape2.color) {
            game.newLevel = true;
            this.colliding = true;
            shape1.expand();
            shape2.expand();

            setTimeout(() => {
              this.background = shape1.color;
              this.colliding = false;
              this.shapes = this.shapes.filter((shape) => !shape.expanding);
            }, 1000);
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
