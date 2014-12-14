$.Tabs = function (el) {
  this.$el = $(el);
  var tabsLocation = this.$el.data("content-tabs");
  this.$contentTabs = $(tabsLocation);
  this.$activeTab = this.$contentTabs.children('.active');
  this.$el.on("click", "a", this.clickTab.bind(this));
};

$.Tabs.prototype.clickTab = function(event) {
  
  event.preventDefault();
  var $curTarget = $(event.currentTarget);
  
  var id = $curTarget.attr("href"); // cool!
  // debugger
  
  if (id.substring(1) !== this.$activeTab.attr("id")) {
    this.$el.find("a").removeClass("active");
    this.$activeTab.addClass("transitioning");
    
    this.$activeTab.one("transitionend", function (event) {
      this.$activeTab.removeClass("transitioning active"); 
      this.$activeTab = $nextTab;
      this.$activeTab.removeClass('transitioning');
    }.bind(this));
    
    $curTarget.addClass("active"); // cool!
    var $nextTab = $(this.$contentTabs.find(id));
    $nextTab.addClass('active transitioning');
  }
};

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};