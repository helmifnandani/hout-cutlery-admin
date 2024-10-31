import { TrashIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { Link } from 'react-router-dom'
import Table from '../../ui/Table'
import Button from '../../ui/Button'
import { useCatalogProduct } from '../../context/CatalogProductContext'

const CatalogProductRow = ({ product }) => {
    const { name, images, id } = product
    const { handleDeleteProduct } = useCatalogProduct()
    const placeholderImg = '/placeholder.png'
    return (
        <Table.Row role="row">
            <div>
                <img
                    className="aspect-card w-16 object-cover"
                    src={
                        images.length > 0 ? images[0].image_url : placeholderImg
                    }
                ></img>
            </div>
            <div>{name}</div>
            <div className="flex items-center justify-end">
                <Button
                    size={'small'}
                    variant={'secondary'}
                    onClick={() => handleDeleteProduct(id)}
                >
                    <TrashIcon className="size-5" />
                </Button>
            </div>
        </Table.Row>
    )
}

export default CatalogProductRow
