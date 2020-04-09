class Shape {
  constructor(color, size, x, y, type) {
    this.color = color;
    // this.radius = radius;
    this.x = x;
    this.y = y;
    this.offsetX = 0;
    this.offsetY = 0;
    this.type = type;
    this.dragging = false;
    this.expanding = false;
    this.frame = 0;
    // this.shape = "circle";
    this.previousX = x;
    this.previousY = y;
    this.speedX = 0;
    this.speedY = 0;
    this.size = size;
  }

  aMethod = () => {
    console.log("My Name is! TIcky ticky slim shady");
  };
}

class Something extends Shape {
  constructor(color, size, x, y, type) {
    super(color, size, x, y, type);
    this.size = size / 2;
  }

  aMethod = () => {
    return 1 + 1;
  };
}
