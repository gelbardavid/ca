import { BookFilter } from "../cmps/BookFilter.jsx";
import { BookList } from "../cmps/BookList.jsx";
import { bookService } from '../services/book.service.js'

const { useState, useEffect, useRef } = React;

export function BookIndex() {

    const [filterBy, setFilterBy] = useState({ title: "", price: 0 });
    const [filteredBooks, setFilteredBooks] = useState([])
    const allBooks = useRef([]);
    const maxPrice = useRef(0);

    useEffect(() => {
        const loadBooks = async () => {
            const books = await bookService.query();
            allBooks.current = books;
            maxPrice.current = bookService.getBooksMaxPrice(books);
            setFilteredBooks(books);
        }

        loadBooks()
    }, [])

    useEffect(() => {
        const { title: titleFilter, price: priceFilter } = filterBy;
        const filteredBooks = allBooks.current.filter(book => {
            const { title, listPrice } = book;
            const { amount = 0 } = listPrice || {};
            const isShowByTitle = (title.toLowerCase()).includes(titleFilter.toLowerCase())
            const isShowByPrice = amount > priceFilter;
            return isShowByTitle && isShowByPrice
        })

        setFilteredBooks(filteredBooks);

    }, [filterBy])

    async function onDelete(bookId) {
        await bookService.remove(bookId);
        setFilteredBooks(prevValue => prevValue.filter(book => book.id !== bookId))
    }

    async function onFilter(updatedFilter) {
        setFilterBy(prevValue => ({ ...prevValue, ...updatedFilter }))
    }

    return (
        <section className="book-index">
            <BookFilter filterBy={filterBy} filterSetter={onFilter} maxPrice={maxPrice.current} />
            <BookList books={filteredBooks} onDeleteBook={onDelete} />
        </section>
    )

}