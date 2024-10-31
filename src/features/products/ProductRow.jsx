import { TrashIcon } from '@heroicons/react/24/outline'
import { formatCurrency } from '../../utils/helpers'
import Tag from '../../ui/Tag'
import Table from '../../ui/Table'
import { Link, useNavigate } from 'react-router-dom'
import Switch from '../../ui/Switch'
import { useEditProduct } from './useEditProduct'

const ProductRow = ({ product }) => {
    const { isEditing, editProduct } = useEditProduct()
    const {
        id: productId,
        name,
        price,
        discount,
        image = '/placeholder.png',
        product_images,
        status,
        isActive,
    } = product

    const productImage =
        product_images.find((image) => image.is_primary) || product_images[0]

    const statusToTagName = {
        ready: 'blue',
        'out-of-stock': 'red',
        'pre-order': 'green',
    }

    const onChangeStatus = () => {
        const newProduct = {
            id: productId,
            name,
            price,
            discount,
            status,
            isActive: !product.isActive,
        }

        editProduct({
            newProductData: newProduct,
            id: productId,
            productImages: product_images,
        })
    }

    return (
        <Table.Row role="row">
            <Link to={`/products/${productId}`}>
                <img
                    className="aspect-card w-16 object-cover"
                    src={
                        productImage
                            ? productImage.image_url
                            : '/placeholder.png'
                    }
                ></img>
            </Link>
            <Link to={`/products/${productId}`}>{name}</Link>
            <div className="">{formatCurrency(price)}</div>
            {discount ? (
                <div className="text-green-700">{formatCurrency(discount)}</div>
            ) : (
                <span>&mdash;</span>
            )}

            <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
            <div className="flex items-center justify-end">
                <Switch onChange={onChangeStatus} value={isActive} />
            </div>
        </Table.Row>
    )
}

export default ProductRow
