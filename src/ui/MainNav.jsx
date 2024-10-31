import { NavLink } from 'react-router-dom'
const MainNav = () => {
    return (
        <nav>
            <ul className="list-navlink flex flex-col gap-2">
                <li className="">
                    <NavLink to="/products">Products</NavLink>
                </li>
                <li>
                    <NavLink to="/catalogs">Catalogs</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default MainNav
