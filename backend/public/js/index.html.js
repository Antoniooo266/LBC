jQuery(window).scroll(function(){
    var fromTopPx = 200; // distance to trigger
    var scrolledFromtop = jQuery(window).scrollTop();
    if(scrolledFromtop > fromTopPx){
        jQuery('html').addClass('scrolled');
    }else{
        jQuery('html').removeClass('scrolled');
    }
});