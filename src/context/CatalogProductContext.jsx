import { createContext, useContext, useEffect, useState } from 'react'
import { useModal } from '../ui/Modal'
import { useCatalog } from '../features/catalogs/useCatalog'

const CatalogProductContext = createContext()

const CatalogProductProvider = ({ children }) => {
    const [catalogProducts, setCatalogProducts] = useState([])

    const { isLoading, catalog, error } = useCatalog()

    useEffect(() => {
        if (!catalog?.products) return
        setCatalogProducts(catalog.products)
    }, [catalog])

    const handleDeleteProduct = (id) => {
        setCatalogProducts((product) => {
            return product.filter((item) => item.id !== id)
        })
    }

    return (
        <CatalogProductContext.Provider
            value={{
                catalogProducts,
                setCatalogProducts,
                handleDeleteProduct,
            }}
        >
            {children}
        </CatalogProductContext.Provider>
    )
}

function useCatalogProduct() {
    const context = useContext(CatalogProductContext)
    if (context === undefined)
        throw new Error(
            'CatalogProductContext was used outside of CatalogProductProvider'
        )
    return context
}

export { CatalogProductProvider, useCatalogProduct }
