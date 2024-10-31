import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEditCatalog } from '../../services/apiCatalogs'
import toast from 'react-hot-toast'

export function useEditCatalog() {
    const queryClient = useQueryClient()
    const { isPending: isEditing, mutate: editCatalog } = useMutation({
        mutationFn: ({ newCatalogData, id, productData, imgFile }) => {
            return createEditCatalog(newCatalogData, id, productData, imgFile)
        },
        onSuccess: (data) => {
            toast.success('Catalog successfully edited')
            queryClient.invalidateQueries({ queryKey: ['catalogs'] })
        },
        onError: (err) => toast.error(err.message),
    })
    return { isEditing, editCatalog }
}
