import { useQuery } from '@tanstack/react-query'
import { getFooterBanner } from '../../services/apiWidgets'

export function useFooterBanner(tableName) {
    const {
        isPending: isLoading,
        data: footer_banner,
        error,
    } = useQuery({
        queryKey: ['footer', 1],
        queryFn: () => getFooterBanner(1, 'footer_banner'),
        retry: false,
    })
    return { isLoading, footer_banner, error }
}
