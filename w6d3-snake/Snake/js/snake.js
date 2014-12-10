(function () {

  if (typeof Game === "undefined") {
    window.Game = {};
  }

  // SNAKE CLASS
  var Snake = Game.Snake = function(board) {
    this.board = board;
    this.dir = "N";
    this.segments = [[9, 9]];
    this.addSegment(); this.addSegment();
    this.addSegment(); this.addSegment();
  };

  Snake.prototype.eat = function () {
    var head = this.segments[0];
    return _matchedPositions(head, this.board.apple.pos);

  };
    
  Snake.prototype.move = function() {
    this.addSegment();
    this.segments = this.segments.slice(0, -1);

    if ( this.eat() ) {
      this.board.apple.replace();
      this.addSegment();
      this.addSegment();
    }

    if ( !this.isValid() ) {
      // debugger
      this.segments = [];   // destroy snake if invalid
    }
  };

  Snake.prototype.addSegment = function() { 
    var newPos = (new Coord(this.segments[0], this.dir)).plus();
    this.segments.unshift(newPos);
  }

  Snake.prototype.isValid = function() {
    var head = this.segments[0];

    if ( !this.board.validPos() ) return false;

    // error here was using underscore each
    // with for loop, also need to use user-defined equals method!

    for (var i = 1; i < this.segments.length; i++) {
      if (_matchedPositions(head, this.segments[i])) return false;
    }

    return true;
  }

  Snake.prototype.turn = function(newDir) {
    this.dir = newDir;
  };

  function _matchedPositions(pos1, pos2) {
    return pos1[0] === pos2[0] && pos1[1] === pos2[1];
  }


  // COORD CLASS
  var Coord = Game.Coord = function(pos, dir) {
    this.pos = pos;
    this.dir = dir;
  };

  Coord.prototype.plus = function () {
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


  // APPLE CLASS
  var Apple = Game.Apple = function(board) {
    this.board = board;
    this.replace();
  }

  Apple.prototype.replace = function() {
    var apple = this;
    var snake = this.board.snake, new_pos = randPos();
    
    while ( snake.segments.indexOf(new_pos) >= 0 ) {
      new_pos = randPos();
    }

    this.pos = new_pos;

    function randPos() {
      var x = Math.floor(Math.random() * apple.board.dim);
      var y = Math.floor(Math.random() * apple.board.dim);
      return [x, y];
    }
  }


  // BOARD CLASS
  var Board = Game.Board = function() {
    this.dim = DIM;
    this.snake = new Snake(this);
    this.apple = new Apple(this);
  };

  DIM = 20;

  Board.prototype.validPos = function() {
    var head = this.snake.segments[0];
    var x = head[0], y = head[1];
    return (x >= 0 && x < DIM && y >= 0 && y < DIM);
  };
})();