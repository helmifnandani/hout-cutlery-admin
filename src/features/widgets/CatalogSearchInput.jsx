import React, { useEffect } from 'react'
import Input from '../../ui/Input'
import SearchCatalog from '../../ui/SearchCatalog'
import { useSearch } from '../../context/SearchContext'

const CatalogSearchInput = ({
    isWorking,
    label,
    id,
    register,
    setValue,
    tableName,
    widget_section,
}) => {
    const { searchStates, updateSearchState } = useSearch()

    useEffect(() => {
        if (searchStates[id]?.searchItem) {
            setValue(`${id}_id`, searchStates[id]?.searchItem.id)
        }
    }, [id, searchStates, setValue])

    useEffect(() => {
        if (widget_section?.[`${id}`]?.name) {
            updateSearchState(id, {
                searchName: widget_section[`${id}`]?.name,
                isSelectItem: true,
            })
            setValue(`${id}_id`, widget_section?.[`${id}`]?.id)
        }
    }, [id, widget_section, updateSearchState, setValue])

    useEffect(() => {})

    return (
        <>
            <SearchCatalog
                label={label}
                id={id}
                instanceId={id}
                setValue={setValue}
                tableName={tableName}
            />
            <Input
                type="hidden"
                disabled={isWorking}
                id={`${id}_id`}
                register={register}
            />
        </>
    )
}

export default CatalogSearchInput
