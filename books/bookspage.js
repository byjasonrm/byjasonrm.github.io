import * as Books from '../js/books.js'

setupbooks()
setupbookslinks()

function setupbooks() {
    for (let i = 0; i < Books.list.length; i++) {

        let main;
        Books.list[i].mainbook ? main = "" : main = "display-none"


        let $b = $(`
        <div class="books-content-box">
            <div class="books-content-box-cover">
                <img src="${Books.list[i].cover_book}" alt="${Books.list[i].title} Book Cover">
            </div>
            <div class="books-content-box-details">
                <div class="books-content-box-new ${main}"> <span>LATEST</span></div>
                <h2 class="books-content-box-details-title">${Books.list[i].title}</h2>
                <div class="books-content-box-details-highlight">$${Books.list[i].price}</div>
                    <div class="books-content-box-details-action">
                        <a href="/book.html?id=${Books.list[i].id}" class="books-content-box-details-action-learn-more books-action-button">Learn more</a>
                        <a href="${Books.list[i].sold_out ? '#' : Books.list[i].buy_link}" class="books-action-button ${Books.list[i].sold_out ? 'disabled' : 'books-content-box-details-action-buy-now'}">
                            ${Books.list[i].sold_out ? 'Sold Out' : 'Buy now'}
                        </a>
                    </div>

            </div>
        </div>
        `)

        $(".books-content").append($b)


    }
}

function setupbookslinks() {
    let container = $(".links-page-books-list")

    for (let i = 0; i < Books.list.length; i++) {
        let main;
        Books.list[i].mainbook ? main = "" : main = "display-none"

        let $b = $(`
        <a href="${Books.list[i].sold_out ? '#' : Books.list[i].buy_link}" class="links-page-books-list-book">
            <div class="links-page-books-list-book-cover">
                <img src="${Books.list[i].cover_book}" alt="${Books.list[i].title} Book Cover">
            </div>
            <div class="links-page-books-list-book-text">
                <div class="books-content-box-new ${main}"> <span>LATEST</span></div>
                ${Books.list[i].sold_out ? '(Sold Out)' : ''} Purchase <span class="links-page-books-list-book-text-title">"${Books.list[i].title}"</span> - Downloadable Ebook
            </div>
        </a>
        
        `)

        container.append($b)
    }
}
