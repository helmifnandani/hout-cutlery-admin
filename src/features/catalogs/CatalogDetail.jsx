import { useEffect, useState } from 'react'
import { useSearch } from '../../context/SearchContext'
import { useCatalog } from './useCatalog'
import { useMoveBack } from '../../hooks/useMoveBack'
import CatalogForm from './CatalogForm'
import CatalogDetailTable from './CatalogDetailTable'
import { useImages } from '../../hooks/useImages'
import Spinner from '../../ui/Spinner'
import { CatalogProductProvider } from '../../context/CatalogProductContext'

const CatalogDetail = () => {
    const { isLoading, catalog, error } = useCatalog()
    const {
        isLoading: isLoadingImage,
        images,
        error: isErrorImage,
    } = useImages()
    const moveBack = useMoveBack()

    if (isLoading || isLoadingImage) return <Spinner />

    return (
        <>
            <CatalogProductProvider>
                <CatalogForm
                    catalog={catalog}
                    moveBack={moveBack}
                    images={images}
                />
                <CatalogDetailTable />
            </CatalogProductProvider>
        </>
    )
}

export default CatalogDetail
