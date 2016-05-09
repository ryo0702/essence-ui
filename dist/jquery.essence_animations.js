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

  $('[data-animations]').each(function() {
    var this_animations = this;
    var this_timing = $(this_animations).data('timing');
    var animations_type = $(this_animations).data('animations');
    var this_position_top = $(this_animations).offset().top;

    if(animations_type == 'fadein'){
      $(this_animations).css('opacity',0);
    }

    // Timing
    if(this_timing == 'scroll'){

      $(window).scroll(function (){
        var scroll_top = $(window).scrollTop();
        if (scroll_top > this_position_top){
          if(animations_type == 'fadein'){animations_type_fadein(this_animations);}
        }
      });

    }
    else{
      if(animations_type == 'fadein'){animations_type_fadein(this_animations);}
    }
  });

}
