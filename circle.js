class Circle extends Shape {
  constructor(color, size, x, y, type) {
    super(color, size, x, y, type);
    this.radius = size;
    this.shape = "circle";
  }

  stayInsideTheGameBoard() {
    let hitHorizontalEdge = false;
    let hitVerticalEdge = false;

    if (this.x + this.radius > width) {
      this.x = width - borderWidth - this.radius;
      hitVerticalEdge = true;
    }
    if (this.y + this.radius > height) {
      hitHorizontalEdge = true;
      this.y = height - borderWidth - this.radius - 1;
    }
    if (this.x - this.radius < 0) {
      this.x = this.radius + borderWidth + 1;
      hitVerticalEdge = true;
    }
    if (this.y - this.radius < 0) {
      hitHorizontalEdge = true;
      this.y = this.radius + borderWidth + 1;
    }

    if (hitVerticalEdge) {
      this.speedX = 0;
      this.dragging = false;
    }
    if (hitHorizontalEdge) {
      this.speedY = 0;
      this.dragging = false;
    }
  }

  display = () => {
    if (this.expanding) {
      // this.stayInsideTheGameBoard();
      this.radius += 15;
      push();
      fill(this.color);
      noStroke();
      circle(
        this.x,
        this.y,
        this.type === "static"
          ? this.radius * 2
          : this.radius * 2 + Math.sin(this.frame / 10) * 2
      );
      pop();
    } else {
      this.stayInsideTheGameBoard();
      this.updatePosition();
      push();
      fill(this.color);
      noStroke();
      circle(
        this.x,
        this.y,
        this.type === "static"
          ? this.radius * 2
          : this.radius * 2 + Math.sin(this.frame / 10) * 2
      );
      pop();
    }
    this.frame++;
  };

  intersects = (otherShape) => {
    if (otherShape.shape === "circle") {
      let distance = dist(this.x, this.y, otherShape.x, otherShape.y);
      return distance < this.radius + otherShape.radius;
    }
    // if (otherShape.shape === "square") {
    //   let collision =
    //     this.x + this.radius > otherShape.x - otherShape.edgeLength &&
    //     this.x - this.radius < otherShape.x + otherShape.edgeLength &&
    //     this.y + this.radius > otherShape.y - otherShape.edgeLength &&
    //     this.y - this.radius < otherShape.y + otherShape.edgeLength;
    //   return collision;
    // }

    return false;
  };
}
