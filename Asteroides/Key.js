var GameEngine = (function(GameEngine) {
  let Key = {
    _pressed : {},
    
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32,
    Z: 90,

    isPress: function(keyCode) {
      return this._pressed[keyCode];
    },
    onKeyDown: function(keyCode) {
      this._pressed[keyCode] = true;
    },
    onKeyUp: function(keyCode) {
      delete this._pressed[keyCode];
    }
  }

  GameEngine.KEY = Key;
  return GameEngine;
})(GameEngine || {})