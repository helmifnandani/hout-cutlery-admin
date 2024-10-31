import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createEditCatalog } from '../../services/apiCatalogs'

export function useCreateCatalog() {
    const queryClient = useQueryClient()
    const { isPending: isCreating, mutate: createCatalog } = useMutation({
        mutationFn: ({ newCatalogData, id, productData, imgFile }) => {
            return createEditCatalog(newCatalogData, id, productData, imgFile)
        },
        onSuccess: () => {
            toast.success('New Catalog successfully created')
            queryClient.invalidateQueries({
                queryKey: ['catalogs'],
            })
        },
        onError: (err) => toast.error(err.message),
    })
    return { isCreating, createCatalog }
}
