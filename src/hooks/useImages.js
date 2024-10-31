import { useQuery } from '@tanstack/react-query'
import { getAllImages } from '../services/apiImage'

export function useImages() {
    const {
        isPending: isLoading,
        data: images,
        error,
    } = useQuery({
        queryKey: ['images'],
        queryFn: () => getAllImages(),
        retry: false,
    })
    return { isLoading, images, error }
}
