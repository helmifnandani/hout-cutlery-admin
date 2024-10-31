import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { deleteProductImages } from '../services/apiImage'

export function useDeleteProductImages() {
    const queryClient = useQueryClient()
    const { isPending: isDeleting, mutate: deleteProductImage } = useMutation({
        mutationFn: ({ productId, images }) => {
            return deleteProductImages(productId, images)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['product'] })
        },
        onError: (err) => toast.error(err.message),
    })
    return { isDeleting, deleteProductImage }
}
