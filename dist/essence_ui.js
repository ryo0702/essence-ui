// --- Functions ---------------------------------
function isset(element){
  if($(element).length){
    return true;
  }
  else{
    return false;
  }
}

// --- Loading ---------------------------------
function loading_screen(){
  var window_width = $(window).width();
  var window_height = $(window).height();
  $(".loading").css('display','block');
  $('.loading').height(window_height);
  $('.loading').width(window_width);
  $('.loading').css('line-height',window_height);

  $(window).on('load',function(){
    $(".loading").css('display','none');
  });
}

// --- Modal ---------------------------------
$('[data-modal-click]').each(function() {
  var this_modal = this;
  $(this_modal).on('click',function(){
    $('.overlay').fadeIn(200);
    var modal = $(this_modal).data('modal-click');
    $('[data-modal='+modal+']').css('display','block');
    var window_width = $(window).width();
    var window_height = $(window).height();
    var modal_window_width = $('[data-modal='+modal+']').children('.modal__window').width();
    var modal_window_height = $('[data-modal='+modal+']').children('.modal__window').height();
    var window_width_mar = window_width - modal_window_width;
    var window_width_mar2 = window_width_mar / 2;
    if(modal_window_height > window_height){
      modal_window_height2 = window_height - window_width_mar;
      $('[data-modal='+modal+']').children('.modal__window').css({
        height:modal_window_height2,
        overflow:'scroll',
      });
      $('[data-modal='+modal+']').children('.modal__window').css('top',window_width_mar2);
    }
    else{
      var window_height_mar = window_height - modal_window_height;
      var window_height_mar2 = window_height_mar / 2;
      $('[data-modal='+modal+']').children('.modal__window').css('top',window_height_mar2);
    }
    $('[data-modal='+modal+']').children('.modal__window').css('left',window_width_mar2);
  });
});
$('.modal__close').on('click',function(){
  $('[data-modal]').each(function(){
    $('[data-modal]').fadeOut(200);
  });
  $('.overlay').fadeOut(200);
});

$('.overlay').on('click',function(){
  $('[data-modal]').each(function(){
    $('[data-modal]').fadeOut(200);
  });
  $('.overlay').fadeOut(200);
});


// --- Heroheader ---------------------------------
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
  $(wrapper).css('height',heroheader_height);

  var logo_image = $(wrapper).find('img.logo');
  if(isset(logo_image)){
    $(logo_image).on('load',function(){
      var inner_height = $(inner).height();
      var inner_width = $(inner).width();
    });
  }
  else{
    var inner_height = $(inner).height();
    var inner_width = $(inner).width();
  }

  if(inner_height == '' || inner_height == undefined || inner_height == null){
    var inner_height = $(inner).height();
    var inner_width = $(inner).width();
  }

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

  return true;

};
})(jQuery);



// --- Alignheight ---------------------------------
(function($) {
$.fn.essence_alignheight = function(options){
  var defaults = {
    wrap_num:3
  };
  var set = $.extend(defaults,options);
  var wrapper = this;
  var array_children = $(wrapper).children('[data-alignheights]');

  // if(544 < $(window).width()){
    if(set.wrap_num == "" || set.wrap_num == null || set.wrap_num == undefined || set.wrap_num == 0){
      $(array_children).each(function() {
        var this_height = 0;
        $(array_children).each(function() {
          if(this_height < $(this).height()){
            this_height = $(this).height();
          }
        });
      });
      $(array_children).each(function() {
        $(this).height(this_height);
      });
    }
    else{
      var this_height = 0;
      var this_prev;var this_prev2;
      var this_count = 0;
      $(array_children).each(function() {
        this_count++;
        if(this_height < $(this).height()){
          this_height = $(this).height();
        }
        if(this_count == set.wrap_num){
          $(this).height(this_height);
          this_prev = $(this).prev();$(this_prev).height(this_height);
          this_prev2 = $(this_prev).prev();$(this_prev2).height(this_height);

          this_count = 0;
          this_height=0;
        }
      });
    }
  // }

  return true;
};
})(jQuery);



