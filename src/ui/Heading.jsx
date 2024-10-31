const Heading = ({ as = 'h1', className = '', children, ...props }) => {
    const variants = {
        h1: 'text-3xl font-semibold',
        h2: 'text-xl font-semibold',
        h3: 'text-xl font-medium',
        h4: 'text-3xl font-semibold text-center',
    }

    const finalClassName = `${variants[as]} ${className}`

    const Element = as

    return (
        <Element className={finalClassName} {...props}>
            {children}
        </Element>
    )
}

export default Heading
