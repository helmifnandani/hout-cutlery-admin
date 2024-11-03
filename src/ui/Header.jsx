import { UserCircleIcon } from '@heroicons/react/24/outline'
import { useUser } from '../features/authentication/useUser'
import Logout from '../features/authentication/Logout'

const Header = () => {
    const { user } = useUser()
    const { fullName } = user.user_metadata
    return (
        <header className="flex items-center justify-end gap-4 border border-gray-100 px-12 py-3">
            <div className="flex items-center gap-4 font-medium">
                <p>{user.email}</p>
            </div>
            <div>
                <Logout />
            </div>
        </header>
    )
}

export default Header
