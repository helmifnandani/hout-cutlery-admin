import { useState } from 'react'
import { login } from '../../services/apiAuth'
import { useLogin } from './useLogin'
import FormGroup from '../../ui/FormGroup'
import Button from '../../ui/Button'

function LoginForm() {
    const [email, setEmail] = useState('helmi@example.com')
    const [password, setPassword] = useState('helmi1234')
    const { login, isPending } = useLogin()

    function handleSubmit(e) {
        e.preventDefault()
        if (!email || !password) return
        login(
            { email, password },
            {
                onSettled: () => {
                    setEmail('')
                    setPassword('')
                },
            }
        )
    }

    return (
        <form
            className="border-primary-600 rounded-md border px-10 py-6"
            onSubmit={handleSubmit}
        >
            <FormGroup label="Email">
                <input
                    className="border-primary-500 rounded-md border px-2 py-3 shadow-sm"
                    type="email"
                    id="email"
                    autoComplete="username"
                    value={email}
                    disabled={isPending}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormGroup>

            <FormGroup label="Password">
                <input
                    className="border-primary-500 rounded-md border px-2 py-3 shadow-sm"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    disabled={isPending}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormGroup>
            <div className="flex flex-col gap-2 py-2">
                <Button>Login</Button>
            </div>
        </form>
    )
}

export default LoginForm
