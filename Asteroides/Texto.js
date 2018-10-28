var GameEngine = (function(GameEngine) {
	
	class Texto{
		constructor(x, y, cadena){
			this.x = x;
			this.y = y;
			this.cadena = cadena;
		}

		processInput(){}

		update(elapsed){}

		render(ctx){
			ctx.save();
			ctx.font = "bold 23px Monospace";
			ctx.fillStyle = "#ffffff";
			ctx.fillText(this.cadena, this.x, this.y);
			ctx.restore();
		}
	}

	GameEngine.Texto = Texto;
	return GameEngine;
})(GameEngine || {})