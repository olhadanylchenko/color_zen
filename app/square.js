class Square {
  constructor(color, edgeLength, x, y, type) {
    this.color = color;
    this.edgeLength = edgeLength;
    this.x = x;
    this.y = y;
    this.offsetX = 0;
    this.offsetY = 0;
    this.type = type;
    this.dragging = false;
    this.expanding = false;
    this.frame = 0;
    this.shape = "square";
  }

  stayInsideTheGameBoard() {
    if (this.x - borderWidth * 2 + this.edgeLength > width - borderWidth * 2) {
      this.x = width - this.edgeLength - borderWidth / 2;
    }
    if (this.y - borderWidth * 2 + this.edgeLength > height - borderWidth * 2) {
      this.y = height - this.edgeLength - borderWidth / 2;
    }
    if (this.x - this.edgeLength - borderWidth * 2 < 0) {
      this.x = this.edgeLength + borderWidth / 2;
    }
    if (this.y - this.edgeLength - borderWidth * 2 < 0) {
      this.y = this.edgeLength + borderWidth / 2;
    }
  }

  display = () => {
    if (this.expanding) {
      this.edgeLength += 3.5;
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
      this.frame++;
    } else {
      this.stayInsideTheGameBoard();
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
      this.frame++;
    }
  };

  onclick = (mouseX, mouseY) => {
    if (this.type === "static") {
      return;
    }
    let distance = dist(mouseX, mouseY, this.x, this.y);
    if (distance < this.edgeLength) {
      this.dragging = true;
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
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
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
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
    if (otherShape.shape === "square") {
      let collision =
        this.x + this.edgeLength > otherShape.x &&
        this.x - this.edgeLength < otherShape.x + otherShape.edgeLength &&
        this.y + this.edgeLength > otherShape.y &&
        this.y - this.edgeLength < otherShape.y + otherShape.edgeLength;
      return collision;
    }
  };

  expand = () => {
    this.expanding = true;
  };
}
