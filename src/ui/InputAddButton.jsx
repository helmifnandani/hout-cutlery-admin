import React, { forwardRef } from 'react'
import Button from './Button'

const InputAddButton = forwardRef(
    (
        {
            type = 'text',
            disabled = false,
            id,
            onAdd,
            defaultValue, // Changed from value to defaultValue for uncontrolled input
            className = '',
            ...props
        },
        ref
    ) => {
        return (
            <div className="flex w-full items-center justify-between gap-4">
                <input
                    ref={ref}
                    type={type}
                    disabled={disabled}
                    id={id}
                    defaultValue={defaultValue}
                    className={`flex-1 rounded-md border border-primary-700 px-3 py-2 shadow-sm ${className}`}
                    {...props}
                />
                <Button size="small" onClick={onAdd}>
                    Add Product
                </Button>
            </div>
        )
    }
)

InputAddButton.displayName = 'InputAddButton'

export default InputAddButton
