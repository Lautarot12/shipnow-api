import { create, deleteById, getAll, getByCode, getById, update } from '../repositories/product.repository.js'

const findExistingProduct = async (id) => {
    const product = await getById(id)

    if (!product) {
        throw new Error('Error, no se encontro el producto')
    }

    return product
}

export const getProducts = async (queryparams)=>{
    const { limit = 10, page = 1, sort, query } = queryparams
            let filter = {}
            if (query) {
                if(['frescos', 'congelados', 'precocidos'].includes(query)) filter.category = query
                    else if (query === 'true' || query === 'false') filter.status = query === 'true'
            }
            let sortOption = {}
            if (sort) {
                if(sort === 'asc') {
                    sortOption = { price: 1 }
                }
                else if(sort === 'desc'){
                    sortOption = { price: -1 }
                }
            }
            const data = await getAll(filter, {
                limit,
                page,
                sort: sortOption,
        })

        const response = {
            status: 'success',
            payload: data.docs,
            totalPages: data.totalPages,
            prevPage: data.hasPrevPage ? data.prevPage : null,
            nextPage: data.hasNextPage ? data.nextPage : null,
            page: data.page,
            hasPrevPage: data.hasPrevPage,
            hasNextPage: data.hasNextPage,
            prevLink: null,
            nextLink: null
        }
        return response
    }

export const getProductById = async (id) => {
    const productFound = await findExistingProduct(id)
        return productFound
}

export const createProduct = async (body)=>{
    const productCodigo = await getByCode(body.code)
    if (productCodigo) {
        throw new Error('Error, ya existe un producto con ese codigo')
    }
    const createdProduct = await create(body)
    return createdProduct
}

export const updateProduct = async (id, updatedFields)=>{
    const productbyId = await findExistingProduct(id)
    if (!updatedFields.code) {
        const updated = await update(id, updatedFields)
        return updated
    }
    const productByCode = await getByCode(updatedFields.code)
    if (!productByCode) {
     const updatedbyCode = await update(id, updatedFields)
     return updatedbyCode   
    }
    if (productByCode.id === id) {
        return await update(id, updatedFields)
    } else{
        throw new Error('Error, codigo duplicado')
    }
}

export const deleteProduct = async (id)=>{
    const productById = await findExistingProduct(id)
    const deletedProduct = await deleteById(id)
    return deletedProduct
}