import React from 'react'

const Switch = ({ value, onChange, label }) => {
    return (
        <label className="inline-flex cursor-pointer items-center">
            <input
                type="checkbox"
                className="peer sr-only"
                value={value}
                onChange={onChange}
                checked={value}
            />
            <div className="peer relative h-6 w-11 rounded-full bg-primary-300 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-primary-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-600 peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"></div>
            {label && (
                <span className="text-primary-900 ms-3 text-sm font-medium">
                    {label}
                </span>
            )}
        </label>
    )
}

export default Switch
