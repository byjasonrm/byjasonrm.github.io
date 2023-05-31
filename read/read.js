import * as Storage from '../local.js';
import * as Books from '../js/books.js';

var currentPage = 0
var currentfontsize = 16
$(".previous-page").addClass("disabled-action")


const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const bookid = urlParams.get('id')
const pagenbr = urlParams.get('page')
const bookdetails = Books.list.find(x => x.id == bookid)
let totalpages = 0
let book

var LSP
checkLocal()

$(document).ready(function(){

    
    fillChapters()
    buildPage()
    fillBooksList()
    
    $(".go-home").click(function(){
        bubbleLoad()
    })
    $(".logo").click(function(){
        bubbleLoad()
    })
    $(".see-books").click(function(){
        toggleBooksList()
    })
    $(".books-list-cover").click(function(){
        hideBooksList()
    })
    $(".next-page").click(function(){
        movePage(1)
    })
    $(".previous-page").click(function(){
        movePage(0)
    })

    $(".share-page").click(function(){
        sharePage()
    })

    $("a").click(function(){
        bubbleLoad()
    })


    $(".toggle-kitty").click(function(){
        toggleKitty()
    })
    $(".settings").click(function(){
        toggleSettings()
    })
    $(".chapters").click(function(){
        toggleChaptersBox()
    })
    $(".chapters-container").on("click", "li", function(){
        goToChapter($(this).attr('id'))
    })

    $(".tap-cover").click(function(){
        hideSettings()
        hideChaptersBox()
        $(".tap-cover").addClass("display-none")
    })

    $(".decrease-font-size").click(function(){
        decreaseFontSize()        
    })

    $(".increase-font-size").click(function(){
        increaseFontSize()
    })

    $(".toggle-font-style").click(function(){
        toggleFontType()
    })

    $(".toggle-mode").click(function(){
        toggleMode()
    })

    $(".settings-serif").click(function(){
        if($(".content-container > *").hasClass('sans-serif-font')){
            changeToSerif()
        }
    })
    $(".settings-sans-serif").click(function(){
        if($(".content-container > *").hasClass('serif-font')){
            changeToSansSerif()
        }
    })
    $(".activate-light-mode").click(function(){
        if(!$("body").hasClass('light-mode')){
            changeToLightMode()
        }
    })
    $(".activate-dark-mode").click(function(){
        if($("body").hasClass('light-mode')){
            changeToDarkMode()
        }
    })

    $(".input-kitty-name").on('input', function(){
        if($(this).val().trim().length < 30){
            $(this).removeClass('alert-border')
            $(".alert-text").addClass('display-none')
            Storage.updateKittyName($(this).val().trim())
        }else{
            $(this).addClass('alert-border')
            $(".alert-text").removeClass('display-none')
        }
    })
})

function fillBooksList() {
    let l = Books.list
    for (let i = 0; i < l.length; i++) {
        let readIcon
        let readText
        let readClass
        if(l[i].id == bookid){
            readIcon = `ph-caret-double-right`
            readText = `Currently Reading`
            readClass = `currently-reading`
        }else{
            readIcon = `ph-book-open`
            readText = `Read`
            readClass = ``
        }

        let $c = $(`
        <a href="/read.html?id=${l[i].id}" class="book-list-item ${readClass}">
            <div class="book-list-item-image">
                <img src="${l[i].cover_book}" alt="">
            </div>
            <div class="book-list-item-text"> 
            <span class="book-list-item-text-header"><i class="ph ${readIcon}"></i> ${readText}</span>
                <span class="book-list-item-text-title">
                ${l[i].title}
                </span> 
            </div>
        </a>
        `)
        $(".books-list-container").append($c)
    }

}

function toggleBooksList(){
    if($(".books-list").hasClass("show-books-list")){
        hideBooksList()
    }else{
        showBooksList()
    }
}

function showBooksList(){
    $(".see-books i").removeClass("ph-caret-down")
    $(".see-books i").addClass("ph-caret-up")
    $("nav").addClass("nav-active")
    $(".books-list").addClass("show-books-list")
    $(".books-list-cover").addClass("show-books-list-cover")
}

function hideBooksList(){
    $(".see-books i").addClass("ph-caret-down")
    $(".see-books i").removeClass("ph-caret-up")
    $("nav").removeClass("nav-active")
    $(".books-list").removeClass("show-books-list")
    $(".books-list-cover").removeClass("show-books-list-cover")
}

function bubbleLoad(){
    $(".bubble-load-container").removeClass('hide-bubble-load')
    setTimeout(function(){
        $(".bubble-load-container").addClass('hide-bubble-load') 
    }, 1000)
}

