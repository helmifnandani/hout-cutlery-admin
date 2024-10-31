const Form = ({ children, onSubmit }) => {
    return (
        <form
            onSubmit={onSubmit}
            className="rounded-md border border-primary-600 px-10 py-6 text-sm shadow-sm"
        >
            {children}
        </form>
    )
}

export default Form
