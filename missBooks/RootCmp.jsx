const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

import { Home } from "./pages/Home.jsx"

export function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />}></Route>
            </Routes>
        </Router>
    )
}
