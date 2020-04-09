class Circle {
  constructor(color, radius, x, y, type) {
    this.color = color;
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.offsetX = 0;
    this.offsetY = 0;
    this.type = type;
    this.dragging = false;
    this.expanding = false;
    this.frame = 0;
    this.shape = "circle";
    this.previousX = x;
    this.previousY = y;
    this.speedX = 0;
    this.speedY = 0;
  }

  stayInsideTheGameBoard() {
    if (this.x + this.radius > width) {
      this.x = width - this.radius;
    }
    if (this.y + this.radius > height) {
      this.y = height - this.radius;
    }
    if (this.x - this.radius < 0) {
      this.x = this.radius;
    }
    if (this.y - this.radius < 0) {
      this.y = this.radius;
    }
    this.speedX = 0;
    this.speedY = 0;
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
      this.frame++;
    } else {
      this.stayInsideTheGameBoard();
      this.x += this.speedX;
      this.y += this.speedY;
      this.speedX *= friction;
      this.speedY *= friction;
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
      this.frame++;
    }
  };

  onclick = (mouseX, mouseY) => {
    if (this.type === "static") {
      return;
    }
    let distance = dist(mouseX, mouseY, this.x, this.y);
    if (distance < this.radius) {
      this.dragging = true;
      this.offsetX = mouseX - this.x;
      this.offsetY = mouseY - this.y;
    }
  };

  ondrag = (mouseX, mouseY) => {
    if (this.type === "static") {
      return;
    }
    if (this.dragging) {
      this.previousX = this.x;
      this.previousY = this.y;
      this.x = mouseX - this.offsetX;
      this.y = mouseY - this.offsetY;
      this.speedX = this.previousX - this.x;
      this.speedY = this.previousY - this.y;
    }
  };
  onrelease = () => {
    if (this.type === "static") {
      return;
    }
    if (this.dragging) {
      this.dragging = false;
      this.offsetX = 0;
      this.offsetY = 0;
    }
  };

  intersects = (otherShape) => {
    if (otherShape.shape === "circle") {
      let distance = dist(this.x, this.y, otherShape.x, otherShape.y);
      return distance < this.radius + otherShape.radius;
    }
    if (otherShape.shape === "square") {
      let collision =
        this.x + this.radius > otherShape.x - otherShape.edgeLength / 2 &&
        this.x - this.radius < otherShape.x + otherShape.edgeLength / 2 &&
        this.y + this.radius > otherShape.y - otherShape.edgeLength / 2 &&
        this.y - this.radius < otherShape.y + otherShape.edgeLength / 2;
      return collision;
    }

    return false;
  };

  expand = () => {
    this.expanding = true;
  };

  bounceAway = (otherShape) => {
    // const difX = this.x - this.previousX;
    // const difY = this.y - this.previousY;
    const otherShapeX = otherShape.speedX;
    const otherShapeY = otherShape.speedY;
    this.speedX = otherShapeX;
    this.speedY = otherShapeY;
    // this.x = this.previousX;
    // this.y = this.previousY;
    this.dragging = false;
  };
}
