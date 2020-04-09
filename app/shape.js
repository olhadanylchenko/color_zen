class Shape {
  constructor(color, size, x, y, type) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.offsetX = 0;
    this.offsetY = 0;
    this.type = type;
    this.dragging = false;
    this.expanding = false;
    this.frame = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.size = size;
  }
  updatePosition = () => {
    this.x += this.speedX;
    this.speedX *= friction;

    this.y += this.speedY;
    this.speedY *= friction;
  };
  onclick = (mouseX, mouseY) => {
    if (this.type === "static") {
      return;
    }
    let distance = dist(mouseX, mouseY, this.x, this.y);
    if (distance < this.size) {
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
      const offsetX = mouseX - this.offsetX;
      const offsetY = mouseY - this.offsetY;
      this.speedX = offsetX - this.x;
      this.speedY = offsetY - this.y;
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

  expand = () => {
    this.expanding = true;
  };

  bounceAway = (otherShape) => {
    const tempSpeedX = otherShape.speedX;
    const tempSpeedY = otherShape.speedY;
    otherShape.speedX = this.speedX;
    otherShape.speedY = this.speedY;
    this.speedX = tempSpeedX;
    this.speedY = tempSpeedY;

    this.dragging = false;
    otherShape.dragging = false;
  };
}
