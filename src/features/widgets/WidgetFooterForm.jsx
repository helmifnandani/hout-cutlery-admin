import { useForm } from 'react-hook-form'

import Form from '../../ui/Form'
import Button from '../../ui/Button'
import Heading from '../../ui/Heading'
import CatalogSearchInput from './CatalogSearchInput'

import { useEditWidgetSection } from './useEditFooterBanner'
import WidgetFooterGridItem from './WidgetFooterGridItem'
import { useFooterBanner } from './useFooterAPI'

const WidgetFooterForm = () => {
    const { register, handleSubmit, reset, getValues, formState, setValue } =
        useForm({
            defaultValues: {},
            values: {},
        })
    const { errors } = formState
    const tableName = 'footer_banner'
    const { isLoading, footer_banner, error } = useFooterBanner()
    const { isEditing, editWidgetSection } = useEditWidgetSection()

    const isWorking = isLoading || isEditing

    const onSubmit = (data) => {
        editWidgetSection({ newData: data, id: 1, tableName: 'footer_banner' })
    }

    const onError = (errors) => {}

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="flex justify-between">
                <div className="flex items-center gap-4">
                    <Heading as="h1">Footer Banner</Heading>
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
                label="Image 1"
                id="image_1"
                register={register}
                setValue={setValue}
                tableName={tableName}
                widget="footer_banner"
                widget_section={footer_banner}
            />
            <CatalogSearchInput
                label="Image 2"
                id="image_2"
                register={register}
                setValue={setValue}
                tableName={tableName}
                widget="footer_banner"
                widget_section={footer_banner}
            />
            <CatalogSearchInput
                label="Image 3"
                id="image_3"
                register={register}
                setValue={setValue}
                tableName={tableName}
                widget="footer_banner"
                widget_section={footer_banner}
            />
            <CatalogSearchInput
                label="Image 4"
                id="image_4"
                register={register}
                setValue={setValue}
                tableName={tableName}
                widget="footer_banner"
                widget_section={footer_banner}
            />

            <div className="flex grid-flow-col grid-cols-3 grid-rows-2 flex-col gap-4 py-6 lg:grid">
                <WidgetFooterGridItem
                    id="image_1_grid"
                    className={'row-span-2 aspect-1x1 lg:aspect-2x3'}
                />
                <WidgetFooterGridItem
                    id="image_2_grid"
                    className={'col-span-2 aspect-1x1 lg:aspect-auto'}
                />
                <WidgetFooterGridItem
                    id="image_3_grid"
                    className={'aspect-1x1 lg:aspect-auto'}
                />
                <WidgetFooterGridItem
                    id="image_4_grid"
                    className={'aspect-1x1 lg:aspect-auto'}
                />
            </div>
        </Form>
    )
}

export default WidgetFooterForm
