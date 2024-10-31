import { useProduct } from './useProduct'
import ProductForm from './ProductForm'
import { useEffect, useState } from 'react'
import Spinner from '../../ui/Spinner'

const ProductDetail = () => {
    const { isLoading, product, error } = useProduct()
    const [productImages, setProductImages] = useState([])

    useEffect(() => {
        if (!product) return
        setProductImages(product.product_images)
    }, [product])

    if (isLoading) return <Spinner />
    return (
        <ProductForm
            productDetail={product}
            productImages={productImages}
            setProductImages={setProductImages}
        />
    )
}

export default ProductDetail
