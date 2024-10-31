import { useQuery } from '@tanstack/react-query'
import { getCatalogs } from '../../services/apiCatalogs'

export function useCatalogs() {
    const {
        isLoading,
        data: catalogs,
        error,
    } = useQuery({
        queryKey: ['catalogs'],
        queryFn: getCatalogs,
    })
    return { isLoading, catalogs, error }
}
