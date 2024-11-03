import React from 'react'
import WidgetHeaderForm from './WidgetHeaderForm'
import { useMoveBack } from '../../hooks/useMoveBack'
import Button from '../../ui/Button'
import Heading from '../../ui/Heading'
import WidgetCatalogForm from './WidgetCatalogForm'
import WidgetFooterForm from './WidgetFooterForm'

const WidgetDetail = () => {
    const moveBack = useMoveBack()
    const onBack = (e) => {
        e.preventDefault()
        moveBack()
    }
    return (
        <div className="space-y-6">
            <div className="flex justify-between">
                <div className="flex items-center gap-4">
                    <Button size={'small'} onClick={(e) => onBack(e)}>
                        &larr; Back
                    </Button>
                    <Heading as="h1">Widgets</Heading>
                </div>
            </div>
            <WidgetHeaderForm />
            <WidgetCatalogForm />
            <WidgetFooterForm />
        </div>
    )
}

export default WidgetDetail
