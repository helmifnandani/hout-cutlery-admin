import { useCatalogProduct } from '../../context/CatalogProductContext'
import Table from '../../ui/Table'
import CatalogProductRow from './CatalogProductRow'

const CatalogDetailTable = () => {
    const { catalogProducts } = useCatalogProduct()
    return (
        <Table columns="0.2fr 1.8fr 0.4fr">
            <Table.Header>
                <div></div>
                <div>Product Name</div>
                <div className="text-end">Actions</div>
            </Table.Header>

            <Table.Body
                data={catalogProducts}
                render={(product) => (
                    <CatalogProductRow key={product.id} product={product} />
                )}
            />
        </Table>
    )
}

export default CatalogDetailTable
