class Game {
  constructor() {
    this.levels = levels.map((level) => {
      return new Level(level.color, level.shapes);
    });
  }
  display() {
    this.levels[0].display();
  }

  onclick() {
    this.levels[0].onclick(mouseX, mouseY);
  }

  onrelease() {
    this.levels[0].onrelease();
  }
  ondrag() {
    this.levels[0].ondrag(mouseX, mouseY);
  }

  // init() {
  //   this.background = new Background();
  //   this.player = new Player();
  // }
  // setup() {
  //   this.player.setup();
  // }
  // display() {
  //   clear();

  //   this.background.display();
  //   this.player.display();

  //   //CREATING ALL OF THE OBSTACLES EVERY 60 FRAMES
  //   if (frameCount % 100 === 0) {
  //     this.obstacles.push(new Obstacles());
  //   }
  //   if (frameCount % 500 === 0) {
  //     this.packages.push(new Package());
  //   }
  //   //DISPLAYING ALL OF THE OBSTACLES
  //   this.obstacles.forEach((obstacle) => {
  //     obstacle.display();
  //   });
  //   this.packages.forEach((onePackage) => {
  //     onePackage.display();
  //   });

  //   //HERE WE WILL FILTER WHATEVER OBSTACLE COLLIDES WITH THE PLAYER
  //   this.obstacles = this.obstacles.filter((obstacle) => {
  //     let collision = obstacle.checkCollision(this.player);
  //     if (collision) {
  //       this.player.onCollision();
  //     }
  //     return !collision;
  //   });
  //   this.packages = this.packages.filter((onePackage) => {
  //     let collision = onePackage.checkCollision(this.player);
  //     if (collision) {
  //       this.player.gotPackage();
  //     }
  //     return !collision;
  //   });
  //   // console.log(doesnotexist);
  //   // rect(100, 100, 100, 100);
  // }
}
