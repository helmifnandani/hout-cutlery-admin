import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editWidgetSection as editWidgetAPI } from '../../services/apiWidgets'
import toast from 'react-hot-toast'

export function useEditWidgetSection() {
    const queryClient = useQueryClient()
    const { isPending: isEditing, mutate: editWidgetSection } = useMutation({
        mutationFn: ({ newData, id, tableName }) => {
            return editWidgetAPI(newData, id, tableName)
        },
        onSuccess: (data) => {
            toast.success('Catalog successfully edited')
            queryClient.invalidateQueries({ queryKey: ['catalog'] })
        },
        onError: (err) => toast.error(err.message),
    })
    return { isEditing, editWidgetSection }
}