// --- Drawermenu ---------------------------------
(function($) {
$.fn.essence_drawermenu = function(options){
  // Default
  var defaults = {
    header_menu_animation:false,
    header_padding_top:true,
  };
  var set = $.extend(defaults,options);
  var wrapper = this;
  var slider_menu = $(wrapper).children('.slidermenu');
  var close_button = $(wrapper).children('.slidermenu').find('.btn__menu--close');
  var header_menu = $(wrapper).children('.headermenu');
  var toggle_button = $(wrapper).children('.headermenu').find('.toggle');
  var hamburger = $(wrapper).children('.headermenu').find('.hamburger');
  var overlay = $('.overlay');

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
  var header_menu_height = $(header_menu).height();
  if(set.header_padding_top != false){$('body').css('padding-top',header_menu_height);}

  // Header Animation
  if(set.header_menu_animation != false){
    if(set.header_menu_animation == 'slidedown'){
      $(header_menu).css('top',- header_menu_height);
      $(header_menu).animate({
        top:0
      },500);
    }
  }

  // Action Open
  $(overlay).click(function() {
    var toggle = $(wrapper).data('toggle');
    if(toggle == 'open'){
      drawermenu_close();
    }
  });
  $(close_button).click(function() {
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

  return true;
};
})(jQuery);




// --- Animations ---------------------------------
function essence_animations (){

  function animations_speed(this_animations){
    var speed = $(this_animations).data('speed');
    if(speed === "" || speed === null || speed === undefined){
      var speed = 1000;
    }
    return speed;
  }

  function animations_type_fadein(this_animations){
    var speed = animations_speed(this_animations);
    $(this_animations).animate({
      opacity:1
    },speed);
  }

  function animations_type_fadein(this_animations){
    var speed = animations_speed(this_animations);
    $(this_animations).animate({
      opacity:1
    },speed);
  }

  $('[data-animations]').each(function() {
    var this_animations = this;
    var this_timing = $(this_animations).data('timing');
    var animations_type = $(this_animations).data('animations');
    var this_position_top = $(this_animations).offset().top;

    var this_position_top_plus = this_position_top - 150;

    if(animations_type == 'fadein'){
      $(this_animations).css('opacity',0);
    }

    // Timing
    if(this_timing == 'scroll'){
      $(window).scroll(function (){
        var scroll_top = $(window).scrollTop();
        if (scroll_top > this_position_top_plus){
          if(animations_type == 'fadein'){animations_type_fadein(this_animations);}
          else if(animations_type == 'sliding'){}
        }
      });
    }
    else{
      if(animations_type == 'fadein'){animations_type_fadein(this_animations);}
      else if(animations_type == 'sliding'){
      }
    }
  });

  return true;

}
essence_animations();



// --- Parallax ---------------------------------
(function($) {
$.fn.essence_parallax = function(options){
  var defaults = {
    speed:8
  };
  var set = $.extend(defaults,options);
  var wrapper = this;
  var $window = $(window);

  var wrapper_this = $(wrapper);
  var wrapper_offset = wrapper_this.offset();

  $(window).scroll(function() {
    if (($window.scrollTop() + $window.height()) > wrapper_offset.top && ((wrapper_offset.top + wrapper_this.height()) > $window.scrollTop())) {
      positionY = -($window.scrollTop() / set.speed);
      if (wrapper_this.attr('id') != 'first') {
        positionY += 126;
      }
      var coords = '50%' + positionY + 'px';
      wrapper_this.css('backgroundPosition', coords);
    }
  });

  return true;
};
})(jQuery);


// --- Tabbar ---------------------------------
(function($) {
$.fn.essence_tabbar = function(options){
  var window_width = $(window).width();
  var wrapper = this;

  if(window_width > 544){
    $(wrapper).css('display','none');
  }

  // Tab Setting
  $('[data-tabarea]').each(function() {
    $(this).css('display','none');
  });
  $('[data-tabarea-default]').each(function() {
    $(this).css('display','block');
  });

  // Click
  $(wrapper).find('.tab').click(function(event) {
    var this_click = this;
    $('[data-tabarea]').each(function() {$(this).css('display','none');});
    var click_type = $(this_click).data('tab-click');
    if(click_type == 'tab'){
      var select_tab = $(this_click).data('tab-select');
      $('[data-tabarea]').each(function() {
        var this_tab_select = '';
        this_tab_select = $(this).data('tabarea');
        if(this_tab_select == select_tab){
          $(this).css('display','block');
        }
      });
    }
    else if(click_type == 'link'){
      location.href = $(this_click).data('tab-select');
    }
  });

};
})(jQuery);


// --- Validation ---------------------------------
(function($) {
$.fn.essence_validation = function(options){
  var defaults = {
    error_message:'Error',
    success_message:'Success'
  };
  var set = $.extend(defaults,options);
  var wrapper = this;

  function validation_required(wrapper){
    var error = '';
    var this_input_val = '';
    $(wrapper).find('[data-required]').each(function() {
      this_input = '';this_input_val = '';
      if($(this).find('input').length){
        this_input = $(this).find('input');
      }
      else if($(this).find('select').length){
        this_input = $(this).find('select');
      }
      this_input_val = $(this_input).val();
      if(this_input_val == '' || this_input_val == null || this_input_val == undefined){
        $(this_input).css('border-color','#FF0000');
        error = 'false';
      }
      else{
        $(this_input).css('border-color','#dadada');
      }
    });
    if(error == 'false'){return false;}
    else{return true;}
  }

  // Add Requiered Label
  $(wrapper).find('[data-required]').each(function() {
    var this_input = '';var this_val = '';
    this_input = $(this).find('input');
    $(this_input).attr('required','required');
    $(this).children('legend').append("<span class=\"label label__required\">Required</span>");
  });

  // Submit
  $('.btn__submit').click(function() {
    var vali_req = validation_required(wrapper);
    if(vali_req == true){
      $(wrapper).find('forms').off('submit');
      $(wrapper).find('forms').submit();
      var validation_field = $(wrapper).find('.validation');
      $(validation_field).html('<div class="alert alert__success">'+set.success_message+'</div>');
      $(validation_field).fadeIn();
    }
    else{
      var validation_field = $(wrapper).find('.validation');
      $(validation_field).html('<div class="alert alert__error">'+set.error_message+'</div>');
      $(validation_field).fadeIn();
    }
  });

  return true;

};
})(jQuery);
