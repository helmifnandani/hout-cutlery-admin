import supabase, { supabaseUrl } from './supabase'

export async function getCatalogs() {
    const { data, error } = await supabase.from('catalogs').select('*')

    if (error) {
        console.error(error)
        throw new Error('Catalogs could not be loaded')
    }

    return data
}

const getCatalog = async (catalogId) => {
    if (catalogId === 'catalog') return {}
    try {
        const { data, error } = await supabase
            .from('catalogs')
            .select(
                `
        id,
        name,
        image,
        description,
        catalog_product!inner (
          id,
          products (
            id,
            name,
            product_images (
              id,
              image_url,
              is_primary
            )
          )
        )
      `
            )
            .eq('id', catalogId)
            .single()

        if (error) throw error

        // Clean up the response structure
        const cleanedData = {
            ...data,
            products: data.catalog_product.map((cp) => ({
                ...cp.products,
                // Optionally sort images to put primary image first
                images: cp.products.product_images.sort(
                    (a, b) => (b.is_primary ? 1 : 0) - (a.is_primary ? 1 : 0)
                ),
            })),
        }
        delete cleanedData.catalog_product

        return cleanedData
    } catch (error) {
        console.error('Error:', error)
        return { data: null, error }
    }
}

// Alternative approach using simplified query
const fetchCatalogProductsSimple = async (catalogId) => {
    try {
        const { data, error } = await supabase
            .from('catalog_product')
            .select(
                `
        id,
        products (
          id,
          name,
          price,
          description
        )
      `
            )
            .eq('catalog_id', catalogId)

        if (error) throw error

        // Get the catalog details
        const { data: catalogData, error: catalogError } = await supabase
            .from('catalogs')
            .select('*')
            .eq('id', catalogId)
            .single()

        if (catalogError) throw catalogError

        // Combine the data
        const cleanedData = {
            ...catalogData,
            products: data.map((item) => item.products),
        }

        return { data: cleanedData, error: null }
    } catch (error) {
        console.error('Error:', error)
        return { data: null, error }
    }
}

// Helper function to check if a product is in a catalog
const isProductInCatalog = async (productId, catalogId) => {
    try {
        const { data, error } = await supabase
            .from('catalog_product')
            .select('id')
            .match({
                product_id: productId,
                catalog_id: catalogId,
            })
            .single()

        if (error && error.code !== 'PGRST116') {
            // Not found error
            throw error
        }

        return { exists: !!data, error: null }
    } catch (error) {
        console.error('Error:', error)
        return { exists: false, error }
    }
}

const createEditCatalog = async (newCatalog, id, productData, imgFile) => {
    const hasImagePath = newCatalog.image?.startsWith?.(supabaseUrl)

    const imageName = `${Math.random()}-${imgFile.name}`.replaceAll('/', '')
    let imagePath = hasImagePath ? newCatalog.image : ''

    if (!newCatalog.image?.startsWith?.(supabaseUrl)) {
        // Upload the file to the 'images' bucket
        const { data: imgData, error: errorImg } = await supabase.storage
            .from('products')
            .upload(imageName, imgFile)

        if (errorImg) throw errorImg

        // Get public URL for the uploaded file
        const {
            data: { publicUrl },
        } = supabase.storage.from('products').getPublicUrl(imageName)
        imagePath = publicUrl
    }

    // Ini cara untuk reuse query
    let query = supabase.from('catalogs')

    // 1. Create catalog itself if no Id
    if (!id) query = query.insert([{ ...newCatalog, image: imagePath }])

    // 1. Edit catalog if have Id
    if (id)
        query = query
            .update({
                ...newCatalog,
                image: imagePath,
            })
            .eq('id', id)

    const { data, error } = await query.select().single()

    if (error) {
        console.error(error)
        throw new Error('Catalog could not be created')
    }

    const { error: deleteError } = await supabase
        .from('catalog_product')
        .delete()
        .eq('catalog_id', data.id)

    if (deleteError) throw deleteError

    // Then, insert new relationships
    if (productData.length > 0) {
        const relationships = productData.map((product) => ({
            catalog_id: data.id,
            product_id: product.id,
        }))

        const { error: insertError } = await supabase
            .from('catalog_product')
            .insert(relationships)

        if (insertError) {
            await supabase.from('catalogs').delete().eq('id', data.id)
            console.error(insertError)
            throw new Error('Catalogs could not be created')
        }
    }

    return data
}

const updateCatalogProducts = async (catalogId, products) => {
    // First, remove all existing relationships
    const { error: deleteError } = await supabase
        .from('catalog_product')
        .delete()
        .eq('catalog_id', catalogId)

    if (deleteError) throw deleteError

    // Then, insert new relationships
    if (products.length > 0) {
        const relationships = products.map((product) => ({
            catalog_id: catalogId,
            product_id: product.id,
        }))

        const { error: insertError } = await supabase
            .from('catalog_product')
            .insert(relationships)

        if (insertError) throw insertError
    }

    return true
}

export {
    getCatalog,
    fetchCatalogProductsSimple,
    isProductInCatalog,
    createEditCatalog,
    updateCatalogProducts,
}
