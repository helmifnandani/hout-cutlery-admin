import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { supabaseUrl } from '../../services/supabase'

import { useMoveBack } from '../../hooks/useMoveBack'
import { useEditProduct } from './useEditProduct'
import { useCreateProduct } from './useCreateProduct'
import { useImages } from '../../hooks/useImages'
import { useUploadImage } from '../../hooks/useUploadImage'
import { useUpdateProductImages } from '../../hooks/useUpdateProductImages'
import { useFile } from '../../context/FileContext'

import Form from '../../ui/Form'
import Input from '../../ui/Input'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import FormGroup from '../../ui/FormGroup'
import RichTextEditor from '../../ui/RichTextEditor'
import Table from '../../ui/Table'
import Heading from '../../ui/Heading'
import Modal from '../../ui/Modal'
import SelectFile from '../../ui/SelectFile'

import ProductStatus from './ProductStatus'
import ProductImageRow from './ProductImageRow'

function ProductForm({
    onCloseModal,
    productDetail,
    productImages,
    setProductImages,
}) {
    const {
        isLoading: isLoadingImage,
        images,
        error: isErrorImage,
    } = useImages()
    const { isEditing, editProduct } = useEditProduct()
    const { isCreating, createProduct } = useCreateProduct()
    const { uploadImage, isUploading } = useUploadImage()
    const { isUpdating, updateProductImage } = useUpdateProductImages()
    const { confirmedFile, setConfirmedFile } = useFile()
    const [previewUrl, setPreviewUrl] = useState(null)
    const [files, setFiles] = useState([])
    const moveBack = useMoveBack()

    const {
        id: editId,
        name,
        description,
        product_images,
        ...editValues
    } = productDetail || {}

    const isEditSession = Boolean(editId)

    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditSession ? editValues : {},
        values: productDetail,
    })
    const { errors } = formState

    const isWorking = isCreating || isEditing

    useEffect(() => {
        if (!confirmedFile) return
        if (isUpdating) return
        setProductImages((prevImages) => {
            if (prevImages) {
                const newImage = {
                    image_url: confirmedFile.url,
                    product_id: editId,
                }
                return [...prevImages, newImage]
            }
        })
    }, [
        editId,
        confirmedFile,
        setProductImages,
        isUpdating,
        updateProductImage,
        setConfirmedFile,
    ])

    const onSubmit = (data) => {
        debugger
        const productData = {
            name: data.name,
            price: Number(data.price),
            discount: Number(data.discount),
            description: data.description,
            url_shopee: data.url_shopee,
            url_tokopedia: data.url_tokopedia,
            status: data.status,
        }

        const editProductImages = [
            ...productImages.filter((image) =>
                image.image_url.startsWith?.(supabaseUrl)
            ),
            ...files,
        ]

        if (isEditSession) {
            editProduct(
                {
                    newProductData: productData,
                    id: editId,
                    productImages: editProductImages,
                },
                {
                    onSuccess: (data) => {
                        console.log(data)
                    },
                }
            )
        } else {
            createProduct(
                {
                    newProductData: productData,
                    id: null,
                    productImages: editProductImages,
                },
                {
                    onSuccess: (data) => {
                        console.log(data)
                        setProductImages([])
                        reset()
                        onCloseModal?.()
                    },
                }
            )
        }
    }

    const onError = (errors) => {}

    const handleOnChangeImage = (e) => {
        const imgFile = e.currentTarget.files[0]
        const selectedFiles = Array.from(e.currentTarget.files)
        setFiles((file) => [...file, selectedFiles[0]])
        if (imgFile && imgFile.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const newImg = {
                    image_url: reader.result,
                }
                setProductImages((prevImages) => {
                    if (!prevImages) return
                    return [...prevImages, newImg]
                })
                setPreviewUrl(reader.result)
            }
            reader.readAsDataURL(imgFile)
        }
    }

    const handleDeleteImageProduct = (id) => {
        setProductImages((prevImages) => {
            return prevImages.filter((image, index) => index !== id)
        })
    }

    const onBack = (e) => {
        e.preventDefault()
        moveBack()
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="flex justify-between">
                <div className="flex items-center gap-4">
                    <Button size={'small'} onClick={(e) => onBack(e)}>
                        &larr; Back
                    </Button>
                    <Heading as="h1">
                        {productDetail.name ? `Product ${name}` : 'Add Product'}
                    </Heading>
                </div>
                <div className="flex justify-end gap-4">
                    <Button
                        variant="secondary"
                        type="button"
                        disabled={isWorking}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isWorking}
                        className="btn btn-primary"
                    >
                        {isEditSession ? 'Edit Product' : 'Add Product'}
                    </Button>
                </div>
            </div>
            <FormGroup label="Product Name" error={errors?.name?.message}>
                <Input
                    type="text"
                    disabled={isWorking}
                    id="name"
                    register={register}
                />
            </FormGroup>

            <FormGroup label="Price" error={errors?.price?.message}>
                <Input
                    type="number"
                    disabled={isWorking}
                    id="price"
                    register={register}
                />
            </FormGroup>

            <FormGroup label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    disabled={isWorking}
                    id="discount"
                    register={register}
                    isRequired={false}
                />
            </FormGroup>

            <FormGroup label="Status" error={errors?.maxCapacity?.message}>
                <ProductStatus
                    id="status"
                    register={register}
                    options={[
                        { value: 'ready', label: 'Ready' },
                        { value: 'pre-order', label: 'Pre Order' },
                        { value: 'out-of-stock', label: 'Out of Stock' },
                    ]}
                ></ProductStatus>
            </FormGroup>

            <FormGroup label="Description" error={errors?.description?.message}>
                <RichTextEditor
                    id="description_richtext"
                    defaultValue={description}
                />
            </FormGroup>
            <Input
                type="hidden"
                disabled={isWorking}
                id="description"
                register={register}
                isRequired={false}
            />

            <FormGroup label="Shopee URL" error={errors?.url_shopee?.message}>
                <Input
                    type="text"
                    disabled={isWorking}
                    id="url_shopee"
                    register={register}
                />
            </FormGroup>

            <FormGroup
                label="Tokopedia URL"
                error={errors?.url_tokopedia?.message}
            >
                <Input
                    type="text"
                    disabled={isWorking}
                    id="url_tokopedia"
                    register={register}
                />
            </FormGroup>
            <FormGroup label="Images">
                <Table columns="1.8fr 0.4fr">
                    <Table.Header>
                        <div className="text-xs">Image</div>
                        <div className="text-end text-xs">Actions</div>
                    </Table.Header>

                    <Table.Body
                        type="image"
                        data={productImages}
                        render={(image, index) => (
                            <ProductImageRow
                                key={index}
                                image={image}
                                index={index}
                                handleDeleteImageProduct={
                                    handleDeleteImageProduct
                                }
                            />
                        )}
                    >
                        <Table.Row role="row">
                            <div className="col-span-full space-y-2">
                                <FileInput
                                    id="image"
                                    onChange={handleOnChangeImage}
                                />

                                {images?.length > 0 && (
                                    <div className="w-full">
                                        <Modal>
                                            <Modal.Open opens="image">
                                                <Button width={'full'}>
                                                    Select File from Server
                                                </Button>
                                            </Modal.Open>
                                            <Modal.Window name="image">
                                                <SelectFile list={images} />
                                            </Modal.Window>
                                        </Modal>
                                    </div>
                                )}
                            </div>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </FormGroup>
        </Form>
    )
}

export default ProductForm
