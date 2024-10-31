import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEditProduct } from '../../services/apiProducts'
import toast from 'react-hot-toast'

export function useEditProduct() {
    const queryClient = useQueryClient()
    const { isPending: isEditing, mutate: editProduct } = useMutation({
        mutationFn: ({ newProductData, id, productImages }) => {
            return createEditProduct(newProductData, id, productImages)
        },
        onSuccess: (data) => {
            toast.success('Product successfully edited')
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
        onError: (err) => toast.error(err.message),
    })
    return { isEditing, editProduct }
}