function sharePage(){

    $("#shareLink").val("https://byjasonrm.com/read.html?id=" + bookid + "&page="+currentPage)
    try{
        var copyText = document.getElementById("shareLink")
        copyText.select()
        copyText.setSelectionRange(0, 99999)
        navigator.clipboard.writeText(copyText.value)
        $(".copied-text").addClass('copied-text-appear')
        setTimeout(function(){ $(".copied-text").removeClass('copied-text-appear') }, 2000)
        
    }catch(e){
        $(".error-copy-text").removeClass('display-none')
        setTimeout(function(){ $(".error-copy-text").addClass('display-none') }, 2000)
    }

}

function increaseFontSize(){
    if(currentfontsize+2 > 30){

    }else{
        currentfontsize = currentfontsize+2
        $("#displayArea").css({"font-size": currentfontsize+"px"})
    }

    Storage.updateFontSize(currentfontsize)
}

function decreaseFontSize(){
    if(currentfontsize-2 < 10){

    }else{
        currentfontsize = currentfontsize-2
        $("#displayArea").css({"font-size": currentfontsize+"px"})
    }

    Storage.updateFontSize(currentfontsize)

}

function changeToLightMode(){
    $("body").addClass("light-mode")
    $(".logo img").addClass("invert")
    $(".activate-light-mode").addClass("active-button")
    $(".activate-dark-mode").removeClass("active-button")
    Storage.updateCurrentMode("")

}

function changeToDarkMode(){
    $("body").removeClass("light-mode")
    $(".logo img").removeClass("invert")
    $(".activate-dark-mode").addClass("active-button")
    $(".activate-light-mode").removeClass("active-button")
    Storage.updateCurrentMode("dark")
}

function changeToSerif(){
    $(".content-container > *").removeClass("sans-serif-font")
    $(".content-container > *").addClass("serif-font")
    $(".toggle-font-style").text("Sans-Serif Font")
    $(".settings-serif").addClass("active-button")
    $(".settings-sans-serif").removeClass("active-button")
    Storage.updateFontType("serif")
}

function changeToSansSerif(){
    $(".content-container > *").removeClass("serif-font")
    $(".content-container > *").addClass("sans-serif-font")
    $(".toggle-font-style").text("Serif Font")
    $(".settings-sans-serif").addClass("active-button")
    $(".settings-serif").removeClass("active-button")
    Storage.updateFontType("sans-serif")
}

function goToChapter(t){
    currentPage = parseInt(t)
    buildPage()
    hideChaptersBox()
    disableStatus()
    Storage.updateCurrentPage(parseInt(t))
}

function getCurrentChapter(){
    let found = book.chapter.find(x => x.id === book.page[currentPage].chapter_id)
    $(".current-chapter").text(found.title)
}

function toggleKitty(){
    if($("#gameCanvas").hasClass("display-none")){

        showKitty()
    }else{
        hideKitty()
    }
    
}

function showKitty(){
    $("#gameCanvas").removeClass("display-none")
    $(".toggle-kitty").text("Hide Kitty")
    Storage.updateKittyVisibility(true)
}

function hideKitty(){
    $(".toggle-kitty").text("Show Kitty")
    $("#gameCanvas").addClass("display-none")
    Storage.updateKittyVisibility(false)
}

function toggleSettings(){
    if($(".settings-container").hasClass("hide-popup-container")){
       showSettings()
    }else{
        hideSettings()
    }
}

function showSettings(){
    hideChaptersBox()

    $(".settings-container").removeClass("hide-popup-container")
    $(".settings").addClass("button-toggle")
    $(".settings").removeClass("button-toggle-off")
    $(".tap-cover").removeClass("display-none")

}

function hideSettings(){
    $(".settings-container").addClass("hide-popup-container")
    $(".settings").addClass("button-toggle-off")
    $(".settings").removeClass("button-toggle")
    $(".tap-cover").addClass("display-none")
}

function toggleChaptersBox(){
    if($(".chapters-container").hasClass("hide-popup-container")){
        showChaptersBox()
    }else{
        hideChaptersBox()
    }
}

function showChaptersBox(){
    hideSettings()

    $(".chapters-container").removeClass("hide-popup-container")
    $(".chapters").addClass("button-toggle")
    $(".chapters").removeClass("button-toggle-off")
    $(".tap-cover").removeClass("display-none")
}

function hideChaptersBox(){
    $(".chapters-container").addClass("hide-popup-container")
        $(".chapters").addClass("button-toggle-off")
        $(".chapters").removeClass("button-toggle")
        $(".tap-cover").addClass("display-none")

}

function buildPage(){
    var title = book.page[currentPage].title
    var subtitle = book.page[currentPage].subtitle
    var content = book.page[currentPage].content
    $('#displayArea').text(content)
    $('#title').text(title)
    $('#subtitle').text(subtitle)
    getCurrentChapter()

    if(bookdetails.buy_link != ""){
        $(".buy-book").removeClass("display-none")
        $(".buy-book-price").text("$"+bookdetails.price)
        $(".buy-book").attr("href", bookdetails.buy_link)
        $(".buy-book-image img").attr("src", bookdetails.cover_book)
    }else{
        $(".full-book").removeClass("display-none")
    }
}

