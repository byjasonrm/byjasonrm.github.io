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
ab()

$(document).ready(function(){

     $(".club-nav-menu").click(function(){
        toggleNav()
     })
     $(".club-menu-col-list > a").click(function(){
        hideNav()
     })
     $(".club-nav-active-cover").click(function(){
        toggleNav()
     })

     $(".emerald-input input").on("input", function(){
        $(".typewriter .emerald-shine").text($(this).val())
     })

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

    $(".slides").on('click', ".remove-from-queue", function(){
        var GetId = $(this).attr("id")
        var IdSplit = GetId.split('-')
        var Id = IdSplit[1]

        let bnpArray = Storage.removeBook(Id, LSP.bookAndPage)

        bnpArray.length ? Storage.updateCurrentBook(bnpArray[0].bid) : Storage.updateCurrentBook("")

        continueReading()

    });


})
$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});

function toggleNav(){
    if($(".club-nav").hasClass("club-nav-active")){
        hideNav()
    }else{  
        showNav()
    }
}

function showNav(){
    $(".club-nav").addClass("club-nav-active")
    if($(window).width() < 580 && $(window).width() > 360){
        $(".club-nav").animate({'height': '450px'}, 300)
    } else if($(window).width() < 360){
        $(".club-nav").animate({'height': '650px'}, 300)
    }else{
        $(".club-nav").animate({'height': '300px'}, 300)
    } 
    $(".club-nav-active-cover").removeClass("display-none")
}

function hideNav(){
    $(".club-nav").removeClass("club-nav-active")
    $(".club-nav").animate({'height': '60px'}, 300)
    $(".club-nav-active-cover").addClass("display-none")
}


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
        if(m.sold_out){
            $(".main-book .section-action .primary-action-button").addClass("display-none")
        }else{
            $(".main-book .section-action .primary-action-button").attr("href", m.buy_link)
        }
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
    setLocalData()
      continueReadingBuild()
    }


}

function setLocalData() {
    Storage.user.id = LSP.id
    Storage.user.bookAndPage = LSP.bookAndPage
    Storage.user.currentBook = LSP.currentBook
    Storage.user.currentChapter = LSP.currentChapter
    Storage.user.currentMode = LSP.currentMode
    Storage.user.currentFontSize = LSP.currentFontSize
    Storage.user.currentFontType = LSP.currentFontType
    Storage.user.kittyName = LSP.kittyName
    Storage.user.kittyVisibilityStatus = LSP.kittyVisibilityStatus
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
            
            $('.slides').empty()

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

                    // <button class="remove-from-queue" id="fbnp-${foundBookDetails.id}"><i class="ph ph-x"></i> Remove from Queue</button>
                    
                    $(".slides").append($slide)
                }

            }

            

        }
    }else{
        $(".continue-reading").addClass('display-none')
        $('.slides').empty()
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


function ab(){
    // let min = 0
    // let max = 2
    // let prob = Math.floor(Math.random() * (max - min + 1) ) + min

    // if(prob == 0){
    //     $(".abm-1").removeClass("display-none")
    // }else if(prob == 1){
    //     $(".abm-2").removeClass("display-none")
    // }else if(prob == 2){
    //     $(".abm-3").removeClass("display-none")
    // }
}