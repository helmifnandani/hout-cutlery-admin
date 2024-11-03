import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TrashIcon } from '@heroicons/react/24/outline'

import { useImages } from '../../hooks/useImages'
import { useFile } from '../../context/FileContext'

import Form from '../../ui/Form'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import FormGroup from '../../ui/FormGroup'
import Heading from '../../ui/Heading'
import Modal from '../../ui/Modal'
import SelectFile from '../../ui/SelectFile'
import { useHeader } from './useHeaderAPI'
import { useEditHeader } from './useEditHeader'

const WidgetHeaderForm = () => {
    const {
        isLoading: isLoadingImage,
        images,
        error: isErrorImage,
    } = useImages()
    const { isLoading, header, error } = useHeader()
    const { isEditing, editHeader } = useEditHeader()
    const { confirmedFile } = useFile()
    const [headerImage, setHeaderImage] = useState()
    const [headerImageFile, setHeaderImageFile] = useState()

    const { id: headerId, ...editValues } = header || {}

    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: editValues,
        values: header,
    })
    const { errors } = formState

    const isWorking = isLoading || isEditing || isLoadingImage

    useEffect(() => {
        setHeaderImage(
            confirmedFile || (header?.image ? { url: header?.image } : null)
        )
    }, [header, confirmedFile])

    const onSubmit = (data) => {
        const headerData = {
            heading: data.heading,
            subheading: data.subheading,
            description: data.description,
            catalog_url: data.catalog_url,
            image: headerImage.url,
        }

        const imgFile = headerImageFile

        editHeader({
            newHeaderData: headerData,
            id: data.id,
            headerImage: imgFile,
        })
    }

    const onError = (errors) => {}

    const handleOnChangeImage = (e) => {
        const imgFile = e.currentTarget.files[0]
        setHeaderImageFile(imgFile)
        if (imgFile && imgFile.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const newImg = {
                    url: reader.result,
                }
                setHeaderImage(newImg)
            }
            reader.readAsDataURL(imgFile)
        }
    }

    const handleDeleteImage = (e) => {
        e.preventDefault()
        setHeaderImage(null)
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="flex justify-between">
                <div className="flex items-center gap-4">
                    <Heading as="h1">Header Banner</Heading>
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
            <FormGroup label="Heading" error={errors?.heading?.message}>
                <Input
                    type="text"
                    disabled={isWorking}
                    id="heading"
                    register={register}
                />
            </FormGroup>
            <FormGroup label="Subheading" error={errors?.subheading?.message}>
                <Input
                    type="text"
                    disabled={isWorking}
                    id="subheading"
                    register={register}
                />
            </FormGroup>
            <FormGroup label="Description" error={errors?.description?.message}>
                <Input
                    type="text"
                    disabled={isWorking}
                    id="description"
                    register={register}
                />
            </FormGroup>
            <FormGroup label="Catalog URL" error={errors?.catalog_url?.message}>
                <Input
                    type="text"
                    disabled={isWorking}
                    id="catalog_url"
                    register={register}
                />
            </FormGroup>

            <FormGroup label="Image">
                {headerImage?.url ? (
                    <>
                        <div className="relative my-3 aspect-1x1 h-96 overflow-hidden rounded-md">
                            <img
                                src={headerImage.url}
                                className="absolute left-0 top-0 aspect-1x1 h-96 object-cover"
                            />
                            <div className="absolute left-0 top-0 flex aspect-1x1 h-96 items-center justify-center gap-6 bg-black bg-opacity-40 text-center opacity-0 transition-all duration-300 hover:opacity-100">
                                <Button onClick={(e) => handleDeleteImage(e)}>
                                    <TrashIcon className="size-8" />
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <FileInput
                        className="aspect-1x1 !h-96 !w-auto"
                        id="image"
                        onChange={handleOnChangeImage}
                    />
                )}
            </FormGroup>

            <div className="w-96">
                <Modal>
                    <Modal.Open opens="image">
                        <Button width={'full'}>Select File from Server</Button>
                    </Modal.Open>
                    <Modal.Window name="image">
                        <SelectFile list={images} />
                    </Modal.Window>
                </Modal>
            </div>
        </Form>
    )
}

export default WidgetHeaderForm
