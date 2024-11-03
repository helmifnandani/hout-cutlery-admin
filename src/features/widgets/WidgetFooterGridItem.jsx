import React, { useEffect, useState } from 'react'
import { useSearch } from '../../context/SearchContext'
import { useFooterBanner } from './useFooterAPI'

const WidgetFooterGridItem = ({ id, className }) => {
    const { isLoading, footer_banner, error } = useFooterBanner()

    const [imageUrl, setImageUrl] = useState()

    useEffect(() => {
        if (footer_banner) {
            const gridId = id.split('_grid')[0]
            setImageUrl(footer_banner[gridId.split('_grid')[0]]?.image)
        }
    }, [footer_banner, id])
    return (
        <div className={`relative ${className}`}>
            <img
                className="absolute left-0 top-0 h-full w-full object-cover"
                src={imageUrl || '/placeholder.png'}
            />
        </div>
    )
}

export default WidgetFooterGridItem
