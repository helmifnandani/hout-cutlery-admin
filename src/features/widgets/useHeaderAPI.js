import { useQuery } from '@tanstack/react-query'
import { getHeader } from '../../services/apiWidgets'

export function useHeader() {
    const {
        isPending: isLoading,
        data: header,
        error,
    } = useQuery({
        queryKey: ['header', 1],
        queryFn: () => getHeader(1),
        retry: false,
    })
    return { isLoading, header, error }
}
