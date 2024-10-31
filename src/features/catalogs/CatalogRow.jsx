import { TrashIcon } from '@heroicons/react/24/outline'
import { formatCurrency } from '../../utils/helpers'
import Tag from '../../ui/Tag'
import Table from '../../ui/Table'
import { Link, useNavigate } from 'react-router-dom'
import Switch from '../../ui/Switch'
import { useEditCatalog } from './useEditCatalog'

const CatalogRow = ({ catalog }) => {
    const { isEditing, editCatalog } = useEditCatalog()
    const {
        id: catalogId,
        name,
        image = '/placeholder.png',
        isActive,
    } = catalog

    const onChangeStatus = () => {
        const newCatalog = {
            id: catalogId,
            name,
            isActive: !catalog.isActive,
        }

        editCatalog({ newCatalogData: newCatalog, id: catalogId })
    }
    return (
        <Table.Row role="row">
            <Link to={`/catalogs/${catalogId}`}>
                <img
                    className="aspect-card w-16 object-cover"
                    src={image}
                ></img>
            </Link>
            <Link to={`/catalogs/${catalogId}`}>{name}</Link>
            <div className="flex items-center justify-end">
                <Switch onChange={onChangeStatus} value={isActive} />
            </div>
        </Table.Row>
    )
}

export default CatalogRow
