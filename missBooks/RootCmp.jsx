const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { HomePage } from "./pages/HomePage.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"

export function App() {

    return (
        <Router>
            <section className="app">
                <AppHeader />
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />}></Route>
                    <Route path="/home" element={<HomePage />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/book" element={<BookIndex />}></Route>
                    <Route path="/book/:bookId" element={<BookIndex />}></Route>
                </Routes>
            </section>
        </Router >
    )
}
