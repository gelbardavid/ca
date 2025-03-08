const { Link, NavLink } = ReactRouterDOM


export function AppHeader() {
    return (
        <header className="app-header full main-layout">
            <section className="">
                <h1><Link to="/home">Miss Books</Link></h1>
                <section className="nav-links">
                    <NavLink to="/home">Get me home!</NavLink>
                    <NavLink to="/about">Miss Who?!</NavLink>
                    <NavLink to="/book">Let's Read!</NavLink>
                </section>
            </section>
        </header>
    )
}