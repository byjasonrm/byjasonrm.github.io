$(document).ready(function(){
    $(".menu").click(function(){
        if(!$("menu").hasClass("show-menu")){
            $("menu").addClass("show-menu");
        }
    });

    $(".menu-close").click(function(){
        $("menu").removeClass("show-menu");
    });
});