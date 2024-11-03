import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TrashIcon } from '@heroicons/react/24/outline'

import { useFile } from '../../context/FileContext'
import { useCatalogProduct } from '../../context/CatalogProductContext'
import { useCreateCatalog } from './useCreateCatalog'
import { useEditCatalog } from './useEditCatalog'
import { useUpdateCatalogProduct } from './useUpdateCatalogProduct'

import Form from '../../ui/Form'
import Input from '../../ui/Input'
import Heading from '../../ui/Heading'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import FormGroup from '../../ui/FormGroup'
import SelectFile from '../../ui/SelectFile'
import Modal from '../../ui/Modal'
import SearchDropdown from '../../ui/SearchDropdown'

const CatalogForm = ({ catalog = {}, onCloseModal, moveBack, images }) => {
    const { isCreating, createCatalog } = useCreateCatalog()
    const { isEditing, editCatalog } = useEditCatalog()
    const { isUpdating, updateCatalogProduct } = useUpdateCatalogProduct()
    const { catalogProducts, setCatalogProducts } = useCatalogProduct()
    const [catalogImage, setCatalogImage] = useState()
    const [catalogImageFile, setCatalogImageFile] = useState()
    const { confirmedFile, setConfirmedFile } = useFile()

    const {
        id: editId,
        name,
        description,
        image,
        ...editValues
    } = catalog || {}

    const onBack = (e) => {
        e.preventDefault()
        moveBack()
    }

    const onCancel = (e) => {
        e.preventDefault()
        setCatalogProducts([])
        setCatalogImage(null)
        reset()
    }

    const isEditSession = Boolean(editId)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: catalog?.name || '',
            description: catalog?.description || '',
            image: catalog?.image || '',
        },
        values: catalog,
    })

    const isWorking = isCreating || isEditing

    useEffect(() => {
        setCatalogImage(
            confirmedFile || (catalog.image ? { url: catalog.image } : null)
        )
    }, [catalog.image, confirmedFile])

    const handleOnChangeImage = (e) => {
        const imgFile = e.currentTarget.files[0]
        setCatalogImageFile(imgFile)
        if (imgFile && imgFile.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const newImg = {
                    url: reader.result,
                }
                setCatalogImage(newImg)
            }
            reader.readAsDataURL(imgFile)
        }
    }

    const handleDeleteImage = () => {
        setCatalogImage(null)
    }

    const onSubmit = (data) => {
        const catalogData = {
            name: data.name,
            description: data.description,
            image: catalogImage.url,
        }

        const productData = catalogProducts
        const imgFile = catalogImageFile

        if (isEditSession)
            editCatalog(
                {
                    newCatalogData: catalogData,
                    id: editId,
                    productData,
                    imgFile,
                },
                {
                    onSuccess: (data) => {
                        console.log(data)
                        updateCatalogProduct({
                            catalogId: editId,
                            productIds: productData,
                        })
                    },
                }
            )
        else
            createCatalog(
                { newCatalogData: catalogData, id: null, productData, imgFile },
                {
                    onSuccess: (data) => {
                        console.log(data)
                        setCatalogProducts([])
                        setCatalogImage(null)
                        reset()
                        onCloseModal?.()
                    },
                }
            )
    }

    const onError = (errors) => {}

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button size={'small'} onClick={(e) => onBack(e)}>
                        &larr; Back
                    </Button>
                    <Heading as="h1">
                        {catalog.name
                            ? `Catalog ${catalog.name}`
                            : 'Add Catalog'}
                    </Heading>
                </div>
                <div className="flex justify-end gap-4">
                    <Button
                        variant="secondary"
                        type="button"
                        disabled={isWorking}
                        className="btn btn-secondary"
                        onClick={(e) => onCancel(e)}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isWorking}
                        className="btn btn-primary"
                    >
                        {isEditSession ? 'Edit Catalog' : 'Add Catalog'}
                    </Button>
                </div>
            </div>
            <FormGroup label="Catalog Name" error={errors?.name?.message}>
                <Input
                    type="text"
                    disabled={isWorking}
                    id="name"
                    register={register}
                />
            </FormGroup>
            <FormGroup
                label="Catalog Description"
                error={errors?.description?.message}
            >
                <Input
                    type="text"
                    disabled={isWorking}
                    id="description"
                    register={register}
                />
            </FormGroup>

            {catalogImage?.url ? (
                <>
                    <div className="relative my-3 aspect-4x1 h-96 w-full overflow-hidden rounded-md">
                        <img
                            src={catalogImage.url}
                            className="absolute left-0 top-0 aspect-4x1 h-96 object-cover"
                        />
                        <div className="absolute left-0 top-0 flex aspect-4x1 h-full w-full items-center justify-center gap-6 bg-black bg-opacity-40 text-center opacity-0 transition-all duration-300 hover:opacity-100">
                            <Button onClick={handleDeleteImage}>
                                <TrashIcon className="size-8" />
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <FormGroup label="Images">
                    <FileInput id="image" onChange={handleOnChangeImage} />
                </FormGroup>
            )}

            <div className="w-full">
                <Modal>
                    <Modal.Open opens="image">
                        <Button width={'full'}>Select File from Server</Button>
                    </Modal.Open>
                    <Modal.Window name="image">
                        <SelectFile list={images} />
                    </Modal.Window>
                </Modal>
            </div>

            <SearchDropdown />
        </Form>
    )
}

export default CatalogForm
