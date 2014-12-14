(function () {
	if (typeof Game === "undefined") { window.Game = {}; }

	var View = Game.View = function (el) {
	  this.$el = el;
	  this.board = new Game.Board();
		this.score = 0;
		this.stepSize = this.setSpeed();

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
		if (event.keyCode === 13 && this.snakeLength() > 0) 	// enter
			this.playGame();	
	}

	View.prototype.setSpeed = function() {
		// normalized for 20x20 board
		var baseSpeed = 100 / (this.board.dim / 20);
		var selectedSpeed = $("input[name='speed']:checked").val();

		if (selectedSpeed === 'slow') baseSpeed * 1.25;   // 25% slower
		if (selectedSpeed === 'fast') baseSpeed * .75;   // 25% faster
		return baseSpeed;
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
  	this.score = this.board.snake.applesEaten * 10;
  	content = '<p>Your score: ' + this.score + '</p>';
  	$('#curScore').html(content);
  }

	View.prototype.step = function() {
		if (this.snakeLength() > 0) {
			this.board.snake.move();
			this.render();
			this.renderStats();
		} else {
			// fancy alert
			// debugger
			sweetAlert("You lose!");
			this.stopGame();
			var gameCount = $('tr').length;
			content = "<tr><td>" + gameCount + "</td><td>" + this.score + "</td></tr>"
			$('.results').append(content);
		}
	}

	View.prototype.snakeLength = function() {
		return this.board.snake.segments.length;
	}

})();