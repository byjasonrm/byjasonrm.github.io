$(document).ready(function(){

    let p = $("<span>Buy <span class='new-price'>9.99$</span></span>");

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

    $(".button-buy").text('')
    $(".button-buy").append(p)

    $(window).scroll(function(){
        let scroll = $(window).scrollTop();

        // $("#couple").css('top', -scroll*0.5 + 'px');
        // $("#waveone").css('left', -scroll*0.5 + 'px');
        // $("#wavetwo").css('top', -scroll*0.15 + 'px');
        // $("#wavethree").css('top', scroll*0.2 + 'px');
        

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
    $("#couple").attr("src","/assets/images/cover/couple.svg");
    $("#waveone").attr("src","/assets/images/cover/waveone.svg");
    $("#wavetwo").attr("src","/assets/images/cover/wavetwo.svg");
    $("#wavethree").attr("src","/assets/images/cover/wavethree.svg");
}

function DesktopImages(){
    $("#bg").attr("src","/assets/images/cover/horizontal/bg.svg");
    $("#couple").attr("src","/assets/images/cover/horizontal/couple.svg");
    $("#waveone").attr("src","/assets/images/cover/horizontal/waveone.svg");
    $("#wavetwo").attr("src","/assets/images/cover/horizontal/wavetwo.svg");
    $("#wavethree").attr("src","/assets/images/cover/horizontal/wavethree.svg");
}