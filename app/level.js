class Level {
  constructor(endcolor, shapes) {
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
  }

  display() {
    strokeWeight(borderWidth);
    stroke(this.endcolor);
    rect(0, 0, width, height);
    this.shapes.forEach((shape) => {
      shape.display();
    });
    this.shapes.forEach((shape1) => {
      this.shapes.forEach((shape2) => {
        if (shape1 !== shape2 && shape1.intersects(shape2)) {
          shape1.x = shape1.x + shape1.radius;
          shape2.x = shape2.x;
          shape1.y = shape1.y + shape1.radius;
          shape2.y = shape2.y;
        }
      });
    });
  }
  onclick() {
    this.shapes.forEach((shape) => shape.onclick(mouseX, mouseY));
  }

  onrelease() {
    this.shapes.forEach((shape) => shape.onrelease());
  }
  ondrag() {
    this.shapes.forEach((shape) => shape.ondrag(mouseX, mouseY));
  }
}
