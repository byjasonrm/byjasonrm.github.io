import * as Books from './js/books.js'
import * as General from './js/general.js'
import * as Storage from './local.js'

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const ac = urlParams.get('ac')
let LSP;


const featuresEl = document.querySelector("body");
const featureEls = document.querySelectorAll("section");

featuresEl.addEventListener("pointermove", (ev) => {
  featureEls.forEach((featureEl) => {
    const rect = featureEl.getBoundingClientRect();

    featureEl.style.setProperty("--x", ev.clientX - rect.left);
    featureEl.style.setProperty("--y", ev.clientY - rect.top);
  });
});


mainbook()
General.creds()
continueReading()

$(document).ready(function(){


    if(ac == "readfree"){
        $('html, body').animate({
            scrollTop: $("#SilverRoyal").offset().top
        }, 1000);
        $(".benefitreadfree").addClass("benefitreadfreeactive")
        $(".benefitreadfreebutton").addClass("benefitreadfreebuttonactive")
    }

    $("body").on('click', ".menu", function(){
        if(!$("menu").hasClass("show-menu")){
            $("menu").addClass("show-menu");
        }
    });

    $("menu").on('click', ".menu-close", function(){
        $("menu").removeClass("show-menu");
    });


    $("a").click(function(){
        $(".loading-badge").removeClass('hide-loading-badge')
        setTimeout(function(){
            $(".loading-badge").addClass('hide-loading-badge') 
        }, 1000)
    })

    $("nav .nav-logo").click(function(){
        window.location.href = 'index.html'
    })




    
    var $slides = $(".slide"); 
    var currentSlide = 0; 
    var $prevButton = $("#prev");
    var $nextButton = $("#next");
    var isDragging = false;
    var startSwipe;

    if ($slides.length <= 1) {
        $prevButton.prop('disabled', true);
        $nextButton.prop('disabled', true);
        return; 
    }

    $prevButton.prop('disabled', true); 

    function updateSlide() {
        $(".slides").css('transform', 'translateX(-' + (currentSlide * 100) + '%)');
    }

    $(".slides").on("touchstart", function(event) {
        isDragging = true;
        startSwipe = event.originalEvent.touches[0].pageX;
    });

    $(".slides").on("touchmove", function(event) {
        if (isDragging) {
            var currentSwipe = event.originalEvent.touches[0].pageX;
            if (startSwipe - currentSwipe > 100) { 
                isDragging = false;
                $nextButton.click();
            } else if (currentSwipe - startSwipe > 100) { 
                isDragging = false;
                $prevButton.click();
            }
        }
    });

    $(".slides").on("touchend", function() {
        isDragging = false;
    });

    $prevButton.click(function() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlide();

            if ($nextButton.prop('disabled')) {
                $nextButton.prop('disabled', false);
            }

            if (currentSlide === 0) {
                $prevButton.prop('disabled', true);
            }
        }
    });

    $nextButton.click(function() {
        if (currentSlide < $slides.length - 1) {
            currentSlide++;
            updateSlide();

            if ($prevButton.prop('disabled')) {
                $prevButton.prop('disabled', false);
            }

            if (currentSlide === $slides.length - 1) {
                $nextButton.prop('disabled', true);
            }
        }
    });




});



function mainbook(){
    let list = Books.list
    let m = list.find(x => x.mainbook == true)
    if(!m){
        m = list[list.length - 1]
    }
    if(m){
        $(".main-book .section-title img").attr('src', m.title_logo)
        $(".main-book-price").text(m.price)
        $(".main-book .section-image img").attr("src", m.cover_main)
        $(".main-book .section-description").text(m.highlight_description)
        $(".main-book .section-action .primary-action-button").attr("href", "/read.html?id="+m.id)
        $(".main-book .section-action .secondary-action-button").attr("href", "/book.html?id="+m.id)
        for(let i=0; i < 3; i++){
            let $r = $("<div class='review'>" + m.reviews[i] + "</div>")
            $(".reviews").append($r)
        }

    } 
}


function continueReading(){
    LSP = JSON.parse(localStorage.getItem("JRMUSER"));
    if(LSP == "" || LSP == undefined || LSP == null){
      
    }else{
      continueReadingBuild()
    }


}

function continueReadingBuild(){
    if(LSP.currentBook != ""){
        if(LSP.bookAndPage.length > 0){
            let temp;

            if(LSP.bookAndPage.length > 1){

                temp = prioritizeObjectById(LSP.bookAndPage, LSP.currentBook)
            }else{
                temp = LSP.bookAndPage
            }


            for(let i=0; i<temp.length; i++){
                let foundBookAndPage = LSP.bookAndPage.find(x => x.bid == temp[i].bid)
                let foundBookDetails = Books.list.find(x => x.id == temp[i].bid)
        
                if(foundBookAndPage 
                    && foundBookDetails 
                    && foundBookAndPage.tp > foundBookAndPage.pnb){
                    
                    let progress;

        
                    foundBookAndPage.pnb == 0 ? progress = 1 : progress = Math.round((foundBookAndPage.pnb*100)/foundBookAndPage.tp)
                    $(".continue-reading").removeClass('display-none')

                    let $slide = $(`<div class="slide">
                    <div class="continue-reading-book-image">
                        <img src="${foundBookDetails.cover_book}" alt="">
                    </div>
                    <div class="continue-reading-content">
                        <div class="continue-reading-small-title">Continue Reading</div>
                        <div class="continue-reading-title">${foundBookDetails.title}</div>
                        <div class="continue-reading-progress-bar-container">
                            <div class="continue-reading-progress-bar" style="width:${progress}%">
                            </div>
                        </div>
                        <div class="continue-reading-percentage-completed">
                            <span class="continue-reading-percentage-completed-text">${progress}</span>% Complete
                        </div>
                        <a href="/read.html?id=${temp[i].bid}&page=${foundBookAndPage.pnb}" class="action-button primary-action-button"> Continue reading <i class="ph ph-arrow-right"></i> </a>
                    </div>
                    </div>`)


                    $(".slides").append($slide)

                }

            }

        }
    }
}

function prioritizeObjectById(array, id) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].bid === id) {
            var obj = array[i];
            array.splice(i, 1);
            array.unshift(obj);
            break;
        }
    }
    return array;
}


