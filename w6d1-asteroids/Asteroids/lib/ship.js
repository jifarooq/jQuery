(function() {
  if(typeof ASTEROIDS === "undefined") {
    window.ASTEROIDS = {};
  }
  
  var Ship = ASTEROIDS.Ship = function () {
    var color = "#D12173";
    var game = window.ASTEROIDS.Game;
    this.angle = 0;
    this.pos = [game.DIM_X / 2, game.DIM_Y / 2];
    this.velX = 0, this.velY = 0;

    window.ASTEROIDS.MovingObject.apply(this, [this.pos, [0, 0], 10, color] );
  
    this.shipImage = new Image();
    this.shipImage.src = './lib/ship.png';
  }
  Ship.inherits(window.ASTEROIDS.MovingObject);

  Ship.prototype.draw = function(ctx) {
    var x = this.pos[0], y = this.pos[1];
    var len = this.radius / 2;  // defining len since not a circle

    // var x = this.pos[0] - (2 * len / 90) * this.angle
    // var y = this.pos[1] + (2 * len / 90) * this.angle

    this.updatePos();
    ctx.fillStyle = this.color;
    ctx.beginPath();

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
  
  Ship.prototype.rotate = function(dir, ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(Math.PI / 12);
    ctx.translate(-this.pos[0], -this.pos[1]);
    this.draw(ctx);
    ctx.restore();
    // ctx.rotate(-Math.PI / 12);

    // ctx.rotate(-dir * .01);
    // ctx.translate(-this.pos[0], -this.pos[1]);
    // ctx.translate(-this.pos[0], -this.pos[1]);
    // ctx.restore();
    // debugger
    // if ( dir === 'r') this.angle = this.angle + 15;
    // if ( dir === 'l') this.angle = this.angle - 15;
  }

  // Ship.prototype.rotate = function(dir, ctx) {
  //   ctx.save();
  //   ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  //   ctx.fillRect(0, 0, ctx.width, ctx.height);
  //   ctx.restore();
  //   ctx.save();

  //   ctx.translate(this.pos[0], this.pos[1]);
  //   ctx.rotate(Math.PI / 12);
  //   ctx.fillStyle = "rgba(150, 255, 0, 0.3)";
  //   ctx.strokeStyle = "#96FF00";
  //   ctx.beginPath();
  //   ctx.moveTo(v[0][0],v[0][1]);
  //   ctx.lineTo(v[1][0],v[1][1]);
  //   ctx.lineTo(v[2][0],v[2][1]);
  //   ctx.closePath();
  //   ctx.stroke();
  //   ctx.fill();
  //   ctx.restore();
  // }
  
  Ship.prototype.fireBullet = function() {
    var bullet = new window.ASTEROIDS.Bullet(this);
    window.ASTEROIDS.Game.bullets.push(bullet);
  }
  
})();