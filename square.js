class Square extends Shape {
  constructor(color, size, x, y, type) {
    super(color, size, x, y, type);
    this.edgeLength = size;
    this.shape = "square";
  }

  stayInsideTheGameBoard() {
    let hitHorizontalEdge = false;
    let hitVerticalEdge = false;

    if (this.x + this.edgeLength / 2 > width - borderWidth) {
      this.x = width - borderWidth - 1 - this.edgeLength / 2;
      hitVerticalEdge = true;
    }
    if (this.y + this.edgeLength / 2 > height - borderWidth) {
      hitHorizontalEdge = true;
      this.y = height - borderWidth - 1 - this.edgeLength / 2;
    }
    if (this.x - this.edgeLength < 0) {
      this.x = this.edgeLength + borderWidth / 2 + 1;
      hitVerticalEdge = true;
    }
    if (this.y - this.edgeLength / 2 <= borderWidth) {
      hitHorizontalEdge = true;
      this.y = borderWidth + 1 + this.edgeLength / 2;
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
      this.edgeLength *= 1.08;
      push();
      rectMode(CENTER);
      fill(this.color);
      noStroke();
      rect(
        this.x,
        this.y,
        this.type === "static"
          ? this.edgeLength * 2
          : this.edgeLength * 2 + Math.sin(this.frame / 10) * 2
      );
      pop();
    } else {
      this.stayInsideTheGameBoard();
      this.updatePosition();
      push();
      rectMode(CENTER);
      fill(this.color);
      noStroke();
      rect(
        this.x,
        this.y,
        this.type === "static"
          ? this.edgeLength * 2
          : this.edgeLength * 2 + Math.sin(this.frame / 10) * 2
      );
      pop();
    }
    this.frame++;
  };

  intersects = (otherShape) => {
    if (otherShape.shape === "square") {
      let collision =
        this.x + this.edgeLength > otherShape.x &&
        this.x - this.edgeLength < otherShape.x + otherShape.edgeLength &&
        this.y + this.edgeLength > otherShape.y &&
        this.y - this.edgeLength < otherShape.y + otherShape.edgeLength;
      return collision;
    }

    // http://www.jeffreythompson.org/collision-detection/circle-rect.php

    if (otherShape.shape === "circle") {
      const circleX = otherShape.x;
      const circleY = otherShape.y;

      let testX = otherShape.x;
      let testY = otherShape.y;

      const halfEdgeLength = this.edgeLength / 2;
      const leftEdge = this.x - halfEdgeLength;
      const topEdge = this.y - halfEdgeLength;
      const rightEdge = this.x + halfEdgeLength;
      const bottomEdge = this.y + halfEdgeLength;

      if (circleX < leftEdge) {
        testX = leftEdge;
      } else if (circleX > rightEdge) {
        testX = rightEdge;
      }

      if (circleY < topEdge) {
        testY = topEdge;
      } else if (circleY > bottomEdge) {
        testY = bottomEdge;
      }

      const distX = circleX - testX;
      const distY = circleY - testY;

      const hypotenuse = Math.sqrt(distX * distX + distY * distY);

      return hypotenuse <= otherShape.radius;
    }

    return false;
  };
}
