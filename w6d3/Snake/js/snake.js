(function () {

  if (typeof Game === "undefined") {
    window.Game = {};
  }

  // SNAKE CLASS
  var Snake = Game.Snake = function() {
      this.dir = "N";
      this.segments = [[4, 4]];
    };
    
  Snake.prototype.move = function() {
    var newPos = (new Coord(this.segments[0], this.dir)).plus();
    this.segments.unshift(newPos);
    this.segments = this.segments.slice(0, -1);
  };

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
    this.snake = new Snake();
    this.grid = this.setupGrid();
  };

  DIM = 20;

  Board.prototype.setupGrid = function() {
    var grid = [];

    _.times(DIM, function(){
      var row = [];
      _.times(DIM, function(){
        row.push(".");
      });
      grid.push(row);
    });
    return grid
  };

  Board.prototype.render = function() {
    var grid = this.setupGrid();
    
    this.snake.segments.forEach(function(segment) {
      var row = segment[0], col = segment[1];
      grid[row][col] = 'S';
    });

    return grid;
  }

  Board.prototype.validPos = function() {
    var pos = this.snake.segments[0];
    var x = pos[0], y = pos[1];
    return (x >= 0 && x < DIM && y >= 0 && y < DIM);
  }

})();