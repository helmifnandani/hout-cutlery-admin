import { useQuery } from '@tanstack/react-query'
import { getProductByName } from '../../services/apiProducts'
import { useEffect, useState } from 'react'

export function useSearchProduct(searchName) {
    const {
        isPending: isLoading,
        data: products,
        error,
    } = useQuery({
        queryKey: ['product', searchName],
        queryFn: () => getProductByName({ searchName }),
        retry: false,
        enabled: Boolean(searchName?.trim()),
        staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
        cacheTime: 1000 * 60 * 30, // Keep unused data for 30 minutes
        keepPreviousData: true, // Keep showing previous results while loading new ones
        refetchOnWindowFocus: false,
    })
    return { isLoading, products, error }
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
