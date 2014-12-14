$.UsersSearch = function (el) {
  this.$el = $(el);
  this.$input = this.$el.find('.users-search');
  this.$ul = this.$el.find('.users');
  
  // this.userId = this.$el.attr('data-user-id');
  // this.followState = this.$el.attr('data-follow-state');
  
  // debugger
  this.$el.on("keypress", "input", this.handleInput.bind(this));
};

$.UsersSearch.prototype.handleInput = function () {
  
  var formData = $(event.target).serialize();
  
  var that = this;
  
  $.ajax({
    url: "http://localhost:3000/users/search",
    type: "GET",
    data: formData,
    dataType: 'json',
    success: function (resp) {
     
      that.renderResults(resp);
    }
  })
}

$.UsersSearch.prototype.renderResults = function (users) {
  this.$ul.html('');      //just needed empty string for it to work
  
  for (var i = 0; i < users.length; i++) {
    var defaultPath = "http://localhost:3000/users/";
    var username = users[i].username;
    var userId = users[i].id;
    
    followState = (users[i].followed === false) ? "followed" : "unfollowed";
    
    var $link = $("<a href=" + defaultPath + userId + ">" + username + "</a>");
    var options = { userId: userId, followState: followState }
    var $button = $("<button/>").followToggle(options);
    var $listItem = $("<li></li>");
    
    $listItem.append($link).append($button);
    // "<button value='followed'></button> "
    this.$ul.append($listItem);
    // debugger 
  }
}