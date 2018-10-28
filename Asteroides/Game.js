var GameEngine = (function(GameEngine) {
  let cw;
  let ch;

  let KEY = GameEngine.KEY;

  let aPool;
  let bPool;

  let contador = 0;
  let numAsteroides = 1;
  var over = "Game over";

  let audio = new Audio("Audio.mp3");

  class Game {
    constructor(ctx) {
      cw = ctx.canvas.width;
      ch = ctx.canvas.height;
      this.ctx = ctx;

      this.contador = contador;
      this.waitHit = 1;

      this.bandera = false;

      this.ship = new GameEngine.Ship(cw/2, ch/2, 50);


      this.asteroidPool = new GameEngine.AsteroidPool(cw, ch);
      this.asteroidPool.addAsteroid();
      this.asteroidPool.addAsteroid();
      this.asteroidPool.addAsteroid();
      this.asteroidPool.addAsteroid();
      this.asteroidPool.addAsteroid();

      this.powerUp = new GameEngine.Power(cw/2, ch/2, 20);


      this.score = new GameEngine.Texto(800, 25, this.contador);
      this.tscore = new GameEngine.Texto(700,25, "Score:")
      this.heart = new GameEngine.Texto(20, 25, "\u2764:");
      this.live = new GameEngine.Texto(70,25, 3);

      this.finish = new GameEngine.Texto(400, 300, over);


      window.addEventListener("keydown", function(evt) {
        KEY.onKeyDown(evt.keyCode);
      });
      window.addEventListener("keyup", function(evt) {
        KEY.onKeyUp(evt.keyCode);
      });
    }

    processInput() {
      this.ship.processInput();
      if(this.live.cadena == 0)
        if(KEY.isPress(KEY.SPACE)){
          this.ship.x = cw/2;
          this.ship.y = ch/2;
          this.score.cadena = 0;
          this.live.cadena = 3;
          this.bandera = true;
          this.asteroidPool = new GameEngine.AsteroidPool(cw, ch);
          this.asteroidPool.addAsteroid();
      this.asteroidPool.addAsteroid();
      this.asteroidPool.addAsteroid();
      this.asteroidPool.addAsteroid();
      this.asteroidPool.addAsteroid();
        }
      if(KEY.isPress(KEY.SPACE)){
        this.bandera = true;
        audio.play();
      }
    }

    update(elapsed) {
      aPool = this.asteroidPool.asteroids;
      bPool = this.ship.weapon.bullets;

      this.ship.update(elapsed);
      this.asteroidPool.update(elapsed);


      this.checkBorders(this.ship);

      for (let i=0; i<aPool.length; i++) {
        if (aPool[i].isAlive) {
          this.checkBorders(aPool[i]);
        }
      }

      for (let i=0; i<bPool.length; i++) {
        if (bPool[i].isAlive) {
          this.checkBorders(bPool[i]);
        }
      }


      for (let i=0; i<aPool.length; i++) {
        //Aqui checamos si la nave colisiona con un asteroide vivo
        if(this.checkCircleCollision(this.ship, aPool[i], "nave-asteroide") && aPool[i].isAlive){
          this.waitHit += elapsed*1.9;
          if(this.waitHit > 1 && this.bandera){
            this.live.cadena += -1;
            this.waitHit = 0;
          }
        }
      }

      for (let bullet_i=0; bullet_i<bPool.length; bullet_i++) {
        if (bPool[bullet_i].isAlive) {
          for (let asteroid_i=0; asteroid_i<aPool.length; asteroid_i++) {
            if ( (aPool[asteroid_i].isAlive) && (this.checkCircleCollision(bPool[bullet_i], aPool[asteroid_i], "bala-asteroide")) ) {
              if(aPool[asteroid_i].hp == 3){
                this.score.cadena += 20;    
              }
              if(aPool[asteroid_i].hp == 2){
                this.score.cadena += 50;
              }
              if(aPool[asteroid_i].hp == 1){
                this.score.cadena += 100;
              }
              bPool[bullet_i].isAlive = false;
              this.asteroidPool.split(asteroid_i);
            }
          }
        }
      }

      numAsteroides += 1;
      if(numAsteroides % 50 == 0){
        this.asteroidPool.addAsteroid();
      }

      console.log(numAsteroides);
      if(numAsteroides % 1000 == 0){
        this.powerUp.activate(cw/2, ch/2);
      }

      if(this.checkCircleCollision(this.ship, this.powerUp, "nave-power") && this.powerUp.isAlive){
          this.waitHit = 1;
          this.powerUp.isAlive = false;
        }

      if(numAsteroides % 450 == 0){
          this.powerUp.isAlive = false;
      }


      //caso cuando la nave se queda sin vidas
      if(this.live.cadena < 1){
        this.live.cadena = 0;
        this.bandera = false;
        audio.load();

        for (let i=0; i<aPool.length; i++) {
          if (aPool[i].isAlive) {
            aPool[i].isAlive = false;
          }
        }

      }


    }


    checkCircleCollision(obj1, obj2, tmpmsg) {
      let dist = Math.sqrt( (obj1.x - obj2.x)*(obj1.x - obj2.x) + (obj1.y - obj2.y)*(obj1.y - obj2.y) );
      if (dist < obj1.radius + obj2.radius) {
        console.log("colision", tmpmsg);
        return true;
      }
      return false;
    }

    checkBorders(gameObject) {
      if (gameObject.x < -gameObject.radius) {
        gameObject.x = cw + gameObject.radius;
      }
      if (gameObject.x > cw+gameObject.radius) {
        gameObject.x = -gameObject.radius;
      }
      if (gameObject.y < -gameObject.radius) {
        gameObject.y = ch + gameObject.radius;
      }
      if (gameObject.y > ch+gameObject.radius) {
        gameObject.y = -gameObject.radius;
      }
    }

    render() {
      this.ctx.fillStyle = "rgba(0,0,0,1)";
      this.ctx.fillRect(0, 0, cw, ch);
      
      if(this.bandera){
        this.ship.render(this.ctx);
      }
      this.asteroidPool.render(this.ctx);

      this.score.render(this.ctx);
      this.tscore.render(this.ctx);
      this.heart.render(this.ctx);
      this.live.render(this.ctx);

      if(this.live.cadena == 0){
        this.finish.render(this.ctx);
      }

      if(this.powerUp.isAlive)
        this.powerUp.render(this.ctx);

    }


  }

  GameEngine.Game = Game;
  return GameEngine;
})(GameEngine || {})