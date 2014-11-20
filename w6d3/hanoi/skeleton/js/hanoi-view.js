(function() {
  
  if (typeof Hanoi === "undefined") {
    window.Hanoi = {};
  }
  
  var View = Hanoi.View = function(game, $el) {
    this.game = game;
    this.$el = $el;
    this.render(this);
    this.startTower = null;
  };
  
  View.prototype.render = function(view) {
    var renderString = "";
    var i = 0 
    
    _.times(3, function() {
      var j = 2
      renderString += "<div class='tower' data-tower=" + i + ">";
      
      _.times(3, function() {
        var disk = view.game.towers[i][j];
        
        renderString += "<div class='disk' data-tower=" + i + " data-disk=" + disk + "></div>";
        j--;
      });
      i++
      renderString += "</div>"
    });
    
    this.$el.html(renderString);
    // renderString.append
  }
  
  View.prototype.clickTower = function () {
    this.$el.on("click", ".tower", this.moveDisk.bind(this));
  }
  
  View.prototype.moveDisk = function (event) {
    var towerIdx = parseInt(event.target.dataset.tower);
    
    // debugger
    
    if (this.startTower === null) {
      this.startTower = towerIdx;
      
      $($('.tower')[towerIdx]).toggleClass("activeTower");
      this.preventDefault();
    } else {
      this.game.move(this.startTower, towerIdx);
      this.startTower = null;
    }
    
    this.render(this);
    
    if(this.game.isWon()) {
      alert("You win!")
    }
  }
  
  
})();