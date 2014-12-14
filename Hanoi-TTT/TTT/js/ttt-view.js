// var _ = require('underscore');

(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
  };
  
  View.prototype.bindEvents = function () {
    // var $squares = this.$el.find(".square");
    this.$el.on("click", ".square", this.makeMove.bind(this));
  };

  View.prototype.makeMove = function (event) {
    var $square = $(event.target);
    // var game = that.game;
    // $square.css("background", "blue");

    var posStr = (event.target.dataset.pos).split(",")
    x = parseInt(posStr[0]);
    y = parseInt(posStr[1]);
    var pos = [x, y];
      
    // console.log([x, y])
    
    if (this.game.board.isEmptyPos(pos)) {
 
      if (this.game.currentPlayer === "x") {
        $square.css("background", "blue")
      } else if (this.game.currentPlayer === "o") {
        $square.css("background", "red")
      }
      
      // debugger
      this.game.playMove(pos);
      
      if (this.game.winner()){
        alert(this.game.winner() + " wins!");
      }
    }
    

  };

  View.prototype.setupBoard = function () {
    var squareString = "";
    
    var i = 0;
    _.times(3, function() {
      var j = 0;
      squareString += "<div class='row'>";
      _.times(3, function() {
        squareString += "<div class='square' data-pos='" + i + ',' + j + "'></div>";
        j += 1;
      });
      squareString += "</div>";
      i += 1;
    });
    
    this.$el.html(squareString);
  };
})();
