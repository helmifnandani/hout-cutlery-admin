import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getProduct } from '../../services/apiProducts'

export function useProduct() {
    const { productId } = useParams()

    const {
        isPending: isLoading,
        data: product,
        error,
    } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => getProduct(productId),
        retry: false,
    })
    return { isLoading, product, error }
}
