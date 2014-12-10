(function () {

	if (typeof Game === "undefined") { window.Game = {}; }

	var View = Game.View = function (el) {
		this.stepSize = 100;
	  this.$el = el;
	  this.board = new Game.Board();

	  this.interval = window.setInterval(
	  	this.step.bind(this), 
	  	this.stepSize
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

	View.prototype.render = function () {
		var view = this, board = view.board;
		var matrix = buildMatrix();

		_(board.snake.segments).each(function(seg) {
			matrix[ seg[0] ][ seg[1] ].addClass('snake');
		});

		matrix[board.apple.pos[0]][board.apple.pos[1]].addClass("apple");
		this.$el.empty();

		_(matrix).each(function(row) {
			var $row = $("<div class='row'></div>");

			_(row).each(function ($cell) {
				$row.append($cell);
			});
			view.$el.append($row)
		});

		function buildMatrix() {
			var matrix = [];

			_.times(board.dim, function() {
				var $row = [];
				_.times(board.dim, function() {
					$row.push($('<div class="square"></div>'));
				});

				matrix.push($row);
			});

	    return matrix;
	  }
  };

	View.prototype.step = function () {
		if (this.board.snake.segments.length > 0) {
			this.board.snake.move();
			this.render();
		} else {
			alert("You lose!");
			window.clearInterval(this.interval);
		}
	}

})();