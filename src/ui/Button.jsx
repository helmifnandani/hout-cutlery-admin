import { Link } from 'react-router-dom'

const Button = ({ onClick, size, type, children, variant, width, to }) => {
    let buttonClass = 'rounded-md shadow-sm transition-all duration-300'
    let sizeClass = 'text-sm py-3 px-4'
    switch (size) {
        case 'xsmall':
            sizeClass = 'text-xs py-1 px-2'
            break
        case 'small':
            sizeClass = 'text-sm py-2 px-3'
            break
        case 'large':
            sizeClass = 'text-base py-3 px-4'
            break
        default:
            break
    }

    let variantClass = 'bg-primary-600 hover:bg-primary-700 text-white'
    switch (variant) {
        case 'secondary':
            variantClass =
                ' text-primary-600 border-primary-600 border-2 hover:bg-primary-300'
            break
        default:
            break
    }

    let widthClass = ''
    switch (width) {
        case 'full':
            widthClass = 'w-full'
            break
        default:
            break
    }

    return (
        <>
            {type === 'link' ? (
                <Link
                    to={to}
                    className={`${buttonClass} ${sizeClass} ${variantClass} ${widthClass}`}
                >
                    {children}
                </Link>
            ) : (
                <button
                    type={type}
                    onClick={onClick}
                    className={`${buttonClass} ${sizeClass} ${variantClass} ${widthClass}`}
                >
                    {children}
                </button>
            )}
        </>
    )
}

export default Button
