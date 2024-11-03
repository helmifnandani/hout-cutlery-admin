import { useQuery } from '@tanstack/react-query'
import { getCatalogSection } from '../../services/apiWidgets'

export function useCatalogSection(tableName) {
    const {
        isPending: isLoading,
        data: catalog_section,
        error,
    } = useQuery({
        queryKey: ['catalog', 1],
        queryFn: () => getCatalogSection(1, tableName),
        retry: false,
    })
    return { isLoading, catalog_section, error }
}
