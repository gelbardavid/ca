import { BookIndex } from "../pages/BookIndex.jsx"

export function HomePage() {

    return (
        <section className="home">
            <section className="logo">
                <img src="../assets/img/logo.jpg"></img>
            </section>
            <BookIndex />
        </section>
    )
}