import React from 'react'
import { useCatalogs } from './useCatalogs'
import Table from '../../ui/Table'
import Pagination from '../../ui/Pagination'
import CatalogRow from './CatalogRow'
import Spinner from '../../ui/Spinner'

const CatalogTable = () => {
    const { isLoading, catalogs, error } = useCatalogs()
    if (isLoading) return <Spinner />
    return (
        <Table columns="0.4fr 1.8fr 0.4fr">
            <Table.Header>
                <div></div>
                <div>Catalog Name</div>
                <div className="text-end">Actions</div>
            </Table.Header>

            <Table.Body
                data={catalogs}
                render={(catalog) => (
                    <CatalogRow key={catalog.id} catalog={catalog} />
                )}
            />
            <Table.Footer>
                <Pagination count={catalogs?.length} />
            </Table.Footer>
        </Table>
    )
}

export default CatalogTable
