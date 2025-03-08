import { BookPreview } from "./BookPreview.jsx"

export function BookList(props) {

    const { books, onDeleteBook } = props;

    return (
        <ul>
            <section className="book-list">
                {
                    books.map((book) => <BookPreview key={`book-preview-${book.id}`}
                        book={book}
                        onDeleteBook={onDeleteBook} />
                    )
                }
            </section>
        </ul>
    )

}