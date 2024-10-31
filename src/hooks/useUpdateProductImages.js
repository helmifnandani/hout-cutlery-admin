import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { updateProductImages } from '../services/apiImage'

export function useUpdateProductImages() {
    const queryClient = useQueryClient()
    const { isPending: isUpdating, mutate: updateProductImage } = useMutation({
        mutationFn: ({ productId, images }) => {
            return updateProductImages(productId, images)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['product'] })
        },
        onError: (err) => toast.error(err.message),
    })
    return { isUpdating, updateProductImage }
}
