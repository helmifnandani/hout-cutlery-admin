import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getCatalog } from '../../services/apiCatalogs'

export function useCatalog() {
    const { catalogId } = useParams()

    const {
        isPending: isLoading,
        data: catalog,
        error,
    } = useQuery({
        queryKey: ['catalog', catalogId],
        queryFn: () => getCatalog(catalogId),
        retry: false,
    })
    return { isLoading, catalog, error }
}
