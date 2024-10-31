import Select from '../../ui/Select'

const ProductStatus = ({ options, value, id, register }) => {
    return (
        <Select
            register={register}
            type="white"
            options={options}
            value={value}
            id={id}
        ></Select>
    )
}

export default ProductStatus
