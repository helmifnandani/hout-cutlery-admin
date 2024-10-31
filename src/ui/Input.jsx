import React, { forwardRef } from 'react'

const Input = forwardRef(
    (
        {
            type = 'text',
            disabled = false,
            id,
            className = '',
            register,
            isRequired,
            ...props
        },
        ref
    ) => {
        return (
            <input
                ref={ref}
                type={type}
                disabled={disabled}
                id={id}
                className={`rounded-md border border-primary-700 px-3 py-2 shadow-sm ${className}`}
                {...register(`${id}`, {
                    required: isRequired ? 'This field is required' : false,
                })}
                {...props}
            />
        )
    }
)

Input.displayName = 'Input'

export default Input
