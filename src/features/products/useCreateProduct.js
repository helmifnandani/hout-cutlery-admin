import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createEditProduct } from '../../services/apiProducts'

export function useCreateProduct() {
    const queryClient = useQueryClient()
    const { isPending: isCreating, mutate: createProduct } = useMutation({
        mutationFn: ({ newProductData, id, productImages }) => {
            return createEditProduct(newProductData, id, productImages)
        },
        onSuccess: () => {
            toast.success('New Product successfully created')
            queryClient.invalidateQueries({
                queryKey: ['products'],
            })
        },
        onError: (err) => toast.error(err.message),
    })
    return { isCreating, createProduct }
}
