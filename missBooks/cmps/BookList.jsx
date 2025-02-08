import { BookPreview } from "./BookPreview.jsx"

export function BookList() {


    return (
        <section className="book-list">
            <ul>
                <li>
                    <BookPreview />
                </li>
            </ul>
        </section>
    )

}