function movePage(direction){

    if(direction == 1){
        if(currentPage+1 <= book.page.length - 1){
            currentPage++
            disableStatus()
            buildPage()
        }
    }else{
        if(currentPage-1 >= 0){
            currentPage--
            disableStatus()
            buildPage()
        }
    }

    Storage.updateCurrentPage(currentPage)
}

function disableStatus(){

        currentPage+1 >= book.page.length ? $(".next-page").addClass("disabled-action") : $(".next-page").removeClass("disabled-action")
        currentPage-1 < 0 ? $(".previous-page").addClass("disabled-action") : $(".previous-page").removeClass("disabled-action")
    
}

function fillChapters(){
    let list = groupByChapter(book.chapter, book.page)

    for(let i=0; i < list.length; i++){
        let $chapter = $(`<div class="chapter-title"> ${ list[i].chapterTitle} </div>`)
        let $li;
        let $ul = $(`<ul></ul>`)
        for(let j=0; j<list[i].items.length; j++){

            $li = $(`<li id='${list[i].items[j].id}'> ${list[i].items[j].title} </li>`)
            $ul.append($li)
        }
        $(".chapters-container").append($chapter)
        $(".chapters-container").append($ul)
    }
}

function groupByChapter(chapterList, otherList) {
    let globalIndex = 0;
    return chapterList.map(chapter => {
        let items = otherList.filter(item => item.chapter_id === chapter.id)
                             .map(item => ({id: globalIndex++, title: item.title}));
        return {
            id: chapter.id,
            chapterTitle: chapter.title,
            items: items
        }
    });
}



function checkLocal(){
    LSP = JSON.parse(localStorage.getItem("JRMUSER"));
    if(LSP == "" || LSP == undefined || LSP == null){
      newLocalData()
    }else{
      setLocalData()
    }

    setUpLocal()
}

function newLocalData(){
    Storage.createUserID()
    Storage.AddToLocalStorage()
    Storage.addBook(bookid, totalpages)
}

function setLocalData(){
    Storage.user.id = LSP.id
    Storage.user.bookAndPage = LSP.bookAndPage
    Storage.user.currentChapter = LSP.currentChapter
    Storage.user.currentMode = LSP.currentMode
    Storage.user.currentFontSize = LSP.currentFontSize
    Storage.user.currentFontType = LSP.currentFontType
    Storage.user.kittyName = LSP.kittyName
    Storage.user.kittyVisibilityStatus = LSP.kittyVisibilityStatus
}

function setUpLocal(){


    Storage.updateCurrentBook(bookid)

    let found = Storage.user.bookAndPage.find(x => x.bid == bookid)

    if (found) {
        configurePage(bookid, found)
    }else{
        Storage.addBook(bookid, totalpages)
        let found = Storage.user.bookAndPage.find(x => x.bid == bookid)
        configurePage(bookid, found)
    }


    
    if(Storage.user.currentMode == ""){
        changeToLightMode()
    }else if(Storage.user.currentMode == "dark"){
        changeToDarkMode()
    }
    

    $("#displayArea").css({"font-size": Storage.user.currentFontSize+"px"}) 


    if(Storage.user.currentFontType == "serif"){
        changeToSerif()
    }else if(Storage.user.currentFontType == "sans-serif"){
        changeToSansSerif()
    }

    $(".input-kitty-name").val(Storage.user.kittyName)


    Storage.user.kittyVisibilityStatus ? showKitty() : hideKitty()

}

function configurePage(n, p){
    if(n == '' || n == undefined || n == null){
        window.location.href = './404.html'
    }else{
        if(n == "ltwns"){
            book = ltwns
            totalpages = ltwns.page.length - 1
            Storage.updateTotalPages(n, totalpages)
        }else if(n == "bdcs"){
            book = bdcs
            totalpages = bdcs.page.length - 1
            Storage.updateTotalPages(n, totalpages)
        }else if(n == "utss"){
            book = utss
            totalpages = utss.page.length - 1
            Storage.updateTotalPages(n, totalpages)
        }

        setUpPage(p)


    }

}

function setUpPage(p){
    if(p.pnb && p.pnb >=0){
        if(p.pnb > book.page.length){
            Storage.updateCurrentPage(0)
            currentPage = 0
        }else{
            if (pagenbr) {
                Storage.updateCurrentPage(parseInt(pagenbr))
                currentPage = pagenbr
            }else{
                currentPage = p.pnb
            }
        }        
    }else{
        Storage.updateCurrentPage(0)
        currentPage = 0
    }

    goToChapter(currentPage)
    
}