import React from 'react'
import Table from '../../ui/Table'
import { TrashIcon } from '@heroicons/react/24/solid'
import Button from '../../ui/Button'

const ProductImageRow = ({ image, handleDeleteImageProduct, index }) => {
    return (
        <>
            <Table.Row role="row">
                <img
                    src={image.image_url}
                    className="aspect-card w-40 object-cover"
                />
                <div className="flex items-center justify-end">
                    <Button
                        size={'small'}
                        variant={'secondary'}
                        onClick={(e) => {
                            e.preventDefault()
                            handleDeleteImageProduct(index)
                        }}
                    >
                        <TrashIcon className="size-5" />
                    </Button>
                </div>
            </Table.Row>
        </>
    )
}

export default ProductImageRow
