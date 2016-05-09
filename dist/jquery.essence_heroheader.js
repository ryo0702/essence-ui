(function($) {
$.fn.essence_heroheader = function(options){
  var defaults = {
    difference_height:0,
    heroheader_color:"#FFF"
  };
  var set = $.extend(defaults,options);
  var wrapper = this;
  var inner = $(wrapper).find('.inner');
  var next = $(wrapper).find('.next');
  var heroheader_height = $(window).height() - set.difference_height;
  var heroheader_width = $(window).width();
  var inner_height = $(inner).height();
  var inner_width = $(inner).width();

  // CSS Setting
  $(this).css('height',heroheader_height);
  var inner_height2 = heroheader_height - inner_height;
  inner_height2 = inner_height2 / 2;
  $(inner).css('top',inner_height2);
  var inner_width2 = heroheader_width - inner_width;
  inner_width2 = inner_width2 / 2;
  $(inner).css('left',inner_width2);
  $(inner).css('color',set.heroheader_color);

  $(next).click(function() {
    $('body,html').animate({scrollTop:heroheader_height},350,'swing');
  });

};
})(jQuery);
