$(document).ready(function(){

    if($(window).height() >= $(window).width()){
        MobileImages();
    }else{
        DesktopImages();
    }

    $(".menu").click(function(){
        if(!$("menu").hasClass("show-menu")){
            $("menu").addClass("show-menu");
        }
    });

    $(".menu-close").click(function(){
        $("menu").removeClass("show-menu");
    });


    $(window).scroll(function(){
        let scroll = $(window).scrollTop();

        $("#stars").css('top', -scroll*0.5 + 'px');
        $("#plane").css('left', -scroll*0.5 + 'px');
        $("#title").css('top', -scroll*0.15 + 'px');
        $("#city-two").css('top', scroll*0.2 + 'px');
        

        $("#Phone-Front").css('bottom', -scroll*0.25 + 'px');
        $("#Phone-Back").css('top', -scroll*0.15 + 'px');

        if(scroll > $(window).height()/2){
            $(".hero-content").addClass("reveal-animation");
        }

        if(scroll > ($(window).height()*2)/2){
            $(".read-anywhere-content").addClass("reveal-absolute");
        }

        if(scroll > ($(window).height()*2)){
            $(".badges-content").addClass("reveal-animation");
        }

        if(scroll > $(window).height()){
            $("nav").addClass("nav-active");
        }else{
            $("nav").removeClass("nav-active");
        }


    });


    $(window).on('resize', function(){
        var win = $(this);
        if (win.height() >= win.width()) { 
            MobileImages();
        }else{
            DesktopImages();
        }
    });


});

function MobileImages(){
    $("#bg").attr("src","/assets/images/cover/bg.svg");
    $("#stars").attr("src","/assets/images/cover/stars.png");
    $("#plane").attr("src","/assets/images/cover/plane.svg");
    $("#city-two").attr("src","/assets/images/cover/city-two.svg");
    $("#city-one").attr("src","/assets/images/cover/city-one.svg");
    $("#main").attr("src","/assets/images/cover/main.svg");
    $("#title").attr("src","/assets/images/cover/title.png");
}

function DesktopImages(){
    $("#bg").attr("src","/assets/images/cover/horizontal/bg.svg");
    $("#stars").attr("src","/assets/images/cover/horizontal/stars.png");
    $("#plane").attr("src","/assets/images/cover/horizontal/plane.svg");
    $("#city-two").attr("src","/assets/images/cover/horizontal/city-two.svg");
    $("#city-one").attr("src","/assets/images/cover/horizontal/city-one.svg");
    $("#main").attr("src","/assets/images/cover/horizontal/main.svg");
    $("#title").attr("src","/assets/images/cover/horizontal/title.png");
}