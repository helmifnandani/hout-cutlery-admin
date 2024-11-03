import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editHeader as editHeaderAPI } from '../../services/apiWidgets'
import toast from 'react-hot-toast'

export function useEditHeader() {
    const queryClient = useQueryClient()
    const { isPending: isEditing, mutate: editHeader } = useMutation({
        mutationFn: ({ newHeaderData, id, headerImage }) => {
            return editHeaderAPI(newHeaderData, id, headerImage)
        },
        onSuccess: (data) => {
            toast.success('Header successfully edited')
            queryClient.invalidateQueries({ queryKey: ['header'] })
        },
        onError: (err) => toast.error(err.message),
    })
    return { isEditing, editHeader }
}
