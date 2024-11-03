import React, { useState, useEffect, useRef } from 'react'
import { useSearch } from '../context/SearchContext'
import {
    useDebounce,
    useSearchProduct,
} from '../features/products/useSearchProduct'
import InputAddButton from './InputAddButton'
import FormGroup from './FormGroup'
import { useCatalogProduct } from '../context/CatalogProductContext'

const SearchDropdown = () => {
    const {
        searchItem,
        setSearchItem,
        isOpen,
        setIsOpen,
        searchName,
        setSearchName,
        isSelectItem,
        setIsSelectItem,
    } = useSearch()
    const { setCatalogProducts } = useCatalogProduct()
    const debouncedSearch = useDebounce(searchName, 300) // 300ms delay
    const dropdownRef = useRef(null)
    const placeholderImg = '/placeholder.png'

    const { isLoading, products, error } = useSearchProduct(debouncedSearch)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [setIsOpen])

    // Open dropdown when typing
    useEffect(() => {
        if (!isSelectItem && searchName) {
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }
    }, [searchName, setIsOpen, isSelectItem])

    const handleInputChange = (e) => {
        setSearchName(e.target.value)
        setIsSelectItem(false)
        setIsOpen(true)
    }

    const handleSelectProduct = (product) => {
        setSearchItem(product)
        setIsSelectItem(true)
        setSearchName(product.name)
        setIsOpen(false)
    }

    const handleAddProduct = (e, product) => {
        e.preventDefault()
        const newProduct = {
            id: searchItem.id,
            name: searchItem.name,
            images: searchItem.product_images,
        }
        setCatalogProducts((prevCatalog) => {
            if (
                prevCatalog?.length > 0 &&
                prevCatalog.some((p) => p.id === newProduct.id)
            ) {
                return prevCatalog
            }
            return [...prevCatalog, newProduct]
        })
        setSearchName('')
        setIsOpen(false)
    }

    return (
        <div className="relative">
            {/* Search Input */}
            <div className="relative">
                <FormGroup label="Catalog Products">
                    <InputAddButton
                        type="text"
                        id="addProduct"
                        value={searchName}
                        onChange={handleInputChange}
                        onAdd={handleAddProduct}
                    />
                </FormGroup>
            </div>

            {/* Dropdown Results */}
            {isOpen && (searchName || isLoading) && (
                <div className="absolute z-50 mt-1 max-h-60 w-full translate-y-4 overflow-y-auto rounded-md border bg-white shadow-lg">
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

                    {!isLoading && !error && products?.length === 0 && (
                        <div className="p-4 text-center text-gray-500">
                            No products found
                        </div>
                    )}

                    {products?.map((product) => (
                        <button
                            key={product.id}
                            onClick={() => handleSelectProduct(product)}
                            className="w-full px-4 py-2 text-left hover:bg-primary-600 hover:text-primary-100 focus:outline-none"
                        >
                            <div className="flex items-center gap-3">
                                {product.product_images && (
                                    <img
                                        src={
                                            product.product_images[0]?.image_url
                                                ? product.product_images[0]
                                                      .image_url
                                                : placeholderImg
                                        }
                                        className="aspect-card h-24 rounded object-cover"
                                    />
                                )}
                                <div>
                                    <div className="font-medium">
                                        {product.name}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        ${product.price}
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

export default SearchDropdown
