const { Link, NavLink } = ReactRouterDOM


export function AppHeader() {
    return (
        <header className="app-header full main-layout">
            <section class="">
                <h1>Miss Books</h1>
                <section class="nav-links">
                    <NavLink to="/home">Get me home!</NavLink>
                    <NavLink to="/about">Miss Who?!</NavLink>
                    <NavLink to="/book">Let's Read!</NavLink>
                </section>
            </section>
        </header>
    )
}