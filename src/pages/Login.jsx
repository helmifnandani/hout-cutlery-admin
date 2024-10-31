import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useUser } from '../features/authentication/useUser'
import LoginForm from '../features/authentication/LoginForm'
import Logo from '../ui/Logo'
import Heading from '../ui/Heading'

function Login() {
    const navigate = useNavigate()
    const { user, isLoading, isAuthenticated } = useUser()
    useEffect(() => {
        if (isAuthenticated && !isLoading) navigate('/')
    }, [isAuthenticated, isLoading, navigate])
    return (
        <main className="grid min-h-screen grid-cols-[48rem] content-center justify-center gap-12 bg-gray-50">
            <Logo />
            <Heading as="h4" className="text-primary-600">
                Log in to your account
            </Heading>
            <LoginForm />
        </main>
    )
}

export default Login
