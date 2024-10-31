import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCatalogProducts } from '../../services/apiCatalogs'
import toast from 'react-hot-toast'

export function useUpdateCatalogProduct() {
    const queryClient = useQueryClient()
    const { isPending: isUpdating, mutate: updateCatalogProduct } = useMutation(
        {
            mutationFn: ({ catalogId, productIds }) => {
                return updateCatalogProducts(catalogId, productIds)
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries({ queryKey: ['catalogs'] })
            },
            onError: (err) => toast.error(err.message),
        }
    )
    return { isUpdating, updateCatalogProduct }
}
