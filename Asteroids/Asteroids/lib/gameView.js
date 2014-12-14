(function() {
  if(typeof ASTEROIDS === "undefined") {
    window.ASTEROIDS = {};
  }
  
  var GameView = ASTEROIDS.GameView = function (game, canvas) {
    this.game = game;
    this.ctx = canvas.getContext("2d");
  }
    
  GameView.prototype.start = function () {
    this.game.addAsteroids();
    this.bindKeyHandlers();
    
    setInterval((function () {
      this.game.step();
      this.game.draw(this.ctx);

    }).bind(this), 20);
  }
  
  window.ASTEROIDS.GameView.prototype.bindKeyHandlers = function() {
    var view = this;
    
    key('up', function() {
      console.log('hello');
      view.game.ship.power([0, -1]);
    });
    
    key('down', function() {
      view.game.ship.power([0, 1]);
    });
    
    key('right', function() {
      view.game.ship.rotate(1, view.ctx);
    });
    
    key('left', function() {
      view.game.ship.rotate(-1, view.ctx);
    })
    
    key('space', function() {
      view.game.ship.fireBullet();
    });
    
  }

})();