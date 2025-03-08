const { Link } = ReactRouterDOM
const { useState } = React

import { ROUTES } from '../services/constants.js'

export function BookPreview({ book, onDeleteBook }) {

    const [isLoading, setIsLoading] = useState(false);

    async function handleClick() {
        setIsLoading(true)
        await onDeleteBook(book.id)
        setIsLoading(false)
    }

    return (
        <section className="book-preview">
            <li key={`bookPreview${book.id}`} >
                <img src={book.thumbnail}></img>
                <h2>{book.title}</h2>
                <h3>{book.listPrice.amount} {book.listPrice.currencyCode}</h3>
                <p className="book-preview-description">{book.subtitle}</p>
                <div className="book-preview-buttons">
                    <Link to={`${ROUTES.BOOK}/${book.id}`}><button>Details</button></Link>
                    <button onClick={handleClick}>{isLoading ? "Deleting..." : "Delete"}</button>
                </div>
            </li >
        </section >
    )

}