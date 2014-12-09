(function () {

	if (typeof Game === "undefined") {
		window.Game = {};
	}

	var View = Game.View = function (el) {
	  this.$el = el;
	  this.board = new Game.Board();

	  this.interval = window.setInterval(
	  	this.step.bind(this), 
	  	100
  	);

	  $(window).on("keydown", this.handleKeyEvent.bind(this));
	}

	KEYS = {
		37: "W",
		38: "N",
		39: "E",
		40: "S"
	}
	
	View.prototype.handleKeyEvent = function (event) {
	  if (KEYS[event.keyCode]) {
	  	this.board.snake.turn(KEYS[event.keyCode]);
	  }
	}

		// this.$el.html(this.board.render());
	View.prototype.render = function () {
		var view = this;
		var board = view.board;
		var matrix = buildMatrix();

		_(board.snake.segments).each(function(seg) {
			matrix[ seg[0] ][ seg[1] ].addClass('snake');
		});

		this.$el.empty();

		_(matrix).each(function(row) {
			var $row = $("<div class='row'></div>");
			_(row).each(function ($cell) {
				$row.append($cell);
			});
			view.$el.append($row)
		});

		//closure
		function buildMatrix() {
			var matrix = [];

			for (var i = 0; i < board.dim; i++) {
	      var cellsRow = [];
	      for (var j = 0; j < board.dim; j++) {
	        cellsRow.push($('<div class="square"></div>'));
	      }
	      matrix.push(cellsRow);
	    }

	    return matrix;
	  }
  };

	View.prototype.step = function () {
		if (this.board.validPos) {
			this.board.snake.move();
			this.render();
		} else {
			alert("You crashed into the wall! You lose.");
		}
	}

})();

// var htmlStr = "";

// htmlStr += "<div class='snake' "

// _.times(DIM, function () {
// 	htmlStr += "<div class='row'>";

// 	_.times(DIM, function () {
// 		htmlStr += "<div class='square'></div>";
// 	});

// 	htmlStr += "</div>"
// });