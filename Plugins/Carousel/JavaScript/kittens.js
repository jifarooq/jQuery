$.Carousel = function (el) {
  this.$el = $(el);
  this.activeIdx = 0;
  this.$activeImage = $(this.$el.find('img')[this.activeIdx]);
  // debugger

  // listen to clicks on '.slide-left', call #slideLeft
  this.$el.on("click", "img", this.slideLeft.bind(this));
  
  // listen to clicks on '.slide-right', call #slideRight
  this.$el.on("click", "img", this.slideRight.bind(this));
};

$.Carousel.prototype.slide = function(dir) {
  // find next image based on dir
  // add / remove classes to initiate transitions
  event.preventDefault();
  $curTarget = $(event.currentTarget);
  debugger
  
  if (dir === 1){
    if (this.activeIdx == 4) {
      this.activeIdx = 0;
    } else {
      this.activeIdx++;
    }
  } else {
    if (this.activeIdx == 0) {
      this.activeIdx = 4;
    } else {
      this.activeIdx--;
    }
  }
  $nextImage = $(this.$el.find('img')[this.activeIdx]);
  this.$activeImage.removeClass("active")
};

$.Carousel.prototype.slideLeft = function() {
  this.slide(1);
}

$.Carousel.prototype.slideRight = function() {
  this.slide(-1);
}

$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
};