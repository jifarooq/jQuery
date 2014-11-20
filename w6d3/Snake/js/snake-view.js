(function () {

	if (typeof Game === "undefined") {
		window.Game = {};
	}

	var View = Game.View = function (el) {
	  this.$el = el;
	  this.board = new Game.Board ();

	  this.interval = setInterval(
	  	this.step.bind(this), 500);

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
		var htmlStr = "";

		htmlStr += "<div class='snake' "

		_.times(DIM, function () {
			htmlStr += "<div class='row'>";

			_.times(DIM, function () {
				htmlStr += "<div class='square'></div>";
			});

			htmlStr += "</div>"
		});

		this.board.snake.segments.forEach(function (seg) {
			
		});

		this.$el.html(htmlStr);
	}

	View.prototype.step = function () {
		if (this.board.validPos) {
			this.board.snake.move();
			this.render();
		} else {
			alert("You crashed into the wall! You lose.");
		}
	}

})();