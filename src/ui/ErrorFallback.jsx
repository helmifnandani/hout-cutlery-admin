import Button from './Button'

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
        <>
            <main className="bg-accent-background flex h-screen items-center justify-center p-12">
                <div className="border-primary-700 p-12 text-center">
                    <h1 className="text-3xl">Someting went wrong</h1>
                    <p className="mb-6 text-xl">{error.message}</p>
                    <Button size="large" onClick={resetErrorBoundary}>
                        Try Again
                    </Button>
                </div>
            </main>
        </>
    )
}

export default ErrorFallback
