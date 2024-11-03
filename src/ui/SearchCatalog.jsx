import React, { useState, useEffect, useRef } from 'react'
import { useSearch } from '../context/SearchContext'
import {
    useDebounce,
    useSearchCatalog,
} from '../features/catalogs/useSearchCatalog'
import FormGroup from './FormGroup'
import Input from './Input'

const SearchCatalog = ({ label, id, instanceId, setValue }) => {
    const { searchStates, createSearchInstance, updateSearchState } =
        useSearch()

    // Get this instance's state
    const instanceState = searchStates[instanceId] || {
        searchName: '',
        searchItem: null,
        isOpen: false,
        isSelectItem: false,
    }

    useEffect(() => {
        createSearchInstance(instanceId)
    }, [instanceId, createSearchInstance])

    const debouncedSearch = useDebounce(instanceState.searchName, 300) // 300ms delay
    const dropdownRef = useRef(null)
    const placeholderImg = '/placeholder.png'

    const { isLoading, catalogs, error } = useSearchCatalog(debouncedSearch)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                updateSearchState(instanceId, {
                    isOpen: false,
                })
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [updateSearchState, instanceId])

    const handleInputChange = (e) => {
        updateSearchState(instanceId, {
            searchName: e.target.value,
            isOpen: true,
            isSelectItem: false,
        })
        // Your existing search logic here
    }

    const handleSelectCatalog = (catalog) => {
        updateSearchState(instanceId, {
            searchItem: catalog,
            searchName: catalog.name,
            isOpen: false,
            isSelectItem: true,
        })
    }

    return (
        <div ref={dropdownRef} className="relative">
            {/* Search Input */}
            <div className="relative">
                <FormGroup label={label}>
                    <Input
                        type="text"
                        id={id}
                        value={instanceState.searchName}
                        onChange={handleInputChange}
                    />
                </FormGroup>
            </div>

            {/* Dropdown Results */}
            {instanceState.isOpen &&
                (instanceState.searchName || isLoading) && (
                    <div className="absolute z-50 mt-1 max-h-60 w-full -translate-y-4 overflow-y-auto rounded-md border bg-white shadow-lg">
                        {isLoading && (
                            <div className="p-4 text-center text-gray-500">
                                Searching...
                            </div>
                        )}

                        {error && (
                            <div className="p-4 text-center text-red-500">
                                Error: {error.message}
                            </div>
                        )}

                        {!isLoading && !error && catalogs?.length === 0 && (
                            <div className="p-4 text-center text-gray-500">
                                No catalogs found
                            </div>
                        )}

                        {catalogs?.map((catalog) => (
                            <button
                                key={catalog.id}
                                onClick={() => handleSelectCatalog(catalog)}
                                className="w-full px-4 py-2 text-left hover:bg-primary-600 hover:text-primary-100 focus:outline-none"
                            >
                                <div className="flex items-center gap-3">
                                    {catalog.image && (
                                        <img
                                            src={
                                                catalog.image
                                                    ? catalog.image
                                                    : placeholderImg
                                            }
                                            className="aspect-card h-24 rounded object-cover"
                                        />
                                    )}
                                    <div>
                                        <div className="font-medium">
                                            {catalog.name}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
        </div>
    )
}

export default SearchCatalog
