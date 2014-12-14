(function() {
  if(typeof ASTEROIDS === "undefined") {
    window.ASTEROIDS = {};
  }
  
  var Ship = ASTEROIDS.Ship = function () {
    // var color = "#D12173";
    this.game = window.ASTEROIDS.Game;

    //by default image is tilted; correct it!
    this.angle = (Math.PI / 180) * 32;
    this.pos = [this.game.DIM_X / 2, this.game.DIM_Y / 2];
    this.velX = 0, this.velY = 0;

    window.ASTEROIDS.MovingObject.apply(this, [this.pos, [0, 0], 10, null] );
    
    this.shipImage = new Image();
    this.shipImage.src = './lib/ship.png';
  }
  Ship.inherits(window.ASTEROIDS.MovingObject);

  Ship.prototype.center = function() {
    return [this.pos[0] - this.side / 2, this.pos[1] + this.side / 2]
  }

  Ship.prototype.draw = function(ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.angle);
    ctx.drawImage(this.shipImage, -20, -20);
    ctx.restore();
  }
  
  Ship.prototype.power = function(impulse) {
    this.velX += impulse[0];
    this.velY += impulse[1];
  }
  
  Ship.prototype.rotate = function(dir) {
    this.angle += dir * (Math.PI / 90);
  }
  
  Ship.prototype.fireBullet = function() {
    var bullet = new ASTEROIDS.Bullet(this);
    // window.ASTEROIDS.Game.bullets.push(bullet);
    debugger
    this.game.bullets.push(bullet);
    debugger
  }
  
})();