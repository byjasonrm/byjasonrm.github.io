const queryString=window.location.search,urlParams=new URLSearchParams(queryString),ac=urlParams.get("ac");console.clear();const featuresEl=document.querySelector("body"),featureEls=document.querySelectorAll("section");featuresEl.addEventListener("pointermove",e=>{featureEls.forEach(a=>{let t=a.getBoundingClientRect();a.style.setProperty("--x",e.clientX-t.left),a.style.setProperty("--y",e.clientY-t.top)})});let prob=Math.floor(3*Math.random())+0;function MobileImages(){$("#bg").attr("src","/assets/images/cover/bg.svg"),$("#couple").attr("src","/assets/images/cover/couple.svg"),$("#waveone").attr("src","/assets/images/cover/waveone.svg"),$("#wavetwo").attr("src","/assets/images/cover/wavetwo.svg"),$("#wavethree").attr("src","/assets/images/cover/wavethree.svg")}function DesktopImages(){$("#bg").attr("src","/assets/images/cover/horizontal/bg.svg"),$("#couple").attr("src","/assets/images/cover/horizontal/couple.svg"),$("#waveone").attr("src","/assets/images/cover/horizontal/waveone.svg"),$("#wavetwo").attr("src","/assets/images/cover/horizontal/wavetwo.svg"),$("#wavethree").attr("src","/assets/images/cover/horizontal/wavethree.svg")}0==prob?$(".main-book .primary-action-button").addClass("baa"):$(".main-book .primary-action-button").addClass("bab"),$(document).ready(function(){"readfree"==ac&&($("html, body").animate({scrollTop:$("#SilverRoyal").offset().top},1e3),$(".benefitreadfree").addClass("benefitreadfreeactive"),$(".benefitreadfreebutton").addClass("benefitreadfreebuttonactive")),$("");let e=$("<span>Buy <span class='new-price'>9.99$</span></span>");$(window).height()>=$(window).width()?MobileImages():DesktopImages(),$(".menu").click(function(){$("menu").hasClass("show-menu")||$("menu").addClass("show-menu")}),$(".menu-close").click(function(){$("menu").removeClass("show-menu")}),$(".button-buy").text(""),$(".button-buy").append(e),$("a").click(function(){$(".loading-badge").removeClass("hide-loading-badge"),setTimeout(function(){$(".loading-badge").addClass("hide-loading-badge")},1e3)}),$(window).scroll(function(){let e=$(window).scrollTop();$("#Phone-Front").css("bottom",-(.25*e)+"px"),$("#Phone-Back").css("top",-(.15*e)+"px"),e>$(window).height()/2&&$(".hero-content").addClass("reveal-animation"),e>2*$(window).height()/2&&$(".read-anywhere-content").addClass("reveal-absolute"),e>2*$(window).height()&&$(".badges-content").addClass("reveal-animation"),e>$(window).height()?$("nav").addClass("nav-active"):$("nav").removeClass("nav-active")}),$(window).on("resize",function(){var e=$(this);e.height()>=e.width()?MobileImages():DesktopImages()}),$("nav .nav-logo").click(function(){window.location.href="index.html"})});