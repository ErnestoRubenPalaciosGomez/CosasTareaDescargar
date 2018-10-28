var GameEngine = (function(GameEngine) {
  const PI2 = 2*Math.PI;

  class Power {
    constructor(x, y, size) {
      this.isAlive = false;
      this.x = x;
      this.y = y;
      //this.speed = 500;
      this.nave = new GameEngine.Sprite(x, y, size, size, "space_ship.svg");
      
      let angle = (360 * Math.random()) * Math.PI/180;
      this.size = this.radius = size;
    }

    activate(x, y) {
      this.x = x;
      this.y = y;
      this.isAlive = true;
    }

    update(elapsed) {}

    render(ctx) {
      this.nave.render(ctx);
      ctx.strokeStyle = "#ff0000";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, PI2);
      ctx.stroke(); 
    }
  }

  GameEngine.Power = Power;
  return GameEngine;
})(GameEngine || {})