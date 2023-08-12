const navlinks = [
    {
        text:"Books",
        link:"./books.html",
        icon:`<i class="ph ph-book-bookmark"></i>`,
        navClass:'nav-books',
        menuClass:'menu-books',
        specialStyle:''
    },
    {
        text:"Shop",
        link:"https://bit.ly/3JxfO8c",
        icon:`<i class="ph ph-shopping-cart-simple"></i>`,
        navClass:'nav-shop',
        menuClass:'menu-shop',
        specialStyle:''
    },

]

$(document).ready(function(){

    createNav()
    createMenu()


})

function createNav(){
    let $navcontent = $(`
    <div class="nav-content max-width">
        <div class="nav-logo"><img src="/assets/images/signature.svg"></div>
    </div>
    `)

    let $navmenuitems = $(`<div class="nav-menu-items"></div>`)

    for(let i=0; i<navlinks.length; i++){
        let $l = $(`<a href="${navlinks[i].link}">
        <div class="nav-menu-item ${navlinks[i].navClass + " " + navlinks[i].specialStyle} ">
       ${navlinks[i].icon + navlinks[i].text}
        </div>
        </a>`)

        $navmenuitems.append($l)
    }

    let $menuicon = $(`<div class="menu"><i class="ph ph-list"></i></div>`)

    $navcontent.append($navmenuitems)
    $navcontent.append($menuicon)
    
    $("nav").append($navcontent)

}

function createMenu(){
    let menu = $("menu")
    let $menuclose = $(`
    <div class="menu-close">
    Close
    </div>
    `)
    let $menucontent = $(`
    <div class="menu-content">
    </div>
    `)


    let $menunavlist = $("<div class='menu-content-links'><h3>Navigation</h3></div>")


    for(let i=0; i<navlinks.length; i++){
        let $l = $(`<a href="${navlinks[i].link}">
        <div class="menu-item ${navlinks[i].menuClass + " " + navlinks[i].specialStyle} ">
       ${navlinks[i].icon + navlinks[i].text}
        </div>
        </a>`)

        $menunavlist.append($l)
    }

    $menucontent.append($menunavlist)

    menu.append($menuclose)
    menu.append($menucontent)
}

// {
//     text:"Become a Supporter",
//     link:"club.html",
//     icon:`<i class="ph ph-crown-simple"></i>`,
//     navClass:'nav-club',
//     menuClass:'menu-club',
//     specialStyle:'gold-shine'
// },