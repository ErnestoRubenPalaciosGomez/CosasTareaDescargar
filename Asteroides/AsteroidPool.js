var GameEngine = (function(GameEngine) {
  class AsteroidPool {
    constructor(w, h) {
      this.game_w = w;
      this.game_h = h;

      this.initialSize = 40;

      this.numAsteroids = 60;
      this.asteroids = [];

      for (let i=0; i<this.numAsteroids; i++) {
        this.asteroids.push(new GameEngine.Asteroid(0, 0, this.initialSize));
      }
    }

    addAsteroid() {
      let x, y;

      switch (parseInt(Math.random() * 2)) {
        case 0:
          x = -this.initialSize;
          y = Math.random() * this.game_h;
          break;
        case 1:
          x = Math.random() * this.game_w;
          y = -this.initialSize;
          break;
      }

      for (let i=0; i<this.numAsteroids; i++) {
        if (!this.asteroids[i].isAlive) {
          this.asteroids[i].activate(x, y);
          this.asteroids[i].size = this.initialSize;
          this.asteroids[i].hp = 3;
          return this.asteroids[i];
        }
      }
    }

    split(old_asteroid) {
      old_asteroid = this.asteroids[old_asteroid];
      let new_asteroid = this.addAsteroid();

      if (new_asteroid) {
        new_asteroid.x = old_asteroid.x;
        new_asteroid.y = old_asteroid.y;
        new_asteroid.vx = old_asteroid.vx;
        new_asteroid.vy = old_asteroid.vy*0.5;
        new_asteroid.size = new_asteroid.radius = old_asteroid.size;
        new_asteroid.hp = old_asteroid.hp;
        new_asteroid.hit();
        new_asteroid.tamSize = new_asteroid.size*2.5;
        new_asteroid.meteorito = new GameEngine.Sprite(old_asteroid.x, old_asteroid.y, new_asteroid.tamSize, new_asteroid.tamSize, "asteroid2.svg");
      }

      old_asteroid.hit();
    }

    update(elapsed) {
      for (let i=0; i<this.numAsteroids; i++) {
        if (this.asteroids[i].isAlive) {
          this.asteroids[i].update(elapsed);
        }
      }
    }

    render(ctx) {
      for (let i=0; i<this.numAsteroids; i++) {
        if (this.asteroids[i].isAlive) {
          this.asteroids[i].render(ctx);
        }
      }
    }    
  }

  GameEngine.AsteroidPool = AsteroidPool;
  return GameEngine;
})(GameEngine || {})        