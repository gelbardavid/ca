const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { HomePage } from "./pages/HomePage.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { NotFound } from "./cmps/NotFound.jsx"

import { ROUTES } from './services/constants.js'

export function App() {

    return (
        <Router>
            <section className="app">
                <AppHeader />
                <Routes>
                    <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.HOME} />}></Route>
                    <Route path={ROUTES.HOME} element={<HomePage />}></Route>
                    <Route path={ROUTES.ABOUT} element={<About />}></Route>
                    <Route path={ROUTES.BOOK_DETAILS} element={<BookDetails />}></Route>
                    <Route path={ROUTES.NOT_FOUNT} element={<NotFound />}></Route>
                </Routes>
            </section>
        </Router >
    )
}
