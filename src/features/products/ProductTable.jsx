import React from 'react'
import Table from '../../ui/Table'
import Pagination from '../../ui/Pagination'
import ProductRow from './ProductRow'
import { useProducts } from './useProducts'
import Spinner from '../../ui/Spinner'

const ProductTable = () => {
    const { isLoading, products, error } = useProducts()
    if (isLoading) return <Spinner />
    return (
        <Table columns="0.4fr 1.8fr 1fr 1fr 1.2fr 0.4fr">
            <Table.Header>
                <div></div>
                <div>Product Name</div>
                <div>Price</div>
                <div>Discount</div>
                <div>Status</div>
                <div className="text-end">Actions</div>
            </Table.Header>

            <Table.Body
                data={products}
                render={(product) => (
                    <ProductRow key={product.id} product={product} />
                )}
            />
            <Table.Footer>
                <Pagination count={products?.length} />
            </Table.Footer>
        </Table>
    )
}

export default ProductTable
