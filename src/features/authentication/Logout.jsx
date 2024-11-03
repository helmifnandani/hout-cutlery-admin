import Button from '../../ui/Button'
import SpinnerMini from '../../ui/SpinnerMini'
import { useLogout } from './useLogout'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'

const Logout = () => {
    const { logout, isLoading } = useLogout()
    return (
        <Button
            disabled={isLoading}
            onClick={logout}
            variant={'secondary'}
            size="small"
            isIcon={true}
        >
            {!isLoading ? (
                <ArrowRightStartOnRectangleIcon className="size-5" />
            ) : (
                <SpinnerMini />
            )}
        </Button>
    )
}

export default Logout
