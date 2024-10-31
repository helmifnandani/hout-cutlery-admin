import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { uploadImage as uploadImageAPI } from '../services/apiImage'

export function useUploadImage() {
    const queryClient = useQueryClient()
    const { isPending: isUploading, mutate: uploadImage } = useMutation({
        mutationFn: ({ file, bucketName, folderPath, id }) =>
            uploadImageAPI(file, bucketName, folderPath, id),
        onSuccess: (data) => {
            toast.success('Image successfully uploaded')
            queryClient.invalidateQueries({
                queryKey: ['cabins'],
            })
        },
        onError: (err) => toast.error(err.message),
    })
    return { isUploading, uploadImage }
}
