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
    this.frame = 0;
  }

  stayInsideTheGameBoard() {
    if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
      this.dragging = true;
    } else {
      this.dragging = false;
    }
  }

  display = () => {
    this.stayInsideTheGameBoard();
    push();
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
}