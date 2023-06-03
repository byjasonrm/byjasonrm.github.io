import * as Books from '../js/books.js'

setupbooks()

function setupbooks(){
    for(let i=0; i<Books.list.length; i++){

        let $b = $(`
        <div class="books-content-box">
        <div class="books-content-box-cover">
            <img src="${ Books.list[i].cover_book }" alt="${ Books.list[i].title } Book Cover">
        </div>
        <div class="books-content-box-details">
        <h2 class="books-content-box-details-title">${ Books.list[i].title }</h2>
        <div class="books-content-box-details-highlight">$${ Books.list[i].price }</div>
            <div class="books-content-box-details-action">
                <a href="/book.html?id=${ Books.list[i].id }" class="books-content-box-details-action-learn-more books-action-button">Learn more</a>
                <a href="${ Books.list[i].buy_link }" class="books-content-box-details-action-buy-now books-action-button">Buy now</a>
            </div>

        </div>
    </div>
        `)

        $(".books-content").append($b)


    }
}
