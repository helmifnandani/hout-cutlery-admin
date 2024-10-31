const Tag = ({ children, type }) => {
    const statusStyles = {
        blue: 'bg-blue-700 text-blue-100',
        red: 'bg-red-700 text-red-100',
        green: 'bg-green-700 text-green-100',
    }

    return (
        <span
            className={`w-fit text-nowrap rounded-md px-3 py-1 text-xs font-semibold uppercase ${statusStyles[type]} `}
        >
            {children}
        </span>
    )
}

export default Tag
