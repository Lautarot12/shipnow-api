import { create, deleteById, getAll, getByCode, getById, update } from '../repositories/product.repository.js'
import CustomError from '../errors/CustomError.js'
import { ERROR_TYPES } from '../errors/error.dictionary.js'
import mongoose from 'mongoose'

const findExistingProduct = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new CustomError(ERROR_TYPES.INVALID_ID)
    }
    const product = await getById(id)

    if (!product) {
        throw new CustomError(ERROR_TYPES.PRODUCT_NOT_FOUND)
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
        throw new CustomError(ERROR_TYPES.DUPLICATE_PRODUCT_CODE)
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
        throw new CustomError(ERROR_TYPES.DUPLICATE_PRODUCT_CODE)
    }
}

export const deleteProduct = async (id)=>{
    const productById = await findExistingProduct(id)
    const deletedProduct = await deleteById(id)
    return deletedProduct
}