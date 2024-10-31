import supabase, { supabaseUrl } from './supabase'

// Fetch images from all buckets
const getAllImages = async (bucketNames = ['products', 'catalogs']) => {
    try {
        // Fetch from each bucket and combine results
        const bucketsPromises = bucketNames.map(async (bucketName) => {
            const { data, error } = await supabase.storage
                .from(bucketName)
                .list()

            if (error) throw error

            // Add bucket name to each file object
            return data.map((file) => ({
                ...file,
                bucketName,
                // Add full URL
                url: `${supabase.storage.from(bucketName).getPublicUrl(file.name).data.publicUrl}`,
            }))
        })

        // Wait for all bucket fetches to complete
        const allBucketsData = await Promise.all(bucketsPromises)

        // Flatten the array of arrays into a single array
        const combinedData = allBucketsData.flat()

        return combinedData
    } catch (error) {
        console.error('Error fetching images:', error)
        return { data: null, error }
    }
}

// Fetch images from specific folder in buckets
const fetchImagesFromFolder = async (
    folderPath,
    bucketNames = ['bucket1', 'bucket2']
) => {
    try {
        const bucketsPromises = bucketNames.map(async (bucketName) => {
            const { data, error } = await supabase.storage
                .from(bucketName)
                .list(folderPath)

            if (error) throw error

            return data.map((file) => ({
                ...file,
                bucketName,
                url: `${supabase.storage.from(bucketName).getPublicUrl(`${folderPath}/${file.name}`).data.publicUrl}`,
            }))
        })

        const allBucketsData = await Promise.all(bucketsPromises)
        const combinedData = allBucketsData.flat()

        return combinedData
    } catch (error) {
        console.error('Error fetching images from folder:', error)
        return { data: null, error }
    }
}

// Upload image to specific bucket
const uploadImage = async (file, bucketName, folderPath = '') => {
    try {
        const imageName = `${Math.random()}-${file.name}`.replaceAll('/', '')

        const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(imageName, file)

        if (error) throw error

        const { data: publicUrlData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(imageName)

        return {
            data: {
                ...data,
                publicUrl: publicUrlData.publicUrl,
            },
            error: null,
        }
    } catch (error) {
        console.error('Error uploading image:', error)
        return { data: null, error }
    }
}

const deleteProductImages = async (productId) => {
    const { error: deleteError } = await supabase
        .from('product_images')
        .delete()
        .eq('product_id', productId)

    if (deleteError) throw deleteError
}

const updateProductImages = async (productId, images) => {
    // First, remove all existing relationships
    const { error: deleteError } = await supabase
        .from('product_images')
        .delete()
        .eq('product_id', productId)

    if (deleteError) throw deleteError

    // Then, insert new relationships
    const relationships = images.map((image) => {
        return {
            image_url: image.image_url,
            product_id: productId,
        }
    })

    const { data, error: insertError } = await supabase
        .from('product_images')
        .insert(relationships)
        .select()

    if (insertError) throw insertError

    return data
}

export {
    getAllImages,
    fetchImagesFromFolder,
    uploadImage,
    updateProductImages,
    deleteProductImages,
}
