import React from 'react'
import CatalogTable from '../features/catalogs/CatalogTable'
import Heading from '../ui/Heading'
import Button from '../ui/Button'

const Catalogs = () => {
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading as="h1">Catalogs</Heading>
                <Button type="link" to="/catalogs/catalog">
                    Add New Catalog
                </Button>
            </div>
            <CatalogTable />
        </>
    )
}

export default Catalogs
