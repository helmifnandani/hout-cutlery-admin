import { useQuery } from '@tanstack/react-query'
import { getCatalogByName } from '../../services/apiCatalogs'
import { useEffect, useState } from 'react'

export function useSearchCatalog(searchName) {
    const {
        isPending: isLoading,
        data: catalogs,
        error,
    } = useQuery({
        queryKey: ['catalog', searchName],
        queryFn: () => getCatalogByName({ searchName }),
        retry: false,
        enabled: Boolean(searchName?.trim()),
        staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
        cacheTime: 1000 * 60 * 30, // Keep unused data for 30 minutes
        keepPreviousData: true, // Keep showing previous results while loading new ones
        refetchOnWindowFocus: false,
    })
    return { isLoading, catalogs, error }
}

// Optional debounce hook if not using a component library
export function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debouncedValue
}
