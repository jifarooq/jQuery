(function () {

	if (typeof Game === "undefined") { window.Game = {}; }

	var View = Game.View = function (el) {
	  this.$el = el;
	  this.board = new Game.Board();
		this.stepSize = 100;

	  this.playGame();

	  $(window).on("keydown", this.handleKeyEvent.bind(this));
	  $(window).on("keydown", this.handlePausePlay.bind(this));
	  $('.pause').on("click", this.stopGame.bind(this));
	  $('.play').on("click", this.playGame.bind(this));
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

	View.prototype.handlePausePlay = function (event) {
		if (event.keyCode === 32) this.stopGame();  // spacebar
		if (event.keyCode === 13) this.playGame();	// enter
	}

	View.prototype.stopGame = function() {
		window.clearInterval(this.interval);
	};

	View.prototype.playGame = function() {
		this.interval = window.setInterval(
	  	this.step.bind(this), 
	  	this.stepSize
  	);
	};

	View.prototype.render = function() {
		var view = this, board = view.board;
		var matrix = buildMatrix();

		_(board.snake.segments).each(function(seg) {
			matrix[ seg[0] ][ seg[1] ].addClass('snake');
		});

		_(board.apples).each(function(apple) {
			matrix[apple.pos[0]][apple.pos[1]].addClass("apple");
		});

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

  View.prototype.renderStats = function() {
  	var score = this.board.snake.applesEaten * 10;
  	content = '<p>Your score: ' + score + '</p>';
  	$('.stats').html(content);
  }

	View.prototype.step = function() {
		if (this.board.snake.segments.length > 0) {
			this.board.snake.move();
			this.render();
			this.renderStats();
		} else {
			alert("You lose!");
			this.stopGame();
		}
	}

})();