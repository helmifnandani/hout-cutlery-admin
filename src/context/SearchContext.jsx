import React, { useState, createContext, useContext, useCallback } from 'react'

const SearchContext = createContext()

export function SearchProvider({ children }) {
    const [searchStates, setSearchStates] = useState({})

    const createSearchInstance = (instanceId) => {
        if (!searchStates[instanceId]) {
            setSearchStates((prev) => ({
                ...prev,
                [instanceId]: {
                    searchName: '',
                    searchItem: null,
                    isOpen: false,
                    isSelectItem: false,
                },
            }))
        }
    }
    const updateSearchState = useCallback((instanceId, updates) => {
        setSearchStates((prev) => ({
            ...prev,
            [instanceId]: {
                ...prev[instanceId],
                ...updates,
            },
        }))
    }, [])

    return (
        <SearchContext.Provider
            value={{
                searchStates,
                createSearchInstance,
                updateSearchState,
            }}
        >
            {children}
        </SearchContext.Provider>
    )
}

export function useSearch() {
    const context = useContext(SearchContext)
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider')
    }
    return context
}
