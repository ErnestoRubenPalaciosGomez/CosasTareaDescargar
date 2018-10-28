var GameEngine = (function(GameEngine) {
  const PI2 = 2*Math.PI;

  class Asteroid {
    constructor(x, y, size) {
      this.isAlive = false;
      this.speed = 100;
      
      let angle = (360 * Math.random()) * Math.PI/180;
      this.vx = Math.cos(angle) * this.speed;
      this.vy = Math.sin(angle) * this.speed;
      this.size = this.radius = size;
      this.hp = 3;
      this.tamSize = this.size*2.5;
      this.meteorito = new GameEngine.Sprite(x, y, this.tamSize, this.tamSize, "asteroid2.svg");
    }

    hit() {
      this.hp--;

      if (this.hp > 0) {
        this.radius = this.size = this.size/2;
        this.meteorito.w = this.meteorito.w/2
        this.meteorito.h = this.meteorito.h/2
      }
      else {
        this.isAlive = false;
      }
    }

    activate(x, y) {
      this.x = x;
      this.y = y;
      this.isAlive = true;
    }

    update(elapsed) {
      this.x += this.vx *elapsed;
      this.y += this.vy *elapsed;
      this.meteorito.x = this.x;
      this.meteorito.y = this.y;
    }

    render(ctx) {
      this.meteorito.render(ctx)
      ctx.strokeStyle = "#ff0000";
      ctx.beginPath();
      ctx.stroke(); 
    }
  }

  GameEngine.Asteroid = Asteroid;
  return GameEngine;
})(GameEngine || {})