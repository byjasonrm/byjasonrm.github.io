import * as Books from '../js/books.js'
import * as General from '../js/general.js'

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const book = urlParams.get('id')


General.creds()

$(document).ready(function(){
    if(book == '' || book == undefined || book == null){
        window.location.href = './404.html'
    }else{
        let bookfound = Books.list.find(x => x.id == book)
        if(bookfound){
            setupbook(bookfound)
        }else{
            window.location.href = './404.html'
        }
    }
    
    $(window).scroll(function(){
        let scroll = $(window).scrollTop();

        if(scroll > ($(window).height() + $('.creds').height())){
            $(".bookreview").addClass("appear-animation")
        }
        if(scroll > ($(window).height() / 2)){
            $("readanywhere .book-information-details-description").addClass("appear-animation")
        }
    })
})

function setupbook(b){
    $(".buy-book-button").attr("href", b.buy_link)
    $(".book-price").text(b.price)
    $(".read-free-version-button").attr("href", "/read.html?id="+b.id)
    $(".book-information-details-title-logo").attr("src", b.title_logo)
    $(".book-information-details-title-cover").attr("src", b.cover_book)
    $(".description-text").text(b.description)
    $(".tag-date").text(b.release_date)
    $(".tag-genres").text(b.genres)
    $(".tag-language").text(b.language)
    $(".tag-words").text(b.words)
    $(".tag-pages").text(b.pages)
    $(".circle-1").css("background", b.brandColor)
    $(".circle-2").css("background", b.brandColor)
    $("body").css("background", "url(" + b.pageBG + ") center center / contain repeat, " +  b.bgColor +"")
    
    for(let i=0; i<b.reviews.length; i++){
        let $r = $("<span class='bookreview book-information-details-description' style='animation-delay: " + i*0.3 + "s'>" + b.reviews[i] + "</span>")
        $(".bookreviews-content-container").append($r)
    }
}