(function () {

  if (typeof Game === "undefined") {
    window.Game = {};
  }

  // SNAKE CLASS
  var Snake = Game.Snake = function(board) {
    this.applesEaten = 0;
    this.board = board;
    this.dir = "N";
    this.segments = [[ board.dim - 1, board.dim - 1 ]];
  };

  Snake.prototype.eat = function (apple) {
    var head = this.segments[0];
    return _matchedPositions(head, apple.pos);
  };
    
  Snake.prototype.move = function() {
    this.addSegment();
    this.segments = this.segments.slice(0, -1);

    _(this.board.apples).each(function(apple) {
      if (this.eat(apple)) {
        apple.replace();
        this.addSegment();
        this.applesEaten++;
      }
    }.bind(this));
      
    if ( !this.isValid() ) {
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

    for (var i = 1; i < this.segments.length; i++) {
      if (_matchedPositions(head, this.segments[i])) return false;
    }

    return true;
  }

  Snake.prototype.turn = function(newDir) {
    if (this.segments.length > 1 && _oppDirections([newDir, this.dir])) 
      return;
    else
      this.dir = newDir;
  };

  function _matchedPositions(pos1, pos2) {
    return pos1[0] === pos2[0] && pos1[1] === pos2[1];
  }

  function _oppDirections(dirPair) {
    var oppCases = [['N', 'S'], ['E', 'W'], ['W', 'E'], ['S', 'N']];

    for (var i = 0; i < oppCases.length; i++) {
      if ( _matchedPositions(dirPair, oppCases[i]) ) return true;
    }

    return false;
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
    this.apples = [];
    this.dim = this.setDimensions();
    this.snake = new Snake(this);

    _.times(this.numApples(), function() {
      this.apples.push(new Apple(this));
    }.bind(this));
  };

  Board.prototype.numApples = function() {
    var input = parseInt( $('#num-apples').val() );
    if (input < 1 || input > (this.dim * this.dim) ) return 5;
    return input;
  }

  Board.prototype.setDimensions = function() {
    var dim = parseInt( $('#grid-size').val() );
    if (dim < 1 || dim > 40) return 20;
    return dim;
  }

  Board.prototype.validPos = function() {
    var head = this.snake.segments[0];
    var x = head[0], y = head[1];
    return (x >= 0 && x < this.dim && y >= 0 && y < this.dim);
  };
})();