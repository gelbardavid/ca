import { loadFromStorage, makeId, saveToStorage, makeLorem, getRandomNumber } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptybook,
    getDefaultFilter,
    getBooksMaxPrice,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount >= filterBy.price)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(_setNextPrevbookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptybook({
    title = '',
    description = '',
    thumbnail = '../assets/img/21.png',
    price = 1,
    currency = "EUR",
    isOnSale = false,
    authors = ["NA"],
    publishedDate = 'NA',
    pageCount = 0,
    categories = ["NA"],
    language = 'en'
}) {
    return {
        title,
        description,
        thumbnail,
        listPrice: {
            amount: price,
            currencyCode: currency,
            isOnSale
        },
        subtitle: makeLorem(5),
        authors,
        publishedDate,
        pageCount,
        categories,
        language
    };
}


function getDefaultFilter() {
    return { title: '', price: '' }
}


function _setNextPrevbookId(book) {
    return query().then((books) => {
        const bookIdx = books.findIndex((currbook) => currbook.id === book.id)
        const nextbook = books[bookIdx + 1] || books[0]
        const prevbook = books[bookIdx - 1] || books[books.length - 1]
        book.nextbookId = nextbook.id
        book.prevbookId = prevbook.id
        return book
    })
}

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = [
            _createbook('Dragon Cover', makeLorem(50), '../assets/img/33.jpg', 20.99, "EUR", false, ["Me Myself", "My Colleague"], 2015, "en", getRandomNumber(3)),
            _createbook('Dubi Dubi', makeLorem(75), '../assets/img/35.jpg', 15.99, "EUR", true, ["Me Myself"], 1953, "en", getRandomNumber(3)),
            _createbook('Bati Bat', makeLorem(63), '../assets/img/39.jpg', 28.99, "EUR", true, ["Me Myself"], 1945, "en", getRandomNumber(3)),
            _createbook('Scienceeee', makeLorem(100), '../assets/img/37.jpg', 80.99, "EUR", false, ["Me Myself"], 1991, "en", getRandomNumber(3)),
            _createbook('Kiddiiii', makeLorem(10), '../assets/img/34.jpg', 80.99, "EUR", false, ["Me Myself"], 1993, "en", getRandomNumber(3)),
            _createbook('Alchemists', makeLorem(100), '../assets/img/29.jpg', 80.99, "EUR", false, ["Me Myself"], 1989, "en", getRandomNumber(3)),
            _createbook('GoDz', makeLorem(100), '../assets/img/40.jpg', 80.99, "EUR", false, ["Me Myself"], 2000, "en", getRandomNumber(3)),
            _createbook('Learneee', makeLorem(100), '../assets/img/36.jpg', 189.99, "EUR", false, ["Me Myself"], 2025, "en", getRandomNumber(3)),
            _createbook('COSMOS Unrevealed', makeLorem(150), '../assets/img/32.jpg', 80.99, "EUR", false, ["Me Myself"], 2008, "en", getRandomNumber(3)),
            _createbook('Molucules', makeLorem(130), '../assets/img/23.jpg', 80.99, "EUR", false, ["Me Myself"], 2014, "en", getRandomNumber(3)),
        ]
        saveToStorage(BOOK_KEY, books)
    }
}

function _createbook(title, description, thumbnail, price, currency, isOnSale, authors, publishedDate, language, pageCount, categories) {
    const book = getEmptybook({ title, description, thumbnail, price, currency, isOnSale, authors, publishedDate, language, pageCount, categories })
    book.id = makeId()
    return book
}

function getBooksMaxPrice(books) {
    return books.reduce((highestPrice, currentBook) => {
        const { listPrice } = currentBook;
        const { amount = 0 } = listPrice || {}
        return amount > highestPrice ? amount : highestPrice;
    }, 0)
}