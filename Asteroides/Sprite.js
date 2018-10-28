var GameEngine = (function(GameEngine) {
  class Sprite {
    constructor(x, y, w, h, img_path) {
      this.x = x;
      this.y = y;
      this.vx = 0;
      this.vy = 0;
      this.vr = 0;
      this.ax = 0;
      this.ay = 0;

      this.w = w;
      this.h = h;
      this.rotation = 0;

      this.image = null;
      if (img_path) {
        this.image = new Image();
        this.image.src = img_path;
      }
    }

    processInput() { }

    update(elapsed) {
      this.vx += this.ax;
      this.vy += this.ay;

      this.vx *= this.friction;
      this.vy *= this.friction;

      this.x += this.vx * elapsed;
      this.y += this.vy * elapsed;
    }
    
    render(ctx) {
      if (this.image) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(this.image, -this.w/2, -this.h/2, this.w, this.h);
        ctx.restore();
      }
    }
  }

  GameEngine.Sprite = Sprite;
  return GameEngine;
})(GameEngine || {})