import { loadFromStorage, makeId, saveToStorage, makeLorem } from './util.service.js'
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

function getEmptybook(title = '', description = '', thumbnail = '../assets/img/21.png', price = 1, currency = "EUR", isOnSale = false) {
    const defaultListPrice = {
        amount: price,
        currencyCode: currency,
        isOnSale
    }
    return {
        title,
        description,
        thumbnail,
        listPrice: {
            amount: price,
            currencyCode: currency,
            isOnSale
        }
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
            _createbook('Dragon Cover', makeLorem(50), '../assets/img/21.png', 20.99, "EUR", false),
            _createbook('Dubi Dubi', makeLorem(75), '../assets/img/21 (15).png', 15.99, "EUR", true),
            _createbook('Bati Bat', makeLorem(63), '../assets/img/21 (19).png', 28.99, "EUR", true),
            _createbook('Scienceeee', makeLorem(100), '../assets/img/21 (6).png', 80.99, "EUR", false),
        ]
        saveToStorage(BOOK_KEY, books)
    }
}

function _createbook(title, description, thumbnail, price, currency, isOnSale) {
    const book = getEmptybook(title, description, thumbnail, price, currency, isOnSale)
    book.id = makeId()
    return book
}