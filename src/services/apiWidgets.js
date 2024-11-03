import supabase, { supabaseUrl } from './supabase'

const getHeader = async (id) => {
    const { data, error } = await supabase
        .from('header_banner')
        .select(`*`)
        .eq('id', id)
        .single()

    if (error) {
        console.error(error)
        throw new Error('Header could not be loaded')
    }

    return data
}
const editHeader = async (newHeaderData, id, headerImage) => {
    // handle Image
    const hasImagePath = newHeaderData.image?.startsWith?.(supabaseUrl)
    let imagePath = hasImagePath ? newHeaderData.image : ''

    if (!hasImagePath) {
        const imageName = `${Math.random()}-${headerImage.name}`.replaceAll(
            '/',
            ''
        )
        // Upload the file to the 'images' bucket
        const { data: imgData, error: errorImg } = await supabase.storage
            .from('widgets')
            .upload(imageName, headerImage)

        if (errorImg) throw errorImg

        // Get public URL for the uploaded file
        const {
            data: { publicUrl },
        } = supabase.storage.from('widgets').getPublicUrl(imageName)
        imagePath = publicUrl
    }

    let query = supabase.from('header_banner')

    // 1. Edit product if have Id
    if (id)
        query = query
            .update({ ...newHeaderData, image: imagePath })
            .eq('id', id)

    const { data, error } = await query.select().single()

    if (error) {
        console.error(error)
        throw new Error('Header could not be updated')
    }

    return data
}

const getCatalogSection = async (id) => {
    const { data, error } = await supabase
        .from('catalog_widget')
        .select(
            `*,
        catalog_1:catalogs!catalog_1_id(*),
        catalog_2:catalogs!catalog_2_id(*),
        catalog_3:catalogs!catalog_3_id(*)`
        )
        .eq('id', id)
        .single()

    if (error) {
        console.error(error)
        throw new Error('Catalog could not be loaded')
    }

    return data
}

const editWidgetSection = async (newData, id, tableName) => {
    let query = supabase.from(tableName)

    if (id) query = query.update({ ...newData }).eq('id', id)

    const { data, error } = await query.select().single()

    if (error) {
        console.error(error)
        throw new Error(`${tableName} could not be updated`)
    }

    return data
}

const getFooterBanner = async (id) => {
    const { data, error } = await supabase
        .from('footer_banner')
        .select(
            `*,
        image_1:catalogs!image_1_id(*),
        image_2:catalogs!image_2_id(*),
        image_3:catalogs!image_3_id(*),
        image_4:catalogs!image_4_id(*)`
        )
        .eq('id', id)
        .single()

    if (error) {
        console.error(error)
        throw new Error('Footer could not be loaded')
    }

    return data
}

export {
    getHeader,
    editHeader,
    getCatalogSection,
    editWidgetSection,
    getFooterBanner,
}
