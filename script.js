$(document).ready(function(){
    $(".menu").click(function(){
        if(!$("menu").hasClass("show-menu")){
            $("menu").addClass("show-menu");
        }
    });

    $(".menu-close").click(function(){
        $("menu").removeClass("show-menu");
    });


    $(window).scroll(function(){
        let value = $(window).scrollTop();

        $("#stars").css('top', -value*0.5 + 'px');
        $("#plane").css('left', -value*0.5 + 'px');
        $("#title").css('top', -value*0.15 + 'px');
        $("#city-two").css('top', value*0.15 + 'px');
        $("#city-one").css('top', -value*0.05 + 'px');
    });
});