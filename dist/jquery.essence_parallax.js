(function($) {
$.fn.essence_parallax = function(options){
  var defaults = {
    speed:8
  };
  var set = $.extend(defaults,options);
  var wrapper = this;
  var $window = $(window);

  var $self = $(wrapper);
  var offsetCoords = $self.offset();

  $(window).scroll(function() {
    if (($window.scrollTop() + $window.height()) > offsetCoords.top && ((offsetCoords.top + $self.height()) > $window.scrollTop())) {
      yPos = -($window.scrollTop() / set.speed);
      if ($self.attr('id') != 'first') {
        yPos += 126;
      }
      var coords = '50%' + yPos + 'px';
      $self.css('backgroundPosition', coords);
    }
  });

  return true;
};
})(jQuery);
