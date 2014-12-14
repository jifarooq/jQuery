$.FollowToggle = function (el, options) {
  
  this.$el = $(el);
  this.userId = this.$el.attr('data-user-id') || options.userId;
  this.followState = this.$el.attr('data-follow-state')|| options.followState;
  this.render();
  this.$el.on("click", this.handleClick.bind(this));
};

$.FollowToggle.prototype.render = function () {
  var len = this.followState.length;
  this.$el.html(this.followState.substring(0, len - 2));
};

$.FollowToggle.prototype.handleClick = function () {
  event.preventDefault();
  var formData = $(event.currentTarget).serialize(); // might need?
  var reqType;
  
  if (this.followState === "followed") {
    reqType = 'DELETE';
  } else {
    reqType = 'POST';
  }
  
  var that = this;
  
  $.ajax({
    // try url helper
    url: ("http://localhost:3000/users/" + this.userId +"/follow"),
    type: reqType,
    data: formData, // might need later?
    dataType: 'json',
    success: function (resp) {
      // toggle follow state and rerender
      if (that.followState === 'followed') {
        that.followState = 'unfollowed';
      } else {
        that.followState = 'followed';
      }
      
      that.render();
    }
  })
};


