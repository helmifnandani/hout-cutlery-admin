import { Link } from 'react-router-dom'
import Logo from './Logo'
import MainNav from './MainNav'

const Sidebar = () => {
    return (
        <aside className="row-span-full flex flex-col gap-8 border-r border-r-gray-300 px-6 py-8">
            <Logo />
            <MainNav />
        </aside>
    )
}

export default Sidebar
