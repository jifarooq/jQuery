(function () {

  if (typeof Game === "undefined") {
    window.Game = {};
  }

  // SNAKE CLASS
  var Snake = Game.Snake = function(board) {
    this.board = board;
    this.dir = "N";
    this.segments = [[9, 9]];
  };
    
  Snake.prototype.move = function() {
    var newPos = (new Coord(this.segments[0], this.dir)).plus();
    this.segments.unshift(newPos);
    this.segments = this.segments.slice(0, -1);

     // destroy snake if invalid
    if ( !this.isValid() ) this.segments = [];
  };

  Snake.prototype.isValid = function() {
    var head = this.segments[0];

    // invalid if snake is off the grid
    if ( !this.board.validPos() ) return false;

    // invalid if snake runs into itself
    _(this.segments).each(function(seg) {
      if (head === seg) return false;
    });

    return true;
  }

  Snake.prototype.turn = function(newDir) {
    this.dir = newDir;
  };


  // COORD CLASS
  var Coord = function(pos, dir) {
    this.pos = pos;
    this.dir = dir;
  };

  Coord.prototype.plus = Game.Coord = function () {
    var col = this.pos[0], row = this.pos[1];

    switch(this.dir){    
      case "S":
        return [1 + col, row];
      case "N":
        return [col - 1, row];
      case "E":
        return [col, row + 1];
      case "W":
        return [col, row - 1];
    }
  };


  // BOARD CLASS
  var Board = Game.Board = function() {
    this.snake = new Snake(this);
    // this.grid = this.setupGrid();
    this.dim = DIM;
  };

  DIM = 20;

  Board.prototype.validPos = function() {
    var head = this.snake.segments[0];
    var x = head[0], y = head[1];
    return (x >= 0 && x < DIM && y >= 0 && y < DIM);
  }

})();