import { useState } from 'react'
import { login } from '../../services/apiAuth'
import { useLogin } from './useLogin'
import FormGroup from '../../ui/FormGroup'
import Button from '../../ui/Button'

function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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
            className="rounded-md border border-primary-600 px-10 py-6"
            onSubmit={handleSubmit}
        >
            <FormGroup label="Email">
                <input
                    className="rounded-md border border-primary-500 px-2 py-3 shadow-sm"
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
                    className="rounded-md border border-primary-500 px-2 py-3 shadow-sm"
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
