class Ball {
  constructor(color, radius, x, y) {
    this.color = color;
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.offsetX = 0;
    this.offsetY = 0;
    this.dragging = false;
  }
  randomPosition = (minX, maxX, minY, maxY) => {
    this.x = random(minX, maxX);
    this.y = random(minY, maxY);
  };
  draw = () => {
    fill(this.color.r, this.color.g, this.color.b);
    noStroke();
    circle(this.x, this.y, this.radius * 2);
    if (
      this.x + this.radius > width ||
      this.y + this.radius > height ||
      this.x - this.radius < 0 ||
      this.y - this.radius < 0
    ) {
      print("OFF THE SCREEN");
    }
  };
  onclick = (mouseX, mouseY) => {
    let distance = dist(mouseX, mouseY, this.x, this.y);
    if (distance < this.radius) {
      this.dragging = true;
      this.offsetX = mouseX - this.x;
      this.offsetY = mouseY - this.y;
    }
  };

  ondrag = (mouseX, mouseY) => {
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
    if (this.dragging) {
      this.dragging = false;
      this.offsetX = 0;
      this.offsetY = 0;
    }
  };
}
