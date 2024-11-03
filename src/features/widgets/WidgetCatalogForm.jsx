import { useForm } from 'react-hook-form'

import Form from '../../ui/Form'
import Button from '../../ui/Button'
import Heading from '../../ui/Heading'
import CatalogSearchInput from './CatalogSearchInput'

import { useEditWidgetSection } from './useEditCatalogSection'
import { useCatalogSection } from './useCatalogSectionAPI'

const WidgetCatalogForm = () => {
    const { register, handleSubmit, reset, getValues, formState, setValue } =
        useForm({
            defaultValues: {},
            values: {},
        })
    const { errors } = formState
    const tableName = 'catalog_widget'

    const {
        isLoading: isLoadingCatalog,
        catalog_section,
        error: errorCatalog,
    } = useCatalogSection(tableName)

    const { isEditing, editWidgetSection } = useEditWidgetSection()

    const isWorking = isEditing || isLoadingCatalog

    const onSubmit = (data) => {
        editWidgetSection({ newData: data, id: 1, tableName: 'catalog_widget' })
    }

    const onError = (errors) => {}

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="flex justify-between">
                <div className="flex items-center gap-4">
                    <Heading as="h1">Collection Widget</Heading>
                </div>
                <div className="flex justify-end gap-4">
                    {/* <Button
                        variant="secondary"
                        type="button"
                        disabled={isWorking}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </Button> */}
                    <Button
                        type="submit"
                        disabled={isWorking}
                        className="btn btn-primary"
                    >
                        Save
                    </Button>
                </div>
            </div>

            <CatalogSearchInput
                label="Catalog 1"
                id="catalog_1"
                register={register}
                setValue={setValue}
                tableName={tableName}
                widget_section={catalog_section}
            />
            <CatalogSearchInput
                label="Catalog 2"
                id="catalog_2"
                register={register}
                setValue={setValue}
                tableName={tableName}
                widget_section={catalog_section}
            />
            <CatalogSearchInput
                label="Catalog 3"
                id="catalog_3"
                register={register}
                setValue={setValue}
                tableName={tableName}
                widget_section={catalog_section}
            />
        </Form>
    )
}

export default WidgetCatalogForm
