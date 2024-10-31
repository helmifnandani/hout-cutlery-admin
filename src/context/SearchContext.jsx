import React, { useState, createContext, useContext } from 'react'

const SearchContext = createContext()

export function SearchProvider({ children }) {
    const [searchName, setSearchName] = useState('')
    const [searchProduct, setSearchProduct] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [isSelectProduct, setIsSelectProduct] = useState(false)

    return (
        <SearchContext.Provider
            value={{
                searchProduct,
                setSearchProduct,
                isOpen,
                setIsOpen,
                searchName,
                setSearchName,
                isSelectProduct,
                setIsSelectProduct,
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
