import { useUser } from '../features/authentication/useUser'
import Spinner from './Spinner'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate()
    // 1. Load the authenticated user
    const { user, isLoading, isAuthenticated } = useUser()

    // 2. If there is NO authentiacted user, redirect to /login page
    useEffect(() => {
        if (!isAuthenticated && !isLoading) navigate('/login')
    }, [isAuthenticated, isLoading, navigate])

    // 3. While loading, show a spinner
    if (isLoading)
        return (
            <div className="bg-primary-200 flex h-screen items-center justify-center">
                <Spinner />
            </div>
        )

    // 4. If there IS a user, render the app
    if (isAuthenticated) return children
}

export default ProtectedRoute
