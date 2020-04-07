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
    this.frame = 0;
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
  }

  display = () => {
    this.stayInsideTheGameBoard();
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
      const newX = mouseX - this.offsetX;
      const newY = mouseY - this.offsetY;
      this.velocityX = newX - this.x;
      this.velocityY = newY - this.y;
      this.x = newX;
      this.y = newY;
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
    let distance = dist(this.x, this.y, otherShape.x, otherShape.y);
    return distance < this.radius + otherShape.radius;
  };
}
