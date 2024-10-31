import supabase, { supabaseUrl } from './supabase'

const getProducts = async () => {
    const { data, error } = await supabase
        .from('products')
        .select(`*,product_images(*)`)

    if (error) {
        console.error(error)
        throw new Error('Products could not be loaded')
    }

    return data
}

const getProduct = async (id) => {
    if (id === 'product') return {}
    const { data, error } = await supabase
        .from('products')
        .select(`*,product_images(*)`)
        .eq('id', id)
        .single()

    if (error) {
        console.error(error)
        throw new Error('Product not found')
    }

    return data
}

const getProductByName = async ({ searchName }) => {
    const { data, error } = await supabase
        .from('products')
        .select(`*,product_images(*)`)
        .ilike('name', `%${searchName}%`)

    if (error) {
        console.error(error)
        throw new Error('Product not found')
    }

    return data
}

// Fetch product with its catalogs through the junction table
const fetchProductWithCatalogs = async (productId) => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select(
                `
        id,
        name,
        price,
        description,
        catalog_product!inner (
          id,
          catalogs (
            id,
            name,
            description
          )
        )
      `
            )
            .eq('id', productId)
            .single()

        if (error) throw error

        // Clean up the response structure
        const cleanedData = {
            ...data,
            catalogs: data.catalog_product.map((cp) => cp.catalogs),
        }
        delete cleanedData.catalog_product

        return { data: cleanedData, error: null }
    } catch (error) {
        console.error('Error:', error)
        return { data: null, error }
    }
}

const createEditProduct = async (newProduct, id, productImages) => {
    // handle Image
    const uploadPromises = productImages.map(async (file) => {
        // Create a unique file name (like a unique item ID in FF!)
        if (file.image_url?.startsWith?.(supabaseUrl)) return

        const imageName = `${Math.random()}-${file.name}`.replaceAll('/', '')

        // Upload the file to the 'images' bucket
        const { data: imgData, error: errorImg } = await supabase.storage
            .from('products')
            .upload(imageName, file)

        if (errorImg) throw errorImg

        // Get public URL for the uploaded file
        const {
            data: { publicUrl },
        } = supabase.storage.from('products').getPublicUrl(imageName)

        return {
            imageName,
            publicUrl,
            size: file.size,
            type: file.type,
        }
    })

    const results = await Promise.all(uploadPromises)

    let query = supabase.from('products')

    // 1. Create product itself if no Id
    if (!id) query = query.insert([{ ...newProduct }])

    // 1. Edit product if have Id
    if (id) query = query.update({ ...newProduct }).eq('id', id)

    const { data, error } = await query.select().single()

    const { error: deleteError } = await supabase
        .from('product_images')
        .delete()
        .eq('product_id', data.id)

    if (deleteError) throw deleteError

    // Then, insert new relationships
    const newProductImages = [
        ...productImages.filter((image) => image.image_url),
        ...results.filter((result) => result?.publicUrl),
    ]
    if (newProductImages.length > 0) {
        const relationships = newProductImages.map((image) => {
            return {
                image_url: image.image_url || image.publicUrl,
                product_id: data.id,
            }
        })

        const { data: imgData, error: insertError } = await supabase
            .from('product_images')
            .insert(relationships)
            .select()

        if (insertError) throw insertError
    }

    if (error) {
        console.error(error)
        throw new Error('Product could not be created')
    }

    return data
}

export {
    fetchProductWithCatalogs,
    getProducts,
    getProduct,
    getProductByName,
    createEditProduct,
}
