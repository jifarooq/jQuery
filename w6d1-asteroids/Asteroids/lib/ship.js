(function() {
  if(typeof ASTEROIDS === "undefined") {
    window.ASTEROIDS = {};
  }
  
  var Ship = ASTEROIDS.Ship = function () {
    var game = window.ASTEROIDS.Game;
    var pos = [game.DIM_X / 2, game.DIM_Y / 2];
    this.angle = 0;
    this.velX = 0, this.velY = 0;
    this.pos = pos;
    var color = "#D12173";

    window.ASTEROIDS.MovingObject.apply(this, [pos, [0, 0], 10, color] );
  }
  Ship.inherits(window.ASTEROIDS.MovingObject);

  Ship.prototype.draw = function(ctx) {
    // adjust draw method to take x and y positions, plus angle?
    // transform x & y with sin and cos
    // draw lines with transformed x & y
    
    var x = this.pos[0], y = this.pos[1];
    var len = this.radius / 2;  // defining len since not a circle

    var x = this.pos[0] - (2 * len / 90) * this.angle
    var y = this.pos[1] + (2 * len / 90) * this.angle

    ctx.beginPath();
    ctx.fillStyle = this.color;
    this.updatePos();

    ctx.lineTo(x - len * 4 , y + len / 2);
    ctx.lineTo(x, y - (2 * len));
    ctx.lineTo(x + len * 4, y + len / 2);

    ctx.closePath();
    ctx.fill();
  }
  
  Ship.prototype.power = function(impulse) {
    this.velX += impulse[0];
    this.velY += impulse[1];
  }
  
  Ship.prototype.rotate = function(dir) {
    // ctx.save();
    // // ctx.translate(this.pos[0], this.pos[1]);
    // ctx.rotate(dir * 0.50)
    // this.draw(ctx);
    // ctx.restore();
    // debugger
    if ( dir === 'r') this.angle = this.angle + 15;
    if ( dir === 'l') this.angle = this.angle - 15;
  }
  
  Ship.prototype.fireBullet = function() {
    var bullet = new window.ASTEROIDS.Bullet(this);
    window.ASTEROIDS.Game.bullets.push(bullet);
  }
  
  
  
})();