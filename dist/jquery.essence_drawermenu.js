(function($) {
$.fn.essence_drawermenu = function(options){
  // Default
  var defaults = {
    header_menu_color:"#FFF",
    header_menu_bgcolor:"#000",
    slider_menu_color:"#FFF",
    slider_menu_bgcolor:"#000"
  };
  var setting = $.extend(defaults,options);
  var wrapper = this;
  var slider_menu = $(wrapper).children('.slider_menu');
  var header_menu = $(wrapper).children('.header_menu');
  var toggle_button = $(wrapper).children('.header_menu').children('.toggle_button');
  var hamburger = $(wrapper).children('.header_menu').children('.toggle_button').children('.hamburger');
  var overlay = $(wrapper).children('.overlay');

  // Function
  function drawermenu_close(){
    var slide_menu_width = $(slider_menu).width();
    slide_menu_width = slide_menu_width + 30;
    $(slider_menu).animate({
      left:-slide_menu_width
    },350);
    $(overlay).fadeOut(200);
    $(hamburger).animate({borderSpacing: 0 }, {
        step: function(now,fx) {
          $(this).css('-webkit-transform','rotate('+now+'deg)');
          $(this).css('-moz-transform','rotate('+now+'deg)');
          $(this).css('transform','rotate('+now+'deg)');
        },
        duration:200
    },'linear');
    $(wrapper).data("toggle","close");
  }

  function drawermenu_open(){
    var toggle = $(wrapper).data('toggle');
    if(toggle == 'close'){
      $(slider_menu).css('display','block');
      var slide_menu_width = $(slider_menu).width();
      slide_menu_width = slide_menu_width + 30;
      $(slider_menu).css('left',-slide_menu_width);
    }
    $(slider_menu).animate({
      left:0
    },350);
    $(overlay).fadeIn(200);
    $(hamburger).animate({borderSpacing: 90 }, {
        step: function(now,fx) {
          $(this).css('-webkit-transform','rotate('+now+'deg)');
          $(this).css('-moz-transform','rotate('+now+'deg)');
          $(this).css('transform','rotate('+now+'deg)');
        },
        duration:200
    },'linear');
    $(wrapper).data("toggle","open");
  }

  // CSS Setting
  var body_height = $("html").height();
  var windo_height = $(window).height();
  if(windo_height > body_height){var slider_height = windo_height;}
  else{var slider_height = body_height;}
  $(slider_menu).height(slider_height);
  $(overlay).height(slider_height);
  if(setting.header_menu_color != ''){$(header_menu).css('color',setting.header_menu_color);}
  if(setting.header_menu_bgcolor != ''){$(header_menu).css('background-color',setting.header_menu_bgcolor);}
  if(setting.slider_menu_color != ''){$(slider_menu).css('color',setting.slider_menu_color);}
  if(setting.slider_menu_bgcolor != ''){$(slider_menu).css('background-color',setting.slider_menu_bgcolor);}

  // Action Open
  $(overlay).click(function() {
    var toggle = $(wrapper).data('toggle');
    if(toggle == 'open'){
      drawermenu_close();
    }
  });
  $(toggle_button).click(function() {
    var toggle = $(wrapper).data('toggle');
    if(toggle == 'close'){
      drawermenu_open();
    }
  });
};
})(jQuery);
