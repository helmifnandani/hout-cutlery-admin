const Select = ({ options, value, onChange, register, id, ...props }) => {
    return (
        <select
            className="rounded-md border border-primary-600 bg-accent-background px-3 py-2 text-sm font-medium shadow-sm"
            value={value}
            {...props}
            id={id}
            name={id}
            onChange={onChange}
            {...register(id, {
                required: 'This field is required',
                validate: (value) => value !== '' || 'Please select an option',
            })}
        >
            {options.map((option, index) => (
                <option value={option.value} key={index}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}

export default Select
