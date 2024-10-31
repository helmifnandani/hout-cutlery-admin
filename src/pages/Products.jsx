import React from 'react'
import ProductTable from '../features/products/ProductTable'
import Button from '../ui/Button'
import Heading from '../ui/Heading'
import { Link } from 'react-router-dom'

const Products = () => {
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading as="h1">Products</Heading>
                <Button type="link" to="/products/product">
                    Add New Product
                </Button>
            </div>
            <ProductTable />
        </>
    )
}

export default Products
