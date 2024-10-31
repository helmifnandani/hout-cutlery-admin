import React from 'react'

const FormGroup = ({ label, children, error, className }) => {
    return (
        <div className={`flex flex-col gap-2 py-3 ${className}`}>
            <label htmlFor={children.props.id}>{label}</label>
            {children}
            {error && <span className="text-red-500">{error}</span>}
        </div>
    )
}

export default FormGroup
