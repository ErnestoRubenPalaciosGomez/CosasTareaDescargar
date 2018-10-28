window.addEventListener("load", function() {
  console.log("init");
  let theCanvas = document.getElementById("theCanvas");
  let ctx = theCanvas.getContext("2d");

  let lastTime = Date.now();
  let current = 0;
  let elapsed = 0;

  let game = new GameEngine.Game(ctx);

  (function gameLoop() {
    current = Date.now();
    elapsed = (current - lastTime) / 1000;

    game.processInput();
    game.update(elapsed);
    game.render();

    lastTime = current;

    window.requestAnimationFrame(gameLoop);
  })();
});