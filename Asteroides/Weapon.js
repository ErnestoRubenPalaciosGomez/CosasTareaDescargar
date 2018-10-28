var GameEngine = (function(GameEngine) {
  class Weapon {
    constructor(numBullets, delayActivation=1) {
      this.bullets = [];
      for (let i=0; i<numBullets; i++) {
        this.bullets.push(new GameEngine.Bullet());
      }

      this.delayActivation = delayActivation;
      this.auxDelayTime = delayActivation;
    }

    shot(ox, oy, x, y, vx, vy, rotation) {
      for (let i=0, l=this.bullets.length; i<l; i++) {
        
        if (!this.bullets[i].isAlive) {
          this.bullets[i].activate(ox, oy, x, y, vx, vy, rotation);
          return;
        }
      }
    }

    update(elapsed) {
      for (let i=0, l=this.bullets.length; i<l; i++) {
        if (this.bullets[i].isAlive) {
          this.bullets[i].update(elapsed);
        }
      }
    }

    render(ctx) {
      for (let i=0, l=this.bullets.length; i<l; i++) {
        if (this.bullets[i].isAlive) {
          this.bullets[i].render(ctx);
        }
      }
    }
  }

  GameEngine.Weapon = Weapon;
  return GameEngine;
})(GameEngine || {})